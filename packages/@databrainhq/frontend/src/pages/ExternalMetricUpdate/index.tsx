export {};
// /* eslint-disable max-params */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unnecessary-condition */
// /* eslint-disable no-nested-ternary */
// /* eslint-disable no-param-reassign */

// import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
// import { Ui, types, helpers, hooks, consts } from '@databrainhq/plugin';
// import {
//   useCompanyIntegrationQuery,
//   useCustomSqlColumnsQuery,
//   useExternalMetricQuery,
//   useForecastMutation,
//   useSqlQueryMutation,
// } from 'utils/generated/graphql';
// import { Link, useParams } from 'react-router-dom';
// import {
//   ChartActions,
//   DatasetSettings,
//   DateOptionType,
//   MetricsValue,
// } from 'types';

// import { DrillDownSettings } from 'types/metric';
// import {
//   DATABASE_NAME,
//   DEFAULT_CLICK_ACTION_CONFIG,
//   SOMETHING_WENT_WRONG,
// } from 'consts/values';
// import {
//   BIGQUERY,
//   DATABASE,
//   ELASTICSEARCH,
//   MYSQL,
//   REDSHIFT,
//   TABLE,
//   POSTGRES,
//   DATABRICKS,
//   CLICKHOUSE,
// } from 'consts/application';
// import MetricCreateHeader from 'components/MetricComponents/MetricCreateHeader';
// import SchemaSidebar from 'components/MetricComponents/SchemaSideBar';
// import MetricQueryBar from 'components/MetricComponents/MetricQueryBar';
// import OutputTab from 'components/MetricComponents/OutputTab';
// import { ClientType } from 'components/ClientDropDown';
// import ExternalMetricForm from 'components/ExternalMetricForm';
// import usePreviewTableData from 'hooks/usePreviewTableData';
// import useExternalMetric from 'hooks/useExternalMetric';
// import { DashboardType } from 'hooks/useMetric';
// import useTenancyLevel from 'hooks/useTenancyLevel';
// import useWorkspace from 'hooks/useWorkspace';
// import useDrill from 'hooks/useDrill';
// import useFetchTotalRecordsCount from 'hooks/useFetchTotalRecordsCount';
// import useGenerateExternalMetricQuery from 'hooks/useGenerateExternalMetricQuery';
// import useCompanySchema from 'hooks/useCompanySchema';
// // import useMetricVersions from 'hooks/useMetricVersions';
// import { getCurrentUser } from 'helpers/application/auth';
// import getSchemaString from 'helpers/application/getSchemaString';
// import getSelectedSchemaList from 'helpers/application/getSelectedSchemaList';
// import getLimitSqlQuery from 'helpers/application/getLimitSqlQuery';
// import { getTimeGroupData } from 'helpers/application/getTimeFilteredData';
// import getCustomSqlStatement, {
//   replaceVariable,
// } from 'helpers/application/getCustomSqlStatement';
// import styles from './externalmetricupdate.module.css';

// export type CompanyIntegration =
//   | {
//       id: string;
//       name: string;
//     }
//   | undefined;

// const ExternalMetricUpdate = () => {
//   const user = getCurrentUser();
//   const { id } = useParams();
//   const [isLoadingQueryData, setLoadingQueryData] = useState(true);
//   const [isEnableAutoSave, setEnableAutoSave] = useState(false);
//   const [isModalShow, setModalShow] = useState<boolean>(false);
//   const [isCloneModalShow, setCloneModalShow] = useState<boolean>(false);
//   const [isGenerating, setGenerating] = useState<boolean>(false);
//   const [selectedColumns, setSelectedColumns] = useState<
//     types.SelectedColumns[] | undefined
//   >([]);
//   const [client, setClient] = useState<ClientType>({ label: '', value: '' });

//   const [isLoading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<types.SqlError | undefined>();
//   const [data, setData] = useState<any[]>();
//   const [query, setQuery] = useState<string>('');
//   const [limit, setLimit] = useState('100');
//   const [timeTaken, setTimeTaken] = useState<number>(0.0);
//   const [groupByList, setGroupByList] = useState<any[]>([]);
//   const [isEnablePivotTable, setEnablePivotTable] = useState<boolean>(false);
//   // const [hasNumberKeys, setNumberKeys] = useState<boolean>(false);
//   // const [isEnableGauge, setEnableGauge] = useState<boolean>(false);

//   const [selectedSchemaList, setSelectedSchemaList] =
//     useState<Record<string, types.SelectedColumns[]>>();
//   const [previewTableDataList, setPreviewTableDataList] = useState<any[]>();
//   const [companyIntegration, setCompanyIntegration] =
//     useState<CompanyIntegration>();

