/* eslint-disable no-plusplus */
/* eslint-disable react/forbid-dom-props */
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import styles from './configure.module.css';
import PositionContainer from './PositionContainer';
import ComboChartFormatter from './ComboChartFormatter';
import { ChartSettingsType, FloatingDropDownOption } from '@/types/app';
import {
  Text,
  InputField,
  InfoTooltip,
  Button,
  Alert,
  Icons,
  AccordionV3,
  Switch,
  FloatingDropDown,
  ColorField,
  NewTooltip,
  MultiSelectDropdown,
} from '@/components';
import TimeSeriesSettings from '@/components/TimeSeriesSettings';
import {
  CHART_TYPES,
  FORMATTING_CONDITIONS_OPTIONS,
  NUMBER_FORMAT,
  TIME_GRAIN_OPTIONS,
  TableRowsList,
  GRADIENTS,
} from '@/consts';
import { ComparisonLagSettings, TimeSeriesSettingsType } from '@/types';

export type ComparisonLagProps =
  | {
      setComparisonLagSettings: React.Dispatch<
        React.SetStateAction<ComparisonLagSettings>
      >;
      comparisonLagSettings: ComparisonLagSettings;
      dateTimeColumnList: FloatingDropDownOption[];
      onSaveComparisonLag: () => void;
    }
  | undefined;
const getValuePositioningLabelOptions = (
  chartType: ChartSettingsType['chartType']
) => {
  const options = [
    CHART_TYPES.pie,
    CHART_TYPES.doughnut,
    CHART_TYPES.rose,
    CHART_TYPES.funnel,
    CHART_TYPES.sankey,
  ].includes(chartType)
    ? [
        { label: 'Outside', value: 'outside' },
        { label: 'Inside', value: 'inside' },
        { label: 'Hidden', value: 'hidden' },
      ]
    : [
        { label: 'Hidden', value: 'hidden' },
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
        { label: 'Inside', value: 'inside' },
      ];
  if (chartType === CHART_TYPES.sankey) {
    options.push(
      { label: 'Right', value: 'right' },
      { label: 'Left', value: 'left' }
    );
  }
  return options;
};

type Props = {
  chartSettings: ChartSettingsType;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  setBarRadius: React.Dispatch<
    React.SetStateAction<{
      topRadius: number;
      bottomRadius: number;
    }>
  >;
  comparisonLagProps?: ComparisonLagProps;
  setResetPallete?: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeTimeseriesFormat: (value: FloatingDropDownOption) => void;
};

