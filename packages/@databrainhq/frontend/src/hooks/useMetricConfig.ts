/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { consts, helpers, types, utils, hooks } from '@databrainhq/plugin';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChartActions, DatasetSettings, MetricsValue } from 'types';
import {
  useCompanyIntegrationQuery,
  useCustomSqlColumnsQuery,
  useExternalDashboardMetricListQuery,
  useExternalMetricQuery,
  useSqlQueryMutation,
} from 'utils/generated/graphql';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { globalDashboardFiltersAtom } from 'atoms/application';
import { useAtom } from 'jotai';
import {
  FilterFieldType,
  MetricCardProps,
} from '@databrainhq/plugin/src/components';
import {
  CurrentMetricFilter,
  DrillDownSettings,
  ShowFormContainerType,
  SqlModeResultStateType,
} from 'types/metric';
import {
  DATABASE_NAME,
  DEFAULT_CLICK_ACTION_CONFIG,
  SOMETHING_WENT_WRONG,
  TABLE,
} from 'consts/values';
import {
  POSTGRES,
  BIGQUERY,
  CLICKHOUSE,
  DATABASE,
  DATABRICKS,
  ELASTICSEARCH,
  MYSQL,
  MSSQL,
  REDSHIFT,
  DEFAULT_NEW_FILTER,
  MONGODB,
  POSTGRESQL,
  DRAGDROP,
  POINTCLICK,
  DEFAULTCOLORS,
  SNOWFLAKE,
  AWSS3,
} from 'consts/application';
import { ClientType } from 'components/ClientDropDown';
import { getCurrentUser } from 'helpers/application/auth';
import getSelectedSchemaList from 'helpers/application/getSelectedSchemaList';
import getSchemaString from 'helpers/application/getSchemaString';
import { getTimeGroupData } from 'helpers/application/getTimeFilteredData';
import getLimitSqlQuery from 'helpers/application/getLimitSqlQuery';
import getCustomSqlStatement from 'helpers/application/getCustomSqlStatement';
import { DashboardType } from './useMetric';
import useTenancyLevel from './useTenancyLevel';
import useDrill from './useDrill';
import useExternalMetric from './useExternalMetric';
import useFetchTotalRecordsCount from './useFetchTotalRecordsCount';
import useGenerateExternalMetricQuery from './useGenerateExternalMetricQuery';
// import usePreviewTableData from './usePreviewTableData';
import useWorkspace from './useWorkspace';
import useCompanySchema from './useCompanySchema';
import useTheme from './useTheme';
import useDatasets from './useDatasets';
import { getEnabledChart } from '@/helpers';

/* eslint-disable no-nested-ternary */
export type CompanyIntegration =
  | {
      id: string;
      name: string;
    }
  | undefined;