//   const [chartSettings, setChartSettings] = useState<types.ChartSettingsType>(
//     consts.DEFAULT_CHART_SETTINGS
//   );
//   const [tableLimit, setTableLimit] = useState({
//     limit: parseInt(chartSettings?.tableSettings?.defaultRowSize || '10', 10),
//     offset: 0,
//   });
//   const [totalTableRecords, setTotalTableRecords] = useState(0);
//   const [timeGrainValue, setTimeGrainValue] = useState<string>('');
//   const [isShowSchemaTab, setShowSchemaTab] = useState<boolean>(true);
//   const [metricQuery, setMetricQuery] = useState<string>();
//   const [outputColumns, setOutputColumns] = useState<string>();
//   const [joinFields, setJoinFields] = useState<types.JoinField[]>([]);
//   const [rlsConditions, setRlsConditions] = useState<types.RlsCondition[]>([]);
//   const [rlsFilters, setRlsFilters] = useState<types.RlsFilterObjectType[]>([]);
//   const [filters, setFilters] = useState<
//     { columnName: string; value: string | number }[]
//   >([]);
//   const [dashboardIds, setDashboardIds] = useState<DashboardType['id'][]>([]);
//   const [timeGroupData, setTimeGroupData] = useState<any[]>();
//   const [datasetSettings, setDatasetSettings] = useState<DatasetSettings>();
//   const [drillDownSettings, setDrillDownSettings] = useState<DrillDownSettings>(
//     {
//       isEnableGroupBy: false,
//       isEnableCrossFilter: false,
//     }
//   );
//   const [clickBehaviourConfigs, setClickBehaviourConfigs] =
//     useState<ChartActions>(DEFAULT_CLICK_ACTION_CONFIG);
//   const { workspace } = useWorkspace();
//   const { schemaList, schemaMap } = useCompanySchema();

//   const {
//     data: companyIntegrationData,
//     isLoading: isCompanyIntegrationLoading,
//     isError: isErrorFetchingCompanyIntegration,
//     isFetched: isFetchedCompanyIntegration,
//   } = useCompanyIntegrationQuery(
//     { workspaceId: workspace?.id },
//     { enabled: !!workspace?.id }
//   );
//   useEffect(() => {
//     const compIntdata = companyIntegrationData?.companyIntegrations[0];
//     if (compIntdata && !companyIntegration)
//       setCompanyIntegration({ id: compIntdata.id, name: compIntdata.name });
//   }, [companyIntegrationData]);
//   const {
//     data: metricData,
//     isLoading: isMetricLoading,
//     isError: isErrorFetchingMetricData,
//     isFetched: isFetchedMetricdata,
//   } = useExternalMetricQuery(
//     {
//       id,
//     },
//     { enabled: !!id }
//   );
//   const metric = useMemo(() => {
//     if (!metricData?.externalMetrics_by_pk) return null;
//     return metricData?.externalMetrics_by_pk;
//   }, [metricData?.externalMetrics_by_pk]);

//   const appliedRlsFilters = useMemo(
//     () =>
//       metric?.externalMetricsRlsFilters?.map(
//         (filter: any) => filter.companyRlsFilter as types.RlsFilterObjectType
//       ),
//     [metric]
//   );

//   useEffect(() => {
//     setRlsFilters(Array.isArray(appliedRlsFilters) ? appliedRlsFilters : []);
//   }, [appliedRlsFilters]);

//   const rlsFilterValues = useMemo(
//     () =>
//       rlsFilters.reduce((values: Record<string, string>, filter) => {
//         const variableName = `${filter.name}_variable`;
//         values[variableName] = (filter.defaultValue || filter.value) as string;
//         return values;
//       }, {}),
//     [rlsFilters]
//   );

//   const {
//     updateExternalMetric,
//     createExternalMetric,
//     setMetricVersions,
//     error: saveError,
//     isLoading: isSaving,
//   } = useExternalMetric({
//     id,
//     query: getLimitSqlQuery(query, limit),
//     companyIntegrationId: companyIntegration?.id,
//     integrationName: companyIntegration?.name,
//     metricQuery,
//     outputColumns,
//     selectedColumns,
//     timeGrain: timeGrainValue,
//     dashboardIds,
//     isEnableGroupBy: false,
//     groupBy: undefined,
//     selectedGroupBy: [],
//     joinFields,
//     rlsConditions,
//     rlsFilters,
//     datasetMetricSettings: datasetSettings,
//     chartSettings,
//     limit: Number(limit),
//     drillDownSettings,
//   });

//   useEffect(() => {
//     if (metric) {
//       setDashboardIds(
//         metric?.externalDashboardMetrics?.map(
//           (extDashboard) => extDashboard.externalDashboardId
//         ) ?? []
//       );
//       setQuery(metric?.query || '');
//       setMetricQuery(metric?.metricQuery as string);
//       setOutputColumns(metric?.outputColumns as string);
//       setSelectedColumns(
//         Array.isArray(metric?.inputFields) ? metric?.inputFields : []
//       );
//       setTimeGrainValue(metric?.timeGrain || '');
//       setJoinFields(metric?.joinFields);
//       setRlsConditions(metric?.rlsConditions || []);
//       setClickBehaviourConfigs(
//         metric?.clickActions || DEFAULT_CLICK_ACTION_CONFIG
//       );
//       setDatasetSettings(metric?.datasetMetricSettings);
//       setDrillDownSettings({
//         isEnableGroupBy: !!metric?.drillDownSettings?.isEnableGroupBy,
//         drilldownChartSettings: metric?.drillDownSettings?.isEnableGroupBy
//           ? metric?.drillDownSettings?.drilldownChartSettings
//           : [],
//         isEnableCrossFilter: !!metric?.drillDownSettings?.isEnableCrossFilter,
//       });
//       setChartSettings(metric?.chartOptions);
//       setLimit(`${metric?.limit || 100}`);
//       setTableLimit({
//         limit: parseInt(
//           metric?.chartOptions?.tableSettings?.defaultRowSize || '10',
//           10
//         ),
//         offset: 0,
//       });
//       setMetricVersions((prev) => ({
//         ...prev,
//         id: metric.id,
//         current: metric.currentVersion,
//         latest:
//           metric.id === prev.id && prev.latest > metric.latestVersion
//             ? prev.latest
//             : metric.latestVersion,
//       }));
//     } else {
//       setMetricVersions({
//         id: '',
//         current: 1,
//         latest: 1,
//         versions: [],
//       });
//     }
//   }, [metric]);

