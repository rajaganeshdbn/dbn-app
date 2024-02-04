/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-param-reassign */
import { numberFormatter } from './numberFormatter';
import { CHART_TYPES, STACK_AXIS } from '@/consts';
import { addPrefixAndSuffix } from '@/utils';

export const tooltipFormatter = (
  params: any,
  chartOptions: any,
  hasPercentSymbol: boolean = false
) => {
  let filteredNullParams: any = params;
  if (chartOptions.customSettings.hideNullValues) {
    filteredNullParams = params.filter((param: any) => {
      return (
        param.value !== undefined && param.value !== null && param.value !== 0
      );
    });
  }

  const sortedStrings = filteredNullParams
    ?.filter((param: any) => typeof param.value === 'string')
    ?.sort((a: any, b: any) => a.value.length - b.value.length);
  const sortedNumbers = filteredNullParams
    ?.filter((param: any) => typeof param.value === 'number')
    ?.sort((a: any, b: any) => a.value - b.value);
  const sortedBooleans = filteredNullParams?.filter(
    (param: any) => typeof param.value === 'boolean'
  );

  const remainingValues = filteredNullParams?.filter((parama: any) => {
    if (
      typeof parama.value !== 'string' &&
      typeof parama.value !== 'number' &&
      typeof parama.value !== 'boolean'
    ) {
      return parama;
    }
  });

  const filteredParams = [
    ...(sortedBooleans || []),
    ...(sortedNumbers || []),
    ...(sortedStrings || []),
    ...(remainingValues || []),
  ];
  let tooltip;
  if (chartOptions.chartType === CHART_TYPES.combo) {
    tooltip = `${filteredParams
      ?.map((param: any, index: number) => {
        const comboAxisInfo =
          chartOptions.customSettings.comboAxisSymbols?.filter(
            (item: any) => item.name === param.seriesName
          );
        let prefix;
        let suffix;
        const isValidForcomboStackAxisSymbols =
          chartOptions.comboBarList.includes(param.seriesName) &&
          chartOptions.customSettings.isStackBar;
        if (comboAxisInfo) {
          suffix = comboAxisInfo[0]?.suffix ? comboAxisInfo[0].suffix : '';
          prefix = comboAxisInfo[0]?.prefix ? comboAxisInfo[0].prefix : '';
        }
        if (isValidForcomboStackAxisSymbols) {
          prefix =
            chartOptions.customSettings.comboStackAxisSymbols?.prefix || '';
          suffix =
            chartOptions.customSettings.comboStackAxisSymbols?.suffix || '';
        }
        const stackAxisName =
          chartOptions.customSettings?.comboStackAxisSymbols?.name ||
          STACK_AXIS;
        const value = Array.isArray(param.value) ? param.value[1] : param.value;
        const formatter = isValidForcomboStackAxisSymbols
          ? chartOptions.customSettings.comboLabelFormatter?.find(
              (item: any) => item.axis === stackAxisName
            )?.formatter
          : chartOptions.customSettings.comboLabelFormatter?.find(
              (item: any) => item.axis === param.seriesName
            )?.formatter;
        const matchingRange =
          formatter?.find((range: any) => {
            return value >= range.lowerLimit && value <= range.upperLimit;
          })?.label || '';

        return `
          ${index === 0 ? `<div> ${param.name} </div>` : ''}
          <div style="display:flex; justify-content:space-between; gap: 1rem; margin-bottom: 0.2rem">
            <span>
              ${param.marker} ${param.seriesName}:
            </span> 
            <span>
              ${
                Array.isArray(param.value)
                  ? addPrefixAndSuffix(
                      numberFormatter(
                        param.value[1],
                        chartOptions.customSettings.numberFormatter
                      ),
                      prefix,
                      suffix
                    )
                  : addPrefixAndSuffix(
                      numberFormatter(
                        param.value,
                        chartOptions.customSettings.numberFormatter
                      ),
                      prefix,
                      suffix
                    )
              } ${matchingRange ? `(${matchingRange})` : ''}
            </span>
          </div>
        `;
      })
      .join('')}`;
  } else {
    tooltip = `${filteredParams
      ?.map((param: any, index: number) => {
        const value = Array.isArray(param.value) ? param.value[1] : param.value;
        const matchingRange =
          chartOptions?.customSettings?.YaxislabelFormatters?.find(
            (range: any) => {
              return value >= range.lowerLimit && value <= range.upperLimit;
            }
          )?.label || '';
        return `
          ${index === 0 ? `<div> ${param.name} </div>` : ''}
          <div style="display:flex; justify-content:space-between; gap: 1rem; margin-bottom: 0.2rem">
            <span>
              ${param.marker} ${param.seriesName}:
            </span> 
            <span>
              ${
                Array.isArray(param.value)
                  ? addPrefixAndSuffix(
                      numberFormatter(
                        param.value[1],
                        chartOptions.customSettings.numberFormatter
                      ),
                      chartOptions.customSettings.labelPrefix || '',
                      chartOptions.customSettings.labelSuffix || ''
                    )
                  : addPrefixAndSuffix(
                      numberFormatter(
                        param.value,
                        chartOptions.customSettings.numberFormatter
                      ),
                      chartOptions.customSettings.labelPrefix || '',
                      chartOptions.customSettings.labelSuffix || ''
                    )
              }${hasPercentSymbol ? '%' : ''} ${
          matchingRange ? `(${matchingRange})` : ''
        }
            </span>
          </div>`;
      })
      .join('')}`;
  }
  return tooltip;
};
