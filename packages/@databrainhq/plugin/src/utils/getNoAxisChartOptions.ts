/* eslint-disable import/no-cycle */
/* eslint-disable import/no-namespace */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import { graphic, format } from 'echarts';
import * as echarts from 'echarts';
import { transformDataToSankey } from './getChartAttributes';
import {
  addPrefixAndSuffix,
  findLegendPosition,
  truncateText,
  validateColor,
} from './getChartOptions';
import transformData from '@/components/PivotTable/transformData';
import { CHART_TYPES, DEFAULT_CHART_SETTINGS } from '@/consts';
import { ChartSettingsType } from '@/types';
import createNestedArray from '@/helpers/treeMap';
import { numberFormatter } from '@/helpers/numberFormatter';

export type GetNoAxisChartOptionsParams = {
  chartOptions: ChartSettingsType;
  data: Record<string, any>[];
  colors?: string[];
  datasets?: any;
  labels?: any;
  funnelData?: {
    value: any;
    name: any;
  }[];
  singleValueData?: any;
  geoJsonData?: any;
  mapColors?: string[];
};

export const getNoAxisChartOptions = ({
  chartOptions,
  data = [],
  colors,
  datasets,
  funnelData,
  labels,
  singleValueData,
  geoJsonData,
  mapColors,
}: GetNoAxisChartOptionsParams): Record<string, any> => {
  const legendPosition = findLegendPosition(
    chartOptions.legendSettings?.fixedPosition
  );
  const titlePosition = findLegendPosition(
    chartOptions.customSettings?.titlePosition
  );
  const gradientArr =
    chartOptions.customSettings?.gradients?.map((val) => {
      const colorStops = [
        {
          offset: val.offset1 > 1 ? val.offset1 / 100 : val.offset1,
          color: val.startColor,
        },
        {
          offset: val.offset2 > 1 ? val.offset2 / 100 : val.offset2,
          color: val.endColor,
        },
      ];
      switch (val.direction) {
        case 'left':
          return new graphic.LinearGradient(1, 0, 0, 0, colorStops);
        case 'right':
          return new graphic.LinearGradient(0, 0, 1, 0, colorStops);
        case 'top':
          return new graphic.LinearGradient(0, 1, 0, 0, colorStops);
        case 'bottom':
          return new graphic.LinearGradient(0, 0, 0, 1, colorStops);
        default:
          return new graphic.LinearGradient(0, 0, 1, 0, colorStops);
      }
    }) || [];
  let backgroundGradient: any = '';
  if (
    chartOptions.customSettings?.enableBackgroundGradient &&
    chartOptions.customSettings.backgroundGradient?.offset1 !== undefined &&
    chartOptions.customSettings.backgroundGradient?.offset2 !== undefined &&
    validateColor(chartOptions.customSettings.backgroundGradient.startColor) &&
    validateColor(chartOptions.customSettings.backgroundGradient.endColor)
  ) {
    const colorStops = [
      {
        offset:
          chartOptions.customSettings.backgroundGradient?.offset1 > 1
            ? chartOptions.customSettings?.backgroundGradient.offset1 / 100
            : chartOptions.customSettings.backgroundGradient?.offset1,
        color:
          chartOptions.customSettings.backgroundGradient.startColor ||
          '#FF0000',
      },
      {
        offset:
          chartOptions.customSettings.backgroundGradient?.offset2 > 1
            ? chartOptions.customSettings?.backgroundGradient.offset2 / 100
            : chartOptions.customSettings.backgroundGradient?.offset2,
        color:
          chartOptions.customSettings.backgroundGradient.endColor || '#000000',
      },
    ];
    switch (chartOptions.customSettings.backgroundGradient.direction) {
      case 'left':
        backgroundGradient = new graphic.LinearGradient(1, 0, 0, 0, colorStops);
        break;
      case 'right':
        backgroundGradient = new graphic.LinearGradient(0, 0, 1, 0, colorStops);
        break;
      case 'top':
        backgroundGradient = new graphic.LinearGradient(0, 1, 0, 0, colorStops);
        break;
      case 'bottom':
        backgroundGradient = new graphic.LinearGradient(0, 0, 0, 1, colorStops);
        break;
      default:
        backgroundGradient = new graphic.LinearGradient(0, 0, 1, 0, colorStops);
    }
  }
  const treeMapData = createNestedArray(
    data,
    chartOptions.pivotTableSettings?.rows || [],
    chartOptions.pivotTableSettings?.columns || []
  );
  const labelSettings = {
    ...DEFAULT_CHART_SETTINGS.labelSettings,
    ...chartOptions.labelSettings,
  };
  const legendSettings = {
    ...DEFAULT_CHART_SETTINGS.legendSettings,
    ...chartOptions.legendSettings,
  };
  const axisSettings = {
    ...DEFAULT_CHART_SETTINGS.axisSettings,
    ...chartOptions.axisSettings,
  };
  const customSettings = {
    ...DEFAULT_CHART_SETTINGS.customSettings,
    ...chartOptions.customSettings,
  };
  const tableSettings = {
    ...DEFAULT_CHART_SETTINGS.tableSettings,
    ...chartOptions.tableSettings,
  };
  const backGroundColor = {
    ...DEFAULT_CHART_SETTINGS.backGroundColor,
    ...chartOptions.backGroundColor,
  };
  const pivotTableSettings = {
    ...DEFAULT_CHART_SETTINGS.pivotTableSettings,
    ...chartOptions.pivotTableSettings,
  };
  const pivotTableSettings2 = {
    ...DEFAULT_CHART_SETTINGS.pivotTableSettings2,
    ...chartOptions.pivotTableSettings2,
    headerSettings: chartOptions.tableSettings?.customHeaderColor,
    isEnableStripedRows: chartOptions.tableSettings?.enableStripedRows,
  };
  const option = {
    ...(colors?.length || gradientArr.length
      ? { color: [...(gradientArr || []), ...(colors || [])] }
      : {}),
  };
  const chartZoom = customSettings?.chartZoom;

  switch (chartOptions.chartType) {
    case CHART_TYPES.pie: {
      const getSingleArraySeries = () => {
        const modifiedData = datasets?.map(
          (val: { data: any; label: any }, i: number) => {
            return {
              value: val.data,
              name: labels?.[i]?.toString() || 'undefined',
            };
          }
        );
        return {
          type: 'pie',
          radius: `80%`,
          data: modifiedData || [],
          selectedMode: chartOptions.customSettings?.selectedMode,
          selectedOffset: chartOptions.customSettings?.selectedOffset,
          label: {
            show: labelSettings.show,
          },
          labelLine: {
            show: chartOptions.labelSettings?.showLabelLine,
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
        };
      };
      const getMultiArraySeries = () => {
        let size = 100;
        const modifiedData: any[][][] = [];
        datasets?.map((item: { label: any; data: any[] }) => {
          const set: any[] | { value: any; name: any } = [];
          let k = 0;
          item?.data?.map((val) => {
            const obj = {
              value: val,
              name: labels?.[k]?.toString(),
            };
            set.push(obj);
            k += 1;
          });
          modifiedData.push([item.label, set]);
        });
        return modifiedData?.map((val) => {
          size -= 20;
          return {
            name: val[0],
            type: 'pie',
            radius: `${size}%`,
            data: val[1],
            selectedMode: chartOptions.customSettings?.selectedMode,
            selectedOffset: chartOptions.customSettings?.selectedOffset,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              show: labelSettings.show,
              position: labelSettings.position,
              formatter(d: any) {
                return addPrefixAndSuffix(
                  numberFormatter(d.value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
            labelLine: {
              show: chartOptions.labelSettings?.showLabelLine,
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
          };
        });
      };
      const series =
        datasets?.length && datasets[0]?.data?.length > 1
          ? getMultiArraySeries()
          : getSingleArraySeries();
      Object.assign(option, {
        ...option,
        title: chartOptions.customSettings?.enableTitleDesc
          ? {
              text: chartOptions.customSettings?.chartTitle,
              subtext: chartOptions.customSettings?.chartDesc,
              ...titlePosition,
            }
          : {},
        toolbox: {
          emphasis: {
            iconStyle: {
              borderColor: '#5865F6',
            },
          },
        },
        backgroundColor: chartOptions.customSettings?.enableBackgroundGradient
          ? backgroundGradient
          : '',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          className: `getChartOptions-tooltip`,

          valueFormatter: (value: any) =>
            addPrefixAndSuffix(
              numberFormatter(value, customSettings.numberFormatter),
              customSettings.labelPrefix,
              customSettings.labelSuffix
            ),
        },
        legend: {
          data:
            datasets?.length && datasets[0]?.data?.length > 1
              ? undefined
              : datasets?.[0],
          show: legendSettings.show,
          ...(legendSettings.customise
            ? {
                top: legendSettings.top,
                left: legendSettings.left,
                right: legendSettings.right,
                bottom: legendSettings.bottom,
              }
            : { ...legendPosition }),
          orient: legendSettings.position,
          icon: legendSettings.legendShape,
          type: 'scroll',
          formatter(value: any) {
            return `{a|${truncateText(
              value,
              legendSettings.truncateLegendValue || 22
            )}}`;
          },
          tooltip: {
            show: true,
            formatter(params: { name: any }) {
              return params.name;
            },
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 12,
                lineHeight: 20,
              },
            },
          },
        },
        series,
      });
      break;
    }
    case CHART_TYPES.rose: {
      const getSingleArraySeries = () => {
        const modifiedData = datasets?.map(
          (val: { data: any; label: any }, i: number) => {
            return {
              value: val.data,
              name: labels?.[i]?.toString() || 'undefined',
            };
          }
        );
        return {
          type: 'pie',
          radius: `80%`,
          data: modifiedData || [],
          roseType: chartOptions.customSettings?.roseType || 'radius',
          selectedMode: chartOptions.customSettings?.selectedMode,
          selectedOffset: chartOptions.customSettings?.selectedOffset,
          label: {
            show: labelSettings.show,
          },
          labelLine: {
            show: chartOptions.labelSettings?.showLabelLine,
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
        };
      };
      const getMultiArraySeries = () => {
        let size = 100;
        const modifiedData: any[][][] = [];
        datasets?.map((item: { label: any; data: any[] }) => {
          const set: any[] | { value: any; name: any } = [];
          let k = 0;
          item?.data?.map((val) => {
            const obj = {
              value: val,
              name: labels?.[k]?.toString(),
            };
            set.push(obj);
            k += 1;
          });
          modifiedData.push([item.label, set]);
        });
        return modifiedData?.map((val) => {
          size -= 20;
          return {
            name: val[0],
            type: 'pie',
            radius: `${size}%`,
            data: val[1],
            selectedMode: chartOptions.customSettings?.selectedMode,
            selectedOffset: chartOptions.customSettings?.selectedOffset,
            roseType: chartOptions.customSettings?.roseType || 'radius',
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              show: labelSettings.show,
              position: labelSettings.position,
              formatter(d: any) {
                return `${d.name}: ${addPrefixAndSuffix(
                  numberFormatter(d.value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                )}`;
              },
            },
            labelLine: {
              show: chartOptions.labelSettings?.showLabelLine,
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
          };
        });
      };
      const series =
        datasets?.length && datasets[0]?.data?.length > 1
          ? getMultiArraySeries()
          : getSingleArraySeries();
      Object.assign(option, {
        ...option,
        title: chartOptions.customSettings?.enableTitleDesc
          ? {
              text: chartOptions.customSettings?.chartTitle,
              subtext: chartOptions.customSettings?.chartDesc,
              ...titlePosition,
            }
          : {},
        toolbox: {
          emphasis: {
            iconStyle: {
              borderColor: '#5865F6',
            },
          },
        },
        backgroundColor: chartOptions.customSettings?.enableBackgroundGradient
          ? backgroundGradient
          : '',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          className: `getChartOptions-tooltip`,

          valueFormatter: (value: any) =>
            addPrefixAndSuffix(
              numberFormatter(value, customSettings.numberFormatter),
              customSettings.labelPrefix,
              customSettings.labelSuffix
            ),
        },
        legend: {
          data:
            datasets?.length && datasets[0]?.data?.length > 1
              ? undefined
              : datasets?.[0],
          show: legendSettings.show,
          ...(legendSettings.customise
            ? {
                top: legendSettings.top,
                left: legendSettings.left,
                right: legendSettings.right,
                bottom: legendSettings.bottom,
              }
            : { ...legendPosition }),
          orient: legendSettings.position,
          icon: legendSettings.legendShape,
          type: 'scroll',
          formatter(value: any) {
            return `{a|${truncateText(
              value,
              legendSettings.truncateLegendValue || 22
            )}}`;
          },
          tooltip: {
            show: true,
            formatter(params: { name: any }) {
              return params.name;
            },
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 12,
                lineHeight: 20,
              },
            },
          },
        },
        series,
      });
      break;
    }
    case CHART_TYPES.doughnut: {
      const getSingleArraySeries = () => {
        const modifiedData = datasets?.map(
          (val: { data: any; label: any }, i: number) => {
            return {
              value: val.data,
              name: labels?.[i]?.toString() || 'undefined',
            };
          }
        );
        return {
          type: 'pie',
          radius: ['30%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: labelSettings.show,
            position: labelSettings.position,
            formatter(d: any) {
              return addPrefixAndSuffix(
                numberFormatter(d.value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              );
            },
          },
          data: modifiedData || [],
          labelLine: {
            show: chartOptions.labelSettings?.showLabelLine,
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
        };
      };
      const getMultiArraySeries = () => {
        const modifiedData: any[][][] = [];
        let inner = 70;
        let outer = 100;
        datasets?.map((item: { label: any; data: any[] }) => {
          const set: any[] | { value: any; name: any } = [];
          let k = 0;
          item?.data?.map((val) => {
            const obj = {
              value: val,
              name: labels?.[k]?.toString(),
            };
            set.push(obj);
            k += 1;
          });
          modifiedData.push([item.label, set]);
        });
        return modifiedData?.map((val) => {
          inner -= 20;
          outer -= 20;
          return {
            name: val[0],
            type: 'pie',
            radius: [`${inner}%`, `${outer}%`],
            avoidLabelOverlap: false,
            label: {
              show: labelSettings.show,
              position: labelSettings.position,
              formatter(d: any) {
                return addPrefixAndSuffix(
                  numberFormatter(d.value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
            data: val[1],
            labelLine: {
              show: chartOptions.labelSettings?.showLabelLine,
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
          };
        });
      };
      const series =
        labels.length > 1 ? getMultiArraySeries() : getSingleArraySeries();
      Object.assign(option, {
        toolbox: {
          emphasis: {
            iconStyle: {
              borderColor: '#5865F6',
            },
          },
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          className: `getChartOptions-tooltip`,

          valueFormatter: (value: any) =>
            addPrefixAndSuffix(
              numberFormatter(value, customSettings.numberFormatter),
              customSettings.labelPrefix,
              customSettings.labelSuffix
            ),
        },
        backgroundColor: chartOptions.customSettings?.enableBackgroundGradient
          ? backgroundGradient
          : '',
        legend: {
          data: labels.length > 1 ? undefined : datasets?.[0],
          show: legendSettings.show,
          ...(legendSettings.customise
            ? {
                top: legendSettings.top,
                left: legendSettings.left,
                right: legendSettings.right,
                bottom: legendSettings.bottom,
              }
            : { ...legendPosition }),
          orient: legendSettings.position,
          icon: legendSettings.legendShape,
          type: 'scroll',
          formatter(value: any) {
            return `{a|${truncateText(
              value,
              legendSettings.truncateLegendValue || 22
            )}}`;
          },
          tooltip: {
            show: true,
            formatter(params: { name: any }) {
              return params.name;
            },
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 12,
                lineHeight: 20,
              },
            },
          },
        },
        series,
      });
      break;
    }
    case CHART_TYPES.funnel: {
      let highestValue = 0;
      if (
        funnelData?.length &&
        funnelData?.length >= 1 &&
        typeof funnelData[0].value === 'number'
      ) {
        for (let i = 0; i < funnelData.length; i += 1) {
          if (funnelData[i].value > highestValue) {
            highestValue = funnelData[i].value;
          }
        }
      }
      Object.assign(option, {
        ...option,
        title: chartOptions.customSettings?.enableTitleDesc
          ? {
              text: chartOptions.customSettings?.chartTitle,
              subtext: chartOptions.customSettings?.chartDesc,
              ...titlePosition,
            }
          : {},
        tooltip: {
          trigger: 'item',
          className: `getChartOptions-tooltip`,

          formatter: customSettings.showConversionRate
            ? (context: any) => {
                let percent = 100;
                if (context.dataIndex > 0) {
                  percent =
                    ((funnelData?.[context.dataIndex]?.value || 0) /
                      (funnelData?.[context.dataIndex - 1]?.value || 1)) *
                    100;
                }
                return `${context.name}: ${percent.toFixed(0)}%`;
              }
            : customSettings.showLabelValues
            ? '{b}: {c}'
            : customSettings.labelFormat || '{b}',
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
        },
        backgroundColor: chartOptions.customSettings?.enableBackgroundGradient
          ? backgroundGradient
          : '',
        legend: {
          show: legendSettings.show,
          ...(legendSettings.customise
            ? {
                top: legendSettings.top,
                left: legendSettings.left,
                right: legendSettings.right,
                bottom: legendSettings.bottom,
              }
            : { ...legendPosition }),
          orient: legendSettings.position,
          icon: legendSettings.legendShape,
          type: 'scroll',
          data: funnelData,
          formatter(value: any) {
            return `{a|${truncateText(
              value,
              legendSettings.truncateLegendValue || 22
            )}}`;
          },
          tooltip: {
            show: true,
            formatter(params: { name: any }) {
              return params.name;
            },
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 12,
                lineHeight: 20,
              },
            },
          },
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            progressive: 1000,
            progressiveThreshold: 3000,
            top: 60,
            bottom: 60,
            width: '80%',
            height: '70%',
            min: 0,
            max: highestValue,
            sort: 'descending',
            gap: chartOptions.customSettings?.stepPadding || 10,
            itemStyle: chartOptions.customSettings?.showFunnelShadow
              ? {
                  borderColor: '#fff',
                  borderWidth: 1,
                  shadowBlur: 20,
                  shadowColor: 'rgba(0, 0, 0, 0.3)',
                  shadowOffsetY: 10,
                }
              : {},
            emphasis: {
              itemStyle: {
                shadowBlur: 30,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffsetY: 15,
              },
            },
            label: {
              show: labelSettings.show,
              position: labelSettings.position,
              formatter: customSettings.showConversionRate
                ? (context: any) => {
                    let percent = 100;
                    if (context.dataIndex > 0) {
                      percent =
                        ((funnelData?.[context.dataIndex]?.value || 0) /
                          (funnelData?.[context.dataIndex - 1]?.value || 1)) *
                        100;
                    }
                    return `${context.name}: ${percent.toFixed(0)}%`;
                  }
                : customSettings.showLabelValues
                ? '{b}: {c}'
                : customSettings.labelFormat || '{b}',
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid',
              },
            },
            data:
              funnelData?.length && funnelData?.length > 20
                ? funnelData.slice(0, 20)
                : funnelData,
          },
        ],
      });
      break;
    }
    case CHART_TYPES.gauge: {
      const metric: string = chartOptions?.gaugeSettings?.metric || '';
      const dimensions: any[] = chartOptions.gaugeSettings?.dimensions || [];
      const modifiedData: any[] = [];
      const unique: any[] = [];
      let legendData: {
        name: string;
        value: number;
        color: string;
      }[] = [];
      let metricData: any;
      let maxNum: number = 0;
      let hasNoDimension: boolean = false;
      if (data.length === 1) {
        metricData = data[0];
        hasNoDimension = Object.keys(metricData).every(
          (key) => typeof metricData[key] === 'number'
        );
        if (hasNoDimension) {
          maxNum = metricData[metric];
          modifiedData.push({
            value: metricData[metric],
            name: metric,
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
          });
        }
      }
      if (data.length !== 1 && metric.length && !dimensions.length) {
        const dataArr = data?.[0]?.[metric];
        hasNoDimension = true;
        maxNum = dataArr;
        modifiedData.push({
          value: dataArr,
          name: metric,
          title: {
            show: false,
          },
          detail: {
            show: false,
          },
        });
      }
      if (metric.length && dimensions.length) {
        const data2 = transformData(data, dimensions, [metric]);
        const data3 = data2[metric];
        const len: any = data3.length;
        for (let i = 0; i < len; i += 1) {
          if (!unique.includes(data3[i].name)) {
            unique.push(data3[i].name);
            const obj = {
              value: data3[i].name,
              name: `(${data3[i]?.parent?.replaceAll('/', ',')})`,
              title: {
                show: false,
              },
              detail: {
                show: false,
              },
            };
            modifiedData.push(obj);
          } else {
            for (let j = 0; j < modifiedData.length; j += 1) {
              if (modifiedData[j].value === data3[i].name) {
                modifiedData[j].name += `, (${data3[i].parent.replaceAll(
                  '/',
                  ','
                )})`;
                break;
              }
            }
          }
        }
        hasNoDimension = false;
      }
      if (modifiedData?.length) {
        legendData = modifiedData?.map((val, index) => ({
          name: val.name as string,
          value: val.value as number,
          color: colors?.[index] as string,
        }));
      }
      const minVal =
        Math.min(...unique) < 0 ? Math.min(...unique) / 2 : Math.min(...unique);
      const maxRange = hasNoDimension
        ? maxNum + maxNum / 2
        : Math.max(...unique) + minVal;
      let gaugeColors: any = [];
      if (chartOptions.customSettings?.YaxislabelFormatters?.length) {
        const gaugeColorObj =
          chartOptions.customSettings?.YaxislabelFormatters?.map((range) => {
            const percentMax = parseFloat(
              (range.upperLimit / maxRange).toFixed(2)
            );
            return [percentMax, range.color, range.label];
          });
        const maxPercent = Math.max(
          ...(gaugeColorObj?.map((val) =>
            parseFloat(val[0]?.toString() || '')
          ) || [])
        );
        if (maxPercent < 1) {
          const themeColor = colors?.[0] || '#000000';
          gaugeColorObj?.push([1, themeColor, 'Max']);
        }
        gaugeColors = gaugeColorObj;
      }
      if (
        colors?.length &&
        (!chartOptions.customSettings?.YaxislabelFormatters?.length ||
          !chartOptions.customSettings?.isEnableLabelFormatting)
      ) {
        gaugeColors = [
          [0.3, colors[0]],
          [0.7, colors[1]],
          [1, colors[2]],
        ];
      }
      Object.assign(option, {
        ...option,
        title: chartOptions.customSettings?.enableTitleDesc
          ? {
              text: chartOptions.customSettings?.chartTitle,
              subtext: chartOptions.customSettings?.chartDesc,
              ...titlePosition,
            }
          : {},
        toolbox: {
          emphasis: {
            iconStyle: {
              borderColor: '#5865F6',
            },
          },
        },
        legendData,
        backgroundColor: chartOptions.customSettings?.enableBackgroundGradient
          ? backgroundGradient
          : '',
        tooltip: {
          show: true,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          className: `getChartOptions-tooltip`,
          enterable: true,
          valueFormatter: (value: any) => {
            const val = numberFormatter(value, customSettings.numberFormatter);
            return addPrefixAndSuffix(
              val,
              customSettings.labelPrefix,
              customSettings.labelSuffix
            );
          },
        },
        series: [
          {
            type: 'gauge',
            startAngle: 190,
            endAngle: -10,
            center: ['50%', '75%'],
            radius: '100%',
            anchor: {
              show: true,
              showAbove: true,
              size: 12,
              itemStyle: {
                color: '#FAC858',
              },
            },
            pointer: {
              length: '100%',
              width: modifiedData.length === 1 ? 10 : 4,
            },
            axisLine: {
              lineStyle: {
                width: 30,
                color: gaugeColors,
              },
            },
            axisTick: {
              show: true,
              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2,
              },
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4,
              },
            },
            axisLabel: {
              distance: -30,
              color: '#999',
              rotate: 5,
              fontSize: 12,
              formatter(value: any) {
                if (
                  chartOptions.customSettings?.YaxislabelFormatters?.length &&
                  chartOptions.customSettings?.isEnableLabelFormatting
                ) {
                  const matchingRange =
                    chartOptions.customSettings?.YaxislabelFormatters?.find(
                      (range) => {
                        return (
                          value >= range.lowerLimit && value <= range.upperLimit
                        );
                      }
                    );
                  const isUpperLimit =
                    matchingRange && value === matchingRange.upperLimit;
                  const valWithoutRange = matchingRange
                    ? ''
                    : addPrefixAndSuffix(
                        value,
                        customSettings.labelPrefix,
                        customSettings.labelSuffix
                      );
                  return isUpperLimit && matchingRange
                    ? `${matchingRange.label}\n(${addPrefixAndSuffix(
                        matchingRange.lowerLimit,
                        customSettings.labelPrefix,
                        customSettings.labelSuffix
                      )}-${addPrefixAndSuffix(
                        matchingRange.upperLimit,
                        customSettings.labelPrefix,
                        customSettings.labelSuffix
                      )})`
                    : valWithoutRange;
                }
                return addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
            data: modifiedData,
            min: Math.min(...unique) < 0 ? Math.min(...unique) : 0,
            max: maxRange,
          },
        ],
      });
      break;
    }
    case CHART_TYPES.sankey: {
      if (chartOptions.sankeyValues?.length) {
        const [source, target, value] = chartOptions.sankeyValues;
        const { links, nodes } = transformDataToSankey({
          data,
          source,
          target,
          value,
          sankeyColors: colors,
        });
        Object.assign(option, {
          ...option,
          title: chartOptions.customSettings?.enableTitleDesc
            ? {
                text: chartOptions.customSettings?.chartTitle,
                subtext: chartOptions.customSettings?.chartDesc,
                ...titlePosition,
              }
            : {},
          toolbox: {
            emphasis: {
              iconStyle: {
                borderColor: '#5865F6',
              },
            },
          },
          backgroundColor: chartOptions.customSettings?.enableBackgroundGradient
            ? backgroundGradient
            : '',
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            className: `getChartOptions-tooltip`,

            formatter: (params: any) => {
              if (params.dataType === 'edge') {
                return `${source}: ${params.data.source}<br />${target}: ${
                  params.data.target
                }<br /> 
                ${value}: ${addPrefixAndSuffix(
                  numberFormatter(
                    params.data.value,
                    customSettings.numberFormatter
                  ),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                )}`;
              } else if (params.dataType === 'node') {
                return params.data.name;
              }
            },
            valueFormatter: (val: any) =>
              addPrefixAndSuffix(
                numberFormatter(val, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
          },
          series: {
            type: 'sankey',
            layout: 'none',
            emphasis: {
              focus: 'adjacency',
            },
            data: nodes,
            links,
            label: {
              show: labelSettings.show,
              position: labelSettings.position,
              formatter: labelSettings.truncateLabel
                ? (val: any) =>
                    truncateText(
                      val.data.name,
                      labelSettings.truncateLabelValue || 22
                    )
                : undefined,
            },
          },
        });
      }
      break;
    }
    case CHART_TYPES.singleValue: {
      const value =
        singleValueData[0] &&
        addPrefixAndSuffix(
          numberFormatter(singleValueData[0], customSettings.numberFormatter),
          customSettings.labelPrefix,
          customSettings.labelSuffix
        );

      const changeValue =
        data?.[customSettings.comparisonTimePeriod || 0]?.[
          chartOptions?.singleValue || ''
        ];
      const comparisonValue = singleValueData?.[0]
        ? `${(
            ((singleValueData?.[0] - changeValue) / changeValue) *
            100
          ).toFixed(2)} %`
        : null;
      const isComparisonValue =
        customSettings.comparisonValueShow &&
        customSettings.comparisonTimePeriod &&
        customSettings.comparisonTimePeriod > 0 &&
        customSettings.comparisonTimeGrain !== 'NONE' &&
        chartOptions?.singleValue &&
        data?.[0]?._timestamp;
      Object.assign(option, {
        settings: {
          fontSize: customSettings.fontSize || 30,
          subHeaderFontSize: customSettings.subHeaderFontSize || 14,
          subHeaderShow: customSettings.subHeaderShow || false,
          displayText: customSettings.displayText || '',
          comparisonTimePeriod: customSettings.comparisonTimePeriod || 30,
          comparisonTimeColumn: customSettings.comparisonTimeColumn || '',
          comparisonValueShow: customSettings.comparisonValueShow || false,
          comparisonValueFontSize: customSettings.comparisonValueFontSize || 12,
          comparisonTimeGrain: customSettings.comparisonTimeGrain || '',
          comparisonSuffix: customSettings.comparisonSuffix || '',
          fontColor: customSettings.singleValueFontColor || '#000000',
          suffix: customSettings.singleValueSuffix || '',
          prefix: customSettings.singleValuePrefix || '',
          conditionalFormatter:
            customSettings.singleValConditionalFormatter || [],
        },
        value,
        comparisonValue: isComparisonValue ? comparisonValue : undefined,
        trendLineOptions:
          comparisonValue && customSettings.isShowTrendLine
            ? {
                ...option,
                title: chartOptions.customSettings?.enableTitleDesc
                  ? {
                      text: chartOptions.customSettings?.chartTitle,
                      subtext: chartOptions.customSettings?.chartDesc,
                      ...titlePosition,
                    }
                  : {},
                tooltip: {
                  trigger: 'axis',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 18,
                  axisPointer: {
                    type: 'line',
                    lineStyle: {
                      color: 'rgba(0,0,0,0.2)',
                      width: 1,
                      type: 'solid',
                    },
                  },
                  className: `getChartOptions-tooltip`,
                },
                grid: {
                  left: `0%`,
                  bottom: `0%`,
                  top: `0%`,
                  right: `0%`,
                  containLabel: true,
                },
                toolbox: {
                  emphasis: {
                    iconStyle: {
                      borderColor: '#5865F6',
                    },
                  },
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  splitLine: {
                    show: false,
                  },
                  axisLine: {
                    show: false,
                  },
                  axisLabel: {
                    show: false,
                  },
                },
                yAxis: {
                  type: 'value',
                  position: axisSettings.axis,
                  splitLine: {
                    show: false,
                  },
                  axisLine: {
                    show: false,
                  },
                  axisLabel: {
                    show: false,
                  },
                },
                ...(colors?.length ? { color: [...colors] } : {}),
                legend: { show: false },
                series: [
                  {
                    data: data?.map((d) => [
                      d?._timestamp,
                      d?.[chartOptions.singleValue || ''],
                    ]),
                    type: 'line',
                    smooth: 0.6,
                    symbol: 'none',
                    lineStyle: {
                      width: 2,
                    },
                    areaStyle: {},

                    name: chartOptions?.singleValue || 'total',
                    label: {
                      show: false,
                    },
                  },
                ],
              }
            : undefined,
      });
      break;
    }
    case CHART_TYPES.table: {
      const modifiedData: any = [];
      if (datasets) {
        const keys: any = [];
        const data2: any = [];
        datasets?.map((item: any) => {
          keys.push(item.label);
          data2.push(item.data);
        });
        for (let i = 0; i < data2[0]?.length; i += 1) {
          const obj: any = {};
          for (let j = 0; j < keys.length; j += 1) {
            obj[keys[j]] = data2[j][i];
          }
          modifiedData.push(obj);
        }
      }
      Object.assign(option, {
        data: modifiedData,
        tableSettings,
      });
      break;
    }
    case CHART_TYPES.horizontalStackTable: {
      const modifiedData: any = [];
      if (datasets) {
        const keys: any = [];
        const data2: any = [];
        datasets?.map((item: any) => {
          keys.push(item.label);
          data2.push(item.data);
        });
        for (let i = 0; i < data2[0]?.length; i += 1) {
          const obj: any = {};
          for (let j = 0; j < keys.length; j += 1) {
            obj[keys[j]] = data2[j][i];
          }
          modifiedData.push(obj);
        }
      }
      Object.assign(option, {
        data: modifiedData,
        tableSettings,
        colors,
      });
      break;
    }
    case CHART_TYPES.pivot: {
      Object.assign(option, {
        pivotTableSettings,
      });
      break;
    }
    case CHART_TYPES.pivotV2: {
      Object.assign(option, {
        pivotTableSettings2,
      });
      break;
    }
    case CHART_TYPES.treeMap: {
      const formatUtil = format;
      const getLevelOption = () => {
        return [
          {
            itemStyle: {
              borderWidth: 0,
              gapWidth: 5,
            },
          },
          {
            itemStyle: {
              gapWidth: 1,
            },
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              gapWidth: 1,
              borderColorSaturation: 0.6,
            },
          },
        ];
      };
      Object.assign(option, {
        ...option,
        tooltip: {
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,

          formatter(info: any) {
            const value = info.value;
            const treePathInfo = info.treePathInfo;
            const treePath = [];
            for (let i = 1; i < treePathInfo.length; i++) {
              treePath.push(treePathInfo[i].name);
            }
            return [
              `<div>${formatUtil.encodeHTML(treePath.join('-'))}</div>`,
              `value: ${formatUtil.addCommas(value)}`,
            ].join('');
          },
        },
        series: [
          {
            type: 'treemap',
            visibleMin: 600,
            label: {
              show: true,
              formatter: '{b}',
            },
            upperLabel: {
              show: true,
              height: 30,
            },
            itemStyle: {
              borderColor: '#fff',
            },
            levels: getLevelOption(),
            data: treeMapData,
          },
        ],
      });
      break;
    }
    case CHART_TYPES.geoMap: {
      let modifiedData: any = [];
      let values: any = [];
      if (chartOptions?.xAxis && chartOptions?.yAxisList?.length) {
        modifiedData = data?.map((item) => ({
          name: item[chartOptions?.xAxis || ''],
          value: item[chartOptions?.yAxisList?.[0] || ''],
        }));
        values = data?.map((item) => item[chartOptions?.yAxisList?.[0] || '']);
      }
      if (geoJsonData) {
        echarts.registerMap('USA', geoJsonData, {
          Alaska: {
            left: -131,
            top: 25,
            width: 15,
          },
          Hawaii: {
            left: -110,
            top: 28,
            width: 5,
          },
          'Puerto Rico': {
            left: -76,
            top: 26,
            width: 2,
          },
        });
        Object.assign(option, {
          ...option,
          title: chartOptions.customSettings?.enableTitleDesc
            ? {
                text: chartOptions.customSettings?.chartTitle,
                subtext: chartOptions.customSettings?.chartDesc,
                ...titlePosition,
              }
            : {},
          toolbox: {
            emphasis: {
              iconStyle: {
                borderColor: '#5865F6',
              },
            },
          },
          backgroundColor: chartOptions.customSettings?.enableBackgroundGradient
            ? backgroundGradient
            : '',
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            className: `getChartOptions-tooltip`,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
          },
          ...(modifiedData?.length
            ? {
                visualMap: {
                  left: 'right',
                  min: Math.min(...values),
                  max: Math.max(...values),
                  inRange: {
                    color: mapColors,
                  },
                  text: ['High', 'Low'],
                  calculable: true,
                },
              }
            : {}),
          series: [
            {
              name: 'USA',
              type: 'map',
              roam: true,
              map: 'USA',
              emphasis: {
                label: {
                  show: true,
                },
              },
              animationDurationUpdate: 1000,
              universalTransition: true,
              data: modifiedData,
            },
          ],
        });
      }
      break;
    }
    case CHART_TYPES.geoBarMap: {
      let modifiedData: any = [];
      let values: any = [];
      if (chartOptions?.xAxis && chartOptions?.yAxisList?.length) {
        modifiedData = data
          ?.map((item) => ({
            name: item[chartOptions?.xAxis || ''],
            value: item[chartOptions?.yAxisList?.[0] || ''],
          }))
          .sort((a, b) => a.value - b.value);
        values = data?.map((item) => item[chartOptions?.yAxisList?.[0] || '']);
      }
      if (geoJsonData) {
        echarts.registerMap('USA', geoJsonData, {
          Alaska: {
            left: -131,
            top: 25,
            width: 15,
          },
          Hawaii: {
            left: -110,
            top: 28,
            width: 5,
          },
          'Puerto Rico': {
            left: -76,
            top: 26,
            width: 2,
          },
        });
        Object.assign(option, {
          ...option,
          geoOption: {
            title: chartOptions.customSettings?.enableTitleDesc
              ? {
                  text: chartOptions.customSettings?.chartTitle,
                  subtext: chartOptions.customSettings?.chartDesc,
                  ...titlePosition,
                }
              : {},
            toolbox: {
              emphasis: {
                iconStyle: {
                  borderColor: '#5865F6',
                },
              },
            },
            backgroundColor: chartOptions.customSettings
              ?.enableBackgroundGradient
              ? backgroundGradient
              : '',
            tooltip: {
              trigger: 'item',
              showDelay: 0,
              transitionDuration: 0.2,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
              className: `getChartOptions-tooltip`,
              valueFormatter: (value: any) =>
                addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                ),
            },
            ...(modifiedData?.length
              ? {
                  visualMap: {
                    left: 'right',
                    min: Math.min(...values),
                    max: Math.max(...values),
                    inRange: {
                      color: mapColors,
                    },
                    text: ['High', 'Low'],
                    calculable: true,
                  },
                }
              : {}),
            series: [
              {
                name: 'USA',
                type: 'map',
                id: 'population',
                roam: true,
                map: 'USA',
                animationDurationUpdate: 1000,
                universalTransition: true,
                data: modifiedData,
              },
            ],
          },
          barOption: {
            xAxis: {
              type: 'value',
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                rotate: 0,
              },
              data: modifiedData?.map((item: any) => {
                return item?.name;
              }),
            },
            animationDurationUpdate: 1000,
            series: {
              type: 'bar',
              id: 'population',
              data: modifiedData?.map((item: any) => {
                return item?.value;
              }),
              universalTransition: true,
            },
          },
        });
      }
      break;
    }
    case CHART_TYPES.geoScatterMap: {
      let modifiedData: any = [];
      let values: any = [];
      if (chartOptions.xAxis && chartOptions.yAxisList?.length) {
        values = data?.map((item) => item[chartOptions?.yAxisList?.[0] || '']);
        modifiedData = data
          ?.map((item) => {
            if (
              item[chartOptions?.yAxisList?.[0] || ''] &&
              item.longitude &&
              item.latitude
            ) {
              return [
                item.longitude,
                item.latitude,
                item[chartOptions?.yAxisList?.[0] || ''],
              ];
            }
            return null;
          })
          .filter(Boolean);
      }
      if (geoJsonData) {
        echarts.registerMap('USA', geoJsonData, {
          Alaska: {
            left: -131,
            top: 25,
            width: 15,
          },
          Hawaii: {
            left: -110,
            top: 28,
            width: 5,
          },
          'Puerto Rico': {
            left: -76,
            top: 26,
            width: 2,
          },
        });
        Object.assign(option, {
          ...option,
          title: chartOptions.customSettings?.enableTitleDesc
            ? {
                text: chartOptions.customSettings?.chartTitle,
                subtext: chartOptions.customSettings?.chartDesc,
                ...titlePosition,
              }
            : {},
          toolbox: {
            emphasis: {
              iconStyle: {
                borderColor: '#5865F6',
              },
            },
          },
          backgroundColor: chartOptions.customSettings?.enableBackgroundGradient
            ? backgroundGradient
            : '',
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            className: `getChartOptions-tooltip`,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
          },
          geo: {
            tooltip: {
              show: true,
            },
            map: 'USA',
            roam: true,
            itemStyle: {
              areaColor: '#808080',
              borderColor: '#ffffff',
            },
            emphasis: {
              label: {
                show: true,
              },
              itemStyle: {
                areaColor: '#cccccc',
              },
            },
          },
          ...(modifiedData?.length
            ? {
                visualMap: {
                  left: 'right',
                  min: Math.min(...values),
                  max: Math.max(...values),
                  inRange: {
                    color: mapColors,
                  },
                  text: ['High', 'Low'],
                  calculable: true,
                },
              }
            : {}),
          series: {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            symbolSize(params: any) {
              return (params[2] / Math.max(...values)) * 15 + 5;
            },
            itemStyle: {
              color: '#b02a02',
            },
            encode: {
              tooltip: 2,
            },
            data: modifiedData,
          },
        });
      }
      break;
    }
    case CHART_TYPES.worldMap: {
      let modifiedData: any = [];
      let values: any = [];
      if (chartOptions?.xAxis && chartOptions?.yAxisList?.length) {
        modifiedData = data?.map((item) => ({
          name: item[chartOptions?.xAxis || ''],
          value: item[chartOptions?.yAxisList?.[0] || ''],
        }));
        values = data?.map((item) => item[chartOptions?.yAxisList?.[0] || '']);
      }
      if (geoJsonData) {
        echarts.registerMap('world', geoJsonData);
        Object.assign(option, {
          ...option,
          title: chartOptions.customSettings?.enableTitleDesc
            ? {
                text: chartOptions.customSettings?.chartTitle,
                subtext: chartOptions.customSettings?.chartDesc,
                ...titlePosition,
              }
            : {},
          toolbox: {
            emphasis: {
              iconStyle: {
                borderColor: '#5865F6',
              },
            },
          },
          backgroundColor: chartOptions.customSettings?.enableBackgroundGradient
            ? backgroundGradient
            : '',
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            className: `getChartOptions-tooltip`,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
          },
          ...(modifiedData?.length
            ? {
                visualMap: {
                  left: 'right',
                  min: Math.min(...values),
                  max: Math.max(...values),
                  inRange: {
                    color: mapColors,
                  },
                  text: ['High', 'Low'],
                  calculable: true,
                },
              }
            : {}),
          series: [
            {
              name: chartOptions?.yAxisList?.[0],
              type: 'map',
              roam: true,
              map: 'world',
              emphasis: {
                label: {
                  show: true,
                },
              },
              animationDurationUpdate: 1000,
              universalTransition: true,
              data: modifiedData,
            },
          ],
        });
      }
      break;
    }
    default:
      break;
  }
  return option;
};