//   const databaseName = useMemo(
//     () =>
//       companyIntegration?.name?.toLowerCase() === REDSHIFT ||
//       companyIntegration?.name?.toLowerCase() === POSTGRES
//         ? 'postgresql'
//         : companyIntegration?.name?.toLowerCase() === MYSQL ||
//           companyIntegration?.name?.toLowerCase() === CLICKHOUSE
//         ? 'mysql'
//         : companyIntegration?.name?.toLowerCase() === BIGQUERY ||
//           companyIntegration?.name?.toLowerCase() === DATABRICKS
//         ? 'bigquery'
//         : '',
//     [companyIntegration?.name]
//   );
//   const isServerSidePagination = useMemo(
//     () =>
//       chartSettings?.tableSettings?.isServerSidePagination &&
//       chartSettings?.chartType === consts.CHART_TYPES.table,
//     [chartSettings]
//   );
//   useEffect(() => {
//     if (isServerSidePagination)
//       setTableLimit({
//         limit: parseInt(
//           chartSettings?.tableSettings?.defaultRowSize || '10',
//           10
//         ),
//         offset: 0,
//       });
//   }, [isServerSidePagination, chartSettings?.tableSettings?.defaultRowSize]);
//   useEffect(() => {
//     const value = getSelectedSchemaList(
//       selectedColumns,
//       companyIntegration?.name
//     );
//     setSelectedSchemaList(value ?? {});
//   }, [selectedColumns]);
//   const isShowTimeGroupData = useMemo(
//     () =>
//       !!rlsConditions.length &&
//       rlsConditions?.find((filter) => filter.isAddOnMetrics)?.datatype ===
//         'date' &&
//       rlsConditions?.find((filter) => filter.isAddOnMetrics)?.columnName ===
//         chartSettings.xAxis &&
//       (
//         rlsConditions.find((filter) => filter.isAddOnMetrics)
//           ?.options as types.DateOptionType[]
//       )?.every((option) => option.format),
//     [rlsConditions, chartSettings]
//   );
//   const { companyTenancyType } = useTenancyLevel();
//   const {
//     data: customSqlColumnsData,
//     isError: isErrorFetchingCustomSqlColumns,
//     isFetched: isFetchedCustomColumns,
//   } = useCustomSqlColumnsQuery(
//     { companyIntegrationId: companyIntegration?.id },
//     { enabled: !!companyIntegration?.id }
//   );
//   const customSqlColumns = useMemo(
//     () =>
//       customSqlColumnsData?.customSqlColumns?.map((d) => ({
//         tableName: d.tableName,
//         list: d.sqlColumns as MetricsValue[],
//       })),
//     [customSqlColumnsData]
//   );
//   const getGroupByString = (name: string) => {
//     if (name.includes('____')) {
//       return name.split('____')[1];
//     }
//     return name;
//   };
//   const activeDrillLevel = useMemo(
//     () =>
//       getGroupByString(
//         datasetSettings?.selectedDimensions?.[
//           filters.length < datasetSettings?.selectedDimensions?.length
//             ? filters.length
//             : 0
//         ] || ''
//       ),
//     [datasetSettings, filters]
//   );
//   const schema = getSchemaString(
//     selectedSchemaList,
//     companyIntegration?.name,
//     companyTenancyType
//   );
//   const sqlQueryMutation = useSqlQueryMutation();
//   const { mutate: forecast } = useForecastMutation();
//   const executeSqlQuery = (
//     sqlQuery: string,
//     paginatedLimit?: string,
//     offset?: string
//   ) => {
//     if (companyIntegration) {
//       setLoading(true);
//       setError(undefined);
//       setData([]);
//       const modefiedQuery = getCustomSqlStatement({
//         dbName: companyIntegration?.name || '',
//         query: sqlQuery,
//         rlsConditions:
//           companyIntegration?.name === ELASTICSEARCH
//             ? []
//             : rlsConditions.filter((filter) => filter.isAddOnMetrics),
//         tenancyLevel: companyTenancyType || TABLE,
//         clientId: client?.value,
//         values: rlsFilterValues,
//         limit: paginatedLimit || limit,
//         offset,
//       });
//       sqlQueryMutation.mutate(
//         {
//           dbName: companyIntegration.name,
//           id: companyIntegration.id,
//           query: modefiedQuery,
//           filters: rlsConditions
//             .filter((r) => r.isAddOnMetrics)
//             .map((filter) => ({
//               columnName: filter.columnName,
//               value: filter.value || filter.options[0],
//             })),
//         },
//         {
//           onSuccess: (res) => {
//             setLoading(true);
//             const metaData = res?.sqlQuery?.metaData;
//             const responseData = res?.sqlQuery?.data
//               ? JSON.parse(res?.sqlQuery?.data)
//               : [];
//             setGroupByList(metaData?.groupbyColumnList || []);
//             if (setTimeTaken) setTimeTaken(res?.sqlQuery?.timeTaken || 0);
//             if (
//               responseData.message ||
//               responseData.code ||
//               responseData.errorObj
//             ) {
//               setError(responseData.errorObj);
//               setData([]);
//               setLoading(false);
//             } else {
//               const outputDataArray = Array.isArray(responseData)
//                 ? responseData
//                 : [];
//               if (datasetSettings?.forecast?.isEnable) {
//                 const {
//                   measureColumnName,
//                   modelName,
//                   confidenceInterval,
//                   dailySeasonality,
//                   forecastPeriods,
//                   growth,
//                   orderD,
//                   orderP,
//                   orderQ,
//                   timeColumnName,
//                   timeGrain,
//                   trend,
//                   weeklySeasonality,
//                   yearlySeasonality,
//                 } = datasetSettings.forecast;

