import { RlsCondition } from './app';
import { DatasetMetricCreationConfiguration } from './metricCreate';

export type UseDashboardDataQueryInputType = {
  token: string;
  dashboardId?: string;
};

export type ClientSubsetData = {
  companyIntegrationId?: string | null;
  dbName?: string | null;
  error?: {
    message: string;
  } | null;
  tableList?:
    | {
        tableName: string;
        clientColumn?: string | null;
        columns?:
          | {
              datatype: string;
              name: string;
              as: string;
            }[]
          | null;
      }[]
    | null;
} | null;
export type UseDashboardDataQueryOutputType = {
  externalDashboard?: any | null;
  isAllowedToChangeLayout?: boolean | null;
  isAllowedToCreateMetrics?: boolean | null;
  isAllowedToDeleteMetrics?: boolean | null;
  isAllowedToUpdateMetrics?: boolean | null;
  isAllowedToEmailReports?: boolean | null;
  adminTheme?: any | null;
  clientId?: string | null;
  companyId?: string | null;
  companyTenancyType?: string | null;
  externalMetrics?: (any | null)[] | null;
  rlsSettings?: any | null;
  appFilters?: any | null;
  workspace?: any | null;
  sharingSettingsId?: string | null;
  error?: { message: string } | null;
  clientSubsetData?: ClientSubsetData;
} | null;

export type UseMetricQueryQueryInputType = {
  id?: string;
  clientId?: string;
  globalFilters?: Record<string, any>;
  rlsConditions?: any[];
  filterValues?: Record<string, any>;
  tenancyLevel?: string;
  drillFilters?: any[];
  limit?: number;
  offset?: number;
  isAllClient?: boolean;
  disableStringify?: boolean;
  pivotHeaders?: string[];
  timeseriesSettings?: { format: string; seriesField: string };
};

export type UseMetricQueryQueryOutputType = {
  data?: any | null;
  timeTaken?: number | null;
  totalRecords?: number | null;
  metaData?: any | null;
};

export type UseMetricColumnMutationInputType = {
  tableName?: string;
  columnName?: string;
  wId?: string;
  filter?: Record<string, any>;
  customTable?: { query: string; alias: string };
  labelColumnName?: string;
};

export type UseMetricUnderlyingDataMutationInputType = {
  columnName?: string;
  companyId?: string;
  query?: string;
  value?: any;
  workspaceId?: string;
  metricId?: string;
};

export type UseMetricShareCsvMutationInputType = {
  configurations?: Record<string, any>;
  emails?: string[];
  expireCsvFileAt?: string;
  expireUrlIn?: number;
  externalMetricId?: string;
  integrationId?: string;
  integrationName?: string;
  query?: string;
  sharingSettingsId?: string;
  subject?: string;
};

export type UseSaveDashboardLayoutMutationInputType = {
  clientId: string;
  externalDashboardId: string;
  layout: any[];
  isLocked?: boolean;
};

export type UseDeleteDashboardScheduleReportMutationInputType = {
  token: string;
  id: string;
};

export type UseSaveDashboardScheduleReportMutationInputType = {
  emails?: any;
  externalDashboardId?: string;
  guestToken?: string;
  nextScheduledAt?: string;
  sharingSettingsId?: string;
  subject?: string;
  timeConfigurations?: any;
  data?: any;
};

export type UseMarkArchivedMutationInputType = {
  id?: string;
  clientId?: string;
};

export type UseExecutePythonMutationInputType = {
  code: string;
  clientId?: string;
  companyId: string;
  rlsConditions?: RlsCondition[];
};