const useMetricConfig = () => {
  const user = getCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('wid');
  const dashboardId = searchParams.get('dashboardId');
  const clientId = searchParams.get('client');
  const importedMetricId = searchParams.get('metricId');
  const parentPage = searchParams.get('parent');
  const isPublished = searchParams.get('isPublished');
  const [isCloneModalShow, setCloneModalShow] = useState<boolean>(false);
  const [isEnableAutoSave, setEnableAutoSave] = useState(false);
  const [isLoadingQueryData, setLoadingQueryData] = useState(true);
  const [isOpenSqlPanel, setOpenSqlPanel] = useState(false);
  const [isOpenPythonPanel, setOpenPythonPanel] = useState(false);
  const [isShowResults, setShowResults] = useState(false);
  const [isShowChartProperties, setShowChartProperties] = useState(false);
  const [isShowChartCustomProperties, setShowChartCustomProperties] =
    useState(false);
  const [isShowChartActions, setShowChartActions] = useState(false);
  const [isShowFiltersPanel, setShowFiltersPanel] = useState(false);
  const [isShowSortPanel, setShowSortPanel] = useState(false);
  const [isShowGroupByPanel, setShowGroupByPanel] = useState(false);
  const [isShowCustomSqlModal, setShowCustomSqlModal] = useState(false);
  const [isShowJoinPanel, setShowJoinPanel] = useState(false);
  const [isModalShow, setModalShow] = useState<boolean>(false);
  const [selectedColumns, setSelectedColumns] =
    useState<types.SelectedColumns[]>();
  const [client, setClient] = useState<ClientType>({ label: '', value: '' });
  const [isGenerating, setGenerating] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<types.SqlError>();
  const [data, setData] = useState<any[]>();
  const [query, setQuery] = useState<string>('');
  const [limit, setLimit] = useState('100');
  const [timeTaken, setTimeTaken] = useState<number>(0.0);
  const [selectedManageColumns, setSelectedManageColumns] = useState<any>([]);
  const [isShowChartType, setShowChartType] = useState<boolean>(false);
  const [isResetPallete, setResetPallete] = useState<boolean>(false);

  const [selectedSchemaList, setSelectedSchemaList] =
    useState<Record<string, types.SelectedColumns[]>>();
  // const [previewTableDataList, setPreviewTableDataList] = useState<any[]>();
  const [companyIntegration, setCompanyIntegration] =
    useState<CompanyIntegration>();
  const [chartSettings, setChartSettings] = useState<types.ChartSettingsType>(
    consts.DEFAULT_CHART_SETTINGS
  );
  const [rlsFilters, setRlsFilters] = useState<types.RlsFilterObjectType[]>([]);
  const [isShowSchemaTab, setShowSchemaTab] = useState<boolean>(true);
  const [isAllClient, setIsAllClient] = useState<boolean>(false);
  const [datasetSettings, setDatasetSettings] = useState<DatasetSettings>();
  const [timeGrainValue, setTimeGrainValue] = useState<string>('');
  const [creatorMode, setCreatorMode] = useState<string>(DRAGDROP);

  const [metricQuery, setMetricQuery] = useState<string>();
  const [outputColumns, setOutputColumns] = useState<string>();
  const [joinFields, setJoinFields] = useState<types.JoinField[]>([]);
  const [rlsConditions, setRlsConditions] = useState<types.RlsCondition[]>([]);
  const [tableLimit, setTableLimit] = useState({
    limit: parseInt(chartSettings?.tableSettings?.defaultRowSize || '10', 10),
    offset: 0,
  });
  const [totalTableRecords, setTotalTableRecords] = useState(0);
  const [dashboardIds, setDashboardIds] = useState<DashboardType['id'][]>([]);
  const [groupbyList, setGroupByList] = useState<any[]>([]);
  const [isEnablePivotTable, setEnablePivotTable] = useState<boolean>(false);

  const [clickBehaviourConfigs, setClickBehaviourConfigs] =
    useState<ChartActions>(DEFAULT_CLICK_ACTION_CONFIG);

  const [timeGroupData, setTimeGroupData] = useState<any[]>();

  const { workspaces, workspace, setWorkspace } = useWorkspace();
  const [showFormContainer, setShowFormContainer] =
    useState<ShowFormContainerType>({
      isEnable: false,
      index: 0,
      type: 'Save',
    });
  const [currentMetricFilter, setCurrentMetricFilter] =
    useState<CurrentMetricFilter>(DEFAULT_NEW_FILTER);
  const [isEnableDefaultTheme, setEnableDefaultTheme] =
    useState<boolean>(false);
  const [isUpdatedChartTheme, setUpdatedChartTheme] = useState<boolean>(false);

  const { workspaceTheme, updateChartTheme } = useTheme();

  const [sqlModeResultState, setSqlModeResultState] =
    useState<SqlModeResultStateType>({
      error: '',
      isLoading: false,
      data: [],
    });
  useEffect(() => {
    if (workspaces.length) {
      const selectedWorkspace = workspaces?.find((w) => w.id === workspaceId);
      if (workspaceId && selectedWorkspace) {
        setWorkspace(selectedWorkspace);
      }
      if (!selectedWorkspace) navigate('/');
    }
  }, [workspaceId, workspaces.length]);

  const [drillDownSettings, setDrillDownSettings] = useState<DrillDownSettings>(
    { isEnableGroupBy: false, isEnableCrossFilter: false, drillType: '' }
  );
  const [filters, setFilters] = useState<
    { columnName: string; value: string | number }[]
  >([]);
  const [selectedChart, setSelectedChart] = useState<{
    showPropertiesPanel: boolean;
    chart: string;
  }>({
    showPropertiesPanel: false,
    chart: '',
  });
  const [isPythonMode, setPythonMode] = useState(false);
  const [pythonCode, setPythonCode] = useState('');
  const [globalFilterList] = useAtom(globalDashboardFiltersAtom);

  const {
    data: companyIntegrationData,
    isLoading: isCompanyIntegrationLoading,
    isError,
    isFetched,
  } = useCompanyIntegrationQuery(
    { workspaceId: workspaceId ?? workspace?.id },
    { enabled: !!workspace?.id }
  );

  const {
    data: externalDashboardMetricsData,
    isLoading: isLoadingMetricsList,
  } = useExternalDashboardMetricListQuery(
    {
      externalDashboardId: dashboardId,
      clientId,
    },
    { enabled: !!dashboardId }
  );
  const { tableList: datasetTableList } = useDatasets(
    companyIntegration?.id || ''
  );
  const externalDashboardMetricList: types.FloatingDropDownOption[] = useMemo(
    () =>
      externalDashboardMetricsData?.externalDashboardMetrics.map((item) => {
        const mode = item?.externalMetric?.datasetMetricSettings
          ?.newDatasetSettings?.isAutoCompleteMode
          ? POINTCLICK
          : DRAGDROP;
        const savedCreatorMode = workspace?.creatorMode || DRAGDROP;
        return {
          label: item?.externalMetric?.name,
          value: item?.externalMetric?.id,
          subValue: item?.externalMetric?.metricId,
          isImportEnabled: savedCreatorMode === mode,
        };
      }) || [],
    [
      externalDashboardMetricsData?.externalDashboardMetrics,
      workspace?.creatorMode,
    ]
  );

  const [barRadius, setBarRadius] = useState({
    topRadius: chartSettings.customSettings?.barRadius?.[1] || 0,
    bottomRadius: chartSettings.customSettings?.barRadius?.[3] || 0,
  });

  const [dataSecuritySettings, setDataSecuritySettings] = useState<{
    underlyingColumns: types.FloatingDropDownOption[];
    csvColumns: types.FloatingDropDownOption[];
  }>({ csvColumns: [], underlyingColumns: [] });
  const { data: metricData, isLoading: isMetricLoading } =
    useExternalMetricQuery(
      {
        id,
      },
      { enabled: !!id }
    );
  const { data: importedMetricData, isLoading: isImportedMetricLoading } =
    useExternalMetricQuery(
      {
        id: importedMetricId,
      },
      { enabled: !!importedMetricId }
    );
  const metric = useMemo(() => {
    if (
      !metricData?.externalMetrics_by_pk &&
      !importedMetricData?.externalMetrics_by_pk
    )
      return null;
    if (importedMetricId)
      return {
        ...importedMetricData?.externalMetrics_by_pk,
        name: '',
        id: '',
        metricId: '',
      };
    return metricData?.externalMetrics_by_pk;
  }, [
    metricData?.externalMetrics_by_pk,
    importedMetricData?.externalMetrics_by_pk,
  ]);
  useEffect(() => {
    if (isEnableDefaultTheme) {
      const chartTheme = {
        axisSettings: chartSettings?.axisSettings,
        labelSettings: chartSettings?.labelSettings,
        customSettings: chartSettings?.customSettings,
        legendSettings: chartSettings?.legendSettings,
        margins: chartSettings?.margins,
      };
      const chart = chartSettings?.chartType;
      let updatedChartTheme: any;
      if (
        workspaceTheme?.chartCustomization &&
        Object.keys(workspaceTheme?.chartCustomization)?.includes(chart)
      ) {
        updatedChartTheme = workspaceTheme?.chartCustomization;
        updatedChartTheme[chart] = chartTheme;
      } else {
        updatedChartTheme = {
          ...workspaceTheme?.chartCustomization,
          [chart]: chartTheme,
        };
      }
      updateChartTheme(updatedChartTheme, workspaceTheme?.id, () =>
        setUpdatedChartTheme(true)
      );
      setEnableDefaultTheme(false);
    }
  }, [isEnableDefaultTheme, chartSettings]);

  useEffect(() => {
    const isChartAvailable =
      workspaceTheme?.chartCustomization &&
      Object.keys(workspaceTheme?.chartCustomization)?.includes(
        chartSettings?.chartType
      );
    if (!metric?.id && !importedMetricId && isChartAvailable) {
      setChartSettings((prev) => ({
        ...prev,
        axisSettings:
          workspaceTheme?.chartCustomization?.[chartSettings?.chartType]
            .axisSettings,
        labelSettings:
          workspaceTheme?.chartCustomization?.[chartSettings?.chartType]
            .labelSettings,
        margins:
          workspaceTheme?.chartCustomization?.[chartSettings?.chartType]
            .margins,
        customSettings:
          workspaceTheme?.chartCustomization?.[chartSettings?.chartType]
            .customSettings,
        legendSettings:
          workspaceTheme?.chartCustomization?.[chartSettings?.chartType]
            .legendSettings,
      }));
    } else if (!metric?.id && !importedMetricId && !isChartAvailable) {
      setChartSettings((prev) => ({
        ...prev,
        axisSettings: consts.DEFAULT_CHART_SETTINGS.axisSettings,
        labelSettings: consts.DEFAULT_CHART_SETTINGS.labelSettings,
        margins: consts.DEFAULT_CHART_SETTINGS.margins,
        customSettings: consts.DEFAULT_CHART_SETTINGS.customSettings,
        legendSettings: consts.DEFAULT_CHART_SETTINGS.legendSettings,
      }));
    }
  }, [metric, chartSettings.chartType]);
  const globalVariableFilters: MetricCardProps['globalFilters'] =
    useMemo(() => {
      const variableColumns =
        globalFilterList?.[0]?.columns?.filter((f) => f.isVariableFilter) || [];
      const columnsWithDefaultValue: FilterFieldType[] = variableColumns.map(
        (v) => {
          const value = undefined;
          return {
            column: v.name,
            operator: '=',
            applyOnTables: [],
            as: v.as,
            filterType: 'global',
            isVariableFilter: true,
            variableStrings: v.variableStrings || [],
            value,
            label: v.label || v.name,
            filterVariant: v.filterVariant,
          };
        }
      );
      const filterObject: MetricCardProps['globalFilters'] = {
        tableName: globalFilterList?.[0]?.tableName || '',
        filters: columnsWithDefaultValue,
      };
      return filterObject;
    }, [globalFilterList]);
  const {
    createExternalMetric,
    error: saveError,
    isLoading: isSaving,
    setMetricVersions,
    updateExternalMetric,
  } = useExternalMetric({
    query: getLimitSqlQuery({ query, limit, dbName: companyIntegration?.name }),
    companyIntegrationId: companyIntegration?.id,
    integrationName: companyIntegration?.name,
    isUnpublishedMetric: isPublished === 'false',
    metricQuery,
    outputColumns,
    selectedColumns,
    timeGrain: timeGrainValue,
    dashboardIds: dashboardIds?.length ? dashboardIds : [dashboardId || ''],
    groupBy: undefined,
    isEnableGroupBy: false,
    selectedGroupBy: [],
    joinFields,
    rlsConditions,
    rlsFilters,
    datasetMetricSettings: datasetSettings,
    chartSettings,
    limit: Number(limit),
    drillDownSettings,
    dataSecuritySettings: {
      csvColumns: dataSecuritySettings.csvColumns.map((v) => v.value),
      underlyingColumns: dataSecuritySettings.underlyingColumns.map(
        (v) => v.value
      ),
    },
    id: metric?.id,
    workspaceId: workspaceId ?? workspace?.id,
    clickBehaviourConfigs,
  });
  useEffect(() => {
    if (metric?.id || importedMetricId) {
      setDashboardIds(
        metric?.externalDashboardMetrics?.map(
          (extDashboard) => extDashboard.externalDashboardId
        ) ?? []
      );
      setQuery(metric?.query || '');
      setMetricQuery(metric?.metricQuery as string);
      setOutputColumns(metric?.outputColumns as string);
      setSelectedColumns(
        Array.isArray(metric?.inputFields) ? metric?.inputFields : []
      );
      setTimeGrainValue(metric?.timeGrain || '');
      setJoinFields(metric?.joinFields);
      setRlsConditions(metric?.rlsConditions || []);
      setClickBehaviourConfigs(
        metric?.clickActions || DEFAULT_CLICK_ACTION_CONFIG
      );
      setDatasetSettings(metric?.datasetMetricSettings);
      setPythonCode(
        metric?.datasetMetricSettings?.newDatasetSettings?.pythonCode || ''
      );
      setPythonMode(
        metric?.datasetMetricSettings?.newDatasetSettings?.isPythonMode || false
      );
      setDrillDownSettings({
        isEnableGroupBy: !!metric?.drillDownSettings?.isEnableGroupBy,
        drilldownChartSettings: metric?.drillDownSettings?.isEnableGroupBy
          ? metric?.drillDownSettings?.drilldownChartSettings
          : [],
        isEnableCrossFilter: !!metric?.drillDownSettings?.isEnableCrossFilter,
        drillType: '',
      });
      setChartSettings(metric?.chartOptions);
      setLimit(`${metric?.limit || 100}`);
      setTableLimit({
        limit: parseInt(
          metric?.chartOptions?.tableSettings?.defaultRowSize || '10',
          10
        ),
        offset: 0,
      });
    }
    if (metric?.id) {
      setMetricVersions((prev) => ({
        ...prev,
        id: metric.id,
        current: metric.currentVersion,
        latest:
          metric.id === prev.id && prev.latest > metric.latestVersion
            ? prev.latest
            : metric.latestVersion,
      }));
    } else {
      setMetricVersions({
        id: '',
        current: 1,
        latest: 1,
        versions: [],
      });
    }
  }, [metric]);
  useEffect(() => {
    if (chartSettings.chartType === consts.CHART_TYPES.row) {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev?.customSettings,
          barRadius: [
            barRadius.bottomRadius,
            barRadius.topRadius,
            barRadius.topRadius,
            barRadius.bottomRadius,
          ],
        },
      }));
    } else {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev?.customSettings,
          barRadius: [
            barRadius.topRadius,
            barRadius.topRadius,
            barRadius.bottomRadius,
            barRadius.bottomRadius,
          ],
        },
      }));
    }
  }, [
    barRadius.topRadius,
    barRadius.bottomRadius,
    setChartSettings,
    chartSettings.chartType,
  ]);
  const switchAxisOptions = useMemo(() => {
    const opts = data
      ? Object.keys(data[0] || {}).map((d) => ({
          value: d,
          label: d,
        }))
      : [];
    opts.push({ value: 'NONE', label: 'NONE' });
    return opts;
  }, [data]);
  // const isShowTimeGroupData = useMemo(
  //   () =>
  //     !!rlsConditions.length &&
  //     (
  //       rlsConditions.find(
  //         (filter) =>
  //           filter.isAddOnMetrics &&
  //           filter.datatype === 'date' &&
  //           filter.columnName === chartSettings.xAxis
  //       )?.options as types.DateOptionType[]
  //     )?.every((option) => option.format),
  //   [rlsConditions, chartSettings]
  // );
  useEffect(() => {
    const compIntdata = companyIntegrationData?.companyIntegrations[0];
    if (compIntdata && !companyIntegration)
      setCompanyIntegration({ id: compIntdata.id, name: compIntdata.name });
  }, [companyIntegrationData]);
  const { schemaList, schemaMap, isLoadingSchema } = useCompanySchema();
  const databaseName = useMemo(() => {
    const dbName = companyIntegration?.name?.toLowerCase();
    switch (dbName) {
      case REDSHIFT:
      case POSTGRES:
      case SNOWFLAKE:
        return POSTGRESQL;
      case MYSQL:
      case CLICKHOUSE:
      case MONGODB:
        return MYSQL;
      case BIGQUERY:
      case DATABRICKS:
        return BIGQUERY;
      case AWSS3:
        return AWSS3;
      default:
        return MYSQL;
    }
  }, [companyIntegration?.name]);
  useEffect(() => {
    const value = getSelectedSchemaList(
      selectedColumns,
      companyIntegration?.name
    );
    setSelectedSchemaList(value ?? {});
  }, [selectedColumns]);
  const { data: customSqlColumnsData } = useCustomSqlColumnsQuery(
    { companyIntegrationId: companyIntegration?.id },
    { enabled: !!companyIntegration?.id }
  );
  const { themeChartColors } = useTheme();
  useEffect(() => {
    if (isResetPallete) {
      setChartSettings((prev) => ({
        ...prev,
        chartColors: themeChartColors,
      }));
      setResetPallete(false);
    }
  }, [isResetPallete]);
  useEffect(() => {
    if (
      (!chartSettings.chartColors?.length ||
        !helpers.areArraysEqual(themeChartColors, chartSettings.chartColors)) &&
      themeChartColors?.length
    ) {
      setChartSettings((prev) => ({
        ...prev,
        chartColors: themeChartColors,
      }));
    }
    if (!chartSettings.chartColors?.length)
      setChartSettings((prev) => ({
        ...prev,
        chartColors: DEFAULTCOLORS,
      }));
  }, [themeChartColors, chartSettings.chartColors]);

  const legendData = useMemo(() => {
    return utils.getLegendData({
      chartOptions: chartSettings,
      data: data || [],
    });
  }, [
    data,
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
  const isServerSidePagination = useMemo(
    () =>
      chartSettings?.tableSettings?.isServerSidePagination &&
      chartSettings?.chartType === consts.CHART_TYPES.table,
    [chartSettings]
  );
  const customSqlColumns = useMemo(
    () =>
      customSqlColumnsData?.customSqlColumns?.map((d) => ({
        tableName: d.tableName,
        list: d.sqlColumns as MetricsValue[],
      })),
    [customSqlColumnsData]
  );
  const rlsFilterValues = useMemo(
    () =>
      rlsFilters.reduce((values: Record<string, string>, filter) => {
        const variableName = `${filter.name}_variable`;
        values[variableName] = (filter.defaultValue || filter.value) as string;
        return values;
      }, {}),
    [rlsFilters]
  );
  const appliedRlsFilters = useMemo(
    () =>
      rlsFilters.map((filter) => ({
        tableName: filter.tableName,
        columnName: filter.columnName,
        condition: filter.condition,
        name: filter.name,
        operator: filter.operator || 'and',
      })),
    [rlsFilters]
  );
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
        datasetSettings?.selectedDimensions?.[
          filters.length < datasetSettings?.selectedDimensions?.length
            ? filters.length
            : 0
        ] || ''
      ),
    [datasetSettings, filters]
  );
  const { companyTenancyType } = useTenancyLevel();
  const schema = getSchemaString(
    selectedSchemaList,
    companyIntegration?.name,
    companyTenancyType
  );

  const sqlQueryMutation = useSqlQueryMutation();

  const executeSqlQuery = (
    sqlQuery: string,
    paginatedLimit?: string,
    offset?: string
  ) => {
    if (companyIntegration) {
      setLoading(true);
      setError(undefined);
      setData([]);
      const modefiedQuery = getCustomSqlStatement({
        dbName: companyIntegration?.name || '',
        query: sqlQuery,
        rlsConditions:
          companyIntegration?.name === ELASTICSEARCH
            ? []
            : helpers.getAppliedFilters(
                rlsConditions,
                companyTenancyType,
                client?.value
              ),
        tenancyLevel: companyTenancyType || TABLE,
        clientId: client?.value,
        values: rlsFilterValues,
        limit: paginatedLimit || limit,
        offset,
        isAllClient,
        globalFilters: globalVariableFilters,
      });
      sqlQueryMutation.mutate(
        {
          dbName: companyIntegration.name,
          id: companyIntegration.id,
          query: modefiedQuery,
          filters: rlsConditions
            .filter((r) => r.isAddOnMetrics)
            .map((filter) => ({
              columnName: filter.columnName,
              value: filter.value || filter.options[0],
            })),
        },
        {
          onSuccess: (res: any) => {
            setLoading(true);
            const metaData = res?.sqlQuery?.metaData;
            const responseData =
              res?.sqlQuery?.data && typeof res.sqlQuery.data === consts.STRING
                ? JSON.parse(res.sqlQuery.data)
                : res?.sqlQuery?.data || [];
            if (setTimeTaken) setTimeTaken(res.sqlQuery.timeTaken);
            setGroupByList(
              metaData?.groupbyColumnList?.map((col: string) =>
                col.replace(/`/g, '')
              ) || []
            );
            if (
              responseData.message ||
              responseData.code ||
              responseData.errorObj
            ) {
              setError(responseData.errorObj);
              setData([]);
              setLoading(false);
            } else {
              const outputDataArray = Array.isArray(responseData)
                ? responseData
                : [];
              setData(outputDataArray);
              setError(undefined);
              setLoading(false);
            }
          },
          onError: () => {
            setError({
              errorMessage: SOMETHING_WENT_WRONG,
              explanation: '',
              solution: '',
            });
            setLoading(false);
          },
        }
      );
    }
  };
  const { fetchTotalRecordsCount } = useFetchTotalRecordsCount();
  const { generateExternalQuery } = useGenerateExternalMetricQuery({
    schema,
    setError,
    setLoading,
    setData,
    executeSqlQuery,
    setGenerating,
    setQuery,
    setMetricQuery,
    setOutputColumns,
    rlsConditions: [],
    dbName: companyIntegration?.name as string,
    setJoinFields,
    tenancyLevel: companyTenancyType as string,
    filters: rlsFilters.map((filter) => ({
      tableName: filter.tableName,
      columnName: filter.columnName,
      condition: filter.condition,
      name: filter.name,
      operator: filter.operator || 'and',
    })),
    setFilters,
  });
  const { pythonColumns, pythonResult, executePython, pythonError } =
    hooks.usePythonResults({
      setError,
      setLoading,
      setData,
    });
  const onExecutePython = useCallback(
    async (code: string) => {
      setPythonCode(code);
      setDatasetSettings(
        (prev) =>
          ({
            ...prev,
            newDatasetSettings: {
              ...prev?.newDatasetSettings,
              pythonCode: code,
            },
          } as DatasetSettings)
      );
      await executePython({
        code,
        clientId: client.value,
        rlsConditions,
        companyId: getCurrentUser()?.companyId as string,
      });
    },
    [executePython, client.value, rlsConditions, getCurrentUser()?.companyId]
  );

  const onChangePythonMode = useCallback((isEnabled: boolean) => {
    if (!isEnabled) {
      setPythonCode('');
      setPythonMode(false);
      setDatasetSettings(
        (prev) =>
          ({
            ...prev,
            newDatasetSettings: {
              ...prev?.newDatasetSettings,
              isPythonMode: false,
              pythonCode: '',
            },
          } as DatasetSettings)
      );
    } else {
      setPythonMode(true);
      setDatasetSettings(
        (prev) =>
          ({
            ...prev,
            newDatasetSettings: {
              ...prev?.newDatasetSettings,
              isPythonMode: true,
            },
          } as DatasetSettings)
      );
    }
  }, []);

  // const { getPreviewTableData } = usePreviewTableData();
  // useEffect(() => {
  //   if (selectedSchemaList && companyIntegration) {
  //     getPreviewTableData({
  //       dbName: companyIntegration.name,
  //       destinationId: companyIntegration.id,
  //       selectedSchemaList,
  //       setPreviewTableDataList,
  //     });
  //   }
  // }, [selectedSchemaList, companyIntegration]);
  useEffect(() => {
    if (data?.length) {
      if (drillDownSettings?.isEnableGroupBy) {
        const currentLevelChartSettings =
          drillDownSettings?.drilldownChartSettings?.find(
            (settings) => settings.name === activeDrillLevel
          )?.chartSettings;
        if (
          currentLevelChartSettings &&
          datasetSettings?.selectedDimensions?.length &&
          datasetSettings?.selectedDimensions?.length > filters?.length
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
                    ...(datasetSettings?.metrics?.map((value) =>
                      value.as?.replace(/["`]+/g, '')
                    ) || []),
                  ]
                : datasetSettings?.metrics?.map((value) =>
                    value.as?.replace(/["`]+/g, '')
                  ),
          }));
        }
      }
    }
  }, [data, activeDrillLevel]);
  useEffect(() => {
    if (data?.length && groupbyList.length) {
      setEnablePivotTable(true);
    } else {
      setEnablePivotTable(false);
    }
  }, [data, groupbyList.length, query]);
  const enabledCharts = useMemo(() => {
    const charts = getEnabledChart(data || []);
    const isTimeSeries =
      datasetSettings?.newDatasetSettings?.selectedDims?.some((col) =>
        consts.DATE_TYPES.includes(
          col.cast?.value?.toLowerCase() || col.datatype?.toLowerCase() || ''
        )
      );
    const groupedCharts = [
      consts.CHART_TYPES.pivot,
      consts.CHART_TYPES.pivotV2,
      consts.CHART_TYPES.timeSeries,
      consts.CHART_TYPES.treeMap,
      consts.CHART_TYPES.geoBarMap,
      consts.CHART_TYPES.geoMap,
      consts.CHART_TYPES.geoScatterMap,
      consts.CHART_TYPES.worldMap,
    ];
    if (groupbyList.length && isTimeSeries) {
      return [
        ...charts.filter((chart) => !groupedCharts.includes(chart)),
        ...groupedCharts,
      ];
    }
    if (groupbyList.length)
      return [
        ...charts.filter((chart) => !groupedCharts.includes(chart)),
        ...groupedCharts.filter((opt) => opt !== consts.CHART_TYPES.timeSeries),
      ];
    if (isTimeSeries)
      return [
        ...charts.filter((chart) => !groupedCharts.includes(chart)),
        consts.CHART_TYPES.timeSeries,
      ];

    return charts.filter((chart) => !groupedCharts.includes(chart));
  }, [data, groupbyList, chartSettings.xAxis]);
  // useEffect(() => {
  //   const keys = helpers.findKeys(data || []);
  //   console.log(keys);
  //   if (keys?.numberKeys?.length) {
  //     setNumberKeys(true);
  //     setEnableGauge(true);
  //     // if (keys?.stringKeys?.length) {
  //     //   setChartSettings((prev) => ({
  //     //     ...prev,
  //     //     gaugeSettings: {
  //     //       ...chartSettings.gaugeSettings,
  //     //       metric: keys.numberKeys[0],
  //     //       dimensions: keys.stringKeys,
  //     //     },
  //     //   }));
  //     // } else {
  //     //   setChartSettings((prev) => ({
  //     //     ...prev,
  //     //     gaugeSettings: {
  //     //       ...chartSettings.gaugeSettings,
  //     //       metric: keys.numberKeys[0],
  //     //     },
  //     //   }));
  //     // }
  //   } else {
  //     setEnableGauge(false);
  //     setNumberKeys(false);
  //   }
  // }, [data]);
  // useEffect(() => {
  // if (
  //   groupbyList.length &&
  //   chartSettings.chartType === consts.CHART_TYPES.pivot &&
  //   data?.length
  // ) {
  //   setChartSettings((prev) => ({
  //     ...prev,
  //     pivotTableSettings: {
  //       ...chartSettings.pivotTableSettings,
  //       columns: Object.keys(data[0]).filter((value) =>
  //         groupbyList.includes(value)
  //       ),
  //       rows: Object.keys(data[0]).filter(
  //         (value) => !groupbyList.includes(value)
  //       ),
  //     },
  //   }));
  // }
  // }, [data, groupbyList.length, chartSettings.chartType]);
  // useEffect(() => {
  //   if (isShowTimeGroupData) {
  //     const timeFilter = rlsConditions.find(
  //       (filter) => filter.isAddOnMetrics && filter.datatype === 'date'
  //     );

  //     if (timeFilter) {
  //       const timeData = getTimeGroupData({
  //         data: data || [],
  //         dimensionColumn: timeFilter.columnName,
  //         measureColumn: chartSettings.yAxisList?.[0] || '',
  //         option: (timeFilter.options as types.DateOptionType[]).find(
  //           (option) => option.name === timeFilter.value
  //         ) as types.DateOptionType,
  //         timeColumn: chartSettings.xAxis || timeFilter.columnName,
  //       });
  //       setTimeGroupData(timeData);
  //     }
  //   }
  // }, [data, rlsConditions, isShowTimeGroupData]);
  const { onDrillDown, onDrillUp } = useDrill();
  useEffect(() => {
    if (isServerSidePagination)
      setTableLimit({
        limit: parseInt(
          chartSettings?.tableSettings?.defaultRowSize || '10',
          10
        ),
        offset: 0,
      });
  }, [isServerSidePagination, chartSettings?.tableSettings?.defaultRowSize]);

  useEffect(() => {
    if (companyTenancyType === DATABASE) {
      setSelectedColumns((prev) =>
        prev?.map((c) => ({ ...c, schemaName: client.value }))
      );
      setRlsConditions((prev) =>
        prev.map((c) => ({
          ...c,
          tableName: `${client.value}.${c.tableName
            .split('.')
            .slice(1)
            .join('.')}`,
        }))
      );
    }
  }, [client.value]);
  useEffect(() => {
    if (query && !isPythonMode) {
      if (drillDownSettings?.isEnableGroupBy) {
        onDrillDown({
          chartType: '',
          baseQuery: helpers.replaceVariable({
            isAllClient,
            query,
            rlsConditions,
            tenancyLevel: companyTenancyType,
            clientId: client?.value,
            values: rlsFilterValues,
            globalFilters: globalVariableFilters,
          }),
          columnName: '',
          database: databaseName,
          onDrillStart: () => {
            setLoading(true);
            setError(undefined);
            setData([]);
          },
          onError: (drillError) => {
            setLoading(false);
            setError({
              errorMessage: drillError,
              explanation: '',
              solution: '',
            });
          },
          onSuccess: (drillQuery) => {
            executeSqlQuery(
              drillQuery,
              isServerSidePagination ? `${tableLimit?.limit}` : undefined,
              isServerSidePagination ? `${tableLimit?.offset}` : undefined
            );
          },
          params: undefined,
          selectedDimensions: datasetSettings?.selectedDimensions || [],
          filters: [],
          setFilters,
        });
      } else {
        executeSqlQuery(
          query,
          isServerSidePagination ? `${tableLimit?.limit}` : undefined,
          isServerSidePagination ? `${tableLimit?.offset}` : undefined
        );
      }
    }
  }, [
    rlsFilterValues,
    timeGrainValue,
    tableLimit,
    isServerSidePagination,
    client.value,
    rlsConditions,
  ]);

  useEffect(() => {
    if (isPythonMode && pythonCode) {
      executePython({
        code: pythonCode,
        rlsConditions,
        clientId: client.value,
        companyId: getCurrentUser()?.companyId as string,
      });
    }
  }, [rlsConditions, client.value]);

  const onChangeFilterValue = (
    name: string,
    value: string,
    labelValue?: string,
    customValue?: Record<string, Date>,
    stringValues?: types.FloatingDropDownOption[]
  ) => {
    if (customValue) {
      setRlsConditions((prev) =>
        prev.map((rls) =>
          rls.name === name
            ? {
                ...rls,
                value,
                options: (rls.options as types.DateOptionType[]).map((option) =>
                  option.name === value ? { ...option, ...customValue } : option
                ),
                variableOptions: (
                  rls.variableOptions as types.CustomOption[]
                ).map((option) =>
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
  };
  useEffect(() => {
    if (chartSettings.chartType !== consts.CHART_TYPES.timeSeries) {
      setChartSettings((prev) => ({
        ...prev,
        timeSeriesSettings: {
          groupBySettings: {
            isDynamic: false,
            options: [],
            value: 'monthly',
            fillXAxis: false,
          },
          seriesType:
            prev.yAxisList?.map((column) => ({
              column,
              type: 'bar',
            })) || [],
        },
      }));
    }
  }, [chartSettings.chartType]);
  useEffect(() => {
    if (isError || isFetched) {
      setLoadingQueryData(false);
    }
  }, [isError, isFetched]);
  useEffect(() => {
    setFilters([]);
    if (
      datasetSettings?.selectedDimensions &&
      datasetSettings?.selectedDimensions?.length < 2
    ) {
      setDrillDownSettings({
        isEnableGroupBy: false,
        isEnableCrossFilter: false,
        drillType: '',
        drilldownChartSettings: undefined,
      });
    }
  }, [datasetSettings?.selectedDimensions]);

  useEffect(() => {
    if (isServerSidePagination) {
      if (query) {
        const replacedClient =
          companyTenancyType === DATABASE
            ? query.replace(new RegExp(DATABASE_NAME, 'g'), client.value)
            : query;
        const modifiedQuery = rlsConditions.filter(
          (filter) => filter.isAddOnMetrics
        )?.length
          ? getCustomSqlStatement({
              dbName: companyIntegration?.name || '',
              query,
              rlsConditions:
                companyIntegration?.name === ELASTICSEARCH
                  ? []
                  : helpers.getAppliedFilters(
                      rlsConditions,
                      companyTenancyType,
                      client?.value
                    ),
              tenancyLevel: companyTenancyType || TABLE,
              clientId: client?.value,
              values: rlsFilterValues,
              limit,
              isAllClient,
              isDisableLimit: true,
              globalFilters: globalVariableFilters,
            })
          : replacedClient;
        fetchTotalRecordsCount({
          dbName: companyIntegration?.name,
          destinationId: companyIntegration?.id,
          queryValue: modifiedQuery,
          limit: '1',
          setTotalTableRecords,
        });
      }
    }
  }, [
    chartSettings,
    rlsConditions,
    client.value,
    rlsFilterValues,
    isServerSidePagination,
  ]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        drillDownSettings?.isEnableGroupBy &&
        activeDrillLevel &&
        datasetSettings?.selectedDimensions &&
        datasetSettings?.selectedDimensions?.length > filters?.length
      ) {
        setDrillDownSettings((prev) => ({
          ...prev,
          drilldownChartSettings: [
            ...(prev.drilldownChartSettings?.filter(
              (prevSet) => prevSet.name !== activeDrillLevel
            ) || []),
            { name: activeDrillLevel, chartSettings },
          ],
        }));
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [
    chartSettings,
    drillDownSettings,
    activeDrillLevel,
    datasetSettings,
    filters,
  ]);
  const onDrillLevelClick = useCallback(
    (index: number) => {
      onDrillUp({
        index,
        baseQuery: helpers.replaceVariable({
          isAllClient,
          query,
          rlsConditions,
          tenancyLevel: companyTenancyType,
          clientId: client?.value,
          values: rlsFilterValues,
          globalFilters: globalVariableFilters,
        }),
        database: databaseName,
        onDrillStart: () => {
          setLoading(true);
          setError(undefined);
          setData([]);
        },
        onError: (drillError) => {
          setLoading(false);
          setError({
            errorMessage: drillError,
            explanation: '',
            solution: '',
          });
        },
        onSuccess: (drillQuery) => {
          executeSqlQuery(
            drillQuery,
            isServerSidePagination ? `${tableLimit?.limit}` : undefined,
            isServerSidePagination ? `${tableLimit?.offset}` : undefined
          );
        },
        filters,
        setFilters,
      });
    },
    [
      filters,
      helpers.replaceVariable({
        isAllClient,
        query,
        rlsConditions,
        tenancyLevel: companyTenancyType,
        clientId: client?.value,
        values: rlsFilterValues,
        globalFilters: globalVariableFilters,
      }),
    ]
  );
  useEffect(() => {
    if (!isEnableAutoSave || !query || !metric?.name || !metric?.metricId)
      return;
    updateExternalMetric(
      {
        name: metric?.name,
        description: metric?.description,
        metricId: metric?.metricId,
        about: 'Changes auto saved.',
      },
      true
    );
  }, [
    datasetSettings,
    rlsConditions,
    rlsFilters,
    outputColumns,
    drillDownSettings,
    joinFields,
    timeGrainValue,
    metricQuery,
    selectedColumns,
    limit,
    query,
    isEnableAutoSave,
  ]);
  useEffect(() => {
    if (!metric?.name && dashboardId) {
      setDashboardIds([dashboardId]);
    }
  }, [dashboardId, metric]);
  useEffect(() => {
    if (workspace?.creatorMode)
      setCreatorMode(workspace?.creatorMode || DRAGDROP);
  }, [workspace?.creatorMode]);
  useEffect(() => {
    if (
      !(
        chartSettings.chartType === consts.CHART_TYPES.stack &&
        chartSettings.chartType === consts.CHART_TYPES.timeSeries &&
        chartSettings?.timeSeriesSettings?.seriesType?.[0]?.type === 'stack' &&
        chartSettings.seriesField === 'ungrouped'
      )
    ) {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          showFullStacked: false,
        },
      }));
    }
  }, [
    chartSettings?.chartType,
    chartSettings?.timeSeriesSettings,
    chartSettings.seriesField,
  ]);

  return {
    onDrillLevelClick,
    drillDownFunc: (params: any) =>
      onDrillDown({
        chartType: '',

        baseQuery: helpers.replaceVariable({
          isAllClient,
          query,
          rlsConditions,
          tenancyLevel: companyTenancyType,
          clientId: client?.value,
          values: rlsFilterValues,
          globalFilters: globalVariableFilters,
        }),
        columnName: getGroupByString(
          datasetSettings?.selectedDimensions?.[filters.length] || ''
        ),
        database: databaseName,
        onDrillStart: () => {
          setLoading(true);
          setError(undefined);
          setData([]);
        },
        onError: (drillError) => {
          setLoading(false);
          setError({
            errorMessage: drillError,
            explanation: '',
            solution: '',
          });
        },
        onSuccess: (drillQuery) => {
          executeSqlQuery(
            drillQuery,
            isServerSidePagination ? `${tableLimit?.limit}` : undefined,
            isServerSidePagination ? `${tableLimit?.offset}` : undefined
          );
        },
        params,
        selectedDimensions: datasetSettings?.selectedDimensions || [],
        filters,
        setFilters,
      }),
    onChangePage: (isPrev: boolean) =>
      setTableLimit((prev) => ({
        limit: prev.limit,
        offset: !isPrev
          ? prev.offset + prev.limit
          : prev.offset > prev.limit
          ? prev.offset - prev.limit
          : 0,
      })),
    chartSettings,
    setModalShow,
    client,
    setClient,
    companyTenancyType,
    companyIntegration,
    isLoadingQueryData:
      isLoadingQueryData || (isMetricLoading && id) || isImportedMetricLoading,
    isCompanyIntegrationLoading,
    isModalShow,
    createExternalMetric,
    setDashboardIds,
    dashboardIds,
    setSelectedColumns,
    saveError,
    isShowSchemaTab,
    selectedColumns,
    selectedSchemaList,
    isGenerating,
    generateExternalQuery,
    schema,
    timeGrainValue,
    setTimeGrainValue,
    user,
    setData,
    setShowSchemaTab,
    setLoading,
    setError,
    setQuery,
    rlsConditions,
    setTimeTaken,
    rlsFilters,
    setRlsConditions,
    setRlsFilters,
    appliedRlsFilters,
    limit,
    datasetSettings,
    setDatasetSettings,
    customSqlColumns,
    setDrillDownSettings,
    drillDownSettings,
    data,
    timeGroupData,
    getGroupByString,
    isOpenSqlPanel,
    setOpenSqlPanel,
    filters,
    query,
    error,
    isLoading,
    isEnableNextBtn: totalTableRecords > tableLimit?.limit + tableLimit?.offset,
    isEnablePrevBtn: tableLimit?.offset !== 0,
    paginationInfo: {
      limit: tableLimit?.limit,
      offset: tableLimit?.offset,
      totalRecords: totalTableRecords,
    },
    // previewTableDataList,
    timeTaken,
    onChangeFilterValue,
    setLimit,
    setChartSettings,
    groupbyList,
    isEnablePivotTable,
    hasNumberKeys: true,
    isEnableGauge: true,
    isServerSidePagination,
    isSaving,
    setGroupByList,
    schemaList,
    schemaMap,
    isLoadingSchema,
    workspaceId: workspaceId ?? (workspace?.id || ''),
    rlsFilterValues,
    selectedManageColumns,
    setSelectedManageColumns,
    isShowChartType,
    setShowChartType,
    enabledCharts:
      creatorMode === POINTCLICK
        ? enabledCharts.filter(
            (chart) =>
              ![
                consts.CHART_TYPES.pivotV2,
                consts.CHART_TYPES.timeSeries,
              ].includes(chart)
          )
        : enabledCharts,
    selectedChart,
    setSelectedChart,
    onRunSqlQuery: (value?: string) =>
      executeSqlQuery(
        value || query,
        isServerSidePagination ? `${tableLimit?.limit}` : undefined,
        isServerSidePagination ? `${tableLimit?.offset}` : undefined
      ),
    isShowResults,
    setShowResults,
    isShowChartProperties,
    setShowChartProperties,
    isShowChartActions,
    setShowChartActions,
    clickBehaviourConfigs,
    setClickBehaviourConfigs,
    isShowChartCustomProperties,
    setShowChartCustomProperties,
    barRadius,
    setBarRadius,
    onChangeDrillDown: (params: any, isEnable: boolean) => {
      if (isEnable) {
        setDrillDownSettings((prev) => ({
          ...prev,
          isEnableGroupBy: true,
          drillType: '',
        }));
        onDrillDown({
          chartType: '',

          baseQuery: helpers.replaceVariable({
            isAllClient,
            query,
            rlsConditions,
            tenancyLevel: companyTenancyType,
            clientId: client?.value,
            values: rlsFilterValues,
            globalFilters: globalVariableFilters,
          }),
          columnName: '',
          database: databaseName,
          onDrillStart: () => {
            setLoading(true);
            setError(undefined);
            setData([]);
          },
          onError: (drillError) => {
            setLoading(false);
            setError({
              errorMessage: drillError,
              explanation: '',
              solution: '',
            });
          },
          onSuccess: (drillQuery) => {
            executeSqlQuery(
              drillQuery,
              isServerSidePagination ? `${tableLimit?.limit}` : undefined,
              isServerSidePagination ? `${tableLimit?.offset}` : undefined
            );
          },
          params,
          selectedDimensions: datasetSettings?.selectedDimensions || [],
          filters: [],
          setFilters,
        });
      } else {
        setDrillDownSettings((prev) => ({
          ...prev,
          isEnableGroupBy: false,
          drilldownChartSettings: undefined,
        }));

        executeSqlQuery(
          query,
          isServerSidePagination ? `${tableLimit?.limit}` : undefined,
          isServerSidePagination ? `${tableLimit?.offset}` : undefined
        );
      }
    },
    dataSecuritySettings,
    setDataSecuritySettings,
    isShowFiltersPanel,
    setShowFiltersPanel,
    isShowSortPanel,
    setShowSortPanel,
    isOpenPythonPanel,
    setOpenPythonPanel,
    isShowGroupByPanel,
    setShowGroupByPanel,
    isShowJoinPanel,
    setShowJoinPanel,
    id,
    metric,
    updateExternalMetric,
    themeChartColors,
    legendData,
    isCloneModalShow,
    setCloneModalShow,
    isEnableAutoSave,
    setEnableAutoSave,
    switchAxisOptions,
    datasetTableList,
    isResetPallete,
    setResetPallete,
    databaseName,
    setIsAllClient,
    isAllClient,
    pythonColumns,
    pythonResult,
    onExecutePython,
    isPythonMode,
    pythonCode,
    onChangePythonMode,
    pythonError,
    globalVariableFilters,
    showFormContainer,
    setShowFormContainer,
    currentMetricFilter,
    setCurrentMetricFilter,
    externalDashboardMetricList,
    setEnableDefaultTheme,
    isUpdatedChartTheme,
    setUpdatedChartTheme,
    importedMetricId,
    dashboardId,
    creatorMode,
    setCreatorMode,
    sqlModeResultState,
    setSqlModeResultState,
    isShowCustomSqlModal,
    setShowCustomSqlModal,
    parentPage,
    isPublished,
  };
};

export default useMetricConfig;