//                 forecast(
//                   {
//                     inputData: {
//                       time_series_data: outputDataArray,
//                       forecast_periods: forecastPeriods,
//                       time_column_name: timeColumnName,
//                       measure_column_name: measureColumnName,
//                       time_grain: timeGrain,
//                       confidence_interval: confidenceInterval,
//                       yearly_seasonality: yearlySeasonality,
//                       weekly_seasonality: weeklySeasonality,
//                       daily_seasonality: dailySeasonality,
//                       order_p: orderP,
//                       order_d: orderD,
//                       order_q: orderQ,
//                       trend: trend.value,
//                       growth,
//                       model_name: modelName,
//                     },
//                   },
//                   {
//                     onSuccess({ forecast: forecastResponse }) {
//                       if (forecastResponse?.forecastData?.error) {
//                         setError({
//                           errorMessage: forecastResponse.forecastData.error,
//                           explanation: '',
//                           solution: '',
//                         });
//                         setData([]);
//                         setLoading(false);
//                       } else {
//                         const forecastData = Array.isArray(
//                           forecastResponse?.forecastData?.forecast
//                         )
//                           ? forecastResponse?.forecastData?.forecast
//                           : [];
//                         setData(forecastData);
//                         setError(undefined);
//                         setLoading(false);
//                       }
//                     },
//                     onError: () => {
//                       setError({
//                         errorMessage: SOMETHING_WENT_WRONG,
//                         explanation: '',
//                         solution: '',
//                       });
//                       setLoading(false);
//                     },
//                   }
//                 );
//               } else {
//                 setData(outputDataArray);
//                 setError(undefined);
//                 setLoading(false);
//               }
//             }
//           },
//           onError: () => {
//             setError({
//               errorMessage: SOMETHING_WENT_WRONG,
//               explanation: '',
//               solution: '',
//             });
//             setLoading(false);
//           },
//         }
//       );
//     }
//   };
//   const { fetchTotalRecordsCount } = useFetchTotalRecordsCount();
//   const { generateExternalQuery } = useGenerateExternalMetricQuery({
//     schema,
//     setError,
//     setLoading,
//     setData,
//     executeSqlQuery,
//     setGenerating,
//     setQuery,
//     setMetricQuery,
//     setOutputColumns,
//     rlsConditions: [],
//     dbName: companyIntegration?.name as string,
//     setJoinFields,
//     tenancyLevel: companyTenancyType as string,
//     filters: rlsFilters.map((filter) => ({
//       tableName: filter.tableName,
//       columnName: filter.columnName,
//       condition: filter.condition,
//       name: filter.name,
//       operator: filter.operator || 'and',
//     })),
//     setFilters,
//   });
//   const { getPreviewTableData } = usePreviewTableData();

//   useEffect(() => {
//     if (selectedSchemaList && companyIntegration) {
//       getPreviewTableData({
//         dbName: companyIntegration.name,
//         destinationId: companyIntegration.id,
//         selectedSchemaList,
//         setPreviewTableDataList,
//       });
//     }
//   }, [selectedSchemaList, companyIntegration]);

//   useEffect(() => {
//     if (isShowTimeGroupData) {
//       const timeFilter = rlsConditions.find((filter) => filter.isAddOnMetrics);
//       if (timeFilter) {
//         const timeData = getTimeGroupData({
//           data: data || [],
//           dimensionColumn: timeFilter.columnName,
//           measureColumn: chartSettings.yAxisList?.[0] || '',
//           option: (timeFilter.options as types.DateOptionType[]).find(
//             (option) => option.name === timeFilter.value
//           ) as DateOptionType,
//           timeColumn: chartSettings.xAxis || timeFilter.columnName,
//         });
//         setTimeGroupData(timeData);
//       }
//     }
//   }, [data, rlsConditions, isShowTimeGroupData]);

//   const { onDrillDown, onDrillUp } = useDrill();

//   useEffect(() => {
//     if (companyTenancyType === DATABASE) {
//       setSelectedColumns((prev) =>
//         prev?.map((c) => ({ ...c, schemaName: client.value }))
//       );
//       setRlsConditions((prev) =>
//         prev.map((c) => ({
//           ...c,
//           tableName: `${client.value}.${c.tableName
//             .split('.')
//             .slice(1)
//             .join('.')}`,
//         }))
//       );
//     }
//   }, [client.value]);
//   useEffect(() => {
//     if (query) {
//       if (drillDownSettings?.isEnableGroupBy) {
//         onDrillDown({
//           baseQuery: replaceVariable({
//             query,
//             rlsConditions,
//             tenancyLevel: companyTenancyType,
//             clientId: client?.value,
//             values: rlsFilterValues,
//           }),
//           columnName: '',
//           database: databaseName,
//           onDrillStart: () => {
//             setLoading(true);
//             setError(undefined);
//             setData([]);
//           },
//           onError: (drillError) => {
//             setLoading(false);
//             setError({
//               errorMessage: drillError,
//               explanation: '',
//               solution: '',
//             });
//           },
//           onSuccess: (drillQuery) => {
//             executeSqlQuery(
//               drillQuery,
//               isServerSidePagination ? `${tableLimit?.limit}` : undefined,
//               isServerSidePagination ? `${tableLimit?.offset}` : undefined
//             );
//           },
//           params: undefined,
//           selectedDimensions: datasetSettings?.selectedDimensions || [],
//           filters: [],
//           setFilters,
//         });
//       } else {
//         executeSqlQuery(
//           query,
//           isServerSidePagination ? `${tableLimit?.limit}` : undefined,
//           isServerSidePagination ? `${tableLimit?.offset}` : undefined
//         );
//       }
//     }
//   }, [
//     rlsFilterValues,
//     timeGrainValue,
//     tableLimit,
//     isServerSidePagination,
//     client.value,
//     rlsConditions,
//   ]);