export const ChartConfigure = ({
  chartSettings,
  setChartSettings,
  setBarRadius,
  comparisonLagProps,
  setResetPallete,
  onChangeTimeseriesFormat,
}: Props) => {
  const shuffleArray = () => {
    const shuffled = [...(chartSettings.chartColors || [])];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setChartSettings((prev) => ({
      ...prev,
      chartColors: shuffled,
    }));
  };

  const [isShowRuleFields, setShowRuleFields] = useState<boolean>(false);
  const [isShowGradient, setShowGradient] = useState<boolean>(false);
  const [conditionError, setConditionError] = useState<string>('');
  const [isOpenRangeModal, setOpenRangeModal] = useState<boolean>(false);
  const [conditionalFormatting, setConditionalFormatting] = useState<{
    columnName: string;
    value: any;
    operator: string;
    backgrounColor: string;
    color: string;
  }>({
    backgrounColor: '#FFFFFF',
    color: '#000000',
    columnName: chartSettings.yAxisList?.[0] || '',
    operator: FORMATTING_CONDITIONS_OPTIONS[0].value,
    value: '',
  });
  const [singleValFormatter, setSingleValFormatter] = useState<{
    min: number;
    max: number;
    color: string;
  }>({
    min: 0,
    max: 0,
    color: '#000000',
  });
  const [gradient, setGradient] = useState<{
    startColor: string;
    endColor: string;
    offset1: number;
    offset2: number;
    direction: string;
    isRadial: boolean;
  }>({
    startColor: '#FFFFFF',
    endColor: '#000000',
    offset1: 0.5,
    offset2: 0.05,
    direction: 'left',
    isRadial: false,
  });
  const [range, setRange] = useState<{
    label: string;
    upperLimit: number;
    lowerLimit: number;
    color?: string;
  }>({
    label: '',
    upperLimit: 0,
    lowerLimit: 0,
  });

  const badgeOptions = useMemo(() => {
    return chartSettings?.yAxisList?.filter(
      (item) => !chartSettings.tableSettings?.listColumns?.includes(item)
    );
  }, [chartSettings.tableSettings?.listColumns, chartSettings.yAxisList]);
  const badgeColumnOptions = useMemo(() => {
    return (
      badgeOptions?.map((item) => ({
        value: item,
        label: item,
      })) || []
    );
  }, [badgeOptions]);
  const listOptions = useMemo(() => {
    return chartSettings?.yAxisList?.filter(
      (item) => !chartSettings.tableSettings?.badgeColumns?.includes(item)
    );
  }, [chartSettings.tableSettings?.badgeColumns, chartSettings.yAxisList]);
  const listColumnOptions = useMemo(() => {
    return (
      listOptions?.map((item) => ({
        value: item,
        label: item,
      })) || []
    );
  }, [listOptions]);

  const onSaveRange = () => {
    const prevRangeLimits =
      chartSettings.customSettings?.YaxislabelFormatters || [];
    setChartSettings((prev) => ({
      ...prev,
      customSettings: {
        ...prev.customSettings,
        YaxislabelFormatters: [...prevRangeLimits, range],
      },
    }));
    setRange({
      label: '',
      upperLimit: 0,
      lowerLimit: 0,
    });
    setOpenRangeModal(false);
  };

  const onDeleteRange = (format: {
    upperLimit: number;
    lowerLimit: number;
    label: string;
  }) => {
    const updatedRanges =
      chartSettings.customSettings?.YaxislabelFormatters?.filter(
        (val) =>
          val.label !== format.label &&
          val.lowerLimit !== format.lowerLimit &&
          val.upperLimit !== format.upperLimit
      );
    setChartSettings((prev) => ({
      ...prev,
      customSettings: {
        ...prev.customSettings,
        YaxislabelFormatters: updatedRanges,
      },
    }));
  };

  useEffect(() => {
    if (chartSettings.yAxisList !== undefined) {
      const newComboAxisSymbols = chartSettings.yAxisList.map(
        (name, index) => ({
          name,
          prefix:
            chartSettings.customSettings?.comboAxisSymbols?.[index]?.prefix ||
            '',
          suffix:
            chartSettings.customSettings?.comboAxisSymbols?.[index]?.suffix ||
            '',
        })
      );

      setChartSettings((prev) => {
        const prevComboAxisSymbols =
          prev.customSettings?.comboAxisSymbols || [];
        const isSame = newComboAxisSymbols.every(
          (item, index) =>
            item.name === prevComboAxisSymbols[index]?.name &&
            item.prefix === prevComboAxisSymbols[index]?.prefix &&
            item.suffix === prevComboAxisSymbols[index]?.suffix
        );
        if (!isSame) {
          return {
            ...prev,
            customSettings: {
              ...prev.customSettings,
              comboAxisSymbols: newComboAxisSymbols,
            },
          };
        }
        return prev;
      });
    }
  }, [chartSettings.yAxisList]);

  const onSaveGradient = (newGradient?: {
    startColor: string;
    endColor: string;
    offset1: number;
    offset2: number;
    direction: string;
    isRadial: boolean;
  }) => {
    if (
      (newGradient || gradient).startColor &&
      (newGradient || gradient).endColor &&
      (newGradient || gradient).offset1 &&
      (newGradient || gradient).offset2 &&
      (newGradient || gradient).direction
    ) {
      const prevGradients = chartSettings.customSettings?.gradients || [];
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...chartSettings.customSettings,
          gradients: [
            ...prevGradients,
            {
              startColor: (newGradient || gradient).startColor,
              endColor: (newGradient || gradient).endColor,
              offset1: (newGradient || gradient).offset1,
              offset2: (newGradient || gradient).offset2,
              direction: (newGradient || gradient).direction,
              isRadial: (newGradient || gradient).isRadial,
            },
          ],
        },
      }));
      setShowGradient(false);
    }
  };

  const onSaveConditionRule = () => {
    setConditionError('');

    if (
      conditionalFormatting.backgrounColor &&
      conditionalFormatting.color &&
      conditionalFormatting.columnName &&
      conditionalFormatting.operator &&
      conditionalFormatting.value
    ) {
      setChartSettings((prev) => {
        const { tableSettings } = prev;

        const filteredFormatting =
          tableSettings?.conditionalFormatting?.filter(
            (value) => value.columnName !== conditionalFormatting.columnName
          ) || [];

        const columnRules =
          tableSettings?.conditionalFormatting?.find(
            (value) => value.columnName === conditionalFormatting.columnName
          )?.rules || [];

        const updatedRules = [
          ...columnRules,
          {
            operator: conditionalFormatting.operator,
            styles: {
              backgroundColor: conditionalFormatting.backgrounColor,
              color: conditionalFormatting.color,
            },
            value: conditionalFormatting.value,
          },
        ];

        const updatedFormatting = [
          ...filteredFormatting,
          {
            columnName: conditionalFormatting.columnName,
            rules: updatedRules,
          },
        ];

        return {
          ...prev,
          tableSettings: {
            ...tableSettings,
            conditionalFormatting: updatedFormatting,
          },
        };
      });
      setConditionalFormatting({
        backgrounColor: '#FFFFFF',
        color: '#000000',
        columnName: chartSettings.yAxisList?.[0] || '',
        operator: FORMATTING_CONDITIONS_OPTIONS[0].value,
        value: '',
      });
      setShowRuleFields(false);
    } else {
      setConditionError('please add valid values for rule');
    }
  };
  const onSaveSingleValCondition = () => {
    setConditionError('');

    if (
      singleValFormatter.color &&
      singleValFormatter.min.toString() &&
      singleValFormatter.max
    ) {
      setChartSettings((prev) => {
        const { customSettings } = prev;

        const filteredFormatting =
          customSettings?.singleValConditionalFormatter?.filter(
            (value) =>
              value.min !== singleValFormatter.min &&
              value.max !== singleValFormatter.max
          ) || [];

        const updatedFormatting = [...filteredFormatting, singleValFormatter];

        return {
          ...prev,
          customSettings: {
            ...prev.customSettings,
            singleValConditionalFormatter: updatedFormatting,
          },
        };
      });
      setSingleValFormatter({
        color: '#000000',
        min: 0,
        max: 0,
      });
      setShowRuleFields(false);
    } else {
      setConditionError('Please add valid values for the condition');
    }
  };
  const setBadgeColumns = useCallback(
    (list: string[]) => {
      const badgeColumnValues =
        badgeColumnOptions?.map((o: { value: any }) => o.value) || [];
      setChartSettings((prev) => ({
        ...prev,
        tableSettings: {
          ...chartSettings.tableSettings,
          badgeColumns: list.filter(
            (item) =>
              item && item !== 'NONE' && badgeColumnValues.includes(item)
          ),
        },
      }));
    },
    [badgeColumnOptions, chartSettings.tableSettings, setChartSettings]
  );
  const setListColumns = useCallback(
    (list: string[]) => {
      const listColumnValues =
        listColumnOptions?.map((o: { value: any }) => o.value) || [];
      setChartSettings((prev) => ({
        ...prev,
        tableSettings: {
          ...chartSettings.tableSettings,
          listColumns: list.filter(
            (item) => item && item !== 'NONE' && listColumnValues.includes(item)
          ),
        },
      }));
    },
    [listColumnOptions, chartSettings.tableSettings, setChartSettings]
  );

  const onRemoveGradient = (value: any) => {
    setChartSettings((prev) => {
      const { customSettings } = prev;
      const updatedGradients = customSettings?.gradients?.filter((val) => {
        return (
          val.startColor !== value.startColor ||
          val.endColor !== value.endColor ||
          val.offset1 !== value.offset1 ||
          val.offset2 !== value.offset2 ||
          val.direction !== value.direction
        );
      });
      return {
        ...prev,
        customSettings: {
          ...customSettings,
          gradients: updatedGradients,
        },
      };
    });
  };

  const onRemoveRule = (
    columnName: string,
    rule: {
      operator: string;
      value: string;
      styles: any;
    }
  ) => {
    setChartSettings((prev) => {
      const { tableSettings } = prev;

      const updatedFormatting = tableSettings?.conditionalFormatting?.map(
        (format) => {
          if (format.columnName === columnName) {
            const updatedRules = format.rules.filter(
              (r) => !(r.operator === rule.operator && r.value === rule.value)
            );
            return {
              ...format,
              rules: updatedRules,
            };
          }
          return format;
        }
      );

      return {
        ...prev,
        tableSettings: {
          ...tableSettings,
          conditionalFormatting: updatedFormatting?.filter(
            (colRule) => colRule.rules.length > 0
          ),
        },
      };
    });
  };
  const onRemoveSingleValRule = (rule: {
    min: number;
    max: number;
    color: string;
  }) => {
    setChartSettings((prev) => {
      const { customSettings } = prev;

      const updatedFormatting =
        customSettings?.singleValConditionalFormatter?.filter(
          (format) =>
            format.min !== rule.min &&
            format.max !== rule.max &&
            format.color !== rule.color
        );

      return {
        ...prev,
        customSettings: {
          ...customSettings,
          singleValConditionalFormatter: updatedFormatting,
        },
      };
    });
  };
  const isGeoMap = [
    CHART_TYPES.geoBarMap,
    CHART_TYPES.geoMap,
    CHART_TYPES.geoScatterMap,
    CHART_TYPES.worldMap,
  ].includes(chartSettings.chartType);
  const isInavlidForLabelFormatting = [
    CHART_TYPES.pie,
    CHART_TYPES.doughnut,
    CHART_TYPES.rose,
    CHART_TYPES.funnel,
    CHART_TYPES.singleValue,
    CHART_TYPES.table,
    CHART_TYPES.pivot,
    CHART_TYPES.horizontalStackTable,
    CHART_TYPES.geoBarMap,
    CHART_TYPES.geoMap,
    CHART_TYPES.geoScatterMap,
    CHART_TYPES.sankey,
    CHART_TYPES.combo,
    CHART_TYPES.timeSeries,
    CHART_TYPES.geoBarMap,
    CHART_TYPES.geoMap,
    CHART_TYPES.geoScatterMap,
    CHART_TYPES.worldMap,
  ].includes(chartSettings.chartType);
  useEffect(() => {
    if (chartSettings.customSettings?.isEnableLabelFormatting) {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          numberFormatter: '',
        },
      }));
    }
  }, [chartSettings.customSettings?.isEnableLabelFormatting]);
  if (chartSettings.chartType === CHART_TYPES.singleValue) {
    return (
      <div className={styles.container}>
        <AccordionV3
          width="100%"
          content={
            <div className={styles.container}>
              <div className={styles['container-wrapper']}>
                <div className={styles.wrapper}>
                  <Text variant="heading">Single Value Chart Font Size</Text>
                  <div className={styles.inputWrapper}>
                    <InputField
                      type="number"
                      onChange={(e) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            fontSize: parseInt(e.target.value, 10),
                          },
                        }))
                      }
                      value={chartSettings.customSettings?.fontSize}
                    />
                  </div>
                </div>
                <div className={styles.wrapper}>
                  <Text variant="heading">Single Value Suffix</Text>
                  <div className={styles.inputWrapper}>
                    <InputField
                      type="text"
                      onChange={(e) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            singleValueSuffix: e.target.value,
                          },
                        }))
                      }
                      value={chartSettings.customSettings?.singleValueSuffix}
                    />
                  </div>
                </div>
                <div className={styles.wrapper}>
                  <Text variant="heading">Single Value Prefix</Text>
                  <div className={styles.inputWrapper}>
                    <InputField
                      type="text"
                      onChange={(e) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            singleValuePrefix: e.target.value,
                          },
                        }))
                      }
                      value={chartSettings.customSettings?.singleValuePrefix}
                    />
                  </div>
                </div>
                <div className={styles.wrapper}>
                  <Text variant="heading">Customise Sub-Header</Text>
                  <Switch
                    name="show sub header"
                    enabled={chartSettings.customSettings?.subHeaderShow}
                    onChange={() =>
                      setChartSettings((prev) => ({
                        ...prev,
                        customSettings: {
                          ...prev.customSettings,
                          subHeaderShow: !prev.customSettings?.subHeaderShow,
                        },
                      }))
                    }
                  />
                </div>
                <div className={styles.wrapper}>
                  <Text variant="heading">Font Color</Text>
                  <div className={styles.inputWrapper}>
                    <ColorField
                      name="color"
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            singleValueFontColor: value,
                          },
                        }))
                      }
                      defaultValue="#000000"
                      value={
                        chartSettings.customSettings?.singleValueFontColor ||
                        '#000000'
                      }
                    />
                  </div>
                </div>
                {chartSettings.customSettings?.subHeaderShow && (
                  <>
                    <div className={styles.wrapper}>
                      <Text variant="heading">Sub-Header Display Text</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="text"
                          placeholder="Enter the text here"
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                displayText: e.target.value,
                              },
                            }))
                          }
                          value={chartSettings.customSettings.displayText}
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="heading">Sub-Header Font Size</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="number"
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                subHeaderFontSize: parseInt(e.target.value, 10),
                              },
                            }))
                          }
                          value={chartSettings.customSettings.subHeaderFontSize}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className={styles.wrapper}>
                  <Text variant="heading">Number Formatting</Text>
                  <FloatingDropDown
                    selectedOption={{
                      value:
                        chartSettings.customSettings?.numberFormatter ||
                        'Original',
                      label:
                        `${chartSettings.customSettings?.numberFormatter
                          ?.toString()
                          .charAt(0)
                          .toUpperCase()}${chartSettings.customSettings?.numberFormatter
                          ?.toString()
                          ?.slice(1)}` || 'Original',
                    }}
                    options={NUMBER_FORMAT}
                    onChange={(value) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        customSettings: {
                          ...prev.customSettings,
                          numberFormatter: value.value,
                        },
                      }))
                    }
                    buttonWidth="150px"
                    menuWidth="250px"
                  />
                </div>
              </div>
              {comparisonLagProps && (
                <AccordionV3
                  header={
                    <div className={styles.accordionHeader}>
                      <Text variant="heading">Comparison Value</Text>
                      <InfoTooltip
                        text="Comparison Value"
                        position="top"
                        tooltipClass="dbn-w-[200px]"
                      />
                    </div>
                  }
                  headerButton={
                    <div className={styles.wrapper}>
                      <Switch
                        name="Comparison value"
                        enabled={
                          chartSettings.customSettings?.comparisonValueShow
                        }
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              comparisonValueShow:
                                !prev.customSettings?.comparisonValueShow,
                            },
                          }))
                        }
                      />
                    </div>
                  }
                  content={
                    <div className={styles.comparisonValueWrapper}>
                      <div className={styles.comparisonValueContainer}>
                        <FloatingDropDown
                          onChange={(value) => {
                            comparisonLagProps.setComparisonLagSettings(
                              (prev) => ({
                                ...prev,
                                column: value,
                              })
                            );
                          }}
                          selectedOption={
                            comparisonLagProps.comparisonLagSettings.column
                          }
                          options={comparisonLagProps.dateTimeColumnList}
                          isDisabled={
                            !comparisonLagProps.dateTimeColumnList.length
                          }
                          labelVariant="static"
                          buttonWidth="320px"
                          menuWidth="320px"
                          label="Time Column"
                        />

                        <FloatingDropDown
                          onChange={(value) => {
                            comparisonLagProps.setComparisonLagSettings(
                              (prev) => ({
                                ...prev,
                                timeGrain: value,
                              })
                            );
                          }}
                          selectedOption={
                            comparisonLagProps.comparisonLagSettings.timeGrain
                          }
                          options={TIME_GRAIN_OPTIONS}
                          isDisabled={
                            !comparisonLagProps.comparisonLagSettings.column
                          }
                          labelVariant="static"
                          label="Time Grain"
                          buttonWidth="320px"
                          menuWidth="320px"
                        />

                        <InputField
                          label="Comparison Period Lag"
                          min={1}
                          type="number"
                          placeholder="period lag"
                          onChange={({ target: { value } }) =>
                            comparisonLagProps.setComparisonLagSettings(
                              (prev) => ({
                                ...prev,
                                periodLag: parseInt(value, 10),
                              })
                            )
                          }
                          value={
                            comparisonLagProps.comparisonLagSettings.periodLag
                          }
                        />

                        <div className={styles.wrapper}>
                          <Text variant="heading">Comparison Suffix</Text>
                          <div className={styles.inputWrapper}>
                            <InputField
                              type="text"
                              placeholder="enter comparison suffix"
                              onChange={(e) =>
                                setChartSettings((prev) => ({
                                  ...prev,
                                  customSettings: {
                                    ...prev.customSettings,
                                    comparisonSuffix: e.target.value,
                                  },
                                }))
                              }
                              value={
                                chartSettings.customSettings?.comparisonSuffix
                              }
                            />
                          </div>
                        </div>
                        <div className={styles.wrapper}>
                          <Text variant="heading">
                            Comparison Value Font Size
                          </Text>
                          <div className={styles.inputWrapper}>
                            <InputField
                              type="number"
                              onChange={(e) =>
                                setChartSettings((prev) => ({
                                  ...prev,
                                  customSettings: {
                                    ...prev.customSettings,
                                    comparisonValueFontSize: parseInt(
                                      e.target.value,
                                      10
                                    ),
                                  },
                                }))
                              }
                              value={
                                chartSettings.customSettings
                                  ?.comparisonValueFontSize
                              }
                            />
                          </div>
                        </div>
                        <div className={styles.wrapper}>
                          <Text variant="heading">Show Trendline</Text>
                          <Switch
                            name="show trendline"
                            enabled={
                              chartSettings.customSettings?.isShowTrendLine
                            }
                            onChange={() =>
                              setChartSettings((prev) => ({
                                ...prev,
                                customSettings: {
                                  ...prev.customSettings,
                                  isShowTrendLine:
                                    !prev.customSettings?.isShowTrendLine,
                                },
                              }))
                            }
                          />
                        </div>
                        <Button
                          variant="primary"
                          isDisabled={
                            !comparisonLagProps.dateTimeColumnList.length ||
                            !comparisonLagProps.comparisonLagSettings.column
                              .value ||
                            comparisonLagProps.comparisonLagSettings
                              .periodLag <= 0 ||
                            !comparisonLagProps.comparisonLagSettings.timeGrain
                              .value
                          }
                          onClick={() =>
                            comparisonLagProps.onSaveComparisonLag()
                          }
                        >
                          save
                        </Button>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          }
          header={<Text variant="heading">Customizations</Text>}
          headerButton={null}
        />
        <AccordionV3
          width="100%"
          content={
            <div className={styles['container-wrapper']}>
              <Text variant="label">
                You can add rules to change the font color of the single value
                if it meet certain conditions.
              </Text>
              {!isShowRuleFields && (
                <Button
                  variant="secondary"
                  onClick={() => setShowRuleFields(true)}
                  leftIcon={<Icons name="plus" />}
                  fitContainer
                >
                  Add New Rule
                </Button>
              )}
              {isShowRuleFields && (
                <>
                  <Text variant="heading">Range</Text>
                  <div className="dbn-w-full dbn-flex dbn-gap-4">
                    <InputField
                      type="number"
                      label="Min Value"
                      onChange={({ target: { value } }) =>
                        setSingleValFormatter((prev) => ({
                          ...prev,
                          min: Number(value),
                        }))
                      }
                    />
                    <InputField
                      type="number"
                      label="Max Value"
                      onChange={({ target: { value } }) =>
                        setSingleValFormatter((prev) => ({
                          ...prev,
                          max: Number(value),
                        }))
                      }
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="heading">Font Color</Text>
                    <div className={styles.inputWrapper}>
                      <ColorField
                        name="text color"
                        onChange={(value) =>
                          setSingleValFormatter((prev) => ({
                            ...prev,
                            color: value,
                          }))
                        }
                        defaultValue="#000000"
                        value={singleValFormatter.color}
                      />
                    </div>
                  </div>
                  {conditionError && (
                    <Alert text={conditionError} variant="error" />
                  )}
                  <div className="dbn-w-full dbn-flex dbn-justify-between">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSingleValFormatter({
                          min: 0,
                          max: 0,
                          color: '#000000',
                        });
                        setConditionError('');
                        setShowRuleFields(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={() => onSaveSingleValCondition()}
                    >
                      Save Condition
                    </Button>
                  </div>
                </>
              )}
              {chartSettings.customSettings?.singleValConditionalFormatter?.map(
                (value) => (
                  <div className={styles.formattingContainer} key={value.color}>
                    <div className={styles.ruleContainer}>
                      <div className="dbn-flex dbn-gap-1 dbn-justify-between">
                        <Text variant="body-text-sm">{`${value.min} - ${value.max}( ${value.color} )`}</Text>
                        <Button
                          variant="popover"
                          className="dbn-flex dbn-gap-1"
                          onClick={() => onRemoveSingleValRule(value)}
                          rightIcon={<Icons name="cross" />}
                          key={value.min}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          }
          header={<Text variant="heading">Conditional Formatting</Text>}
          headerButton={null}
        />
      </div>
    );
  }
  if (
    [
      CHART_TYPES.table,
      CHART_TYPES.horizontalStackTable,
      CHART_TYPES.pivotV2,
    ].includes(chartSettings.chartType)
  ) {
    return (
      <div className={styles.container}>
        {chartSettings.chartType !== CHART_TYPES.pivotV2 ? (
          <>
            <AccordionV3
              width="100%"
              content={
                <div className={styles['container-wrapper']}>
                  <div className={styles.wrapper}>
                    <Text variant="heading">Table content Alignment</Text>
                    <FloatingDropDown
                      selectedOption={{
                        value:
                          chartSettings.tableSettings?.contentAlignment || '',
                        label:
                          chartSettings.tableSettings?.contentAlignment || '',
                      }}
                      options={[
                        { label: 'Left Aligned', value: 'left' },
                        { label: 'Right Aligned', value: 'right' },
                        { label: 'Center Aligned', value: 'center' },
                      ]}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          tableSettings: {
                            ...prev.tableSettings,
                            contentAlignment: value.value,
                          },
                        }))
                      }
                      buttonWidth="150px"
                      menuWidth="150px"
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="heading">Table Line Gap</Text>
                    <FloatingDropDown
                      selectedOption={{
                        value: chartSettings.tableSettings?.lineGap || 'small',
                        label: chartSettings.tableSettings?.lineGap || 'small',
                      }}
                      options={[
                        { label: 'Small', value: 'small' },
                        { label: 'Medium', value: 'medium' },
                      ]}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          tableSettings: {
                            ...prev.tableSettings,
                            lineGap: value.value,
                          },
                        }))
                      }
                      buttonWidth="150px"
                      menuWidth="150px"
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="heading">Table Title</Text>
                    <div className={styles.inputWrapper}>
                      <InputField
                        type="text"
                        onChange={(e) =>
                          setChartSettings((prev) => ({
                            ...prev,
                            tableSettings: {
                              ...prev.tableSettings,
                              tableTitle: e.target.value,
                            },
                          }))
                        }
                        value={chartSettings.tableSettings?.tableTitle}
                        placeholder="Enter the title here"
                      />
                    </div>
                  </div>
                  {chartSettings.chartType ===
                  CHART_TYPES.horizontalStackTable ? (
                    <>
                      <div className={styles.wrapper}>
                        <Text variant="heading">Stacked Column Alias</Text>
                        <div className={styles.inputWrapper}>
                          <InputField
                            type="text"
                            onChange={(e) =>
                              setChartSettings((prev) => ({
                                ...prev,
                                tableSettings: {
                                  ...prev.tableSettings,
                                  stackColAlias: e.target.value,
                                },
                              }))
                            }
                            value={chartSettings.tableSettings?.stackColAlias}
                            placeholder="Enter the title here"
                          />
                        </div>
                      </div>
                      <div className={styles.wrapper}>
                        <Text variant="heading">Show Labels</Text>
                        <Switch
                          name="show stack labels"
                          enabled={
                            chartSettings.customSettings?.showStackLabels
                          }
                          onChange={() =>
                            setChartSettings((prev) => ({
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                showStackLabels:
                                  !prev.customSettings?.showStackLabels,
                              },
                            }))
                          }
                        />
                      </div>
                    </>
                  ) : null}
                  <div className={styles.wrapper}>
                    <Text variant="heading">List Columns</Text>
                    <div className="dbn-w-[200px] dbn-flex dbn-justify-end">
                      <MultiSelectDropdown
                        buttonWidth="150px"
                        menuWidth="150px"
                        options={listColumnOptions}
                        onChange={(options) =>
                          setListColumns(options.map((o) => o.value))
                        }
                        selectedOption={
                          chartSettings.tableSettings?.listColumns?.map(
                            (option) => ({ value: option, label: option })
                          ) || []
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="heading">List Separator</Text>
                    <div className={styles.inputWrapper}>
                      <InputField
                        type="text"
                        onChange={(e) =>
                          setChartSettings((prev) => ({
                            ...prev,
                            tableSettings: {
                              ...prev.tableSettings,
                              listSeparator: e.target.value,
                            },
                          }))
                        }
                        value={chartSettings.tableSettings?.listSeparator}
                        placeholder="Enter a separator for list"
                      />
                    </div>
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="heading">Badge Columns</Text>
                    <div className="dbn-w-[200px] dbn-flex dbn-justify-end">
                      <MultiSelectDropdown
                        buttonWidth="150px"
                        menuWidth="150px"
                        options={badgeColumnOptions}
                        onChange={(options) => {
                          setBadgeColumns(options.map((o) => o.value));
                        }}
                        selectedOption={
                          chartSettings.tableSettings?.badgeColumns?.map(
                            (option) => ({ value: option, label: option })
                          ) || []
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="heading">Badge Separator</Text>
                    <div className={styles.inputWrapper}>
                      <InputField
                        type="text"
                        onChange={(e) =>
                          setChartSettings((prev) => ({
                            ...prev,
                            tableSettings: {
                              ...prev.tableSettings,
                              badgeSeparator: e.target.value,
                            },
                          }))
                        }
                        value={chartSettings.tableSettings?.badgeSeparator}
                        placeholder="Enter a separator for badges"
                      />
                    </div>
                  </div>
                  {chartSettings.tableSettings?.badgeColumns?.map((badge) => (
                    <>
                      <Text variant="heading">{badge}</Text>
                      <div className={styles.badgeDiv}>
                        <ColorField
                          name="Badge color"
                          onChange={(value) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              tableSettings: {
                                ...prev.tableSettings,
                                badgeColors: {
                                  ...prev.tableSettings?.badgeColors,
                                  [badge]: value,
                                },
                              },
                            }))
                          }
                          defaultValue="#f3f4f6"
                          value={
                            chartSettings.tableSettings?.badgeColors?.[badge] ||
                            '#f3f4f6'
                          }
                          label="Badge Color"
                        />
                        <ColorField
                          name="Text color"
                          onChange={(value) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              tableSettings: {
                                ...prev.tableSettings,
                                badgeTextColors: {
                                  ...prev.tableSettings?.badgeTextColors,
                                  [badge]: value,
                                },
                              },
                            }))
                          }
                          defaultValue="#000000"
                          value={
                            chartSettings.tableSettings?.badgeTextColors?.[
                              badge
                            ] || '#000000'
                          }
                          label="Text Color"
                        />
                      </div>
                    </>
                  ))}
                  {chartSettings.chartType === CHART_TYPES.table ? (
                    <>
                      <div className={styles.wrapper}>
                        <Text variant="heading">Default Row Size</Text>
                        <FloatingDropDown
                          selectedOption={{
                            value:
                              chartSettings.tableSettings?.defaultRowSize || '',
                            label:
                              chartSettings.tableSettings?.defaultRowSize || '',
                          }}
                          options={TableRowsList}
                          onChange={(value) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              tableSettings: {
                                ...prev.tableSettings,
                                defaultRowSize: value.value,
                              },
                            }))
                          }
                          buttonWidth="150px"
                          menuWidth="150px"
                        />
                      </div>
                      <div className={styles.wrapper}>
                        <Text variant="body-text-sm">
                          Server Side Pagination
                        </Text>
                        <Switch
                          name="pagination"
                          enabled={
                            chartSettings.tableSettings?.isServerSidePagination
                          }
                          onChange={() =>
                            setChartSettings((prev) => ({
                              ...prev,
                              tableSettings: {
                                ...prev.tableSettings,
                                isServerSidePagination:
                                  !prev.tableSettings?.isServerSidePagination,
                              },
                            }))
                          }
                        />
                      </div>
                    </>
                  ) : null}
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Hide Vertical Divider</Text>
                    <Switch
                      name="vertical divider"
                      enabled={chartSettings.tableSettings?.hideVerticalDivider}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          tableSettings: {
                            ...prev.tableSettings,
                            hideVerticalDivider:
                              !prev.tableSettings?.hideVerticalDivider,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Hide Horizontal Divider</Text>
                    <Switch
                      name="horizontal divider"
                      enabled={
                        chartSettings.tableSettings?.hideHorizontalDivider
                      }
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          tableSettings: {
                            ...prev.tableSettings,
                            hideHorizontalDivider:
                              !prev.tableSettings?.hideHorizontalDivider,
                          },
                        }))
                      }
                    />
                  </div>
                  {chartSettings.chartType ===
                  CHART_TYPES.horizontalStackTable ? (
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Enable Table Search</Text>
                      <Switch
                        name="table search"
                        enabled={chartSettings.tableSettings?.enableTableSearch}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            tableSettings: {
                              ...prev.tableSettings,
                              enableTableSearch:
                                !prev.tableSettings?.enableTableSearch,
                            },
                          }))
                        }
                      />
                    </div>
                  ) : null}
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Enable Striped Rows</Text>
                    <Switch
                      name="striped rows"
                      enabled={chartSettings.tableSettings?.enableStripedRows}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          tableSettings: {
                            ...prev.tableSettings,
                            enableStripedRows:
                              !prev.tableSettings?.enableStripedRows,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Show Row Hover</Text>
                    <Switch
                      name="row hover"
                      enabled={chartSettings.tableSettings?.showRowHover}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          tableSettings: {
                            ...prev.tableSettings,
                            showRowHover: !prev.tableSettings?.showRowHover,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Header Font Bold</Text>
                    <Switch
                      name="header font bold"
                      enabled={chartSettings.tableSettings?.headerFontBold}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          tableSettings: {
                            ...prev.tableSettings,
                            headerFontBold: !prev.tableSettings?.headerFontBold,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              }
              header={<Text variant="heading">UI Style</Text>}
              headerButton={null}
            />
            {chartSettings.chartType === CHART_TYPES.table ? (
              <AccordionV3
                width="100%"
                content={
                  <div className={styles['container-wrapper']}>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Show Table Title</Text>
                      <Switch
                        name="table title"
                        enabled={chartSettings.tableSettings?.showTableTitle}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            tableSettings: {
                              ...prev.tableSettings,
                              showTableTitle:
                                !prev.tableSettings?.showTableTitle,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Hide Table Header</Text>
                      <Switch
                        name="hide table header"
                        enabled={chartSettings.tableSettings?.hideTableHeader}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            tableSettings: {
                              ...prev.tableSettings,
                              hideTableHeader:
                                !prev.tableSettings?.hideTableHeader,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Enable Table Search</Text>
                      <Switch
                        name="table search"
                        enabled={chartSettings.tableSettings?.enableTableSearch}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            tableSettings: {
                              ...prev.tableSettings,
                              enableTableSearch:
                                !prev.tableSettings?.enableTableSearch,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Enable Sorting</Text>
                      <Switch
                        name="sorting"
                        enabled={chartSettings.tableSettings?.enableSorting}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            tableSettings: {
                              ...prev.tableSettings,
                              enableSorting: !prev.tableSettings?.enableSorting,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Disable Pagination</Text>
                      <Switch
                        name="disable pagination"
                        enabled={chartSettings.tableSettings?.disablePagination}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            tableSettings: {
                              ...prev.tableSettings,
                              disablePagination:
                                !prev.tableSettings?.disablePagination,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                }
                header={<Text variant="heading">Features</Text>}
                headerButton={null}
              />
            ) : null}
            <AccordionV3
              width="100%"
              content={
                <div className={styles['container-wrapper']}>
                  <Text variant="label">
                    You can add rules to make the cells in this table change
                    color if they meet certain conditions.
                  </Text>
                  {!isShowRuleFields && (
                    <Button
                      variant="secondary"
                      onClick={() => setShowRuleFields(true)}
                      leftIcon={<Icons name="plus" />}
                      fitContainer
                    >
                      Add New Rule
                    </Button>
                  )}
                  {isShowRuleFields && (
                    <>
                      <div className={styles.wrapper}>
                        <Text variant="heading">Columns</Text>
                        <FloatingDropDown
                          options={
                            chartSettings.yAxisList?.map((value) => ({
                              value,
                              label: value,
                            })) || []
                          }
                          selectedOption={{
                            value: conditionalFormatting.columnName || '',
                            label: conditionalFormatting.columnName || '',
                          }}
                          onChange={(value) =>
                            setConditionalFormatting((prev) => ({
                              ...prev,
                              columnName: value.value,
                            }))
                          }
                        />
                      </div>
                      <div className={styles.wrapper}>
                        <Text variant="heading">Condition</Text>
                        <FloatingDropDown
                          options={FORMATTING_CONDITIONS_OPTIONS}
                          selectedOption={{
                            value: conditionalFormatting.operator || '',
                            label: conditionalFormatting.operator || '',
                          }}
                          onChange={(value) =>
                            setConditionalFormatting((prev) => ({
                              ...prev,
                              operator: value.value,
                            }))
                          }
                        />
                      </div>
                      <div className={styles.wrapper}>
                        <Text variant="heading">Value</Text>
                        <div className={styles.inputWrapper}>
                          <InputField
                            type="text"
                            onChange={({ target: { value } }) =>
                              setConditionalFormatting((prev) => ({
                                ...prev,
                                value:
                                  Number(value) || Number(value) === 0
                                    ? Number(value)
                                    : value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className={styles.wrapper}>
                        <Text variant="heading">Background Color</Text>
                        <div className={styles.inputWrapper}>
                          <ColorField
                            name="background color"
                            onChange={(value) =>
                              setConditionalFormatting((prev) => ({
                                ...prev,
                                backgrounColor: value,
                              }))
                            }
                            defaultValue="#FFFFFF"
                            value={conditionalFormatting.backgrounColor}
                          />
                        </div>
                      </div>
                      <div className={styles.wrapper}>
                        <Text variant="heading">Text Color</Text>
                        <div className={styles.inputWrapper}>
                          <ColorField
                            name="text color"
                            onChange={(value) =>
                              setConditionalFormatting((prev) => ({
                                ...prev,
                                color: value,
                              }))
                            }
                            defaultValue="#000000"
                            value={conditionalFormatting.color}
                          />
                        </div>
                      </div>
                      {conditionError && (
                        <Alert text={conditionError} variant="error" />
                      )}
                      <div className="dbn-w-full dbn-flex dbn-justify-between">
                        <Button
                          variant="secondary"
                          onClick={() => setShowRuleFields(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          type="button"
                          onClick={() => onSaveConditionRule()}
                        >
                          Save Rule
                        </Button>
                      </div>
                    </>
                  )}
                  {chartSettings.tableSettings?.conditionalFormatting?.map(
                    (value) => (
                      <div
                        className={styles.formattingContainer}
                        key={value.columnName}
                      >
                        <div className={styles.ruleContainer}>
                          {value.rules.map((rule) => (
                            <div className="dbn-flex dbn-gap-1 dbn-justify-between">
                              <div className="dbn-flex dbn-gap-1">
                                <Text variant="body-text-sm">
                                  {value.columnName}
                                </Text>

                                <Text variant="body-text-sm">
                                  {
                                    FORMATTING_CONDITIONS_OPTIONS.find(
                                      (op) => op.value === rule.operator
                                    )?.label
                                  }
                                </Text>
                                <Text variant="body-text-sm">
                                  <span
                                    style={{
                                      backgroundColor:
                                        rule.styles.backgroundColor,
                                      color: rule.styles.color,
                                    }}
                                    className="dbn-px-1"
                                  >
                                    {rule.value}
                                  </span>
                                </Text>
                              </div>
                              <Button
                                variant="popover"
                                className="dbn-flex dbn-gap-1"
                                onClick={() =>
                                  onRemoveRule(value.columnName, rule)
                                }
                                rightIcon={<Icons name="cross" />}
                                key={rule.value}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              }
              header={<Text variant="heading">Conditional Formatting</Text>}
              headerButton={null}
            />
          </>
        ) : null}
        {[CHART_TYPES.table, CHART_TYPES.pivotV2].includes(
          chartSettings.chartType
        ) ? (
          <AccordionV3
            width="100%"
            content={
              <div className={styles['container-wrapper']}>
                {chartSettings.chartType === CHART_TYPES.pivotV2 ? (
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Enable Striped Rows</Text>
                    <Switch
                      name="striped rows"
                      enabled={chartSettings.tableSettings?.enableStripedRows}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          tableSettings: {
                            ...prev.tableSettings,
                            enableStripedRows:
                              !prev.tableSettings?.enableStripedRows,
                          },
                        }))
                      }
                    />
                  </div>
                ) : null}
                <div className={styles.wrapper}>
                  <Text variant="heading">Header Text Color</Text>
                  <div className={styles.inputWrapper}>
                    <ColorField
                      name="header text color"
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          tableSettings: {
                            ...prev.tableSettings,
                            customHeaderColor: {
                              ...prev.tableSettings?.customHeaderColor,
                              textColor: value,
                            },
                          },
                        }))
                      }
                      defaultValue="#000000"
                      value={
                        chartSettings.tableSettings?.customHeaderColor
                          ?.textColor || '#000000'
                      }
                    />
                  </div>
                </div>
                <div className={styles.wrapper}>
                  <Text variant="body-text-sm">Enable Custom Header Color</Text>
                  <Switch
                    name="table title"
                    enabled={
                      chartSettings.tableSettings?.customHeaderColor?.isEnabled
                    }
                    onChange={() =>
                      setChartSettings((prev) => ({
                        ...prev,
                        tableSettings: {
                          ...prev.tableSettings,
                          customHeaderColor: {
                            ...prev.tableSettings?.customHeaderColor,
                            isEnabled:
                              !prev.tableSettings?.customHeaderColor?.isEnabled,
                          },
                        },
                      }))
                    }
                  />
                </div>
                {chartSettings.tableSettings?.customHeaderColor?.isEnabled ? (
                  <div className={styles.wrapper}>
                    <Text variant="heading">Header Background Color</Text>
                    <div className={styles.inputWrapper}>
                      <ColorField
                        name="header color"
                        onChange={(value) =>
                          setChartSettings((prev) => ({
                            ...prev,
                            tableSettings: {
                              ...prev.tableSettings,
                              customHeaderColor: {
                                ...prev.tableSettings?.customHeaderColor,
                                color: value,
                              },
                            },
                          }))
                        }
                        defaultValue="#FFFFFF"
                        value={
                          chartSettings.tableSettings?.customHeaderColor
                            ?.color || '#FFFFFF'
                        }
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            }
            header={
              <Text variant="heading">
                {chartSettings.chartType === CHART_TYPES.pivotV2
                  ? 'Custom'
                  : 'Other'}{' '}
                Settings
              </Text>
            }
            headerButton={null}
          />
        ) : null}
      </div>
    );
  }
  return (
    <>
      <div className={styles.container}>
        {![
          CHART_TYPES.pie,
          CHART_TYPES.doughnut,
          CHART_TYPES.rose,
          CHART_TYPES.gauge,
          CHART_TYPES.sankey,
          CHART_TYPES.funnel,
        ].includes(chartSettings.chartType) &&
          !isGeoMap && (
            <>
              <AccordionV3
                width="100%"
                content={
                  <div className={styles['container-wrapper']}>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Hide Axis Line</Text>
                      <Switch
                        name="X-axis line"
                        enabled={chartSettings.customSettings?.hideXAxisLines}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              hideXAxisLines:
                                !prev.customSettings?.hideXAxisLines,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Hide Splitlines</Text>
                      <Switch
                        name="X-axis splitlines"
                        enabled={chartSettings.customSettings?.hideXSplitLines}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              hideXSplitLines:
                                !prev.customSettings?.hideXSplitLines,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Hide Axis Labels</Text>
                      <Switch
                        name="X-axis labels"
                        enabled={chartSettings.customSettings?.hideXAxisLabels}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              hideXAxisLabels:
                                !prev.customSettings?.hideXAxisLabels,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Axis Name</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="text"
                          placeholder="Enter axis name"
                          value={
                            chartSettings.labelSettings?.XAxisStyle?.axisName
                          }
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                XAxisStyle: {
                                  ...prev.labelSettings?.XAxisStyle,
                                  axisName: e.target.value,
                                },
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">
                        Distance between name and labels
                      </Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="number"
                          placeholder="Enter value"
                          value={
                            chartSettings.labelSettings?.XAxisStyle?.axisPadding
                          }
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                XAxisStyle: {
                                  ...prev.labelSettings?.XAxisStyle,
                                  axisPadding: Number(e.target.value),
                                },
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Truncate Label</Text>
                      <Switch
                        name="truncate label"
                        enabled={chartSettings.labelSettings?.truncateLabel}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            labelSettings: {
                              ...prev.labelSettings,
                              truncateLabel: !prev.labelSettings?.truncateLabel,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Label Rotation</Text>
                      <FloatingDropDown
                        buttonWidth="150px"
                        isSearchEnabled
                        menuWidth="150px"
                        onChange={(value) =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              xRotation: parseInt(value.value, 10),
                            },
                          }))
                        }
                        options={[
                          {
                            icon: 'text-rotation-none',
                            label: '0',
                            value: '0',
                          },
                          {
                            icon: 'text-rotation-angle-up',
                            label: '45',
                            value: '45',
                          },
                          {
                            icon: 'text-rotation-up',
                            label: '90',
                            value: '90',
                          },
                        ]}
                        searchPlaceholder="0"
                        selectedOption={{
                          icon: 'text-rotation-none',
                          label:
                            chartSettings.customSettings?.xRotation?.toString() ||
                            '0',
                          value:
                            chartSettings.customSettings?.xRotation?.toString() ||
                            '0',
                        }}
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Custom Label Rotation</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="number"
                          value={chartSettings.customSettings?.customRotation}
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                customRotation: parseInt(e.target.value, 10),
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Truncate Label Value</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="number"
                          value={
                            chartSettings.labelSettings?.truncateLabelValue
                          }
                          isDisabled={
                            !chartSettings.labelSettings?.truncateLabel
                          }
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                truncateLabelValue: parseInt(
                                  e.target.value,
                                  10
                                ),
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Label Font Size</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="number"
                          min={0}
                          value={chartSettings.labelSettings?.XAxisStyle?.size}
                          onChange={(e) => {
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                XAxisStyle: {
                                  ...chartSettings.labelSettings?.XAxisStyle,
                                  size: parseInt(e.target.value, 10),
                                },
                              },
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Label Font Family</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="text"
                          value={
                            chartSettings.labelSettings?.XAxisStyle?.family
                          }
                          onChange={(e) => {
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                XAxisStyle: {
                                  ...chartSettings.labelSettings?.XAxisStyle,
                                  family: e.target.value,
                                },
                              },
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Label Font Weight</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="number"
                          min={0}
                          value={
                            chartSettings.labelSettings?.XAxisStyle?.weight
                          }
                          onChange={(e) => {
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                XAxisStyle: {
                                  ...chartSettings.labelSettings?.XAxisStyle,
                                  weight: parseInt(e.target.value, 10),
                                },
                              },
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Label Color</Text>
                      <div className={styles.inputWrapper}>
                        <ColorField
                          name="color"
                          onChange={(value) => {
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                XAxisStyle: {
                                  ...chartSettings.labelSettings?.XAxisStyle,
                                  color: value,
                                },
                              },
                            }));
                          }}
                          defaultValue="#000000"
                          value={
                            chartSettings.labelSettings?.XAxisStyle?.color ||
                            '#000000'
                          }
                        />
                      </div>
                    </div>
                  </div>
                }
                header={<Text variant="heading">Horizontal Axis</Text>}
                headerButton={null}
              />
              <AccordionV3
                width="100%"
                content={
                  <div className={styles['container-wrapper']}>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Hide Axis Line</Text>
                      <Switch
                        name="Y-axis line"
                        enabled={chartSettings.customSettings?.hideYAxisLines}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              hideYAxisLines:
                                !prev.customSettings?.hideYAxisLines,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Hide Splitlines</Text>
                      <Switch
                        name="Y-axis splitlines"
                        enabled={chartSettings.customSettings?.hideYSplitLines}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              hideYSplitLines:
                                !prev.customSettings?.hideYSplitLines,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Hide Axis Labels</Text>
                      <Switch
                        name="Y-axis labels"
                        enabled={chartSettings.customSettings?.hideYAxisLabels}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              hideYAxisLabels:
                                !prev.customSettings?.hideYAxisLabels,
                            },
                          }))
                        }
                      />
                    </div>
                    {chartSettings.chartType !== CHART_TYPES.combo ? (
                      <>
                        <div className={styles.wrapper}>
                          <Text variant="body-text-sm">Axis Name</Text>
                          <div className={styles.inputWrapper}>
                            <InputField
                              type="text"
                              placeholder="Enter axis name"
                              value={
                                chartSettings.labelSettings?.YAxisStyle
                                  ?.axisName
                              }
                              onChange={(e) =>
                                setChartSettings((prev) => ({
                                  ...prev,
                                  labelSettings: {
                                    ...prev.labelSettings,
                                    YAxisStyle: {
                                      ...prev.labelSettings?.YAxisStyle,
                                      axisName: e.target.value,
                                    },
                                  },
                                }))
                              }
                            />
                          </div>
                        </div>
                        <div className={styles.wrapper}>
                          <Text variant="body-text-sm">
                            Distance between name and labels
                          </Text>
                          <div className={styles.inputWrapper}>
                            <InputField
                              type="number"
                              placeholder="Enter value"
                              value={
                                chartSettings.labelSettings?.YAxisStyle
                                  ?.axisPadding
                              }
                              onChange={(e) =>
                                setChartSettings((prev) => ({
                                  ...prev,
                                  labelSettings: {
                                    ...prev.labelSettings,
                                    YAxisStyle: {
                                      ...prev.labelSettings?.YAxisStyle,
                                      axisPadding: Number(e.target.value),
                                    },
                                  },
                                }))
                              }
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                    {![
                      CHART_TYPES.pie,
                      CHART_TYPES.doughnut,
                      CHART_TYPES.funnel,
                      CHART_TYPES.gauge,
                      CHART_TYPES.sankey,
                      CHART_TYPES.singleValue,
                      CHART_TYPES.table,
                    ].includes(chartSettings.chartType) && (
                      <div className={styles.wrapper}>
                        <Text variant="body-text-sm">Axis Position</Text>
                        <FloatingDropDown
                          selectedOption={{
                            value: chartSettings.axisSettings?.axis || 'left',
                            label: chartSettings.axisSettings?.axis || 'left',
                          }}
                          options={[
                            { label: 'left', value: 'left' },
                            { label: 'right', value: 'right' },
                          ]}
                          onChange={(value) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              axisSettings: {
                                ...prev.axisSettings,
                                axis: value.value,
                              },
                            }))
                          }
                          buttonWidth="150px"
                          menuWidth="150px"
                        />
                      </div>
                    )}
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Label Font Size</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="number"
                          min={0}
                          value={chartSettings.labelSettings?.YAxisStyle?.size}
                          onChange={(e) => {
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                YAxisStyle: {
                                  ...chartSettings.labelSettings?.YAxisStyle,
                                  size: parseInt(e.target.value, 10),
                                },
                              },
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Label Font Family</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="text"
                          value={
                            chartSettings.labelSettings?.YAxisStyle?.family
                          }
                          onChange={(e) => {
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                YAxisStyle: {
                                  ...chartSettings.labelSettings?.YAxisStyle,
                                  family: e.target.value,
                                },
                              },
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Label Font Weight</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="number"
                          min={0}
                          value={
                            chartSettings.labelSettings?.YAxisStyle?.weight
                          }
                          onChange={(e) => {
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                YAxisStyle: {
                                  ...chartSettings.labelSettings?.YAxisStyle,
                                  weight: parseInt(e.target.value, 10),
                                },
                              },
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">Label Color</Text>
                      <div className={styles.inputWrapper}>
                        <ColorField
                          name="color"
                          onChange={(value) => {
                            setChartSettings((prev) => ({
                              ...prev,
                              labelSettings: {
                                ...prev.labelSettings,
                                YAxisStyle: {
                                  ...chartSettings.labelSettings?.YAxisStyle,
                                  color: value,
                                },
                              },
                            }));
                          }}
                          defaultValue="#000000"
                          value={
                            chartSettings.labelSettings?.YAxisStyle?.color ||
                            '#000000'
                          }
                        />
                      </div>
                    </div>
                  </div>
                }
                header={<Text variant="heading">Vertical Axis</Text>}
                headerButton={null}
              />
            </>
          )}
        {!isGeoMap && chartSettings.chartType !== CHART_TYPES.gauge ? (
          <>
            <AccordionV3
              width="100%"
              content={
                <div className={styles['container-wrapper']}>
                  <PositionContainer
                    val={chartSettings.legendSettings?.fixedPosition}
                    onClick={(value) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        legendSettings: {
                          ...prev.legendSettings,
                          fixedPosition: value,
                        },
                      }))
                    }
                  />
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Customize Legend</Text>
                    <Switch
                      name="customise"
                      enabled={chartSettings.legendSettings?.customise}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          legendSettings: {
                            ...prev.legendSettings,
                            customise: !prev.legendSettings?.customise,
                          },
                        }))
                      }
                    />
                  </div>
                  {chartSettings.legendSettings?.customise ? (
                    <div className={styles.positionContainer}>
                      <div className={styles.positionWrapper}>
                        <Icons name="align-top" size="xl" />
                        <InputField
                          type="number"
                          value={chartSettings.legendSettings?.top}
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              legendSettings: {
                                ...prev.legendSettings,
                                top: parseInt(e.target.value, 10),
                              },
                            }))
                          }
                        />
                      </div>
                      <div className={styles.positionWrapper}>
                        <Icons name="align-bottom" size="xl" />
                        <InputField
                          type="number"
                          value={chartSettings.legendSettings?.bottom}
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              legendSettings: {
                                ...prev.legendSettings,
                                bottom: parseInt(e.target.value, 10),
                              },
                            }))
                          }
                        />
                      </div>
                      <div className={styles.positionWrapper}>
                        <Icons name="align-left" size="xl" />
                        <InputField
                          type="number"
                          value={chartSettings.legendSettings?.left}
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              legendSettings: {
                                ...prev.legendSettings,
                                left: parseInt(e.target.value, 10),
                              },
                            }))
                          }
                        />
                      </div>
                      <div className={styles.positionWrapper}>
                        <Icons name="align-right" size="xl" />
                        <InputField
                          type="number"
                          value={chartSettings.legendSettings?.right}
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              legendSettings: {
                                ...prev.legendSettings,
                                right: parseInt(e.target.value, 10),
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Disbale Legend Scrolling</Text>
                    <Switch
                      name="disable scroll"
                      enabled={chartSettings.legendSettings?.disableScroll}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          legendSettings: {
                            ...prev.legendSettings,
                            disableScroll: !prev.legendSettings?.disableScroll,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Legend Appearance</Text>
                    <FloatingDropDown
                      selectedOption={{
                        value:
                          chartSettings.legendSettings?.position ||
                          'horizontal',
                        label:
                          chartSettings.legendSettings?.position ||
                          'horizontal',
                      }}
                      options={[
                        { label: 'horizontal', value: 'horizontal' },
                        { label: 'vertical', value: 'vertical' },
                      ]}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          legendSettings: {
                            ...prev.legendSettings,
                            position: value.value,
                          },
                        }))
                      }
                      buttonWidth="150px"
                      menuWidth="150px"
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Truncate Legend</Text>
                    <div className={styles.inputWrapper}>
                      <InputField
                        type="number"
                        value={
                          chartSettings.legendSettings?.truncateLegendValue
                        }
                        onChange={(e) =>
                          setChartSettings((prev) => ({
                            ...prev,
                            legendSettings: {
                              ...prev.legendSettings,
                              truncateLegendValue: parseInt(e.target.value, 10),
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Legend Shape</Text>
                    <FloatingDropDown
                      selectedOption={{
                        value:
                          chartSettings.legendSettings?.legendShape ||
                          'rectangle',
                        label:
                          chartSettings.legendSettings?.legendShape ||
                          'rectangle',
                      }}
                      options={[
                        { label: 'Circle', value: 'circle' },
                        { label: 'Rectangle', value: 'rect' },
                        { label: 'Rounded rectangle', value: 'roundRect' },
                        { label: 'Triangle', value: 'triangle' },
                        { label: 'Diamond', value: 'diamond' },
                        { label: 'Arrow', value: 'arrow' },
                        { label: 'none', value: 'none' },
                      ]}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          legendSettings: {
                            ...prev.legendSettings,
                            legendShape: value.value,
                          },
                        }))
                      }
                      buttonWidth="150px"
                      menuWidth="200px"
                    />
                  </div>
                  {[
                    CHART_TYPES.bar,
                    CHART_TYPES.line,
                    CHART_TYPES.stack,
                    CHART_TYPES.timeSeries,
                  ].includes(chartSettings.chartType) &&
                  chartSettings.isMultiDimension &&
                  chartSettings.timeSeriesSettings?.groupBySettings.value !==
                    'ungrouped' ? (
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">
                        Enable legend selection
                      </Text>
                      <Switch
                        name="legend selection"
                        enabled={chartSettings.customSettings?.showSelectLegend}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              showSelectLegend:
                                !prev.customSettings?.showSelectLegend,
                            },
                          }))
                        }
                      />
                    </div>
                  ) : null}
                </div>
              }
              header={<Text variant="heading">Chart Legend</Text>}
              headerButton={
                <Switch
                  name="show legend"
                  defaultEnabled
                  enabled={chartSettings.legendSettings?.show}
                  onChange={() =>
                    setChartSettings((prev) => ({
                      ...prev,
                      legendSettings: {
                        ...prev.legendSettings,
                        show: !prev.legendSettings?.show,
                      },
                    }))
                  }
                />
              }
            />
            {![
              CHART_TYPES.pie,
              CHART_TYPES.doughnut,
              CHART_TYPES.rose,
              CHART_TYPES.gauge,
              CHART_TYPES.sankey,
              CHART_TYPES.funnel,
            ].includes(chartSettings.chartType) && (
              <AccordionV3
                width="100%"
                content={
                  <div className={styles['container-wrapper']}>
                    <div className={styles.marginContainer}>
                      <div className={styles.marginWrapper}>
                        <InputField
                          type="number"
                          value={chartSettings.margins?.marginTop}
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              margins: {
                                ...prev.margins,
                                marginTop: parseInt(e.target.value, 10),
                              },
                            }))
                          }
                        />
                      </div>
                      <div className={styles.chartDemoContainer}>
                        <div className={styles.marginWrapper}>
                          <InputField
                            type="number"
                            value={chartSettings.margins?.marginLeft}
                            onChange={(e) =>
                              setChartSettings((prev) => ({
                                ...prev,
                                margins: {
                                  ...prev.margins,
                                  marginLeft: parseInt(e.target.value, 10),
                                },
                              }))
                            }
                          />
                        </div>
                        <div className={styles.chartDemo} />
                        <div className={styles.marginWrapper}>
                          <InputField
                            type="number"
                            value={chartSettings.margins?.marginRight}
                            onChange={(e) =>
                              setChartSettings((prev) => ({
                                ...prev,
                                margins: {
                                  ...prev.margins,
                                  marginRight: parseInt(e.target.value, 10),
                                },
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className={styles.marginWrapper}>
                        <InputField
                          type="number"
                          value={chartSettings.margins?.marginBottom}
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              margins: {
                                ...prev.margins,
                                marginBottom: parseInt(e.target.value, 10),
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                }
                header={<Text variant="heading">Chart Margin</Text>}
                headerButton={null}
              />
            )}
            <AccordionV3
              width="100%"
              content={
                <div className={styles['container-wrapper']}>
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Label Position</Text>
                    <FloatingDropDown
                      selectedOption={{
                        value:
                          chartSettings.labelSettings?.position || 'hidden',
                        label:
                          `${chartSettings?.labelSettings?.position
                            ?.toString()
                            ?.charAt(0)
                            ?.toUpperCase()}${chartSettings.labelSettings?.position
                            ?.toString()
                            ?.slice(1)}` || 'Hidden',
                      }}
                      options={getValuePositioningLabelOptions(
                        chartSettings.chartType
                      )}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          labelSettings: {
                            ...prev,
                            show: value.value !== 'hidden',
                            position: value.value,
                          },
                        }))
                      }
                      buttonWidth="150px"
                      menuWidth="150px"
                    />
                  </div>
                  {chartSettings.chartType === CHART_TYPES.stack ? (
                    <div className={styles.wrapper}>
                      <Text variant="heading">
                        Enable Value Label Summation
                      </Text>
                      <Switch
                        name="value summation"
                        enabled={
                          chartSettings.labelSettings?.isEnableValueSummation
                        }
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            labelSettings: {
                              ...prev.labelSettings,
                              isEnableValueSummation:
                                !prev.labelSettings?.isEnableValueSummation,
                            },
                          }))
                        }
                      />
                    </div>
                  ) : null}
                </div>
              }
              header={<Text variant="heading">Chart Label</Text>}
              headerButton={null}
            />
          </>
        ) : null}
        <AccordionV3
          width="100%"
          content={
            <div className={styles['container-wrapper']}>
              <div className={styles.chartColors}>
                <div className="dbn-flex dbn-items-center">
                  {chartSettings.chartColors?.map((color: string) => (
                    <span
                      className="dbn-h-6 dbn-w-6 dbn-inline-block"
                      style={{ backgroundColor: color }}
                      key={color}
                      title={color}
                    />
                  ))}
                </div>
                <div className="dbn-flex dbn-gap-2">
                  <NewTooltip text="Reset">
                    <Button
                      variant="popover"
                      leftIcon={<Icons name="delete" size="sm" />}
                      onClick={() => setResetPallete?.(true)}
                    />
                  </NewTooltip>
                  <div className="dbn-border dbn-border-secondary" />
                  <NewTooltip text="Shuffle">
                    <Button
                      variant="popover"
                      leftIcon={<Icons name="shuffle" size="sm" />}
                      onClick={shuffleArray}
                    />
                  </NewTooltip>
                </div>
              </div>
              {[
                CHART_TYPES.bar,
                CHART_TYPES.row,
                CHART_TYPES.histogram,
              ].includes(chartSettings.chartType) ? (
                <div className={styles.wrapper}>
                  <Text variant="heading">Show Different Colored Bars</Text>
                  <Switch
                    name="different colored"
                    enabled={chartSettings.customSettings?.coloredBars}
                    onChange={() =>
                      setChartSettings((prev) => ({
                        ...prev,
                        customSettings: {
                          ...prev.customSettings,
                          coloredBars: !prev.customSettings?.coloredBars,
                        },
                      }))
                    }
                  />
                </div>
              ) : null}
              <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-4">
                <Text variant="heading">Gradients For Charts</Text>
                {!isGeoMap ? (
                  <>
                    <div className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
                      <Text variant="body-text-sm">
                        Default Chart Gradients
                      </Text>
                      <div className="dbn-flex dbn-gap-4 dbn-items-center">
                        {GRADIENTS?.map((grad) => {
                          const isSelectedGrad =
                            chartSettings.customSettings?.gradients?.[0]
                              ?.startColor === grad.start &&
                            chartSettings.customSettings?.gradients?.[0]
                              ?.endColor === grad.end &&
                            chartSettings.customSettings?.gradients?.[0]
                              ?.offset1 === grad.offset1 &&
                            chartSettings.customSettings?.gradients?.[0]
                              ?.offset2 === grad.offset2 &&
                            chartSettings.customSettings?.gradients?.[0]
                              ?.direction === grad.direction;
                          return (
                            <Button
                              variant="popover"
                              className={`dbn-p-2 dbn-rounded-md ${
                                isSelectedGrad ? 'dbn-bg-gray' : ''
                              }`}
                              onClick={() => {
                                setGradient((prev) => ({
                                  ...prev,
                                  startColor: grad.start,
                                  endColor: grad.end,
                                  direction: grad.direction,
                                  offset1: grad.offset1,
                                  offset2: grad.offset2,
                                }));
                                onSaveGradient({
                                  startColor: grad.start,
                                  endColor: grad.end,
                                  direction: grad.direction,
                                  offset1: grad.offset1,
                                  offset2: grad.offset2,
                                  isRadial: false,
                                });
                              }}
                            >
                              <span
                                style={{
                                  background: `linear-gradient(to ${
                                    grad.direction
                                  }, ${grad.start} ${grad.offset1 * 100}%, ${
                                    grad.end
                                  } ${grad.offset2 * 100}%)`,
                                  width: '2rem',
                                  height: '2rem',
                                }}
                              />
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                    {chartSettings.chartType !== CHART_TYPES.gauge && (
                      <>
                        {!isShowGradient && (
                          <div className="dbn-flex dbn-flex-row dbn-justify-between dbn-items-center">
                            <Text variant="label">Chart Gradient</Text>
                            <Button
                              variant="secondary"
                              onClick={() => setShowGradient(true)}
                              leftIcon={<Icons name="plus" />}
                            >
                              Add New Gradient
                            </Button>
                          </div>
                        )}
                        {isShowGradient && (
                          <div className={styles.formattingGradient}>
                            <div className={styles.wrapper}>
                              <Text variant="body-text-sm">Start Color</Text>
                              <ColorField
                                name="start"
                                onChange={(value) =>
                                  setGradient((prev) => ({
                                    ...prev,
                                    startColor: value,
                                  }))
                                }
                                defaultValue="#FFFFFF"
                                value={gradient.startColor}
                              />
                            </div>
                            <div className={styles.wrapper}>
                              <Text variant="body-text-sm">End Color</Text>
                              <ColorField
                                name="end"
                                onChange={(value) =>
                                  setGradient((prev) => ({
                                    ...prev,
                                    endColor: value,
                                  }))
                                }
                                defaultValue="#000000"
                                value={gradient.endColor}
                              />
                            </div>
                            <div className={styles.wrapper}>
                              <Text variant="body-text-sm">
                                Offset for start color
                              </Text>
                              <div className={styles.inputWrapper}>
                                <InputField
                                  type="number"
                                  min={0}
                                  max={1}
                                  onChange={(e) =>
                                    setGradient((prev) => ({
                                      ...prev,
                                      offset1: Number(e.target.value),
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className={styles.wrapper}>
                              <Text variant="body-text-sm">
                                Offset for end color
                              </Text>
                              <div className={styles.inputWrapper}>
                                <InputField
                                  type="number"
                                  min={0}
                                  max={1}
                                  onChange={({ target: { value } }) =>
                                    setGradient((prev) => ({
                                      ...prev,
                                      offset2: Number(value),
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div className={styles.wrapper}>
                              <Text variant="body-text-sm">Direction</Text>
                              <FloatingDropDown
                                selectedOption={{
                                  value: gradient.direction,
                                  label: gradient.direction,
                                }}
                                options={[
                                  { label: 'Left', value: 'left' },
                                  { label: 'Right', value: 'right' },
                                  { label: 'Top', value: 'top' },
                                  { label: 'Bottom', value: 'bottom' },
                                ]}
                                onChange={(value) =>
                                  setGradient((prev) => ({
                                    ...prev,
                                    direction: value.value,
                                  }))
                                }
                                buttonWidth="220px"
                                menuWidth="220px"
                              />
                            </div>
                            <Button
                              variant="primary"
                              type="button"
                              onClick={() => onSaveGradient()}
                              fitContainer
                            >
                              Save Gradient
                            </Button>
                          </div>
                        )}
                        {!isShowGradient &&
                          chartSettings.customSettings?.gradients?.map(
                            (value) => (
                              <div
                                className={styles.gradientContainer}
                                key={`${value.startColor}-${value.endColor}`}
                              >
                                <Text variant="label">
                                  {`${value.startColor} - ${value.endColor}`}
                                </Text>
                                <Button
                                  variant="tertiary"
                                  onClick={() => onRemoveGradient(value)}
                                  leftIcon={<Icons name="cross" size="xs" />}
                                />
                              </div>
                            )
                          )}
                      </>
                    )}
                    {!isShowGradient &&
                    ([
                      CHART_TYPES.bar,
                      CHART_TYPES.row,
                      CHART_TYPES.stack,
                      CHART_TYPES.histogram,
                    ].includes(chartSettings.chartType) ||
                      (chartSettings.chartType === CHART_TYPES.timeSeries &&
                        chartSettings.timeSeriesSettings?.seriesType[0]
                          ?.type === 'bar')) ? (
                      <>
                        <div className={styles.wrapper}>
                          <Text variant="body-text-sm">
                            Add Bar Background Gradient
                          </Text>
                          <Switch
                            name="show bar background gradient"
                            enabled={
                              chartSettings.customSettings?.isShowBarGradient
                            }
                            onChange={() =>
                              setChartSettings((prev) => ({
                                ...prev,
                                customSettings: {
                                  ...prev.customSettings,
                                  isShowBarGradient:
                                    !prev.customSettings?.isShowBarGradient,
                                },
                              }))
                            }
                          />
                        </div>
                        {chartSettings.customSettings?.isShowBarGradient && (
                          <>
                            <div className={styles.wrapper}>
                              <Text variant="body-text-sm">Start Color</Text>
                              <ColorField
                                name="startColor"
                                onChange={(value) =>
                                  setChartSettings((prev) => ({
                                    ...prev,
                                    customSettings: {
                                      ...prev.customSettings,
                                      barGradient: {
                                        ...prev.customSettings?.barGradient,
                                        startColor: value,
                                      },
                                    },
                                  }))
                                }
                                defaultValue="#FFFFFF"
                                value={
                                  chartSettings.customSettings?.barGradient
                                    ?.startColor || '#FFFFFF'
                                }
                              />
                            </div>
                            <div className={styles.wrapper}>
                              <Text variant="body-text-sm">End Color</Text>
                              <ColorField
                                name="endColor"
                                onChange={(value) =>
                                  setChartSettings((prev) => ({
                                    ...prev,
                                    customSettings: {
                                      ...prev.customSettings,
                                      barGradient: {
                                        ...prev.customSettings?.barGradient,
                                        endColor: value,
                                      },
                                    },
                                  }))
                                }
                                defaultValue="#000000"
                                value={
                                  chartSettings.customSettings?.barGradient
                                    ?.endColor || '#000000'
                                }
                              />
                            </div>
                            <div className={styles.wrapper}>
                              <Text variant="body-text-sm">
                                Offset for Start Color
                              </Text>
                              <div className={styles.inputWrapper}>
                                <InputField
                                  type="number"
                                  min={0}
                                  max={1}
                                  onChange={(e) =>
                                    setChartSettings((prev) => ({
                                      ...prev,
                                      customSettings: {
                                        ...prev.customSettings,
                                        barGradient: {
                                          ...prev.customSettings?.barGradient,
                                          offset1: Number(e.target.value),
                                        },
                                      },
                                    }))
                                  }
                                  value={
                                    chartSettings.customSettings?.barGradient
                                      ?.offset1
                                  }
                                />
                              </div>
                            </div>
                            <div className={styles.wrapper}>
                              <Text variant="body-text-sm">
                                Offset for End Color
                              </Text>
                              <div className={styles.inputWrapper}>
                                <InputField
                                  type="number"
                                  min={0}
                                  max={1}
                                  onChange={({ target: { value } }) =>
                                    setChartSettings((prev) => ({
                                      ...prev,
                                      customSettings: {
                                        ...prev.customSettings,
                                        barGradient: {
                                          ...prev.customSettings?.barGradient,
                                          offset2: Number(value),
                                        },
                                      },
                                    }))
                                  }
                                  value={
                                    chartSettings.customSettings?.barGradient
                                      ?.offset2
                                  }
                                />
                              </div>
                            </div>
                            <div className={styles.wrapper}>
                              <Text variant="body-text-sm">Direction</Text>
                              <FloatingDropDown
                                selectedOption={{
                                  value:
                                    chartSettings.customSettings?.barGradient
                                      ?.direction || '',
                                  label:
                                    chartSettings.customSettings?.barGradient
                                      ?.direction || '',
                                }}
                                options={[
                                  { label: 'Left', value: 'left' },
                                  { label: 'Right', value: 'right' },
                                  { label: 'Top', value: 'top' },
                                  { label: 'Bottom', value: 'bottom' },
                                ]}
                                onChange={(value) =>
                                  setChartSettings((prev) => ({
                                    ...prev,
                                    customSettings: {
                                      ...prev.customSettings,
                                      barGradient: {
                                        ...prev.customSettings?.barGradient,
                                        direction: value.value,
                                      },
                                    },
                                  }))
                                }
                              />
                            </div>
                          </>
                        )}
                      </>
                    ) : null}
                  </>
                ) : null}
                {!isShowGradient && (
                  <>
                    <div className={styles.wrapper}>
                      <Text variant="body-text-sm">
                        Add Background Gradient
                      </Text>
                      <Switch
                        name="show background gradient"
                        enabled={
                          chartSettings.customSettings?.enableBackgroundGradient
                        }
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              enableBackgroundGradient:
                                !prev.customSettings?.enableBackgroundGradient,
                            },
                          }))
                        }
                      />
                    </div>
                    {chartSettings.customSettings?.enableBackgroundGradient ? (
                      <div className={styles.formattingGradient}>
                        <div className={styles.wrapper}>
                          <Text variant="body-text-sm">Start Color</Text>
                          <ColorField
                            name="startBackColor"
                            onChange={(value) =>
                              setChartSettings((prev) => ({
                                ...prev,
                                customSettings: {
                                  ...prev.customSettings,
                                  backgroundGradient: {
                                    ...prev.customSettings?.backgroundGradient,
                                    startColor: value,
                                  },
                                },
                              }))
                            }
                            defaultValue="#FFFFFF"
                            value={
                              chartSettings.customSettings?.backgroundGradient
                                ?.startColor || '#FFFFFF'
                            }
                          />
                        </div>
                        <div className={styles.wrapper}>
                          <Text variant="body-text-sm">End Color</Text>
                          <ColorField
                            name="endBackColor"
                            onChange={(value) =>
                              setChartSettings((prev) => ({
                                ...prev,
                                customSettings: {
                                  ...prev.customSettings,
                                  backgroundGradient: {
                                    ...prev.customSettings?.backgroundGradient,
                                    endColor: value,
                                  },
                                },
                              }))
                            }
                            defaultValue="#000000"
                            value={
                              chartSettings.customSettings?.backgroundGradient
                                ?.endColor || '#000000'
                            }
                          />
                        </div>
                        <div className={styles.wrapper}>
                          <Text variant="body-text-sm">
                            Offset for Start Color
                          </Text>
                          <div className={styles.inputWrapper}>
                            <InputField
                              type="number"
                              min={0}
                              max={1}
                              onChange={(e) =>
                                setChartSettings((prev) => ({
                                  ...prev,
                                  customSettings: {
                                    ...prev.customSettings,
                                    backgroundGradient: {
                                      ...prev.customSettings
                                        ?.backgroundGradient,
                                      offset1: Number(e.target.value),
                                    },
                                  },
                                }))
                              }
                              value={
                                chartSettings.customSettings?.backgroundGradient
                                  ?.offset1
                              }
                            />
                          </div>
                        </div>
                        <div className={styles.wrapper}>
                          <Text variant="body-text-sm">
                            Offset for End Color
                          </Text>
                          <div className={styles.inputWrapper}>
                            <InputField
                              type="number"
                              min={0}
                              max={1}
                              onChange={({ target: { value } }) =>
                                setChartSettings((prev) => ({
                                  ...prev,
                                  customSettings: {
                                    ...prev.customSettings,
                                    backgroundGradient: {
                                      ...prev.customSettings
                                        ?.backgroundGradient,
                                      offset2: Number(value),
                                    },
                                  },
                                }))
                              }
                              value={
                                chartSettings.customSettings?.backgroundGradient
                                  ?.offset2
                              }
                            />
                          </div>
                        </div>
                        <div className={styles.wrapper}>
                          <Text variant="body-text-sm">Direction</Text>
                          <FloatingDropDown
                            selectedOption={{
                              value:
                                chartSettings.customSettings?.backgroundGradient
                                  ?.direction || '',
                              label:
                                chartSettings.customSettings?.backgroundGradient
                                  ?.direction || '',
                            }}
                            label="Direction"
                            options={[
                              { label: 'Left', value: 'left' },
                              { label: 'Right', value: 'right' },
                              { label: 'Top', value: 'top' },
                              { label: 'Bottom', value: 'bottom' },
                            ]}
                            onChange={(value) =>
                              setChartSettings((prev) => ({
                                ...prev,
                                customSettings: {
                                  ...prev.customSettings,
                                  backgroundGradient: {
                                    ...prev.customSettings?.backgroundGradient,
                                    direction: value.value,
                                  },
                                },
                              }))
                            }
                          />
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          }
          header={<Text variant="heading">Chart Colors</Text>}
          headerButton={null}
        />
        <AccordionV3
          width="100%"
          content={
            <div className={styles['container-wrapper']}>
              <InputField
                type="text"
                label="Chart Title"
                value={chartSettings.customSettings?.chartTitle}
                onChange={(e) => {
                  setChartSettings((prev) => ({
                    ...prev,
                    customSettings: {
                      ...prev.customSettings,
                      chartTitle: e.target.value,
                    },
                  }));
                }}
              />
              <InputField
                type="text"
                label="Chart Description"
                value={chartSettings.customSettings?.chartDesc}
                onChange={(e) => {
                  setChartSettings((prev) => ({
                    ...prev,
                    customSettings: {
                      ...prev.customSettings,
                      chartDesc: e.target.value,
                    },
                  }));
                }}
              />
              <Text variant="body-text-sm">Position</Text>
              <PositionContainer
                val={chartSettings.customSettings?.titlePosition}
                onClick={(value) =>
                  setChartSettings((prev) => ({
                    ...prev,
                    customSettings: {
                      ...prev.customSettings,
                      titlePosition: value,
                    },
                  }))
                }
              />
            </div>
          }
          header={<Text variant="heading">Chart Title & Description</Text>}
          headerButton={
            <Switch
              name="chart title & desc"
              defaultEnabled
              enabled={chartSettings.customSettings?.enableTitleDesc}
              onChange={() =>
                setChartSettings((prev) => ({
                  ...prev,
                  customSettings: {
                    ...prev.customSettings,
                    enableTitleDesc: !prev.customSettings?.enableTitleDesc,
                  },
                }))
              }
            />
          }
        />
        {chartSettings.chartType !== CHART_TYPES.funnel ? (
          <AccordionV3
            width="100%"
            content={
              <div className={styles['container-wrapper']}>
                {(chartSettings.chartType !== CHART_TYPES.gauge ||
                  (chartSettings.chartType === CHART_TYPES.gauge &&
                    !chartSettings.customSettings
                      ?.isEnableLabelFormatting)) && (
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Number Formatting</Text>
                    <FloatingDropDown
                      selectedOption={{
                        value:
                          chartSettings.customSettings?.numberFormatter ||
                          'original',
                        label:
                          chartSettings.customSettings?.numberFormatter ||
                          'original',
                      }}
                      options={NUMBER_FORMAT}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            numberFormatter: value.value,
                          },
                        }))
                      }
                      buttonWidth="150px"
                      menuWidth="320px"
                    />
                  </div>
                )}
                {chartSettings.chartType !== CHART_TYPES.table &&
                  chartSettings.chartType !== CHART_TYPES.pivot &&
                  chartSettings.chartType !== CHART_TYPES.funnel && (
                    <>
                      {chartSettings.chartType !== CHART_TYPES.combo && (
                        <>
                          <div className={styles.prefixSuffixContainer}>
                            <InputField
                              type="text"
                              label="Prefix"
                              placeholder="Add prefix to labels"
                              value={chartSettings.customSettings?.labelPrefix}
                              onChange={(e) =>
                                setChartSettings((prev) => ({
                                  ...prev,
                                  customSettings: {
                                    ...prev.customSettings,
                                    labelPrefix: e.target.value,
                                  },
                                }))
                              }
                            />
                            <InputField
                              type="text"
                              label="Suffix"
                              placeholder="Add suffix to labels"
                              value={chartSettings.customSettings?.labelSuffix}
                              onChange={(e) =>
                                setChartSettings((prev) => ({
                                  ...prev,
                                  customSettings: {
                                    ...prev.customSettings,
                                    labelSuffix: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}
                {chartSettings.chartType === CHART_TYPES.combo && (
                  <ComboChartFormatter
                    chartSettings={chartSettings}
                    setChartSettings={setChartSettings}
                  />
                )}
                {!isInavlidForLabelFormatting ? (
                  <>
                    <div className={styles.wrapper}>
                      <Text variant="btn">Label Formatting</Text>
                      <Switch
                        name="label formatting"
                        defaultEnabled
                        enabled={
                          chartSettings.customSettings?.isEnableLabelFormatting
                        }
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              isEnableLabelFormatting:
                                !prev.customSettings?.isEnableLabelFormatting,
                            },
                          }))
                        }
                      />
                    </div>
                    {chartSettings.customSettings?.isEnableLabelFormatting ? (
                      <>
                        {chartSettings.customSettings.YaxislabelFormatters
                          ?.length ? (
                          <div className="dbn-w-full dbn-flex dbn-flex-wrap dbn-gap-2">
                            {chartSettings.customSettings.YaxislabelFormatters?.map(
                              (format) => (
                                <span className="dbn-px-2 dbn-py-1 dbn-rounded-md dbn-text-xs dbn-font-semibold dbn-flex dbn-gap-1 dbn-items-center dbn-justify-center dbn-bg-gray">
                                  {format.color ? (
                                    <span
                                      className="dbn-w-3 dbn-h-3 dbn-rounded-full"
                                      style={{
                                        backgroundColor: format.color,
                                      }}
                                    />
                                  ) : null}
                                  {`${format.label} (${format.lowerLimit} - ${format.upperLimit})`}
                                  <Button
                                    variant="popover"
                                    leftIcon={<Icons name="cross" size="xxs" />}
                                    onClick={() => onDeleteRange(format)}
                                  />
                                </span>
                              )
                            )}
                          </div>
                        ) : null}
                        {!isOpenRangeModal ? (
                          <Button
                            variant="secondary"
                            onClick={() => setOpenRangeModal(true)}
                            fitContainer
                            leftIcon={<Icons name="plus" size="sm" />}
                          >
                            Add a range
                          </Button>
                        ) : null}
                        {isOpenRangeModal ? (
                          <div className="dbn-w-full dbn-p-4 dbn-rounded-md dbn-m-4 dbn-border dbn-border-secondary dbn-bg-gray dbn-flex dbn-flex-col dbn-gap-3">
                            <div className="dbn-flex dbn-gap-4">
                              <InputField
                                type="number"
                                label="Lower Limit"
                                onChange={(e) =>
                                  setRange((prev) => ({
                                    ...prev,
                                    lowerLimit: Number(e.target.value),
                                  }))
                                }
                                value={range.lowerLimit}
                              />
                              <InputField
                                type="number"
                                label="Upper Limit"
                                onChange={(e) =>
                                  setRange((prev) => ({
                                    ...prev,
                                    upperLimit: Number(e.target.value),
                                  }))
                                }
                                value={range.upperLimit}
                              />
                            </div>
                            <InputField
                              type="text"
                              label="Label"
                              onChange={(e) =>
                                setRange((prev) => ({
                                  ...prev,
                                  label: e.target.value,
                                }))
                              }
                              value={range.label}
                            />
                            {chartSettings.chartType === CHART_TYPES.gauge ? (
                              <ColorField
                                name="color"
                                onChange={(value) =>
                                  setRange((prev) => ({
                                    ...prev,
                                    color: value,
                                  }))
                                }
                                defaultValue="#000000"
                                value={range.color || '#000000'}
                              />
                            ) : null}
                            <div className="dbn-w-full dbn-flex dbn-gap-4 dbn-justify-end">
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  setOpenRangeModal(false);
                                  setRange({
                                    label: '',
                                    upperLimit: 0,
                                    lowerLimit: 0,
                                  });
                                }}
                              >
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={onSaveRange}
                                isDisabled={
                                  !range.label ||
                                  !range.lowerLimit.toString() ||
                                  !range.upperLimit.toString() ||
                                  range.upperLimit === range.lowerLimit
                                }
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </>
                ) : null}
              </div>
            }
            header={<Text variant="heading">Formatting</Text>}
            headerButton={null}
          />
        ) : null}
        {!isGeoMap && !(chartSettings.chartType === CHART_TYPES.gauge) ? (
          <AccordionV3
            width="100%"
            content={
              <div className={styles['container-wrapper']}>
                {!isInavlidForLabelFormatting ? (
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Enable Label Tooltip</Text>
                    <Switch
                      name="label tooltip"
                      enabled={
                        chartSettings.customSettings?.isEnableLabelTooltip
                      }
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            isEnableLabelTooltip:
                              !chartSettings.customSettings
                                ?.isEnableLabelTooltip,
                          },
                        }))
                      }
                    />
                  </div>
                ) : null}
                {chartSettings.chartType === CHART_TYPES.sankey && (
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">
                      Interchange the source and target
                    </Text>
                    <Switch
                      name="show background"
                      enabled={chartSettings.backGroundColor?.show}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          sankeyValues: [
                            prev?.sankeyValues?.[1] || '',
                            prev?.sankeyValues?.[0] || '',
                            prev?.sankeyValues?.[2] || '',
                          ],
                        }))
                      }
                    />
                  </div>
                )}
                {[
                  CHART_TYPES.bar,
                  CHART_TYPES.row,
                  CHART_TYPES.stack,
                  CHART_TYPES.histogram,
                  CHART_TYPES.combo,
                  CHART_TYPES.timeSeries,
                ].includes(chartSettings.chartType) ||
                (chartSettings.chartType === CHART_TYPES.timeSeries &&
                  chartSettings.timeSeriesSettings?.seriesType[0]?.type ===
                    'bar') ? (
                  <div className={styles.wrapper}>
                    <Text variant="body-text-sm">Show bar background</Text>
                    <Switch
                      name="show background"
                      enabled={chartSettings.backGroundColor?.show}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          backGroundColor: {
                            show: !prev.backGroundColor?.show,
                          },
                        }))
                      }
                    />
                  </div>
                ) : null}
                {chartSettings.chartType === CHART_TYPES.combo && (
                  <MultiSelectDropdown
                    selectedOption={
                      chartSettings.comboBarList
                        ?.filter((i) => chartSettings.yAxisList?.includes(i))
                        ?.map((v) => ({ value: v, label: v })) || []
                    }
                    label="Combo Bar"
                    options={
                      chartSettings.yAxisList?.map((v) => ({
                        value: v,
                        label: v,
                      })) || []
                    }
                    onChange={(value) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        comboBarList:
                          value
                            ?.filter((v) =>
                              chartSettings.yAxisList?.includes(v.value)
                            )
                            ?.map((v) => v.value) || [],
                      }))
                    }
                    menuWidth="100%"
                    buttonWidth="100%"
                  />
                )}
                {chartSettings.chartType === CHART_TYPES.bubble ? (
                  <InputField
                    type="number"
                    label="Constant For Bubble Size"
                    min={0}
                    onChange={(e) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        percentageSize: Number(e.target.value),
                      }))
                    }
                    value={chartSettings.percentageSize}
                  />
                ) : null}
                {chartSettings.chartType === CHART_TYPES.bar ||
                (chartSettings.chartType === CHART_TYPES.timeSeries &&
                  chartSettings.timeSeriesSettings?.seriesType?.[0]?.type ===
                    'bar') ? (
                  <div className={styles.wrapper}>
                    <Text variant="heading">Enable Cumulative Bar</Text>
                    <Switch
                      name="cumulative"
                      enabled={chartSettings.customSettings?.cumulativeBar}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            cumulativeBar: !prev.customSettings?.cumulativeBar,
                          },
                        }))
                      }
                    />
                  </div>
                ) : null}
                {chartSettings.chartType === CHART_TYPES.combo && (
                  <>
                    {chartSettings?.comboBarList?.length > 0 && (
                      <div className={styles.wrapper}>
                        <Text variant="heading">Enable Stack Bar</Text>
                        <Switch
                          name="enable stack bar"
                          enabled={chartSettings.customSettings?.isStackBar}
                          onChange={() => {
                            setChartSettings((prev) => ({
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                isStackBar: !prev.customSettings?.isStackBar,
                              },
                            }));
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
                {[CHART_TYPES.bar, CHART_TYPES.row, CHART_TYPES.stack].includes(
                  chartSettings.chartType
                ) ||
                (chartSettings.chartType === CHART_TYPES.timeSeries &&
                  chartSettings.timeSeriesSettings?.seriesType[0]?.type ===
                    'bar') ? (
                  <>
                    <InputField
                      type="number"
                      label="Modify Bar Width"
                      onChange={(e) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            barWidth: parseInt(e.target.value, 10),
                          },
                        }))
                      }
                      value={chartSettings.customSettings?.barWidth}
                    />
                    <div className={styles.prefixSuffixContainer}>
                      <InputField
                        type="number"
                        label="Modify Top Bar Radius"
                        min={0}
                        onChange={(e) =>
                          setBarRadius((prev) => ({
                            ...prev,
                            topRadius: parseInt(e.target.value, 10),
                          }))
                        }
                        value={
                          chartSettings.customSettings?.barRadius?.[1] || 0
                        }
                      />
                      <InputField
                        type="number"
                        label="Modify Bottom Bar Radius"
                        min={0}
                        onChange={(e) =>
                          setBarRadius((prev) => ({
                            ...prev,
                            bottomRadius: parseInt(e.target.value, 10),
                          }))
                        }
                        value={
                          chartSettings.customSettings?.barRadius?.[3] || 0
                        }
                      />
                    </div>
                  </>
                ) : null}
                {[
                  CHART_TYPES.line,
                  CHART_TYPES.bar,
                  CHART_TYPES.row,
                  CHART_TYPES.area,
                  CHART_TYPES.combo,
                  CHART_TYPES.histogram,
                  CHART_TYPES.stepped,
                  CHART_TYPES.scatter,
                  CHART_TYPES.timeSeries,
                  CHART_TYPES.stackedArea,
                ].includes(chartSettings.chartType) && (
                  <div className={styles.wrapper}>
                    <span className="dbn-flex dbn-gap-1 dbn-items-center">
                      <Text variant="heading">Hide 0/null Values</Text>
                      <InfoTooltip
                        text="Hide 0, undefined, null, N/A,
                        values from the tooltip"
                        position="top"
                      />
                    </span>
                    <Switch
                      name="hide null values"
                      enabled={chartSettings.customSettings?.hideNullValues}
                      onChange={() => {
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            hideNullValues:
                              !prev.customSettings?.hideNullValues,
                          },
                        }));
                      }}
                    />
                  </div>
                )}
                {[
                  CHART_TYPES.bar,
                  CHART_TYPES.line,
                  CHART_TYPES.area,
                  CHART_TYPES.stackedArea,
                  CHART_TYPES.timeSeries,
                ].includes(chartSettings.chartType) && (
                  <div className={styles.wrapper}>
                    <Text variant="heading">Enable Dynamic Behavior</Text>
                    <Switch
                      name="dynamic"
                      enabled={
                        chartSettings.customSettings?.showDynamicBehaviour
                      }
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            showDynamicBehaviour:
                              !prev.customSettings?.showDynamicBehaviour,
                          },
                        }))
                      }
                    />
                  </div>
                )}
                {![
                  CHART_TYPES.gauge,
                  CHART_TYPES.pie,
                  CHART_TYPES.table,
                  CHART_TYPES.singleValue,
                  CHART_TYPES.doughnut,
                  CHART_TYPES.funnel,
                  CHART_TYPES.sankey,
                  CHART_TYPES.rose,
                ].includes(chartSettings.chartType) && (
                  <>
                    <div className={styles.wrapper}>
                      <span className="dbn-flex dbn-gap-1 dbn-items-center">
                        <Text variant="heading">Enable Chart Zoom</Text>
                        <InfoTooltip
                          position="top"
                          text="Enable zooming and panning for the chart"
                        />
                      </span>
                      <Switch
                        name="chart zoom"
                        enabled={
                          chartSettings.customSettings?.chartZoom?.isZoomEnabled
                        }
                        onChange={() => {
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              chartZoom: {
                                ...prev.customSettings?.chartZoom,
                                isZoomEnabled:
                                  !prev.customSettings?.chartZoom
                                    ?.isZoomEnabled,
                                zoomAxis: 'x',
                                zoomOnMouseWheel: true,
                              },
                            },
                          }));
                        }}
                      />
                    </div>
                    {chartSettings.customSettings?.chartZoom?.isZoomEnabled && (
                      <div className={styles.wrapper}>
                        <Text variant="heading">Select Zoom Axis</Text>
                        <FloatingDropDown
                          selectedOption={{
                            value:
                              chartSettings.customSettings.chartZoom.zoomAxis ||
                              'x',
                            label:
                              chartSettings.customSettings.chartZoom.zoomAxis ||
                              'x',
                          }}
                          options={[
                            {
                              label: 'x',
                              value: 'x',
                            },
                            { label: 'y', value: 'y' },
                            {
                              label: 'xy',
                              value: 'xy',
                            },
                          ]}
                          onChange={(value) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                chartZoom: {
                                  ...prev.customSettings?.chartZoom,
                                  zoomAxis: value.value,
                                },
                              },
                            }))
                          }
                          buttonWidth="150px"
                          menuWidth="150px"
                        />
                      </div>
                    )}
                  </>
                )}
                {[CHART_TYPES.pie, CHART_TYPES.rose].includes(
                  chartSettings.chartType
                ) && (
                  <>
                    {chartSettings.chartType === 'rose' && (
                      <div className={styles.wrapper}>
                        <Text variant="heading">Rose Type</Text>
                        <FloatingDropDown
                          selectedOption={{
                            value: chartSettings.customSettings?.roseType || '',
                            label: chartSettings.customSettings?.roseType || '',
                          }}
                          options={[
                            {
                              label: 'Radius',
                              value: 'radius',
                            },
                            { label: 'Area', value: 'area' },
                          ]}
                          onChange={(value) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                roseType: value.value,
                              },
                            }))
                          }
                        />
                      </div>
                    )}
                    <div className={styles.wrapper}>
                      <Text variant="heading">Mode</Text>
                      <FloatingDropDown
                        selectedOption={{
                          value:
                            chartSettings.customSettings?.selectedMode || '',
                          label:
                            chartSettings.customSettings?.selectedMode || '',
                        }}
                        options={[
                          {
                            label: 'Single',
                            value: 'single',
                          },
                          { label: 'Multiple', value: 'multiple' },
                          { label: 'Series', value: 'series' },
                        ]}
                        onChange={(value) =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              selectedMode: value.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="heading">Offset</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="number"
                          label="Offset"
                          min={0}
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                selectedOffset: parseInt(e.target.value, 10),
                              },
                            }))
                          }
                          value={chartSettings.customSettings?.selectedOffset}
                        />
                      </div>
                    </div>
                  </>
                )}
                {chartSettings.chartType === CHART_TYPES.stack ||
                (chartSettings.chartType === CHART_TYPES.timeSeries &&
                  chartSettings?.timeSeriesSettings?.seriesType?.[0]?.type ===
                    'stack') ? (
                  <div className={styles.wrapper}>
                    <Text variant="heading">Show 100% Stacked Bar</Text>
                    <Switch
                      name="full stacked"
                      enabled={chartSettings.customSettings?.showFullStacked}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            showFullStacked:
                              !prev.customSettings?.showFullStacked,
                          },
                        }))
                      }
                    />
                  </div>
                ) : null}
                {chartSettings.chartType === CHART_TYPES.funnel && (
                  <>
                    <div className={styles.wrapper}>
                      <Text variant="heading">Show Funnel Shadow</Text>
                      <Switch
                        name="funnel 3"
                        enabled={chartSettings.customSettings?.showFunnelShadow}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              showFunnelShadow:
                                !prev.customSettings?.showFunnelShadow,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="heading">Padding Between Steps</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="number"
                          min={0}
                          max={30}
                          value={
                            chartSettings.customSettings?.stepPadding || 10
                          }
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                stepPadding: parseInt(e.target.value, 10),
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="heading">Show Label With Values</Text>
                      <Switch
                        name="funnel 1"
                        enabled={chartSettings.customSettings?.showLabelValues}
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              showLabelValues:
                                !prev.customSettings?.showLabelValues,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="heading">Show Conversion Rate</Text>
                      <Switch
                        name="funnel 2"
                        enabled={
                          chartSettings.customSettings?.showConversionRate
                        }
                        onChange={() =>
                          setChartSettings((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              showConversionRate:
                                !prev.customSettings?.showConversionRate,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className={styles.wrapper}>
                      <Text variant="heading">Label Format</Text>
                      <div className={styles.inputWrapper}>
                        <InputField
                          type="text"
                          placeholder="{b}"
                          value={chartSettings.customSettings?.labelFormat}
                          onChange={(e) =>
                            setChartSettings((prev) => ({
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                labelFormat: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
                {[
                  CHART_TYPES.pie,
                  CHART_TYPES.doughnut,
                  CHART_TYPES.rose,
                ].includes(chartSettings.chartType) ? (
                  <div className={styles.wrapper}>
                    <Text variant="heading">Show Label Line</Text>
                    <Switch
                      name="label line"
                      enabled={chartSettings.labelSettings?.showLabelLine}
                      onChange={() =>
                        setChartSettings((prev) => ({
                          ...prev,
                          labelSettings: {
                            ...prev.labelSettings,
                            showLabelLine: !prev.labelSettings?.showLabelLine,
                          },
                        }))
                      }
                    />
                  </div>
                ) : null}
                {chartSettings.chartType === CHART_TYPES.timeSeries && (
                  <TimeSeriesSettings
                    onChangeTimeseriesFormat={onChangeTimeseriesFormat}
                    onChange={(ts) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        timeSeriesSettings: {
                          ...prev.timeSeriesSettings,
                          ...(ts instanceof Function
                            ? ts(
                                prev.timeSeriesSettings ||
                                  ({} as TimeSeriesSettingsType)
                              )
                            : ts),
                        },
                      }))
                    }
                    yAxisList={chartSettings.yAxisList || []}
                    settings={
                      chartSettings.timeSeriesSettings as TimeSeriesSettingsType
                    }
                  />
                )}
              </div>
            }
            header={<Text variant="heading">Other Customizations</Text>}
            headerButton={null}
          />
        ) : null}
      </div>
    </>
  );
};