export type ExternalMetricsInsertInput = {
  chartOptions?: any;
  clientDeletedMetrics?: any;
  clientId?: string;
  companyId?: string;
  companyIntegrationId?: string;
  createdAt?: string;
  createdBy?: string;
  datasetMetricSettings?: any;
  description?: string;
  drillDownSettings?: any;
  externalDashboardMetrics?: any;
  externalMetricRawCsvUrl?: any;
  externalMetricsRlsFilters?: any;
  groupBy?: any;
  inputFields?: any;
  integrationName?: string;
  isCreatedByClient?: boolean;
  isEnableGroupBy?: boolean;
  isLive?: boolean;
  metricId?: string;
  metricQuery?: string;
  name?: string;
  outputColumns?: string;
  query?: string;
  resizeAttributes?: any;
  scheduleEmailReportCharts?: any;
  selectedGroupBy?: any;
  timeGrain?: string;
  updatedAt?: string;
};
export type UseUpdateAdminMetricMutationInputType = {
  externalMetricId: string;
  object: ExternalMetricsInsertInput;
  clientId: string;
};

export type ExternalMetricsSetInput = {
  chartOptions?: any;
  description?: string;
  metricId?: string;
  name?: string;
  resizeAttributes?: any;
  updatedAt?: any;
};

export type UseUpdateMetricMutationInputType = {
  externalMetricId: string;
  set: ExternalMetricsSetInput;
};

export type UsePreviewTableMutationInputType = {
  tableName?: string;
  limit?: number;
  integrationId?: string;
  integrationName?: string;
};
export type UseGenerateMetricDataMutationInputType = {
  questionString: string;
};

export type UseGenerateMetricMutationInputType = {
  userInputs?: any;
  integrationName?: string;
  integrationId?: string;
};

export type UseDatatsetMetricMutationInputType = {
  cId: string;
  configuration: DatasetMetricCreationConfiguration;
  id: string;
};
export type UseNewDatatsetMetricMutationInputType = {
  configuration: DatasetMetricCreationConfiguration;
  id: string;
};
export type UseCreateMetricMutationInputType = {
  chartOptions?: any;
  companyId?: string;
  companyIntegrationId?: string;
  description?: string;
  inputFields?: any;
  integrationName?: string;
  metricId?: string;
  metricQuery?: string;
  name?: string;
  outputColumns?: string;
  query?: string;
  isLive?: boolean;
  clientId?: string | null;
  isCreatedByClient?: boolean;
  createdBy?: string;
  timeGrain?: string | null;
  externalDashboardIds?: any;
  selectedGroupBy?: any;
  isEnableGroupBy?: boolean;
  datasetMetricSettings?: any;
  groupBy?: any;
};

export type CompanyIntegrations = {
  companyId: string;
  companyWorkspace: any;
  customSqlColumns: any;
  externalMetrics: any;
  id: string;
  integrationId: string;
  name: string;
  workspaceId: string;
};
export type ExternalMetrics = {
  chartOptions: any;
  clickActions: any;
  clientDeletedMetrics: any;
  clientId?: string;
  companyId: string;
  companyIntegration: CompanyIntegrations;
  companyIntegrationId: string;
  createdAt: string;
  createdBy?: string;
  datasetMetricSettings?: any;
  description: string;
  drillDownSettings?: any;
  /** An array relationship */
  externalDashboardMetrics: any;
  /** An object relationship */
  externalMetricRawCsvUrl?: any;
  /** An array relationship */
  externalMetricsRlsFilters: any;
  groupBy: any;
  id: string;
  inputFields?: any;
  integrationName: string;
  isArchived: boolean;
  isCreatedByClient: boolean;
  isEnableGroupBy: boolean;
  isLive: boolean;
  isMarkedDeleted: boolean;
  metricId: string;
  metricQuery?: string;
  name: string;
  outputColumns?: string;
  query: string;
  resizeAttributes: any;
  rlsConditions: any;
  scheduleEmailReportCharts: any;
  selectedGroupBy: any;
  timeGrain?: string;
  updatedAt: string;
};

export type ChatCompletionRequestMessage = {
  /**
   * The role of the author of this message.
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  role: 'system' | 'user' | 'assistant';
  /**
   * The contents of the message
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  content: string;
  /**
   * The name of the user in a multi-user chat
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  name?: string;
};

export type UseChatApiResponseType = {
  messages: ChatCompletionRequestMessage[];
};