//   useEffect(() => {
//     if (data?.length && drillDownSettings?.isEnableGroupBy) {
//       if (drillDownSettings?.isEnableGroupBy) {
//         const currentLevelChartSettings =
//           drillDownSettings?.drilldownChartSettings?.find(
//             (settings) => settings.name === activeDrillLevel
//           )?.chartSettings;
//         if (
//           currentLevelChartSettings &&
//           datasetSettings?.selectedDimensions?.length &&
//           datasetSettings?.selectedDimensions?.length > filters?.length
//         ) {
//           setChartSettings(currentLevelChartSettings);
//         } else {
//           setChartSettings((prev) => ({
//             ...prev,
//             xAxis: getGroupByString(
//               datasetSettings?.selectedDimensions[
//                 filters.length < datasetSettings?.selectedDimensions?.length
//                   ? filters.length
//                   : 0
//               ] || 'none'
//             ),
//             yAxisList: datasetSettings?.metrics?.map((value) =>
//               value.as?.replace(/["`]+/g, '')
//             ),
//             chartType:
//               datasetSettings?.selectedDimensions?.length === filters?.length
//                 ? 'table'
//                 : metric?.chartOptions.chartType,
//           }));
//         }
//       }
//     }
//   }, [data, activeDrillLevel, metric?.chartOptions.chartType]);
//   const [isShowChartPopup, setShowChartPopup] = useState(false);
//   const [chartParams, setChartParams] = useState<any>();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const handleChartRightClick = (params: any) => {
//     params?.event?.event?.preventDefault();
//     if (isShowTimeGroupData) {
//       return;
//     }
//     setChartParams(params);
//     setShowChartPopup(true);
//   };
//   const { getUnderlyingData } = hooks.useUnderlyingData({
//     clientName: client.value,
//     tenancyType: companyTenancyType,
//     values: rlsFilterValues,
//     companyId: user?.companyId || '',
//     query,
//     workspaceId: workspace?.id,
//     metricId: metric?.id,
//   });
//   const columnName = useMemo(
//     () =>
//       Array.isArray(data) && data?.length && chartParams?.name
//         ? data
//             .map((obj) => {
//               const entry = Object.entries(obj).find(
//                 ([, value]) => value === chartParams.name
//               );
//               return entry?.[0];
//             })
//             .filter((value) => value)[0]
//         : '',
//     [data, chartParams?.name]
//   );

//   const onChangeFilterValue = (
//     name: string,
//     value: string,
//     customValue?: Record<string, Date>,
//     stringValues?: types.FloatingDropDownOption[]
//   ) => {
//     if (customValue) {
//       setRlsConditions((prev) =>
//         prev.map((rls) =>
//           rls.name === name
//             ? {
//                 ...rls,
//                 value,
//                 options: (rls.options as DateOptionType[]).map((option) =>
//                   option.name === 'Custom'
//                     ? { ...option, ...customValue }
//                     : option
//                 ),
//                 selectedVariableValue: {
//                   value,
//                   label: value,
//                   endDate: customValue.endDate,
//                   startDate: customValue.startDate,
//                 },
//               }
//             : rls
//         )
//       );
//     } else if (stringValues) {
//       setRlsConditions((prev) =>
//         prev.map((rls) =>
//           rls.name === name
//             ? { ...rls, value: stringValues.map((v) => v.value) }
//             : rls
//         )
//       );
//     } else {
//       setRlsConditions((prev) =>
//         prev.map((rls) =>
//           rls.name === name
//             ? {
//                 ...rls,
//                 value,
//                 selectedVariableValue: { value, label: value },
//               }
//             : rls
//         )
//       );
//     }
//   };
//   useEffect(() => {
//     if (chartSettings.chartType !== consts.CHART_TYPES.timeSeries) {
//       setChartSettings((prev) => ({
//         ...prev,
//         timeSeriesSettings: {
//           groupBySettings: {
//             isDynamic: false,
//             options: [],
//             value: 'monthly',
//             fillXAxis: false,
//           },
//           seriesType:
//             prev.yAxisList?.map((column) => ({ column, type: 'bar' })) || [],
//         },
//       }));
//     }
//   }, [chartSettings.chartType]);
//   useEffect(() => {
//     if (
//       (isErrorFetchingMetricData || isFetchedMetricdata) &&
//       (isErrorFetchingCompanyIntegration || isFetchedCompanyIntegration) &&
//       (isErrorFetchingCustomSqlColumns || isFetchedCustomColumns)
//     ) {
//       setLoadingQueryData(false);
//     }
//   }, [
//     isErrorFetchingMetricData,
//     isFetchedMetricdata,
//     isErrorFetchingCompanyIntegration,
//     isFetchedCompanyIntegration,
//     isErrorFetchingCustomSqlColumns,
//     isFetchedCustomColumns,
//   ]);
//   useEffect(() => {
//     setFilters([]);
//     if (
//       datasetSettings?.selectedDimensions &&
//       datasetSettings?.selectedDimensions?.length < 2
//     ) {
//       setDrillDownSettings({
//         isEnableGroupBy: false,
//         isEnableCrossFilter: false,
//       });
//     }
//   }, [datasetSettings?.selectedDimensions]);

