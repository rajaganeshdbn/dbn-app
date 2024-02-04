/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable max-params */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUnderlyingData } from './useUnderlyingData';
// import { updateDrilledData } from '@/helpers';
import {
  ChartSettingsType,
  FloatingDropDownOption,
  DateOptionType,
  RlsCondition,
  DatasetSettings,
  MetricFilterOptionsType,
  CustomOption,
  PivotDrillState,
  SelectedColumn,
  Filter,
  DatasetMetricCreationConfiguration,
  OnDrillPivotTableParams,
} from '@/types';

import { MetricCardProps } from '@/components';
import { CHART_TYPES, DATE } from '@/consts';
import { useMetricDataQuery } from '@/queries/metric.query';
import { UseMetricQueryQueryOutputType } from '@/types/queryTypes';
import {
  getChartFields,
  getDimensionsAndAggregates,
  getValidRlsConditionOptions,
  isAppliedFilter,
} from '@/helpers';
import { useGenerateMetricDataMutation } from '@/queries';
import { getLegendData } from '@/utils';
// import { findKeys } from '@/helpers';

/**
 * @name getValidDate - returns the valid date object else null.
 * @param date - a date string or object.
 * @returns date - a valid date object or null.
 */
const getValidDate = (date: string | Date) => {
  const dateObj = new Date(date);
  if (dateObj instanceof Date && !Number.isNaN(dateObj.getTime()))
    return dateObj;
  return null;
};

type UseMetricCardProps = {
  metric: Record<string, any>;
  clientId: string;
  encryptedClientId?: string;
  tenancyLevel: string;
  globalFilters?: MetricCardProps['globalFilters'];
  rlsFilters?: any;
  appFilters?: any;
  datasetSettings?: DatasetSettings;
  setDatasetSettings?: React.Dispatch<React.SetStateAction<DatasetSettings>>;
  isInternalApp?: boolean;
  setCrossDashboardFilters?: React.Dispatch<
    React.SetStateAction<RlsCondition[]>
  >;
  crossDashboardFilters?: RlsCondition[];
  metricFilterOptions?: MetricFilterOptionsType;
  isAllClient?: boolean;
  isFrontendApp: boolean;
  guestToken?: string;
};