//   useEffect(() => {
//     if (isServerSidePagination) {
//       if (query) {
//         const replacedClient =
//           companyTenancyType === DATABASE
//             ? query.replace(new RegExp(DATABASE_NAME, 'g'), client.value)
//             : query;
//         const modifiedQuery = rlsConditions.filter(
//           (filter) => filter.isAddOnMetrics
//         )?.length
//           ? helpers.getModifiedQuery({
//               rlsConditions,
//               query: replacedClient,
//               dbName: companyIntegration?.name?.toLowerCase() as string,
//             })
//           : replacedClient;
//         fetchTotalRecordsCount({
//           dbName: companyIntegration?.name,
//           destinationId: companyIntegration?.id,
//           queryValue: modifiedQuery,
//           clientName: client.value,
//           values: rlsFilterValues,
//           filters: rlsConditions
//             .filter((r) => r.isAddOnMetrics)
//             .map((filter) => ({
//               columnName: filter.columnName,
//               value: filter.value || filter.options[0],
//             })),
//           limit: '1',
//           setTotalTableRecords,
//         });
//       }
//     }
//   }, [
//     chartSettings,
//     rlsConditions,
//     client.value,
//     rlsFilterValues,
//     isServerSidePagination,
//   ]);

//   useEffect(() => {
//     if (data?.length && groupByList.length) {
//       setEnablePivotTable(true);
//     } else {
//       setEnablePivotTable(false);
//     }
//   }, [data, groupByList.length, query]);

//   const drillDownFunc = (params: any) =>
//     onDrillDown({
//       baseQuery: replaceVariable({
//         query,
//         rlsConditions,
//         tenancyLevel: companyTenancyType,
//         clientId: client?.value,
//         values: rlsFilterValues,
//       }),
//       columnName: getGroupByString(
//         datasetSettings?.selectedDimensions?.[filters.length] || ''
//       ),
//       database: databaseName,
//       onDrillStart: () => {
//         setLoading(true);
//         setError(undefined);
//         setData([]);
//       },
//       onError: (drillError) => {
//         setLoading(false);
//         setError({
//           errorMessage: drillError,
//           explanation: '',
//           solution: '',
//         });
//       },
//       onSuccess: (drillQuery) => {
//         executeSqlQuery(
//           drillQuery,
//           isServerSidePagination ? `${tableLimit?.limit}` : undefined,
//           isServerSidePagination ? `${tableLimit?.offset}` : undefined
//         );
//       },
//       params,
//       selectedDimensions: datasetSettings?.selectedDimensions || [],
//       filters,
//       setFilters,
//     });
//   const onDrillLevelClick = useCallback(
//     (index: number) => {
//       onDrillUp({
//         index,
//         baseQuery: replaceVariable({
//           query,
//           rlsConditions,
//           tenancyLevel: companyTenancyType,
//           clientId: client?.value,
//           values: rlsFilterValues,
//         }),
//         database: databaseName,
//         onDrillStart: () => {
//           setLoading(true);
//           setError(undefined);
//           setData([]);
//         },
//         onError: (drillError) => {
//           setLoading(false);
//           setError({
//             errorMessage: drillError,
//             explanation: '',
//             solution: '',
//           });
//         },
//         onSuccess: (drillQuery) => {
//           executeSqlQuery(
//             drillQuery,
//             isServerSidePagination ? `${tableLimit?.limit}` : undefined,
//             isServerSidePagination ? `${tableLimit?.offset}` : undefined
//           );
//         },
//         filters,
//         setFilters,
//       });
//     },
//     [filters]
//   );
//   useEffect(() => {
//     if (!isEnableAutoSave || !query || !metric?.name || !metric?.metricId)
//       return;
//     updateExternalMetric(
//       {
//         name: metric?.name,
//         description: metric?.description,
//         metricId: metric?.metricId,
//         about: 'Changes auto saved.',
//       },
//       true
//     );
//   }, [
//     datasetSettings,
//     rlsConditions,
//     rlsFilters,
//     outputColumns,
//     drillDownSettings,
//     joinFields,
//     timeGrainValue,
//     metricQuery,
//     selectedColumns,
//     limit,
//     query,
//     isEnableAutoSave,
//   ]);
//   useEffect(() => {
//     if (
//       drillDownSettings?.isEnableGroupBy &&
//       activeDrillLevel &&
//       datasetSettings?.selectedDimensions &&
//       datasetSettings?.selectedDimensions?.length > filters?.length
//     ) {
//       setDrillDownSettings((prev) => ({
//         ...prev,
//         drilldownChartSettings: [
//           ...(prev.drilldownChartSettings?.filter(
//             (prevSet) => prevSet.name !== activeDrillLevel
//           ) || []),
//           { name: activeDrillLevel, chartSettings },
//         ],
//       }));
//     }
//   }, [chartSettings]);
//   return (
//     <div className={styles['main-container']}>
//       <MetricCreateHeader
//         tableDropDownProps={{
//           onChange: () => {},
//           options: [],
//           selectedOption: { value: '', label: '' },
//         }}
//         isDisableBtn={
//           !chartSettings.measure?.length &&
//           !chartSettings.yAxisList?.filter((item) => item)?.length &&
//           !chartSettings.singleValue
//         }
//         metricName={metric?.name}
//         metricId={metric?.metricId}
//         setModalShow={setModalShow}
//         mainBtnText="Save to Dashboard"
//         backBtnText="Back to Dashboard"
//         setCloneModalShow={setCloneModalShow}
//         client={client}
//         setClient={setClient}
//         autoSave={{
//           isSaving,
//           isEnabled: isEnableAutoSave,
//         }}
//         setEnableAutoSave={setEnableAutoSave}
//         companyTenancyType={companyTenancyType}
//         setClickBehaviourConfigs={setClickBehaviourConfigs}
//         clickBehaviourConfigs={clickBehaviourConfigs}
//         id={metric?.id}
//         dataSecuritySettingsValue={{
//           csvColumns: metric?.dataSecuritySettings?.csvColumns || [],
//           underlyingColumns:
//             metric?.dataSecuritySettings?.underlyingColumns || [],
//           id: metric?.id || '',
//           selectedColumns,
//         }}
//       />
//       {isLoadingQueryData || isMetricLoading ? (
//         <div className={styles['loader-container']}>{/* loading icon */}</div>
//       ) : null}
//       {!companyIntegration &&
//         !isCompanyIntegrationLoading &&
//         !isLoadingQueryData && (
//           <div className={styles['alt-container']}>
//             <div className={styles['alt-wrapper']}>
//               <Ui.Text variant="heading">
//                 No Datawarehouse connected yet
//               </Ui.Text>
//               <Link to="/onboarding">
//                 <Ui.Button type="button" variant="primary">
//                   Connect
//                 </Ui.Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       {!!companyIntegration &&
//         !isCompanyIntegrationLoading &&
//         !isLoadingQueryData && (
//           <div className={styles['main-wrapper']}>
//             <Ui.Modal
//               isOpen={isModalShow}
//               onClose={() => setModalShow(false)}
//               headerTitle="Save To Dashboard"
//             >
//               <ExternalMetricForm
//                 defaultValues={{
//                   name: metric?.name,
//                   description: metric?.description,
//                   metricId: metric?.metricId,
//                   isLive: metric?.isLive,
//                   about: '',
//                 }}
//                 onSubmit={updateExternalMetric}
//                 onCancel={() => setModalShow(false)}
//                 dashboardIds={dashboardIds}
//                 onDashboardChange={setDashboardIds}
//                 error={saveError}
//                 isSaving={isSaving}
//               />
//             </Ui.Modal>
//             <Ui.Modal
//               isOpen={isCloneModalShow}
//               onClose={() => setCloneModalShow(false)}
//               headerTitle="Clone To Dashboard"
//             >
//               <ExternalMetricForm
//                 defaultValues={{
//                   name: `Copy ${metric?.name}`,
//                   description: metric?.description,
//                   metricId: `copy_${metric?.metricId}`,
//                   isLive: metric?.isLive,
//                 }}
//                 onSubmit={createExternalMetric}
//                 onCancel={() => setCloneModalShow(false)}
//                 dashboardIds={dashboardIds}
//                 onDashboardChange={setDashboardIds}
//                 error={saveError}
//               />
//             </Ui.Modal>
//             <div
//               className={`${
//                 isShowSchemaTab ? 'dbn-w-1/2' : 'dbn-w-1/4'
//               } dbn-flex`}
//             >
//               <div
//                 className={`${
//                   isShowSchemaTab ? 'dbn-w-1/2' : 'dbn-w-4'
//                 } dbn-border-r dbn-divide-solid dbn-relative`}
//               >
//                 {isShowSchemaTab && (
//                   <SchemaSidebar
//                     setSelectedColumns={setSelectedColumns}
//                     selectedColumns={selectedColumns}
//                     selectedDatabase={
//                       companyTenancyType === TABLE ? undefined : client.value
//                     }
//                     dbName={companyIntegration?.name}
//                     schemaList={schemaList}
//                     schemaMap={schemaMap}
//                   />
//                 )}
//                 <div
//                   className={`${styles.collapseButton} dbn-bg-gray-300 ${
//                     isShowSchemaTab ? '' : 'dbn-rotate-180'
//                   }`}
//                 >
//                   <Ui.Button
//                     type="button"
//                     variant="tertiary"
//                     onClick={() => setShowSchemaTab(!isShowSchemaTab)}
//                   >
//                     <Ui.Icons name="not-found" />
//                     {/* collapse left */}
//                   </Ui.Button>
//                 </div>
//               </div>
//               <div
//                 className={`${
//                   isShowSchemaTab ? 'dbn-w-1/2' : 'dbn-w-full'
//                 } dbn-border-r dbn-divide-solid`}
//               >
//                 <MetricQueryBar
//                   selectedSchemaList={selectedSchemaList}
//                   isLoading={isGenerating}
//                   onSubmit={generateExternalQuery}
//                   isDisable={!schema.length}
//                   client={client}
//                   setClient={setClient}
//                   metricQuery={metricQuery}
//                   outputColumns={outputColumns}
//                   timeGrainValue={timeGrainValue}
//                   setTimeGrainValue={setTimeGrainValue}
//                   companyId={user?.companyId as string}
//                   setData={setData}
//                   setLoading={setLoading}
//                   setError={setError}
//                   setQuery={setQuery}
//                   database={companyIntegration?.name as string}
//                   joinColumnList={selectedColumns?.map((c) => ({
//                     value: `${c.schemaName}.${c.tableName}.${c.column}`,
//                     label: `${c.schemaName}.${c.tableName}.${c.column}`,
//                   }))}
//                   joinFields={joinFields}
//                   rlsConditions={rlsConditions}
//                   setRlsConditions={setRlsConditions}
//                   rlsFilters={rlsFilters}
//                   setRlsFilters={setRlsFilters}
//                   chartSettings={chartSettings}
//                   datasetMetricConfig={{
//                     clientId: client?.value,
//                     selectedColumns: selectedColumns || [],
//                     setDrillDown: setDrillDownSettings,
//                     companyIntegrationId: companyIntegration?.id || '',
//                     customSqlColumns,
//                     setChartSettings,
//                     workspaceId: workspace?.id || '',
//                     datasetSettings,
//                     setGroupByList,
//                     drillDownSettings,
//                     chartSettings,
//                     dbName: companyIntegration?.name || '',
//                     selectedSchemaList,
//                     appliedRlsFilters: rlsFilters.map((filter) => ({
//                       tableName: filter.tableName,
//                       columnName: filter.columnName,
//                       condition: filter.condition,
//                       name: filter.name,
//                       operator: filter.operator || 'and',
//                     })),
//                     tenancy: companyTenancyType || '',
//                     limit,
//                     setData,
//                     setError,
//                     setLoading,
//                     setQuery,
//                     setTimeTaken,
//                     setDatasetSettings,
//                     rlsFilters,
//                     setRlsFilters,
//                     metricFilters: rlsConditions,
//                     setMetricFilters: setRlsConditions,
//                     rlsValues: rlsFilterValues,
//                   }}
//                 />
//               </div>
//             </div>
//             <div
//               className={isShowSchemaTab ? 'dbn-w-1/2' : 'dbn-w-3/4'}
//               ref={containerRef}
//             >
//               <OutputTab
//                 isShowManageColumnPanel={false}
//                 data={isShowTimeGroupData ? timeGroupData : data}
//                 dimensions={
//                   datasetSettings?.selectedDimensions?.map((value) =>
//                     getGroupByString(value || 'none')
//                   ) || []
//                 }
//                 onRunSqlQuery={() => {}}
//                 drillLevel={filters.length || 0}
//                 isEnablePivotTable={isEnablePivotTable}
//                 groupbyList={groupByList}
//                 isEnableGroupBy={drillDownSettings?.isEnableGroupBy || false}
//                 hasNumberKeys
//                 isEnableGauge
//                 chartSettings={chartSettings}
//                 setChartSettings={setChartSettings}
//                 query={query}
//                 error={error}
//                 isLoading={isLoading}
//                 setQuery={setQuery}
//                 setData={setData}
//                 setLoading={setLoading}
//                 setError={setError}
//                 destinationId={companyIntegration.id}
//                 dbName={companyIntegration.name}
//                 previewTableDataList={previewTableDataList?.filter(
//                   (table) => table
//                 )}
//                 clientName={client.value}
//                 timeTaken={timeTaken}
//                 setTimeTaken={setTimeTaken}
//                 rlsConditions={rlsConditions.filter(
//                   (rls) => rls.isAddOnMetrics
//                 )}
//                 onChangeFilterValue={onChangeFilterValue}
//                 setLimit={setLimit}
//                 limit={limit}
//                 drilldown={
//                   drillDownSettings?.isEnableGroupBy ? drillDownFunc : undefined
//                 }
//                 setShowChartPopup={setShowChartPopup}
//                 chartPopupChild={
//                   isShowChartPopup ? (
//                     <Ui.ChartPopup
//                       isOpen={isShowChartPopup}
//                       setOpen={setShowChartPopup}
//                       value={chartParams?.name}
//                       columnName={columnName || ''}
//                       getUnderlyingData={getUnderlyingData}
//                       clickBehaviourConfigs={clickBehaviourConfigs.chart}
//                       elementRef={{
//                         containerRef,
//                         event: chartParams?.event?.event,
//                       }}
//                       position="dynamic"
//                       isSingleValueChart={
//                         chartSettings.chartType ===
//                         consts.CHART_TYPES.singleValue
//                       }
//                     />
//                   ) : undefined
//                 }
//                 chartClickConfig={clickBehaviourConfigs.chart}
//                 handleChartRightClick={handleChartRightClick}
//                 datasetSettings={datasetSettings}
//                 isExternalChart={isServerSidePagination}
//                 onChangePage={(isPrev) => {
//                   setTableLimit((prev) => ({
//                     limit: prev.limit,
//                     offset: !isPrev
//                       ? prev.offset + prev.limit
//                       : prev.offset > prev.limit
//                       ? prev.offset - prev.limit
//                       : 0,
//                   }));
//                 }}
//                 isEnableNextBtn={
//                   totalTableRecords > tableLimit?.limit + tableLimit?.offset
//                 }
//                 isEnablePrevBtn={tableLimit?.offset !== 0}
//                 paginationInfo={{
//                   limit: tableLimit?.limit,
//                   offset: tableLimit?.offset,
//                   totalRecords: totalTableRecords,
//                 }}
//                 onDrillLevelClick={onDrillLevelClick}
//                 isShowChartType={false}
//                 setShowChartType={() => {}}
//               />
//             </div>
//           </div>
//         )}
//     </div>
//   );
// };

// export default ExternalMetricUpdate;