export const useMetricCard = ({
  metric,
  globalFilters = { tableName: '', filters: [] },
  rlsFilters,
  clientId,
  tenancyLevel,
  isInternalApp,
  appFilters,
  setCrossDashboardFilters,
  crossDashboardFilters,
  metricFilterOptions,
  isAllClient,
  isFrontendApp,
  guestToken,
  encryptedClientId,
}: UseMetricCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tableLimit, setTableLimit] = useState({
    limit: 10,
    offset: 0,
  });
  const [totalTableRecords, setTotalTableRecords] = useState(0);
  const [rlsConditions, setRlsConditions] = useState<RlsCondition[]>(
    metric?.rlsConditions || []
  );
  const [isShowChartPopup, setShowChartPopup] = useState(false);
  const [chartParams, setChartParams] = useState<any>();
  const [dataDb, setDataDb] = useState<Record<string, any>[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [drillFilters, setDrillFilters] = useState<
    { columnName: string; value: string | number }[]
  >([]);
  const [groupByList, setGroupByList] = useState<any[]>([]);
  const [isEnablePivotTable, setEnablePivotTable] = useState<boolean>(false);
  // const [hasNumberKeys, setNumberKeys] = useState<boolean>(false);
  // const [isEnableGauge, setEnableGauge] = useState<boolean>(false);
  const [appliedMetricFilters, setAppliedMetricFilters] = useState<
    RlsCondition[]
  >([]);
  const [dynamicOptions, setDynamicOptions] = useState<any>(null);
  const [chartSettings, setChartSettings] = useState<ChartSettingsType>(
    metric.chartOptions
  );
  const [pivotDrillState, setPivotDrillState] = useState<PivotDrillState>({
    data: [],
    error: '',
    isLoading: false,
    currentValue: '',
  });
  const isPythonMode = useMemo(
    () =>
      Boolean(metric?.datasetMetricSettings?.newDatasetSettings?.isPythonMode),
    [metric?.datasetMetricSettings?.newDatasetSettings?.isPythonMode]
  );

  const filterValues = useMemo(() => {
    const values: Record<string, any> = {};
    if (rlsFilters?.values) {
      for (const key in rlsFilters.values) {
        const newKey = `${key}_variable`;
        values[newKey] = rlsFilters.values[key];
      }
    }
    return values;
  }, [rlsFilters?.values]);
  const { data: metricdata, isLoading: isQueryLoading } = useMetricDataQuery({
    data: {
      isAllClient,
      id: metric.id,
      drillFilters: metric?.drillDownSettings?.isEnableGroupBy
        ? drillFilters
        : [],
      tenancyLevel,
      rlsConditions: appliedMetricFilters,
      globalFilters: isPythonMode ? undefined : globalFilters,
      filterValues: isPythonMode ? undefined : filterValues,
      limit:
        chartSettings?.tableSettings?.isServerSidePagination &&
        chartSettings?.chartType === CHART_TYPES.table
          ? Math.min(tableLimit.limit, 1000)
          : undefined,
      offset:
        chartSettings?.tableSettings?.isServerSidePagination &&
        chartSettings?.chartType === CHART_TYPES.table
          ? tableLimit.offset
          : undefined,
      disableStringify: true,
      pivotHeaders: chartSettings.pivotTableSettings2?.headers || [],
      timeseriesSettings: isPythonMode
        ? undefined
        : {
            format:
              chartSettings.timeSeriesSettings?.groupBySettings?.value ||
              'monthly',
            seriesField: chartSettings?.seriesField || '',
          },
    },
    clientId: isFrontendApp ? encryptedClientId || '' : clientId,
    token: guestToken,
    isFrontendApp,
  });
  const { mutate: datasetMetricCreation } = useGenerateMetricDataMutation();
  useEffect(() => {
    setRlsConditions(
      metric?.rlsConditions?.map((r: any) => {
        let filter = r;
        if (metricFilterOptions) {
          const validOptions = getValidRlsConditionOptions(
            filter,
            metricFilterOptions
          );
          if (validOptions) {
            filter = {
              ...filter,
              value: validOptions.value
                ? filter.datatype === 'string'
                  ? [validOptions.value]
                  : validOptions.value
                : filter.value,
              options:
                filter.datatype === 'date'
                  ? validOptions.options.map((opt: any) => ({
                      ...opt,
                      startDate: getValidDate(opt.fromDate) ?? opt.startDate,
                      endDate: getValidDate(opt.toDate) ?? opt.endDate,
                      minDate: getValidDate(opt.minDate) ?? undefined,
                      maxDate: getValidDate(opt.maxDate) ?? undefined,
                      fromDate: getValidDate(opt.fromDate) ?? undefined,
                      toDate: getValidDate(opt.toDate) ?? undefined,
                    }))
                  : validOptions.options,
              variableOptions:
                filter.datatype === 'date'
                  ? validOptions.options.map((opt: any) => ({
                      startDate: getValidDate(opt.fromDate) ?? opt.startDate,
                      endDate: getValidDate(opt.toDate) ?? opt.endDate,
                      value: opt.name,
                      label: opt.name,
                    }))
                  : validOptions.options.map((opt: any) => ({
                      value: opt,
                      label: opt,
                    })),
              selectedVariableValue: validOptions.value
                ? filter.datatype === 'string'
                  ? { value: validOptions.value, label: validOptions.value }
                  : {
                      startDate: getValidDate(
                        (validOptions.options as any)?.find(
                          (opt: any) => opt.name === validOptions.value
                        )?.fromDate
                      ),
                      endDate: getValidDate(
                        (validOptions.options as any)?.find(
                          (opt: any) => opt.name === validOptions.value
                        )?.toDate
                      ),
                      value: validOptions.value,
                      label: validOptions.value,
                    }
                : filter.selectedVariableValue,
            };
          }
        }
        return tenancyLevel === 'DATABASE'
          ? {
              ...filter,
              tableName: `${clientId}.${r.tableName
                .split('.')
                .slice(1)
                .join('.')}`,
            }
          : filter;
      }) || []
    );
  }, [metric?.rlsConditions, metricFilterOptions, tenancyLevel]);

  // const isShowTimeGroupData = useMemo(
  //   () =>
  //     !!rlsConditions.length &&
  //     (
  //       rlsConditions.find(
  //         (filter) =>
  //           filter.isAddOnMetrics &&
  //           filter.datatype === 'date' &&
  //           filter.columnName === chartSettings.xAxis
  //       )?.options as DateOptionType[]
  //     )?.every((option) => option.format),
  //   [rlsConditions, chartSettings]
  // );
  const getGroupByString = (name: string) => {
    if (name.includes('____')) {
      return name.split('____')[1];
    }
    if (name.includes('^^^^^^')) {
      return name.split('^^^^^^')[1];
    }
    return name;
  };
  const activeDrillLevel = useMemo(
    () =>
      getGroupByString(
        metric?.datasetMetricSettings?.selectedDimensions?.[
          drillFilters.length <
          metric?.datasetMetricSettings?.selectedDimensions?.length
            ? drillFilters.length
            : 0
        ] || ''
      ),
    [metric?.datasetMetricSettings, drillFilters]
  );
  useEffect(() => {
    const isGroupByEnabled = metric?.drillDownSettings?.isEnableGroupBy;
    const combinedFilters = !isGroupByEnabled
      ? rlsConditions?.length
        ? [...rlsConditions, ...(crossDashboardFilters || [])]
        : [...(crossDashboardFilters || [])]
      : rlsConditions || [];

    if (combinedFilters?.filter((filter) => filter.isAddOnMetrics)?.length) {
      setAppliedMetricFilters(
        combinedFilters
          .filter((filter) => filter.isAddOnMetrics)
          .map((r) =>
            isInternalApp
              ? {
                  ...r,
                  dimensionColumn: chartSettings.xAxis || '',
                  measureColumn: chartSettings.yAxisList?.[0] || '',
                  options: r.datatype !== DATE ? [] : r.options,
                }
              : {
                  ...r,
                  dimensionColumn: chartSettings.xAxis || '',
                  measureColumn: chartSettings.yAxisList?.[0] || '',
                  value: r.isAppFilter
                    ? r.datatype === 'date'
                      ? (r?.options as unknown as DateOptionType[])?.find(
                          (opt: any) =>
                            opt.name === appFilters?.values?.[r.name]
                        )
                      : r.datatype === 'string' &&
                        typeof appFilters?.values?.[r.name] === 'string'
                      ? [appFilters?.values?.[r.name]]
                      : appFilters?.values?.[r.name]
                    : r.value,
                  options: r.datatype !== DATE ? [] : r.options,
                }
          )
          .filter((filter) => isAppliedFilter(filter))
      );
    } else {
      setAppliedMetricFilters([]);
    }
  }, [
    rlsConditions,
    appFilters,
    crossDashboardFilters,
    metric?.drillDownSettings?.isEnableGroupBy,
    tenancyLevel,
    isInternalApp,
    clientId,
  ]);
  const isCompareValue = useMemo(
    () =>
      chartSettings?.chartType === CHART_TYPES.singleValue &&
      !!chartSettings?.customSettings?.comparisonValueShow &&
      !!chartSettings?.customSettings?.comparisonTimeColumn &&
      !!chartSettings?.customSettings?.comparisonTimeGrain &&
      !!chartSettings?.customSettings?.comparisonTimePeriod &&
      !!chartSettings?.customSettings?.comparisonTableName &&
      !!chartSettings?.singleValue,
    [chartSettings]
  );
  useEffect(() => {
    const responseData = metricdata as UseMetricQueryQueryOutputType;
    const queryData =
      responseData?.data && typeof responseData.data === 'string'
        ? JSON.parse(responseData.data)
        : responseData?.data && Array.isArray(responseData?.data)
        ? responseData?.data
        : [];
    setPivotDrillState({
      data: [],
      error: '',
      isLoading: false,
      currentValue: '',
    });
    if (chartSettings?.chartType === CHART_TYPES.table) {
      setTotalTableRecords(responseData?.totalRecords || 0);
    }

    setDataDb(queryData ?? []);
    const metaData = responseData?.metaData;
    setGroupByList(
      metaData?.groupbyColumnList?.map((col: string) =>
        col?.replace(/`/g, '')
      ) || []
    );
  }, [metricdata, isCompareValue]);
  useEffect(() => {
    if (metric?.drillDownSettings?.isEnableGroupBy && dataDb.length) {
      const currentLevelChartSettings =
        metric?.drillDownSettings?.drilldownChartSettings?.find(
          (settings: any) => settings.name === activeDrillLevel
        )?.chartSettings;
      if (
        currentLevelChartSettings &&
        metric?.datasetMetricSettings?.selectedDimensions?.length &&
        metric?.datasetMetricSettings?.selectedDimensions?.length >
          drillFilters?.length
      ) {
        setChartSettings({
          ...currentLevelChartSettings,
          xAxis: activeDrillLevel,
        });
      } else {
        setChartSettings((prev) => ({
          ...prev,
          xAxis: activeDrillLevel,
          yAxisList:
            chartSettings.chartType === 'table'
              ? [
                  activeDrillLevel,
                  ...(metric?.datasetMetricSettings?.metrics?.map(
                    (value: any) => value?.as?.replace(/["`]+/g, '')
                  ) || []),
                ]
              : metric?.datasetMetricSettings?.metrics?.map((value: any) =>
                  value?.as?.replace(/["`]+/g, '')
                ),
        }));
      }
    }
  }, [
    dataDb,
    metric.drillDownSettings,
    metric?.datasetMetricSettings,
    drillFilters,
  ]);
  useEffect(() => {
    if (isQueryLoading) setLoading(true);
    if (!dataDb.length && !isQueryLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [isQueryLoading, dataDb]);

  const onChangeFilterValue = useCallback(
    (
      name: string,
      value: string,
      labelValue?: string,
      customValue?: Record<string, Date>,
      stringValues?: FloatingDropDownOption[]
    ) => {
      if (customValue) {
        setRlsConditions((prev) =>
          prev.map((rls) =>
            rls.name === name
              ? {
                  ...rls,
                  value,
                  options: (rls.options as DateOptionType[]).map((option) =>
                    value === option.name
                      ? { ...option, ...customValue }
                      : option
                  ),
                  variableOptions: (rls.variableOptions as CustomOption[])?.map(
                    (option) =>
                      option.value === value
                        ? { ...option, ...customValue }
                        : option
                  ),
                  selectedVariableValue: {
                    value,
                    label: value,
                    endDate: customValue.endDate,
                    startDate: customValue.startDate,
                  },
                }
              : rls
          )
        );
      } else if (stringValues) {
        setRlsConditions((prev) =>
          prev.map((rls) =>
            rls.name === name
              ? {
                  ...rls,
                  value: stringValues?.length
                    ? stringValues.map((v) => v.value)
                    : undefined,
                  selectedDropdownValue: stringValues?.length
                    ? stringValues
                    : undefined,
                }
              : rls
          )
        );
      } else {
        setRlsConditions((prev) =>
          prev.map((rls) =>
            rls.name === name
              ? {
                  ...rls,
                  value,
                  selectedVariableValue: { value, label: value },
                  selectedDropdownValue: { value, label: labelValue || value },
                }
              : rls
          )
        );
      }
    },
    []
  );

  const handleChartClick = useCallback(
    (params: any) => {
      if (params.event) params.event.event.preventDefault();
      setChartParams(params);
    },
    [rlsConditions]
  );

  const { getUnderlyingData } = useUnderlyingData({
    clientName: clientId,
    dbName: metric?.companyIntegration?.name,
    tenancyType: tenancyLevel,
    values: filterValues,
    companyId: metric?.companyId,
    query: metric?.query,
    workspaceId: metric?.companyIntegration?.workspaceId,
    metricId: metric?.id,
  });

  const columnName = useMemo(
    () =>
      Array.isArray(dataDb) && dataDb.length && chartParams?.name
        ? dataDb
            .map((obj) => {
              const entry = Object.entries(obj).find(
                ([, value]) => value === chartParams.name
              );
              return entry?.[0];
            })
            .filter((value) => value)[0]
        : '',
    [dataDb, chartParams?.name]
  );

  const onDrillDown = useCallback(
    (params: any, rowFilters?: { columnName: string; value: any }[]) => {
      const drillColumnName = getGroupByString(
        metric?.datasetMetricSettings?.selectedDimensions?.[
          drillFilters?.length
        ] || ''
      );

      const selectedDimension =
        metric?.datasetMetricSettings?.configuration?.dimensions?.find(
          (col: any) => col.alias === drillColumnName
        );
      const tablename = selectedDimension?.parentAlias?.replace('_', '.', 1);
      if (drillColumnName || metric?.drillDownSettings?.drillType === 'table') {
        const isApply =
          metric?.datasetMetricSettings?.selectedDimensions.length >
          drillFilters.length;
        setDrillFilters((prev) =>
          metric?.drillDownSettings?.drillType === 'table'
            ? rowFilters || []
            : isApply
            ? [...prev, { columnName: drillColumnName, value: params?.name }]
            : []
        );
        if (metric?.drillDownSettings?.isEnableCrossFilter)
          setCrossDashboardFilters?.((prev) =>
            isApply
              ? [
                  ...prev,
                  {
                    columnName: selectedDimension?.columnName,
                    datatype: 'string',
                    isAddOnMetrics: true,
                    name: 'cross-filter',
                    options: [params?.name],
                    tableName:
                      tenancyLevel === 'DATABASE'
                        ? `${clientId}.${tablename
                            ?.split('.')
                            .slice(1)
                            .join('.')}`
                        : tablename,
                    value: [params?.name],
                  },
                ]
              : []
          );
      } else {
        setCrossDashboardFilters?.([]);
        setDrillFilters([]);
      }
    },
    [dataDb, metric?.datasetMetricSettings, metric?.drillDownSettings]
  );

  const onDrillPivotTable = ({
    filters,
    nextLevel,
    currentValue,
  }: OnDrillPivotTableParams) => {
    const datasetSettings = (metric?.datasetMetricSettings as any)
      ?.newDatasetSettings;
    const configuration =
      datasetSettings?.configuration as DatasetMetricCreationConfiguration;
    const selectedDims = (datasetSettings?.selectedDims ||
      []) as SelectedColumn[];
    const selectedMetrics = (datasetSettings?.selectedMetrics ||
      []) as SelectedColumn[];
    const { headerColumns, nonHeaderColumns } = selectedDims.reduce(
      (
        result: {
          headerColumns: SelectedColumn[];
          nonHeaderColumns: SelectedColumn[];
        },
        c: SelectedColumn
      ) => {
        if (chartSettings.pivotTableSettings2?.headers?.includes(c.alias)) {
          result.headerColumns.push(c);
        } else {
          result.nonHeaderColumns.push(c);
        }
        return result;
      },
      { headerColumns: [], nonHeaderColumns: [] }
    );
    const key = filters
      .map((col) => `${col.columnName};;${col.value}`)
      .join(';;');
    setPivotDrillState((prev) => ({
      ...prev,
      data: prev.data.filter((d) => d.key !== key),
      error: '',
      isLoading: true,
      currentValue,
    }));
    const updatedDimensions: SelectedColumn[] = nonHeaderColumns.slice(
      0,
      nextLevel
    );
    const newFilters: Filter[] = filters
      .map((filter) => {
        const column = selectedDims.find(
          (col) => col.alias === filter.columnName
        );
        if (column) {
          const filterColumn: Filter = {
            alias: column.alias || '',
            columnName: column.name,
            dataType: column.datatype,
            method: '=',
            parentAlias: column.parentAlias,
            type: 'dimension',
            value: filter.value,
            relationOperator: 'AND',
          };
          return filterColumn;
        }
        return undefined;
      })
      .filter((filter) => filter) as Filter[];
    const newColumnList: SelectedColumn[] = [
      ...updatedDimensions,
      ...selectedMetrics,
      ...headerColumns,
    ];
    const { aggregates, dimensions } =
      getDimensionsAndAggregates(newColumnList);
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
      filters: [...configuration.filters, ...newFilters],
      isApplyGlobalFilter: true,
      isApplyMetricFilter: true,
      globalFilters: globalFilters,
      rlsConditions: appliedMetricFilters,
    };
    datasetMetricCreation(
      {
        data: {
          configuration: newConfiguration,
          id: metric?.companyIntegration?.workspaceId,
        },
        clientId: isFrontendApp ? encryptedClientId || '' : clientId,
        token: guestToken || '',
        isFrontendApp,
      },
      {
        onSuccess(generateMetricResponse: any) {
          const error = generateMetricResponse?.error;
          const result = generateMetricResponse?.data;
          if (error?.message) {
            setPivotDrillState((prev) => ({
              ...prev,
              error: error?.message,
              isLoading: false,
              currentValue: '',
            }));
          } else {
            setPivotDrillState((prev) => ({
              data: [
                ...prev.data,
                { key, data: Array.isArray(result) ? result : [] },
              ],
              error: '',
              isLoading: false,
              currentValue: '',
            }));
            setChartSettings((prev) => ({
              ...prev,
              pivotTableSettings2: {
                ...chartSettings.pivotTableSettings2,
                dimensions: getChartFields(
                  updatedDimensions,
                  metric?.companyIntegration?.name || ''
                ),
                headers: getChartFields(
                  headerColumns,
                  metric?.companyIntegration?.name || ''
                ),
              },
            }));
          }
        },
      }
    );
  };

  const onDrillLevelClick = useCallback(
    (index: number) => {
      if (index > 0 && drillFilters.length) {
        const updatedFilters = drillFilters.slice(0, -1);
        setDrillFilters(updatedFilters);
        if (metric?.drillDownSettings?.isEnableCrossFilter)
          setCrossDashboardFilters?.((prev) => {
            const updatedCrossFilters = prev.slice(0, -1);
            return updatedCrossFilters;
          });
      } else {
        setCrossDashboardFilters?.([]);
        setDrillFilters([]);
      }
    },
    [drillFilters]
  );
  useEffect(() => {
    if (dataDb?.length && groupByList.length) {
      setEnablePivotTable(true);
    } else {
      setEnablePivotTable(false);
    }
  }, [dataDb, groupByList.length, metric?.integrationName, metric.query]);
  const pivotHeaderOptions: FloatingDropDownOption[] = useMemo(
    () =>
      metric?.datasetMetricSettings?.newDatasetSettings?.selectedMetrics.some(
        (col: SelectedColumn) => col.configType === 'AGGREGATE'
      )
        ? metric?.datasetMetricSettings?.newDatasetSettings?.selectedDims.map(
            (col: SelectedColumn) => ({ value: col.alias, label: col.alias })
          ) || []
        : [],
    [metric?.datasetMetricSettings?.newDatasetSettings]
  );
  const {
    metricFilters,
    leftPositionedMetricFilters,
    rightPositionedMetricFilters,
  } = useMemo(() => {
    const filters = rlsConditions.filter((rls) => !rls.isAppFilter);
    const addOnFilters = filters.filter((f) => f.isAddOnMetrics);
    const leftFilters: RlsCondition[] = [];
    const rightFilters: RlsCondition[] = [];
    addOnFilters.forEach((filter) => {
      if (filter.position === 'top-right') {
        rightFilters.push(filter);
      } else {
        leftFilters.push(filter);
      }
    });
    return {
      metricFilters: filters,
      leftPositionedMetricFilters: leftFilters,
      rightPositionedMetricFilters: rightFilters,
    };
  }, [rlsConditions]);
  const tableResultsDownloadData: Record<string, any>[] = useMemo(() => {
    const filterKeys: string[] =
      (metric?.dataSecuritySettings as any)?.csvColumns || [];
    if (dataDb?.length) {
      return dataDb.map((obj) => {
        const filteredObj: Record<string, any> = {};

        for (const key in obj) {
          if (!filterKeys?.includes(key)) {
            filteredObj[key] = obj[key];
          }
        }
        return filteredObj;
      });
    }
    return [];
  }, [dataDb, metric?.dataSecuritySettings]);
  useEffect(() => {
    setChartSettings(metric?.chartOptions);
    setTableLimit({
      limit: parseInt(
        metric?.chartOptions?.tableSettings?.defaultRowSize || '10',
        10
      ),
      offset: 0,
    });
  }, [metric]);

  useEffect(() => {
    if (chartSettings.isDynamicSeries) {
      if (chartSettings.seriesOptions?.includes('ungrouped')) {
        if (chartSettings.ungroupedAlias) {
          setDynamicOptions(
            chartSettings.seriesOptions?.map((group) => {
              if (group === 'ungrouped') {
                return {
                  value: group,
                  label: chartSettings.ungroupedAlias,
                };
              }
              return {
                value: group,
                label: group,
              };
            })
          );
        } else {
          setDynamicOptions(
            chartSettings.seriesOptions?.map((group) => ({
              value: group,
              label: group,
            }))
          );
        }
      } else {
        setDynamicOptions([
          ...(chartSettings.seriesOptions?.map((group) => ({
            value: group,
            label: group,
          })) ?? []),
        ]);
      }
    }
  }, [
    chartSettings.seriesOptions,
    chartSettings.isDynamicSeries,
    chartSettings.ungroupedAlias,
  ]);

  const [isEnableZoom, setIsEnableZoom] = useState(false);

  const dataBrainHandleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      setIsEnableZoom(true);
    }
  };

  const dataBrainHandleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      setIsEnableZoom(false);
    }
  };

  useEffect(() => {
    if (chartSettings.customSettings?.chartZoom?.isZoomEnabled) {
      window.addEventListener('keydown', dataBrainHandleKeyDown);
      window.addEventListener('keyup', dataBrainHandleKeyUp);
    }

    return () => {
      window.removeEventListener('keydown', dataBrainHandleKeyDown);
      window.removeEventListener('keyup', dataBrainHandleKeyUp);
    };
  }, []);

  const isSingleValueNull = useMemo(() => {
    let isNull = false;
    if (dataDb?.length) {
      const key = chartSettings.singleValue as string;
      isNull =
        dataDb[0][key] === null && chartSettings.chartType === 'singleValue';
    }
    return isNull;
  }, [
    dataDb?.length,
    chartSettings.singleValue,
    chartSettings.chartType === 'singleValue',
  ]);
  const legendData = useMemo(() => {
    return getLegendData({
      chartOptions: chartSettings,
      data: dataDb || [],
    });
  }, [
    dataDb,
    chartSettings.xAxis,
    chartSettings.yAxisList,
    chartSettings.dynamicXAxis?.isEnabled,
    chartSettings.chartType,
    chartSettings.seriesField,
    chartSettings.customSettings?.cumulativeBar,
    chartSettings.isGroupXAxis,
    chartSettings.timeSeriesSettings?.seriesType[0],
    chartSettings.timeSeriesSettings?.groupBySettings.fillXAxis,
  ]);
  return {
    onDrillLevelClick,
    onDrillDown,
    handleChartClick,
    dataDb,
    getUnderlyingData,
    onChangeFilterValue,
    isShowChartPopup,
    setShowChartPopup,
    columnName,
    chartParams,
    isQueryLoading: isQueryLoading || isLoading,
    setLoading,
    isSingleValueNull,
    dynamicOptions,
    chartSettings,
    setChartSettings,
    isEnableZoom,
    filterValues,
    containerRef,
    // groupedData,
    drilledLevel: drillFilters.length,
    dimensions:
      metric?.datasetMetricSettings?.selectedDimensions?.map((value: any) =>
        getGroupByString(value || 'none')
      ) || [],
    rlsConditions,
    setTableLimit,
    isEnableNextBtn: totalTableRecords > tableLimit?.limit + tableLimit?.offset,
    isEnablePrevBtn: tableLimit?.offset !== 0,
    paginationInfo: {
      limit: tableLimit?.limit,
      offset: tableLimit?.offset,
      totalRecords: totalTableRecords,
    },
    onChangePage: (isPrev: boolean, resetValue: number) => {
      if (resetValue) {
        setTableLimit({
          limit: resetValue,
          offset: 0,
        });
      } else {
        setTableLimit((prev) => ({
          limit: prev.limit,
          offset: !isPrev
            ? prev.offset + prev.limit
            : prev.offset > prev.limit
            ? prev.offset - prev.limit
            : 0,
        }));
      }
    },
    isExternalChart:
      chartSettings?.tableSettings?.isServerSidePagination &&
      chartSettings?.chartType === CHART_TYPES.table,
    isEnablePivotTable,
    groupByList,
    hasNumberKeys: true,
    isEnableGauge: true,
    updateFilter: (filter: RlsCondition) => {
      setRlsConditions((prev) =>
        prev.map((prevFilter) =>
          prevFilter.name === filter.name &&
          prevFilter.datatype === filter.datatype &&
          prevFilter.tableName === filter.tableName &&
          prevFilter.columnName === filter.columnName
            ? { ...prevFilter, isAddOnMetrics: !prevFilter.isAddOnMetrics }
            : prevFilter
        )
      );
    },
    metricFilters,
    leftPositionedMetricFilters,
    rightPositionedMetricFilters,
    drillFilters,
    drillType: metric?.drillDownSettings?.drillType,
    tableResultsDownloadData,
    appliedMetricFilters,
    pivotHeaderOptions,
    pivotDrillState,
    onDrillPivotTable,
    legendData,
    timeseriesDimension: (metric?.datasetMetricSettings as any)
      ?.newDatasetSettings?.selectedDims?.[0]?.name,
    isPythonMode,
  };
};
