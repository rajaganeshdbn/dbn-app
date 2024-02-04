import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
import { useFetcher } from 'utils/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  date: any;
  json: any;
  jsonb: any;
  numeric: any;
  timestamp: any;
  timestamptz: any;
  uuid: any;
};

export type AcceptInvitationInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type AcceptInvitationOutput = {
  __typename?: 'AcceptInvitationOutput';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<SignInOutput>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type CacheIntegrationSchemaInput = {
  companyId: Scalars['String'];
  companyIntegrationId: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type CacheIntegrationSchemaOutput = {
  __typename?: 'CacheIntegrationSchemaOutput';
  data: Scalars['json'];
};

export type ChangePasswordInput = {
  id: Scalars['String'];
  password: Scalars['String'];
};

export type ChangePasswordOutput = {
  __typename?: 'ChangePasswordOutput';
  error?: Maybe<Error>;
  token?: Maybe<Scalars['String']>;
};

export type ChangeUserNameInput = {
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export type ChangeUserNameOutput = {
  __typename?: 'ChangeUserNameOutput';
  error?: Maybe<Error>;
  token?: Maybe<Scalars['String']>;
};

export type ColumnData = {
  __typename?: 'ColumnData';
  label: Scalars['String'];
  value: Scalars['String'];
};

export type ColumnDataError = {
  __typename?: 'ColumnDataError';
  message: Scalars['String'];
};

export type CompanyIntegrationData = {
  __typename?: 'CompanyIntegrationData';
  id: Scalars['String'];
};

export type CompanyRole = {
  __typename?: 'CompanyRole';
  id: Scalars['String'];
  name: Scalars['String'];
  permissions: Scalars['json'];
};

export type CompanyWorkspace = {
  __typename?: 'CompanyWorkspace';
  companyId: Scalars['String'];
  companyIntegrations?: Maybe<Array<Maybe<CompanyIntegrationData>>>;
  creatorMode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  tenancyLevel: Scalars['String'];
};

export type CreateCompanyRedisInput = {
  companyId: Scalars['String'];
  expire: Scalars['Int'];
  host: Scalars['String'];
  isDatabrainCache?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
  port: Scalars['Int'];
  workspaceId: Scalars['String'];
};

export type CreateCompanyRedisOutput = {
  __typename?: 'CreateCompanyRedisOutput';
  error?: Maybe<Error>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateConnectionInput = {
  body: Scalars['json'];
};

export type CreateConnectionOutput = {
  __typename?: 'CreateConnectionOutput';
  data?: Maybe<Scalars['json']>;
};

export type CreateDestinationInput = {
  body: Scalars['json'];
};

export type CreateDestinationOutput = {
  __typename?: 'CreateDestinationOutput';
  data?: Maybe<Scalars['json']>;
};

export type CreateOperationInput = {
  body: Scalars['json'];
};

export type CreateOperationOutput = {
  __typename?: 'CreateOperationOutput';
  data?: Maybe<Scalars['json']>;
};

export type CreateSourceInput = {
  body: Scalars['json'];
};

export type CreateSourceOutput = {
  __typename?: 'CreateSourceOutput';
  data?: Maybe<Scalars['json']>;
};

export type CreateViewDataModelInput = {
  companyId: Scalars['String'];
  databaseName: Scalars['String'];
  dbName: Scalars['String'];
  description: Scalars['String'];
  destinationId: Scalars['String'];
  lineageData: Scalars['jsonb'];
  query: Scalars['String'];
  viewName: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type CreateViewDataModelOutput = {
  __typename?: 'CreateViewDataModelOutput';
  result?: Maybe<Scalars['json']>;
};

export type CreateViewInDbInput = {
  companyIntegrationId: Scalars['String'];
  dbName: Scalars['String'];
  query: Scalars['String'];
  viewName: Scalars['String'];
};

export type CreateViewInDbOutput = {
  __typename?: 'CreateViewInDbOutput';
  queryResponse?: Maybe<Scalars['json']>;
  status?: Maybe<Scalars['String']>;
};

export type DatasetMetricCreationInput = {
  cId?: InputMaybe<Scalars['String']>;
  configuration: Scalars['json'];
  id: Scalars['String'];
};

export type DatasetMetricCreationOutput = {
  __typename?: 'DatasetMetricCreationOutput';
  data?: Maybe<Array<Maybe<Scalars['json']>>>;
  error?: Maybe<Error>;
  metaData?: Maybe<Scalars['json']>;
  query?: Maybe<Scalars['String']>;
  timeTaken?: Maybe<Scalars['Int']>;
};

export type DefinitionsInput = {
  definitionType: Scalars['String'];
};

export type DefinitionsOutput = {
  __typename?: 'DefinitionsOutput';
  data?: Maybe<Scalars['json']>;
};

export type DeleteDestinationInput = {
  destinationId: Scalars['String'];
};

export type DeleteDestinationOutput = {
  __typename?: 'DeleteDestinationOutput';
  data?: Maybe<Scalars['json']>;
};

export type DeleteMetricVersionInput = {
  id: Scalars['String'];
  version: Scalars['Float'];
};

export type DeleteMetricVersionOutput = {
  __typename?: 'DeleteMetricVersionOutput';
  error?: Maybe<Scalars['String']>;
  metricVersion?: Maybe<MetricVersion>;
};

export type DeleteSourceInput = {
  sourceId: Scalars['String'];
};

export type DeleteSourceOutput = {
  __typename?: 'DeleteSourceOutput';
  data?: Maybe<Scalars['json']>;
};

export type EmbeddedDashboardDataInput = {
  dashboardId?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type EmbeddedDashboardDataOutput = {
  __typename?: 'EmbeddedDashboardDataOutput';
  adminTheme?: Maybe<Scalars['json']>;
  appFilters?: Maybe<Scalars['json']>;
  clientId?: Maybe<Scalars['String']>;
  clientSubsetData?: Maybe<CompanySubsetTableDataOutput>;
  companyId?: Maybe<Scalars['String']>;
  companyTenancyType?: Maybe<Scalars['String']>;
  error?: Maybe<Error>;
  externalDashboard?: Maybe<Scalars['json']>;
  externalMetrics?: Maybe<Array<Maybe<Scalars['json']>>>;
  guestToken?: Maybe<Scalars['String']>;
  isAllowedToChangeLayout?: Maybe<Scalars['Boolean']>;
  isAllowedToCreateMetrics?: Maybe<Scalars['Boolean']>;
  isAllowedToDeleteMetrics?: Maybe<Scalars['Boolean']>;
  isAllowedToEmailReports?: Maybe<Scalars['Boolean']>;
  isAllowedToUpdateMetrics?: Maybe<Scalars['Boolean']>;
  rlsSettings?: Maybe<Scalars['json']>;
  sharingSettingsId?: Maybe<Scalars['String']>;
  workspace?: Maybe<Scalars['json']>;
};

export type EmbeddedMetricDataInput = {
  guestToken: Scalars['String'];
  metricId: Scalars['String'];
};

export type EmbeddedMetricDataOutput = {
  __typename?: 'EmbeddedMetricDataOutput';
  adminTheme?: Maybe<Scalars['json']>;
  clientId?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  error?: Maybe<Error>;
  externalMetric?: Maybe<Scalars['json']>;
  params?: Maybe<Scalars['json']>;
  sharingSettingsId?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type ExecutePythonInput = {
  clientId?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  companyId: Scalars['String'];
  isUat?: InputMaybe<Scalars['Boolean']>;
  metricFilters?: InputMaybe<Scalars['json']>;
};

export type ExecutePythonOutput = {
  __typename?: 'ExecutePythonOutput';
  error?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['json']>;
};

export type ExternalMetricQueryInput = {
  clientId?: InputMaybe<Scalars['String']>;
  drillFilters?: InputMaybe<Scalars['json']>;
  externalMetricId: Scalars['String'];
  filterValues?: InputMaybe<Scalars['json']>;
  globalFilters?: InputMaybe<Scalars['json']>;
  isAllClient?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  rlsConditions?: InputMaybe<Scalars['json']>;
  tenancyLevel?: InputMaybe<Scalars['String']>;
};

export type ExternalMetricQueryOutput = {
  __typename?: 'ExternalMetricQueryOutput';
  comparisonValue?: Maybe<Scalars['json']>;
  data?: Maybe<Scalars['json']>;
  metaData?: Maybe<Scalars['json']>;
  timeTaken?: Maybe<Scalars['Float']>;
  totalRecords?: Maybe<Scalars['Int']>;
};

export type FetchColumnDataInput = {
  columnName: Scalars['String'];
  customTable?: InputMaybe<Scalars['json']>;
  filter?: InputMaybe<Scalars['json']>;
  integrationId?: InputMaybe<Scalars['String']>;
  integrationName?: InputMaybe<Scalars['String']>;
  labelColumnName?: InputMaybe<Scalars['String']>;
  tableName: Scalars['String'];
  wId?: InputMaybe<Scalars['String']>;
};

export type FetchColumnDataOutput = {
  __typename?: 'FetchColumnDataOutput';
  data?: Maybe<Array<Maybe<ColumnData>>>;
  error?: Maybe<ColumnDataError>;
};

export type ForecastInput = {
  inputData: Scalars['json'];
};

export type ForecastOutput = {
  __typename?: 'ForecastOutput';
  forecastData?: Maybe<Scalars['json']>;
};

export type ForgetPasswordInput = {
  appUrl?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

export type ForgetPasswordOutput = {
  __typename?: 'ForgetPasswordOutput';
  error?: Maybe<Error>;
  success?: Maybe<Scalars['Boolean']>;
};

export type GenerateDatasetMetricsInput = {
  integrationId: Scalars['String'];
  integrationName: Scalars['String'];
  userInputs: Scalars['json'];
};

export type GenerateDatasetMetricsOutput = {
  __typename?: 'GenerateDatasetMetricsOutput';
  error?: Maybe<Scalars['json']>;
  metaData?: Maybe<Scalars['json']>;
  query?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['json']>;
  timeTaken?: Maybe<Scalars['Float']>;
};

export type GenerateEmbeddedMeticInput = {
  clientId: Scalars['String'];
  companyId: Scalars['String'];
  queryPrompt: Scalars['String'];
  timeGrain?: InputMaybe<Scalars['String']>;
};

export type GenerateEmbeddedMeticOutput = {
  __typename?: 'GenerateEmbeddedMeticOutput';
  error?: Maybe<Error>;
  query?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['json']>;
};

export type GenerateExternalMetricQueryInput = {
  inputData: Scalars['json'];
};

export type GenerateExternalMetricQueryOutput = {
  __typename?: 'GenerateExternalMetricQueryOutput';
  query: Scalars['String'];
};

export type GenerateMetricQueryInput = {
  inputData: Scalars['json'];
};

export type GenerateMetricQueryOutput = {
  __typename?: 'GenerateMetricQueryOutput';
  query: Scalars['String'];
};

export type GenerateOpenaiResponseInput = {
  prompt: Scalars['String'];
};

export type GenerateOpenaiResponseOutput = {
  __typename?: 'GenerateOpenaiResponseOutput';
  data?: Maybe<Scalars['json']>;
};

export type GetCompanyWorkspacesInput = {
  companyId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type GetCompanyWorkspacesOutput = {
  __typename?: 'GetCompanyWorkspacesOutput';
  companyWorkspaces?: Maybe<Array<CompanyWorkspace>>;
  error?: Maybe<Error>;
};

export type GetConnectionInput = {
  connectionId: Scalars['String'];
};

export type GetConnectionOutput = {
  __typename?: 'GetConnectionOutput';
  data?: Maybe<Scalars['json']>;
};

export type GetConnectionsListInput = {
  workspaceId: Scalars['String'];
};

export type GetConnectionsListOutput = {
  __typename?: 'GetConnectionsListOutput';
  data?: Maybe<Scalars['json']>;
};

export type GetDestinationListInput = {
  workspaceId: Scalars['String'];
};

export type GetDestinationListOutput = {
  __typename?: 'GetDestinationListOutput';
  data?: Maybe<Scalars['json']>;
};

export type GetJobInformationInput = {
  jobId: Scalars['String'];
};

export type GetJobInformationOutput = {
  __typename?: 'GetJobInformationOutput';
  data?: Maybe<Scalars['json']>;
};

export type GetJobsInput = {
  connectionId: Scalars['String'];
};

export type GetJobsOutput = {
  __typename?: 'GetJobsOutput';
  data?: Maybe<Scalars['json']>;
};

export type GetLineageDataInput = {
  sqlQuery: Scalars['String'];
};

export type GetLineageDataOutput = {
  __typename?: 'GetLineageDataOutput';
  result?: Maybe<Scalars['json']>;
};

export type GetPreviewTableDataInput = {
  dbName: Scalars['String'];
  destinationId: Scalars['String'];
  selectedSchemaList: Scalars['json'];
};

export type GetPreviewTableDataOutput = {
  __typename?: 'GetPreviewTableDataOutput';
  dataList?: Maybe<Scalars['json']>;
};

export type GetSourceListInput = {
  workspaceId: Scalars['String'];
};

export type GetSourceListOutput = {
  __typename?: 'GetSourceListOutput';
  data?: Maybe<Array<Maybe<Scalars['json']>>>;
};

export type GetUnderlyingDataInput = {
  columnName?: InputMaybe<Scalars['String']>;
  companyId: Scalars['String'];
  metricId?: InputMaybe<Scalars['String']>;
  query: Scalars['String'];
  value?: InputMaybe<Scalars['json']>;
  workspaceId: Scalars['String'];
};

export type GetUnderlyingDataOutput = {
  __typename?: 'GetUnderlyingDataOutput';
  data: Array<Maybe<Scalars['json']>>;
  timeTaken: Scalars['Int'];
};

export type GetUnderlyingSqlQueryInput = {
  columnName: Scalars['String'];
  sqlQuery: Scalars['String'];
  value: Scalars['json'];
};

export type GetUnderlyingSqlQueryOutput = {
  __typename?: 'GetUnderlyingSqlQueryOutput';
  query: Scalars['String'];
};

export type GetUserClientDataInput = {
  companyId: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type GetUserClientDataOutput = {
  __typename?: 'GetUserClientDataOutput';
  data: Scalars['json'];
};

export type GroupbyColumnListInput = {
  databaseName: Scalars['String'];
  query: Scalars['String'];
};

export type GroupbyColumnListOutput = {
  __typename?: 'GroupbyColumnListOutput';
  groupbyColumnList?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type InviteUserInput = {
  appUrl?: InputMaybe<Scalars['String']>;
  companyId: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  invitedBy: Scalars['String'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
};

export type InviteUserOutput = {
  __typename?: 'InviteUserOutput';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type InvokeSaveRawCsvDetailsInput = {
  configurations: Scalars['json'];
  expireCsvFileAt: Scalars['String'];
  expireUrlIn: Scalars['Int'];
  externalMetricId: Scalars['String'];
  integrationId: Scalars['String'];
  integrationName: Scalars['String'];
  query: Scalars['String'];
};

export type InvokeSaveRawCsvDetailsOutput = {
  __typename?: 'InvokeSaveRawCsvDetailsOutput';
  error?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['Int']>;
};

export type InvokeSendCsvUrlInput = {
  configurations: Scalars['json'];
  emails: Array<InputMaybe<Scalars['String']>>;
  expireCsvFileAt: Scalars['String'];
  expireUrlIn: Scalars['Int'];
  externalMetricId: Scalars['String'];
  integrationId: Scalars['String'];
  integrationName: Scalars['String'];
  query: Scalars['String'];
  sharingSettingsId: Scalars['String'];
  subject: Scalars['String'];
};

export type ListMetricVersionsInput = {
  id: Scalars['String'];
  latestVersion: Scalars['Float'];
  startKey?: InputMaybe<Scalars['json']>;
};

export type ListMetricVersionsOutput = {
  __typename?: 'ListMetricVersionsOutput';
  count: Scalars['Int'];
  error?: Maybe<Scalars['String']>;
  lastEvaluatedKey?: Maybe<Scalars['json']>;
  metricVersions: Array<MetricVersion>;
};

export type MetricVersion = {
  __typename?: 'MetricVersion';
  about: Scalars['String'];
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  id: Scalars['String'];
  metric: Scalars['json'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
  version: Scalars['Float'];
};

export type PreviewTableData = {
  __typename?: 'PreviewTableData';
  data?: Maybe<Scalars['json']>;
  isError: Scalars['Boolean'];
  name: Scalars['String'];
};

export type PreviewTableError = {
  __typename?: 'PreviewTableError';
  message: Scalars['String'];
};

export type PreviewTableInput = {
  integrationId: Scalars['String'];
  integrationName: Scalars['String'];
  limit: Scalars['Int'];
  tableName: Scalars['String'];
};

export type PreviewTableOutput = {
  __typename?: 'PreviewTableOutput';
  data?: Maybe<PreviewTableData>;
  error?: Maybe<PreviewTableError>;
};

export type QueryMetricInput = {
  id: Scalars['String'];
};

export type QueryMetricOutput = {
  __typename?: 'QueryMetricOutput';
  data?: Maybe<Scalars['json']>;
  timeTaken?: Maybe<Scalars['Float']>;
};

export type ReInviteUserInput = {
  appUrl?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};

export type ResetCompanyRedisDataInput = {
  workspaceId: Scalars['String'];
};

export type ResetCompanyRedisDataOutput = {
  __typename?: 'ResetCompanyRedisDataOutput';
  error?: Maybe<Error>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ResetPasswordData = {
  __typename?: 'ResetPasswordData';
  companyId?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordOutput = {
  __typename?: 'ResetPasswordOutput';
  data?: Maybe<ResetPasswordData>;
  error?: Maybe<Error>;
};

export type Result = {
  __typename?: 'Result';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type SendRawCsvInput = {
  companyId: Scalars['String'];
  metricName?: InputMaybe<Scalars['String']>;
  recipientAddress: Scalars['String'];
  sqlQuery: Scalars['String'];
  workspaceId?: InputMaybe<Scalars['String']>;
};

export type SendRawCsvOutput = {
  __typename?: 'SendRawCsvOutput';
  error?: Maybe<Error>;
  status?: Maybe<Scalars['String']>;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInOutput = {
  __typename?: 'SignInOutput';
  companyId?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  userRoles?: Maybe<Array<Maybe<UserRole>>>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type SignUpInput = {
  companyName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpOutputRes = {
  __typename?: 'SignUpOutputRes';
  error?: Maybe<SignUpResponse>;
  success?: Maybe<SignUpResponse>;
  token?: Maybe<Scalars['String']>;
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  code: Scalars['String'];
  message: Scalars['String'];
};

export type SignUpVerificationInput = {
  token: Scalars['String'];
};

export type SignUpVerificationOutput = {
  __typename?: 'SignUpVerificationOutput';
  companyId?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  error?: Maybe<SignUpResponse>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  userRoles?: Maybe<Array<Maybe<UserRole>>>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type SkipOnboardingInput = {
  companyId: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type SkipOnboardingOutput = {
  __typename?: 'SkipOnboardingOutput';
  error?: Maybe<Error>;
  status?: Maybe<Scalars['String']>;
};

export type SourceSchemaInput = {
  sourceId: Scalars['String'];
};

export type SourceSchemaOutput = {
  __typename?: 'SourceSchemaOutput';
  data?: Maybe<Scalars['json']>;
};

export type SqlQueryInput = {
  dbName: Scalars['String'];
  disableStringify?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Scalars['json']>;
  id: Scalars['String'];
  query: Scalars['String'];
};

export type SqlQueryOutput = {
  __typename?: 'SqlQueryOutput';
  data?: Maybe<Scalars['json']>;
  metaData?: Maybe<Scalars['json']>;
  timeTaken?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

export type SubsetColumns = {
  __typename?: 'SubsetColumns';
  as: Scalars['String'];
  datatype: Scalars['String'];
  name: Scalars['String'];
};

export type SyncConnectionInput = {
  connectionId: Scalars['String'];
};

export type SyncConnectionOutput = {
  __typename?: 'SyncConnectionOutput';
  data?: Maybe<Scalars['json']>;
};

export type TableList = {
  __typename?: 'TableList';
  clientColumn?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<SubsetColumns>>>;
  tableName: Scalars['String'];
};

export type TestDestinationInput = {
  body: Scalars['json'];
};

export type TestDestinationOutput = {
  __typename?: 'TestDestinationOutput';
  data?: Maybe<Scalars['json']>;
};

export type TestInput = {
  first: Scalars['String'];
  last: Scalars['String'];
};

export type TestIntegrationInput = {
  credentials: Scalars['json'];
  dbName: Scalars['String'];
};

export type TestIntegrationOutput = {
  __typename?: 'TestIntegrationOutput';
  result?: Maybe<Result>;
};

export type TestOutput = {
  __typename?: 'TestOutput';
  error?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
};

export type TestSmtpSettingsInput = {
  host: Scalars['String'];
  password: Scalars['String'];
  port: Scalars['Int'];
  secure: Scalars['Boolean'];
  username: Scalars['String'];
};

export type TestSmtpSettingsOutput = {
  __typename?: 'TestSmtpSettingsOutput';
  success: Scalars['Boolean'];
};

export type TestSourceInput = {
  body: Scalars['json'];
};

export type TestSourceOutput = {
  __typename?: 'TestSourceOutput';
  data?: Maybe<Scalars['json']>;
};

export type UpdateDestinationInput = {
  body: Scalars['json'];
};

export type UpdateDestinationOutput = {
  __typename?: 'UpdateDestinationOutput';
  data?: Maybe<Scalars['json']>;
};

export type UpdateSourceInput = {
  body: Scalars['json'];
};

export type UpdateSourceOutput = {
  __typename?: 'UpdateSourceOutput';
  data?: Maybe<Scalars['json']>;
};

export type UpdateViewDataModelInput = {
  companyId: Scalars['String'];
  databaseName: Scalars['String'];
  dbName: Scalars['String'];
  description: Scalars['String'];
  destinationId: Scalars['String'];
  id: Scalars['String'];
  lineageData: Scalars['jsonb'];
  query: Scalars['String'];
  viewName: Scalars['String'];
};

export type UpdateViewDataModelOutput = {
  __typename?: 'UpdateViewDataModelOutput';
  result?: Maybe<Scalars['json']>;
};

export type UpsertMetricVersionInput = {
  about: Scalars['String'];
  createdAt?: InputMaybe<Scalars['String']>;
  createdBy: Scalars['String'];
  id: Scalars['String'];
  metric: Scalars['json'];
  updatedBy?: InputMaybe<Scalars['String']>;
  version: Scalars['Float'];
};

export type UpsertMetricVersionOutput = {
  __typename?: 'UpsertMetricVersionOutput';
  error?: Maybe<Scalars['String']>;
  metricVersion?: Maybe<MetricVersion>;
};

export type UserRole = {
  __typename?: 'UserRole';
  applyOn: Scalars['String'];
  companyRole: CompanyRole;
  id: Scalars['String'];
  workspaces: Scalars['json'];
};

/** Table to store api keys to authorized applications to develop using our apis. */
export type ApiTokens = {
  __typename?: 'apiTokens';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  isExpired: Scalars['Boolean'];
  isTest: Scalars['Boolean'];
  name: Scalars['String'];
  scope: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  updatedBy?: Maybe<Scalars['uuid']>;
};

/** order by aggregate values of table "apiTokens" */
export type ApiTokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApiTokens_Max_Order_By>;
  min?: InputMaybe<ApiTokens_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "apiTokens". All fields are combined with a logical 'AND'. */
export type ApiTokens_Bool_Exp = {
  _and?: InputMaybe<Array<ApiTokens_Bool_Exp>>;
  _not?: InputMaybe<ApiTokens_Bool_Exp>;
  _or?: InputMaybe<Array<ApiTokens_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isExpired?: InputMaybe<Boolean_Comparison_Exp>;
  isTest?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  scope?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "apiTokens" */
export enum ApiTokens_Constraint {
  /** unique or primary key constraint on columns "id" */
  ApiTokensPkey = 'apiTokens_pkey'
}

/** input type for inserting data into table "apiTokens" */
export type ApiTokens_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  isExpired?: InputMaybe<Scalars['Boolean']>;
  isTest?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['String']>;
  updatedBy?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "apiTokens" */
export type ApiTokens_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "apiTokens" */
export type ApiTokens_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "apiTokens" */
export type ApiTokens_Mutation_Response = {
  __typename?: 'apiTokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ApiTokens>;
};

/** on_conflict condition type for table "apiTokens" */
export type ApiTokens_On_Conflict = {
  constraint: ApiTokens_Constraint;
  update_columns?: Array<ApiTokens_Update_Column>;
  where?: InputMaybe<ApiTokens_Bool_Exp>;
};

/** Ordering options when selecting data from "apiTokens". */
export type ApiTokens_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isExpired?: InputMaybe<Order_By>;
  isTest?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: apiTokens */
export type ApiTokens_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "apiTokens" */
export enum ApiTokens_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsExpired = 'isExpired',
  /** column name */
  IsTest = 'isTest',
  /** column name */
  Name = 'name',
  /** column name */
  Scope = 'scope',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "apiTokens" */
export type ApiTokens_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  isExpired?: InputMaybe<Scalars['Boolean']>;
  isTest?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['String']>;
  updatedBy?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "apiTokens" */
export enum ApiTokens_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  IsExpired = 'isExpired',
  /** column name */
  IsTest = 'isTest',
  /** column name */
  Name = 'name',
  /** column name */
  Scope = 'scope',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Metric resize attributes of client dashboard. */
export type ClientDashboardLayout = {
  __typename?: 'clientDashboardLayout';
  clientId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  externalDashboard: ExternalDashboards;
  externalDashboardId: Scalars['uuid'];
  isLocked: Scalars['Boolean'];
  layout: Scalars['jsonb'];
  updatedAt: Scalars['timestamptz'];
};


/** Metric resize attributes of client dashboard. */
export type ClientDashboardLayoutLayoutArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "clientDashboardLayout" */
export type ClientDashboardLayout_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ClientDashboardLayout_Max_Order_By>;
  min?: InputMaybe<ClientDashboardLayout_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ClientDashboardLayout_Append_Input = {
  layout?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "clientDashboardLayout" */
export type ClientDashboardLayout_Arr_Rel_Insert_Input = {
  data: Array<ClientDashboardLayout_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ClientDashboardLayout_On_Conflict>;
};

/** Boolean expression to filter rows from the table "clientDashboardLayout". All fields are combined with a logical 'AND'. */
export type ClientDashboardLayout_Bool_Exp = {
  _and?: InputMaybe<Array<ClientDashboardLayout_Bool_Exp>>;
  _not?: InputMaybe<ClientDashboardLayout_Bool_Exp>;
  _or?: InputMaybe<Array<ClientDashboardLayout_Bool_Exp>>;
  clientId?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  externalDashboard?: InputMaybe<ExternalDashboards_Bool_Exp>;
  externalDashboardId?: InputMaybe<Uuid_Comparison_Exp>;
  isLocked?: InputMaybe<Boolean_Comparison_Exp>;
  layout?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "clientDashboardLayout" */
export enum ClientDashboardLayout_Constraint {
  /** unique or primary key constraint on columns "clientId", "externalDashboardId" */
  ClientDashboardLayoutPkey = 'clientDashboardLayout_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ClientDashboardLayout_Delete_At_Path_Input = {
  layout?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ClientDashboardLayout_Delete_Elem_Input = {
  layout?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ClientDashboardLayout_Delete_Key_Input = {
  layout?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "clientDashboardLayout" */
export type ClientDashboardLayout_Insert_Input = {
  clientId?: InputMaybe<Scalars['String']>;
  externalDashboard?: InputMaybe<ExternalDashboards_Obj_Rel_Insert_Input>;
  externalDashboardId?: InputMaybe<Scalars['uuid']>;
  isLocked?: InputMaybe<Scalars['Boolean']>;
  layout?: InputMaybe<Scalars['jsonb']>;
};

/** order by max() on columns of table "clientDashboardLayout" */
export type ClientDashboardLayout_Max_Order_By = {
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "clientDashboardLayout" */
export type ClientDashboardLayout_Min_Order_By = {
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "clientDashboardLayout" */
export type ClientDashboardLayout_Mutation_Response = {
  __typename?: 'clientDashboardLayout_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ClientDashboardLayout>;
};

/** on_conflict condition type for table "clientDashboardLayout" */
export type ClientDashboardLayout_On_Conflict = {
  constraint: ClientDashboardLayout_Constraint;
  update_columns?: Array<ClientDashboardLayout_Update_Column>;
  where?: InputMaybe<ClientDashboardLayout_Bool_Exp>;
};

/** Ordering options when selecting data from "clientDashboardLayout". */
export type ClientDashboardLayout_Order_By = {
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalDashboard?: InputMaybe<ExternalDashboards_Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  isLocked?: InputMaybe<Order_By>;
  layout?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: clientDashboardLayout */
export type ClientDashboardLayout_Pk_Columns_Input = {
  clientId: Scalars['String'];
  externalDashboardId: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ClientDashboardLayout_Prepend_Input = {
  layout?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "clientDashboardLayout" */
export enum ClientDashboardLayout_Select_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExternalDashboardId = 'externalDashboardId',
  /** column name */
  IsLocked = 'isLocked',
  /** column name */
  Layout = 'layout',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "clientDashboardLayout" */
export type ClientDashboardLayout_Set_Input = {
  clientId?: InputMaybe<Scalars['String']>;
  externalDashboardId?: InputMaybe<Scalars['uuid']>;
  isLocked?: InputMaybe<Scalars['Boolean']>;
  layout?: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "clientDashboardLayout" */
export enum ClientDashboardLayout_Update_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  ExternalDashboardId = 'externalDashboardId',
  /** column name */
  IsLocked = 'isLocked',
  /** column name */
  Layout = 'layout'
}

/** Track metrics deleted by the end users. */
export type ClientDeletedMetrics = {
  __typename?: 'clientDeletedMetrics';
  clientId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  externalMetric: ExternalMetrics;
  externalMetricId: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
};

/** order by aggregate values of table "clientDeletedMetrics" */
export type ClientDeletedMetrics_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ClientDeletedMetrics_Max_Order_By>;
  min?: InputMaybe<ClientDeletedMetrics_Min_Order_By>;
};

/** input type for inserting array relation for remote table "clientDeletedMetrics" */
export type ClientDeletedMetrics_Arr_Rel_Insert_Input = {
  data: Array<ClientDeletedMetrics_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ClientDeletedMetrics_On_Conflict>;
};

/** Boolean expression to filter rows from the table "clientDeletedMetrics". All fields are combined with a logical 'AND'. */
export type ClientDeletedMetrics_Bool_Exp = {
  _and?: InputMaybe<Array<ClientDeletedMetrics_Bool_Exp>>;
  _not?: InputMaybe<ClientDeletedMetrics_Bool_Exp>;
  _or?: InputMaybe<Array<ClientDeletedMetrics_Bool_Exp>>;
  clientId?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  externalMetric?: InputMaybe<ExternalMetrics_Bool_Exp>;
  externalMetricId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "clientDeletedMetrics" */
export enum ClientDeletedMetrics_Constraint {
  /** unique or primary key constraint on columns "clientId", "externalMetricId" */
  ClientDeletedMetricsPkey = 'clientDeletedMetrics_pkey'
}

/** input type for inserting data into table "clientDeletedMetrics" */
export type ClientDeletedMetrics_Insert_Input = {
  clientId?: InputMaybe<Scalars['String']>;
  externalMetric?: InputMaybe<ExternalMetrics_Obj_Rel_Insert_Input>;
  externalMetricId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "clientDeletedMetrics" */
export type ClientDeletedMetrics_Max_Order_By = {
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "clientDeletedMetrics" */
export type ClientDeletedMetrics_Min_Order_By = {
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "clientDeletedMetrics" */
export type ClientDeletedMetrics_Mutation_Response = {
  __typename?: 'clientDeletedMetrics_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ClientDeletedMetrics>;
};

/** on_conflict condition type for table "clientDeletedMetrics" */
export type ClientDeletedMetrics_On_Conflict = {
  constraint: ClientDeletedMetrics_Constraint;
  update_columns?: Array<ClientDeletedMetrics_Update_Column>;
  where?: InputMaybe<ClientDeletedMetrics_Bool_Exp>;
};

/** Ordering options when selecting data from "clientDeletedMetrics". */
export type ClientDeletedMetrics_Order_By = {
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalMetric?: InputMaybe<ExternalMetrics_Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: clientDeletedMetrics */
export type ClientDeletedMetrics_Pk_Columns_Input = {
  clientId: Scalars['String'];
  externalMetricId: Scalars['uuid'];
};

/** select columns of table "clientDeletedMetrics" */
export enum ClientDeletedMetrics_Select_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExternalMetricId = 'externalMetricId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "clientDeletedMetrics" */
export type ClientDeletedMetrics_Set_Input = {
  clientId?: InputMaybe<Scalars['String']>;
  externalMetricId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "clientDeletedMetrics" */
export enum ClientDeletedMetrics_Update_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  ExternalMetricId = 'externalMetricId'
}

/** columns and relationships of "companies" */
export type Companies = {
  __typename?: 'companies';
  /** An array relationship */
  apiTokens: Array<ApiTokens>;
  /** An object relationship */
  companyDatabasis?: Maybe<CompanyDatabases>;
  /** An array relationship */
  companyIntegrations: Array<CompanyIntegrations>;
  /** An object relationship */
  companyRedi?: Maybe<CompanyRedis>;
  /** An array relationship */
  companyRedis: Array<CompanyRedis>;
  /** An array relationship */
  companyRlsFilters: Array<CompanyRlsFilters>;
  /** An array relationship */
  companyRoles: Array<CompanyRoles>;
  /** An object relationship */
  companySubsetTable?: Maybe<CompanySubsetTables>;
  /** An array relationship */
  companySubsetTables: Array<CompanySubsetTables>;
  /** An array relationship */
  companyWorkspaces: Array<CompanyWorkspaces>;
  /** An array relationship */
  dashboards: Array<Dashboards>;
  /** An array relationship */
  dataModels: Array<DataModels>;
  defaultTheme?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  demoTheme?: Maybe<DemoTheme>;
  /** An array relationship */
  externalDashboardThemes: Array<ExternalDashboardThemes>;
  /** An array relationship */
  externalDashboards: Array<ExternalDashboards>;
  /** An array relationship */
  externalDatasets: Array<ExternalDatasets>;
  /** An array relationship */
  externalMetrics: Array<ExternalMetrics>;
  /** An array relationship */
  guestTokens: Array<GuestTokens>;
  id: Scalars['uuid'];
  isOnboarded: Scalars['Boolean'];
  isaTester: Scalars['Boolean'];
  /** An array relationship */
  metrics: Array<Metrics>;
  name: Scalars['String'];
  /** An object relationship */
  organization?: Maybe<Organizations>;
  /** An array relationship */
  organizations: Array<Organizations>;
  /** An array relationship */
  secrets: Array<Secrets>;
  /** An object relationship */
  sharingSetting?: Maybe<SharingSettings>;
  tenancyLevel: Scalars['String'];
  /** An object relationship */
  theme?: Maybe<Themes>;
  /** An object relationship */
  themeByDefaulttheme?: Maybe<Themes>;
  /** An array relationship */
  themes: Array<Themes>;
  /** An array relationship */
  users: Array<Users>;
  website: Scalars['String'];
  /** An object relationship */
  whitelistedDomain?: Maybe<WhitelistedDomains>;
  workspaceId?: Maybe<Scalars['String']>;
};


/** columns and relationships of "companies" */
export type CompaniesApiTokensArgs = {
  distinct_on?: InputMaybe<Array<ApiTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ApiTokens_Order_By>>;
  where?: InputMaybe<ApiTokens_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesCompanyIntegrationsArgs = {
  distinct_on?: InputMaybe<Array<CompanyIntegrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyIntegrations_Order_By>>;
  where?: InputMaybe<CompanyIntegrations_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesCompanyRedisArgs = {
  distinct_on?: InputMaybe<Array<CompanyRedis_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyRedis_Order_By>>;
  where?: InputMaybe<CompanyRedis_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesCompanyRlsFiltersArgs = {
  distinct_on?: InputMaybe<Array<CompanyRlsFilters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyRlsFilters_Order_By>>;
  where?: InputMaybe<CompanyRlsFilters_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesCompanyRolesArgs = {
  distinct_on?: InputMaybe<Array<CompanyRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyRoles_Order_By>>;
  where?: InputMaybe<CompanyRoles_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesCompanySubsetTablesArgs = {
  distinct_on?: InputMaybe<Array<CompanySubsetTables_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanySubsetTables_Order_By>>;
  where?: InputMaybe<CompanySubsetTables_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesCompanyWorkspacesArgs = {
  distinct_on?: InputMaybe<Array<CompanyWorkspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyWorkspaces_Order_By>>;
  where?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesDashboardsArgs = {
  distinct_on?: InputMaybe<Array<Dashboards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dashboards_Order_By>>;
  where?: InputMaybe<Dashboards_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesDataModelsArgs = {
  distinct_on?: InputMaybe<Array<DataModels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DataModels_Order_By>>;
  where?: InputMaybe<DataModels_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesExternalDashboardThemesArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboardThemes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboardThemes_Order_By>>;
  where?: InputMaybe<ExternalDashboardThemes_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesExternalDashboardsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboards_Order_By>>;
  where?: InputMaybe<ExternalDashboards_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesExternalDatasetsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDatasets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDatasets_Order_By>>;
  where?: InputMaybe<ExternalDatasets_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesExternalMetricsArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetrics_Order_By>>;
  where?: InputMaybe<ExternalMetrics_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesGuestTokensArgs = {
  distinct_on?: InputMaybe<Array<GuestTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuestTokens_Order_By>>;
  where?: InputMaybe<GuestTokens_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesMetricsArgs = {
  distinct_on?: InputMaybe<Array<Metrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Metrics_Order_By>>;
  where?: InputMaybe<Metrics_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesSecretsArgs = {
  distinct_on?: InputMaybe<Array<Secrets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Secrets_Order_By>>;
  where?: InputMaybe<Secrets_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesThemesArgs = {
  distinct_on?: InputMaybe<Array<Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Themes_Order_By>>;
  where?: InputMaybe<Themes_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** order by aggregate values of table "companies" */
export type Companies_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Companies_Max_Order_By>;
  min?: InputMaybe<Companies_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "companies". All fields are combined with a logical 'AND'. */
export type Companies_Bool_Exp = {
  _and?: InputMaybe<Array<Companies_Bool_Exp>>;
  _not?: InputMaybe<Companies_Bool_Exp>;
  _or?: InputMaybe<Array<Companies_Bool_Exp>>;
  apiTokens?: InputMaybe<ApiTokens_Bool_Exp>;
  companyDatabasis?: InputMaybe<CompanyDatabases_Bool_Exp>;
  companyIntegrations?: InputMaybe<CompanyIntegrations_Bool_Exp>;
  companyRedi?: InputMaybe<CompanyRedis_Bool_Exp>;
  companyRedis?: InputMaybe<CompanyRedis_Bool_Exp>;
  companyRlsFilters?: InputMaybe<CompanyRlsFilters_Bool_Exp>;
  companyRoles?: InputMaybe<CompanyRoles_Bool_Exp>;
  companySubsetTable?: InputMaybe<CompanySubsetTables_Bool_Exp>;
  companySubsetTables?: InputMaybe<CompanySubsetTables_Bool_Exp>;
  companyWorkspaces?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  dashboards?: InputMaybe<Dashboards_Bool_Exp>;
  dataModels?: InputMaybe<DataModels_Bool_Exp>;
  defaultTheme?: InputMaybe<Uuid_Comparison_Exp>;
  demoTheme?: InputMaybe<DemoTheme_Bool_Exp>;
  externalDashboardThemes?: InputMaybe<ExternalDashboardThemes_Bool_Exp>;
  externalDashboards?: InputMaybe<ExternalDashboards_Bool_Exp>;
  externalDatasets?: InputMaybe<ExternalDatasets_Bool_Exp>;
  externalMetrics?: InputMaybe<ExternalMetrics_Bool_Exp>;
  guestTokens?: InputMaybe<GuestTokens_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isOnboarded?: InputMaybe<Boolean_Comparison_Exp>;
  isaTester?: InputMaybe<Boolean_Comparison_Exp>;
  metrics?: InputMaybe<Metrics_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organizations?: InputMaybe<Organizations_Bool_Exp>;
  secrets?: InputMaybe<Secrets_Bool_Exp>;
  sharingSetting?: InputMaybe<SharingSettings_Bool_Exp>;
  tenancyLevel?: InputMaybe<String_Comparison_Exp>;
  theme?: InputMaybe<Themes_Bool_Exp>;
  themeByDefaulttheme?: InputMaybe<Themes_Bool_Exp>;
  themes?: InputMaybe<Themes_Bool_Exp>;
  users?: InputMaybe<Users_Bool_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
  whitelistedDomain?: InputMaybe<WhitelistedDomains_Bool_Exp>;
  workspaceId?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "companies" */
export type Companies_Max_Order_By = {
  defaultTheme?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  tenancyLevel?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "companies" */
export type Companies_Min_Order_By = {
  defaultTheme?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  tenancyLevel?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "companies" */
export type Companies_Mutation_Response = {
  __typename?: 'companies_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Companies>;
};

/** Ordering options when selecting data from "companies". */
export type Companies_Order_By = {
  apiTokens_aggregate?: InputMaybe<ApiTokens_Aggregate_Order_By>;
  companyDatabasis?: InputMaybe<CompanyDatabases_Order_By>;
  companyIntegrations_aggregate?: InputMaybe<CompanyIntegrations_Aggregate_Order_By>;
  companyRedi?: InputMaybe<CompanyRedis_Order_By>;
  companyRedis_aggregate?: InputMaybe<CompanyRedis_Aggregate_Order_By>;
  companyRlsFilters_aggregate?: InputMaybe<CompanyRlsFilters_Aggregate_Order_By>;
  companyRoles_aggregate?: InputMaybe<CompanyRoles_Aggregate_Order_By>;
  companySubsetTable?: InputMaybe<CompanySubsetTables_Order_By>;
  companySubsetTables_aggregate?: InputMaybe<CompanySubsetTables_Aggregate_Order_By>;
  companyWorkspaces_aggregate?: InputMaybe<CompanyWorkspaces_Aggregate_Order_By>;
  dashboards_aggregate?: InputMaybe<Dashboards_Aggregate_Order_By>;
  dataModels_aggregate?: InputMaybe<DataModels_Aggregate_Order_By>;
  defaultTheme?: InputMaybe<Order_By>;
  demoTheme?: InputMaybe<DemoTheme_Order_By>;
  externalDashboardThemes_aggregate?: InputMaybe<ExternalDashboardThemes_Aggregate_Order_By>;
  externalDashboards_aggregate?: InputMaybe<ExternalDashboards_Aggregate_Order_By>;
  externalDatasets_aggregate?: InputMaybe<ExternalDatasets_Aggregate_Order_By>;
  externalMetrics_aggregate?: InputMaybe<ExternalMetrics_Aggregate_Order_By>;
  guestTokens_aggregate?: InputMaybe<GuestTokens_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  isOnboarded?: InputMaybe<Order_By>;
  isaTester?: InputMaybe<Order_By>;
  metrics_aggregate?: InputMaybe<Metrics_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organizations_aggregate?: InputMaybe<Organizations_Aggregate_Order_By>;
  secrets_aggregate?: InputMaybe<Secrets_Aggregate_Order_By>;
  sharingSetting?: InputMaybe<SharingSettings_Order_By>;
  tenancyLevel?: InputMaybe<Order_By>;
  theme?: InputMaybe<Themes_Order_By>;
  themeByDefaulttheme?: InputMaybe<Themes_Order_By>;
  themes_aggregate?: InputMaybe<Themes_Aggregate_Order_By>;
  users_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
  website?: InputMaybe<Order_By>;
  whitelistedDomain?: InputMaybe<WhitelistedDomains_Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: companies */
export type Companies_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "companies" */
export enum Companies_Select_Column {
  /** column name */
  DefaultTheme = 'defaultTheme',
  /** column name */
  Id = 'id',
  /** column name */
  IsOnboarded = 'isOnboarded',
  /** column name */
  IsaTester = 'isaTester',
  /** column name */
  Name = 'name',
  /** column name */
  TenancyLevel = 'tenancyLevel',
  /** column name */
  Website = 'website',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "companies" */
export type Companies_Set_Input = {
  defaultTheme?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  isOnboarded?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  tenancyLevel?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** companies dataware house schema by workspace */
export type CompanyCacheSchemas = {
  __typename?: 'companyCacheSchemas';
  companyId: Scalars['String'];
  /** An object relationship */
  companyWorkspace: CompanyWorkspaces;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  schema: Scalars['jsonb'];
  updatedAt: Scalars['timestamptz'];
  workspaceId: Scalars['uuid'];
};


/** companies dataware house schema by workspace */
export type CompanyCacheSchemasSchemaArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "companyCacheSchemas" */
export type CompanyCacheSchemas_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CompanyCacheSchemas_Max_Order_By>;
  min?: InputMaybe<CompanyCacheSchemas_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type CompanyCacheSchemas_Append_Input = {
  schema?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "companyCacheSchemas" */
export type CompanyCacheSchemas_Arr_Rel_Insert_Input = {
  data: Array<CompanyCacheSchemas_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<CompanyCacheSchemas_On_Conflict>;
};

/** Boolean expression to filter rows from the table "companyCacheSchemas". All fields are combined with a logical 'AND'. */
export type CompanyCacheSchemas_Bool_Exp = {
  _and?: InputMaybe<Array<CompanyCacheSchemas_Bool_Exp>>;
  _not?: InputMaybe<CompanyCacheSchemas_Bool_Exp>;
  _or?: InputMaybe<Array<CompanyCacheSchemas_Bool_Exp>>;
  companyId?: InputMaybe<String_Comparison_Exp>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  schema?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "companyCacheSchemas" */
export enum CompanyCacheSchemas_Constraint {
  /** unique or primary key constraint on columns "id" */
  CompanyCacheSchemasPkey = 'companyCacheSchemas_pkey',
  /** unique or primary key constraint on columns "workspaceId" */
  CompanyCacheSchemasWorkspaceIdKey = 'companyCacheSchemas_workspaceId_key',
  /** unique or primary key constraint on columns "workspaceId" */
  CompanyCacheSchemasWorkspaceKey = 'companyCacheSchemas_workspace_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type CompanyCacheSchemas_Delete_At_Path_Input = {
  schema?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type CompanyCacheSchemas_Delete_Elem_Input = {
  schema?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type CompanyCacheSchemas_Delete_Key_Input = {
  schema?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "companyCacheSchemas" */
export type CompanyCacheSchemas_Insert_Input = {
  companyId?: InputMaybe<Scalars['String']>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  schema?: InputMaybe<Scalars['jsonb']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "companyCacheSchemas" */
export type CompanyCacheSchemas_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "companyCacheSchemas" */
export type CompanyCacheSchemas_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "companyCacheSchemas" */
export type CompanyCacheSchemas_Mutation_Response = {
  __typename?: 'companyCacheSchemas_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CompanyCacheSchemas>;
};

/** input type for inserting object relation for remote table "companyCacheSchemas" */
export type CompanyCacheSchemas_Obj_Rel_Insert_Input = {
  data: CompanyCacheSchemas_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<CompanyCacheSchemas_On_Conflict>;
};

/** on_conflict condition type for table "companyCacheSchemas" */
export type CompanyCacheSchemas_On_Conflict = {
  constraint: CompanyCacheSchemas_Constraint;
  update_columns?: Array<CompanyCacheSchemas_Update_Column>;
  where?: InputMaybe<CompanyCacheSchemas_Bool_Exp>;
};

/** Ordering options when selecting data from "companyCacheSchemas". */
export type CompanyCacheSchemas_Order_By = {
  companyId?: InputMaybe<Order_By>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  schema?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: companyCacheSchemas */
export type CompanyCacheSchemas_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type CompanyCacheSchemas_Prepend_Input = {
  schema?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "companyCacheSchemas" */
export enum CompanyCacheSchemas_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Schema = 'schema',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "companyCacheSchemas" */
export type CompanyCacheSchemas_Set_Input = {
  companyId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  schema?: InputMaybe<Scalars['jsonb']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "companyCacheSchemas" */
export enum CompanyCacheSchemas_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Id = 'id',
  /** column name */
  Schema = 'schema',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** list of selected organization databases  */
export type CompanyDatabases = {
  __typename?: 'companyDatabases';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  databaseList: Scalars['json'];
  updatedAt: Scalars['timestamptz'];
  workspaceId: Scalars['uuid'];
};


/** list of selected organization databases  */
export type CompanyDatabasesDatabaseListArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "companyDatabases". All fields are combined with a logical 'AND'. */
export type CompanyDatabases_Bool_Exp = {
  _and?: InputMaybe<Array<CompanyDatabases_Bool_Exp>>;
  _not?: InputMaybe<CompanyDatabases_Bool_Exp>;
  _or?: InputMaybe<Array<CompanyDatabases_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  databaseList?: InputMaybe<Json_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "companyDatabases" */
export enum CompanyDatabases_Constraint {
  /** unique or primary key constraint on columns "companyId" */
  CompanyDatabasesPkey = 'companyDatabases_pkey'
}

/** input type for inserting data into table "companyDatabases" */
export type CompanyDatabases_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  databaseList?: InputMaybe<Scalars['json']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** response of any mutation on the table "companyDatabases" */
export type CompanyDatabases_Mutation_Response = {
  __typename?: 'companyDatabases_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CompanyDatabases>;
};

/** on_conflict condition type for table "companyDatabases" */
export type CompanyDatabases_On_Conflict = {
  constraint: CompanyDatabases_Constraint;
  update_columns?: Array<CompanyDatabases_Update_Column>;
  where?: InputMaybe<CompanyDatabases_Bool_Exp>;
};

/** Ordering options when selecting data from "companyDatabases". */
export type CompanyDatabases_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  databaseList?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: companyDatabases */
export type CompanyDatabases_Pk_Columns_Input = {
  companyId: Scalars['uuid'];
};

/** select columns of table "companyDatabases" */
export enum CompanyDatabases_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DatabaseList = 'databaseList',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "companyDatabases" */
export type CompanyDatabases_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  databaseList?: InputMaybe<Scalars['json']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "companyDatabases" */
export enum CompanyDatabases_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  DatabaseList = 'databaseList',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** columns and relationships of "companyIntegrations" */
export type CompanyIntegrations = {
  __typename?: 'companyIntegrations';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  /** An object relationship */
  companyWorkspace: CompanyWorkspaces;
  createdAt: Scalars['timestamptz'];
  credentials: Scalars['jsonb'];
  /** An array relationship */
  customSqlColumns: Array<CustomSqlColumns>;
  /** An array relationship */
  externalMetrics: Array<ExternalMetrics>;
  id: Scalars['uuid'];
  /** connected source or destination id */
  integrationId: Scalars['uuid'];
  isAuthenticated: Scalars['Boolean'];
  isEncrypted: Scalars['Boolean'];
  /** An array relationship */
  metrics: Array<Metrics>;
  name: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  workspaceId: Scalars['uuid'];
};


/** columns and relationships of "companyIntegrations" */
export type CompanyIntegrationsCredentialsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "companyIntegrations" */
export type CompanyIntegrationsCustomSqlColumnsArgs = {
  distinct_on?: InputMaybe<Array<CustomSqlColumns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CustomSqlColumns_Order_By>>;
  where?: InputMaybe<CustomSqlColumns_Bool_Exp>;
};


/** columns and relationships of "companyIntegrations" */
export type CompanyIntegrationsExternalMetricsArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetrics_Order_By>>;
  where?: InputMaybe<ExternalMetrics_Bool_Exp>;
};


/** columns and relationships of "companyIntegrations" */
export type CompanyIntegrationsMetricsArgs = {
  distinct_on?: InputMaybe<Array<Metrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Metrics_Order_By>>;
  where?: InputMaybe<Metrics_Bool_Exp>;
};

/** order by aggregate values of table "companyIntegrations" */
export type CompanyIntegrations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CompanyIntegrations_Max_Order_By>;
  min?: InputMaybe<CompanyIntegrations_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type CompanyIntegrations_Append_Input = {
  credentials?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "companyIntegrations" */
export type CompanyIntegrations_Arr_Rel_Insert_Input = {
  data: Array<CompanyIntegrations_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<CompanyIntegrations_On_Conflict>;
};

/** Boolean expression to filter rows from the table "companyIntegrations". All fields are combined with a logical 'AND'. */
export type CompanyIntegrations_Bool_Exp = {
  _and?: InputMaybe<Array<CompanyIntegrations_Bool_Exp>>;
  _not?: InputMaybe<CompanyIntegrations_Bool_Exp>;
  _or?: InputMaybe<Array<CompanyIntegrations_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  credentials?: InputMaybe<Jsonb_Comparison_Exp>;
  customSqlColumns?: InputMaybe<CustomSqlColumns_Bool_Exp>;
  externalMetrics?: InputMaybe<ExternalMetrics_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  integrationId?: InputMaybe<Uuid_Comparison_Exp>;
  isAuthenticated?: InputMaybe<Boolean_Comparison_Exp>;
  isEncrypted?: InputMaybe<Boolean_Comparison_Exp>;
  metrics?: InputMaybe<Metrics_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "companyIntegrations" */
export enum CompanyIntegrations_Constraint {
  /** unique or primary key constraint on columns "id" */
  CompanyIntegrationsPkey = 'companyIntegrations_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type CompanyIntegrations_Delete_At_Path_Input = {
  credentials?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type CompanyIntegrations_Delete_Elem_Input = {
  credentials?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type CompanyIntegrations_Delete_Key_Input = {
  credentials?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "companyIntegrations" */
export type CompanyIntegrations_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  credentials?: InputMaybe<Scalars['jsonb']>;
  customSqlColumns?: InputMaybe<CustomSqlColumns_Arr_Rel_Insert_Input>;
  externalMetrics?: InputMaybe<ExternalMetrics_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  /** connected source or destination id */
  integrationId?: InputMaybe<Scalars['uuid']>;
  isAuthenticated?: InputMaybe<Scalars['Boolean']>;
  isEncrypted?: InputMaybe<Scalars['Boolean']>;
  metrics?: InputMaybe<Metrics_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "companyIntegrations" */
export type CompanyIntegrations_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** connected source or destination id */
  integrationId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "companyIntegrations" */
export type CompanyIntegrations_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** connected source or destination id */
  integrationId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "companyIntegrations" */
export type CompanyIntegrations_Mutation_Response = {
  __typename?: 'companyIntegrations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CompanyIntegrations>;
};

/** input type for inserting object relation for remote table "companyIntegrations" */
export type CompanyIntegrations_Obj_Rel_Insert_Input = {
  data: CompanyIntegrations_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<CompanyIntegrations_On_Conflict>;
};

/** on_conflict condition type for table "companyIntegrations" */
export type CompanyIntegrations_On_Conflict = {
  constraint: CompanyIntegrations_Constraint;
  update_columns?: Array<CompanyIntegrations_Update_Column>;
  where?: InputMaybe<CompanyIntegrations_Bool_Exp>;
};

/** Ordering options when selecting data from "companyIntegrations". */
export type CompanyIntegrations_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  credentials?: InputMaybe<Order_By>;
  customSqlColumns_aggregate?: InputMaybe<CustomSqlColumns_Aggregate_Order_By>;
  externalMetrics_aggregate?: InputMaybe<ExternalMetrics_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  integrationId?: InputMaybe<Order_By>;
  isAuthenticated?: InputMaybe<Order_By>;
  isEncrypted?: InputMaybe<Order_By>;
  metrics_aggregate?: InputMaybe<Metrics_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: companyIntegrations */
export type CompanyIntegrations_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type CompanyIntegrations_Prepend_Input = {
  credentials?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "companyIntegrations" */
export enum CompanyIntegrations_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Credentials = 'credentials',
  /** column name */
  Id = 'id',
  /** column name */
  IntegrationId = 'integrationId',
  /** column name */
  IsAuthenticated = 'isAuthenticated',
  /** column name */
  IsEncrypted = 'isEncrypted',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "companyIntegrations" */
export type CompanyIntegrations_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  credentials?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  /** connected source or destination id */
  integrationId?: InputMaybe<Scalars['uuid']>;
  isAuthenticated?: InputMaybe<Scalars['Boolean']>;
  isEncrypted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "companyIntegrations" */
export enum CompanyIntegrations_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Credentials = 'credentials',
  /** column name */
  Id = 'id',
  /** column name */
  IntegrationId = 'integrationId',
  /** column name */
  IsAuthenticated = 'isAuthenticated',
  /** column name */
  IsEncrypted = 'isEncrypted',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** redis credentials of company */
export type CompanyRedis = {
  __typename?: 'companyRedis';
  /** An object relationship */
  company: Companies;
  /** An object relationship */
  companyWorkspace: CompanyWorkspaces;
  expire: Scalars['Int'];
  host: Scalars['String'];
  id: Scalars['uuid'];
  isDatabrainCache: Scalars['Boolean'];
  isEnabled: Scalars['Boolean'];
  password: Scalars['String'];
  port: Scalars['Int'];
  workspaceId: Scalars['uuid'];
};

/** order by aggregate values of table "companyRedis" */
export type CompanyRedis_Aggregate_Order_By = {
  avg?: InputMaybe<CompanyRedis_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CompanyRedis_Max_Order_By>;
  min?: InputMaybe<CompanyRedis_Min_Order_By>;
  stddev?: InputMaybe<CompanyRedis_Stddev_Order_By>;
  stddev_pop?: InputMaybe<CompanyRedis_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<CompanyRedis_Stddev_Samp_Order_By>;
  sum?: InputMaybe<CompanyRedis_Sum_Order_By>;
  var_pop?: InputMaybe<CompanyRedis_Var_Pop_Order_By>;
  var_samp?: InputMaybe<CompanyRedis_Var_Samp_Order_By>;
  variance?: InputMaybe<CompanyRedis_Variance_Order_By>;
};

/** order by avg() on columns of table "companyRedis" */
export type CompanyRedis_Avg_Order_By = {
  expire?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "companyRedis". All fields are combined with a logical 'AND'. */
export type CompanyRedis_Bool_Exp = {
  _and?: InputMaybe<Array<CompanyRedis_Bool_Exp>>;
  _not?: InputMaybe<CompanyRedis_Bool_Exp>;
  _or?: InputMaybe<Array<CompanyRedis_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  expire?: InputMaybe<Int_Comparison_Exp>;
  host?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isDatabrainCache?: InputMaybe<Boolean_Comparison_Exp>;
  isEnabled?: InputMaybe<Boolean_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  port?: InputMaybe<Int_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "companyRedis" */
export enum CompanyRedis_Constraint {
  /** unique or primary key constraint on columns "workspaceId" */
  CompanyRedisPkey = 'companyRedis_pkey'
}

/** input type for incrementing numeric columns in table "companyRedis" */
export type CompanyRedis_Inc_Input = {
  expire?: InputMaybe<Scalars['Int']>;
  port?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "companyRedis" */
export type CompanyRedis_Insert_Input = {
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Obj_Rel_Insert_Input>;
  expire?: InputMaybe<Scalars['Int']>;
  host?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  isDatabrainCache?: InputMaybe<Scalars['Boolean']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['Int']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "companyRedis" */
export type CompanyRedis_Max_Order_By = {
  expire?: InputMaybe<Order_By>;
  host?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "companyRedis" */
export type CompanyRedis_Min_Order_By = {
  expire?: InputMaybe<Order_By>;
  host?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "companyRedis" */
export type CompanyRedis_Mutation_Response = {
  __typename?: 'companyRedis_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CompanyRedis>;
};

/** input type for inserting object relation for remote table "companyRedis" */
export type CompanyRedis_Obj_Rel_Insert_Input = {
  data: CompanyRedis_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<CompanyRedis_On_Conflict>;
};

/** on_conflict condition type for table "companyRedis" */
export type CompanyRedis_On_Conflict = {
  constraint: CompanyRedis_Constraint;
  update_columns?: Array<CompanyRedis_Update_Column>;
  where?: InputMaybe<CompanyRedis_Bool_Exp>;
};

/** Ordering options when selecting data from "companyRedis". */
export type CompanyRedis_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Order_By>;
  expire?: InputMaybe<Order_By>;
  host?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isDatabrainCache?: InputMaybe<Order_By>;
  isEnabled?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: companyRedis */
export type CompanyRedis_Pk_Columns_Input = {
  workspaceId: Scalars['uuid'];
};

/** select columns of table "companyRedis" */
export enum CompanyRedis_Select_Column {
  /** column name */
  Expire = 'expire',
  /** column name */
  Host = 'host',
  /** column name */
  Id = 'id',
  /** column name */
  IsDatabrainCache = 'isDatabrainCache',
  /** column name */
  IsEnabled = 'isEnabled',
  /** column name */
  Password = 'password',
  /** column name */
  Port = 'port',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "companyRedis" */
export type CompanyRedis_Set_Input = {
  expire?: InputMaybe<Scalars['Int']>;
  host?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  isDatabrainCache?: InputMaybe<Scalars['Boolean']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['Int']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by stddev() on columns of table "companyRedis" */
export type CompanyRedis_Stddev_Order_By = {
  expire?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "companyRedis" */
export type CompanyRedis_Stddev_Pop_Order_By = {
  expire?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "companyRedis" */
export type CompanyRedis_Stddev_Samp_Order_By = {
  expire?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "companyRedis" */
export type CompanyRedis_Sum_Order_By = {
  expire?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
};

/** update columns of table "companyRedis" */
export enum CompanyRedis_Update_Column {
  /** column name */
  Expire = 'expire',
  /** column name */
  Host = 'host',
  /** column name */
  Id = 'id',
  /** column name */
  IsDatabrainCache = 'isDatabrainCache',
  /** column name */
  IsEnabled = 'isEnabled',
  /** column name */
  Password = 'password',
  /** column name */
  Port = 'port',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** order by var_pop() on columns of table "companyRedis" */
export type CompanyRedis_Var_Pop_Order_By = {
  expire?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "companyRedis" */
export type CompanyRedis_Var_Samp_Order_By = {
  expire?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "companyRedis" */
export type CompanyRedis_Variance_Order_By = {
  expire?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
};

/** filters by companyId */
export type CompanyRlsFilters = {
  __typename?: 'companyRlsFilters';
  columnName: Scalars['String'];
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  condition: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  defaultValue?: Maybe<Scalars['String']>;
  /** An array relationship */
  externalMetricsRlsFilters: Array<ExternalMetricsRlsFilters>;
  id: Scalars['uuid'];
  /** An object relationship */
  invited: Users;
  name: Scalars['String'];
  tableName: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  userId: Scalars['uuid'];
  workspaceId: Scalars['uuid'];
};


/** filters by companyId */
export type CompanyRlsFiltersExternalMetricsRlsFiltersArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetricsRlsFilters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetricsRlsFilters_Order_By>>;
  where?: InputMaybe<ExternalMetricsRlsFilters_Bool_Exp>;
};

/** order by aggregate values of table "companyRlsFilters" */
export type CompanyRlsFilters_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CompanyRlsFilters_Max_Order_By>;
  min?: InputMaybe<CompanyRlsFilters_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "companyRlsFilters". All fields are combined with a logical 'AND'. */
export type CompanyRlsFilters_Bool_Exp = {
  _and?: InputMaybe<Array<CompanyRlsFilters_Bool_Exp>>;
  _not?: InputMaybe<CompanyRlsFilters_Bool_Exp>;
  _or?: InputMaybe<Array<CompanyRlsFilters_Bool_Exp>>;
  columnName?: InputMaybe<String_Comparison_Exp>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  condition?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  defaultValue?: InputMaybe<String_Comparison_Exp>;
  externalMetricsRlsFilters?: InputMaybe<ExternalMetricsRlsFilters_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invited?: InputMaybe<Users_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  tableName?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "companyRlsFilters" */
export enum CompanyRlsFilters_Constraint {
  /** unique or primary key constraint on columns "id" */
  CompanyRlsFiltersPkey = 'companyRlsFilters_pkey'
}

/** input type for inserting data into table "companyRlsFilters" */
export type CompanyRlsFilters_Insert_Input = {
  columnName?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  condition?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  defaultValue?: InputMaybe<Scalars['String']>;
  externalMetricsRlsFilters?: InputMaybe<ExternalMetricsRlsFilters_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  tableName?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "companyRlsFilters" */
export type CompanyRlsFilters_Max_Order_By = {
  columnName?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  condition?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  defaultValue?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "companyRlsFilters" */
export type CompanyRlsFilters_Min_Order_By = {
  columnName?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  condition?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  defaultValue?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "companyRlsFilters" */
export type CompanyRlsFilters_Mutation_Response = {
  __typename?: 'companyRlsFilters_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CompanyRlsFilters>;
};

/** input type for inserting object relation for remote table "companyRlsFilters" */
export type CompanyRlsFilters_Obj_Rel_Insert_Input = {
  data: CompanyRlsFilters_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<CompanyRlsFilters_On_Conflict>;
};

/** on_conflict condition type for table "companyRlsFilters" */
export type CompanyRlsFilters_On_Conflict = {
  constraint: CompanyRlsFilters_Constraint;
  update_columns?: Array<CompanyRlsFilters_Update_Column>;
  where?: InputMaybe<CompanyRlsFilters_Bool_Exp>;
};

/** Ordering options when selecting data from "companyRlsFilters". */
export type CompanyRlsFilters_Order_By = {
  columnName?: InputMaybe<Order_By>;
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  condition?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  defaultValue?: InputMaybe<Order_By>;
  externalMetricsRlsFilters_aggregate?: InputMaybe<ExternalMetricsRlsFilters_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  invited?: InputMaybe<Users_Order_By>;
  name?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: companyRlsFilters */
export type CompanyRlsFilters_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "companyRlsFilters" */
export enum CompanyRlsFilters_Select_Column {
  /** column name */
  ColumnName = 'columnName',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Condition = 'condition',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DefaultValue = 'defaultValue',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  TableName = 'tableName',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "companyRlsFilters" */
export type CompanyRlsFilters_Set_Input = {
  columnName?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  condition?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  defaultValue?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  tableName?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "companyRlsFilters" */
export enum CompanyRlsFilters_Update_Column {
  /** column name */
  ColumnName = 'columnName',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Condition = 'condition',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DefaultValue = 'defaultValue',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  TableName = 'tableName',
  /** column name */
  UserId = 'userId',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** Roles a user can have within the company to access features. */
export type CompanyRoles = {
  __typename?: 'companyRoles';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  permissions: Scalars['jsonb'];
  updatedAt: Scalars['timestamptz'];
  /** An array relationship */
  userRoles: Array<UserRoles>;
};


/** Roles a user can have within the company to access features. */
export type CompanyRolesPermissionsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** Roles a user can have within the company to access features. */
export type CompanyRolesUserRolesArgs = {
  distinct_on?: InputMaybe<Array<UserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserRoles_Order_By>>;
  where?: InputMaybe<UserRoles_Bool_Exp>;
};

/** order by aggregate values of table "companyRoles" */
export type CompanyRoles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CompanyRoles_Max_Order_By>;
  min?: InputMaybe<CompanyRoles_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type CompanyRoles_Append_Input = {
  permissions?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "companyRoles". All fields are combined with a logical 'AND'. */
export type CompanyRoles_Bool_Exp = {
  _and?: InputMaybe<Array<CompanyRoles_Bool_Exp>>;
  _not?: InputMaybe<CompanyRoles_Bool_Exp>;
  _or?: InputMaybe<Array<CompanyRoles_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  permissions?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userRoles?: InputMaybe<UserRoles_Bool_Exp>;
};

/** unique or primary key constraints on table "companyRoles" */
export enum CompanyRoles_Constraint {
  /** unique or primary key constraint on columns "companyId", "name" */
  CompanyRolesNameCompanyIdKey = 'companyRoles_name_companyId_key',
  /** unique or primary key constraint on columns "id" */
  CompanyRolesPkey = 'companyRoles_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type CompanyRoles_Delete_At_Path_Input = {
  permissions?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type CompanyRoles_Delete_Elem_Input = {
  permissions?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type CompanyRoles_Delete_Key_Input = {
  permissions?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "companyRoles" */
export type CompanyRoles_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Scalars['jsonb']>;
  userRoles?: InputMaybe<UserRoles_Arr_Rel_Insert_Input>;
};

/** order by max() on columns of table "companyRoles" */
export type CompanyRoles_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "companyRoles" */
export type CompanyRoles_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "companyRoles" */
export type CompanyRoles_Mutation_Response = {
  __typename?: 'companyRoles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CompanyRoles>;
};

/** input type for inserting object relation for remote table "companyRoles" */
export type CompanyRoles_Obj_Rel_Insert_Input = {
  data: CompanyRoles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<CompanyRoles_On_Conflict>;
};

/** on_conflict condition type for table "companyRoles" */
export type CompanyRoles_On_Conflict = {
  constraint: CompanyRoles_Constraint;
  update_columns?: Array<CompanyRoles_Update_Column>;
  where?: InputMaybe<CompanyRoles_Bool_Exp>;
};

/** Ordering options when selecting data from "companyRoles". */
export type CompanyRoles_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  permissions?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userRoles_aggregate?: InputMaybe<UserRoles_Aggregate_Order_By>;
};

/** primary key columns input for table: companyRoles */
export type CompanyRoles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type CompanyRoles_Prepend_Input = {
  permissions?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "companyRoles" */
export enum CompanyRoles_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Permissions = 'permissions',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "companyRoles" */
export type CompanyRoles_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "companyRoles" */
export enum CompanyRoles_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Permissions = 'permissions'
}

export type CompanySubsetTableDataError = {
  __typename?: 'companySubsetTableDataError';
  message: Scalars['String'];
};

export type CompanySubsetTableDataInput = {
  clientId: Scalars['String'];
  companyId: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type CompanySubsetTableDataOutput = {
  __typename?: 'companySubsetTableDataOutput';
  companyIntegrationId?: Maybe<Scalars['String']>;
  dbName?: Maybe<Scalars['String']>;
  error?: Maybe<CompanySubsetTableDataError>;
  tableList?: Maybe<Array<Maybe<TableList>>>;
};

/** subset of tables of user database */
export type CompanySubsetTables = {
  __typename?: 'companySubsetTables';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  /** An object relationship */
  companyWorkspace: CompanyWorkspaces;
  id: Scalars['uuid'];
  isAllowChangeLayout: Scalars['Boolean'];
  isAllowEmailReports: Scalars['Boolean'];
  isAllowMetricCreation: Scalars['Boolean'];
  isAllowMetricDeletion: Scalars['Boolean'];
  isAllowMetricUpdation: Scalars['Boolean'];
  tableList: Scalars['jsonb'];
  workspaceId: Scalars['uuid'];
};


/** subset of tables of user database */
export type CompanySubsetTablesTableListArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "companySubsetTables" */
export type CompanySubsetTables_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CompanySubsetTables_Max_Order_By>;
  min?: InputMaybe<CompanySubsetTables_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type CompanySubsetTables_Append_Input = {
  tableList?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "companySubsetTables". All fields are combined with a logical 'AND'. */
export type CompanySubsetTables_Bool_Exp = {
  _and?: InputMaybe<Array<CompanySubsetTables_Bool_Exp>>;
  _not?: InputMaybe<CompanySubsetTables_Bool_Exp>;
  _or?: InputMaybe<Array<CompanySubsetTables_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isAllowChangeLayout?: InputMaybe<Boolean_Comparison_Exp>;
  isAllowEmailReports?: InputMaybe<Boolean_Comparison_Exp>;
  isAllowMetricCreation?: InputMaybe<Boolean_Comparison_Exp>;
  isAllowMetricDeletion?: InputMaybe<Boolean_Comparison_Exp>;
  isAllowMetricUpdation?: InputMaybe<Boolean_Comparison_Exp>;
  tableList?: InputMaybe<Jsonb_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "companySubsetTables" */
export enum CompanySubsetTables_Constraint {
  /** unique or primary key constraint on columns "id" */
  CompanySubsetTablesPkey = 'companySubsetTables_pkey',
  /** unique or primary key constraint on columns "workspaceId" */
  CompanySubsetTablesWorkspaceIdKey = 'companySubsetTables_workspaceId_key',
  /** unique or primary key constraint on columns "workspaceId" */
  CompanySubsetTablesWorkspaceIdKeyy = 'companySubsetTables_workspaceId_keyy'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type CompanySubsetTables_Delete_At_Path_Input = {
  tableList?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type CompanySubsetTables_Delete_Elem_Input = {
  tableList?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type CompanySubsetTables_Delete_Key_Input = {
  tableList?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "companySubsetTables" */
export type CompanySubsetTables_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  isAllowChangeLayout?: InputMaybe<Scalars['Boolean']>;
  isAllowEmailReports?: InputMaybe<Scalars['Boolean']>;
  isAllowMetricCreation?: InputMaybe<Scalars['Boolean']>;
  isAllowMetricDeletion?: InputMaybe<Scalars['Boolean']>;
  isAllowMetricUpdation?: InputMaybe<Scalars['Boolean']>;
  tableList?: InputMaybe<Scalars['jsonb']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "companySubsetTables" */
export type CompanySubsetTables_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "companySubsetTables" */
export type CompanySubsetTables_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "companySubsetTables" */
export type CompanySubsetTables_Mutation_Response = {
  __typename?: 'companySubsetTables_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CompanySubsetTables>;
};

/** input type for inserting object relation for remote table "companySubsetTables" */
export type CompanySubsetTables_Obj_Rel_Insert_Input = {
  data: CompanySubsetTables_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<CompanySubsetTables_On_Conflict>;
};

/** on_conflict condition type for table "companySubsetTables" */
export type CompanySubsetTables_On_Conflict = {
  constraint: CompanySubsetTables_Constraint;
  update_columns?: Array<CompanySubsetTables_Update_Column>;
  where?: InputMaybe<CompanySubsetTables_Bool_Exp>;
};

/** Ordering options when selecting data from "companySubsetTables". */
export type CompanySubsetTables_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Order_By>;
  id?: InputMaybe<Order_By>;
  isAllowChangeLayout?: InputMaybe<Order_By>;
  isAllowEmailReports?: InputMaybe<Order_By>;
  isAllowMetricCreation?: InputMaybe<Order_By>;
  isAllowMetricDeletion?: InputMaybe<Order_By>;
  isAllowMetricUpdation?: InputMaybe<Order_By>;
  tableList?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: companySubsetTables */
export type CompanySubsetTables_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type CompanySubsetTables_Prepend_Input = {
  tableList?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "companySubsetTables" */
export enum CompanySubsetTables_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Id = 'id',
  /** column name */
  IsAllowChangeLayout = 'isAllowChangeLayout',
  /** column name */
  IsAllowEmailReports = 'isAllowEmailReports',
  /** column name */
  IsAllowMetricCreation = 'isAllowMetricCreation',
  /** column name */
  IsAllowMetricDeletion = 'isAllowMetricDeletion',
  /** column name */
  IsAllowMetricUpdation = 'isAllowMetricUpdation',
  /** column name */
  TableList = 'tableList',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "companySubsetTables" */
export type CompanySubsetTables_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  isAllowChangeLayout?: InputMaybe<Scalars['Boolean']>;
  isAllowEmailReports?: InputMaybe<Scalars['Boolean']>;
  isAllowMetricCreation?: InputMaybe<Scalars['Boolean']>;
  isAllowMetricDeletion?: InputMaybe<Scalars['Boolean']>;
  isAllowMetricUpdation?: InputMaybe<Scalars['Boolean']>;
  tableList?: InputMaybe<Scalars['jsonb']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "companySubsetTables" */
export enum CompanySubsetTables_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Id = 'id',
  /** column name */
  IsAllowChangeLayout = 'isAllowChangeLayout',
  /** column name */
  IsAllowEmailReports = 'isAllowEmailReports',
  /** column name */
  IsAllowMetricCreation = 'isAllowMetricCreation',
  /** column name */
  IsAllowMetricDeletion = 'isAllowMetricDeletion',
  /** column name */
  IsAllowMetricUpdation = 'isAllowMetricUpdation',
  /** column name */
  TableList = 'tableList',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** columns and relationships of "companyWorkspaces" */
export type CompanyWorkspaces = {
  __typename?: 'companyWorkspaces';
  /** An object relationship */
  company: Companies;
  /** An object relationship */
  companyCacheSchema?: Maybe<CompanyCacheSchemas>;
  /** An array relationship */
  companyCacheSchemas: Array<CompanyCacheSchemas>;
  companyId: Scalars['uuid'];
  /** An array relationship */
  companyIntegrations: Array<CompanyIntegrations>;
  /** An object relationship */
  companyRedi?: Maybe<CompanyRedis>;
  /** An object relationship */
  companySubsetTable?: Maybe<CompanySubsetTables>;
  createdAt: Scalars['timestamptz'];
  creatorMode?: Maybe<CreatorModeEnums_Enum>;
  /** An array relationship */
  dataModels: Array<DataModels>;
  description: Scalars['String'];
  /** An array relationship */
  externalDashboards: Array<ExternalDashboards>;
  /** An array relationship */
  externalDatasets: Array<ExternalDatasets>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An object relationship */
  organization?: Maybe<Organizations>;
  rawCsvSettings: Scalars['jsonb'];
  tenancyLevel: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  workspaceTheme?: Maybe<WorkspaceThemes>;
};


/** columns and relationships of "companyWorkspaces" */
export type CompanyWorkspacesCompanyCacheSchemasArgs = {
  distinct_on?: InputMaybe<Array<CompanyCacheSchemas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyCacheSchemas_Order_By>>;
  where?: InputMaybe<CompanyCacheSchemas_Bool_Exp>;
};


/** columns and relationships of "companyWorkspaces" */
export type CompanyWorkspacesCompanyIntegrationsArgs = {
  distinct_on?: InputMaybe<Array<CompanyIntegrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyIntegrations_Order_By>>;
  where?: InputMaybe<CompanyIntegrations_Bool_Exp>;
};


/** columns and relationships of "companyWorkspaces" */
export type CompanyWorkspacesDataModelsArgs = {
  distinct_on?: InputMaybe<Array<DataModels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DataModels_Order_By>>;
  where?: InputMaybe<DataModels_Bool_Exp>;
};


/** columns and relationships of "companyWorkspaces" */
export type CompanyWorkspacesExternalDashboardsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboards_Order_By>>;
  where?: InputMaybe<ExternalDashboards_Bool_Exp>;
};


/** columns and relationships of "companyWorkspaces" */
export type CompanyWorkspacesExternalDatasetsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDatasets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDatasets_Order_By>>;
  where?: InputMaybe<ExternalDatasets_Bool_Exp>;
};


/** columns and relationships of "companyWorkspaces" */
export type CompanyWorkspacesRawCsvSettingsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "companyWorkspaces" */
export type CompanyWorkspaces_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CompanyWorkspaces_Max_Order_By>;
  min?: InputMaybe<CompanyWorkspaces_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type CompanyWorkspaces_Append_Input = {
  rawCsvSettings?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "companyWorkspaces". All fields are combined with a logical 'AND'. */
export type CompanyWorkspaces_Bool_Exp = {
  _and?: InputMaybe<Array<CompanyWorkspaces_Bool_Exp>>;
  _not?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  _or?: InputMaybe<Array<CompanyWorkspaces_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyCacheSchema?: InputMaybe<CompanyCacheSchemas_Bool_Exp>;
  companyCacheSchemas?: InputMaybe<CompanyCacheSchemas_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  companyIntegrations?: InputMaybe<CompanyIntegrations_Bool_Exp>;
  companyRedi?: InputMaybe<CompanyRedis_Bool_Exp>;
  companySubsetTable?: InputMaybe<CompanySubsetTables_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  creatorMode?: InputMaybe<CreatorModeEnums_Enum_Comparison_Exp>;
  dataModels?: InputMaybe<DataModels_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  externalDashboards?: InputMaybe<ExternalDashboards_Bool_Exp>;
  externalDatasets?: InputMaybe<ExternalDatasets_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  rawCsvSettings?: InputMaybe<Jsonb_Comparison_Exp>;
  tenancyLevel?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  workspaceTheme?: InputMaybe<WorkspaceThemes_Bool_Exp>;
};

/** unique or primary key constraints on table "companyWorkspaces" */
export enum CompanyWorkspaces_Constraint {
  /** unique or primary key constraint on columns "companyId", "name" */
  CompanyWorkspacesCompanyIdNameKey = 'companyWorkspaces_companyId_name_key',
  /** unique or primary key constraint on columns "id" */
  CompanyWorkspacesPkey = 'companyWorkspaces_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type CompanyWorkspaces_Delete_At_Path_Input = {
  rawCsvSettings?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type CompanyWorkspaces_Delete_Elem_Input = {
  rawCsvSettings?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type CompanyWorkspaces_Delete_Key_Input = {
  rawCsvSettings?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "companyWorkspaces" */
export type CompanyWorkspaces_Insert_Input = {
  companyCacheSchema?: InputMaybe<CompanyCacheSchemas_Obj_Rel_Insert_Input>;
  companyCacheSchemas?: InputMaybe<CompanyCacheSchemas_Arr_Rel_Insert_Input>;
  companyId?: InputMaybe<Scalars['uuid']>;
  companyIntegrations?: InputMaybe<CompanyIntegrations_Arr_Rel_Insert_Input>;
  companyRedi?: InputMaybe<CompanyRedis_Obj_Rel_Insert_Input>;
  companySubsetTable?: InputMaybe<CompanySubsetTables_Obj_Rel_Insert_Input>;
  creatorMode?: InputMaybe<CreatorModeEnums_Enum>;
  dataModels?: InputMaybe<DataModels_Arr_Rel_Insert_Input>;
  description?: InputMaybe<Scalars['String']>;
  externalDashboards?: InputMaybe<ExternalDashboards_Arr_Rel_Insert_Input>;
  externalDatasets?: InputMaybe<ExternalDatasets_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  rawCsvSettings?: InputMaybe<Scalars['jsonb']>;
  tenancyLevel?: InputMaybe<Scalars['String']>;
  workspaceTheme?: InputMaybe<WorkspaceThemes_Obj_Rel_Insert_Input>;
};

/** order by max() on columns of table "companyWorkspaces" */
export type CompanyWorkspaces_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  tenancyLevel?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "companyWorkspaces" */
export type CompanyWorkspaces_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  tenancyLevel?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "companyWorkspaces" */
export type CompanyWorkspaces_Mutation_Response = {
  __typename?: 'companyWorkspaces_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CompanyWorkspaces>;
};

/** input type for inserting object relation for remote table "companyWorkspaces" */
export type CompanyWorkspaces_Obj_Rel_Insert_Input = {
  data: CompanyWorkspaces_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<CompanyWorkspaces_On_Conflict>;
};

/** on_conflict condition type for table "companyWorkspaces" */
export type CompanyWorkspaces_On_Conflict = {
  constraint: CompanyWorkspaces_Constraint;
  update_columns?: Array<CompanyWorkspaces_Update_Column>;
  where?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
};

/** Ordering options when selecting data from "companyWorkspaces". */
export type CompanyWorkspaces_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyCacheSchema?: InputMaybe<CompanyCacheSchemas_Order_By>;
  companyCacheSchemas_aggregate?: InputMaybe<CompanyCacheSchemas_Aggregate_Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyIntegrations_aggregate?: InputMaybe<CompanyIntegrations_Aggregate_Order_By>;
  companyRedi?: InputMaybe<CompanyRedis_Order_By>;
  companySubsetTable?: InputMaybe<CompanySubsetTables_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  creatorMode?: InputMaybe<Order_By>;
  dataModels_aggregate?: InputMaybe<DataModels_Aggregate_Order_By>;
  description?: InputMaybe<Order_By>;
  externalDashboards_aggregate?: InputMaybe<ExternalDashboards_Aggregate_Order_By>;
  externalDatasets_aggregate?: InputMaybe<ExternalDatasets_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  rawCsvSettings?: InputMaybe<Order_By>;
  tenancyLevel?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceTheme?: InputMaybe<WorkspaceThemes_Order_By>;
};

/** primary key columns input for table: companyWorkspaces */
export type CompanyWorkspaces_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type CompanyWorkspaces_Prepend_Input = {
  rawCsvSettings?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "companyWorkspaces" */
export enum CompanyWorkspaces_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatorMode = 'creatorMode',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  RawCsvSettings = 'rawCsvSettings',
  /** column name */
  TenancyLevel = 'tenancyLevel',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "companyWorkspaces" */
export type CompanyWorkspaces_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  creatorMode?: InputMaybe<CreatorModeEnums_Enum>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  rawCsvSettings?: InputMaybe<Scalars['jsonb']>;
  tenancyLevel?: InputMaybe<Scalars['String']>;
};

/** update columns of table "companyWorkspaces" */
export enum CompanyWorkspaces_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatorMode = 'creatorMode',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  RawCsvSettings = 'rawCsvSettings',
  /** column name */
  TenancyLevel = 'tenancyLevel'
}

export enum CreatorModeEnums_Enum {
  /** It includes dragging and dropping columns from the schema side bar */
  DragDrop = 'DRAG_DROP',
  /** It includes auto complete search bar */
  PointClick = 'POINT_CLICK'
}

/** Boolean expression to compare columns of type "creatorModeEnums_enum". All fields are combined with logical 'AND'. */
export type CreatorModeEnums_Enum_Comparison_Exp = {
  _eq?: InputMaybe<CreatorModeEnums_Enum>;
  _in?: InputMaybe<Array<CreatorModeEnums_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<CreatorModeEnums_Enum>;
  _nin?: InputMaybe<Array<CreatorModeEnums_Enum>>;
};

/** columns and relationships of "customLayers" */
export type CustomLayers = {
  __typename?: 'customLayers';
  content: Scalars['jsonb'];
  createdAt: Scalars['timestamptz'];
  createdBy: Scalars['String'];
  createdType: Scalars['String'];
  dashboardId: Scalars['uuid'];
  /** An object relationship */
  externalDashboard: ExternalDashboards;
  id: Scalars['uuid'];
  isVisible: Scalars['Boolean'];
  layoutId: Scalars['String'];
  styles: Scalars['jsonb'];
  subLayers: Scalars['jsonb'];
  type: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "customLayers" */
export type CustomLayersContentArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "customLayers" */
export type CustomLayersStylesArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "customLayers" */
export type CustomLayersSubLayersArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "customLayers" */
export type CustomLayers_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CustomLayers_Max_Order_By>;
  min?: InputMaybe<CustomLayers_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type CustomLayers_Append_Input = {
  content?: InputMaybe<Scalars['jsonb']>;
  styles?: InputMaybe<Scalars['jsonb']>;
  subLayers?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "customLayers" */
export type CustomLayers_Arr_Rel_Insert_Input = {
  data: Array<CustomLayers_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<CustomLayers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "customLayers". All fields are combined with a logical 'AND'. */
export type CustomLayers_Bool_Exp = {
  _and?: InputMaybe<Array<CustomLayers_Bool_Exp>>;
  _not?: InputMaybe<CustomLayers_Bool_Exp>;
  _or?: InputMaybe<Array<CustomLayers_Bool_Exp>>;
  content?: InputMaybe<Jsonb_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<String_Comparison_Exp>;
  createdType?: InputMaybe<String_Comparison_Exp>;
  dashboardId?: InputMaybe<Uuid_Comparison_Exp>;
  externalDashboard?: InputMaybe<ExternalDashboards_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isVisible?: InputMaybe<Boolean_Comparison_Exp>;
  layoutId?: InputMaybe<String_Comparison_Exp>;
  styles?: InputMaybe<Jsonb_Comparison_Exp>;
  subLayers?: InputMaybe<Jsonb_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "customLayers" */
export enum CustomLayers_Constraint {
  /** unique or primary key constraint on columns "id" */
  CustomLayersPkey = 'customLayers_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type CustomLayers_Delete_At_Path_Input = {
  content?: InputMaybe<Array<Scalars['String']>>;
  styles?: InputMaybe<Array<Scalars['String']>>;
  subLayers?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type CustomLayers_Delete_Elem_Input = {
  content?: InputMaybe<Scalars['Int']>;
  styles?: InputMaybe<Scalars['Int']>;
  subLayers?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type CustomLayers_Delete_Key_Input = {
  content?: InputMaybe<Scalars['String']>;
  styles?: InputMaybe<Scalars['String']>;
  subLayers?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "customLayers" */
export type CustomLayers_Insert_Input = {
  content?: InputMaybe<Scalars['jsonb']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdBy?: InputMaybe<Scalars['String']>;
  createdType?: InputMaybe<Scalars['String']>;
  dashboardId?: InputMaybe<Scalars['uuid']>;
  externalDashboard?: InputMaybe<ExternalDashboards_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  isVisible?: InputMaybe<Scalars['Boolean']>;
  layoutId?: InputMaybe<Scalars['String']>;
  styles?: InputMaybe<Scalars['jsonb']>;
  subLayers?: InputMaybe<Scalars['jsonb']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "customLayers" */
export type CustomLayers_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  createdType?: InputMaybe<Order_By>;
  dashboardId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layoutId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "customLayers" */
export type CustomLayers_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  createdType?: InputMaybe<Order_By>;
  dashboardId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layoutId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "customLayers" */
export type CustomLayers_Mutation_Response = {
  __typename?: 'customLayers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CustomLayers>;
};

/** on_conflict condition type for table "customLayers" */
export type CustomLayers_On_Conflict = {
  constraint: CustomLayers_Constraint;
  update_columns?: Array<CustomLayers_Update_Column>;
  where?: InputMaybe<CustomLayers_Bool_Exp>;
};

/** Ordering options when selecting data from "customLayers". */
export type CustomLayers_Order_By = {
  content?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  createdType?: InputMaybe<Order_By>;
  dashboardId?: InputMaybe<Order_By>;
  externalDashboard?: InputMaybe<ExternalDashboards_Order_By>;
  id?: InputMaybe<Order_By>;
  isVisible?: InputMaybe<Order_By>;
  layoutId?: InputMaybe<Order_By>;
  styles?: InputMaybe<Order_By>;
  subLayers?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: customLayers */
export type CustomLayers_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type CustomLayers_Prepend_Input = {
  content?: InputMaybe<Scalars['jsonb']>;
  styles?: InputMaybe<Scalars['jsonb']>;
  subLayers?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "customLayers" */
export enum CustomLayers_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  CreatedType = 'createdType',
  /** column name */
  DashboardId = 'dashboardId',
  /** column name */
  Id = 'id',
  /** column name */
  IsVisible = 'isVisible',
  /** column name */
  LayoutId = 'layoutId',
  /** column name */
  Styles = 'styles',
  /** column name */
  SubLayers = 'subLayers',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "customLayers" */
export type CustomLayers_Set_Input = {
  content?: InputMaybe<Scalars['jsonb']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdBy?: InputMaybe<Scalars['String']>;
  createdType?: InputMaybe<Scalars['String']>;
  dashboardId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  isVisible?: InputMaybe<Scalars['Boolean']>;
  layoutId?: InputMaybe<Scalars['String']>;
  styles?: InputMaybe<Scalars['jsonb']>;
  subLayers?: InputMaybe<Scalars['jsonb']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "customLayers" */
export enum CustomLayers_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  CreatedType = 'createdType',
  /** column name */
  DashboardId = 'dashboardId',
  /** column name */
  Id = 'id',
  /** column name */
  IsVisible = 'isVisible',
  /** column name */
  LayoutId = 'layoutId',
  /** column name */
  Styles = 'styles',
  /** column name */
  SubLayers = 'subLayers',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** columns and relationships of "customSqlColumns" */
export type CustomSqlColumns = {
  __typename?: 'customSqlColumns';
  /** An object relationship */
  companyIntegration: CompanyIntegrations;
  companyIntegrationId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  sqlColumns: Scalars['jsonb'];
  tableName: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "customSqlColumns" */
export type CustomSqlColumnsSqlColumnsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "customSqlColumns" */
export type CustomSqlColumns_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CustomSqlColumns_Max_Order_By>;
  min?: InputMaybe<CustomSqlColumns_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type CustomSqlColumns_Append_Input = {
  sqlColumns?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "customSqlColumns" */
export type CustomSqlColumns_Arr_Rel_Insert_Input = {
  data: Array<CustomSqlColumns_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<CustomSqlColumns_On_Conflict>;
};

/** Boolean expression to filter rows from the table "customSqlColumns". All fields are combined with a logical 'AND'. */
export type CustomSqlColumns_Bool_Exp = {
  _and?: InputMaybe<Array<CustomSqlColumns_Bool_Exp>>;
  _not?: InputMaybe<CustomSqlColumns_Bool_Exp>;
  _or?: InputMaybe<Array<CustomSqlColumns_Bool_Exp>>;
  companyIntegration?: InputMaybe<CompanyIntegrations_Bool_Exp>;
  companyIntegrationId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  sqlColumns?: InputMaybe<Jsonb_Comparison_Exp>;
  tableName?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "customSqlColumns" */
export enum CustomSqlColumns_Constraint {
  /** unique or primary key constraint on columns "companyIntegrationId", "tableName" */
  CustomSqlColumnsCompanyIntegrationIdTableNameKey = 'customSqlColumns_companyIntegrationId_tableName_key',
  /** unique or primary key constraint on columns "id" */
  CustomSqlColumnsPkey = 'customSqlColumns_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type CustomSqlColumns_Delete_At_Path_Input = {
  sqlColumns?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type CustomSqlColumns_Delete_Elem_Input = {
  sqlColumns?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type CustomSqlColumns_Delete_Key_Input = {
  sqlColumns?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "customSqlColumns" */
export type CustomSqlColumns_Insert_Input = {
  companyIntegration?: InputMaybe<CompanyIntegrations_Obj_Rel_Insert_Input>;
  companyIntegrationId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  sqlColumns?: InputMaybe<Scalars['jsonb']>;
  tableName?: InputMaybe<Scalars['String']>;
};

/** order by max() on columns of table "customSqlColumns" */
export type CustomSqlColumns_Max_Order_By = {
  companyIntegrationId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "customSqlColumns" */
export type CustomSqlColumns_Min_Order_By = {
  companyIntegrationId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "customSqlColumns" */
export type CustomSqlColumns_Mutation_Response = {
  __typename?: 'customSqlColumns_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CustomSqlColumns>;
};

/** on_conflict condition type for table "customSqlColumns" */
export type CustomSqlColumns_On_Conflict = {
  constraint: CustomSqlColumns_Constraint;
  update_columns?: Array<CustomSqlColumns_Update_Column>;
  where?: InputMaybe<CustomSqlColumns_Bool_Exp>;
};

/** Ordering options when selecting data from "customSqlColumns". */
export type CustomSqlColumns_Order_By = {
  companyIntegration?: InputMaybe<CompanyIntegrations_Order_By>;
  companyIntegrationId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sqlColumns?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: customSqlColumns */
export type CustomSqlColumns_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type CustomSqlColumns_Prepend_Input = {
  sqlColumns?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "customSqlColumns" */
export enum CustomSqlColumns_Select_Column {
  /** column name */
  CompanyIntegrationId = 'companyIntegrationId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  SqlColumns = 'sqlColumns',
  /** column name */
  TableName = 'tableName',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "customSqlColumns" */
export type CustomSqlColumns_Set_Input = {
  companyIntegrationId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  sqlColumns?: InputMaybe<Scalars['jsonb']>;
  tableName?: InputMaybe<Scalars['String']>;
};

/** update columns of table "customSqlColumns" */
export enum CustomSqlColumns_Update_Column {
  /** column name */
  CompanyIntegrationId = 'companyIntegrationId',
  /** column name */
  Id = 'id',
  /** column name */
  SqlColumns = 'sqlColumns',
  /** column name */
  TableName = 'tableName'
}

/** Dashboard and metrics tracker to track which metric belongs to which dashboard. */
export type DashboardMetrics = {
  __typename?: 'dashboardMetrics';
  /** An object relationship */
  dashboard: Dashboards;
  dashboardId: Scalars['uuid'];
  height: Scalars['Int'];
  id: Scalars['uuid'];
  /** An object relationship */
  metric: Metrics;
  metricId: Scalars['uuid'];
  width: Scalars['Int'];
  workspaceId: Scalars['uuid'];
  xAxis: Scalars['Int'];
  yAxis: Scalars['Int'];
};

/** order by aggregate values of table "dashboardMetrics" */
export type DashboardMetrics_Aggregate_Order_By = {
  avg?: InputMaybe<DashboardMetrics_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<DashboardMetrics_Max_Order_By>;
  min?: InputMaybe<DashboardMetrics_Min_Order_By>;
  stddev?: InputMaybe<DashboardMetrics_Stddev_Order_By>;
  stddev_pop?: InputMaybe<DashboardMetrics_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<DashboardMetrics_Stddev_Samp_Order_By>;
  sum?: InputMaybe<DashboardMetrics_Sum_Order_By>;
  var_pop?: InputMaybe<DashboardMetrics_Var_Pop_Order_By>;
  var_samp?: InputMaybe<DashboardMetrics_Var_Samp_Order_By>;
  variance?: InputMaybe<DashboardMetrics_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "dashboardMetrics" */
export type DashboardMetrics_Arr_Rel_Insert_Input = {
  data: Array<DashboardMetrics_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<DashboardMetrics_On_Conflict>;
};

/** order by avg() on columns of table "dashboardMetrics" */
export type DashboardMetrics_Avg_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dashboardMetrics". All fields are combined with a logical 'AND'. */
export type DashboardMetrics_Bool_Exp = {
  _and?: InputMaybe<Array<DashboardMetrics_Bool_Exp>>;
  _not?: InputMaybe<DashboardMetrics_Bool_Exp>;
  _or?: InputMaybe<Array<DashboardMetrics_Bool_Exp>>;
  dashboard?: InputMaybe<Dashboards_Bool_Exp>;
  dashboardId?: InputMaybe<Uuid_Comparison_Exp>;
  height?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metric?: InputMaybe<Metrics_Bool_Exp>;
  metricId?: InputMaybe<Uuid_Comparison_Exp>;
  width?: InputMaybe<Int_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
  xAxis?: InputMaybe<Int_Comparison_Exp>;
  yAxis?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "dashboardMetrics" */
export enum DashboardMetrics_Constraint {
  /** unique or primary key constraint on columns "id" */
  DashboardMetricsPkey = 'dashboardMetrics_pkey'
}

/** input type for incrementing numeric columns in table "dashboardMetrics" */
export type DashboardMetrics_Inc_Input = {
  height?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
  xAxis?: InputMaybe<Scalars['Int']>;
  yAxis?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "dashboardMetrics" */
export type DashboardMetrics_Insert_Input = {
  dashboard?: InputMaybe<Dashboards_Obj_Rel_Insert_Input>;
  dashboardId?: InputMaybe<Scalars['uuid']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  metric?: InputMaybe<Metrics_Obj_Rel_Insert_Input>;
  metricId?: InputMaybe<Scalars['uuid']>;
  width?: InputMaybe<Scalars['Int']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
  xAxis?: InputMaybe<Scalars['Int']>;
  yAxis?: InputMaybe<Scalars['Int']>;
};

/** order by max() on columns of table "dashboardMetrics" */
export type DashboardMetrics_Max_Order_By = {
  dashboardId?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "dashboardMetrics" */
export type DashboardMetrics_Min_Order_By = {
  dashboardId?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dashboardMetrics" */
export type DashboardMetrics_Mutation_Response = {
  __typename?: 'dashboardMetrics_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<DashboardMetrics>;
};

/** on_conflict condition type for table "dashboardMetrics" */
export type DashboardMetrics_On_Conflict = {
  constraint: DashboardMetrics_Constraint;
  update_columns?: Array<DashboardMetrics_Update_Column>;
  where?: InputMaybe<DashboardMetrics_Bool_Exp>;
};

/** Ordering options when selecting data from "dashboardMetrics". */
export type DashboardMetrics_Order_By = {
  dashboard?: InputMaybe<Dashboards_Order_By>;
  dashboardId?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metric?: InputMaybe<Metrics_Order_By>;
  metricId?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** primary key columns input for table: dashboardMetrics */
export type DashboardMetrics_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "dashboardMetrics" */
export enum DashboardMetrics_Select_Column {
  /** column name */
  DashboardId = 'dashboardId',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  MetricId = 'metricId',
  /** column name */
  Width = 'width',
  /** column name */
  WorkspaceId = 'workspaceId',
  /** column name */
  XAxis = 'xAxis',
  /** column name */
  YAxis = 'yAxis'
}

/** input type for updating data in table "dashboardMetrics" */
export type DashboardMetrics_Set_Input = {
  dashboardId?: InputMaybe<Scalars['uuid']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  metricId?: InputMaybe<Scalars['uuid']>;
  width?: InputMaybe<Scalars['Int']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
  xAxis?: InputMaybe<Scalars['Int']>;
  yAxis?: InputMaybe<Scalars['Int']>;
};

/** order by stddev() on columns of table "dashboardMetrics" */
export type DashboardMetrics_Stddev_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "dashboardMetrics" */
export type DashboardMetrics_Stddev_Pop_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "dashboardMetrics" */
export type DashboardMetrics_Stddev_Samp_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "dashboardMetrics" */
export type DashboardMetrics_Sum_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** update columns of table "dashboardMetrics" */
export enum DashboardMetrics_Update_Column {
  /** column name */
  DashboardId = 'dashboardId',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  MetricId = 'metricId',
  /** column name */
  Width = 'width',
  /** column name */
  WorkspaceId = 'workspaceId',
  /** column name */
  XAxis = 'xAxis',
  /** column name */
  YAxis = 'yAxis'
}

/** order by var_pop() on columns of table "dashboardMetrics" */
export type DashboardMetrics_Var_Pop_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "dashboardMetrics" */
export type DashboardMetrics_Var_Samp_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "dashboardMetrics" */
export type DashboardMetrics_Variance_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
  xAxis?: InputMaybe<Order_By>;
  yAxis?: InputMaybe<Order_By>;
};

/** Company dashboards for keeping view of different types of operations and data. */
export type Dashboards = {
  __typename?: 'dashboards';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  /** An array relationship */
  dashboardMetrics: Array<DashboardMetrics>;
  externalId: Scalars['uuid'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  workspaceId: Scalars['uuid'];
};


/** Company dashboards for keeping view of different types of operations and data. */
export type DashboardsDashboardMetricsArgs = {
  distinct_on?: InputMaybe<Array<DashboardMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DashboardMetrics_Order_By>>;
  where?: InputMaybe<DashboardMetrics_Bool_Exp>;
};

/** order by aggregate values of table "dashboards" */
export type Dashboards_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dashboards_Max_Order_By>;
  min?: InputMaybe<Dashboards_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "dashboards". All fields are combined with a logical 'AND'. */
export type Dashboards_Bool_Exp = {
  _and?: InputMaybe<Array<Dashboards_Bool_Exp>>;
  _not?: InputMaybe<Dashboards_Bool_Exp>;
  _or?: InputMaybe<Array<Dashboards_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  dashboardMetrics?: InputMaybe<DashboardMetrics_Bool_Exp>;
  externalId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "dashboards" */
export enum Dashboards_Constraint {
  /** unique or primary key constraint on columns "companyId", "name" */
  DashboardsCompanyIdNameKey = 'dashboards_companyId_name_key',
  /** unique or primary key constraint on columns "externalId" */
  DashboardsExternalIdKey = 'dashboards_externalId_key',
  /** unique or primary key constraint on columns "id" */
  DashboardsIdKey = 'dashboards_id_key',
  /** unique or primary key constraint on columns "id" */
  DashboardsPkey = 'dashboards_pkey'
}

/** input type for inserting data into table "dashboards" */
export type Dashboards_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  dashboardMetrics?: InputMaybe<DashboardMetrics_Arr_Rel_Insert_Input>;
  externalId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "dashboards" */
export type Dashboards_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  externalId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "dashboards" */
export type Dashboards_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  externalId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dashboards" */
export type Dashboards_Mutation_Response = {
  __typename?: 'dashboards_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Dashboards>;
};

/** input type for inserting object relation for remote table "dashboards" */
export type Dashboards_Obj_Rel_Insert_Input = {
  data: Dashboards_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Dashboards_On_Conflict>;
};

/** on_conflict condition type for table "dashboards" */
export type Dashboards_On_Conflict = {
  constraint: Dashboards_Constraint;
  update_columns?: Array<Dashboards_Update_Column>;
  where?: InputMaybe<Dashboards_Bool_Exp>;
};

/** Ordering options when selecting data from "dashboards". */
export type Dashboards_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  dashboardMetrics_aggregate?: InputMaybe<DashboardMetrics_Aggregate_Order_By>;
  externalId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: dashboards */
export type Dashboards_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "dashboards" */
export enum Dashboards_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  ExternalId = 'externalId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "dashboards" */
export type Dashboards_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  externalId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "dashboards" */
export enum Dashboards_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  ExternalId = 'externalId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** columns and relationships of "dataModels" */
export type DataModels = {
  __typename?: 'dataModels';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  /** An object relationship */
  companyWorkspace: CompanyWorkspaces;
  createdAt: Scalars['date'];
  databaseName: Scalars['String'];
  dbName: Scalars['String'];
  description: Scalars['String'];
  destinationId: Scalars['String'];
  id: Scalars['uuid'];
  lineageData: Scalars['jsonb'];
  modelType: Scalars['String'];
  name: Scalars['String'];
  query: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  workspaceId: Scalars['uuid'];
};


/** columns and relationships of "dataModels" */
export type DataModelsLineageDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "dataModels" */
export type DataModels_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<DataModels_Max_Order_By>;
  min?: InputMaybe<DataModels_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type DataModels_Append_Input = {
  lineageData?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "dataModels" */
export type DataModels_Arr_Rel_Insert_Input = {
  data: Array<DataModels_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<DataModels_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dataModels". All fields are combined with a logical 'AND'. */
export type DataModels_Bool_Exp = {
  _and?: InputMaybe<Array<DataModels_Bool_Exp>>;
  _not?: InputMaybe<DataModels_Bool_Exp>;
  _or?: InputMaybe<Array<DataModels_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  createdAt?: InputMaybe<Date_Comparison_Exp>;
  databaseName?: InputMaybe<String_Comparison_Exp>;
  dbName?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  destinationId?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  lineageData?: InputMaybe<Jsonb_Comparison_Exp>;
  modelType?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  query?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "dataModels" */
export enum DataModels_Constraint {
  /** unique or primary key constraint on columns "id" */
  DataModelsPkey = 'dataModels_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type DataModels_Delete_At_Path_Input = {
  lineageData?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type DataModels_Delete_Elem_Input = {
  lineageData?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type DataModels_Delete_Key_Input = {
  lineageData?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "dataModels" */
export type DataModels_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['date']>;
  databaseName?: InputMaybe<Scalars['String']>;
  dbName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  destinationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lineageData?: InputMaybe<Scalars['jsonb']>;
  modelType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "dataModels" */
export type DataModels_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  databaseName?: InputMaybe<Order_By>;
  dbName?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  destinationId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  modelType?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "dataModels" */
export type DataModels_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  databaseName?: InputMaybe<Order_By>;
  dbName?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  destinationId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  modelType?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dataModels" */
export type DataModels_Mutation_Response = {
  __typename?: 'dataModels_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<DataModels>;
};

/** on_conflict condition type for table "dataModels" */
export type DataModels_On_Conflict = {
  constraint: DataModels_Constraint;
  update_columns?: Array<DataModels_Update_Column>;
  where?: InputMaybe<DataModels_Bool_Exp>;
};

/** Ordering options when selecting data from "dataModels". */
export type DataModels_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  databaseName?: InputMaybe<Order_By>;
  dbName?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  destinationId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lineageData?: InputMaybe<Order_By>;
  modelType?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: dataModels */
export type DataModels_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type DataModels_Prepend_Input = {
  lineageData?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "dataModels" */
export enum DataModels_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DatabaseName = 'databaseName',
  /** column name */
  DbName = 'dbName',
  /** column name */
  Description = 'description',
  /** column name */
  DestinationId = 'destinationId',
  /** column name */
  Id = 'id',
  /** column name */
  LineageData = 'lineageData',
  /** column name */
  ModelType = 'modelType',
  /** column name */
  Name = 'name',
  /** column name */
  Query = 'query',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "dataModels" */
export type DataModels_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['date']>;
  databaseName?: InputMaybe<Scalars['String']>;
  dbName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  destinationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lineageData?: InputMaybe<Scalars['jsonb']>;
  modelType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "dataModels" */
export enum DataModels_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DatabaseName = 'databaseName',
  /** column name */
  DbName = 'dbName',
  /** column name */
  Description = 'description',
  /** column name */
  DestinationId = 'destinationId',
  /** column name */
  Id = 'id',
  /** column name */
  LineageData = 'lineageData',
  /** column name */
  ModelType = 'modelType',
  /** column name */
  Name = 'name',
  /** column name */
  Query = 'query',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']>;
  _gt?: InputMaybe<Scalars['date']>;
  _gte?: InputMaybe<Scalars['date']>;
  _in?: InputMaybe<Array<Scalars['date']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['date']>;
  _lte?: InputMaybe<Scalars['date']>;
  _neq?: InputMaybe<Scalars['date']>;
  _nin?: InputMaybe<Array<Scalars['date']>>;
};

/** Demo app theme customization */
export type DemoTheme = {
  __typename?: 'demoTheme';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  dashboardTitle?: Maybe<Scalars['String']>;
  highlightColor?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  logoUrl?: Maybe<Scalars['String']>;
  navbarColor?: Maybe<Scalars['String']>;
  primaryColor?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['jsonb']>;
  textColor?: Maybe<Scalars['String']>;
};


/** Demo app theme customization */
export type DemoThemeSettingsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type DemoTheme_Append_Input = {
  settings?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "demoTheme". All fields are combined with a logical 'AND'. */
export type DemoTheme_Bool_Exp = {
  _and?: InputMaybe<Array<DemoTheme_Bool_Exp>>;
  _not?: InputMaybe<DemoTheme_Bool_Exp>;
  _or?: InputMaybe<Array<DemoTheme_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  dashboardTitle?: InputMaybe<String_Comparison_Exp>;
  highlightColor?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  logoUrl?: InputMaybe<String_Comparison_Exp>;
  navbarColor?: InputMaybe<String_Comparison_Exp>;
  primaryColor?: InputMaybe<String_Comparison_Exp>;
  settings?: InputMaybe<Jsonb_Comparison_Exp>;
  textColor?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "demoTheme" */
export enum DemoTheme_Constraint {
  /** unique or primary key constraint on columns "companyId" */
  DemoThemeCompanyIdKey = 'demoTheme_companyId_key',
  /** unique or primary key constraint on columns "id" */
  DemoThemePkey = 'demoTheme_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type DemoTheme_Delete_At_Path_Input = {
  settings?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type DemoTheme_Delete_Elem_Input = {
  settings?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type DemoTheme_Delete_Key_Input = {
  settings?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "demoTheme" */
export type DemoTheme_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  dashboardTitle?: InputMaybe<Scalars['String']>;
  highlightColor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  logoUrl?: InputMaybe<Scalars['String']>;
  navbarColor?: InputMaybe<Scalars['String']>;
  primaryColor?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Scalars['jsonb']>;
  textColor?: InputMaybe<Scalars['String']>;
};

/** response of any mutation on the table "demoTheme" */
export type DemoTheme_Mutation_Response = {
  __typename?: 'demoTheme_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<DemoTheme>;
};

/** on_conflict condition type for table "demoTheme" */
export type DemoTheme_On_Conflict = {
  constraint: DemoTheme_Constraint;
  update_columns?: Array<DemoTheme_Update_Column>;
  where?: InputMaybe<DemoTheme_Bool_Exp>;
};

/** Ordering options when selecting data from "demoTheme". */
export type DemoTheme_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  dashboardTitle?: InputMaybe<Order_By>;
  highlightColor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  logoUrl?: InputMaybe<Order_By>;
  navbarColor?: InputMaybe<Order_By>;
  primaryColor?: InputMaybe<Order_By>;
  settings?: InputMaybe<Order_By>;
  textColor?: InputMaybe<Order_By>;
};

/** primary key columns input for table: demoTheme */
export type DemoTheme_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type DemoTheme_Prepend_Input = {
  settings?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "demoTheme" */
export enum DemoTheme_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  DashboardTitle = 'dashboardTitle',
  /** column name */
  HighlightColor = 'highlightColor',
  /** column name */
  Id = 'id',
  /** column name */
  LogoUrl = 'logoUrl',
  /** column name */
  NavbarColor = 'navbarColor',
  /** column name */
  PrimaryColor = 'primaryColor',
  /** column name */
  Settings = 'settings',
  /** column name */
  TextColor = 'textColor'
}

/** input type for updating data in table "demoTheme" */
export type DemoTheme_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  dashboardTitle?: InputMaybe<Scalars['String']>;
  highlightColor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  logoUrl?: InputMaybe<Scalars['String']>;
  navbarColor?: InputMaybe<Scalars['String']>;
  primaryColor?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Scalars['jsonb']>;
  textColor?: InputMaybe<Scalars['String']>;
};

/** update columns of table "demoTheme" */
export enum DemoTheme_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  DashboardTitle = 'dashboardTitle',
  /** column name */
  HighlightColor = 'highlightColor',
  /** column name */
  Id = 'id',
  /** column name */
  LogoUrl = 'logoUrl',
  /** column name */
  NavbarColor = 'navbarColor',
  /** column name */
  PrimaryColor = 'primaryColor',
  /** column name */
  Settings = 'settings',
  /** column name */
  TextColor = 'textColor'
}

/** columns and relationships of "documents" */
export type Documents = {
  __typename?: 'documents';
  content: Scalars['String'];
  id: Scalars['uuid'];
  /** An object relationship */
  metric: Metrics;
  metricId: Scalars['uuid'];
};

/** order by aggregate values of table "documents" */
export type Documents_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Documents_Max_Order_By>;
  min?: InputMaybe<Documents_Min_Order_By>;
};

/** input type for inserting array relation for remote table "documents" */
export type Documents_Arr_Rel_Insert_Input = {
  data: Array<Documents_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Documents_On_Conflict>;
};

/** Boolean expression to filter rows from the table "documents". All fields are combined with a logical 'AND'. */
export type Documents_Bool_Exp = {
  _and?: InputMaybe<Array<Documents_Bool_Exp>>;
  _not?: InputMaybe<Documents_Bool_Exp>;
  _or?: InputMaybe<Array<Documents_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metric?: InputMaybe<Metrics_Bool_Exp>;
  metricId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "documents" */
export enum Documents_Constraint {
  /** unique or primary key constraint on columns "id" */
  DocumentsPkey = 'documents_pkey'
}

/** input type for inserting data into table "documents" */
export type Documents_Insert_Input = {
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metric?: InputMaybe<Metrics_Obj_Rel_Insert_Input>;
  metricId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "documents" */
export type Documents_Max_Order_By = {
  content?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "documents" */
export type Documents_Min_Order_By = {
  content?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "documents" */
export type Documents_Mutation_Response = {
  __typename?: 'documents_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Documents>;
};

/** on_conflict condition type for table "documents" */
export type Documents_On_Conflict = {
  constraint: Documents_Constraint;
  update_columns?: Array<Documents_Update_Column>;
  where?: InputMaybe<Documents_Bool_Exp>;
};

/** Ordering options when selecting data from "documents". */
export type Documents_Order_By = {
  content?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metric?: InputMaybe<Metrics_Order_By>;
  metricId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: documents */
export type Documents_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "documents" */
export enum Documents_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  Id = 'id',
  /** column name */
  MetricId = 'metricId'
}

/** input type for updating data in table "documents" */
export type Documents_Set_Input = {
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metricId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "documents" */
export enum Documents_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  Id = 'id',
  /** column name */
  MetricId = 'metricId'
}

/** columns and relationships of "externalDashboardMetrics" */
export type ExternalDashboardMetrics = {
  __typename?: 'externalDashboardMetrics';
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  externalDashboard: ExternalDashboards;
  externalDashboardId: Scalars['uuid'];
  /** An object relationship */
  externalMetric: ExternalMetrics;
  externalMetricId: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
};

/** order by aggregate values of table "externalDashboardMetrics" */
export type ExternalDashboardMetrics_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ExternalDashboardMetrics_Max_Order_By>;
  min?: InputMaybe<ExternalDashboardMetrics_Min_Order_By>;
};

/** input type for inserting array relation for remote table "externalDashboardMetrics" */
export type ExternalDashboardMetrics_Arr_Rel_Insert_Input = {
  data: Array<ExternalDashboardMetrics_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ExternalDashboardMetrics_On_Conflict>;
};

/** Boolean expression to filter rows from the table "externalDashboardMetrics". All fields are combined with a logical 'AND'. */
export type ExternalDashboardMetrics_Bool_Exp = {
  _and?: InputMaybe<Array<ExternalDashboardMetrics_Bool_Exp>>;
  _not?: InputMaybe<ExternalDashboardMetrics_Bool_Exp>;
  _or?: InputMaybe<Array<ExternalDashboardMetrics_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  externalDashboard?: InputMaybe<ExternalDashboards_Bool_Exp>;
  externalDashboardId?: InputMaybe<Uuid_Comparison_Exp>;
  externalMetric?: InputMaybe<ExternalMetrics_Bool_Exp>;
  externalMetricId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "externalDashboardMetrics" */
export enum ExternalDashboardMetrics_Constraint {
  /** unique or primary key constraint on columns "externalMetricId", "externalDashboardId" */
  ExternalDashboardMetricsPkey = 'externalDashboardMetrics_pkey'
}

/** input type for inserting data into table "externalDashboardMetrics" */
export type ExternalDashboardMetrics_Insert_Input = {
  externalDashboard?: InputMaybe<ExternalDashboards_Obj_Rel_Insert_Input>;
  externalDashboardId?: InputMaybe<Scalars['uuid']>;
  externalMetric?: InputMaybe<ExternalMetrics_Obj_Rel_Insert_Input>;
  externalMetricId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "externalDashboardMetrics" */
export type ExternalDashboardMetrics_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "externalDashboardMetrics" */
export type ExternalDashboardMetrics_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "externalDashboardMetrics" */
export type ExternalDashboardMetrics_Mutation_Response = {
  __typename?: 'externalDashboardMetrics_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ExternalDashboardMetrics>;
};

/** on_conflict condition type for table "externalDashboardMetrics" */
export type ExternalDashboardMetrics_On_Conflict = {
  constraint: ExternalDashboardMetrics_Constraint;
  update_columns?: Array<ExternalDashboardMetrics_Update_Column>;
  where?: InputMaybe<ExternalDashboardMetrics_Bool_Exp>;
};

/** Ordering options when selecting data from "externalDashboardMetrics". */
export type ExternalDashboardMetrics_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  externalDashboard?: InputMaybe<ExternalDashboards_Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  externalMetric?: InputMaybe<ExternalMetrics_Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: externalDashboardMetrics */
export type ExternalDashboardMetrics_Pk_Columns_Input = {
  externalDashboardId: Scalars['uuid'];
  externalMetricId: Scalars['uuid'];
};

/** select columns of table "externalDashboardMetrics" */
export enum ExternalDashboardMetrics_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExternalDashboardId = 'externalDashboardId',
  /** column name */
  ExternalMetricId = 'externalMetricId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "externalDashboardMetrics" */
export type ExternalDashboardMetrics_Set_Input = {
  externalDashboardId?: InputMaybe<Scalars['uuid']>;
  externalMetricId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "externalDashboardMetrics" */
export enum ExternalDashboardMetrics_Update_Column {
  /** column name */
  ExternalDashboardId = 'externalDashboardId',
  /** column name */
  ExternalMetricId = 'externalMetricId'
}

/** External dashboard theme for a particular client. */
export type ExternalDashboardThemeClients = {
  __typename?: 'externalDashboardThemeClients';
  clientId: Scalars['String'];
  clientName: Scalars['String'];
  /** An object relationship */
  externalDashboardTheme: ExternalDashboardThemes;
  id: Scalars['uuid'];
  themeId: Scalars['uuid'];
};

/** order by aggregate values of table "externalDashboardThemeClients" */
export type ExternalDashboardThemeClients_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ExternalDashboardThemeClients_Max_Order_By>;
  min?: InputMaybe<ExternalDashboardThemeClients_Min_Order_By>;
};

/** input type for inserting array relation for remote table "externalDashboardThemeClients" */
export type ExternalDashboardThemeClients_Arr_Rel_Insert_Input = {
  data: Array<ExternalDashboardThemeClients_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ExternalDashboardThemeClients_On_Conflict>;
};

/** Boolean expression to filter rows from the table "externalDashboardThemeClients". All fields are combined with a logical 'AND'. */
export type ExternalDashboardThemeClients_Bool_Exp = {
  _and?: InputMaybe<Array<ExternalDashboardThemeClients_Bool_Exp>>;
  _not?: InputMaybe<ExternalDashboardThemeClients_Bool_Exp>;
  _or?: InputMaybe<Array<ExternalDashboardThemeClients_Bool_Exp>>;
  clientId?: InputMaybe<String_Comparison_Exp>;
  clientName?: InputMaybe<String_Comparison_Exp>;
  externalDashboardTheme?: InputMaybe<ExternalDashboardThemes_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  themeId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "externalDashboardThemeClients" */
export enum ExternalDashboardThemeClients_Constraint {
  /** unique or primary key constraint on columns "themeId", "clientId" */
  ExternalDashboardThemeClientsClientIdThemeIdKey = 'externalDashboardThemeClients_clientId_themeId_key',
  /** unique or primary key constraint on columns "id" */
  ExternalDashboardThemeClientsPkey = 'externalDashboardThemeClients_pkey'
}

/** input type for inserting data into table "externalDashboardThemeClients" */
export type ExternalDashboardThemeClients_Insert_Input = {
  clientId?: InputMaybe<Scalars['String']>;
  clientName?: InputMaybe<Scalars['String']>;
  externalDashboardTheme?: InputMaybe<ExternalDashboardThemes_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  themeId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "externalDashboardThemeClients" */
export type ExternalDashboardThemeClients_Max_Order_By = {
  clientId?: InputMaybe<Order_By>;
  clientName?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  themeId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "externalDashboardThemeClients" */
export type ExternalDashboardThemeClients_Min_Order_By = {
  clientId?: InputMaybe<Order_By>;
  clientName?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  themeId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "externalDashboardThemeClients" */
export type ExternalDashboardThemeClients_Mutation_Response = {
  __typename?: 'externalDashboardThemeClients_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ExternalDashboardThemeClients>;
};

/** on_conflict condition type for table "externalDashboardThemeClients" */
export type ExternalDashboardThemeClients_On_Conflict = {
  constraint: ExternalDashboardThemeClients_Constraint;
  update_columns?: Array<ExternalDashboardThemeClients_Update_Column>;
  where?: InputMaybe<ExternalDashboardThemeClients_Bool_Exp>;
};

/** Ordering options when selecting data from "externalDashboardThemeClients". */
export type ExternalDashboardThemeClients_Order_By = {
  clientId?: InputMaybe<Order_By>;
  clientName?: InputMaybe<Order_By>;
  externalDashboardTheme?: InputMaybe<ExternalDashboardThemes_Order_By>;
  id?: InputMaybe<Order_By>;
  themeId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: externalDashboardThemeClients */
export type ExternalDashboardThemeClients_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "externalDashboardThemeClients" */
export enum ExternalDashboardThemeClients_Select_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  ClientName = 'clientName',
  /** column name */
  Id = 'id',
  /** column name */
  ThemeId = 'themeId'
}

/** input type for updating data in table "externalDashboardThemeClients" */
export type ExternalDashboardThemeClients_Set_Input = {
  clientId?: InputMaybe<Scalars['String']>;
  clientName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  themeId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "externalDashboardThemeClients" */
export enum ExternalDashboardThemeClients_Update_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  ClientName = 'clientName',
  /** column name */
  Id = 'id',
  /** column name */
  ThemeId = 'themeId'
}

/** Themes for external dashboard. */
export type ExternalDashboardThemes = {
  __typename?: 'externalDashboardThemes';
  colors: Scalars['jsonb'];
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  /** An array relationship */
  externalDashboardThemeClients: Array<ExternalDashboardThemeClients>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  workspaceId: Scalars['uuid'];
};


/** Themes for external dashboard. */
export type ExternalDashboardThemesColorsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** Themes for external dashboard. */
export type ExternalDashboardThemesExternalDashboardThemeClientsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboardThemeClients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboardThemeClients_Order_By>>;
  where?: InputMaybe<ExternalDashboardThemeClients_Bool_Exp>;
};

/** order by aggregate values of table "externalDashboardThemes" */
export type ExternalDashboardThemes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ExternalDashboardThemes_Max_Order_By>;
  min?: InputMaybe<ExternalDashboardThemes_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ExternalDashboardThemes_Append_Input = {
  colors?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "externalDashboardThemes". All fields are combined with a logical 'AND'. */
export type ExternalDashboardThemes_Bool_Exp = {
  _and?: InputMaybe<Array<ExternalDashboardThemes_Bool_Exp>>;
  _not?: InputMaybe<ExternalDashboardThemes_Bool_Exp>;
  _or?: InputMaybe<Array<ExternalDashboardThemes_Bool_Exp>>;
  colors?: InputMaybe<Jsonb_Comparison_Exp>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  externalDashboardThemeClients?: InputMaybe<ExternalDashboardThemeClients_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "externalDashboardThemes" */
export enum ExternalDashboardThemes_Constraint {
  /** unique or primary key constraint on columns "companyId", "name" */
  ExternalDashboardThemesCompanyIdNameKey = 'externalDashboardThemes_companyId_name_key',
  /** unique or primary key constraint on columns "id" */
  ExternalDashboardThemesPkey = 'externalDashboardThemes_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ExternalDashboardThemes_Delete_At_Path_Input = {
  colors?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ExternalDashboardThemes_Delete_Elem_Input = {
  colors?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ExternalDashboardThemes_Delete_Key_Input = {
  colors?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "externalDashboardThemes" */
export type ExternalDashboardThemes_Insert_Input = {
  colors?: InputMaybe<Scalars['jsonb']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  externalDashboardThemeClients?: InputMaybe<ExternalDashboardThemeClients_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "externalDashboardThemes" */
export type ExternalDashboardThemes_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "externalDashboardThemes" */
export type ExternalDashboardThemes_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "externalDashboardThemes" */
export type ExternalDashboardThemes_Mutation_Response = {
  __typename?: 'externalDashboardThemes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ExternalDashboardThemes>;
};

/** input type for inserting object relation for remote table "externalDashboardThemes" */
export type ExternalDashboardThemes_Obj_Rel_Insert_Input = {
  data: ExternalDashboardThemes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<ExternalDashboardThemes_On_Conflict>;
};

/** on_conflict condition type for table "externalDashboardThemes" */
export type ExternalDashboardThemes_On_Conflict = {
  constraint: ExternalDashboardThemes_Constraint;
  update_columns?: Array<ExternalDashboardThemes_Update_Column>;
  where?: InputMaybe<ExternalDashboardThemes_Bool_Exp>;
};

/** Ordering options when selecting data from "externalDashboardThemes". */
export type ExternalDashboardThemes_Order_By = {
  colors?: InputMaybe<Order_By>;
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalDashboardThemeClients_aggregate?: InputMaybe<ExternalDashboardThemeClients_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: externalDashboardThemes */
export type ExternalDashboardThemes_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ExternalDashboardThemes_Prepend_Input = {
  colors?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "externalDashboardThemes" */
export enum ExternalDashboardThemes_Select_Column {
  /** column name */
  Colors = 'colors',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "externalDashboardThemes" */
export type ExternalDashboardThemes_Set_Input = {
  colors?: InputMaybe<Scalars['jsonb']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "externalDashboardThemes" */
export enum ExternalDashboardThemes_Update_Column {
  /** column name */
  Colors = 'colors',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** columns and relationships of "externalDashboards" */
export type ExternalDashboards = {
  __typename?: 'externalDashboards';
  /** An array relationship */
  clientDashboardLayouts: Array<ClientDashboardLayout>;
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  /** An object relationship */
  companyWorkspace: CompanyWorkspaces;
  createdAt: Scalars['timestamptz'];
  /** An array relationship */
  customLayers: Array<CustomLayers>;
  defaultClientId?: Maybe<Scalars['String']>;
  externalDashboardId: Scalars['String'];
  /** An array relationship */
  externalDashboardMetrics: Array<ExternalDashboardMetrics>;
  filters: Scalars['jsonb'];
  id: Scalars['uuid'];
  layout: Scalars['jsonb'];
  name: Scalars['String'];
  /** An array relationship */
  scheduleEmailReports: Array<ScheduleEmailReports>;
  updatedAt: Scalars['timestamptz'];
  workspaceId: Scalars['uuid'];
};


/** columns and relationships of "externalDashboards" */
export type ExternalDashboardsClientDashboardLayoutsArgs = {
  distinct_on?: InputMaybe<Array<ClientDashboardLayout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ClientDashboardLayout_Order_By>>;
  where?: InputMaybe<ClientDashboardLayout_Bool_Exp>;
};


/** columns and relationships of "externalDashboards" */
export type ExternalDashboardsCustomLayersArgs = {
  distinct_on?: InputMaybe<Array<CustomLayers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CustomLayers_Order_By>>;
  where?: InputMaybe<CustomLayers_Bool_Exp>;
};


/** columns and relationships of "externalDashboards" */
export type ExternalDashboardsExternalDashboardMetricsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboardMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboardMetrics_Order_By>>;
  where?: InputMaybe<ExternalDashboardMetrics_Bool_Exp>;
};


/** columns and relationships of "externalDashboards" */
export type ExternalDashboardsFiltersArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "externalDashboards" */
export type ExternalDashboardsLayoutArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "externalDashboards" */
export type ExternalDashboardsScheduleEmailReportsArgs = {
  distinct_on?: InputMaybe<Array<ScheduleEmailReports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ScheduleEmailReports_Order_By>>;
  where?: InputMaybe<ScheduleEmailReports_Bool_Exp>;
};

/** order by aggregate values of table "externalDashboards" */
export type ExternalDashboards_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ExternalDashboards_Max_Order_By>;
  min?: InputMaybe<ExternalDashboards_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ExternalDashboards_Append_Input = {
  filters?: InputMaybe<Scalars['jsonb']>;
  layout?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "externalDashboards" */
export type ExternalDashboards_Arr_Rel_Insert_Input = {
  data: Array<ExternalDashboards_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ExternalDashboards_On_Conflict>;
};

/** Boolean expression to filter rows from the table "externalDashboards". All fields are combined with a logical 'AND'. */
export type ExternalDashboards_Bool_Exp = {
  _and?: InputMaybe<Array<ExternalDashboards_Bool_Exp>>;
  _not?: InputMaybe<ExternalDashboards_Bool_Exp>;
  _or?: InputMaybe<Array<ExternalDashboards_Bool_Exp>>;
  clientDashboardLayouts?: InputMaybe<ClientDashboardLayout_Bool_Exp>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  customLayers?: InputMaybe<CustomLayers_Bool_Exp>;
  defaultClientId?: InputMaybe<String_Comparison_Exp>;
  externalDashboardId?: InputMaybe<String_Comparison_Exp>;
  externalDashboardMetrics?: InputMaybe<ExternalDashboardMetrics_Bool_Exp>;
  filters?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layout?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  scheduleEmailReports?: InputMaybe<ScheduleEmailReports_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "externalDashboards" */
export enum ExternalDashboards_Constraint {
  /** unique or primary key constraint on columns "id" */
  ExternalDashboardsPkey = 'externalDashboards_pkey',
  /** unique or primary key constraint on columns "companyId", "externalDashboardId" */
  ExternalDashboardsUniqueId = 'externalDashboards_uniqueId'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ExternalDashboards_Delete_At_Path_Input = {
  filters?: InputMaybe<Array<Scalars['String']>>;
  layout?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ExternalDashboards_Delete_Elem_Input = {
  filters?: InputMaybe<Scalars['Int']>;
  layout?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ExternalDashboards_Delete_Key_Input = {
  filters?: InputMaybe<Scalars['String']>;
  layout?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "externalDashboards" */
export type ExternalDashboards_Insert_Input = {
  clientDashboardLayouts?: InputMaybe<ClientDashboardLayout_Arr_Rel_Insert_Input>;
  companyId?: InputMaybe<Scalars['uuid']>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Obj_Rel_Insert_Input>;
  customLayers?: InputMaybe<CustomLayers_Arr_Rel_Insert_Input>;
  defaultClientId?: InputMaybe<Scalars['String']>;
  externalDashboardId?: InputMaybe<Scalars['String']>;
  externalDashboardMetrics?: InputMaybe<ExternalDashboardMetrics_Arr_Rel_Insert_Input>;
  filters?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  layout?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  scheduleEmailReports?: InputMaybe<ScheduleEmailReports_Arr_Rel_Insert_Input>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "externalDashboards" */
export type ExternalDashboards_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  defaultClientId?: InputMaybe<Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "externalDashboards" */
export type ExternalDashboards_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  defaultClientId?: InputMaybe<Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "externalDashboards" */
export type ExternalDashboards_Mutation_Response = {
  __typename?: 'externalDashboards_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ExternalDashboards>;
};

/** input type for inserting object relation for remote table "externalDashboards" */
export type ExternalDashboards_Obj_Rel_Insert_Input = {
  data: ExternalDashboards_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<ExternalDashboards_On_Conflict>;
};

/** on_conflict condition type for table "externalDashboards" */
export type ExternalDashboards_On_Conflict = {
  constraint: ExternalDashboards_Constraint;
  update_columns?: Array<ExternalDashboards_Update_Column>;
  where?: InputMaybe<ExternalDashboards_Bool_Exp>;
};

/** Ordering options when selecting data from "externalDashboards". */
export type ExternalDashboards_Order_By = {
  clientDashboardLayouts_aggregate?: InputMaybe<ClientDashboardLayout_Aggregate_Order_By>;
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  customLayers_aggregate?: InputMaybe<CustomLayers_Aggregate_Order_By>;
  defaultClientId?: InputMaybe<Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  externalDashboardMetrics_aggregate?: InputMaybe<ExternalDashboardMetrics_Aggregate_Order_By>;
  filters?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layout?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  scheduleEmailReports_aggregate?: InputMaybe<ScheduleEmailReports_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: externalDashboards */
export type ExternalDashboards_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ExternalDashboards_Prepend_Input = {
  filters?: InputMaybe<Scalars['jsonb']>;
  layout?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "externalDashboards" */
export enum ExternalDashboards_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DefaultClientId = 'defaultClientId',
  /** column name */
  ExternalDashboardId = 'externalDashboardId',
  /** column name */
  Filters = 'filters',
  /** column name */
  Id = 'id',
  /** column name */
  Layout = 'layout',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "externalDashboards" */
export type ExternalDashboards_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  defaultClientId?: InputMaybe<Scalars['String']>;
  externalDashboardId?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  layout?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "externalDashboards" */
export enum ExternalDashboards_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  DefaultClientId = 'defaultClientId',
  /** column name */
  ExternalDashboardId = 'externalDashboardId',
  /** column name */
  Filters = 'filters',
  /** column name */
  Id = 'id',
  /** column name */
  Layout = 'layout',
  /** column name */
  Name = 'name',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** dataset for external users */
export type ExternalDatasets = {
  __typename?: 'externalDatasets';
  clientColumn: Scalars['String'];
  columns: Scalars['jsonb'];
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  /** An object relationship */
  companyWorkspace: CompanyWorkspaces;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  query: Scalars['String'];
  tableName: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  workpspaceId: Scalars['uuid'];
};


/** dataset for external users */
export type ExternalDatasetsColumnsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "externalDatasets" */
export type ExternalDatasets_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ExternalDatasets_Max_Order_By>;
  min?: InputMaybe<ExternalDatasets_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ExternalDatasets_Append_Input = {
  columns?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "externalDatasets" */
export type ExternalDatasets_Arr_Rel_Insert_Input = {
  data: Array<ExternalDatasets_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ExternalDatasets_On_Conflict>;
};

/** Boolean expression to filter rows from the table "externalDatasets". All fields are combined with a logical 'AND'. */
export type ExternalDatasets_Bool_Exp = {
  _and?: InputMaybe<Array<ExternalDatasets_Bool_Exp>>;
  _not?: InputMaybe<ExternalDatasets_Bool_Exp>;
  _or?: InputMaybe<Array<ExternalDatasets_Bool_Exp>>;
  clientColumn?: InputMaybe<String_Comparison_Exp>;
  columns?: InputMaybe<Jsonb_Comparison_Exp>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  query?: InputMaybe<String_Comparison_Exp>;
  tableName?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  workpspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "externalDatasets" */
export enum ExternalDatasets_Constraint {
  /** unique or primary key constraint on columns "id" */
  ExternalDatasetsPkey = 'externalDatasets_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ExternalDatasets_Delete_At_Path_Input = {
  columns?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ExternalDatasets_Delete_Elem_Input = {
  columns?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ExternalDatasets_Delete_Key_Input = {
  columns?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "externalDatasets" */
export type ExternalDatasets_Insert_Input = {
  clientColumn?: InputMaybe<Scalars['String']>;
  columns?: InputMaybe<Scalars['jsonb']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  query?: InputMaybe<Scalars['String']>;
  tableName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  workpspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "externalDatasets" */
export type ExternalDatasets_Max_Order_By = {
  clientColumn?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workpspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "externalDatasets" */
export type ExternalDatasets_Min_Order_By = {
  clientColumn?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workpspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "externalDatasets" */
export type ExternalDatasets_Mutation_Response = {
  __typename?: 'externalDatasets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ExternalDatasets>;
};

/** on_conflict condition type for table "externalDatasets" */
export type ExternalDatasets_On_Conflict = {
  constraint: ExternalDatasets_Constraint;
  update_columns?: Array<ExternalDatasets_Update_Column>;
  where?: InputMaybe<ExternalDatasets_Bool_Exp>;
};

/** Ordering options when selecting data from "externalDatasets". */
export type ExternalDatasets_Order_By = {
  clientColumn?: InputMaybe<Order_By>;
  columns?: InputMaybe<Order_By>;
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workpspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: externalDatasets */
export type ExternalDatasets_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ExternalDatasets_Prepend_Input = {
  columns?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "externalDatasets" */
export enum ExternalDatasets_Select_Column {
  /** column name */
  ClientColumn = 'clientColumn',
  /** column name */
  Columns = 'columns',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Query = 'query',
  /** column name */
  TableName = 'tableName',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WorkpspaceId = 'workpspaceId'
}

/** input type for updating data in table "externalDatasets" */
export type ExternalDatasets_Set_Input = {
  clientColumn?: InputMaybe<Scalars['String']>;
  columns?: InputMaybe<Scalars['jsonb']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  query?: InputMaybe<Scalars['String']>;
  tableName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  workpspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "externalDatasets" */
export enum ExternalDatasets_Update_Column {
  /** column name */
  ClientColumn = 'clientColumn',
  /** column name */
  Columns = 'columns',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Query = 'query',
  /** column name */
  TableName = 'tableName',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WorkpspaceId = 'workpspaceId'
}

/** columns and relationships of "externalMetricRawCsvUrls" */
export type ExternalMetricRawCsvUrls = {
  __typename?: 'externalMetricRawCsvUrls';
  configurations: Scalars['jsonb'];
  createdAt: Scalars['timestamptz'];
  error?: Maybe<Scalars['String']>;
  expireUrlIn: Scalars['Int'];
  /** An object relationship */
  externalMetric: ExternalMetrics;
  externalMetricId: Scalars['uuid'];
  id: Scalars['uuid'];
  lastUpdatedAt: Scalars['timestamptz'];
  requestStatus: Scalars['String'];
  urls: Scalars['jsonb'];
};


/** columns and relationships of "externalMetricRawCsvUrls" */
export type ExternalMetricRawCsvUrlsConfigurationsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "externalMetricRawCsvUrls" */
export type ExternalMetricRawCsvUrlsUrlsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ExternalMetricRawCsvUrls_Append_Input = {
  configurations?: InputMaybe<Scalars['jsonb']>;
  urls?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "externalMetricRawCsvUrls". All fields are combined with a logical 'AND'. */
export type ExternalMetricRawCsvUrls_Bool_Exp = {
  _and?: InputMaybe<Array<ExternalMetricRawCsvUrls_Bool_Exp>>;
  _not?: InputMaybe<ExternalMetricRawCsvUrls_Bool_Exp>;
  _or?: InputMaybe<Array<ExternalMetricRawCsvUrls_Bool_Exp>>;
  configurations?: InputMaybe<Jsonb_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  error?: InputMaybe<String_Comparison_Exp>;
  expireUrlIn?: InputMaybe<Int_Comparison_Exp>;
  externalMetric?: InputMaybe<ExternalMetrics_Bool_Exp>;
  externalMetricId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  lastUpdatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  requestStatus?: InputMaybe<String_Comparison_Exp>;
  urls?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "externalMetricRawCsvUrls" */
export enum ExternalMetricRawCsvUrls_Constraint {
  /** unique or primary key constraint on columns "externalMetricId" */
  ExternalMetricRawCsvUrlsExternalMetricIdKey = 'externalMetricRawCsvUrls_externalMetricId_key',
  /** unique or primary key constraint on columns "id" */
  ExternalMetricRawCsvUrlsPkey = 'externalMetricRawCsvUrls_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ExternalMetricRawCsvUrls_Delete_At_Path_Input = {
  configurations?: InputMaybe<Array<Scalars['String']>>;
  urls?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ExternalMetricRawCsvUrls_Delete_Elem_Input = {
  configurations?: InputMaybe<Scalars['Int']>;
  urls?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ExternalMetricRawCsvUrls_Delete_Key_Input = {
  configurations?: InputMaybe<Scalars['String']>;
  urls?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "externalMetricRawCsvUrls" */
export type ExternalMetricRawCsvUrls_Inc_Input = {
  expireUrlIn?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "externalMetricRawCsvUrls" */
export type ExternalMetricRawCsvUrls_Insert_Input = {
  configurations?: InputMaybe<Scalars['jsonb']>;
  error?: InputMaybe<Scalars['String']>;
  expireUrlIn?: InputMaybe<Scalars['Int']>;
  externalMetric?: InputMaybe<ExternalMetrics_Obj_Rel_Insert_Input>;
  externalMetricId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastUpdatedAt?: InputMaybe<Scalars['timestamptz']>;
  requestStatus?: InputMaybe<Scalars['String']>;
  urls?: InputMaybe<Scalars['jsonb']>;
};

/** response of any mutation on the table "externalMetricRawCsvUrls" */
export type ExternalMetricRawCsvUrls_Mutation_Response = {
  __typename?: 'externalMetricRawCsvUrls_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ExternalMetricRawCsvUrls>;
};

/** input type for inserting object relation for remote table "externalMetricRawCsvUrls" */
export type ExternalMetricRawCsvUrls_Obj_Rel_Insert_Input = {
  data: ExternalMetricRawCsvUrls_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<ExternalMetricRawCsvUrls_On_Conflict>;
};

/** on_conflict condition type for table "externalMetricRawCsvUrls" */
export type ExternalMetricRawCsvUrls_On_Conflict = {
  constraint: ExternalMetricRawCsvUrls_Constraint;
  update_columns?: Array<ExternalMetricRawCsvUrls_Update_Column>;
  where?: InputMaybe<ExternalMetricRawCsvUrls_Bool_Exp>;
};

/** Ordering options when selecting data from "externalMetricRawCsvUrls". */
export type ExternalMetricRawCsvUrls_Order_By = {
  configurations?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  error?: InputMaybe<Order_By>;
  expireUrlIn?: InputMaybe<Order_By>;
  externalMetric?: InputMaybe<ExternalMetrics_Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdatedAt?: InputMaybe<Order_By>;
  requestStatus?: InputMaybe<Order_By>;
  urls?: InputMaybe<Order_By>;
};

/** primary key columns input for table: externalMetricRawCsvUrls */
export type ExternalMetricRawCsvUrls_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ExternalMetricRawCsvUrls_Prepend_Input = {
  configurations?: InputMaybe<Scalars['jsonb']>;
  urls?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "externalMetricRawCsvUrls" */
export enum ExternalMetricRawCsvUrls_Select_Column {
  /** column name */
  Configurations = 'configurations',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Error = 'error',
  /** column name */
  ExpireUrlIn = 'expireUrlIn',
  /** column name */
  ExternalMetricId = 'externalMetricId',
  /** column name */
  Id = 'id',
  /** column name */
  LastUpdatedAt = 'lastUpdatedAt',
  /** column name */
  RequestStatus = 'requestStatus',
  /** column name */
  Urls = 'urls'
}

/** input type for updating data in table "externalMetricRawCsvUrls" */
export type ExternalMetricRawCsvUrls_Set_Input = {
  configurations?: InputMaybe<Scalars['jsonb']>;
  error?: InputMaybe<Scalars['String']>;
  expireUrlIn?: InputMaybe<Scalars['Int']>;
  externalMetricId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastUpdatedAt?: InputMaybe<Scalars['timestamptz']>;
  requestStatus?: InputMaybe<Scalars['String']>;
  urls?: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "externalMetricRawCsvUrls" */
export enum ExternalMetricRawCsvUrls_Update_Column {
  /** column name */
  Configurations = 'configurations',
  /** column name */
  Error = 'error',
  /** column name */
  ExpireUrlIn = 'expireUrlIn',
  /** column name */
  ExternalMetricId = 'externalMetricId',
  /** column name */
  Id = 'id',
  /** column name */
  LastUpdatedAt = 'lastUpdatedAt',
  /** column name */
  RequestStatus = 'requestStatus',
  /** column name */
  Urls = 'urls'
}

/** extrnal metrics table for users client-based query */
export type ExternalMetrics = {
  __typename?: 'externalMetrics';
  chartOptions: Scalars['jsonb'];
  clickActions: Scalars['json'];
  /** An array relationship */
  clientDeletedMetrics: Array<ClientDeletedMetrics>;
  clientId?: Maybe<Scalars['String']>;
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  /** An object relationship */
  companyIntegration: CompanyIntegrations;
  companyIntegrationId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  createdBy?: Maybe<Scalars['String']>;
  currentVersion: Scalars['numeric'];
  dataSecuritySettings: Scalars['jsonb'];
  datasetMetricSettings?: Maybe<Scalars['jsonb']>;
  description: Scalars['String'];
  drillDownSettings?: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  externalDashboardMetrics: Array<ExternalDashboardMetrics>;
  /** An object relationship */
  externalMetricRawCsvUrl?: Maybe<ExternalMetricRawCsvUrls>;
  /** An array relationship */
  externalMetricsRlsFilters: Array<ExternalMetricsRlsFilters>;
  groupBy: Scalars['jsonb'];
  id: Scalars['uuid'];
  inputFields?: Maybe<Scalars['jsonb']>;
  integrationName: Scalars['String'];
  isArchived: Scalars['Boolean'];
  isCreatedByClient: Scalars['Boolean'];
  isEnableGroupBy: Scalars['Boolean'];
  isLive: Scalars['Boolean'];
  isMarkedDeleted: Scalars['Boolean'];
  joinFields: Scalars['json'];
  latestVersion: Scalars['numeric'];
  limit: Scalars['Int'];
  metricId: Scalars['String'];
  metricQuery?: Maybe<Scalars['String']>;
  /** An object relationship */
  metricVersion?: Maybe<MetricVersions>;
  /** An array relationship */
  metricVersions: Array<MetricVersions>;
  name: Scalars['String'];
  outputColumns?: Maybe<Scalars['String']>;
  query: Scalars['String'];
  resizeAttributes: Scalars['jsonb'];
  rlsConditions: Scalars['jsonb'];
  /** An array relationship */
  scheduleEmailReportCharts: Array<ScheduleEmailReportCharts>;
  selectedGroupBy: Scalars['jsonb'];
  timeGrain?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  versionId?: Maybe<Scalars['uuid']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsChartOptionsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsClickActionsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsClientDeletedMetricsArgs = {
  distinct_on?: InputMaybe<Array<ClientDeletedMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ClientDeletedMetrics_Order_By>>;
  where?: InputMaybe<ClientDeletedMetrics_Bool_Exp>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsDataSecuritySettingsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsDatasetMetricSettingsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsDrillDownSettingsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsExternalDashboardMetricsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboardMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboardMetrics_Order_By>>;
  where?: InputMaybe<ExternalDashboardMetrics_Bool_Exp>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsExternalMetricsRlsFiltersArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetricsRlsFilters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetricsRlsFilters_Order_By>>;
  where?: InputMaybe<ExternalMetricsRlsFilters_Bool_Exp>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsGroupByArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsInputFieldsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsJoinFieldsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsMetricVersionsArgs = {
  distinct_on?: InputMaybe<Array<MetricVersions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MetricVersions_Order_By>>;
  where?: InputMaybe<MetricVersions_Bool_Exp>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsResizeAttributesArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsRlsConditionsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsScheduleEmailReportChartsArgs = {
  distinct_on?: InputMaybe<Array<ScheduleEmailReportCharts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ScheduleEmailReportCharts_Order_By>>;
  where?: InputMaybe<ScheduleEmailReportCharts_Bool_Exp>;
};


/** extrnal metrics table for users client-based query */
export type ExternalMetricsSelectedGroupByArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "externalMetricsRlsFilters" */
export type ExternalMetricsRlsFilters = {
  __typename?: 'externalMetricsRlsFilters';
  /** An object relationship */
  companyRlsFilter: CompanyRlsFilters;
  companyRlsFilterId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  externalMetric: ExternalMetrics;
  externalMetricId: Scalars['uuid'];
  id: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
};

/** order by aggregate values of table "externalMetricsRlsFilters" */
export type ExternalMetricsRlsFilters_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ExternalMetricsRlsFilters_Max_Order_By>;
  min?: InputMaybe<ExternalMetricsRlsFilters_Min_Order_By>;
};

/** input type for inserting array relation for remote table "externalMetricsRlsFilters" */
export type ExternalMetricsRlsFilters_Arr_Rel_Insert_Input = {
  data: Array<ExternalMetricsRlsFilters_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ExternalMetricsRlsFilters_On_Conflict>;
};

/** Boolean expression to filter rows from the table "externalMetricsRlsFilters". All fields are combined with a logical 'AND'. */
export type ExternalMetricsRlsFilters_Bool_Exp = {
  _and?: InputMaybe<Array<ExternalMetricsRlsFilters_Bool_Exp>>;
  _not?: InputMaybe<ExternalMetricsRlsFilters_Bool_Exp>;
  _or?: InputMaybe<Array<ExternalMetricsRlsFilters_Bool_Exp>>;
  companyRlsFilter?: InputMaybe<CompanyRlsFilters_Bool_Exp>;
  companyRlsFilterId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  externalMetric?: InputMaybe<ExternalMetrics_Bool_Exp>;
  externalMetricId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "externalMetricsRlsFilters" */
export enum ExternalMetricsRlsFilters_Constraint {
  /** unique or primary key constraint on columns "id" */
  ExternalMetricsRlsFiltersPkey = 'externalMetricsRlsFilters_pkey'
}

/** input type for inserting data into table "externalMetricsRlsFilters" */
export type ExternalMetricsRlsFilters_Insert_Input = {
  companyRlsFilter?: InputMaybe<CompanyRlsFilters_Obj_Rel_Insert_Input>;
  companyRlsFilterId?: InputMaybe<Scalars['uuid']>;
  externalMetric?: InputMaybe<ExternalMetrics_Obj_Rel_Insert_Input>;
  externalMetricId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "externalMetricsRlsFilters" */
export type ExternalMetricsRlsFilters_Max_Order_By = {
  companyRlsFilterId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "externalMetricsRlsFilters" */
export type ExternalMetricsRlsFilters_Min_Order_By = {
  companyRlsFilterId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "externalMetricsRlsFilters" */
export type ExternalMetricsRlsFilters_Mutation_Response = {
  __typename?: 'externalMetricsRlsFilters_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ExternalMetricsRlsFilters>;
};

/** on_conflict condition type for table "externalMetricsRlsFilters" */
export type ExternalMetricsRlsFilters_On_Conflict = {
  constraint: ExternalMetricsRlsFilters_Constraint;
  update_columns?: Array<ExternalMetricsRlsFilters_Update_Column>;
  where?: InputMaybe<ExternalMetricsRlsFilters_Bool_Exp>;
};

/** Ordering options when selecting data from "externalMetricsRlsFilters". */
export type ExternalMetricsRlsFilters_Order_By = {
  companyRlsFilter?: InputMaybe<CompanyRlsFilters_Order_By>;
  companyRlsFilterId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalMetric?: InputMaybe<ExternalMetrics_Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: externalMetricsRlsFilters */
export type ExternalMetricsRlsFilters_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "externalMetricsRlsFilters" */
export enum ExternalMetricsRlsFilters_Select_Column {
  /** column name */
  CompanyRlsFilterId = 'companyRlsFilterId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExternalMetricId = 'externalMetricId',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "externalMetricsRlsFilters" */
export type ExternalMetricsRlsFilters_Set_Input = {
  companyRlsFilterId?: InputMaybe<Scalars['uuid']>;
  externalMetricId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "externalMetricsRlsFilters" */
export enum ExternalMetricsRlsFilters_Update_Column {
  /** column name */
  CompanyRlsFilterId = 'companyRlsFilterId',
  /** column name */
  ExternalMetricId = 'externalMetricId',
  /** column name */
  Id = 'id'
}

/** order by aggregate values of table "externalMetrics" */
export type ExternalMetrics_Aggregate_Order_By = {
  avg?: InputMaybe<ExternalMetrics_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ExternalMetrics_Max_Order_By>;
  min?: InputMaybe<ExternalMetrics_Min_Order_By>;
  stddev?: InputMaybe<ExternalMetrics_Stddev_Order_By>;
  stddev_pop?: InputMaybe<ExternalMetrics_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<ExternalMetrics_Stddev_Samp_Order_By>;
  sum?: InputMaybe<ExternalMetrics_Sum_Order_By>;
  var_pop?: InputMaybe<ExternalMetrics_Var_Pop_Order_By>;
  var_samp?: InputMaybe<ExternalMetrics_Var_Samp_Order_By>;
  variance?: InputMaybe<ExternalMetrics_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ExternalMetrics_Append_Input = {
  chartOptions?: InputMaybe<Scalars['jsonb']>;
  dataSecuritySettings?: InputMaybe<Scalars['jsonb']>;
  datasetMetricSettings?: InputMaybe<Scalars['jsonb']>;
  drillDownSettings?: InputMaybe<Scalars['jsonb']>;
  groupBy?: InputMaybe<Scalars['jsonb']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
  resizeAttributes?: InputMaybe<Scalars['jsonb']>;
  rlsConditions?: InputMaybe<Scalars['jsonb']>;
  selectedGroupBy?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "externalMetrics" */
export type ExternalMetrics_Arr_Rel_Insert_Input = {
  data: Array<ExternalMetrics_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ExternalMetrics_On_Conflict>;
};

/** order by avg() on columns of table "externalMetrics" */
export type ExternalMetrics_Avg_Order_By = {
  currentVersion?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "externalMetrics". All fields are combined with a logical 'AND'. */
export type ExternalMetrics_Bool_Exp = {
  _and?: InputMaybe<Array<ExternalMetrics_Bool_Exp>>;
  _not?: InputMaybe<ExternalMetrics_Bool_Exp>;
  _or?: InputMaybe<Array<ExternalMetrics_Bool_Exp>>;
  chartOptions?: InputMaybe<Jsonb_Comparison_Exp>;
  clickActions?: InputMaybe<Json_Comparison_Exp>;
  clientDeletedMetrics?: InputMaybe<ClientDeletedMetrics_Bool_Exp>;
  clientId?: InputMaybe<String_Comparison_Exp>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  companyIntegration?: InputMaybe<CompanyIntegrations_Bool_Exp>;
  companyIntegrationId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<String_Comparison_Exp>;
  currentVersion?: InputMaybe<Numeric_Comparison_Exp>;
  dataSecuritySettings?: InputMaybe<Jsonb_Comparison_Exp>;
  datasetMetricSettings?: InputMaybe<Jsonb_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  drillDownSettings?: InputMaybe<Jsonb_Comparison_Exp>;
  externalDashboardMetrics?: InputMaybe<ExternalDashboardMetrics_Bool_Exp>;
  externalMetricRawCsvUrl?: InputMaybe<ExternalMetricRawCsvUrls_Bool_Exp>;
  externalMetricsRlsFilters?: InputMaybe<ExternalMetricsRlsFilters_Bool_Exp>;
  groupBy?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  inputFields?: InputMaybe<Jsonb_Comparison_Exp>;
  integrationName?: InputMaybe<String_Comparison_Exp>;
  isArchived?: InputMaybe<Boolean_Comparison_Exp>;
  isCreatedByClient?: InputMaybe<Boolean_Comparison_Exp>;
  isEnableGroupBy?: InputMaybe<Boolean_Comparison_Exp>;
  isLive?: InputMaybe<Boolean_Comparison_Exp>;
  isMarkedDeleted?: InputMaybe<Boolean_Comparison_Exp>;
  joinFields?: InputMaybe<Json_Comparison_Exp>;
  latestVersion?: InputMaybe<Numeric_Comparison_Exp>;
  limit?: InputMaybe<Int_Comparison_Exp>;
  metricId?: InputMaybe<String_Comparison_Exp>;
  metricQuery?: InputMaybe<String_Comparison_Exp>;
  metricVersion?: InputMaybe<MetricVersions_Bool_Exp>;
  metricVersions?: InputMaybe<MetricVersions_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  outputColumns?: InputMaybe<String_Comparison_Exp>;
  query?: InputMaybe<String_Comparison_Exp>;
  resizeAttributes?: InputMaybe<Jsonb_Comparison_Exp>;
  rlsConditions?: InputMaybe<Jsonb_Comparison_Exp>;
  scheduleEmailReportCharts?: InputMaybe<ScheduleEmailReportCharts_Bool_Exp>;
  selectedGroupBy?: InputMaybe<Jsonb_Comparison_Exp>;
  timeGrain?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  versionId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "externalMetrics" */
export enum ExternalMetrics_Constraint {
  /** unique or primary key constraint on columns "metricId" */
  ExternalMetricsMetricIdKey = 'externalMetrics_metricId_key',
  /** unique or primary key constraint on columns "id" */
  ExternalMetricsPkey = 'externalMetrics_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ExternalMetrics_Delete_At_Path_Input = {
  chartOptions?: InputMaybe<Array<Scalars['String']>>;
  dataSecuritySettings?: InputMaybe<Array<Scalars['String']>>;
  datasetMetricSettings?: InputMaybe<Array<Scalars['String']>>;
  drillDownSettings?: InputMaybe<Array<Scalars['String']>>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  inputFields?: InputMaybe<Array<Scalars['String']>>;
  resizeAttributes?: InputMaybe<Array<Scalars['String']>>;
  rlsConditions?: InputMaybe<Array<Scalars['String']>>;
  selectedGroupBy?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ExternalMetrics_Delete_Elem_Input = {
  chartOptions?: InputMaybe<Scalars['Int']>;
  dataSecuritySettings?: InputMaybe<Scalars['Int']>;
  datasetMetricSettings?: InputMaybe<Scalars['Int']>;
  drillDownSettings?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Scalars['Int']>;
  inputFields?: InputMaybe<Scalars['Int']>;
  resizeAttributes?: InputMaybe<Scalars['Int']>;
  rlsConditions?: InputMaybe<Scalars['Int']>;
  selectedGroupBy?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ExternalMetrics_Delete_Key_Input = {
  chartOptions?: InputMaybe<Scalars['String']>;
  dataSecuritySettings?: InputMaybe<Scalars['String']>;
  datasetMetricSettings?: InputMaybe<Scalars['String']>;
  drillDownSettings?: InputMaybe<Scalars['String']>;
  groupBy?: InputMaybe<Scalars['String']>;
  inputFields?: InputMaybe<Scalars['String']>;
  resizeAttributes?: InputMaybe<Scalars['String']>;
  rlsConditions?: InputMaybe<Scalars['String']>;
  selectedGroupBy?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "externalMetrics" */
export type ExternalMetrics_Inc_Input = {
  currentVersion?: InputMaybe<Scalars['numeric']>;
  latestVersion?: InputMaybe<Scalars['numeric']>;
  limit?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "externalMetrics" */
export type ExternalMetrics_Insert_Input = {
  chartOptions?: InputMaybe<Scalars['jsonb']>;
  clickActions?: InputMaybe<Scalars['json']>;
  clientDeletedMetrics?: InputMaybe<ClientDeletedMetrics_Arr_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  companyIntegration?: InputMaybe<CompanyIntegrations_Obj_Rel_Insert_Input>;
  companyIntegrationId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdBy?: InputMaybe<Scalars['String']>;
  currentVersion?: InputMaybe<Scalars['numeric']>;
  dataSecuritySettings?: InputMaybe<Scalars['jsonb']>;
  datasetMetricSettings?: InputMaybe<Scalars['jsonb']>;
  description?: InputMaybe<Scalars['String']>;
  drillDownSettings?: InputMaybe<Scalars['jsonb']>;
  externalDashboardMetrics?: InputMaybe<ExternalDashboardMetrics_Arr_Rel_Insert_Input>;
  externalMetricRawCsvUrl?: InputMaybe<ExternalMetricRawCsvUrls_Obj_Rel_Insert_Input>;
  externalMetricsRlsFilters?: InputMaybe<ExternalMetricsRlsFilters_Arr_Rel_Insert_Input>;
  groupBy?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
  integrationName?: InputMaybe<Scalars['String']>;
  isArchived?: InputMaybe<Scalars['Boolean']>;
  isCreatedByClient?: InputMaybe<Scalars['Boolean']>;
  isEnableGroupBy?: InputMaybe<Scalars['Boolean']>;
  isLive?: InputMaybe<Scalars['Boolean']>;
  isMarkedDeleted?: InputMaybe<Scalars['Boolean']>;
  joinFields?: InputMaybe<Scalars['json']>;
  latestVersion?: InputMaybe<Scalars['numeric']>;
  limit?: InputMaybe<Scalars['Int']>;
  metricId?: InputMaybe<Scalars['String']>;
  metricQuery?: InputMaybe<Scalars['String']>;
  metricVersion?: InputMaybe<MetricVersions_Obj_Rel_Insert_Input>;
  metricVersions?: InputMaybe<MetricVersions_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  outputColumns?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  resizeAttributes?: InputMaybe<Scalars['jsonb']>;
  rlsConditions?: InputMaybe<Scalars['jsonb']>;
  scheduleEmailReportCharts?: InputMaybe<ScheduleEmailReportCharts_Arr_Rel_Insert_Input>;
  selectedGroupBy?: InputMaybe<Scalars['jsonb']>;
  timeGrain?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  versionId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "externalMetrics" */
export type ExternalMetrics_Max_Order_By = {
  clientId?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyIntegrationId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  currentVersion?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  integrationName?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
  metricQuery?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  outputColumns?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  timeGrain?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  versionId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "externalMetrics" */
export type ExternalMetrics_Min_Order_By = {
  clientId?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyIntegrationId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  currentVersion?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  integrationName?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
  metricQuery?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  outputColumns?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  timeGrain?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  versionId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "externalMetrics" */
export type ExternalMetrics_Mutation_Response = {
  __typename?: 'externalMetrics_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ExternalMetrics>;
};

/** input type for inserting object relation for remote table "externalMetrics" */
export type ExternalMetrics_Obj_Rel_Insert_Input = {
  data: ExternalMetrics_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<ExternalMetrics_On_Conflict>;
};

/** on_conflict condition type for table "externalMetrics" */
export type ExternalMetrics_On_Conflict = {
  constraint: ExternalMetrics_Constraint;
  update_columns?: Array<ExternalMetrics_Update_Column>;
  where?: InputMaybe<ExternalMetrics_Bool_Exp>;
};

/** Ordering options when selecting data from "externalMetrics". */
export type ExternalMetrics_Order_By = {
  chartOptions?: InputMaybe<Order_By>;
  clickActions?: InputMaybe<Order_By>;
  clientDeletedMetrics_aggregate?: InputMaybe<ClientDeletedMetrics_Aggregate_Order_By>;
  clientId?: InputMaybe<Order_By>;
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyIntegration?: InputMaybe<CompanyIntegrations_Order_By>;
  companyIntegrationId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  currentVersion?: InputMaybe<Order_By>;
  dataSecuritySettings?: InputMaybe<Order_By>;
  datasetMetricSettings?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  drillDownSettings?: InputMaybe<Order_By>;
  externalDashboardMetrics_aggregate?: InputMaybe<ExternalDashboardMetrics_Aggregate_Order_By>;
  externalMetricRawCsvUrl?: InputMaybe<ExternalMetricRawCsvUrls_Order_By>;
  externalMetricsRlsFilters_aggregate?: InputMaybe<ExternalMetricsRlsFilters_Aggregate_Order_By>;
  groupBy?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  inputFields?: InputMaybe<Order_By>;
  integrationName?: InputMaybe<Order_By>;
  isArchived?: InputMaybe<Order_By>;
  isCreatedByClient?: InputMaybe<Order_By>;
  isEnableGroupBy?: InputMaybe<Order_By>;
  isLive?: InputMaybe<Order_By>;
  isMarkedDeleted?: InputMaybe<Order_By>;
  joinFields?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
  metricQuery?: InputMaybe<Order_By>;
  metricVersion?: InputMaybe<MetricVersions_Order_By>;
  metricVersions_aggregate?: InputMaybe<MetricVersions_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  outputColumns?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  resizeAttributes?: InputMaybe<Order_By>;
  rlsConditions?: InputMaybe<Order_By>;
  scheduleEmailReportCharts_aggregate?: InputMaybe<ScheduleEmailReportCharts_Aggregate_Order_By>;
  selectedGroupBy?: InputMaybe<Order_By>;
  timeGrain?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  versionId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: externalMetrics */
export type ExternalMetrics_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ExternalMetrics_Prepend_Input = {
  chartOptions?: InputMaybe<Scalars['jsonb']>;
  dataSecuritySettings?: InputMaybe<Scalars['jsonb']>;
  datasetMetricSettings?: InputMaybe<Scalars['jsonb']>;
  drillDownSettings?: InputMaybe<Scalars['jsonb']>;
  groupBy?: InputMaybe<Scalars['jsonb']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
  resizeAttributes?: InputMaybe<Scalars['jsonb']>;
  rlsConditions?: InputMaybe<Scalars['jsonb']>;
  selectedGroupBy?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "externalMetrics" */
export enum ExternalMetrics_Select_Column {
  /** column name */
  ChartOptions = 'chartOptions',
  /** column name */
  ClickActions = 'clickActions',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CompanyIntegrationId = 'companyIntegrationId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  CurrentVersion = 'currentVersion',
  /** column name */
  DataSecuritySettings = 'dataSecuritySettings',
  /** column name */
  DatasetMetricSettings = 'datasetMetricSettings',
  /** column name */
  Description = 'description',
  /** column name */
  DrillDownSettings = 'drillDownSettings',
  /** column name */
  GroupBy = 'groupBy',
  /** column name */
  Id = 'id',
  /** column name */
  InputFields = 'inputFields',
  /** column name */
  IntegrationName = 'integrationName',
  /** column name */
  IsArchived = 'isArchived',
  /** column name */
  IsCreatedByClient = 'isCreatedByClient',
  /** column name */
  IsEnableGroupBy = 'isEnableGroupBy',
  /** column name */
  IsLive = 'isLive',
  /** column name */
  IsMarkedDeleted = 'isMarkedDeleted',
  /** column name */
  JoinFields = 'joinFields',
  /** column name */
  LatestVersion = 'latestVersion',
  /** column name */
  Limit = 'limit',
  /** column name */
  MetricId = 'metricId',
  /** column name */
  MetricQuery = 'metricQuery',
  /** column name */
  Name = 'name',
  /** column name */
  OutputColumns = 'outputColumns',
  /** column name */
  Query = 'query',
  /** column name */
  ResizeAttributes = 'resizeAttributes',
  /** column name */
  RlsConditions = 'rlsConditions',
  /** column name */
  SelectedGroupBy = 'selectedGroupBy',
  /** column name */
  TimeGrain = 'timeGrain',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  VersionId = 'versionId'
}

/** input type for updating data in table "externalMetrics" */
export type ExternalMetrics_Set_Input = {
  chartOptions?: InputMaybe<Scalars['jsonb']>;
  clickActions?: InputMaybe<Scalars['json']>;
  clientId?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  companyIntegrationId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdBy?: InputMaybe<Scalars['String']>;
  currentVersion?: InputMaybe<Scalars['numeric']>;
  dataSecuritySettings?: InputMaybe<Scalars['jsonb']>;
  datasetMetricSettings?: InputMaybe<Scalars['jsonb']>;
  description?: InputMaybe<Scalars['String']>;
  drillDownSettings?: InputMaybe<Scalars['jsonb']>;
  groupBy?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
  integrationName?: InputMaybe<Scalars['String']>;
  isArchived?: InputMaybe<Scalars['Boolean']>;
  isCreatedByClient?: InputMaybe<Scalars['Boolean']>;
  isEnableGroupBy?: InputMaybe<Scalars['Boolean']>;
  isLive?: InputMaybe<Scalars['Boolean']>;
  isMarkedDeleted?: InputMaybe<Scalars['Boolean']>;
  joinFields?: InputMaybe<Scalars['json']>;
  latestVersion?: InputMaybe<Scalars['numeric']>;
  limit?: InputMaybe<Scalars['Int']>;
  metricId?: InputMaybe<Scalars['String']>;
  metricQuery?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  outputColumns?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  resizeAttributes?: InputMaybe<Scalars['jsonb']>;
  rlsConditions?: InputMaybe<Scalars['jsonb']>;
  selectedGroupBy?: InputMaybe<Scalars['jsonb']>;
  timeGrain?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  versionId?: InputMaybe<Scalars['uuid']>;
};

/** order by stddev() on columns of table "externalMetrics" */
export type ExternalMetrics_Stddev_Order_By = {
  currentVersion?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "externalMetrics" */
export type ExternalMetrics_Stddev_Pop_Order_By = {
  currentVersion?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "externalMetrics" */
export type ExternalMetrics_Stddev_Samp_Order_By = {
  currentVersion?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "externalMetrics" */
export type ExternalMetrics_Sum_Order_By = {
  currentVersion?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
};

/** update columns of table "externalMetrics" */
export enum ExternalMetrics_Update_Column {
  /** column name */
  ChartOptions = 'chartOptions',
  /** column name */
  ClickActions = 'clickActions',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CompanyIntegrationId = 'companyIntegrationId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  CurrentVersion = 'currentVersion',
  /** column name */
  DataSecuritySettings = 'dataSecuritySettings',
  /** column name */
  DatasetMetricSettings = 'datasetMetricSettings',
  /** column name */
  Description = 'description',
  /** column name */
  DrillDownSettings = 'drillDownSettings',
  /** column name */
  GroupBy = 'groupBy',
  /** column name */
  Id = 'id',
  /** column name */
  InputFields = 'inputFields',
  /** column name */
  IntegrationName = 'integrationName',
  /** column name */
  IsArchived = 'isArchived',
  /** column name */
  IsCreatedByClient = 'isCreatedByClient',
  /** column name */
  IsEnableGroupBy = 'isEnableGroupBy',
  /** column name */
  IsLive = 'isLive',
  /** column name */
  IsMarkedDeleted = 'isMarkedDeleted',
  /** column name */
  JoinFields = 'joinFields',
  /** column name */
  LatestVersion = 'latestVersion',
  /** column name */
  Limit = 'limit',
  /** column name */
  MetricId = 'metricId',
  /** column name */
  MetricQuery = 'metricQuery',
  /** column name */
  Name = 'name',
  /** column name */
  OutputColumns = 'outputColumns',
  /** column name */
  Query = 'query',
  /** column name */
  ResizeAttributes = 'resizeAttributes',
  /** column name */
  RlsConditions = 'rlsConditions',
  /** column name */
  SelectedGroupBy = 'selectedGroupBy',
  /** column name */
  TimeGrain = 'timeGrain',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  VersionId = 'versionId'
}

/** order by var_pop() on columns of table "externalMetrics" */
export type ExternalMetrics_Var_Pop_Order_By = {
  currentVersion?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "externalMetrics" */
export type ExternalMetrics_Var_Samp_Order_By = {
  currentVersion?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "externalMetrics" */
export type ExternalMetrics_Variance_Order_By = {
  currentVersion?: InputMaybe<Order_By>;
  latestVersion?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
};

export type GenerateDrillQueryInput = {
  baseQuery: Scalars['String'];
  database: Scalars['String'];
  drillType?: InputMaybe<Scalars['String']>;
  filters: Scalars['json'];
};

export type GenerateDrillQueryOutput = {
  __typename?: 'generateDrillQueryOutput';
  error?: Maybe<Scalars['String']>;
  modifiedQuery?: Maybe<Scalars['String']>;
};

export type GetOpenaiChatResponseInput = {
  messages: Scalars['json'];
};

export type GetOpenaiChatResponseOutput = {
  __typename?: 'getOpenaiChatResponseOutput';
  data?: Maybe<Scalars['json']>;
};

/** columns and relationships of "guestTokens" */
export type GuestTokens = {
  __typename?: 'guestTokens';
  clientId: Scalars['String'];
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  expire?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  lastUsed: Scalars['timestamptz'];
  params: Scalars['jsonb'];
  /** An object relationship */
  scheduleEmailReport?: Maybe<ScheduleEmailReports>;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "guestTokens" */
export type GuestTokensParamsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "guestTokens" */
export type GuestTokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GuestTokens_Max_Order_By>;
  min?: InputMaybe<GuestTokens_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type GuestTokens_Append_Input = {
  params?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "guestTokens". All fields are combined with a logical 'AND'. */
export type GuestTokens_Bool_Exp = {
  _and?: InputMaybe<Array<GuestTokens_Bool_Exp>>;
  _not?: InputMaybe<GuestTokens_Bool_Exp>;
  _or?: InputMaybe<Array<GuestTokens_Bool_Exp>>;
  clientId?: InputMaybe<String_Comparison_Exp>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  expire?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  lastUsed?: InputMaybe<Timestamptz_Comparison_Exp>;
  params?: InputMaybe<Jsonb_Comparison_Exp>;
  scheduleEmailReport?: InputMaybe<ScheduleEmailReports_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "guestTokens" */
export enum GuestTokens_Constraint {
  /** unique or primary key constraint on columns "id" */
  GuestTokenPkey = 'guestToken_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type GuestTokens_Delete_At_Path_Input = {
  params?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type GuestTokens_Delete_Elem_Input = {
  params?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type GuestTokens_Delete_Key_Input = {
  params?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "guestTokens" */
export type GuestTokens_Insert_Input = {
  clientId?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  expire?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastUsed?: InputMaybe<Scalars['timestamptz']>;
  params?: InputMaybe<Scalars['jsonb']>;
  scheduleEmailReport?: InputMaybe<ScheduleEmailReports_Obj_Rel_Insert_Input>;
};

/** order by max() on columns of table "guestTokens" */
export type GuestTokens_Max_Order_By = {
  clientId?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  expire?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUsed?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "guestTokens" */
export type GuestTokens_Min_Order_By = {
  clientId?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  expire?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUsed?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "guestTokens" */
export type GuestTokens_Mutation_Response = {
  __typename?: 'guestTokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GuestTokens>;
};

/** input type for inserting object relation for remote table "guestTokens" */
export type GuestTokens_Obj_Rel_Insert_Input = {
  data: GuestTokens_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<GuestTokens_On_Conflict>;
};

/** on_conflict condition type for table "guestTokens" */
export type GuestTokens_On_Conflict = {
  constraint: GuestTokens_Constraint;
  update_columns?: Array<GuestTokens_Update_Column>;
  where?: InputMaybe<GuestTokens_Bool_Exp>;
};

/** Ordering options when selecting data from "guestTokens". */
export type GuestTokens_Order_By = {
  clientId?: InputMaybe<Order_By>;
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  expire?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUsed?: InputMaybe<Order_By>;
  params?: InputMaybe<Order_By>;
  scheduleEmailReport?: InputMaybe<ScheduleEmailReports_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: guestTokens */
export type GuestTokens_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type GuestTokens_Prepend_Input = {
  params?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "guestTokens" */
export enum GuestTokens_Select_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Expire = 'expire',
  /** column name */
  Id = 'id',
  /** column name */
  LastUsed = 'lastUsed',
  /** column name */
  Params = 'params',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "guestTokens" */
export type GuestTokens_Set_Input = {
  clientId?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  expire?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastUsed?: InputMaybe<Scalars['timestamptz']>;
  params?: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "guestTokens" */
export enum GuestTokens_Update_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Expire = 'expire',
  /** column name */
  Id = 'id',
  /** column name */
  LastUsed = 'lastUsed',
  /** column name */
  Params = 'params'
}

/** Specifications for integration of sources and destinations and data will be inserted manually as migrations. */
export type IntegrationSpecifications = {
  __typename?: 'integrationSpecifications';
  fields: Scalars['jsonb'];
  id: Scalars['uuid'];
  integrationId: Scalars['uuid'];
  integrationName: Scalars['String'];
};


/** Specifications for integration of sources and destinations and data will be inserted manually as migrations. */
export type IntegrationSpecificationsFieldsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "integrationSpecifications". All fields are combined with a logical 'AND'. */
export type IntegrationSpecifications_Bool_Exp = {
  _and?: InputMaybe<Array<IntegrationSpecifications_Bool_Exp>>;
  _not?: InputMaybe<IntegrationSpecifications_Bool_Exp>;
  _or?: InputMaybe<Array<IntegrationSpecifications_Bool_Exp>>;
  fields?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  integrationId?: InputMaybe<Uuid_Comparison_Exp>;
  integrationName?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "integrationSpecifications". */
export type IntegrationSpecifications_Order_By = {
  fields?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  integrationId?: InputMaybe<Order_By>;
  integrationName?: InputMaybe<Order_By>;
};

/** select columns of table "integrationSpecifications" */
export enum IntegrationSpecifications_Select_Column {
  /** column name */
  Fields = 'fields',
  /** column name */
  Id = 'id',
  /** column name */
  IntegrationId = 'integrationId',
  /** column name */
  IntegrationName = 'integrationName'
}

/** columns and relationships of "integrations" */
export type Integrations = {
  __typename?: 'integrations';
  description: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
};

/** Boolean expression to filter rows from the table "integrations". All fields are combined with a logical 'AND'. */
export type Integrations_Bool_Exp = {
  _and?: InputMaybe<Array<Integrations_Bool_Exp>>;
  _not?: InputMaybe<Integrations_Bool_Exp>;
  _or?: InputMaybe<Array<Integrations_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  icon?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "integrations". */
export type Integrations_Order_By = {
  description?: InputMaybe<Order_By>;
  icon?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** select columns of table "integrations" */
export enum Integrations_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "metricTags" */
export type MetricTags = {
  __typename?: 'metricTags';
  id: Scalars['uuid'];
  /** An object relationship */
  metric: Metrics;
  metricId: Scalars['uuid'];
  tagId: Scalars['uuid'];
};

/** order by aggregate values of table "metricTags" */
export type MetricTags_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<MetricTags_Max_Order_By>;
  min?: InputMaybe<MetricTags_Min_Order_By>;
};

/** input type for inserting array relation for remote table "metricTags" */
export type MetricTags_Arr_Rel_Insert_Input = {
  data: Array<MetricTags_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<MetricTags_On_Conflict>;
};

/** Boolean expression to filter rows from the table "metricTags". All fields are combined with a logical 'AND'. */
export type MetricTags_Bool_Exp = {
  _and?: InputMaybe<Array<MetricTags_Bool_Exp>>;
  _not?: InputMaybe<MetricTags_Bool_Exp>;
  _or?: InputMaybe<Array<MetricTags_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metric?: InputMaybe<Metrics_Bool_Exp>;
  metricId?: InputMaybe<Uuid_Comparison_Exp>;
  tagId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "metricTags" */
export enum MetricTags_Constraint {
  /** unique or primary key constraint on columns "id" */
  MetricTagsPkey = 'metricTags_pkey'
}

/** input type for inserting data into table "metricTags" */
export type MetricTags_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  metric?: InputMaybe<Metrics_Obj_Rel_Insert_Input>;
  metricId?: InputMaybe<Scalars['uuid']>;
  tagId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "metricTags" */
export type MetricTags_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
  tagId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "metricTags" */
export type MetricTags_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
  tagId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "metricTags" */
export type MetricTags_Mutation_Response = {
  __typename?: 'metricTags_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<MetricTags>;
};

/** on_conflict condition type for table "metricTags" */
export type MetricTags_On_Conflict = {
  constraint: MetricTags_Constraint;
  update_columns?: Array<MetricTags_Update_Column>;
  where?: InputMaybe<MetricTags_Bool_Exp>;
};

/** Ordering options when selecting data from "metricTags". */
export type MetricTags_Order_By = {
  id?: InputMaybe<Order_By>;
  metric?: InputMaybe<Metrics_Order_By>;
  metricId?: InputMaybe<Order_By>;
  tagId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: metricTags */
export type MetricTags_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "metricTags" */
export enum MetricTags_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  MetricId = 'metricId',
  /** column name */
  TagId = 'tagId'
}

/** input type for updating data in table "metricTags" */
export type MetricTags_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  metricId?: InputMaybe<Scalars['uuid']>;
  tagId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "metricTags" */
export enum MetricTags_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  MetricId = 'metricId',
  /** column name */
  TagId = 'tagId'
}

/** Metric version history */
export type MetricVersions = {
  __typename?: 'metricVersions';
  changes?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamptz'];
  createdBy: Scalars['String'];
  /** An object relationship */
  externalMetric: ExternalMetrics;
  /** An array relationship */
  externalMetrics: Array<ExternalMetrics>;
  id: Scalars['uuid'];
  metric: Scalars['jsonb'];
  metricId: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
  updatedBy: Scalars['String'];
  version: Scalars['Int'];
};


/** Metric version history */
export type MetricVersionsExternalMetricsArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetrics_Order_By>>;
  where?: InputMaybe<ExternalMetrics_Bool_Exp>;
};


/** Metric version history */
export type MetricVersionsMetricArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "metricVersions" */
export type MetricVersions_Aggregate_Order_By = {
  avg?: InputMaybe<MetricVersions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<MetricVersions_Max_Order_By>;
  min?: InputMaybe<MetricVersions_Min_Order_By>;
  stddev?: InputMaybe<MetricVersions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<MetricVersions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<MetricVersions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<MetricVersions_Sum_Order_By>;
  var_pop?: InputMaybe<MetricVersions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<MetricVersions_Var_Samp_Order_By>;
  variance?: InputMaybe<MetricVersions_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type MetricVersions_Append_Input = {
  metric?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "metricVersions" */
export type MetricVersions_Arr_Rel_Insert_Input = {
  data: Array<MetricVersions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<MetricVersions_On_Conflict>;
};

/** order by avg() on columns of table "metricVersions" */
export type MetricVersions_Avg_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "metricVersions". All fields are combined with a logical 'AND'. */
export type MetricVersions_Bool_Exp = {
  _and?: InputMaybe<Array<MetricVersions_Bool_Exp>>;
  _not?: InputMaybe<MetricVersions_Bool_Exp>;
  _or?: InputMaybe<Array<MetricVersions_Bool_Exp>>;
  changes?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<String_Comparison_Exp>;
  externalMetric?: InputMaybe<ExternalMetrics_Bool_Exp>;
  externalMetrics?: InputMaybe<ExternalMetrics_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metric?: InputMaybe<Jsonb_Comparison_Exp>;
  metricId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<String_Comparison_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "metricVersions" */
export enum MetricVersions_Constraint {
  /** unique or primary key constraint on columns "metricId", "version" */
  MetricVersionsMetricIdVersionKey = 'metricVersions_metricId_version_key',
  /** unique or primary key constraint on columns "id" */
  MetricVersionsPkey = 'metricVersions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type MetricVersions_Delete_At_Path_Input = {
  metric?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type MetricVersions_Delete_Elem_Input = {
  metric?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type MetricVersions_Delete_Key_Input = {
  metric?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "metricVersions" */
export type MetricVersions_Inc_Input = {
  version?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "metricVersions" */
export type MetricVersions_Insert_Input = {
  changes?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdBy?: InputMaybe<Scalars['String']>;
  externalMetric?: InputMaybe<ExternalMetrics_Obj_Rel_Insert_Input>;
  externalMetrics?: InputMaybe<ExternalMetrics_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  metric?: InputMaybe<Scalars['jsonb']>;
  metricId?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  updatedBy?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

/** order by max() on columns of table "metricVersions" */
export type MetricVersions_Max_Order_By = {
  changes?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "metricVersions" */
export type MetricVersions_Min_Order_By = {
  changes?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "metricVersions" */
export type MetricVersions_Mutation_Response = {
  __typename?: 'metricVersions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<MetricVersions>;
};

/** input type for inserting object relation for remote table "metricVersions" */
export type MetricVersions_Obj_Rel_Insert_Input = {
  data: MetricVersions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<MetricVersions_On_Conflict>;
};

/** on_conflict condition type for table "metricVersions" */
export type MetricVersions_On_Conflict = {
  constraint: MetricVersions_Constraint;
  update_columns?: Array<MetricVersions_Update_Column>;
  where?: InputMaybe<MetricVersions_Bool_Exp>;
};

/** Ordering options when selecting data from "metricVersions". */
export type MetricVersions_Order_By = {
  changes?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  externalMetric?: InputMaybe<ExternalMetrics_Order_By>;
  externalMetrics_aggregate?: InputMaybe<ExternalMetrics_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  metric?: InputMaybe<Order_By>;
  metricId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: metricVersions */
export type MetricVersions_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type MetricVersions_Prepend_Input = {
  metric?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "metricVersions" */
export enum MetricVersions_Select_Column {
  /** column name */
  Changes = 'changes',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  Id = 'id',
  /** column name */
  Metric = 'metric',
  /** column name */
  MetricId = 'metricId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "metricVersions" */
export type MetricVersions_Set_Input = {
  changes?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdBy?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metric?: InputMaybe<Scalars['jsonb']>;
  metricId?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  updatedBy?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

/** order by stddev() on columns of table "metricVersions" */
export type MetricVersions_Stddev_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "metricVersions" */
export type MetricVersions_Stddev_Pop_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "metricVersions" */
export type MetricVersions_Stddev_Samp_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "metricVersions" */
export type MetricVersions_Sum_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** update columns of table "metricVersions" */
export enum MetricVersions_Update_Column {
  /** column name */
  Changes = 'changes',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  Id = 'id',
  /** column name */
  Metric = 'metric',
  /** column name */
  MetricId = 'metricId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  Version = 'version'
}

/** order by var_pop() on columns of table "metricVersions" */
export type MetricVersions_Var_Pop_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "metricVersions" */
export type MetricVersions_Var_Samp_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "metricVersions" */
export type MetricVersions_Variance_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** columns and relationships of "metrics" */
export type Metrics = {
  __typename?: 'metrics';
  actorId: Scalars['uuid'];
  chartOption: Scalars['jsonb'];
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  /** An object relationship */
  companyIntegration: CompanyIntegrations;
  createdAt: Scalars['timestamptz'];
  /** An array relationship */
  dashboardMetrics: Array<DashboardMetrics>;
  dbName: Scalars['String'];
  description: Scalars['String'];
  /** An array relationship */
  documents: Array<Documents>;
  externalId: Scalars['uuid'];
  id: Scalars['uuid'];
  inputFields?: Maybe<Scalars['jsonb']>;
  lock: Scalars['Boolean'];
  metricQuery?: Maybe<Scalars['String']>;
  /** An array relationship */
  metricTags: Array<MetricTags>;
  name: Scalars['String'];
  outputColumns?: Maybe<Scalars['String']>;
  publishType: Scalars['String'];
  query: Scalars['String'];
  trackLineage: Scalars['Boolean'];
  updatedAt: Scalars['timestamptz'];
  verify: Scalars['Boolean'];
};


/** columns and relationships of "metrics" */
export type MetricsChartOptionArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "metrics" */
export type MetricsDashboardMetricsArgs = {
  distinct_on?: InputMaybe<Array<DashboardMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DashboardMetrics_Order_By>>;
  where?: InputMaybe<DashboardMetrics_Bool_Exp>;
};


/** columns and relationships of "metrics" */
export type MetricsDocumentsArgs = {
  distinct_on?: InputMaybe<Array<Documents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Documents_Order_By>>;
  where?: InputMaybe<Documents_Bool_Exp>;
};


/** columns and relationships of "metrics" */
export type MetricsInputFieldsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "metrics" */
export type MetricsMetricTagsArgs = {
  distinct_on?: InputMaybe<Array<MetricTags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MetricTags_Order_By>>;
  where?: InputMaybe<MetricTags_Bool_Exp>;
};

/** order by aggregate values of table "metrics" */
export type Metrics_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Metrics_Max_Order_By>;
  min?: InputMaybe<Metrics_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Metrics_Append_Input = {
  chartOption?: InputMaybe<Scalars['jsonb']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "metrics" */
export type Metrics_Arr_Rel_Insert_Input = {
  data: Array<Metrics_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Metrics_On_Conflict>;
};

/** Boolean expression to filter rows from the table "metrics". All fields are combined with a logical 'AND'. */
export type Metrics_Bool_Exp = {
  _and?: InputMaybe<Array<Metrics_Bool_Exp>>;
  _not?: InputMaybe<Metrics_Bool_Exp>;
  _or?: InputMaybe<Array<Metrics_Bool_Exp>>;
  actorId?: InputMaybe<Uuid_Comparison_Exp>;
  chartOption?: InputMaybe<Jsonb_Comparison_Exp>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  companyIntegration?: InputMaybe<CompanyIntegrations_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  dashboardMetrics?: InputMaybe<DashboardMetrics_Bool_Exp>;
  dbName?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  documents?: InputMaybe<Documents_Bool_Exp>;
  externalId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  inputFields?: InputMaybe<Jsonb_Comparison_Exp>;
  lock?: InputMaybe<Boolean_Comparison_Exp>;
  metricQuery?: InputMaybe<String_Comparison_Exp>;
  metricTags?: InputMaybe<MetricTags_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  outputColumns?: InputMaybe<String_Comparison_Exp>;
  publishType?: InputMaybe<String_Comparison_Exp>;
  query?: InputMaybe<String_Comparison_Exp>;
  trackLineage?: InputMaybe<Boolean_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  verify?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "metrics" */
export enum Metrics_Constraint {
  /** unique or primary key constraint on columns "externalId" */
  MetricsExternalIdKey = 'metrics_externalId_key',
  /** unique or primary key constraint on columns "id" */
  MetricsPkey = 'metrics_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Metrics_Delete_At_Path_Input = {
  chartOption?: InputMaybe<Array<Scalars['String']>>;
  inputFields?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Metrics_Delete_Elem_Input = {
  chartOption?: InputMaybe<Scalars['Int']>;
  inputFields?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Metrics_Delete_Key_Input = {
  chartOption?: InputMaybe<Scalars['String']>;
  inputFields?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "metrics" */
export type Metrics_Insert_Input = {
  actorId?: InputMaybe<Scalars['uuid']>;
  chartOption?: InputMaybe<Scalars['jsonb']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  companyIntegration?: InputMaybe<CompanyIntegrations_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  dashboardMetrics?: InputMaybe<DashboardMetrics_Arr_Rel_Insert_Input>;
  dbName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<Documents_Arr_Rel_Insert_Input>;
  externalId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
  lock?: InputMaybe<Scalars['Boolean']>;
  metricQuery?: InputMaybe<Scalars['String']>;
  metricTags?: InputMaybe<MetricTags_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  outputColumns?: InputMaybe<Scalars['String']>;
  publishType?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  trackLineage?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  verify?: InputMaybe<Scalars['Boolean']>;
};

/** order by max() on columns of table "metrics" */
export type Metrics_Max_Order_By = {
  actorId?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  dbName?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  externalId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metricQuery?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  outputColumns?: InputMaybe<Order_By>;
  publishType?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "metrics" */
export type Metrics_Min_Order_By = {
  actorId?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  dbName?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  externalId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metricQuery?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  outputColumns?: InputMaybe<Order_By>;
  publishType?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "metrics" */
export type Metrics_Mutation_Response = {
  __typename?: 'metrics_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Metrics>;
};

/** input type for inserting object relation for remote table "metrics" */
export type Metrics_Obj_Rel_Insert_Input = {
  data: Metrics_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Metrics_On_Conflict>;
};

/** on_conflict condition type for table "metrics" */
export type Metrics_On_Conflict = {
  constraint: Metrics_Constraint;
  update_columns?: Array<Metrics_Update_Column>;
  where?: InputMaybe<Metrics_Bool_Exp>;
};

/** Ordering options when selecting data from "metrics". */
export type Metrics_Order_By = {
  actorId?: InputMaybe<Order_By>;
  chartOption?: InputMaybe<Order_By>;
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyIntegration?: InputMaybe<CompanyIntegrations_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  dashboardMetrics_aggregate?: InputMaybe<DashboardMetrics_Aggregate_Order_By>;
  dbName?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  documents_aggregate?: InputMaybe<Documents_Aggregate_Order_By>;
  externalId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  inputFields?: InputMaybe<Order_By>;
  lock?: InputMaybe<Order_By>;
  metricQuery?: InputMaybe<Order_By>;
  metricTags_aggregate?: InputMaybe<MetricTags_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  outputColumns?: InputMaybe<Order_By>;
  publishType?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  trackLineage?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  verify?: InputMaybe<Order_By>;
};

/** primary key columns input for table: metrics */
export type Metrics_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Metrics_Prepend_Input = {
  chartOption?: InputMaybe<Scalars['jsonb']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "metrics" */
export enum Metrics_Select_Column {
  /** column name */
  ActorId = 'actorId',
  /** column name */
  ChartOption = 'chartOption',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DbName = 'dbName',
  /** column name */
  Description = 'description',
  /** column name */
  ExternalId = 'externalId',
  /** column name */
  Id = 'id',
  /** column name */
  InputFields = 'inputFields',
  /** column name */
  Lock = 'lock',
  /** column name */
  MetricQuery = 'metricQuery',
  /** column name */
  Name = 'name',
  /** column name */
  OutputColumns = 'outputColumns',
  /** column name */
  PublishType = 'publishType',
  /** column name */
  Query = 'query',
  /** column name */
  TrackLineage = 'trackLineage',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Verify = 'verify'
}

/** input type for updating data in table "metrics" */
export type Metrics_Set_Input = {
  actorId?: InputMaybe<Scalars['uuid']>;
  chartOption?: InputMaybe<Scalars['jsonb']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  dbName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
  lock?: InputMaybe<Scalars['Boolean']>;
  metricQuery?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  outputColumns?: InputMaybe<Scalars['String']>;
  publishType?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  trackLineage?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  verify?: InputMaybe<Scalars['Boolean']>;
};

/** update columns of table "metrics" */
export enum Metrics_Update_Column {
  /** column name */
  ActorId = 'actorId',
  /** column name */
  ChartOption = 'chartOption',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DbName = 'dbName',
  /** column name */
  Description = 'description',
  /** column name */
  ExternalId = 'externalId',
  /** column name */
  Id = 'id',
  /** column name */
  InputFields = 'inputFields',
  /** column name */
  Lock = 'lock',
  /** column name */
  MetricQuery = 'metricQuery',
  /** column name */
  Name = 'name',
  /** column name */
  OutputColumns = 'outputColumns',
  /** column name */
  PublishType = 'publishType',
  /** column name */
  Query = 'query',
  /** column name */
  TrackLineage = 'trackLineage',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Verify = 'verify'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  acceptInvitation?: Maybe<AcceptInvitationOutput>;
  cacheIntegrationSchema?: Maybe<CacheIntegrationSchemaOutput>;
  changePassword?: Maybe<ChangePasswordOutput>;
  changeUserName?: Maybe<ChangeUserNameOutput>;
  companySubsetTableData?: Maybe<CompanySubsetTableDataOutput>;
  createCompanyRedis?: Maybe<CreateCompanyRedisOutput>;
  createConnection?: Maybe<CreateConnectionOutput>;
  createDestination?: Maybe<CreateDestinationOutput>;
  createOperation?: Maybe<CreateOperationOutput>;
  createSource?: Maybe<CreateSourceOutput>;
  createViewDataModel?: Maybe<CreateViewDataModelOutput>;
  createViewInDb?: Maybe<CreateViewInDbOutput>;
  datasetMetricCreation?: Maybe<DatasetMetricCreationOutput>;
  deleteDestination?: Maybe<DeleteDestinationOutput>;
  /** Deletes an existing metric version */
  deleteMetricVersion?: Maybe<DeleteMetricVersionOutput>;
  deleteSource?: Maybe<DeleteSourceOutput>;
  /** delete data from the table: "apiTokens" */
  delete_apiTokens?: Maybe<ApiTokens_Mutation_Response>;
  /** delete single row from the table: "apiTokens" */
  delete_apiTokens_by_pk?: Maybe<ApiTokens>;
  /** delete data from the table: "clientDashboardLayout" */
  delete_clientDashboardLayout?: Maybe<ClientDashboardLayout_Mutation_Response>;
  /** delete single row from the table: "clientDashboardLayout" */
  delete_clientDashboardLayout_by_pk?: Maybe<ClientDashboardLayout>;
  /** delete data from the table: "clientDeletedMetrics" */
  delete_clientDeletedMetrics?: Maybe<ClientDeletedMetrics_Mutation_Response>;
  /** delete single row from the table: "clientDeletedMetrics" */
  delete_clientDeletedMetrics_by_pk?: Maybe<ClientDeletedMetrics>;
  /** delete data from the table: "companyCacheSchemas" */
  delete_companyCacheSchemas?: Maybe<CompanyCacheSchemas_Mutation_Response>;
  /** delete single row from the table: "companyCacheSchemas" */
  delete_companyCacheSchemas_by_pk?: Maybe<CompanyCacheSchemas>;
  /** delete data from the table: "companyDatabases" */
  delete_companyDatabases?: Maybe<CompanyDatabases_Mutation_Response>;
  /** delete single row from the table: "companyDatabases" */
  delete_companyDatabases_by_pk?: Maybe<CompanyDatabases>;
  /** delete data from the table: "companyIntegrations" */
  delete_companyIntegrations?: Maybe<CompanyIntegrations_Mutation_Response>;
  /** delete single row from the table: "companyIntegrations" */
  delete_companyIntegrations_by_pk?: Maybe<CompanyIntegrations>;
  /** delete data from the table: "companyRedis" */
  delete_companyRedis?: Maybe<CompanyRedis_Mutation_Response>;
  /** delete single row from the table: "companyRedis" */
  delete_companyRedis_by_pk?: Maybe<CompanyRedis>;
  /** delete data from the table: "companyRlsFilters" */
  delete_companyRlsFilters?: Maybe<CompanyRlsFilters_Mutation_Response>;
  /** delete single row from the table: "companyRlsFilters" */
  delete_companyRlsFilters_by_pk?: Maybe<CompanyRlsFilters>;
  /** delete data from the table: "companyRoles" */
  delete_companyRoles?: Maybe<CompanyRoles_Mutation_Response>;
  /** delete single row from the table: "companyRoles" */
  delete_companyRoles_by_pk?: Maybe<CompanyRoles>;
  /** delete data from the table: "companySubsetTables" */
  delete_companySubsetTables?: Maybe<CompanySubsetTables_Mutation_Response>;
  /** delete single row from the table: "companySubsetTables" */
  delete_companySubsetTables_by_pk?: Maybe<CompanySubsetTables>;
  /** delete data from the table: "companyWorkspaces" */
  delete_companyWorkspaces?: Maybe<CompanyWorkspaces_Mutation_Response>;
  /** delete single row from the table: "companyWorkspaces" */
  delete_companyWorkspaces_by_pk?: Maybe<CompanyWorkspaces>;
  /** delete data from the table: "customLayers" */
  delete_customLayers?: Maybe<CustomLayers_Mutation_Response>;
  /** delete single row from the table: "customLayers" */
  delete_customLayers_by_pk?: Maybe<CustomLayers>;
  /** delete data from the table: "customSqlColumns" */
  delete_customSqlColumns?: Maybe<CustomSqlColumns_Mutation_Response>;
  /** delete single row from the table: "customSqlColumns" */
  delete_customSqlColumns_by_pk?: Maybe<CustomSqlColumns>;
  /** delete data from the table: "dashboardMetrics" */
  delete_dashboardMetrics?: Maybe<DashboardMetrics_Mutation_Response>;
  /** delete single row from the table: "dashboardMetrics" */
  delete_dashboardMetrics_by_pk?: Maybe<DashboardMetrics>;
  /** delete data from the table: "dashboards" */
  delete_dashboards?: Maybe<Dashboards_Mutation_Response>;
  /** delete single row from the table: "dashboards" */
  delete_dashboards_by_pk?: Maybe<Dashboards>;
  /** delete data from the table: "dataModels" */
  delete_dataModels?: Maybe<DataModels_Mutation_Response>;
  /** delete single row from the table: "dataModels" */
  delete_dataModels_by_pk?: Maybe<DataModels>;
  /** delete data from the table: "demoTheme" */
  delete_demoTheme?: Maybe<DemoTheme_Mutation_Response>;
  /** delete single row from the table: "demoTheme" */
  delete_demoTheme_by_pk?: Maybe<DemoTheme>;
  /** delete data from the table: "documents" */
  delete_documents?: Maybe<Documents_Mutation_Response>;
  /** delete single row from the table: "documents" */
  delete_documents_by_pk?: Maybe<Documents>;
  /** delete data from the table: "externalDashboardMetrics" */
  delete_externalDashboardMetrics?: Maybe<ExternalDashboardMetrics_Mutation_Response>;
  /** delete single row from the table: "externalDashboardMetrics" */
  delete_externalDashboardMetrics_by_pk?: Maybe<ExternalDashboardMetrics>;
  /** delete data from the table: "externalDashboardThemeClients" */
  delete_externalDashboardThemeClients?: Maybe<ExternalDashboardThemeClients_Mutation_Response>;
  /** delete single row from the table: "externalDashboardThemeClients" */
  delete_externalDashboardThemeClients_by_pk?: Maybe<ExternalDashboardThemeClients>;
  /** delete data from the table: "externalDashboardThemes" */
  delete_externalDashboardThemes?: Maybe<ExternalDashboardThemes_Mutation_Response>;
  /** delete single row from the table: "externalDashboardThemes" */
  delete_externalDashboardThemes_by_pk?: Maybe<ExternalDashboardThemes>;
  /** delete data from the table: "externalDashboards" */
  delete_externalDashboards?: Maybe<ExternalDashboards_Mutation_Response>;
  /** delete single row from the table: "externalDashboards" */
  delete_externalDashboards_by_pk?: Maybe<ExternalDashboards>;
  /** delete data from the table: "externalDatasets" */
  delete_externalDatasets?: Maybe<ExternalDatasets_Mutation_Response>;
  /** delete single row from the table: "externalDatasets" */
  delete_externalDatasets_by_pk?: Maybe<ExternalDatasets>;
  /** delete data from the table: "externalMetricRawCsvUrls" */
  delete_externalMetricRawCsvUrls?: Maybe<ExternalMetricRawCsvUrls_Mutation_Response>;
  /** delete single row from the table: "externalMetricRawCsvUrls" */
  delete_externalMetricRawCsvUrls_by_pk?: Maybe<ExternalMetricRawCsvUrls>;
  /** delete data from the table: "externalMetrics" */
  delete_externalMetrics?: Maybe<ExternalMetrics_Mutation_Response>;
  /** delete data from the table: "externalMetricsRlsFilters" */
  delete_externalMetricsRlsFilters?: Maybe<ExternalMetricsRlsFilters_Mutation_Response>;
  /** delete single row from the table: "externalMetricsRlsFilters" */
  delete_externalMetricsRlsFilters_by_pk?: Maybe<ExternalMetricsRlsFilters>;
  /** delete single row from the table: "externalMetrics" */
  delete_externalMetrics_by_pk?: Maybe<ExternalMetrics>;
  /** delete data from the table: "guestTokens" */
  delete_guestTokens?: Maybe<GuestTokens_Mutation_Response>;
  /** delete single row from the table: "guestTokens" */
  delete_guestTokens_by_pk?: Maybe<GuestTokens>;
  /** delete data from the table: "metricVersions" */
  delete_metricVersions?: Maybe<MetricVersions_Mutation_Response>;
  /** delete single row from the table: "metricVersions" */
  delete_metricVersions_by_pk?: Maybe<MetricVersions>;
  /** delete data from the table: "metrics" */
  delete_metrics?: Maybe<Metrics_Mutation_Response>;
  /** delete single row from the table: "metrics" */
  delete_metrics_by_pk?: Maybe<Metrics>;
  /** delete data from the table: "organizations" */
  delete_organizations?: Maybe<Organizations_Mutation_Response>;
  /** delete single row from the table: "organizations" */
  delete_organizations_by_pk?: Maybe<Organizations>;
  /** delete data from the table: "scheduleEmailReportCharts" */
  delete_scheduleEmailReportCharts?: Maybe<ScheduleEmailReportCharts_Mutation_Response>;
  /** delete single row from the table: "scheduleEmailReportCharts" */
  delete_scheduleEmailReportCharts_by_pk?: Maybe<ScheduleEmailReportCharts>;
  /** delete data from the table: "scheduleEmailReports" */
  delete_scheduleEmailReports?: Maybe<ScheduleEmailReports_Mutation_Response>;
  /** delete single row from the table: "scheduleEmailReports" */
  delete_scheduleEmailReports_by_pk?: Maybe<ScheduleEmailReports>;
  /** delete data from the table: "secrets" */
  delete_secrets?: Maybe<Secrets_Mutation_Response>;
  /** delete single row from the table: "secrets" */
  delete_secrets_by_pk?: Maybe<Secrets>;
  /** delete data from the table: "sharingSettings" */
  delete_sharingSettings?: Maybe<SharingSettings_Mutation_Response>;
  /** delete single row from the table: "sharingSettings" */
  delete_sharingSettings_by_pk?: Maybe<SharingSettings>;
  /** delete data from the table: "themes" */
  delete_themes?: Maybe<Themes_Mutation_Response>;
  /** delete single row from the table: "themes" */
  delete_themes_by_pk?: Maybe<Themes>;
  /** delete data from the table: "userRoles" */
  delete_userRoles?: Maybe<UserRoles_Mutation_Response>;
  /** delete single row from the table: "userRoles" */
  delete_userRoles_by_pk?: Maybe<UserRoles>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "whitelistedDomains" */
  delete_whitelistedDomains?: Maybe<WhitelistedDomains_Mutation_Response>;
  /** delete single row from the table: "whitelistedDomains" */
  delete_whitelistedDomains_by_pk?: Maybe<WhitelistedDomains>;
  /** delete data from the table: "workspaceThemes" */
  delete_workspaceThemes?: Maybe<WorkspaceThemes_Mutation_Response>;
  /** delete single row from the table: "workspaceThemes" */
  delete_workspaceThemes_by_pk?: Maybe<WorkspaceThemes>;
  embeddedMetricQuery?: Maybe<ExternalMetricQueryOutput>;
  /** Run python code and returns data. */
  executePython?: Maybe<ExecutePythonOutput>;
  fetchColumnData?: Maybe<FetchColumnDataOutput>;
  forecast?: Maybe<ForecastOutput>;
  forgetPassword?: Maybe<ForgetPasswordOutput>;
  generateDatasetMetrics?: Maybe<GenerateDatasetMetricsOutput>;
  generateDrillQuery?: Maybe<GenerateDrillQueryOutput>;
  generateEmbeddedMetic?: Maybe<GenerateEmbeddedMeticOutput>;
  generateExternalMetricQuery?: Maybe<GenerateExternalMetricQueryOutput>;
  generateMetricQuery?: Maybe<GenerateMetricQueryOutput>;
  generateOpenaiResponse?: Maybe<GenerateOpenaiResponseOutput>;
  getLineageData?: Maybe<GetLineageDataOutput>;
  getOpenaiChatResponse?: Maybe<GetOpenaiChatResponseOutput>;
  getPreviewTableData?: Maybe<GetPreviewTableDataOutput>;
  getUnderlyingData?: Maybe<GetUnderlyingDataOutput>;
  getUnderlyingSqlQuery?: Maybe<GetUnderlyingSqlQueryOutput>;
  groupbyColumnList?: Maybe<GroupbyColumnListOutput>;
  /** insert data into the table: "apiTokens" */
  insert_apiTokens?: Maybe<ApiTokens_Mutation_Response>;
  /** insert a single row into the table: "apiTokens" */
  insert_apiTokens_one?: Maybe<ApiTokens>;
  /** insert data into the table: "clientDashboardLayout" */
  insert_clientDashboardLayout?: Maybe<ClientDashboardLayout_Mutation_Response>;
  /** insert a single row into the table: "clientDashboardLayout" */
  insert_clientDashboardLayout_one?: Maybe<ClientDashboardLayout>;
  /** insert data into the table: "clientDeletedMetrics" */
  insert_clientDeletedMetrics?: Maybe<ClientDeletedMetrics_Mutation_Response>;
  /** insert a single row into the table: "clientDeletedMetrics" */
  insert_clientDeletedMetrics_one?: Maybe<ClientDeletedMetrics>;
  /** insert data into the table: "companyCacheSchemas" */
  insert_companyCacheSchemas?: Maybe<CompanyCacheSchemas_Mutation_Response>;
  /** insert a single row into the table: "companyCacheSchemas" */
  insert_companyCacheSchemas_one?: Maybe<CompanyCacheSchemas>;
  /** insert data into the table: "companyDatabases" */
  insert_companyDatabases?: Maybe<CompanyDatabases_Mutation_Response>;
  /** insert a single row into the table: "companyDatabases" */
  insert_companyDatabases_one?: Maybe<CompanyDatabases>;
  /** insert data into the table: "companyIntegrations" */
  insert_companyIntegrations?: Maybe<CompanyIntegrations_Mutation_Response>;
  /** insert a single row into the table: "companyIntegrations" */
  insert_companyIntegrations_one?: Maybe<CompanyIntegrations>;
  /** insert data into the table: "companyRedis" */
  insert_companyRedis?: Maybe<CompanyRedis_Mutation_Response>;
  /** insert a single row into the table: "companyRedis" */
  insert_companyRedis_one?: Maybe<CompanyRedis>;
  /** insert data into the table: "companyRlsFilters" */
  insert_companyRlsFilters?: Maybe<CompanyRlsFilters_Mutation_Response>;
  /** insert a single row into the table: "companyRlsFilters" */
  insert_companyRlsFilters_one?: Maybe<CompanyRlsFilters>;
  /** insert data into the table: "companyRoles" */
  insert_companyRoles?: Maybe<CompanyRoles_Mutation_Response>;
  /** insert a single row into the table: "companyRoles" */
  insert_companyRoles_one?: Maybe<CompanyRoles>;
  /** insert data into the table: "companySubsetTables" */
  insert_companySubsetTables?: Maybe<CompanySubsetTables_Mutation_Response>;
  /** insert a single row into the table: "companySubsetTables" */
  insert_companySubsetTables_one?: Maybe<CompanySubsetTables>;
  /** insert data into the table: "companyWorkspaces" */
  insert_companyWorkspaces?: Maybe<CompanyWorkspaces_Mutation_Response>;
  /** insert a single row into the table: "companyWorkspaces" */
  insert_companyWorkspaces_one?: Maybe<CompanyWorkspaces>;
  /** insert data into the table: "customLayers" */
  insert_customLayers?: Maybe<CustomLayers_Mutation_Response>;
  /** insert a single row into the table: "customLayers" */
  insert_customLayers_one?: Maybe<CustomLayers>;
  /** insert data into the table: "customSqlColumns" */
  insert_customSqlColumns?: Maybe<CustomSqlColumns_Mutation_Response>;
  /** insert a single row into the table: "customSqlColumns" */
  insert_customSqlColumns_one?: Maybe<CustomSqlColumns>;
  /** insert data into the table: "dashboardMetrics" */
  insert_dashboardMetrics?: Maybe<DashboardMetrics_Mutation_Response>;
  /** insert a single row into the table: "dashboardMetrics" */
  insert_dashboardMetrics_one?: Maybe<DashboardMetrics>;
  /** insert data into the table: "dashboards" */
  insert_dashboards?: Maybe<Dashboards_Mutation_Response>;
  /** insert a single row into the table: "dashboards" */
  insert_dashboards_one?: Maybe<Dashboards>;
  /** insert data into the table: "dataModels" */
  insert_dataModels?: Maybe<DataModels_Mutation_Response>;
  /** insert a single row into the table: "dataModels" */
  insert_dataModels_one?: Maybe<DataModels>;
  /** insert data into the table: "demoTheme" */
  insert_demoTheme?: Maybe<DemoTheme_Mutation_Response>;
  /** insert a single row into the table: "demoTheme" */
  insert_demoTheme_one?: Maybe<DemoTheme>;
  /** insert data into the table: "documents" */
  insert_documents?: Maybe<Documents_Mutation_Response>;
  /** insert a single row into the table: "documents" */
  insert_documents_one?: Maybe<Documents>;
  /** insert data into the table: "externalDashboardMetrics" */
  insert_externalDashboardMetrics?: Maybe<ExternalDashboardMetrics_Mutation_Response>;
  /** insert a single row into the table: "externalDashboardMetrics" */
  insert_externalDashboardMetrics_one?: Maybe<ExternalDashboardMetrics>;
  /** insert data into the table: "externalDashboardThemeClients" */
  insert_externalDashboardThemeClients?: Maybe<ExternalDashboardThemeClients_Mutation_Response>;
  /** insert a single row into the table: "externalDashboardThemeClients" */
  insert_externalDashboardThemeClients_one?: Maybe<ExternalDashboardThemeClients>;
  /** insert data into the table: "externalDashboardThemes" */
  insert_externalDashboardThemes?: Maybe<ExternalDashboardThemes_Mutation_Response>;
  /** insert a single row into the table: "externalDashboardThemes" */
  insert_externalDashboardThemes_one?: Maybe<ExternalDashboardThemes>;
  /** insert data into the table: "externalDashboards" */
  insert_externalDashboards?: Maybe<ExternalDashboards_Mutation_Response>;
  /** insert a single row into the table: "externalDashboards" */
  insert_externalDashboards_one?: Maybe<ExternalDashboards>;
  /** insert data into the table: "externalDatasets" */
  insert_externalDatasets?: Maybe<ExternalDatasets_Mutation_Response>;
  /** insert a single row into the table: "externalDatasets" */
  insert_externalDatasets_one?: Maybe<ExternalDatasets>;
  /** insert data into the table: "externalMetricRawCsvUrls" */
  insert_externalMetricRawCsvUrls?: Maybe<ExternalMetricRawCsvUrls_Mutation_Response>;
  /** insert a single row into the table: "externalMetricRawCsvUrls" */
  insert_externalMetricRawCsvUrls_one?: Maybe<ExternalMetricRawCsvUrls>;
  /** insert data into the table: "externalMetrics" */
  insert_externalMetrics?: Maybe<ExternalMetrics_Mutation_Response>;
  /** insert data into the table: "externalMetricsRlsFilters" */
  insert_externalMetricsRlsFilters?: Maybe<ExternalMetricsRlsFilters_Mutation_Response>;
  /** insert a single row into the table: "externalMetricsRlsFilters" */
  insert_externalMetricsRlsFilters_one?: Maybe<ExternalMetricsRlsFilters>;
  /** insert a single row into the table: "externalMetrics" */
  insert_externalMetrics_one?: Maybe<ExternalMetrics>;
  /** insert data into the table: "guestTokens" */
  insert_guestTokens?: Maybe<GuestTokens_Mutation_Response>;
  /** insert a single row into the table: "guestTokens" */
  insert_guestTokens_one?: Maybe<GuestTokens>;
  /** insert data into the table: "metricTags" */
  insert_metricTags?: Maybe<MetricTags_Mutation_Response>;
  /** insert a single row into the table: "metricTags" */
  insert_metricTags_one?: Maybe<MetricTags>;
  /** insert data into the table: "metricVersions" */
  insert_metricVersions?: Maybe<MetricVersions_Mutation_Response>;
  /** insert a single row into the table: "metricVersions" */
  insert_metricVersions_one?: Maybe<MetricVersions>;
  /** insert data into the table: "metrics" */
  insert_metrics?: Maybe<Metrics_Mutation_Response>;
  /** insert a single row into the table: "metrics" */
  insert_metrics_one?: Maybe<Metrics>;
  /** insert data into the table: "organizations" */
  insert_organizations?: Maybe<Organizations_Mutation_Response>;
  /** insert a single row into the table: "organizations" */
  insert_organizations_one?: Maybe<Organizations>;
  /** insert data into the table: "scheduleEmailReportCharts" */
  insert_scheduleEmailReportCharts?: Maybe<ScheduleEmailReportCharts_Mutation_Response>;
  /** insert a single row into the table: "scheduleEmailReportCharts" */
  insert_scheduleEmailReportCharts_one?: Maybe<ScheduleEmailReportCharts>;
  /** insert data into the table: "scheduleEmailReports" */
  insert_scheduleEmailReports?: Maybe<ScheduleEmailReports_Mutation_Response>;
  /** insert a single row into the table: "scheduleEmailReports" */
  insert_scheduleEmailReports_one?: Maybe<ScheduleEmailReports>;
  /** insert data into the table: "secrets" */
  insert_secrets?: Maybe<Secrets_Mutation_Response>;
  /** insert a single row into the table: "secrets" */
  insert_secrets_one?: Maybe<Secrets>;
  /** insert data into the table: "sharingSettings" */
  insert_sharingSettings?: Maybe<SharingSettings_Mutation_Response>;
  /** insert a single row into the table: "sharingSettings" */
  insert_sharingSettings_one?: Maybe<SharingSettings>;
  /** insert data into the table: "themes" */
  insert_themes?: Maybe<Themes_Mutation_Response>;
  /** insert a single row into the table: "themes" */
  insert_themes_one?: Maybe<Themes>;
  /** insert data into the table: "userRoles" */
  insert_userRoles?: Maybe<UserRoles_Mutation_Response>;
  /** insert a single row into the table: "userRoles" */
  insert_userRoles_one?: Maybe<UserRoles>;
  /** insert data into the table: "whitelistedDomains" */
  insert_whitelistedDomains?: Maybe<WhitelistedDomains_Mutation_Response>;
  /** insert a single row into the table: "whitelistedDomains" */
  insert_whitelistedDomains_one?: Maybe<WhitelistedDomains>;
  /** insert data into the table: "workspaceThemes" */
  insert_workspaceThemes?: Maybe<WorkspaceThemes_Mutation_Response>;
  /** insert a single row into the table: "workspaceThemes" */
  insert_workspaceThemes_one?: Maybe<WorkspaceThemes>;
  inviteUser?: Maybe<InviteUserOutput>;
  invokeSaveRawCsvDetails?: Maybe<InvokeSaveRawCsvDetailsOutput>;
  invokeSendCsvUrl?: Maybe<InvokeSaveRawCsvDetailsOutput>;
  /** Adds a demo company integration and organization to work with without a real company database. */
  onboardingWithDemoDatabase?: Maybe<SkipOnboardingOutput>;
  previewTable?: Maybe<PreviewTableOutput>;
  querySql?: Maybe<SqlQueryOutput>;
  reInviteUser?: Maybe<InviteUserOutput>;
  resetCompanyRedisData?: Maybe<ResetCompanyRedisDataOutput>;
  resetPassword?: Maybe<ResetPasswordOutput>;
  sendRawCsv?: Maybe<SendRawCsvOutput>;
  shareCsvUrl: Scalars['uuid'];
  signIn?: Maybe<SignInOutput>;
  signUp?: Maybe<SignUpOutputRes>;
  signUpVerification?: Maybe<SignUpVerificationOutput>;
  sqlQuery?: Maybe<SqlQueryOutput>;
  syncConnection?: Maybe<SyncConnectionOutput>;
  testDestination?: Maybe<TestDestinationOutput>;
  testEndpoint?: Maybe<TestOutput>;
  testIntegration?: Maybe<TestIntegrationOutput>;
  testSmtpSettings?: Maybe<TestSmtpSettingsOutput>;
  testSource?: Maybe<TestSourceOutput>;
  updateDestination?: Maybe<UpdateDestinationOutput>;
  updateSource?: Maybe<UpdateSourceOutput>;
  updateViewDataModel?: Maybe<UpdateViewDataModelOutput>;
  /** update data of the table: "apiTokens" */
  update_apiTokens?: Maybe<ApiTokens_Mutation_Response>;
  /** update single row of the table: "apiTokens" */
  update_apiTokens_by_pk?: Maybe<ApiTokens>;
  /** update data of the table: "clientDashboardLayout" */
  update_clientDashboardLayout?: Maybe<ClientDashboardLayout_Mutation_Response>;
  /** update single row of the table: "clientDashboardLayout" */
  update_clientDashboardLayout_by_pk?: Maybe<ClientDashboardLayout>;
  /** update data of the table: "clientDeletedMetrics" */
  update_clientDeletedMetrics?: Maybe<ClientDeletedMetrics_Mutation_Response>;
  /** update single row of the table: "clientDeletedMetrics" */
  update_clientDeletedMetrics_by_pk?: Maybe<ClientDeletedMetrics>;
  /** update data of the table: "companies" */
  update_companies?: Maybe<Companies_Mutation_Response>;
  /** update single row of the table: "companies" */
  update_companies_by_pk?: Maybe<Companies>;
  /** update data of the table: "companyCacheSchemas" */
  update_companyCacheSchemas?: Maybe<CompanyCacheSchemas_Mutation_Response>;
  /** update single row of the table: "companyCacheSchemas" */
  update_companyCacheSchemas_by_pk?: Maybe<CompanyCacheSchemas>;
  /** update data of the table: "companyDatabases" */
  update_companyDatabases?: Maybe<CompanyDatabases_Mutation_Response>;
  /** update single row of the table: "companyDatabases" */
  update_companyDatabases_by_pk?: Maybe<CompanyDatabases>;
  /** update data of the table: "companyIntegrations" */
  update_companyIntegrations?: Maybe<CompanyIntegrations_Mutation_Response>;
  /** update single row of the table: "companyIntegrations" */
  update_companyIntegrations_by_pk?: Maybe<CompanyIntegrations>;
  /** update data of the table: "companyRedis" */
  update_companyRedis?: Maybe<CompanyRedis_Mutation_Response>;
  /** update single row of the table: "companyRedis" */
  update_companyRedis_by_pk?: Maybe<CompanyRedis>;
  /** update data of the table: "companyRlsFilters" */
  update_companyRlsFilters?: Maybe<CompanyRlsFilters_Mutation_Response>;
  /** update single row of the table: "companyRlsFilters" */
  update_companyRlsFilters_by_pk?: Maybe<CompanyRlsFilters>;
  /** update data of the table: "companyRoles" */
  update_companyRoles?: Maybe<CompanyRoles_Mutation_Response>;
  /** update single row of the table: "companyRoles" */
  update_companyRoles_by_pk?: Maybe<CompanyRoles>;
  /** update data of the table: "companySubsetTables" */
  update_companySubsetTables?: Maybe<CompanySubsetTables_Mutation_Response>;
  /** update single row of the table: "companySubsetTables" */
  update_companySubsetTables_by_pk?: Maybe<CompanySubsetTables>;
  /** update data of the table: "companyWorkspaces" */
  update_companyWorkspaces?: Maybe<CompanyWorkspaces_Mutation_Response>;
  /** update single row of the table: "companyWorkspaces" */
  update_companyWorkspaces_by_pk?: Maybe<CompanyWorkspaces>;
  /** update data of the table: "customLayers" */
  update_customLayers?: Maybe<CustomLayers_Mutation_Response>;
  /** update single row of the table: "customLayers" */
  update_customLayers_by_pk?: Maybe<CustomLayers>;
  /** update data of the table: "customSqlColumns" */
  update_customSqlColumns?: Maybe<CustomSqlColumns_Mutation_Response>;
  /** update single row of the table: "customSqlColumns" */
  update_customSqlColumns_by_pk?: Maybe<CustomSqlColumns>;
  /** update data of the table: "dashboardMetrics" */
  update_dashboardMetrics?: Maybe<DashboardMetrics_Mutation_Response>;
  /** update single row of the table: "dashboardMetrics" */
  update_dashboardMetrics_by_pk?: Maybe<DashboardMetrics>;
  /** update data of the table: "dashboards" */
  update_dashboards?: Maybe<Dashboards_Mutation_Response>;
  /** update single row of the table: "dashboards" */
  update_dashboards_by_pk?: Maybe<Dashboards>;
  /** update data of the table: "dataModels" */
  update_dataModels?: Maybe<DataModels_Mutation_Response>;
  /** update single row of the table: "dataModels" */
  update_dataModels_by_pk?: Maybe<DataModels>;
  /** update data of the table: "demoTheme" */
  update_demoTheme?: Maybe<DemoTheme_Mutation_Response>;
  /** update single row of the table: "demoTheme" */
  update_demoTheme_by_pk?: Maybe<DemoTheme>;
  /** update data of the table: "documents" */
  update_documents?: Maybe<Documents_Mutation_Response>;
  /** update single row of the table: "documents" */
  update_documents_by_pk?: Maybe<Documents>;
  /** update data of the table: "externalDashboardMetrics" */
  update_externalDashboardMetrics?: Maybe<ExternalDashboardMetrics_Mutation_Response>;
  /** update single row of the table: "externalDashboardMetrics" */
  update_externalDashboardMetrics_by_pk?: Maybe<ExternalDashboardMetrics>;
  /** update data of the table: "externalDashboardThemeClients" */
  update_externalDashboardThemeClients?: Maybe<ExternalDashboardThemeClients_Mutation_Response>;
  /** update single row of the table: "externalDashboardThemeClients" */
  update_externalDashboardThemeClients_by_pk?: Maybe<ExternalDashboardThemeClients>;
  /** update data of the table: "externalDashboardThemes" */
  update_externalDashboardThemes?: Maybe<ExternalDashboardThemes_Mutation_Response>;
  /** update single row of the table: "externalDashboardThemes" */
  update_externalDashboardThemes_by_pk?: Maybe<ExternalDashboardThemes>;
  /** update data of the table: "externalDashboards" */
  update_externalDashboards?: Maybe<ExternalDashboards_Mutation_Response>;
  /** update single row of the table: "externalDashboards" */
  update_externalDashboards_by_pk?: Maybe<ExternalDashboards>;
  /** update data of the table: "externalDatasets" */
  update_externalDatasets?: Maybe<ExternalDatasets_Mutation_Response>;
  /** update single row of the table: "externalDatasets" */
  update_externalDatasets_by_pk?: Maybe<ExternalDatasets>;
  /** update data of the table: "externalMetricRawCsvUrls" */
  update_externalMetricRawCsvUrls?: Maybe<ExternalMetricRawCsvUrls_Mutation_Response>;
  /** update single row of the table: "externalMetricRawCsvUrls" */
  update_externalMetricRawCsvUrls_by_pk?: Maybe<ExternalMetricRawCsvUrls>;
  /** update data of the table: "externalMetrics" */
  update_externalMetrics?: Maybe<ExternalMetrics_Mutation_Response>;
  /** update data of the table: "externalMetricsRlsFilters" */
  update_externalMetricsRlsFilters?: Maybe<ExternalMetricsRlsFilters_Mutation_Response>;
  /** update single row of the table: "externalMetricsRlsFilters" */
  update_externalMetricsRlsFilters_by_pk?: Maybe<ExternalMetricsRlsFilters>;
  /** update single row of the table: "externalMetrics" */
  update_externalMetrics_by_pk?: Maybe<ExternalMetrics>;
  /** update data of the table: "guestTokens" */
  update_guestTokens?: Maybe<GuestTokens_Mutation_Response>;
  /** update single row of the table: "guestTokens" */
  update_guestTokens_by_pk?: Maybe<GuestTokens>;
  /** update data of the table: "metricTags" */
  update_metricTags?: Maybe<MetricTags_Mutation_Response>;
  /** update single row of the table: "metricTags" */
  update_metricTags_by_pk?: Maybe<MetricTags>;
  /** update data of the table: "metricVersions" */
  update_metricVersions?: Maybe<MetricVersions_Mutation_Response>;
  /** update single row of the table: "metricVersions" */
  update_metricVersions_by_pk?: Maybe<MetricVersions>;
  /** update data of the table: "metrics" */
  update_metrics?: Maybe<Metrics_Mutation_Response>;
  /** update single row of the table: "metrics" */
  update_metrics_by_pk?: Maybe<Metrics>;
  /** update data of the table: "organizations" */
  update_organizations?: Maybe<Organizations_Mutation_Response>;
  /** update single row of the table: "organizations" */
  update_organizations_by_pk?: Maybe<Organizations>;
  /** update data of the table: "scheduleEmailReportCharts" */
  update_scheduleEmailReportCharts?: Maybe<ScheduleEmailReportCharts_Mutation_Response>;
  /** update single row of the table: "scheduleEmailReportCharts" */
  update_scheduleEmailReportCharts_by_pk?: Maybe<ScheduleEmailReportCharts>;
  /** update data of the table: "scheduleEmailReports" */
  update_scheduleEmailReports?: Maybe<ScheduleEmailReports_Mutation_Response>;
  /** update single row of the table: "scheduleEmailReports" */
  update_scheduleEmailReports_by_pk?: Maybe<ScheduleEmailReports>;
  /** update data of the table: "secrets" */
  update_secrets?: Maybe<Secrets_Mutation_Response>;
  /** update single row of the table: "secrets" */
  update_secrets_by_pk?: Maybe<Secrets>;
  /** update data of the table: "sharingSettings" */
  update_sharingSettings?: Maybe<SharingSettings_Mutation_Response>;
  /** update single row of the table: "sharingSettings" */
  update_sharingSettings_by_pk?: Maybe<SharingSettings>;
  /** update data of the table: "themes" */
  update_themes?: Maybe<Themes_Mutation_Response>;
  /** update single row of the table: "themes" */
  update_themes_by_pk?: Maybe<Themes>;
  /** update data of the table: "userRoles" */
  update_userRoles?: Maybe<UserRoles_Mutation_Response>;
  /** update single row of the table: "userRoles" */
  update_userRoles_by_pk?: Maybe<UserRoles>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "whitelistedDomains" */
  update_whitelistedDomains?: Maybe<WhitelistedDomains_Mutation_Response>;
  /** update single row of the table: "whitelistedDomains" */
  update_whitelistedDomains_by_pk?: Maybe<WhitelistedDomains>;
  /** update data of the table: "workspaceThemes" */
  update_workspaceThemes?: Maybe<WorkspaceThemes_Mutation_Response>;
  /** update single row of the table: "workspaceThemes" */
  update_workspaceThemes_by_pk?: Maybe<WorkspaceThemes>;
  /** Inserts a new version or updates an existing metric version */
  upsertMetricVersion?: Maybe<UpsertMetricVersionOutput>;
};


/** mutation root */
export type Mutation_RootAcceptInvitationArgs = {
  input: AcceptInvitationInput;
};


/** mutation root */
export type Mutation_RootCacheIntegrationSchemaArgs = {
  input: CacheIntegrationSchemaInput;
};


/** mutation root */
export type Mutation_RootChangePasswordArgs = {
  input: ChangePasswordInput;
};


/** mutation root */
export type Mutation_RootChangeUserNameArgs = {
  input: ChangeUserNameInput;
};


/** mutation root */
export type Mutation_RootCompanySubsetTableDataArgs = {
  input: CompanySubsetTableDataInput;
};


/** mutation root */
export type Mutation_RootCreateCompanyRedisArgs = {
  input: CreateCompanyRedisInput;
};


/** mutation root */
export type Mutation_RootCreateConnectionArgs = {
  input: CreateConnectionInput;
};


/** mutation root */
export type Mutation_RootCreateDestinationArgs = {
  input: CreateDestinationInput;
};


/** mutation root */
export type Mutation_RootCreateOperationArgs = {
  input: CreateOperationInput;
};


/** mutation root */
export type Mutation_RootCreateSourceArgs = {
  input: CreateSourceInput;
};


/** mutation root */
export type Mutation_RootCreateViewDataModelArgs = {
  input: CreateViewDataModelInput;
};


/** mutation root */
export type Mutation_RootCreateViewInDbArgs = {
  input: CreateViewInDbInput;
};


/** mutation root */
export type Mutation_RootDatasetMetricCreationArgs = {
  input: DatasetMetricCreationInput;
};


/** mutation root */
export type Mutation_RootDeleteDestinationArgs = {
  input: DeleteDestinationInput;
};


/** mutation root */
export type Mutation_RootDeleteMetricVersionArgs = {
  input: DeleteMetricVersionInput;
};


/** mutation root */
export type Mutation_RootDeleteSourceArgs = {
  input: DeleteSourceInput;
};


/** mutation root */
export type Mutation_RootDelete_ApiTokensArgs = {
  where: ApiTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ApiTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ClientDashboardLayoutArgs = {
  where: ClientDashboardLayout_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ClientDashboardLayout_By_PkArgs = {
  clientId: Scalars['String'];
  externalDashboardId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ClientDeletedMetricsArgs = {
  where: ClientDeletedMetrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ClientDeletedMetrics_By_PkArgs = {
  clientId: Scalars['String'];
  externalMetricId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CompanyCacheSchemasArgs = {
  where: CompanyCacheSchemas_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CompanyCacheSchemas_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CompanyDatabasesArgs = {
  where: CompanyDatabases_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CompanyDatabases_By_PkArgs = {
  companyId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CompanyIntegrationsArgs = {
  where: CompanyIntegrations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CompanyIntegrations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CompanyRedisArgs = {
  where: CompanyRedis_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CompanyRedis_By_PkArgs = {
  workspaceId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CompanyRlsFiltersArgs = {
  where: CompanyRlsFilters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CompanyRlsFilters_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CompanyRolesArgs = {
  where: CompanyRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CompanyRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CompanySubsetTablesArgs = {
  where: CompanySubsetTables_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CompanySubsetTables_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CompanyWorkspacesArgs = {
  where: CompanyWorkspaces_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CompanyWorkspaces_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CustomLayersArgs = {
  where: CustomLayers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CustomLayers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CustomSqlColumnsArgs = {
  where: CustomSqlColumns_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CustomSqlColumns_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_DashboardMetricsArgs = {
  where: DashboardMetrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_DashboardMetrics_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_DashboardsArgs = {
  where: Dashboards_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Dashboards_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_DataModelsArgs = {
  where: DataModels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_DataModels_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_DemoThemeArgs = {
  where: DemoTheme_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_DemoTheme_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_DocumentsArgs = {
  where: Documents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Documents_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExternalDashboardMetricsArgs = {
  where: ExternalDashboardMetrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ExternalDashboardMetrics_By_PkArgs = {
  externalDashboardId: Scalars['uuid'];
  externalMetricId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExternalDashboardThemeClientsArgs = {
  where: ExternalDashboardThemeClients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ExternalDashboardThemeClients_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExternalDashboardThemesArgs = {
  where: ExternalDashboardThemes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ExternalDashboardThemes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExternalDashboardsArgs = {
  where: ExternalDashboards_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ExternalDashboards_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExternalDatasetsArgs = {
  where: ExternalDatasets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ExternalDatasets_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExternalMetricRawCsvUrlsArgs = {
  where: ExternalMetricRawCsvUrls_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ExternalMetricRawCsvUrls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExternalMetricsArgs = {
  where: ExternalMetrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ExternalMetricsRlsFiltersArgs = {
  where: ExternalMetricsRlsFilters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ExternalMetricsRlsFilters_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExternalMetrics_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GuestTokensArgs = {
  where: GuestTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GuestTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_MetricVersionsArgs = {
  where: MetricVersions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_MetricVersions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_MetricsArgs = {
  where: Metrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Metrics_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_OrganizationsArgs = {
  where: Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Organizations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ScheduleEmailReportChartsArgs = {
  where: ScheduleEmailReportCharts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ScheduleEmailReportCharts_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ScheduleEmailReportsArgs = {
  where: ScheduleEmailReports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ScheduleEmailReports_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_SecretsArgs = {
  where: Secrets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Secrets_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_SharingSettingsArgs = {
  where: SharingSettings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_SharingSettings_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ThemesArgs = {
  where: Themes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Themes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UserRolesArgs = {
  where: UserRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_UserRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_WhitelistedDomainsArgs = {
  where: WhitelistedDomains_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_WhitelistedDomains_By_PkArgs = {
  companyId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_WorkspaceThemesArgs = {
  where: WorkspaceThemes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_WorkspaceThemes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootEmbeddedMetricQueryArgs = {
  input: ExternalMetricQueryInput;
};


/** mutation root */
export type Mutation_RootExecutePythonArgs = {
  input: ExecutePythonInput;
};


/** mutation root */
export type Mutation_RootFetchColumnDataArgs = {
  input: FetchColumnDataInput;
};


/** mutation root */
export type Mutation_RootForecastArgs = {
  input: ForecastInput;
};


/** mutation root */
export type Mutation_RootForgetPasswordArgs = {
  input: ForgetPasswordInput;
};


/** mutation root */
export type Mutation_RootGenerateDatasetMetricsArgs = {
  input: GenerateDatasetMetricsInput;
};


/** mutation root */
export type Mutation_RootGenerateDrillQueryArgs = {
  input: GenerateDrillQueryInput;
};


/** mutation root */
export type Mutation_RootGenerateEmbeddedMeticArgs = {
  input: GenerateEmbeddedMeticInput;
};


/** mutation root */
export type Mutation_RootGenerateExternalMetricQueryArgs = {
  input: GenerateExternalMetricQueryInput;
};


/** mutation root */
export type Mutation_RootGenerateMetricQueryArgs = {
  input: GenerateMetricQueryInput;
};


/** mutation root */
export type Mutation_RootGenerateOpenaiResponseArgs = {
  input: GenerateOpenaiResponseInput;
};


/** mutation root */
export type Mutation_RootGetLineageDataArgs = {
  input: GetLineageDataInput;
};


/** mutation root */
export type Mutation_RootGetOpenaiChatResponseArgs = {
  input: GetOpenaiChatResponseInput;
};


/** mutation root */
export type Mutation_RootGetPreviewTableDataArgs = {
  input: GetPreviewTableDataInput;
};


/** mutation root */
export type Mutation_RootGetUnderlyingDataArgs = {
  input: GetUnderlyingDataInput;
};


/** mutation root */
export type Mutation_RootGetUnderlyingSqlQueryArgs = {
  input: GetUnderlyingSqlQueryInput;
};


/** mutation root */
export type Mutation_RootGroupbyColumnListArgs = {
  input: GroupbyColumnListInput;
};


/** mutation root */
export type Mutation_RootInsert_ApiTokensArgs = {
  objects: Array<ApiTokens_Insert_Input>;
  on_conflict?: InputMaybe<ApiTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ApiTokens_OneArgs = {
  object: ApiTokens_Insert_Input;
  on_conflict?: InputMaybe<ApiTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ClientDashboardLayoutArgs = {
  objects: Array<ClientDashboardLayout_Insert_Input>;
  on_conflict?: InputMaybe<ClientDashboardLayout_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ClientDashboardLayout_OneArgs = {
  object: ClientDashboardLayout_Insert_Input;
  on_conflict?: InputMaybe<ClientDashboardLayout_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ClientDeletedMetricsArgs = {
  objects: Array<ClientDeletedMetrics_Insert_Input>;
  on_conflict?: InputMaybe<ClientDeletedMetrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ClientDeletedMetrics_OneArgs = {
  object: ClientDeletedMetrics_Insert_Input;
  on_conflict?: InputMaybe<ClientDeletedMetrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyCacheSchemasArgs = {
  objects: Array<CompanyCacheSchemas_Insert_Input>;
  on_conflict?: InputMaybe<CompanyCacheSchemas_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyCacheSchemas_OneArgs = {
  object: CompanyCacheSchemas_Insert_Input;
  on_conflict?: InputMaybe<CompanyCacheSchemas_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyDatabasesArgs = {
  objects: Array<CompanyDatabases_Insert_Input>;
  on_conflict?: InputMaybe<CompanyDatabases_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyDatabases_OneArgs = {
  object: CompanyDatabases_Insert_Input;
  on_conflict?: InputMaybe<CompanyDatabases_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyIntegrationsArgs = {
  objects: Array<CompanyIntegrations_Insert_Input>;
  on_conflict?: InputMaybe<CompanyIntegrations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyIntegrations_OneArgs = {
  object: CompanyIntegrations_Insert_Input;
  on_conflict?: InputMaybe<CompanyIntegrations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyRedisArgs = {
  objects: Array<CompanyRedis_Insert_Input>;
  on_conflict?: InputMaybe<CompanyRedis_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyRedis_OneArgs = {
  object: CompanyRedis_Insert_Input;
  on_conflict?: InputMaybe<CompanyRedis_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyRlsFiltersArgs = {
  objects: Array<CompanyRlsFilters_Insert_Input>;
  on_conflict?: InputMaybe<CompanyRlsFilters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyRlsFilters_OneArgs = {
  object: CompanyRlsFilters_Insert_Input;
  on_conflict?: InputMaybe<CompanyRlsFilters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyRolesArgs = {
  objects: Array<CompanyRoles_Insert_Input>;
  on_conflict?: InputMaybe<CompanyRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyRoles_OneArgs = {
  object: CompanyRoles_Insert_Input;
  on_conflict?: InputMaybe<CompanyRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanySubsetTablesArgs = {
  objects: Array<CompanySubsetTables_Insert_Input>;
  on_conflict?: InputMaybe<CompanySubsetTables_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanySubsetTables_OneArgs = {
  object: CompanySubsetTables_Insert_Input;
  on_conflict?: InputMaybe<CompanySubsetTables_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyWorkspacesArgs = {
  objects: Array<CompanyWorkspaces_Insert_Input>;
  on_conflict?: InputMaybe<CompanyWorkspaces_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyWorkspaces_OneArgs = {
  object: CompanyWorkspaces_Insert_Input;
  on_conflict?: InputMaybe<CompanyWorkspaces_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CustomLayersArgs = {
  objects: Array<CustomLayers_Insert_Input>;
  on_conflict?: InputMaybe<CustomLayers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CustomLayers_OneArgs = {
  object: CustomLayers_Insert_Input;
  on_conflict?: InputMaybe<CustomLayers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CustomSqlColumnsArgs = {
  objects: Array<CustomSqlColumns_Insert_Input>;
  on_conflict?: InputMaybe<CustomSqlColumns_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CustomSqlColumns_OneArgs = {
  object: CustomSqlColumns_Insert_Input;
  on_conflict?: InputMaybe<CustomSqlColumns_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DashboardMetricsArgs = {
  objects: Array<DashboardMetrics_Insert_Input>;
  on_conflict?: InputMaybe<DashboardMetrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DashboardMetrics_OneArgs = {
  object: DashboardMetrics_Insert_Input;
  on_conflict?: InputMaybe<DashboardMetrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DashboardsArgs = {
  objects: Array<Dashboards_Insert_Input>;
  on_conflict?: InputMaybe<Dashboards_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dashboards_OneArgs = {
  object: Dashboards_Insert_Input;
  on_conflict?: InputMaybe<Dashboards_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DataModelsArgs = {
  objects: Array<DataModels_Insert_Input>;
  on_conflict?: InputMaybe<DataModels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DataModels_OneArgs = {
  object: DataModels_Insert_Input;
  on_conflict?: InputMaybe<DataModels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DemoThemeArgs = {
  objects: Array<DemoTheme_Insert_Input>;
  on_conflict?: InputMaybe<DemoTheme_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DemoTheme_OneArgs = {
  object: DemoTheme_Insert_Input;
  on_conflict?: InputMaybe<DemoTheme_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DocumentsArgs = {
  objects: Array<Documents_Insert_Input>;
  on_conflict?: InputMaybe<Documents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Documents_OneArgs = {
  object: Documents_Insert_Input;
  on_conflict?: InputMaybe<Documents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalDashboardMetricsArgs = {
  objects: Array<ExternalDashboardMetrics_Insert_Input>;
  on_conflict?: InputMaybe<ExternalDashboardMetrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalDashboardMetrics_OneArgs = {
  object: ExternalDashboardMetrics_Insert_Input;
  on_conflict?: InputMaybe<ExternalDashboardMetrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalDashboardThemeClientsArgs = {
  objects: Array<ExternalDashboardThemeClients_Insert_Input>;
  on_conflict?: InputMaybe<ExternalDashboardThemeClients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalDashboardThemeClients_OneArgs = {
  object: ExternalDashboardThemeClients_Insert_Input;
  on_conflict?: InputMaybe<ExternalDashboardThemeClients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalDashboardThemesArgs = {
  objects: Array<ExternalDashboardThemes_Insert_Input>;
  on_conflict?: InputMaybe<ExternalDashboardThemes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalDashboardThemes_OneArgs = {
  object: ExternalDashboardThemes_Insert_Input;
  on_conflict?: InputMaybe<ExternalDashboardThemes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalDashboardsArgs = {
  objects: Array<ExternalDashboards_Insert_Input>;
  on_conflict?: InputMaybe<ExternalDashboards_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalDashboards_OneArgs = {
  object: ExternalDashboards_Insert_Input;
  on_conflict?: InputMaybe<ExternalDashboards_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalDatasetsArgs = {
  objects: Array<ExternalDatasets_Insert_Input>;
  on_conflict?: InputMaybe<ExternalDatasets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalDatasets_OneArgs = {
  object: ExternalDatasets_Insert_Input;
  on_conflict?: InputMaybe<ExternalDatasets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalMetricRawCsvUrlsArgs = {
  objects: Array<ExternalMetricRawCsvUrls_Insert_Input>;
  on_conflict?: InputMaybe<ExternalMetricRawCsvUrls_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalMetricRawCsvUrls_OneArgs = {
  object: ExternalMetricRawCsvUrls_Insert_Input;
  on_conflict?: InputMaybe<ExternalMetricRawCsvUrls_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalMetricsArgs = {
  objects: Array<ExternalMetrics_Insert_Input>;
  on_conflict?: InputMaybe<ExternalMetrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalMetricsRlsFiltersArgs = {
  objects: Array<ExternalMetricsRlsFilters_Insert_Input>;
  on_conflict?: InputMaybe<ExternalMetricsRlsFilters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalMetricsRlsFilters_OneArgs = {
  object: ExternalMetricsRlsFilters_Insert_Input;
  on_conflict?: InputMaybe<ExternalMetricsRlsFilters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExternalMetrics_OneArgs = {
  object: ExternalMetrics_Insert_Input;
  on_conflict?: InputMaybe<ExternalMetrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GuestTokensArgs = {
  objects: Array<GuestTokens_Insert_Input>;
  on_conflict?: InputMaybe<GuestTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GuestTokens_OneArgs = {
  object: GuestTokens_Insert_Input;
  on_conflict?: InputMaybe<GuestTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MetricTagsArgs = {
  objects: Array<MetricTags_Insert_Input>;
  on_conflict?: InputMaybe<MetricTags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MetricTags_OneArgs = {
  object: MetricTags_Insert_Input;
  on_conflict?: InputMaybe<MetricTags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MetricVersionsArgs = {
  objects: Array<MetricVersions_Insert_Input>;
  on_conflict?: InputMaybe<MetricVersions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MetricVersions_OneArgs = {
  object: MetricVersions_Insert_Input;
  on_conflict?: InputMaybe<MetricVersions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MetricsArgs = {
  objects: Array<Metrics_Insert_Input>;
  on_conflict?: InputMaybe<Metrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Metrics_OneArgs = {
  object: Metrics_Insert_Input;
  on_conflict?: InputMaybe<Metrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrganizationsArgs = {
  objects: Array<Organizations_Insert_Input>;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Organizations_OneArgs = {
  object: Organizations_Insert_Input;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ScheduleEmailReportChartsArgs = {
  objects: Array<ScheduleEmailReportCharts_Insert_Input>;
  on_conflict?: InputMaybe<ScheduleEmailReportCharts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ScheduleEmailReportCharts_OneArgs = {
  object: ScheduleEmailReportCharts_Insert_Input;
  on_conflict?: InputMaybe<ScheduleEmailReportCharts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ScheduleEmailReportsArgs = {
  objects: Array<ScheduleEmailReports_Insert_Input>;
  on_conflict?: InputMaybe<ScheduleEmailReports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ScheduleEmailReports_OneArgs = {
  object: ScheduleEmailReports_Insert_Input;
  on_conflict?: InputMaybe<ScheduleEmailReports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SecretsArgs = {
  objects: Array<Secrets_Insert_Input>;
  on_conflict?: InputMaybe<Secrets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Secrets_OneArgs = {
  object: Secrets_Insert_Input;
  on_conflict?: InputMaybe<Secrets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SharingSettingsArgs = {
  objects: Array<SharingSettings_Insert_Input>;
  on_conflict?: InputMaybe<SharingSettings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SharingSettings_OneArgs = {
  object: SharingSettings_Insert_Input;
  on_conflict?: InputMaybe<SharingSettings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ThemesArgs = {
  objects: Array<Themes_Insert_Input>;
  on_conflict?: InputMaybe<Themes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Themes_OneArgs = {
  object: Themes_Insert_Input;
  on_conflict?: InputMaybe<Themes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserRolesArgs = {
  objects: Array<UserRoles_Insert_Input>;
  on_conflict?: InputMaybe<UserRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserRoles_OneArgs = {
  object: UserRoles_Insert_Input;
  on_conflict?: InputMaybe<UserRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WhitelistedDomainsArgs = {
  objects: Array<WhitelistedDomains_Insert_Input>;
  on_conflict?: InputMaybe<WhitelistedDomains_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WhitelistedDomains_OneArgs = {
  object: WhitelistedDomains_Insert_Input;
  on_conflict?: InputMaybe<WhitelistedDomains_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WorkspaceThemesArgs = {
  objects: Array<WorkspaceThemes_Insert_Input>;
  on_conflict?: InputMaybe<WorkspaceThemes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WorkspaceThemes_OneArgs = {
  object: WorkspaceThemes_Insert_Input;
  on_conflict?: InputMaybe<WorkspaceThemes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInviteUserArgs = {
  input: InviteUserInput;
};


/** mutation root */
export type Mutation_RootInvokeSaveRawCsvDetailsArgs = {
  input: InvokeSaveRawCsvDetailsInput;
};


/** mutation root */
export type Mutation_RootInvokeSendCsvUrlArgs = {
  input: InvokeSendCsvUrlInput;
};


/** mutation root */
export type Mutation_RootOnboardingWithDemoDatabaseArgs = {
  input: SkipOnboardingInput;
};


/** mutation root */
export type Mutation_RootPreviewTableArgs = {
  input: PreviewTableInput;
};


/** mutation root */
export type Mutation_RootQuerySqlArgs = {
  input: SqlQueryInput;
};


/** mutation root */
export type Mutation_RootReInviteUserArgs = {
  input: ReInviteUserInput;
};


/** mutation root */
export type Mutation_RootResetCompanyRedisDataArgs = {
  input: ResetCompanyRedisDataInput;
};


/** mutation root */
export type Mutation_RootResetPasswordArgs = {
  input: ResetPasswordInput;
};


/** mutation root */
export type Mutation_RootSendRawCsvArgs = {
  input: SendRawCsvInput;
};


/** mutation root */
export type Mutation_RootShareCsvUrlArgs = {
  input: InvokeSendCsvUrlInput;
};


/** mutation root */
export type Mutation_RootSignInArgs = {
  input: SignInInput;
};


/** mutation root */
export type Mutation_RootSignUpArgs = {
  input: SignUpInput;
};


/** mutation root */
export type Mutation_RootSignUpVerificationArgs = {
  input: SignUpVerificationInput;
};


/** mutation root */
export type Mutation_RootSqlQueryArgs = {
  input: SqlQueryInput;
};


/** mutation root */
export type Mutation_RootSyncConnectionArgs = {
  input: SyncConnectionInput;
};


/** mutation root */
export type Mutation_RootTestDestinationArgs = {
  input: TestDestinationInput;
};


/** mutation root */
export type Mutation_RootTestEndpointArgs = {
  input: TestInput;
};


/** mutation root */
export type Mutation_RootTestIntegrationArgs = {
  input: TestIntegrationInput;
};


/** mutation root */
export type Mutation_RootTestSmtpSettingsArgs = {
  input: TestSmtpSettingsInput;
};


/** mutation root */
export type Mutation_RootTestSourceArgs = {
  input: TestSourceInput;
};


/** mutation root */
export type Mutation_RootUpdateDestinationArgs = {
  input: UpdateDestinationInput;
};


/** mutation root */
export type Mutation_RootUpdateSourceArgs = {
  input: UpdateSourceInput;
};


/** mutation root */
export type Mutation_RootUpdateViewDataModelArgs = {
  input: UpdateViewDataModelInput;
};


/** mutation root */
export type Mutation_RootUpdate_ApiTokensArgs = {
  _set?: InputMaybe<ApiTokens_Set_Input>;
  where: ApiTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ApiTokens_By_PkArgs = {
  _set?: InputMaybe<ApiTokens_Set_Input>;
  pk_columns: ApiTokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ClientDashboardLayoutArgs = {
  _append?: InputMaybe<ClientDashboardLayout_Append_Input>;
  _delete_at_path?: InputMaybe<ClientDashboardLayout_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ClientDashboardLayout_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ClientDashboardLayout_Delete_Key_Input>;
  _prepend?: InputMaybe<ClientDashboardLayout_Prepend_Input>;
  _set?: InputMaybe<ClientDashboardLayout_Set_Input>;
  where: ClientDashboardLayout_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ClientDashboardLayout_By_PkArgs = {
  _append?: InputMaybe<ClientDashboardLayout_Append_Input>;
  _delete_at_path?: InputMaybe<ClientDashboardLayout_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ClientDashboardLayout_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ClientDashboardLayout_Delete_Key_Input>;
  _prepend?: InputMaybe<ClientDashboardLayout_Prepend_Input>;
  _set?: InputMaybe<ClientDashboardLayout_Set_Input>;
  pk_columns: ClientDashboardLayout_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ClientDeletedMetricsArgs = {
  _set?: InputMaybe<ClientDeletedMetrics_Set_Input>;
  where: ClientDeletedMetrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ClientDeletedMetrics_By_PkArgs = {
  _set?: InputMaybe<ClientDeletedMetrics_Set_Input>;
  pk_columns: ClientDeletedMetrics_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CompaniesArgs = {
  _set?: InputMaybe<Companies_Set_Input>;
  where: Companies_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Companies_By_PkArgs = {
  _set?: InputMaybe<Companies_Set_Input>;
  pk_columns: Companies_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyCacheSchemasArgs = {
  _append?: InputMaybe<CompanyCacheSchemas_Append_Input>;
  _delete_at_path?: InputMaybe<CompanyCacheSchemas_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CompanyCacheSchemas_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CompanyCacheSchemas_Delete_Key_Input>;
  _prepend?: InputMaybe<CompanyCacheSchemas_Prepend_Input>;
  _set?: InputMaybe<CompanyCacheSchemas_Set_Input>;
  where: CompanyCacheSchemas_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyCacheSchemas_By_PkArgs = {
  _append?: InputMaybe<CompanyCacheSchemas_Append_Input>;
  _delete_at_path?: InputMaybe<CompanyCacheSchemas_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CompanyCacheSchemas_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CompanyCacheSchemas_Delete_Key_Input>;
  _prepend?: InputMaybe<CompanyCacheSchemas_Prepend_Input>;
  _set?: InputMaybe<CompanyCacheSchemas_Set_Input>;
  pk_columns: CompanyCacheSchemas_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyDatabasesArgs = {
  _set?: InputMaybe<CompanyDatabases_Set_Input>;
  where: CompanyDatabases_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyDatabases_By_PkArgs = {
  _set?: InputMaybe<CompanyDatabases_Set_Input>;
  pk_columns: CompanyDatabases_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyIntegrationsArgs = {
  _append?: InputMaybe<CompanyIntegrations_Append_Input>;
  _delete_at_path?: InputMaybe<CompanyIntegrations_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CompanyIntegrations_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CompanyIntegrations_Delete_Key_Input>;
  _prepend?: InputMaybe<CompanyIntegrations_Prepend_Input>;
  _set?: InputMaybe<CompanyIntegrations_Set_Input>;
  where: CompanyIntegrations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyIntegrations_By_PkArgs = {
  _append?: InputMaybe<CompanyIntegrations_Append_Input>;
  _delete_at_path?: InputMaybe<CompanyIntegrations_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CompanyIntegrations_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CompanyIntegrations_Delete_Key_Input>;
  _prepend?: InputMaybe<CompanyIntegrations_Prepend_Input>;
  _set?: InputMaybe<CompanyIntegrations_Set_Input>;
  pk_columns: CompanyIntegrations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyRedisArgs = {
  _inc?: InputMaybe<CompanyRedis_Inc_Input>;
  _set?: InputMaybe<CompanyRedis_Set_Input>;
  where: CompanyRedis_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyRedis_By_PkArgs = {
  _inc?: InputMaybe<CompanyRedis_Inc_Input>;
  _set?: InputMaybe<CompanyRedis_Set_Input>;
  pk_columns: CompanyRedis_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyRlsFiltersArgs = {
  _set?: InputMaybe<CompanyRlsFilters_Set_Input>;
  where: CompanyRlsFilters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyRlsFilters_By_PkArgs = {
  _set?: InputMaybe<CompanyRlsFilters_Set_Input>;
  pk_columns: CompanyRlsFilters_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyRolesArgs = {
  _append?: InputMaybe<CompanyRoles_Append_Input>;
  _delete_at_path?: InputMaybe<CompanyRoles_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CompanyRoles_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CompanyRoles_Delete_Key_Input>;
  _prepend?: InputMaybe<CompanyRoles_Prepend_Input>;
  _set?: InputMaybe<CompanyRoles_Set_Input>;
  where: CompanyRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyRoles_By_PkArgs = {
  _append?: InputMaybe<CompanyRoles_Append_Input>;
  _delete_at_path?: InputMaybe<CompanyRoles_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CompanyRoles_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CompanyRoles_Delete_Key_Input>;
  _prepend?: InputMaybe<CompanyRoles_Prepend_Input>;
  _set?: InputMaybe<CompanyRoles_Set_Input>;
  pk_columns: CompanyRoles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CompanySubsetTablesArgs = {
  _append?: InputMaybe<CompanySubsetTables_Append_Input>;
  _delete_at_path?: InputMaybe<CompanySubsetTables_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CompanySubsetTables_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CompanySubsetTables_Delete_Key_Input>;
  _prepend?: InputMaybe<CompanySubsetTables_Prepend_Input>;
  _set?: InputMaybe<CompanySubsetTables_Set_Input>;
  where: CompanySubsetTables_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CompanySubsetTables_By_PkArgs = {
  _append?: InputMaybe<CompanySubsetTables_Append_Input>;
  _delete_at_path?: InputMaybe<CompanySubsetTables_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CompanySubsetTables_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CompanySubsetTables_Delete_Key_Input>;
  _prepend?: InputMaybe<CompanySubsetTables_Prepend_Input>;
  _set?: InputMaybe<CompanySubsetTables_Set_Input>;
  pk_columns: CompanySubsetTables_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyWorkspacesArgs = {
  _append?: InputMaybe<CompanyWorkspaces_Append_Input>;
  _delete_at_path?: InputMaybe<CompanyWorkspaces_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CompanyWorkspaces_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CompanyWorkspaces_Delete_Key_Input>;
  _prepend?: InputMaybe<CompanyWorkspaces_Prepend_Input>;
  _set?: InputMaybe<CompanyWorkspaces_Set_Input>;
  where: CompanyWorkspaces_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyWorkspaces_By_PkArgs = {
  _append?: InputMaybe<CompanyWorkspaces_Append_Input>;
  _delete_at_path?: InputMaybe<CompanyWorkspaces_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CompanyWorkspaces_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CompanyWorkspaces_Delete_Key_Input>;
  _prepend?: InputMaybe<CompanyWorkspaces_Prepend_Input>;
  _set?: InputMaybe<CompanyWorkspaces_Set_Input>;
  pk_columns: CompanyWorkspaces_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CustomLayersArgs = {
  _append?: InputMaybe<CustomLayers_Append_Input>;
  _delete_at_path?: InputMaybe<CustomLayers_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CustomLayers_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CustomLayers_Delete_Key_Input>;
  _prepend?: InputMaybe<CustomLayers_Prepend_Input>;
  _set?: InputMaybe<CustomLayers_Set_Input>;
  where: CustomLayers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CustomLayers_By_PkArgs = {
  _append?: InputMaybe<CustomLayers_Append_Input>;
  _delete_at_path?: InputMaybe<CustomLayers_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CustomLayers_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CustomLayers_Delete_Key_Input>;
  _prepend?: InputMaybe<CustomLayers_Prepend_Input>;
  _set?: InputMaybe<CustomLayers_Set_Input>;
  pk_columns: CustomLayers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CustomSqlColumnsArgs = {
  _append?: InputMaybe<CustomSqlColumns_Append_Input>;
  _delete_at_path?: InputMaybe<CustomSqlColumns_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CustomSqlColumns_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CustomSqlColumns_Delete_Key_Input>;
  _prepend?: InputMaybe<CustomSqlColumns_Prepend_Input>;
  _set?: InputMaybe<CustomSqlColumns_Set_Input>;
  where: CustomSqlColumns_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CustomSqlColumns_By_PkArgs = {
  _append?: InputMaybe<CustomSqlColumns_Append_Input>;
  _delete_at_path?: InputMaybe<CustomSqlColumns_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<CustomSqlColumns_Delete_Elem_Input>;
  _delete_key?: InputMaybe<CustomSqlColumns_Delete_Key_Input>;
  _prepend?: InputMaybe<CustomSqlColumns_Prepend_Input>;
  _set?: InputMaybe<CustomSqlColumns_Set_Input>;
  pk_columns: CustomSqlColumns_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_DashboardMetricsArgs = {
  _inc?: InputMaybe<DashboardMetrics_Inc_Input>;
  _set?: InputMaybe<DashboardMetrics_Set_Input>;
  where: DashboardMetrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_DashboardMetrics_By_PkArgs = {
  _inc?: InputMaybe<DashboardMetrics_Inc_Input>;
  _set?: InputMaybe<DashboardMetrics_Set_Input>;
  pk_columns: DashboardMetrics_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_DashboardsArgs = {
  _set?: InputMaybe<Dashboards_Set_Input>;
  where: Dashboards_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Dashboards_By_PkArgs = {
  _set?: InputMaybe<Dashboards_Set_Input>;
  pk_columns: Dashboards_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_DataModelsArgs = {
  _append?: InputMaybe<DataModels_Append_Input>;
  _delete_at_path?: InputMaybe<DataModels_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<DataModels_Delete_Elem_Input>;
  _delete_key?: InputMaybe<DataModels_Delete_Key_Input>;
  _prepend?: InputMaybe<DataModels_Prepend_Input>;
  _set?: InputMaybe<DataModels_Set_Input>;
  where: DataModels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_DataModels_By_PkArgs = {
  _append?: InputMaybe<DataModels_Append_Input>;
  _delete_at_path?: InputMaybe<DataModels_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<DataModels_Delete_Elem_Input>;
  _delete_key?: InputMaybe<DataModels_Delete_Key_Input>;
  _prepend?: InputMaybe<DataModels_Prepend_Input>;
  _set?: InputMaybe<DataModels_Set_Input>;
  pk_columns: DataModels_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_DemoThemeArgs = {
  _append?: InputMaybe<DemoTheme_Append_Input>;
  _delete_at_path?: InputMaybe<DemoTheme_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<DemoTheme_Delete_Elem_Input>;
  _delete_key?: InputMaybe<DemoTheme_Delete_Key_Input>;
  _prepend?: InputMaybe<DemoTheme_Prepend_Input>;
  _set?: InputMaybe<DemoTheme_Set_Input>;
  where: DemoTheme_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_DemoTheme_By_PkArgs = {
  _append?: InputMaybe<DemoTheme_Append_Input>;
  _delete_at_path?: InputMaybe<DemoTheme_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<DemoTheme_Delete_Elem_Input>;
  _delete_key?: InputMaybe<DemoTheme_Delete_Key_Input>;
  _prepend?: InputMaybe<DemoTheme_Prepend_Input>;
  _set?: InputMaybe<DemoTheme_Set_Input>;
  pk_columns: DemoTheme_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_DocumentsArgs = {
  _set?: InputMaybe<Documents_Set_Input>;
  where: Documents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Documents_By_PkArgs = {
  _set?: InputMaybe<Documents_Set_Input>;
  pk_columns: Documents_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalDashboardMetricsArgs = {
  _set?: InputMaybe<ExternalDashboardMetrics_Set_Input>;
  where: ExternalDashboardMetrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalDashboardMetrics_By_PkArgs = {
  _set?: InputMaybe<ExternalDashboardMetrics_Set_Input>;
  pk_columns: ExternalDashboardMetrics_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalDashboardThemeClientsArgs = {
  _set?: InputMaybe<ExternalDashboardThemeClients_Set_Input>;
  where: ExternalDashboardThemeClients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalDashboardThemeClients_By_PkArgs = {
  _set?: InputMaybe<ExternalDashboardThemeClients_Set_Input>;
  pk_columns: ExternalDashboardThemeClients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalDashboardThemesArgs = {
  _append?: InputMaybe<ExternalDashboardThemes_Append_Input>;
  _delete_at_path?: InputMaybe<ExternalDashboardThemes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ExternalDashboardThemes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ExternalDashboardThemes_Delete_Key_Input>;
  _prepend?: InputMaybe<ExternalDashboardThemes_Prepend_Input>;
  _set?: InputMaybe<ExternalDashboardThemes_Set_Input>;
  where: ExternalDashboardThemes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalDashboardThemes_By_PkArgs = {
  _append?: InputMaybe<ExternalDashboardThemes_Append_Input>;
  _delete_at_path?: InputMaybe<ExternalDashboardThemes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ExternalDashboardThemes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ExternalDashboardThemes_Delete_Key_Input>;
  _prepend?: InputMaybe<ExternalDashboardThemes_Prepend_Input>;
  _set?: InputMaybe<ExternalDashboardThemes_Set_Input>;
  pk_columns: ExternalDashboardThemes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalDashboardsArgs = {
  _append?: InputMaybe<ExternalDashboards_Append_Input>;
  _delete_at_path?: InputMaybe<ExternalDashboards_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ExternalDashboards_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ExternalDashboards_Delete_Key_Input>;
  _prepend?: InputMaybe<ExternalDashboards_Prepend_Input>;
  _set?: InputMaybe<ExternalDashboards_Set_Input>;
  where: ExternalDashboards_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalDashboards_By_PkArgs = {
  _append?: InputMaybe<ExternalDashboards_Append_Input>;
  _delete_at_path?: InputMaybe<ExternalDashboards_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ExternalDashboards_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ExternalDashboards_Delete_Key_Input>;
  _prepend?: InputMaybe<ExternalDashboards_Prepend_Input>;
  _set?: InputMaybe<ExternalDashboards_Set_Input>;
  pk_columns: ExternalDashboards_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalDatasetsArgs = {
  _append?: InputMaybe<ExternalDatasets_Append_Input>;
  _delete_at_path?: InputMaybe<ExternalDatasets_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ExternalDatasets_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ExternalDatasets_Delete_Key_Input>;
  _prepend?: InputMaybe<ExternalDatasets_Prepend_Input>;
  _set?: InputMaybe<ExternalDatasets_Set_Input>;
  where: ExternalDatasets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalDatasets_By_PkArgs = {
  _append?: InputMaybe<ExternalDatasets_Append_Input>;
  _delete_at_path?: InputMaybe<ExternalDatasets_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ExternalDatasets_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ExternalDatasets_Delete_Key_Input>;
  _prepend?: InputMaybe<ExternalDatasets_Prepend_Input>;
  _set?: InputMaybe<ExternalDatasets_Set_Input>;
  pk_columns: ExternalDatasets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalMetricRawCsvUrlsArgs = {
  _append?: InputMaybe<ExternalMetricRawCsvUrls_Append_Input>;
  _delete_at_path?: InputMaybe<ExternalMetricRawCsvUrls_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ExternalMetricRawCsvUrls_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ExternalMetricRawCsvUrls_Delete_Key_Input>;
  _inc?: InputMaybe<ExternalMetricRawCsvUrls_Inc_Input>;
  _prepend?: InputMaybe<ExternalMetricRawCsvUrls_Prepend_Input>;
  _set?: InputMaybe<ExternalMetricRawCsvUrls_Set_Input>;
  where: ExternalMetricRawCsvUrls_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalMetricRawCsvUrls_By_PkArgs = {
  _append?: InputMaybe<ExternalMetricRawCsvUrls_Append_Input>;
  _delete_at_path?: InputMaybe<ExternalMetricRawCsvUrls_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ExternalMetricRawCsvUrls_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ExternalMetricRawCsvUrls_Delete_Key_Input>;
  _inc?: InputMaybe<ExternalMetricRawCsvUrls_Inc_Input>;
  _prepend?: InputMaybe<ExternalMetricRawCsvUrls_Prepend_Input>;
  _set?: InputMaybe<ExternalMetricRawCsvUrls_Set_Input>;
  pk_columns: ExternalMetricRawCsvUrls_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalMetricsArgs = {
  _append?: InputMaybe<ExternalMetrics_Append_Input>;
  _delete_at_path?: InputMaybe<ExternalMetrics_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ExternalMetrics_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ExternalMetrics_Delete_Key_Input>;
  _inc?: InputMaybe<ExternalMetrics_Inc_Input>;
  _prepend?: InputMaybe<ExternalMetrics_Prepend_Input>;
  _set?: InputMaybe<ExternalMetrics_Set_Input>;
  where: ExternalMetrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalMetricsRlsFiltersArgs = {
  _set?: InputMaybe<ExternalMetricsRlsFilters_Set_Input>;
  where: ExternalMetricsRlsFilters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalMetricsRlsFilters_By_PkArgs = {
  _set?: InputMaybe<ExternalMetricsRlsFilters_Set_Input>;
  pk_columns: ExternalMetricsRlsFilters_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ExternalMetrics_By_PkArgs = {
  _append?: InputMaybe<ExternalMetrics_Append_Input>;
  _delete_at_path?: InputMaybe<ExternalMetrics_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<ExternalMetrics_Delete_Elem_Input>;
  _delete_key?: InputMaybe<ExternalMetrics_Delete_Key_Input>;
  _inc?: InputMaybe<ExternalMetrics_Inc_Input>;
  _prepend?: InputMaybe<ExternalMetrics_Prepend_Input>;
  _set?: InputMaybe<ExternalMetrics_Set_Input>;
  pk_columns: ExternalMetrics_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GuestTokensArgs = {
  _append?: InputMaybe<GuestTokens_Append_Input>;
  _delete_at_path?: InputMaybe<GuestTokens_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<GuestTokens_Delete_Elem_Input>;
  _delete_key?: InputMaybe<GuestTokens_Delete_Key_Input>;
  _prepend?: InputMaybe<GuestTokens_Prepend_Input>;
  _set?: InputMaybe<GuestTokens_Set_Input>;
  where: GuestTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GuestTokens_By_PkArgs = {
  _append?: InputMaybe<GuestTokens_Append_Input>;
  _delete_at_path?: InputMaybe<GuestTokens_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<GuestTokens_Delete_Elem_Input>;
  _delete_key?: InputMaybe<GuestTokens_Delete_Key_Input>;
  _prepend?: InputMaybe<GuestTokens_Prepend_Input>;
  _set?: InputMaybe<GuestTokens_Set_Input>;
  pk_columns: GuestTokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_MetricTagsArgs = {
  _set?: InputMaybe<MetricTags_Set_Input>;
  where: MetricTags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_MetricTags_By_PkArgs = {
  _set?: InputMaybe<MetricTags_Set_Input>;
  pk_columns: MetricTags_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_MetricVersionsArgs = {
  _append?: InputMaybe<MetricVersions_Append_Input>;
  _delete_at_path?: InputMaybe<MetricVersions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<MetricVersions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<MetricVersions_Delete_Key_Input>;
  _inc?: InputMaybe<MetricVersions_Inc_Input>;
  _prepend?: InputMaybe<MetricVersions_Prepend_Input>;
  _set?: InputMaybe<MetricVersions_Set_Input>;
  where: MetricVersions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_MetricVersions_By_PkArgs = {
  _append?: InputMaybe<MetricVersions_Append_Input>;
  _delete_at_path?: InputMaybe<MetricVersions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<MetricVersions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<MetricVersions_Delete_Key_Input>;
  _inc?: InputMaybe<MetricVersions_Inc_Input>;
  _prepend?: InputMaybe<MetricVersions_Prepend_Input>;
  _set?: InputMaybe<MetricVersions_Set_Input>;
  pk_columns: MetricVersions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_MetricsArgs = {
  _append?: InputMaybe<Metrics_Append_Input>;
  _delete_at_path?: InputMaybe<Metrics_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Metrics_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Metrics_Delete_Key_Input>;
  _prepend?: InputMaybe<Metrics_Prepend_Input>;
  _set?: InputMaybe<Metrics_Set_Input>;
  where: Metrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Metrics_By_PkArgs = {
  _append?: InputMaybe<Metrics_Append_Input>;
  _delete_at_path?: InputMaybe<Metrics_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Metrics_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Metrics_Delete_Key_Input>;
  _prepend?: InputMaybe<Metrics_Prepend_Input>;
  _set?: InputMaybe<Metrics_Set_Input>;
  pk_columns: Metrics_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_OrganizationsArgs = {
  _set?: InputMaybe<Organizations_Set_Input>;
  where: Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Organizations_By_PkArgs = {
  _set?: InputMaybe<Organizations_Set_Input>;
  pk_columns: Organizations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ScheduleEmailReportChartsArgs = {
  _set?: InputMaybe<ScheduleEmailReportCharts_Set_Input>;
  where: ScheduleEmailReportCharts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ScheduleEmailReportCharts_By_PkArgs = {
  _set?: InputMaybe<ScheduleEmailReportCharts_Set_Input>;
  pk_columns: ScheduleEmailReportCharts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ScheduleEmailReportsArgs = {
  _set?: InputMaybe<ScheduleEmailReports_Set_Input>;
  where: ScheduleEmailReports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ScheduleEmailReports_By_PkArgs = {
  _set?: InputMaybe<ScheduleEmailReports_Set_Input>;
  pk_columns: ScheduleEmailReports_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SecretsArgs = {
  _set?: InputMaybe<Secrets_Set_Input>;
  where: Secrets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Secrets_By_PkArgs = {
  _set?: InputMaybe<Secrets_Set_Input>;
  pk_columns: Secrets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SharingSettingsArgs = {
  _inc?: InputMaybe<SharingSettings_Inc_Input>;
  _set?: InputMaybe<SharingSettings_Set_Input>;
  where: SharingSettings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_SharingSettings_By_PkArgs = {
  _inc?: InputMaybe<SharingSettings_Inc_Input>;
  _set?: InputMaybe<SharingSettings_Set_Input>;
  pk_columns: SharingSettings_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ThemesArgs = {
  _append?: InputMaybe<Themes_Append_Input>;
  _delete_at_path?: InputMaybe<Themes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Themes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Themes_Delete_Key_Input>;
  _prepend?: InputMaybe<Themes_Prepend_Input>;
  _set?: InputMaybe<Themes_Set_Input>;
  where: Themes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Themes_By_PkArgs = {
  _append?: InputMaybe<Themes_Append_Input>;
  _delete_at_path?: InputMaybe<Themes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Themes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Themes_Delete_Key_Input>;
  _prepend?: InputMaybe<Themes_Prepend_Input>;
  _set?: InputMaybe<Themes_Set_Input>;
  pk_columns: Themes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserRolesArgs = {
  _append?: InputMaybe<UserRoles_Append_Input>;
  _delete_at_path?: InputMaybe<UserRoles_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<UserRoles_Delete_Elem_Input>;
  _delete_key?: InputMaybe<UserRoles_Delete_Key_Input>;
  _prepend?: InputMaybe<UserRoles_Prepend_Input>;
  _set?: InputMaybe<UserRoles_Set_Input>;
  where: UserRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_UserRoles_By_PkArgs = {
  _append?: InputMaybe<UserRoles_Append_Input>;
  _delete_at_path?: InputMaybe<UserRoles_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<UserRoles_Delete_Elem_Input>;
  _delete_key?: InputMaybe<UserRoles_Delete_Key_Input>;
  _prepend?: InputMaybe<UserRoles_Prepend_Input>;
  _set?: InputMaybe<UserRoles_Set_Input>;
  pk_columns: UserRoles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_WhitelistedDomainsArgs = {
  _append?: InputMaybe<WhitelistedDomains_Append_Input>;
  _delete_at_path?: InputMaybe<WhitelistedDomains_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<WhitelistedDomains_Delete_Elem_Input>;
  _delete_key?: InputMaybe<WhitelistedDomains_Delete_Key_Input>;
  _prepend?: InputMaybe<WhitelistedDomains_Prepend_Input>;
  _set?: InputMaybe<WhitelistedDomains_Set_Input>;
  where: WhitelistedDomains_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_WhitelistedDomains_By_PkArgs = {
  _append?: InputMaybe<WhitelistedDomains_Append_Input>;
  _delete_at_path?: InputMaybe<WhitelistedDomains_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<WhitelistedDomains_Delete_Elem_Input>;
  _delete_key?: InputMaybe<WhitelistedDomains_Delete_Key_Input>;
  _prepend?: InputMaybe<WhitelistedDomains_Prepend_Input>;
  _set?: InputMaybe<WhitelistedDomains_Set_Input>;
  pk_columns: WhitelistedDomains_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_WorkspaceThemesArgs = {
  _set?: InputMaybe<WorkspaceThemes_Set_Input>;
  where: WorkspaceThemes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_WorkspaceThemes_By_PkArgs = {
  _set?: InputMaybe<WorkspaceThemes_Set_Input>;
  pk_columns: WorkspaceThemes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpsertMetricVersionArgs = {
  input: UpsertMetricVersionInput;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** Organizations (clients) of a particular company. */
export type Organizations = {
  __typename?: 'organizations';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  /** An object relationship */
  companyWorkspace: CompanyWorkspaces;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  tableClientNameColumn: Scalars['String'];
  tableName: Scalars['String'];
  tablePrimaryKeyColumn: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  workspaceId: Scalars['uuid'];
};

/** order by aggregate values of table "organizations" */
export type Organizations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Organizations_Max_Order_By>;
  min?: InputMaybe<Organizations_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "organizations". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<Organizations_Bool_Exp>>;
  _not?: InputMaybe<Organizations_Bool_Exp>;
  _or?: InputMaybe<Array<Organizations_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  tableClientNameColumn?: InputMaybe<String_Comparison_Exp>;
  tableName?: InputMaybe<String_Comparison_Exp>;
  tablePrimaryKeyColumn?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "organizations" */
export enum Organizations_Constraint {
  /** unique or primary key constraint on columns "id" */
  OrganizationsPkey = 'organizations_pkey',
  /** unique or primary key constraint on columns "workspaceId" */
  OrganizationsWorkspaceIdKey = 'organizations_workspaceId_key',
  /** unique or primary key constraint on columns "workspaceId" */
  OrganizationsWorkspaceKey = 'organizations_workspace_key'
}

/** input type for inserting data into table "organizations" */
export type Organizations_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  tableClientNameColumn?: InputMaybe<Scalars['String']>;
  tableName?: InputMaybe<Scalars['String']>;
  tablePrimaryKeyColumn?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "organizations" */
export type Organizations_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tableClientNameColumn?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  tablePrimaryKeyColumn?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "organizations" */
export type Organizations_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tableClientNameColumn?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  tablePrimaryKeyColumn?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "organizations" */
export type Organizations_Mutation_Response = {
  __typename?: 'organizations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Organizations>;
};

/** input type for inserting object relation for remote table "organizations" */
export type Organizations_Obj_Rel_Insert_Input = {
  data: Organizations_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};

/** on_conflict condition type for table "organizations" */
export type Organizations_On_Conflict = {
  constraint: Organizations_Constraint;
  update_columns?: Array<Organizations_Update_Column>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};

/** Ordering options when selecting data from "organizations". */
export type Organizations_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tableClientNameColumn?: InputMaybe<Order_By>;
  tableName?: InputMaybe<Order_By>;
  tablePrimaryKeyColumn?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: organizations */
export type Organizations_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "organizations" */
export enum Organizations_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  TableClientNameColumn = 'tableClientNameColumn',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TablePrimaryKeyColumn = 'tablePrimaryKeyColumn',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "organizations" */
export type Organizations_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  tableClientNameColumn?: InputMaybe<Scalars['String']>;
  tableName?: InputMaybe<Scalars['String']>;
  tablePrimaryKeyColumn?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "organizations" */
export enum Organizations_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Id = 'id',
  /** column name */
  TableClientNameColumn = 'tableClientNameColumn',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TablePrimaryKeyColumn = 'tablePrimaryKeyColumn',
  /** column name */
  WorkspaceId = 'workspaceId'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  apiTokens: Array<ApiTokens>;
  /** fetch data from the table: "apiTokens" using primary key columns */
  apiTokens_by_pk?: Maybe<ApiTokens>;
  /** fetch data from the table: "clientDashboardLayout" */
  clientDashboardLayout: Array<ClientDashboardLayout>;
  /** fetch data from the table: "clientDashboardLayout" using primary key columns */
  clientDashboardLayout_by_pk?: Maybe<ClientDashboardLayout>;
  /** An array relationship */
  clientDeletedMetrics: Array<ClientDeletedMetrics>;
  /** fetch data from the table: "clientDeletedMetrics" using primary key columns */
  clientDeletedMetrics_by_pk?: Maybe<ClientDeletedMetrics>;
  /** An array relationship */
  companies: Array<Companies>;
  /** fetch data from the table: "companies" using primary key columns */
  companies_by_pk?: Maybe<Companies>;
  /** An array relationship */
  companyCacheSchemas: Array<CompanyCacheSchemas>;
  /** fetch data from the table: "companyCacheSchemas" using primary key columns */
  companyCacheSchemas_by_pk?: Maybe<CompanyCacheSchemas>;
  /** fetch data from the table: "companyDatabases" */
  companyDatabases: Array<CompanyDatabases>;
  /** fetch data from the table: "companyDatabases" using primary key columns */
  companyDatabases_by_pk?: Maybe<CompanyDatabases>;
  /** An array relationship */
  companyIntegrations: Array<CompanyIntegrations>;
  /** fetch data from the table: "companyIntegrations" using primary key columns */
  companyIntegrations_by_pk?: Maybe<CompanyIntegrations>;
  /** An array relationship */
  companyRedis: Array<CompanyRedis>;
  /** fetch data from the table: "companyRedis" using primary key columns */
  companyRedis_by_pk?: Maybe<CompanyRedis>;
  /** An array relationship */
  companyRlsFilters: Array<CompanyRlsFilters>;
  /** fetch data from the table: "companyRlsFilters" using primary key columns */
  companyRlsFilters_by_pk?: Maybe<CompanyRlsFilters>;
  /** An array relationship */
  companyRoles: Array<CompanyRoles>;
  /** fetch data from the table: "companyRoles" using primary key columns */
  companyRoles_by_pk?: Maybe<CompanyRoles>;
  /** An array relationship */
  companySubsetTables: Array<CompanySubsetTables>;
  /** fetch data from the table: "companySubsetTables" using primary key columns */
  companySubsetTables_by_pk?: Maybe<CompanySubsetTables>;
  /** An array relationship */
  companyWorkspaces: Array<CompanyWorkspaces>;
  /** fetch data from the table: "companyWorkspaces" using primary key columns */
  companyWorkspaces_by_pk?: Maybe<CompanyWorkspaces>;
  /** An array relationship */
  customLayers: Array<CustomLayers>;
  /** fetch data from the table: "customLayers" using primary key columns */
  customLayers_by_pk?: Maybe<CustomLayers>;
  /** An array relationship */
  customSqlColumns: Array<CustomSqlColumns>;
  /** fetch data from the table: "customSqlColumns" using primary key columns */
  customSqlColumns_by_pk?: Maybe<CustomSqlColumns>;
  /** An array relationship */
  dashboardMetrics: Array<DashboardMetrics>;
  /** fetch data from the table: "dashboardMetrics" using primary key columns */
  dashboardMetrics_by_pk?: Maybe<DashboardMetrics>;
  /** An array relationship */
  dashboards: Array<Dashboards>;
  /** fetch data from the table: "dashboards" using primary key columns */
  dashboards_by_pk?: Maybe<Dashboards>;
  /** An array relationship */
  dataModels: Array<DataModels>;
  /** fetch data from the table: "dataModels" using primary key columns */
  dataModels_by_pk?: Maybe<DataModels>;
  definitions?: Maybe<DefinitionsOutput>;
  /** fetch data from the table: "demoTheme" */
  demoTheme: Array<DemoTheme>;
  /** fetch data from the table: "demoTheme" using primary key columns */
  demoTheme_by_pk?: Maybe<DemoTheme>;
  /** An array relationship */
  documents: Array<Documents>;
  /** fetch data from the table: "documents" using primary key columns */
  documents_by_pk?: Maybe<Documents>;
  embeddedDashboardData?: Maybe<EmbeddedDashboardDataOutput>;
  /** Gets the required data to embed individual metrics. */
  embeddedMetricData?: Maybe<EmbeddedMetricDataOutput>;
  /** An array relationship */
  externalDashboardMetrics: Array<ExternalDashboardMetrics>;
  /** fetch data from the table: "externalDashboardMetrics" using primary key columns */
  externalDashboardMetrics_by_pk?: Maybe<ExternalDashboardMetrics>;
  /** An array relationship */
  externalDashboardThemeClients: Array<ExternalDashboardThemeClients>;
  /** fetch data from the table: "externalDashboardThemeClients" using primary key columns */
  externalDashboardThemeClients_by_pk?: Maybe<ExternalDashboardThemeClients>;
  /** An array relationship */
  externalDashboardThemes: Array<ExternalDashboardThemes>;
  /** fetch data from the table: "externalDashboardThemes" using primary key columns */
  externalDashboardThemes_by_pk?: Maybe<ExternalDashboardThemes>;
  /** An array relationship */
  externalDashboards: Array<ExternalDashboards>;
  /** fetch data from the table: "externalDashboards" using primary key columns */
  externalDashboards_by_pk?: Maybe<ExternalDashboards>;
  /** An array relationship */
  externalDatasets: Array<ExternalDatasets>;
  /** fetch data from the table: "externalDatasets" using primary key columns */
  externalDatasets_by_pk?: Maybe<ExternalDatasets>;
  externalMetricQuery?: Maybe<ExternalMetricQueryOutput>;
  /** fetch data from the table: "externalMetricRawCsvUrls" */
  externalMetricRawCsvUrls: Array<ExternalMetricRawCsvUrls>;
  /** fetch data from the table: "externalMetricRawCsvUrls" using primary key columns */
  externalMetricRawCsvUrls_by_pk?: Maybe<ExternalMetricRawCsvUrls>;
  /** An array relationship */
  externalMetrics: Array<ExternalMetrics>;
  /** An array relationship */
  externalMetricsRlsFilters: Array<ExternalMetricsRlsFilters>;
  /** fetch data from the table: "externalMetricsRlsFilters" using primary key columns */
  externalMetricsRlsFilters_by_pk?: Maybe<ExternalMetricsRlsFilters>;
  /** fetch data from the table: "externalMetrics" using primary key columns */
  externalMetrics_by_pk?: Maybe<ExternalMetrics>;
  /** Gets the workspaces based on users if they have access to. */
  getCompanyWorkspaces?: Maybe<GetCompanyWorkspacesOutput>;
  getConnection?: Maybe<GetConnectionOutput>;
  getConnectionsList?: Maybe<GetConnectionsListOutput>;
  getDestinationList?: Maybe<GetDestinationListOutput>;
  getJobInformation?: Maybe<GetJobInformationOutput>;
  getJobs?: Maybe<GetJobsOutput>;
  getSourceList?: Maybe<GetSourceListOutput>;
  getUserClientData?: Maybe<GetUserClientDataOutput>;
  /** An array relationship */
  guestTokens: Array<GuestTokens>;
  /** fetch data from the table: "guestTokens" using primary key columns */
  guestTokens_by_pk?: Maybe<GuestTokens>;
  /** fetch data from the table: "integrationSpecifications" */
  integrationSpecifications: Array<IntegrationSpecifications>;
  /** fetch data from the table: "integrationSpecifications" using primary key columns */
  integrationSpecifications_by_pk?: Maybe<IntegrationSpecifications>;
  /** fetch data from the table: "integrations" */
  integrations: Array<Integrations>;
  /** fetch data from the table: "integrations" using primary key columns */
  integrations_by_pk?: Maybe<Integrations>;
  listMetricVersions?: Maybe<ListMetricVersionsOutput>;
  /** An array relationship */
  metricTags: Array<MetricTags>;
  /** fetch data from the table: "metricTags" using primary key columns */
  metricTags_by_pk?: Maybe<MetricTags>;
  /** An array relationship */
  metricVersions: Array<MetricVersions>;
  /** fetch data from the table: "metricVersions" using primary key columns */
  metricVersions_by_pk?: Maybe<MetricVersions>;
  /** An array relationship */
  metrics: Array<Metrics>;
  /** fetch data from the table: "metrics" using primary key columns */
  metrics_by_pk?: Maybe<Metrics>;
  /** An array relationship */
  organizations: Array<Organizations>;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  queryMetric?: Maybe<QueryMetricOutput>;
  /** An array relationship */
  scheduleEmailReportCharts: Array<ScheduleEmailReportCharts>;
  /** fetch data from the table: "scheduleEmailReportCharts" using primary key columns */
  scheduleEmailReportCharts_by_pk?: Maybe<ScheduleEmailReportCharts>;
  /** An array relationship */
  scheduleEmailReports: Array<ScheduleEmailReports>;
  /** fetch data from the table: "scheduleEmailReports" using primary key columns */
  scheduleEmailReports_by_pk?: Maybe<ScheduleEmailReports>;
  /** An array relationship */
  secrets: Array<Secrets>;
  /** fetch data from the table: "secrets" using primary key columns */
  secrets_by_pk?: Maybe<Secrets>;
  shareCsvUrl?: Maybe<ShareCsvUrl>;
  /** fetch data from the table: "sharingSettings" */
  sharingSettings: Array<SharingSettings>;
  /** fetch data from the table: "sharingSettings" using primary key columns */
  sharingSettings_by_pk?: Maybe<SharingSettings>;
  sourceSchema?: Maybe<SourceSchemaOutput>;
  /** An array relationship */
  themes: Array<Themes>;
  /** fetch data from the table: "themes" using primary key columns */
  themes_by_pk?: Maybe<Themes>;
  /** An array relationship */
  userRoles: Array<UserRoles>;
  /** fetch data from the table: "userRoles" using primary key columns */
  userRoles_by_pk?: Maybe<UserRoles>;
  /** An array relationship */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "whitelistedDomains" */
  whitelistedDomains: Array<WhitelistedDomains>;
  /** fetch data from the table: "whitelistedDomains" using primary key columns */
  whitelistedDomains_by_pk?: Maybe<WhitelistedDomains>;
  /** An array relationship */
  workspaceThemes: Array<WorkspaceThemes>;
  /** fetch data from the table: "workspaceThemes" using primary key columns */
  workspaceThemes_by_pk?: Maybe<WorkspaceThemes>;
};


export type Query_RootApiTokensArgs = {
  distinct_on?: InputMaybe<Array<ApiTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ApiTokens_Order_By>>;
  where?: InputMaybe<ApiTokens_Bool_Exp>;
};


export type Query_RootApiTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootClientDashboardLayoutArgs = {
  distinct_on?: InputMaybe<Array<ClientDashboardLayout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ClientDashboardLayout_Order_By>>;
  where?: InputMaybe<ClientDashboardLayout_Bool_Exp>;
};


export type Query_RootClientDashboardLayout_By_PkArgs = {
  clientId: Scalars['String'];
  externalDashboardId: Scalars['uuid'];
};


export type Query_RootClientDeletedMetricsArgs = {
  distinct_on?: InputMaybe<Array<ClientDeletedMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ClientDeletedMetrics_Order_By>>;
  where?: InputMaybe<ClientDeletedMetrics_Bool_Exp>;
};


export type Query_RootClientDeletedMetrics_By_PkArgs = {
  clientId: Scalars['String'];
  externalMetricId: Scalars['uuid'];
};


export type Query_RootCompaniesArgs = {
  distinct_on?: InputMaybe<Array<Companies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Companies_Order_By>>;
  where?: InputMaybe<Companies_Bool_Exp>;
};


export type Query_RootCompanies_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCompanyCacheSchemasArgs = {
  distinct_on?: InputMaybe<Array<CompanyCacheSchemas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyCacheSchemas_Order_By>>;
  where?: InputMaybe<CompanyCacheSchemas_Bool_Exp>;
};


export type Query_RootCompanyCacheSchemas_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCompanyDatabasesArgs = {
  distinct_on?: InputMaybe<Array<CompanyDatabases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyDatabases_Order_By>>;
  where?: InputMaybe<CompanyDatabases_Bool_Exp>;
};


export type Query_RootCompanyDatabases_By_PkArgs = {
  companyId: Scalars['uuid'];
};


export type Query_RootCompanyIntegrationsArgs = {
  distinct_on?: InputMaybe<Array<CompanyIntegrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyIntegrations_Order_By>>;
  where?: InputMaybe<CompanyIntegrations_Bool_Exp>;
};


export type Query_RootCompanyIntegrations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCompanyRedisArgs = {
  distinct_on?: InputMaybe<Array<CompanyRedis_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyRedis_Order_By>>;
  where?: InputMaybe<CompanyRedis_Bool_Exp>;
};


export type Query_RootCompanyRedis_By_PkArgs = {
  workspaceId: Scalars['uuid'];
};


export type Query_RootCompanyRlsFiltersArgs = {
  distinct_on?: InputMaybe<Array<CompanyRlsFilters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyRlsFilters_Order_By>>;
  where?: InputMaybe<CompanyRlsFilters_Bool_Exp>;
};


export type Query_RootCompanyRlsFilters_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCompanyRolesArgs = {
  distinct_on?: InputMaybe<Array<CompanyRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyRoles_Order_By>>;
  where?: InputMaybe<CompanyRoles_Bool_Exp>;
};


export type Query_RootCompanyRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCompanySubsetTablesArgs = {
  distinct_on?: InputMaybe<Array<CompanySubsetTables_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanySubsetTables_Order_By>>;
  where?: InputMaybe<CompanySubsetTables_Bool_Exp>;
};


export type Query_RootCompanySubsetTables_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCompanyWorkspacesArgs = {
  distinct_on?: InputMaybe<Array<CompanyWorkspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyWorkspaces_Order_By>>;
  where?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
};


export type Query_RootCompanyWorkspaces_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCustomLayersArgs = {
  distinct_on?: InputMaybe<Array<CustomLayers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CustomLayers_Order_By>>;
  where?: InputMaybe<CustomLayers_Bool_Exp>;
};


export type Query_RootCustomLayers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCustomSqlColumnsArgs = {
  distinct_on?: InputMaybe<Array<CustomSqlColumns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CustomSqlColumns_Order_By>>;
  where?: InputMaybe<CustomSqlColumns_Bool_Exp>;
};


export type Query_RootCustomSqlColumns_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootDashboardMetricsArgs = {
  distinct_on?: InputMaybe<Array<DashboardMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DashboardMetrics_Order_By>>;
  where?: InputMaybe<DashboardMetrics_Bool_Exp>;
};


export type Query_RootDashboardMetrics_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootDashboardsArgs = {
  distinct_on?: InputMaybe<Array<Dashboards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dashboards_Order_By>>;
  where?: InputMaybe<Dashboards_Bool_Exp>;
};


export type Query_RootDashboards_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootDataModelsArgs = {
  distinct_on?: InputMaybe<Array<DataModels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DataModels_Order_By>>;
  where?: InputMaybe<DataModels_Bool_Exp>;
};


export type Query_RootDataModels_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootDefinitionsArgs = {
  input: DefinitionsInput;
};


export type Query_RootDemoThemeArgs = {
  distinct_on?: InputMaybe<Array<DemoTheme_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DemoTheme_Order_By>>;
  where?: InputMaybe<DemoTheme_Bool_Exp>;
};


export type Query_RootDemoTheme_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootDocumentsArgs = {
  distinct_on?: InputMaybe<Array<Documents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Documents_Order_By>>;
  where?: InputMaybe<Documents_Bool_Exp>;
};


export type Query_RootDocuments_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEmbeddedDashboardDataArgs = {
  input: EmbeddedDashboardDataInput;
};


export type Query_RootEmbeddedMetricDataArgs = {
  input: EmbeddedMetricDataInput;
};


export type Query_RootExternalDashboardMetricsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboardMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboardMetrics_Order_By>>;
  where?: InputMaybe<ExternalDashboardMetrics_Bool_Exp>;
};


export type Query_RootExternalDashboardMetrics_By_PkArgs = {
  externalDashboardId: Scalars['uuid'];
  externalMetricId: Scalars['uuid'];
};


export type Query_RootExternalDashboardThemeClientsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboardThemeClients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboardThemeClients_Order_By>>;
  where?: InputMaybe<ExternalDashboardThemeClients_Bool_Exp>;
};


export type Query_RootExternalDashboardThemeClients_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootExternalDashboardThemesArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboardThemes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboardThemes_Order_By>>;
  where?: InputMaybe<ExternalDashboardThemes_Bool_Exp>;
};


export type Query_RootExternalDashboardThemes_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootExternalDashboardsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboards_Order_By>>;
  where?: InputMaybe<ExternalDashboards_Bool_Exp>;
};


export type Query_RootExternalDashboards_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootExternalDatasetsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDatasets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDatasets_Order_By>>;
  where?: InputMaybe<ExternalDatasets_Bool_Exp>;
};


export type Query_RootExternalDatasets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootExternalMetricQueryArgs = {
  input: ExternalMetricQueryInput;
};


export type Query_RootExternalMetricRawCsvUrlsArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetricRawCsvUrls_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetricRawCsvUrls_Order_By>>;
  where?: InputMaybe<ExternalMetricRawCsvUrls_Bool_Exp>;
};


export type Query_RootExternalMetricRawCsvUrls_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootExternalMetricsArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetrics_Order_By>>;
  where?: InputMaybe<ExternalMetrics_Bool_Exp>;
};


export type Query_RootExternalMetricsRlsFiltersArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetricsRlsFilters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetricsRlsFilters_Order_By>>;
  where?: InputMaybe<ExternalMetricsRlsFilters_Bool_Exp>;
};


export type Query_RootExternalMetricsRlsFilters_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootExternalMetrics_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGetCompanyWorkspacesArgs = {
  input?: InputMaybe<GetCompanyWorkspacesInput>;
};


export type Query_RootGetConnectionArgs = {
  input: GetConnectionInput;
};


export type Query_RootGetConnectionsListArgs = {
  input: GetConnectionsListInput;
};


export type Query_RootGetDestinationListArgs = {
  input: GetDestinationListInput;
};


export type Query_RootGetJobInformationArgs = {
  input: GetJobInformationInput;
};


export type Query_RootGetJobsArgs = {
  input: GetJobsInput;
};


export type Query_RootGetSourceListArgs = {
  input: GetSourceListInput;
};


export type Query_RootGetUserClientDataArgs = {
  input: GetUserClientDataInput;
};


export type Query_RootGuestTokensArgs = {
  distinct_on?: InputMaybe<Array<GuestTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuestTokens_Order_By>>;
  where?: InputMaybe<GuestTokens_Bool_Exp>;
};


export type Query_RootGuestTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootIntegrationSpecificationsArgs = {
  distinct_on?: InputMaybe<Array<IntegrationSpecifications_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<IntegrationSpecifications_Order_By>>;
  where?: InputMaybe<IntegrationSpecifications_Bool_Exp>;
};


export type Query_RootIntegrationSpecifications_By_PkArgs = {
  id: Scalars['uuid'];
  integrationId: Scalars['uuid'];
};


export type Query_RootIntegrationsArgs = {
  distinct_on?: InputMaybe<Array<Integrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Integrations_Order_By>>;
  where?: InputMaybe<Integrations_Bool_Exp>;
};


export type Query_RootIntegrations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootListMetricVersionsArgs = {
  input: ListMetricVersionsInput;
};


export type Query_RootMetricTagsArgs = {
  distinct_on?: InputMaybe<Array<MetricTags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MetricTags_Order_By>>;
  where?: InputMaybe<MetricTags_Bool_Exp>;
};


export type Query_RootMetricTags_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMetricVersionsArgs = {
  distinct_on?: InputMaybe<Array<MetricVersions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MetricVersions_Order_By>>;
  where?: InputMaybe<MetricVersions_Bool_Exp>;
};


export type Query_RootMetricVersions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMetricsArgs = {
  distinct_on?: InputMaybe<Array<Metrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Metrics_Order_By>>;
  where?: InputMaybe<Metrics_Bool_Exp>;
};


export type Query_RootMetrics_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Query_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootQueryMetricArgs = {
  input: QueryMetricInput;
};


export type Query_RootScheduleEmailReportChartsArgs = {
  distinct_on?: InputMaybe<Array<ScheduleEmailReportCharts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ScheduleEmailReportCharts_Order_By>>;
  where?: InputMaybe<ScheduleEmailReportCharts_Bool_Exp>;
};


export type Query_RootScheduleEmailReportCharts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootScheduleEmailReportsArgs = {
  distinct_on?: InputMaybe<Array<ScheduleEmailReports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ScheduleEmailReports_Order_By>>;
  where?: InputMaybe<ScheduleEmailReports_Bool_Exp>;
};


export type Query_RootScheduleEmailReports_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSecretsArgs = {
  distinct_on?: InputMaybe<Array<Secrets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Secrets_Order_By>>;
  where?: InputMaybe<Secrets_Bool_Exp>;
};


export type Query_RootSecrets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootShareCsvUrlArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSharingSettingsArgs = {
  distinct_on?: InputMaybe<Array<SharingSettings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SharingSettings_Order_By>>;
  where?: InputMaybe<SharingSettings_Bool_Exp>;
};


export type Query_RootSharingSettings_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSourceSchemaArgs = {
  input: SourceSchemaInput;
};


export type Query_RootThemesArgs = {
  distinct_on?: InputMaybe<Array<Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Themes_Order_By>>;
  where?: InputMaybe<Themes_Bool_Exp>;
};


export type Query_RootThemes_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserRolesArgs = {
  distinct_on?: InputMaybe<Array<UserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserRoles_Order_By>>;
  where?: InputMaybe<UserRoles_Bool_Exp>;
};


export type Query_RootUserRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootWhitelistedDomainsArgs = {
  distinct_on?: InputMaybe<Array<WhitelistedDomains_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WhitelistedDomains_Order_By>>;
  where?: InputMaybe<WhitelistedDomains_Bool_Exp>;
};


export type Query_RootWhitelistedDomains_By_PkArgs = {
  companyId: Scalars['uuid'];
};


export type Query_RootWorkspaceThemesArgs = {
  distinct_on?: InputMaybe<Array<WorkspaceThemes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WorkspaceThemes_Order_By>>;
  where?: InputMaybe<WorkspaceThemes_Bool_Exp>;
};


export type Query_RootWorkspaceThemes_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "scheduleEmailReportCharts" */
export type ScheduleEmailReportCharts = {
  __typename?: 'scheduleEmailReportCharts';
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  externalMetric: ExternalMetrics;
  externalMetricId: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  scheduleEmailReport: ScheduleEmailReports;
  scheduleEmailReportId: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
};

/** order by aggregate values of table "scheduleEmailReportCharts" */
export type ScheduleEmailReportCharts_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ScheduleEmailReportCharts_Max_Order_By>;
  min?: InputMaybe<ScheduleEmailReportCharts_Min_Order_By>;
};

/** input type for inserting array relation for remote table "scheduleEmailReportCharts" */
export type ScheduleEmailReportCharts_Arr_Rel_Insert_Input = {
  data: Array<ScheduleEmailReportCharts_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ScheduleEmailReportCharts_On_Conflict>;
};

/** Boolean expression to filter rows from the table "scheduleEmailReportCharts". All fields are combined with a logical 'AND'. */
export type ScheduleEmailReportCharts_Bool_Exp = {
  _and?: InputMaybe<Array<ScheduleEmailReportCharts_Bool_Exp>>;
  _not?: InputMaybe<ScheduleEmailReportCharts_Bool_Exp>;
  _or?: InputMaybe<Array<ScheduleEmailReportCharts_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  externalMetric?: InputMaybe<ExternalMetrics_Bool_Exp>;
  externalMetricId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  scheduleEmailReport?: InputMaybe<ScheduleEmailReports_Bool_Exp>;
  scheduleEmailReportId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "scheduleEmailReportCharts" */
export enum ScheduleEmailReportCharts_Constraint {
  /** unique or primary key constraint on columns "id" */
  ScheduleEmailReportChartsPkey = 'scheduleEmailReportCharts_pkey'
}

/** input type for inserting data into table "scheduleEmailReportCharts" */
export type ScheduleEmailReportCharts_Insert_Input = {
  externalMetric?: InputMaybe<ExternalMetrics_Obj_Rel_Insert_Input>;
  externalMetricId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  scheduleEmailReport?: InputMaybe<ScheduleEmailReports_Obj_Rel_Insert_Input>;
  scheduleEmailReportId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "scheduleEmailReportCharts" */
export type ScheduleEmailReportCharts_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scheduleEmailReportId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "scheduleEmailReportCharts" */
export type ScheduleEmailReportCharts_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scheduleEmailReportId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "scheduleEmailReportCharts" */
export type ScheduleEmailReportCharts_Mutation_Response = {
  __typename?: 'scheduleEmailReportCharts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ScheduleEmailReportCharts>;
};

/** on_conflict condition type for table "scheduleEmailReportCharts" */
export type ScheduleEmailReportCharts_On_Conflict = {
  constraint: ScheduleEmailReportCharts_Constraint;
  update_columns?: Array<ScheduleEmailReportCharts_Update_Column>;
  where?: InputMaybe<ScheduleEmailReportCharts_Bool_Exp>;
};

/** Ordering options when selecting data from "scheduleEmailReportCharts". */
export type ScheduleEmailReportCharts_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  externalMetric?: InputMaybe<ExternalMetrics_Order_By>;
  externalMetricId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scheduleEmailReport?: InputMaybe<ScheduleEmailReports_Order_By>;
  scheduleEmailReportId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: scheduleEmailReportCharts */
export type ScheduleEmailReportCharts_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "scheduleEmailReportCharts" */
export enum ScheduleEmailReportCharts_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExternalMetricId = 'externalMetricId',
  /** column name */
  Id = 'id',
  /** column name */
  ScheduleEmailReportId = 'scheduleEmailReportId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "scheduleEmailReportCharts" */
export type ScheduleEmailReportCharts_Set_Input = {
  externalMetricId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  scheduleEmailReportId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "scheduleEmailReportCharts" */
export enum ScheduleEmailReportCharts_Update_Column {
  /** column name */
  ExternalMetricId = 'externalMetricId',
  /** column name */
  Id = 'id',
  /** column name */
  ScheduleEmailReportId = 'scheduleEmailReportId'
}

/** columns and relationships of "scheduleEmailReports" */
export type ScheduleEmailReports = {
  __typename?: 'scheduleEmailReports';
  createdAt: Scalars['timestamptz'];
  emails: Scalars['json'];
  /** An object relationship */
  externalDashboard: ExternalDashboards;
  externalDashboardId: Scalars['uuid'];
  guestToken: Scalars['uuid'];
  /** An object relationship */
  guestTokenByGuesttoken: GuestTokens;
  id: Scalars['uuid'];
  nextScheduledAt: Scalars['String'];
  /** An array relationship */
  scheduleEmailReportCharts: Array<ScheduleEmailReportCharts>;
  /** An object relationship */
  sharingSetting: SharingSettings;
  sharingSettingsId: Scalars['uuid'];
  subject: Scalars['String'];
  timeConfigurations: Scalars['json'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "scheduleEmailReports" */
export type ScheduleEmailReportsEmailsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "scheduleEmailReports" */
export type ScheduleEmailReportsScheduleEmailReportChartsArgs = {
  distinct_on?: InputMaybe<Array<ScheduleEmailReportCharts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ScheduleEmailReportCharts_Order_By>>;
  where?: InputMaybe<ScheduleEmailReportCharts_Bool_Exp>;
};


/** columns and relationships of "scheduleEmailReports" */
export type ScheduleEmailReportsTimeConfigurationsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "scheduleEmailReports" */
export type ScheduleEmailReports_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ScheduleEmailReports_Max_Order_By>;
  min?: InputMaybe<ScheduleEmailReports_Min_Order_By>;
};

/** input type for inserting array relation for remote table "scheduleEmailReports" */
export type ScheduleEmailReports_Arr_Rel_Insert_Input = {
  data: Array<ScheduleEmailReports_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ScheduleEmailReports_On_Conflict>;
};

/** Boolean expression to filter rows from the table "scheduleEmailReports". All fields are combined with a logical 'AND'. */
export type ScheduleEmailReports_Bool_Exp = {
  _and?: InputMaybe<Array<ScheduleEmailReports_Bool_Exp>>;
  _not?: InputMaybe<ScheduleEmailReports_Bool_Exp>;
  _or?: InputMaybe<Array<ScheduleEmailReports_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  emails?: InputMaybe<Json_Comparison_Exp>;
  externalDashboard?: InputMaybe<ExternalDashboards_Bool_Exp>;
  externalDashboardId?: InputMaybe<Uuid_Comparison_Exp>;
  guestToken?: InputMaybe<Uuid_Comparison_Exp>;
  guestTokenByGuesttoken?: InputMaybe<GuestTokens_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  nextScheduledAt?: InputMaybe<String_Comparison_Exp>;
  scheduleEmailReportCharts?: InputMaybe<ScheduleEmailReportCharts_Bool_Exp>;
  sharingSetting?: InputMaybe<SharingSettings_Bool_Exp>;
  sharingSettingsId?: InputMaybe<Uuid_Comparison_Exp>;
  subject?: InputMaybe<String_Comparison_Exp>;
  timeConfigurations?: InputMaybe<Json_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "scheduleEmailReports" */
export enum ScheduleEmailReports_Constraint {
  /** unique or primary key constraint on columns "guestToken" */
  ScheduleEmailReportsGuestTokenKey = 'scheduleEmailReports_guestToken_key',
  /** unique or primary key constraint on columns "id" */
  ScheduleEmailReportsPkey = 'scheduleEmailReports_pkey'
}

/** input type for inserting data into table "scheduleEmailReports" */
export type ScheduleEmailReports_Insert_Input = {
  emails?: InputMaybe<Scalars['json']>;
  externalDashboard?: InputMaybe<ExternalDashboards_Obj_Rel_Insert_Input>;
  externalDashboardId?: InputMaybe<Scalars['uuid']>;
  guestToken?: InputMaybe<Scalars['uuid']>;
  guestTokenByGuesttoken?: InputMaybe<GuestTokens_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  nextScheduledAt?: InputMaybe<Scalars['String']>;
  scheduleEmailReportCharts?: InputMaybe<ScheduleEmailReportCharts_Arr_Rel_Insert_Input>;
  sharingSetting?: InputMaybe<SharingSettings_Obj_Rel_Insert_Input>;
  sharingSettingsId?: InputMaybe<Scalars['uuid']>;
  subject?: InputMaybe<Scalars['String']>;
  timeConfigurations?: InputMaybe<Scalars['json']>;
};

/** order by max() on columns of table "scheduleEmailReports" */
export type ScheduleEmailReports_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  guestToken?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nextScheduledAt?: InputMaybe<Order_By>;
  sharingSettingsId?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "scheduleEmailReports" */
export type ScheduleEmailReports_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  guestToken?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nextScheduledAt?: InputMaybe<Order_By>;
  sharingSettingsId?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "scheduleEmailReports" */
export type ScheduleEmailReports_Mutation_Response = {
  __typename?: 'scheduleEmailReports_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ScheduleEmailReports>;
};

/** input type for inserting object relation for remote table "scheduleEmailReports" */
export type ScheduleEmailReports_Obj_Rel_Insert_Input = {
  data: ScheduleEmailReports_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<ScheduleEmailReports_On_Conflict>;
};

/** on_conflict condition type for table "scheduleEmailReports" */
export type ScheduleEmailReports_On_Conflict = {
  constraint: ScheduleEmailReports_Constraint;
  update_columns?: Array<ScheduleEmailReports_Update_Column>;
  where?: InputMaybe<ScheduleEmailReports_Bool_Exp>;
};

/** Ordering options when selecting data from "scheduleEmailReports". */
export type ScheduleEmailReports_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  emails?: InputMaybe<Order_By>;
  externalDashboard?: InputMaybe<ExternalDashboards_Order_By>;
  externalDashboardId?: InputMaybe<Order_By>;
  guestToken?: InputMaybe<Order_By>;
  guestTokenByGuesttoken?: InputMaybe<GuestTokens_Order_By>;
  id?: InputMaybe<Order_By>;
  nextScheduledAt?: InputMaybe<Order_By>;
  scheduleEmailReportCharts_aggregate?: InputMaybe<ScheduleEmailReportCharts_Aggregate_Order_By>;
  sharingSetting?: InputMaybe<SharingSettings_Order_By>;
  sharingSettingsId?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  timeConfigurations?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: scheduleEmailReports */
export type ScheduleEmailReports_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "scheduleEmailReports" */
export enum ScheduleEmailReports_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Emails = 'emails',
  /** column name */
  ExternalDashboardId = 'externalDashboardId',
  /** column name */
  GuestToken = 'guestToken',
  /** column name */
  Id = 'id',
  /** column name */
  NextScheduledAt = 'nextScheduledAt',
  /** column name */
  SharingSettingsId = 'sharingSettingsId',
  /** column name */
  Subject = 'subject',
  /** column name */
  TimeConfigurations = 'timeConfigurations',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "scheduleEmailReports" */
export type ScheduleEmailReports_Set_Input = {
  emails?: InputMaybe<Scalars['json']>;
  externalDashboardId?: InputMaybe<Scalars['uuid']>;
  guestToken?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  nextScheduledAt?: InputMaybe<Scalars['String']>;
  sharingSettingsId?: InputMaybe<Scalars['uuid']>;
  subject?: InputMaybe<Scalars['String']>;
  timeConfigurations?: InputMaybe<Scalars['json']>;
};

/** update columns of table "scheduleEmailReports" */
export enum ScheduleEmailReports_Update_Column {
  /** column name */
  Emails = 'emails',
  /** column name */
  ExternalDashboardId = 'externalDashboardId',
  /** column name */
  GuestToken = 'guestToken',
  /** column name */
  Id = 'id',
  /** column name */
  NextScheduledAt = 'nextScheduledAt',
  /** column name */
  SharingSettingsId = 'sharingSettingsId',
  /** column name */
  Subject = 'subject',
  /** column name */
  TimeConfigurations = 'timeConfigurations'
}

/** Company secret variables. */
export type Secrets = {
  __typename?: 'secrets';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  value: Scalars['String'];
};

/** order by aggregate values of table "secrets" */
export type Secrets_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Secrets_Max_Order_By>;
  min?: InputMaybe<Secrets_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "secrets". All fields are combined with a logical 'AND'. */
export type Secrets_Bool_Exp = {
  _and?: InputMaybe<Array<Secrets_Bool_Exp>>;
  _not?: InputMaybe<Secrets_Bool_Exp>;
  _or?: InputMaybe<Array<Secrets_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "secrets" */
export enum Secrets_Constraint {
  /** unique or primary key constraint on columns "companyId", "name" */
  SecretsNameCompanyIdKey = 'secrets_name_companyId_key',
  /** unique or primary key constraint on columns "id" */
  SecretsPkey = 'secrets_pkey'
}

/** input type for inserting data into table "secrets" */
export type Secrets_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** order by max() on columns of table "secrets" */
export type Secrets_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "secrets" */
export type Secrets_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "secrets" */
export type Secrets_Mutation_Response = {
  __typename?: 'secrets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Secrets>;
};

/** on_conflict condition type for table "secrets" */
export type Secrets_On_Conflict = {
  constraint: Secrets_Constraint;
  update_columns?: Array<Secrets_Update_Column>;
  where?: InputMaybe<Secrets_Bool_Exp>;
};

/** Ordering options when selecting data from "secrets". */
export type Secrets_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: secrets */
export type Secrets_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "secrets" */
export enum Secrets_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "secrets" */
export type Secrets_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "secrets" */
export enum Secrets_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Value = 'value'
}

/** fields of action: "shareCsvUrl" */
export type ShareCsvUrl = {
  __typename?: 'shareCsvUrl';
  /** the time at which this action was created */
  created_at: Scalars['timestamptz'];
  /** errors related to the invocation */
  errors?: Maybe<Scalars['json']>;
  /** the unique id of an action */
  id: Scalars['uuid'];
  /** the output fields of this action */
  output?: Maybe<InvokeSaveRawCsvDetailsOutput>;
};

/** columns and relationships of "sharingSettings" */
export type SharingSettings = {
  __typename?: 'sharingSettings';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  fromAddress: Scalars['String'];
  host: Scalars['String'];
  id: Scalars['uuid'];
  password: Scalars['String'];
  port: Scalars['Int'];
  replyToAddress: Scalars['String'];
  /** An array relationship */
  scheduleEmailReports: Array<ScheduleEmailReports>;
  secure: Scalars['Boolean'];
  updatedAt: Scalars['timestamptz'];
  username: Scalars['String'];
};


/** columns and relationships of "sharingSettings" */
export type SharingSettingsScheduleEmailReportsArgs = {
  distinct_on?: InputMaybe<Array<ScheduleEmailReports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ScheduleEmailReports_Order_By>>;
  where?: InputMaybe<ScheduleEmailReports_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "sharingSettings". All fields are combined with a logical 'AND'. */
export type SharingSettings_Bool_Exp = {
  _and?: InputMaybe<Array<SharingSettings_Bool_Exp>>;
  _not?: InputMaybe<SharingSettings_Bool_Exp>;
  _or?: InputMaybe<Array<SharingSettings_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  fromAddress?: InputMaybe<String_Comparison_Exp>;
  host?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  port?: InputMaybe<Int_Comparison_Exp>;
  replyToAddress?: InputMaybe<String_Comparison_Exp>;
  scheduleEmailReports?: InputMaybe<ScheduleEmailReports_Bool_Exp>;
  secure?: InputMaybe<Boolean_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "sharingSettings" */
export enum SharingSettings_Constraint {
  /** unique or primary key constraint on columns "companyId" */
  SharingSettingsCompanyIdKey = 'sharingSettings_companyId_key',
  /** unique or primary key constraint on columns "id" */
  SharingSettingsPkey = 'sharingSettings_pkey'
}

/** input type for incrementing numeric columns in table "sharingSettings" */
export type SharingSettings_Inc_Input = {
  port?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "sharingSettings" */
export type SharingSettings_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  fromAddress?: InputMaybe<Scalars['String']>;
  host?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['Int']>;
  replyToAddress?: InputMaybe<Scalars['String']>;
  scheduleEmailReports?: InputMaybe<ScheduleEmailReports_Arr_Rel_Insert_Input>;
  secure?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};

/** response of any mutation on the table "sharingSettings" */
export type SharingSettings_Mutation_Response = {
  __typename?: 'sharingSettings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<SharingSettings>;
};

/** input type for inserting object relation for remote table "sharingSettings" */
export type SharingSettings_Obj_Rel_Insert_Input = {
  data: SharingSettings_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<SharingSettings_On_Conflict>;
};

/** on_conflict condition type for table "sharingSettings" */
export type SharingSettings_On_Conflict = {
  constraint: SharingSettings_Constraint;
  update_columns?: Array<SharingSettings_Update_Column>;
  where?: InputMaybe<SharingSettings_Bool_Exp>;
};

/** Ordering options when selecting data from "sharingSettings". */
export type SharingSettings_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  fromAddress?: InputMaybe<Order_By>;
  host?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
  replyToAddress?: InputMaybe<Order_By>;
  scheduleEmailReports_aggregate?: InputMaybe<ScheduleEmailReports_Aggregate_Order_By>;
  secure?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: sharingSettings */
export type SharingSettings_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "sharingSettings" */
export enum SharingSettings_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FromAddress = 'fromAddress',
  /** column name */
  Host = 'host',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  Port = 'port',
  /** column name */
  ReplyToAddress = 'replyToAddress',
  /** column name */
  Secure = 'secure',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "sharingSettings" */
export type SharingSettings_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  fromAddress?: InputMaybe<Scalars['String']>;
  host?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['Int']>;
  replyToAddress?: InputMaybe<Scalars['String']>;
  secure?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};

/** update columns of table "sharingSettings" */
export enum SharingSettings_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  FromAddress = 'fromAddress',
  /** column name */
  Host = 'host',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  Port = 'port',
  /** column name */
  ReplyToAddress = 'replyToAddress',
  /** column name */
  Secure = 'secure',
  /** column name */
  Username = 'username'
}

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  apiTokens: Array<ApiTokens>;
  /** fetch data from the table: "apiTokens" using primary key columns */
  apiTokens_by_pk?: Maybe<ApiTokens>;
  /** fetch data from the table: "clientDashboardLayout" */
  clientDashboardLayout: Array<ClientDashboardLayout>;
  /** fetch data from the table: "clientDashboardLayout" using primary key columns */
  clientDashboardLayout_by_pk?: Maybe<ClientDashboardLayout>;
  /** An array relationship */
  clientDeletedMetrics: Array<ClientDeletedMetrics>;
  /** fetch data from the table: "clientDeletedMetrics" using primary key columns */
  clientDeletedMetrics_by_pk?: Maybe<ClientDeletedMetrics>;
  /** An array relationship */
  companies: Array<Companies>;
  /** fetch data from the table: "companies" using primary key columns */
  companies_by_pk?: Maybe<Companies>;
  /** An array relationship */
  companyCacheSchemas: Array<CompanyCacheSchemas>;
  /** fetch data from the table: "companyCacheSchemas" using primary key columns */
  companyCacheSchemas_by_pk?: Maybe<CompanyCacheSchemas>;
  /** fetch data from the table: "companyDatabases" */
  companyDatabases: Array<CompanyDatabases>;
  /** fetch data from the table: "companyDatabases" using primary key columns */
  companyDatabases_by_pk?: Maybe<CompanyDatabases>;
  /** An array relationship */
  companyIntegrations: Array<CompanyIntegrations>;
  /** fetch data from the table: "companyIntegrations" using primary key columns */
  companyIntegrations_by_pk?: Maybe<CompanyIntegrations>;
  /** An array relationship */
  companyRedis: Array<CompanyRedis>;
  /** fetch data from the table: "companyRedis" using primary key columns */
  companyRedis_by_pk?: Maybe<CompanyRedis>;
  /** An array relationship */
  companyRlsFilters: Array<CompanyRlsFilters>;
  /** fetch data from the table: "companyRlsFilters" using primary key columns */
  companyRlsFilters_by_pk?: Maybe<CompanyRlsFilters>;
  /** An array relationship */
  companyRoles: Array<CompanyRoles>;
  /** fetch data from the table: "companyRoles" using primary key columns */
  companyRoles_by_pk?: Maybe<CompanyRoles>;
  /** An array relationship */
  companySubsetTables: Array<CompanySubsetTables>;
  /** fetch data from the table: "companySubsetTables" using primary key columns */
  companySubsetTables_by_pk?: Maybe<CompanySubsetTables>;
  /** An array relationship */
  companyWorkspaces: Array<CompanyWorkspaces>;
  /** fetch data from the table: "companyWorkspaces" using primary key columns */
  companyWorkspaces_by_pk?: Maybe<CompanyWorkspaces>;
  /** An array relationship */
  customLayers: Array<CustomLayers>;
  /** fetch data from the table: "customLayers" using primary key columns */
  customLayers_by_pk?: Maybe<CustomLayers>;
  /** An array relationship */
  customSqlColumns: Array<CustomSqlColumns>;
  /** fetch data from the table: "customSqlColumns" using primary key columns */
  customSqlColumns_by_pk?: Maybe<CustomSqlColumns>;
  /** An array relationship */
  dashboardMetrics: Array<DashboardMetrics>;
  /** fetch data from the table: "dashboardMetrics" using primary key columns */
  dashboardMetrics_by_pk?: Maybe<DashboardMetrics>;
  /** An array relationship */
  dashboards: Array<Dashboards>;
  /** fetch data from the table: "dashboards" using primary key columns */
  dashboards_by_pk?: Maybe<Dashboards>;
  /** An array relationship */
  dataModels: Array<DataModels>;
  /** fetch data from the table: "dataModels" using primary key columns */
  dataModels_by_pk?: Maybe<DataModels>;
  /** fetch data from the table: "demoTheme" */
  demoTheme: Array<DemoTheme>;
  /** fetch data from the table: "demoTheme" using primary key columns */
  demoTheme_by_pk?: Maybe<DemoTheme>;
  /** An array relationship */
  documents: Array<Documents>;
  /** fetch data from the table: "documents" using primary key columns */
  documents_by_pk?: Maybe<Documents>;
  /** An array relationship */
  externalDashboardMetrics: Array<ExternalDashboardMetrics>;
  /** fetch data from the table: "externalDashboardMetrics" using primary key columns */
  externalDashboardMetrics_by_pk?: Maybe<ExternalDashboardMetrics>;
  /** An array relationship */
  externalDashboardThemeClients: Array<ExternalDashboardThemeClients>;
  /** fetch data from the table: "externalDashboardThemeClients" using primary key columns */
  externalDashboardThemeClients_by_pk?: Maybe<ExternalDashboardThemeClients>;
  /** An array relationship */
  externalDashboardThemes: Array<ExternalDashboardThemes>;
  /** fetch data from the table: "externalDashboardThemes" using primary key columns */
  externalDashboardThemes_by_pk?: Maybe<ExternalDashboardThemes>;
  /** An array relationship */
  externalDashboards: Array<ExternalDashboards>;
  /** fetch data from the table: "externalDashboards" using primary key columns */
  externalDashboards_by_pk?: Maybe<ExternalDashboards>;
  /** An array relationship */
  externalDatasets: Array<ExternalDatasets>;
  /** fetch data from the table: "externalDatasets" using primary key columns */
  externalDatasets_by_pk?: Maybe<ExternalDatasets>;
  /** fetch data from the table: "externalMetricRawCsvUrls" */
  externalMetricRawCsvUrls: Array<ExternalMetricRawCsvUrls>;
  /** fetch data from the table: "externalMetricRawCsvUrls" using primary key columns */
  externalMetricRawCsvUrls_by_pk?: Maybe<ExternalMetricRawCsvUrls>;
  /** An array relationship */
  externalMetrics: Array<ExternalMetrics>;
  /** An array relationship */
  externalMetricsRlsFilters: Array<ExternalMetricsRlsFilters>;
  /** fetch data from the table: "externalMetricsRlsFilters" using primary key columns */
  externalMetricsRlsFilters_by_pk?: Maybe<ExternalMetricsRlsFilters>;
  /** fetch data from the table: "externalMetrics" using primary key columns */
  externalMetrics_by_pk?: Maybe<ExternalMetrics>;
  /** An array relationship */
  guestTokens: Array<GuestTokens>;
  /** fetch data from the table: "guestTokens" using primary key columns */
  guestTokens_by_pk?: Maybe<GuestTokens>;
  /** fetch data from the table: "integrationSpecifications" */
  integrationSpecifications: Array<IntegrationSpecifications>;
  /** fetch data from the table: "integrationSpecifications" using primary key columns */
  integrationSpecifications_by_pk?: Maybe<IntegrationSpecifications>;
  /** fetch data from the table: "integrations" */
  integrations: Array<Integrations>;
  /** fetch data from the table: "integrations" using primary key columns */
  integrations_by_pk?: Maybe<Integrations>;
  /** An array relationship */
  metricTags: Array<MetricTags>;
  /** fetch data from the table: "metricTags" using primary key columns */
  metricTags_by_pk?: Maybe<MetricTags>;
  /** An array relationship */
  metricVersions: Array<MetricVersions>;
  /** fetch data from the table: "metricVersions" using primary key columns */
  metricVersions_by_pk?: Maybe<MetricVersions>;
  /** An array relationship */
  metrics: Array<Metrics>;
  /** fetch data from the table: "metrics" using primary key columns */
  metrics_by_pk?: Maybe<Metrics>;
  /** An array relationship */
  organizations: Array<Organizations>;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** An array relationship */
  scheduleEmailReportCharts: Array<ScheduleEmailReportCharts>;
  /** fetch data from the table: "scheduleEmailReportCharts" using primary key columns */
  scheduleEmailReportCharts_by_pk?: Maybe<ScheduleEmailReportCharts>;
  /** An array relationship */
  scheduleEmailReports: Array<ScheduleEmailReports>;
  /** fetch data from the table: "scheduleEmailReports" using primary key columns */
  scheduleEmailReports_by_pk?: Maybe<ScheduleEmailReports>;
  /** An array relationship */
  secrets: Array<Secrets>;
  /** fetch data from the table: "secrets" using primary key columns */
  secrets_by_pk?: Maybe<Secrets>;
  shareCsvUrl?: Maybe<ShareCsvUrl>;
  /** fetch data from the table: "sharingSettings" */
  sharingSettings: Array<SharingSettings>;
  /** fetch data from the table: "sharingSettings" using primary key columns */
  sharingSettings_by_pk?: Maybe<SharingSettings>;
  /** An array relationship */
  themes: Array<Themes>;
  /** fetch data from the table: "themes" using primary key columns */
  themes_by_pk?: Maybe<Themes>;
  /** An array relationship */
  userRoles: Array<UserRoles>;
  /** fetch data from the table: "userRoles" using primary key columns */
  userRoles_by_pk?: Maybe<UserRoles>;
  /** An array relationship */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "whitelistedDomains" */
  whitelistedDomains: Array<WhitelistedDomains>;
  /** fetch data from the table: "whitelistedDomains" using primary key columns */
  whitelistedDomains_by_pk?: Maybe<WhitelistedDomains>;
  /** An array relationship */
  workspaceThemes: Array<WorkspaceThemes>;
  /** fetch data from the table: "workspaceThemes" using primary key columns */
  workspaceThemes_by_pk?: Maybe<WorkspaceThemes>;
};


export type Subscription_RootApiTokensArgs = {
  distinct_on?: InputMaybe<Array<ApiTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ApiTokens_Order_By>>;
  where?: InputMaybe<ApiTokens_Bool_Exp>;
};


export type Subscription_RootApiTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootClientDashboardLayoutArgs = {
  distinct_on?: InputMaybe<Array<ClientDashboardLayout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ClientDashboardLayout_Order_By>>;
  where?: InputMaybe<ClientDashboardLayout_Bool_Exp>;
};


export type Subscription_RootClientDashboardLayout_By_PkArgs = {
  clientId: Scalars['String'];
  externalDashboardId: Scalars['uuid'];
};


export type Subscription_RootClientDeletedMetricsArgs = {
  distinct_on?: InputMaybe<Array<ClientDeletedMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ClientDeletedMetrics_Order_By>>;
  where?: InputMaybe<ClientDeletedMetrics_Bool_Exp>;
};


export type Subscription_RootClientDeletedMetrics_By_PkArgs = {
  clientId: Scalars['String'];
  externalMetricId: Scalars['uuid'];
};


export type Subscription_RootCompaniesArgs = {
  distinct_on?: InputMaybe<Array<Companies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Companies_Order_By>>;
  where?: InputMaybe<Companies_Bool_Exp>;
};


export type Subscription_RootCompanies_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCompanyCacheSchemasArgs = {
  distinct_on?: InputMaybe<Array<CompanyCacheSchemas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyCacheSchemas_Order_By>>;
  where?: InputMaybe<CompanyCacheSchemas_Bool_Exp>;
};


export type Subscription_RootCompanyCacheSchemas_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCompanyDatabasesArgs = {
  distinct_on?: InputMaybe<Array<CompanyDatabases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyDatabases_Order_By>>;
  where?: InputMaybe<CompanyDatabases_Bool_Exp>;
};


export type Subscription_RootCompanyDatabases_By_PkArgs = {
  companyId: Scalars['uuid'];
};


export type Subscription_RootCompanyIntegrationsArgs = {
  distinct_on?: InputMaybe<Array<CompanyIntegrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyIntegrations_Order_By>>;
  where?: InputMaybe<CompanyIntegrations_Bool_Exp>;
};


export type Subscription_RootCompanyIntegrations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCompanyRedisArgs = {
  distinct_on?: InputMaybe<Array<CompanyRedis_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyRedis_Order_By>>;
  where?: InputMaybe<CompanyRedis_Bool_Exp>;
};


export type Subscription_RootCompanyRedis_By_PkArgs = {
  workspaceId: Scalars['uuid'];
};


export type Subscription_RootCompanyRlsFiltersArgs = {
  distinct_on?: InputMaybe<Array<CompanyRlsFilters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyRlsFilters_Order_By>>;
  where?: InputMaybe<CompanyRlsFilters_Bool_Exp>;
};


export type Subscription_RootCompanyRlsFilters_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCompanyRolesArgs = {
  distinct_on?: InputMaybe<Array<CompanyRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyRoles_Order_By>>;
  where?: InputMaybe<CompanyRoles_Bool_Exp>;
};


export type Subscription_RootCompanyRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCompanySubsetTablesArgs = {
  distinct_on?: InputMaybe<Array<CompanySubsetTables_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanySubsetTables_Order_By>>;
  where?: InputMaybe<CompanySubsetTables_Bool_Exp>;
};


export type Subscription_RootCompanySubsetTables_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCompanyWorkspacesArgs = {
  distinct_on?: InputMaybe<Array<CompanyWorkspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyWorkspaces_Order_By>>;
  where?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
};


export type Subscription_RootCompanyWorkspaces_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCustomLayersArgs = {
  distinct_on?: InputMaybe<Array<CustomLayers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CustomLayers_Order_By>>;
  where?: InputMaybe<CustomLayers_Bool_Exp>;
};


export type Subscription_RootCustomLayers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCustomSqlColumnsArgs = {
  distinct_on?: InputMaybe<Array<CustomSqlColumns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CustomSqlColumns_Order_By>>;
  where?: InputMaybe<CustomSqlColumns_Bool_Exp>;
};


export type Subscription_RootCustomSqlColumns_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootDashboardMetricsArgs = {
  distinct_on?: InputMaybe<Array<DashboardMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DashboardMetrics_Order_By>>;
  where?: InputMaybe<DashboardMetrics_Bool_Exp>;
};


export type Subscription_RootDashboardMetrics_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootDashboardsArgs = {
  distinct_on?: InputMaybe<Array<Dashboards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dashboards_Order_By>>;
  where?: InputMaybe<Dashboards_Bool_Exp>;
};


export type Subscription_RootDashboards_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootDataModelsArgs = {
  distinct_on?: InputMaybe<Array<DataModels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DataModels_Order_By>>;
  where?: InputMaybe<DataModels_Bool_Exp>;
};


export type Subscription_RootDataModels_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootDemoThemeArgs = {
  distinct_on?: InputMaybe<Array<DemoTheme_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DemoTheme_Order_By>>;
  where?: InputMaybe<DemoTheme_Bool_Exp>;
};


export type Subscription_RootDemoTheme_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootDocumentsArgs = {
  distinct_on?: InputMaybe<Array<Documents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Documents_Order_By>>;
  where?: InputMaybe<Documents_Bool_Exp>;
};


export type Subscription_RootDocuments_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootExternalDashboardMetricsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboardMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboardMetrics_Order_By>>;
  where?: InputMaybe<ExternalDashboardMetrics_Bool_Exp>;
};


export type Subscription_RootExternalDashboardMetrics_By_PkArgs = {
  externalDashboardId: Scalars['uuid'];
  externalMetricId: Scalars['uuid'];
};


export type Subscription_RootExternalDashboardThemeClientsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboardThemeClients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboardThemeClients_Order_By>>;
  where?: InputMaybe<ExternalDashboardThemeClients_Bool_Exp>;
};


export type Subscription_RootExternalDashboardThemeClients_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootExternalDashboardThemesArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboardThemes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboardThemes_Order_By>>;
  where?: InputMaybe<ExternalDashboardThemes_Bool_Exp>;
};


export type Subscription_RootExternalDashboardThemes_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootExternalDashboardsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDashboards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDashboards_Order_By>>;
  where?: InputMaybe<ExternalDashboards_Bool_Exp>;
};


export type Subscription_RootExternalDashboards_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootExternalDatasetsArgs = {
  distinct_on?: InputMaybe<Array<ExternalDatasets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalDatasets_Order_By>>;
  where?: InputMaybe<ExternalDatasets_Bool_Exp>;
};


export type Subscription_RootExternalDatasets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootExternalMetricRawCsvUrlsArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetricRawCsvUrls_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetricRawCsvUrls_Order_By>>;
  where?: InputMaybe<ExternalMetricRawCsvUrls_Bool_Exp>;
};


export type Subscription_RootExternalMetricRawCsvUrls_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootExternalMetricsArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetrics_Order_By>>;
  where?: InputMaybe<ExternalMetrics_Bool_Exp>;
};


export type Subscription_RootExternalMetricsRlsFiltersArgs = {
  distinct_on?: InputMaybe<Array<ExternalMetricsRlsFilters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExternalMetricsRlsFilters_Order_By>>;
  where?: InputMaybe<ExternalMetricsRlsFilters_Bool_Exp>;
};


export type Subscription_RootExternalMetricsRlsFilters_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootExternalMetrics_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGuestTokensArgs = {
  distinct_on?: InputMaybe<Array<GuestTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuestTokens_Order_By>>;
  where?: InputMaybe<GuestTokens_Bool_Exp>;
};


export type Subscription_RootGuestTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootIntegrationSpecificationsArgs = {
  distinct_on?: InputMaybe<Array<IntegrationSpecifications_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<IntegrationSpecifications_Order_By>>;
  where?: InputMaybe<IntegrationSpecifications_Bool_Exp>;
};


export type Subscription_RootIntegrationSpecifications_By_PkArgs = {
  id: Scalars['uuid'];
  integrationId: Scalars['uuid'];
};


export type Subscription_RootIntegrationsArgs = {
  distinct_on?: InputMaybe<Array<Integrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Integrations_Order_By>>;
  where?: InputMaybe<Integrations_Bool_Exp>;
};


export type Subscription_RootIntegrations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMetricTagsArgs = {
  distinct_on?: InputMaybe<Array<MetricTags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MetricTags_Order_By>>;
  where?: InputMaybe<MetricTags_Bool_Exp>;
};


export type Subscription_RootMetricTags_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMetricVersionsArgs = {
  distinct_on?: InputMaybe<Array<MetricVersions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MetricVersions_Order_By>>;
  where?: InputMaybe<MetricVersions_Bool_Exp>;
};


export type Subscription_RootMetricVersions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMetricsArgs = {
  distinct_on?: InputMaybe<Array<Metrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Metrics_Order_By>>;
  where?: InputMaybe<Metrics_Bool_Exp>;
};


export type Subscription_RootMetrics_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootScheduleEmailReportChartsArgs = {
  distinct_on?: InputMaybe<Array<ScheduleEmailReportCharts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ScheduleEmailReportCharts_Order_By>>;
  where?: InputMaybe<ScheduleEmailReportCharts_Bool_Exp>;
};


export type Subscription_RootScheduleEmailReportCharts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootScheduleEmailReportsArgs = {
  distinct_on?: InputMaybe<Array<ScheduleEmailReports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ScheduleEmailReports_Order_By>>;
  where?: InputMaybe<ScheduleEmailReports_Bool_Exp>;
};


export type Subscription_RootScheduleEmailReports_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootSecretsArgs = {
  distinct_on?: InputMaybe<Array<Secrets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Secrets_Order_By>>;
  where?: InputMaybe<Secrets_Bool_Exp>;
};


export type Subscription_RootSecrets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootShareCsvUrlArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootSharingSettingsArgs = {
  distinct_on?: InputMaybe<Array<SharingSettings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SharingSettings_Order_By>>;
  where?: InputMaybe<SharingSettings_Bool_Exp>;
};


export type Subscription_RootSharingSettings_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootThemesArgs = {
  distinct_on?: InputMaybe<Array<Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Themes_Order_By>>;
  where?: InputMaybe<Themes_Bool_Exp>;
};


export type Subscription_RootThemes_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUserRolesArgs = {
  distinct_on?: InputMaybe<Array<UserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserRoles_Order_By>>;
  where?: InputMaybe<UserRoles_Bool_Exp>;
};


export type Subscription_RootUserRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootWhitelistedDomainsArgs = {
  distinct_on?: InputMaybe<Array<WhitelistedDomains_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WhitelistedDomains_Order_By>>;
  where?: InputMaybe<WhitelistedDomains_Bool_Exp>;
};


export type Subscription_RootWhitelistedDomains_By_PkArgs = {
  companyId: Scalars['uuid'];
};


export type Subscription_RootWorkspaceThemesArgs = {
  distinct_on?: InputMaybe<Array<WorkspaceThemes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WorkspaceThemes_Order_By>>;
  where?: InputMaybe<WorkspaceThemes_Bool_Exp>;
};


export type Subscription_RootWorkspaceThemes_By_PkArgs = {
  id: Scalars['uuid'];
};

/** The global theme per company. */
export type Themes = {
  __typename?: 'themes';
  cardCustomization: Scalars['jsonb'];
  cardDescription: Scalars['jsonb'];
  cardTitle: Scalars['jsonb'];
  chart: Scalars['jsonb'];
  chartCustomization?: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  companies: Array<Companies>;
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  dashboard: Scalars['jsonb'];
  general: Scalars['jsonb'];
  id: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
  workspaceId: Scalars['uuid'];
  /** An array relationship */
  workspaceThemes: Array<WorkspaceThemes>;
};


/** The global theme per company. */
export type ThemesCardCustomizationArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** The global theme per company. */
export type ThemesCardDescriptionArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** The global theme per company. */
export type ThemesCardTitleArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** The global theme per company. */
export type ThemesChartArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** The global theme per company. */
export type ThemesChartCustomizationArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** The global theme per company. */
export type ThemesCompaniesArgs = {
  distinct_on?: InputMaybe<Array<Companies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Companies_Order_By>>;
  where?: InputMaybe<Companies_Bool_Exp>;
};


/** The global theme per company. */
export type ThemesDashboardArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** The global theme per company. */
export type ThemesGeneralArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** The global theme per company. */
export type ThemesWorkspaceThemesArgs = {
  distinct_on?: InputMaybe<Array<WorkspaceThemes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WorkspaceThemes_Order_By>>;
  where?: InputMaybe<WorkspaceThemes_Bool_Exp>;
};

/** order by aggregate values of table "themes" */
export type Themes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Themes_Max_Order_By>;
  min?: InputMaybe<Themes_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Themes_Append_Input = {
  cardCustomization?: InputMaybe<Scalars['jsonb']>;
  cardDescription?: InputMaybe<Scalars['jsonb']>;
  cardTitle?: InputMaybe<Scalars['jsonb']>;
  chart?: InputMaybe<Scalars['jsonb']>;
  chartCustomization?: InputMaybe<Scalars['jsonb']>;
  dashboard?: InputMaybe<Scalars['jsonb']>;
  general?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "themes". All fields are combined with a logical 'AND'. */
export type Themes_Bool_Exp = {
  _and?: InputMaybe<Array<Themes_Bool_Exp>>;
  _not?: InputMaybe<Themes_Bool_Exp>;
  _or?: InputMaybe<Array<Themes_Bool_Exp>>;
  cardCustomization?: InputMaybe<Jsonb_Comparison_Exp>;
  cardDescription?: InputMaybe<Jsonb_Comparison_Exp>;
  cardTitle?: InputMaybe<Jsonb_Comparison_Exp>;
  chart?: InputMaybe<Jsonb_Comparison_Exp>;
  chartCustomization?: InputMaybe<Jsonb_Comparison_Exp>;
  companies?: InputMaybe<Companies_Bool_Exp>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  dashboard?: InputMaybe<Jsonb_Comparison_Exp>;
  general?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
  workspaceThemes?: InputMaybe<WorkspaceThemes_Bool_Exp>;
};

/** unique or primary key constraints on table "themes" */
export enum Themes_Constraint {
  /** unique or primary key constraint on columns "id" */
  ThemesIdKey = 'themes_id_key',
  /** unique or primary key constraint on columns "id" */
  ThemesPkey = 'themes_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Themes_Delete_At_Path_Input = {
  cardCustomization?: InputMaybe<Array<Scalars['String']>>;
  cardDescription?: InputMaybe<Array<Scalars['String']>>;
  cardTitle?: InputMaybe<Array<Scalars['String']>>;
  chart?: InputMaybe<Array<Scalars['String']>>;
  chartCustomization?: InputMaybe<Array<Scalars['String']>>;
  dashboard?: InputMaybe<Array<Scalars['String']>>;
  general?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Themes_Delete_Elem_Input = {
  cardCustomization?: InputMaybe<Scalars['Int']>;
  cardDescription?: InputMaybe<Scalars['Int']>;
  cardTitle?: InputMaybe<Scalars['Int']>;
  chart?: InputMaybe<Scalars['Int']>;
  chartCustomization?: InputMaybe<Scalars['Int']>;
  dashboard?: InputMaybe<Scalars['Int']>;
  general?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Themes_Delete_Key_Input = {
  cardCustomization?: InputMaybe<Scalars['String']>;
  cardDescription?: InputMaybe<Scalars['String']>;
  cardTitle?: InputMaybe<Scalars['String']>;
  chart?: InputMaybe<Scalars['String']>;
  chartCustomization?: InputMaybe<Scalars['String']>;
  dashboard?: InputMaybe<Scalars['String']>;
  general?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "themes" */
export type Themes_Insert_Input = {
  cardCustomization?: InputMaybe<Scalars['jsonb']>;
  cardDescription?: InputMaybe<Scalars['jsonb']>;
  cardTitle?: InputMaybe<Scalars['jsonb']>;
  chart?: InputMaybe<Scalars['jsonb']>;
  chartCustomization?: InputMaybe<Scalars['jsonb']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  dashboard?: InputMaybe<Scalars['jsonb']>;
  general?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
  workspaceThemes?: InputMaybe<WorkspaceThemes_Arr_Rel_Insert_Input>;
};

/** order by max() on columns of table "themes" */
export type Themes_Max_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "themes" */
export type Themes_Min_Order_By = {
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "themes" */
export type Themes_Mutation_Response = {
  __typename?: 'themes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Themes>;
};

/** input type for inserting object relation for remote table "themes" */
export type Themes_Obj_Rel_Insert_Input = {
  data: Themes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Themes_On_Conflict>;
};

/** on_conflict condition type for table "themes" */
export type Themes_On_Conflict = {
  constraint: Themes_Constraint;
  update_columns?: Array<Themes_Update_Column>;
  where?: InputMaybe<Themes_Bool_Exp>;
};

/** Ordering options when selecting data from "themes". */
export type Themes_Order_By = {
  cardCustomization?: InputMaybe<Order_By>;
  cardDescription?: InputMaybe<Order_By>;
  cardTitle?: InputMaybe<Order_By>;
  chart?: InputMaybe<Order_By>;
  chartCustomization?: InputMaybe<Order_By>;
  companies_aggregate?: InputMaybe<Companies_Aggregate_Order_By>;
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  dashboard?: InputMaybe<Order_By>;
  general?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
  workspaceThemes_aggregate?: InputMaybe<WorkspaceThemes_Aggregate_Order_By>;
};

/** primary key columns input for table: themes */
export type Themes_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Themes_Prepend_Input = {
  cardCustomization?: InputMaybe<Scalars['jsonb']>;
  cardDescription?: InputMaybe<Scalars['jsonb']>;
  cardTitle?: InputMaybe<Scalars['jsonb']>;
  chart?: InputMaybe<Scalars['jsonb']>;
  chartCustomization?: InputMaybe<Scalars['jsonb']>;
  dashboard?: InputMaybe<Scalars['jsonb']>;
  general?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "themes" */
export enum Themes_Select_Column {
  /** column name */
  CardCustomization = 'cardCustomization',
  /** column name */
  CardDescription = 'cardDescription',
  /** column name */
  CardTitle = 'cardTitle',
  /** column name */
  Chart = 'chart',
  /** column name */
  ChartCustomization = 'chartCustomization',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Dashboard = 'dashboard',
  /** column name */
  General = 'general',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "themes" */
export type Themes_Set_Input = {
  cardCustomization?: InputMaybe<Scalars['jsonb']>;
  cardDescription?: InputMaybe<Scalars['jsonb']>;
  cardTitle?: InputMaybe<Scalars['jsonb']>;
  chart?: InputMaybe<Scalars['jsonb']>;
  chartCustomization?: InputMaybe<Scalars['jsonb']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  dashboard?: InputMaybe<Scalars['jsonb']>;
  general?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "themes" */
export enum Themes_Update_Column {
  /** column name */
  CardCustomization = 'cardCustomization',
  /** column name */
  CardDescription = 'cardDescription',
  /** column name */
  CardTitle = 'cardTitle',
  /** column name */
  Chart = 'chart',
  /** column name */
  ChartCustomization = 'chartCustomization',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Dashboard = 'dashboard',
  /** column name */
  General = 'general',
  /** column name */
  Id = 'id',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Roles a user can have to access features within the company. */
export type UserRoles = {
  __typename?: 'userRoles';
  applyOn: Scalars['String'];
  /** An object relationship */
  companyRole: CompanyRoles;
  companyRoleId: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
  workspaces: Scalars['jsonb'];
};


/** Roles a user can have to access features within the company. */
export type UserRolesWorkspacesArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "userRoles" */
export type UserRoles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<UserRoles_Max_Order_By>;
  min?: InputMaybe<UserRoles_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type UserRoles_Append_Input = {
  workspaces?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "userRoles" */
export type UserRoles_Arr_Rel_Insert_Input = {
  data: Array<UserRoles_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<UserRoles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "userRoles". All fields are combined with a logical 'AND'. */
export type UserRoles_Bool_Exp = {
  _and?: InputMaybe<Array<UserRoles_Bool_Exp>>;
  _not?: InputMaybe<UserRoles_Bool_Exp>;
  _or?: InputMaybe<Array<UserRoles_Bool_Exp>>;
  applyOn?: InputMaybe<String_Comparison_Exp>;
  companyRole?: InputMaybe<CompanyRoles_Bool_Exp>;
  companyRoleId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
  workspaces?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "userRoles" */
export enum UserRoles_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserRolesPkey = 'userRoles_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type UserRoles_Delete_At_Path_Input = {
  workspaces?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type UserRoles_Delete_Elem_Input = {
  workspaces?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type UserRoles_Delete_Key_Input = {
  workspaces?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "userRoles" */
export type UserRoles_Insert_Input = {
  applyOn?: InputMaybe<Scalars['String']>;
  companyRole?: InputMaybe<CompanyRoles_Obj_Rel_Insert_Input>;
  companyRoleId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
  workspaces?: InputMaybe<Scalars['jsonb']>;
};

/** order by max() on columns of table "userRoles" */
export type UserRoles_Max_Order_By = {
  applyOn?: InputMaybe<Order_By>;
  companyRoleId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "userRoles" */
export type UserRoles_Min_Order_By = {
  applyOn?: InputMaybe<Order_By>;
  companyRoleId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "userRoles" */
export type UserRoles_Mutation_Response = {
  __typename?: 'userRoles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<UserRoles>;
};

/** on_conflict condition type for table "userRoles" */
export type UserRoles_On_Conflict = {
  constraint: UserRoles_Constraint;
  update_columns?: Array<UserRoles_Update_Column>;
  where?: InputMaybe<UserRoles_Bool_Exp>;
};

/** Ordering options when selecting data from "userRoles". */
export type UserRoles_Order_By = {
  applyOn?: InputMaybe<Order_By>;
  companyRole?: InputMaybe<CompanyRoles_Order_By>;
  companyRoleId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
  workspaces?: InputMaybe<Order_By>;
};

/** primary key columns input for table: userRoles */
export type UserRoles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type UserRoles_Prepend_Input = {
  workspaces?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "userRoles" */
export enum UserRoles_Select_Column {
  /** column name */
  ApplyOn = 'applyOn',
  /** column name */
  CompanyRoleId = 'companyRoleId',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'userId',
  /** column name */
  Workspaces = 'workspaces'
}

/** input type for updating data in table "userRoles" */
export type UserRoles_Set_Input = {
  applyOn?: InputMaybe<Scalars['String']>;
  companyRoleId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
  workspaces?: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "userRoles" */
export enum UserRoles_Update_Column {
  /** column name */
  ApplyOn = 'applyOn',
  /** column name */
  CompanyRoleId = 'companyRoleId',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'userId',
  /** column name */
  Workspaces = 'workspaces'
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  acceptedInviteAt?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  /** An array relationship */
  companyRlsFilters: Array<CompanyRlsFilters>;
  createdAt: Scalars['timestamp'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['uuid'];
  invitationToken?: Maybe<Scalars['String']>;
  invitedBy?: Maybe<Scalars['String']>;
  isAcceptedInvite: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An array relationship */
  userRoles: Array<UserRoles>;
};


/** columns and relationships of "users" */
export type UsersCompanyRlsFiltersArgs = {
  distinct_on?: InputMaybe<Array<CompanyRlsFilters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<CompanyRlsFilters_Order_By>>;
  where?: InputMaybe<CompanyRlsFilters_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUserRolesArgs = {
  distinct_on?: InputMaybe<Array<UserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserRoles_Order_By>>;
  where?: InputMaybe<UserRoles_Bool_Exp>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  acceptedInviteAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  companyRlsFilters?: InputMaybe<CompanyRlsFilters_Bool_Exp>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  firstName?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitationToken?: InputMaybe<String_Comparison_Exp>;
  invitedBy?: InputMaybe<String_Comparison_Exp>;
  isAcceptedInvite?: InputMaybe<Boolean_Comparison_Exp>;
  isAdmin?: InputMaybe<Boolean_Comparison_Exp>;
  lastName?: InputMaybe<String_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userRoles?: InputMaybe<UserRoles_Bool_Exp>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  acceptedInviteAt?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  firstName?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitationToken?: InputMaybe<Order_By>;
  invitedBy?: InputMaybe<Order_By>;
  lastName?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  acceptedInviteAt?: InputMaybe<Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  firstName?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitationToken?: InputMaybe<Order_By>;
  invitedBy?: InputMaybe<Order_By>;
  lastName?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  acceptedInviteAt?: InputMaybe<Order_By>;
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  companyRlsFilters_aggregate?: InputMaybe<CompanyRlsFilters_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  firstName?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitationToken?: InputMaybe<Order_By>;
  invitedBy?: InputMaybe<Order_By>;
  isAcceptedInvite?: InputMaybe<Order_By>;
  isAdmin?: InputMaybe<Order_By>;
  lastName?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userRoles_aggregate?: InputMaybe<UserRoles_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  AcceptedInviteAt = 'acceptedInviteAt',
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationToken = 'invitationToken',
  /** column name */
  InvitedBy = 'invitedBy',
  /** column name */
  IsAcceptedInvite = 'isAcceptedInvite',
  /** column name */
  IsAdmin = 'isAdmin',
  /** column name */
  LastName = 'lastName',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  invitationToken?: InputMaybe<Scalars['String']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** Company whitelisted domains. */
export type WhitelistedDomains = {
  __typename?: 'whitelistedDomains';
  /** An object relationship */
  company: Companies;
  companyId: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  domains: Scalars['jsonb'];
  updatedAt: Scalars['timestamptz'];
};


/** Company whitelisted domains. */
export type WhitelistedDomainsDomainsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type WhitelistedDomains_Append_Input = {
  domains?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "whitelistedDomains". All fields are combined with a logical 'AND'. */
export type WhitelistedDomains_Bool_Exp = {
  _and?: InputMaybe<Array<WhitelistedDomains_Bool_Exp>>;
  _not?: InputMaybe<WhitelistedDomains_Bool_Exp>;
  _or?: InputMaybe<Array<WhitelistedDomains_Bool_Exp>>;
  company?: InputMaybe<Companies_Bool_Exp>;
  companyId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  domains?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "whitelistedDomains" */
export enum WhitelistedDomains_Constraint {
  /** unique or primary key constraint on columns "companyId" */
  WhitelistedDomainsPkey = 'whitelistedDomains_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type WhitelistedDomains_Delete_At_Path_Input = {
  domains?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type WhitelistedDomains_Delete_Elem_Input = {
  domains?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type WhitelistedDomains_Delete_Key_Input = {
  domains?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "whitelistedDomains" */
export type WhitelistedDomains_Insert_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  domains?: InputMaybe<Scalars['jsonb']>;
};

/** response of any mutation on the table "whitelistedDomains" */
export type WhitelistedDomains_Mutation_Response = {
  __typename?: 'whitelistedDomains_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<WhitelistedDomains>;
};

/** on_conflict condition type for table "whitelistedDomains" */
export type WhitelistedDomains_On_Conflict = {
  constraint: WhitelistedDomains_Constraint;
  update_columns?: Array<WhitelistedDomains_Update_Column>;
  where?: InputMaybe<WhitelistedDomains_Bool_Exp>;
};

/** Ordering options when selecting data from "whitelistedDomains". */
export type WhitelistedDomains_Order_By = {
  company?: InputMaybe<Companies_Order_By>;
  companyId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  domains?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: whitelistedDomains */
export type WhitelistedDomains_Pk_Columns_Input = {
  companyId: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type WhitelistedDomains_Prepend_Input = {
  domains?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "whitelistedDomains" */
export enum WhitelistedDomains_Select_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Domains = 'domains',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "whitelistedDomains" */
export type WhitelistedDomains_Set_Input = {
  companyId?: InputMaybe<Scalars['uuid']>;
  domains?: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "whitelistedDomains" */
export enum WhitelistedDomains_Update_Column {
  /** column name */
  CompanyId = 'companyId',
  /** column name */
  Domains = 'domains'
}

/** columns and relationships of "workspaceThemes" */
export type WorkspaceThemes = {
  __typename?: 'workspaceThemes';
  /** An object relationship */
  companyWorkspace: CompanyWorkspaces;
  id: Scalars['uuid'];
  /** An object relationship */
  theme: Themes;
  themeId: Scalars['uuid'];
  workspaceId: Scalars['uuid'];
};

/** order by aggregate values of table "workspaceThemes" */
export type WorkspaceThemes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<WorkspaceThemes_Max_Order_By>;
  min?: InputMaybe<WorkspaceThemes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "workspaceThemes" */
export type WorkspaceThemes_Arr_Rel_Insert_Input = {
  data: Array<WorkspaceThemes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<WorkspaceThemes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "workspaceThemes". All fields are combined with a logical 'AND'. */
export type WorkspaceThemes_Bool_Exp = {
  _and?: InputMaybe<Array<WorkspaceThemes_Bool_Exp>>;
  _not?: InputMaybe<WorkspaceThemes_Bool_Exp>;
  _or?: InputMaybe<Array<WorkspaceThemes_Bool_Exp>>;
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  theme?: InputMaybe<Themes_Bool_Exp>;
  themeId?: InputMaybe<Uuid_Comparison_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "workspaceThemes" */
export enum WorkspaceThemes_Constraint {
  /** unique or primary key constraint on columns "id" */
  WorkspaceThemesPkey = 'workspaceThemes_pkey',
  /** unique or primary key constraint on columns "workspaceId" */
  WorkspaceThemesWorkspaceIdKey = 'workspaceThemes_workspaceId_key'
}

/** input type for inserting data into table "workspaceThemes" */
export type WorkspaceThemes_Insert_Input = {
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  theme?: InputMaybe<Themes_Obj_Rel_Insert_Input>;
  themeId?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** order by max() on columns of table "workspaceThemes" */
export type WorkspaceThemes_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  themeId?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "workspaceThemes" */
export type WorkspaceThemes_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  themeId?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "workspaceThemes" */
export type WorkspaceThemes_Mutation_Response = {
  __typename?: 'workspaceThemes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<WorkspaceThemes>;
};

/** input type for inserting object relation for remote table "workspaceThemes" */
export type WorkspaceThemes_Obj_Rel_Insert_Input = {
  data: WorkspaceThemes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<WorkspaceThemes_On_Conflict>;
};

/** on_conflict condition type for table "workspaceThemes" */
export type WorkspaceThemes_On_Conflict = {
  constraint: WorkspaceThemes_Constraint;
  update_columns?: Array<WorkspaceThemes_Update_Column>;
  where?: InputMaybe<WorkspaceThemes_Bool_Exp>;
};

/** Ordering options when selecting data from "workspaceThemes". */
export type WorkspaceThemes_Order_By = {
  companyWorkspace?: InputMaybe<CompanyWorkspaces_Order_By>;
  id?: InputMaybe<Order_By>;
  theme?: InputMaybe<Themes_Order_By>;
  themeId?: InputMaybe<Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: workspaceThemes */
export type WorkspaceThemes_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "workspaceThemes" */
export enum WorkspaceThemes_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ThemeId = 'themeId',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "workspaceThemes" */
export type WorkspaceThemes_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  themeId?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "workspaceThemes" */
export enum WorkspaceThemes_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ThemeId = 'themeId',
  /** column name */
  WorkspaceId = 'workspaceId'
}

export type SaveWorkspaceThemeForAllMutationVariables = Exact<{
  objects?: InputMaybe<Array<WorkspaceThemes_Insert_Input> | WorkspaceThemes_Insert_Input>;
}>;


export type SaveWorkspaceThemeForAllMutation = { __typename?: 'mutation_root', insert_workspaceThemes?: { __typename?: 'workspaceThemes_mutation_response', returning: Array<{ __typename?: 'workspaceThemes', id: any, themeId: any, workspaceId: any, theme: { __typename?: 'themes', cardCustomization: any, cardDescription: any, cardTitle: any, chart: any, companyId: any, dashboard: any, general: any, id: any } }> } | null };

export type AcceptInvitationMutationVariables = Exact<{
  password?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
}>;


export type AcceptInvitationMutation = { __typename?: 'mutation_root', acceptInvitation?: { __typename?: 'AcceptInvitationOutput', error?: string | null, user?: { __typename?: 'SignInOutput', companyId?: string | null, email?: string | null, error?: string | null, firstName?: string | null, id?: string | null, lastName?: string | null, token?: string | null, workspaceId?: string | null, userRoles?: Array<{ __typename?: 'UserRole', id: string, applyOn: string, workspaces: any, companyRole: { __typename?: 'CompanyRole', id: string, name: string, permissions: any } } | null> | null } | null } | null };

export type AddOrganizationMutationVariables = Exact<{
  companyId: Scalars['uuid'];
  tableName: Scalars['String'];
  tablePrimaryKeyColumn: Scalars['String'];
  tableClientNameColumn: Scalars['String'];
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type AddOrganizationMutation = { __typename?: 'mutation_root', insert_organizations_one?: { __typename?: 'organizations', id: any, tableName: string, tablePrimaryKeyColumn: string, tableClientNameColumn: string, workspaceId: any } | null };

export type AddSecretMutationVariables = Exact<{
  name: Scalars['String'];
  value: Scalars['String'];
  companyId: Scalars['uuid'];
}>;


export type AddSecretMutation = { __typename?: 'mutation_root', insert_secrets_one?: { __typename?: 'secrets', id: any } | null };

export type ArchiveExternalMetricMutationVariables = Exact<{
  id: Scalars['uuid'];
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  isArchived: Scalars['Boolean'];
}>;


export type ArchiveExternalMetricMutation = { __typename?: 'mutation_root', update_externalMetrics_by_pk?: { __typename?: 'externalMetrics', id: any, isArchived: boolean, updatedAt: any } | null };

export type AssignUserRolesMutationVariables = Exact<{
  userRoleObjects: Array<UserRoles_Insert_Input> | UserRoles_Insert_Input;
}>;


export type AssignUserRolesMutation = { __typename?: 'mutation_root', insert_userRoles?: { __typename?: 'userRoles_mutation_response', returning: Array<{ __typename?: 'userRoles', id: any, applyOn: string, workspaces: any, companyRole: { __typename?: 'companyRoles', name: string, id: any, permissions: any } }> } | null };

export type CacheIntegrationSchemaMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['String']>;
  companyIntegrationId?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['String']>;
}>;


export type CacheIntegrationSchemaMutation = { __typename?: 'mutation_root', cacheIntegrationSchema?: { __typename?: 'CacheIntegrationSchemaOutput', data: any } | null };

export type ChangePasswordMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type ChangePasswordMutation = { __typename?: 'mutation_root', changePassword?: { __typename?: 'ChangePasswordOutput', token?: string | null, error?: { __typename?: 'Error', message: string } | null } | null };

export type ChangeUsernameMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
}>;


export type ChangeUsernameMutation = { __typename?: 'mutation_root', changeUserName?: { __typename?: 'ChangeUserNameOutput', token?: string | null, error?: { __typename?: 'Error', message: string } | null } | null };

export type DeleteSchemaBasedDataMutationVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type DeleteSchemaBasedDataMutation = { __typename?: 'mutation_root', delete_organizations?: { __typename?: 'organizations_mutation_response', affected_rows: number } | null, delete_companySubsetTables?: { __typename?: 'companySubsetTables_mutation_response', affected_rows: number } | null };

export type CreateApiTokenMutationVariables = Exact<{
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  companyId: Scalars['uuid'];
  scope: Scalars['String'];
  updatedBy: Scalars['uuid'];
  isTest?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateApiTokenMutation = { __typename?: 'mutation_root', insert_apiTokens_one?: { __typename?: 'apiTokens', id: any, name: string, description?: string | null, scope: string, isExpired: boolean, companyId: any, updatedBy?: any | null, createdAt: any, isTest: boolean } | null };

export type CreateCompanyIntegrationMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
  credentials?: InputMaybe<Scalars['jsonb']>;
  integrationId?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  isEncrypted?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  isAuthenticated?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateCompanyIntegrationMutation = { __typename?: 'mutation_root', insert_companyIntegrations_one?: { __typename?: 'companyIntegrations', id: any } | null };

export type CreateCompanyRedisMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['String']>;
  expire?: InputMaybe<Scalars['Int']>;
  host?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['Int']>;
  workspaceId?: InputMaybe<Scalars['String']>;
  isDatabrainCache?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateCompanyRedisMutation = { __typename?: 'mutation_root', createCompanyRedis?: { __typename?: 'CreateCompanyRedisOutput', success?: boolean | null, error?: { __typename?: 'Error', message: string } | null } | null };

export type CreateCompanyRlsFilterMutationVariables = Exact<{
  columnName?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  condition?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  defaultValue?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  tableName?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
}>;


export type CreateCompanyRlsFilterMutation = { __typename?: 'mutation_root', insert_companyRlsFilters_one?: { __typename?: 'companyRlsFilters', id: any } | null };

export type CreateCompanyRolesMutationVariables = Exact<{
  objects: Array<CompanyRoles_Insert_Input> | CompanyRoles_Insert_Input;
}>;


export type CreateCompanyRolesMutation = { __typename?: 'mutation_root', insert_companyRoles?: { __typename?: 'companyRoles_mutation_response', returning: Array<{ __typename?: 'companyRoles', id: any, name: string }> } | null };

export type CreateConnectionMutationVariables = Exact<{
  body?: InputMaybe<Scalars['json']>;
}>;


export type CreateConnectionMutation = { __typename?: 'mutation_root', createConnection?: { __typename?: 'CreateConnectionOutput', data?: any | null } | null };

export type CreateDashboardMutationVariables = Exact<{
  companyId: Scalars['uuid'];
  name: Scalars['String'];
}>;


export type CreateDashboardMutation = { __typename?: 'mutation_root', insert_dashboards_one?: { __typename?: 'dashboards', id: any, name: string } | null };

export type CreateDashboardMetricsMutationVariables = Exact<{
  objects: Array<DashboardMetrics_Insert_Input> | DashboardMetrics_Insert_Input;
}>;


export type CreateDashboardMetricsMutation = { __typename?: 'mutation_root', insert_dashboardMetrics?: { __typename?: 'dashboardMetrics_mutation_response', returning: Array<{ __typename?: 'dashboardMetrics', id: any, dashboardId: any, metricId: any }> } | null };

export type CreateDatasetMutationVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
  dbName?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  databaseName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  destinationId?: InputMaybe<Scalars['String']>;
  lineageData?: InputMaybe<Scalars['jsonb']>;
  modelType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type CreateDatasetMutation = { __typename?: 'mutation_root', insert_dataModels_one?: { __typename?: 'dataModels', companyId: any, createdAt: any, databaseName: string, dbName: string, description: string, id: any, lineageData: any, destinationId: string, modelType: string, name: string, query: string, workspaceId: any } | null };

export type CreateDestinationMutationVariables = Exact<{
  body?: InputMaybe<Scalars['json']>;
}>;


export type CreateDestinationMutation = { __typename?: 'mutation_root', createDestination?: { __typename?: 'CreateDestinationOutput', data?: any | null } | null };

export type CreateExternalDashboardMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
  externalDashboardId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['jsonb']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type CreateExternalDashboardMutation = { __typename?: 'mutation_root', insert_externalDashboards_one?: { __typename?: 'externalDashboards', companyId: any, externalDashboardId: string, id: any, name: string, filters: any, workspaceId: any, layout: any, companyWorkspace: { __typename?: 'companyWorkspaces', companyIntegrations: Array<{ __typename?: 'companyIntegrations', id: any, name: string }> } } | null };

export type CreateExternalDashboardMetricsMutationVariables = Exact<{
  objects?: InputMaybe<Array<ExternalDashboardMetrics_Insert_Input> | ExternalDashboardMetrics_Insert_Input>;
}>;


export type CreateExternalDashboardMetricsMutation = { __typename?: 'mutation_root', insert_externalDashboardMetrics?: { __typename?: 'externalDashboardMetrics_mutation_response', affected_rows: number } | null };

export type CreateExternalDashboardThemeMutationVariables = Exact<{
  companyId: Scalars['uuid'];
  name: Scalars['String'];
  colors: Scalars['jsonb'];
  clients: Array<ExternalDashboardThemeClients_Insert_Input> | ExternalDashboardThemeClients_Insert_Input;
}>;


export type CreateExternalDashboardThemeMutation = { __typename?: 'mutation_root', insert_externalDashboardThemes_one?: { __typename?: 'externalDashboardThemes', id: any, name: string, colors: any, createdAt: any, externalDashboardThemeClients: Array<{ __typename?: 'externalDashboardThemeClients', clientId: string, clientName: string, id: any }> } | null };

export type CreateExternalDatsetMutationVariables = Exact<{
  clientColumn?: InputMaybe<Scalars['String']>;
  columns?: InputMaybe<Scalars['jsonb']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  tableName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type CreateExternalDatsetMutation = { __typename?: 'mutation_root', insert_externalDatasets_one?: { __typename?: 'externalDatasets', id: any } | null };

export type CreateExternalMetricMutationVariables = Exact<{
  chartOptions?: InputMaybe<Scalars['jsonb']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  companyIntegrationId?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
  integrationName?: InputMaybe<Scalars['String']>;
  metricId?: InputMaybe<Scalars['String']>;
  metricQuery?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  outputColumns?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  isLive?: InputMaybe<Scalars['Boolean']>;
  clientId?: InputMaybe<Scalars['String']>;
  isCreatedByClient?: InputMaybe<Scalars['Boolean']>;
  createdBy?: InputMaybe<Scalars['String']>;
  timeGrain?: InputMaybe<Scalars['String']>;
  externalDashboardIds?: InputMaybe<Array<ExternalDashboardMetrics_Insert_Input> | ExternalDashboardMetrics_Insert_Input>;
  selectedGroupBy?: InputMaybe<Scalars['jsonb']>;
  isEnableGroupBy?: InputMaybe<Scalars['Boolean']>;
  groupBy?: InputMaybe<Scalars['jsonb']>;
  joinFields?: InputMaybe<Scalars['json']>;
  rlsConditions?: InputMaybe<Scalars['jsonb']>;
  datasetMetricSettings?: InputMaybe<Scalars['jsonb']>;
  limit?: InputMaybe<Scalars['Int']>;
  drillDownSettings?: InputMaybe<Scalars['jsonb']>;
  dataSecuritySettings?: InputMaybe<Scalars['jsonb']>;
  clickActions?: InputMaybe<Scalars['json']>;
}>;


export type CreateExternalMetricMutation = { __typename?: 'mutation_root', insert_externalMetrics_one?: { __typename?: 'externalMetrics', id: any, drillDownSettings?: any | null, externalDashboardMetrics: Array<{ __typename?: 'externalDashboardMetrics', externalDashboardId: any }> } | null };

export type CreateExternalMetricsMutationVariables = Exact<{
  objects?: InputMaybe<Array<ExternalMetrics_Insert_Input> | ExternalMetrics_Insert_Input>;
}>;


export type CreateExternalMetricsMutation = { __typename?: 'mutation_root', insert_externalMetrics?: { __typename?: 'externalMetrics_mutation_response', returning: Array<{ __typename?: 'externalMetrics', id: any }> } | null };

export type CreateExternalMetricsRlsFiltersMutationVariables = Exact<{
  objects?: InputMaybe<Array<ExternalMetricsRlsFilters_Insert_Input> | ExternalMetricsRlsFilters_Insert_Input>;
}>;


export type CreateExternalMetricsRlsFiltersMutation = { __typename?: 'mutation_root', insert_externalMetricsRlsFilters?: { __typename?: 'externalMetricsRlsFilters_mutation_response', returning: Array<{ __typename?: 'externalMetricsRlsFilters', companyRlsFilterId: any, externalMetricId: any, id: any }> } | null };

export type CreateGuestTokenMutationVariables = Exact<{
  companyId: Scalars['uuid'];
  params: Scalars['jsonb'];
  clientId: Scalars['String'];
  expire?: InputMaybe<Scalars['String']>;
}>;


export type CreateGuestTokenMutation = { __typename?: 'mutation_root', insert_guestTokens_one?: { __typename?: 'guestTokens', id: any, clientId: string, params: any, companyId: any, expire?: string | null } | null };

export type CreateMetricMutationVariables = Exact<{
  actorId?: InputMaybe<Scalars['uuid']>;
  chartOption?: InputMaybe<Scalars['jsonb']>;
  description?: InputMaybe<Scalars['String']>;
  lock?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  publishType?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  trackLineage?: InputMaybe<Scalars['Boolean']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  verify?: InputMaybe<Scalars['Boolean']>;
  dbName?: InputMaybe<Scalars['String']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
  metricQuery?: InputMaybe<Scalars['String']>;
  outputColumns?: InputMaybe<Scalars['String']>;
}>;


export type CreateMetricMutation = { __typename?: 'mutation_root', insert_metrics_one?: { __typename?: 'metrics', actorId: any, chartOption: any, description: string, id: any, name: string, query: string, companyId: any, verify: boolean, updatedAt: any, trackLineage: boolean, publishType: string, lock: boolean, createdAt: any, dbName: string, inputFields?: any | null, metricQuery?: string | null, outputColumns?: string | null } | null };

export type CreateOperationMutationVariables = Exact<{
  body?: InputMaybe<Scalars['json']>;
}>;


export type CreateOperationMutation = { __typename?: 'mutation_root', createOperation?: { __typename?: 'CreateOperationOutput', data?: any | null } | null };

export type CreateSourceMutationVariables = Exact<{
  body?: InputMaybe<Scalars['json']>;
}>;


export type CreateSourceMutation = { __typename?: 'mutation_root', createSource?: { __typename?: 'CreateSourceOutput', data?: any | null } | null };

export type CreateViewDataModelMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  destinationId?: InputMaybe<Scalars['String']>;
  lineageData?: InputMaybe<Scalars['jsonb']>;
  query?: InputMaybe<Scalars['String']>;
  viewName?: InputMaybe<Scalars['String']>;
  dbName?: InputMaybe<Scalars['String']>;
  databaseName?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['String']>;
}>;


export type CreateViewDataModelMutation = { __typename?: 'mutation_root', createViewDataModel?: { __typename?: 'CreateViewDataModelOutput', result?: any | null } | null };

export type CreateViewInDbMutationVariables = Exact<{
  companyIntegrationId?: InputMaybe<Scalars['String']>;
  dbName?: InputMaybe<Scalars['String']>;
  viewName?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
}>;


export type CreateViewInDbMutation = { __typename?: 'mutation_root', createViewInDb?: { __typename?: 'CreateViewInDbOutput', queryResponse?: any | null, status?: string | null } | null };

export type CreateWorkspaceMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type CreateWorkspaceMutation = { __typename?: 'mutation_root', insert_companyWorkspaces_one?: { __typename?: 'companyWorkspaces', id: any, description: string, companyId: any, name: string } | null };

export type DatasetMetricCreationMutationVariables = Exact<{
  cId?: InputMaybe<Scalars['String']>;
  configuration?: InputMaybe<Scalars['json']>;
  id?: InputMaybe<Scalars['String']>;
}>;


export type DatasetMetricCreationMutation = { __typename?: 'mutation_root', datasetMetricCreation?: { __typename?: 'DatasetMetricCreationOutput', data?: Array<any | null> | null, metaData?: any | null, query?: string | null, timeTaken?: number | null, error?: { __typename?: 'Error', message: string } | null } | null };

export type DefinitionsQueryVariables = Exact<{
  definitionType: Scalars['String'];
}>;


export type DefinitionsQuery = { __typename?: 'query_root', definitions?: { __typename?: 'DefinitionsOutput', data?: any | null } | null };

export type DeleteApiTokenMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteApiTokenMutation = { __typename?: 'mutation_root', delete_apiTokens_by_pk?: { __typename?: 'apiTokens', name: string } | null };

export type DeleteCompanyIntegrationMutationVariables = Exact<{
  companyIntegrationId?: InputMaybe<Scalars['uuid']>;
}>;


export type DeleteCompanyIntegrationMutation = { __typename?: 'mutation_root', delete_companyIntegrations_by_pk?: { __typename?: 'companyIntegrations', id: any } | null };

export type DeleteCompanyRoleMutationVariables = Exact<{
  id?: Scalars['uuid'];
}>;


export type DeleteCompanyRoleMutation = { __typename?: 'mutation_root', delete_companyRoles_by_pk?: { __typename?: 'companyRoles', id: any } | null };

export type DeleteDashboardMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteDashboardMutation = { __typename?: 'mutation_root', delete_dashboards_by_pk?: { __typename?: 'dashboards', name: string } | null };

export type DeleteDashboardMetricsMutationVariables = Exact<{
  metricId: Scalars['uuid'];
}>;


export type DeleteDashboardMetricsMutation = { __typename?: 'mutation_root', delete_dashboardMetrics?: { __typename?: 'dashboardMetrics_mutation_response', returning: Array<{ __typename?: 'dashboardMetrics', id: any }> } | null };

export type DeleteDefaultClientMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
}>;


export type DeleteDefaultClientMutation = { __typename?: 'mutation_root', update_externalDashboards?: { __typename?: 'externalDashboards_mutation_response', affected_rows: number } | null };

export type DeleteDestinationMutationVariables = Exact<{
  destinationId?: InputMaybe<Scalars['String']>;
}>;


export type DeleteDestinationMutation = { __typename?: 'mutation_root', deleteDestination?: { __typename?: 'DeleteDestinationOutput', data?: any | null } | null };

export type DeleteExternalDashboardMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type DeleteExternalDashboardMutation = { __typename?: 'mutation_root', delete_externalDashboards_by_pk?: { __typename?: 'externalDashboards', companyId: any, externalDashboardId: string, id: any, name: string } | null };

export type DeleteExternalDashboardThemeMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteExternalDashboardThemeMutation = { __typename?: 'mutation_root', delete_externalDashboardThemes_by_pk?: { __typename?: 'externalDashboardThemes', id: any } | null };

export type DeleteExternalDatasetMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type DeleteExternalDatasetMutation = { __typename?: 'mutation_root', delete_externalDatasets_by_pk?: { __typename?: 'externalDatasets', id: any } | null };

export type DeleteExternalMetricMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteExternalMetricMutation = { __typename?: 'mutation_root', update_externalMetrics_by_pk?: { __typename?: 'externalMetrics', id: any, isMarkedDeleted: boolean, updatedAt: any } | null };

export type DeleteExternalMetricRlsFiltersMutationVariables = Exact<{
  metricId: Scalars['uuid'];
}>;


export type DeleteExternalMetricRlsFiltersMutation = { __typename?: 'mutation_root', delete_externalMetricsRlsFilters?: { __typename?: 'externalMetricsRlsFilters_mutation_response', returning: Array<{ __typename?: 'externalMetricsRlsFilters', id: any }> } | null };

export type DeleteIntegrationBasedDataMutationVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type DeleteIntegrationBasedDataMutation = { __typename?: 'mutation_root', delete_organizations?: { __typename?: 'organizations_mutation_response', affected_rows: number } | null, delete_companySubsetTables?: { __typename?: 'companySubsetTables_mutation_response', affected_rows: number } | null, delete_companyCacheSchemas?: { __typename?: 'companyCacheSchemas_mutation_response', affected_rows: number } | null };

export type DeleteMetricVersionMutationVariables = Exact<{
  id: Scalars['String'];
  version: Scalars['Float'];
}>;


export type DeleteMetricVersionMutation = { __typename?: 'mutation_root', deleteMetricVersion?: { __typename?: 'DeleteMetricVersionOutput', error?: string | null, metricVersion?: { __typename?: 'MetricVersion', id: string, version: number } | null } | null };

export type DeleteMultiExternalDashboardThemeMutationVariables = Exact<{
  ids: Array<Scalars['uuid']> | Scalars['uuid'];
}>;


export type DeleteMultiExternalDashboardThemeMutation = { __typename?: 'mutation_root', delete_externalDashboardThemes?: { __typename?: 'externalDashboardThemes_mutation_response', returning: Array<{ __typename?: 'externalDashboardThemes', id: any }> } | null };

export type DeleteScheduledSettingsMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type DeleteScheduledSettingsMutation = { __typename?: 'mutation_root', delete_sharingSettings_by_pk?: { __typename?: 'sharingSettings', id: any } | null };

export type DeleteSecretMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteSecretMutation = { __typename?: 'mutation_root', delete_secrets_by_pk?: { __typename?: 'secrets', id: any } | null };

export type DeleteSourceMutationVariables = Exact<{
  sourceId?: InputMaybe<Scalars['String']>;
}>;


export type DeleteSourceMutation = { __typename?: 'mutation_root', deleteSource?: { __typename?: 'DeleteSourceOutput', data?: any | null } | null };

export type DeleteThemeMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type DeleteThemeMutation = { __typename?: 'mutation_root', delete_themes_by_pk?: { __typename?: 'themes', cardCustomization: any, chartCustomization?: any | null, cardDescription: any, cardTitle: any, chart: any, companyId: any, dashboard: any, general: any, id: any } | null };

export type DeleteUserMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type DeleteUserMutation = { __typename?: 'mutation_root', delete_users?: { __typename?: 'users_mutation_response', returning: Array<{ __typename?: 'users', id: any }> } | null };

export type DeleteUserRolesMutationVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type DeleteUserRolesMutation = { __typename?: 'mutation_root', delete_userRoles?: { __typename?: 'userRoles_mutation_response', returning: Array<{ __typename?: 'userRoles', id: any }> } | null };

export type EditExternalDashboardMutationVariables = Exact<{
  id?: Scalars['uuid'];
  set: ExternalDashboards_Set_Input;
}>;


export type EditExternalDashboardMutation = { __typename?: 'mutation_root', update_externalDashboards_by_pk?: { __typename?: 'externalDashboards', id: any, name: string, externalDashboardId: string, companyId: any, filters: any, defaultClientId?: string | null, workspaceId: any, layout: any } | null };

export type ExecutePythonMutationVariables = Exact<{
  code: Scalars['String'];
  clientId?: InputMaybe<Scalars['String']>;
  rlsConditions?: InputMaybe<Scalars['json']>;
  isUat?: InputMaybe<Scalars['Boolean']>;
  companyId: Scalars['String'];
}>;


export type ExecutePythonMutation = { __typename?: 'mutation_root', executePython?: { __typename?: 'ExecutePythonOutput', result?: any | null, error?: string | null } | null };

export type ForecastMutationVariables = Exact<{
  inputData?: InputMaybe<Scalars['json']>;
}>;


export type ForecastMutation = { __typename?: 'mutation_root', forecast?: { __typename?: 'ForecastOutput', forecastData?: any | null } | null };

export type ForgetPasswordMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  appUrl?: InputMaybe<Scalars['String']>;
}>;


export type ForgetPasswordMutation = { __typename?: 'mutation_root', forgetPassword?: { __typename?: 'ForgetPasswordOutput', success?: boolean | null, error?: { __typename?: 'Error', message: string } | null } | null };

export type GenerateDatasetMetricsMutationVariables = Exact<{
  userInputs?: InputMaybe<Scalars['json']>;
  integrationName?: InputMaybe<Scalars['String']>;
  integrationId?: InputMaybe<Scalars['String']>;
}>;


export type GenerateDatasetMetricsMutation = { __typename?: 'mutation_root', generateDatasetMetrics?: { __typename?: 'GenerateDatasetMetricsOutput', error?: any | null, query?: string | null, result?: any | null, timeTaken?: number | null, metaData?: any | null } | null };

export type GenerateDrillQueryMutationVariables = Exact<{
  baseQuery?: InputMaybe<Scalars['String']>;
  database?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['json']>;
  drillType?: InputMaybe<Scalars['String']>;
}>;


export type GenerateDrillQueryMutation = { __typename?: 'mutation_root', generateDrillQuery?: { __typename?: 'generateDrillQueryOutput', error?: string | null, modifiedQuery?: string | null } | null };

export type GenerateEmbeddedMeticMutationVariables = Exact<{
  clientId?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['String']>;
  queryPrompt?: InputMaybe<Scalars['String']>;
  timeGrain?: InputMaybe<Scalars['String']>;
}>;


export type GenerateEmbeddedMeticMutation = { __typename?: 'mutation_root', generateEmbeddedMetic?: { __typename?: 'GenerateEmbeddedMeticOutput', query?: string | null, result?: any | null, error?: { __typename?: 'Error', message: string } | null } | null };

export type GenerateExternalMetricQueryMutationVariables = Exact<{
  inputData?: InputMaybe<Scalars['json']>;
}>;


export type GenerateExternalMetricQueryMutation = { __typename?: 'mutation_root', generateExternalMetricQuery?: { __typename?: 'GenerateExternalMetricQueryOutput', query: string } | null };

export type GenerateMetricQueryMutationVariables = Exact<{
  inputData?: InputMaybe<Scalars['json']>;
}>;


export type GenerateMetricQueryMutation = { __typename?: 'mutation_root', generateMetricQuery?: { __typename?: 'GenerateMetricQueryOutput', query: string } | null };

export type GetApiTokensQueryVariables = Exact<{
  companyId: Scalars['uuid'];
}>;


export type GetApiTokensQuery = { __typename?: 'query_root', apiTokens: Array<{ __typename?: 'apiTokens', id: any, companyId: any, name: string, description?: string | null, scope: string, isExpired: boolean, updatedBy?: any | null, createdAt: any, isTest: boolean }> };

export type CompanyIntegrationQueryVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type CompanyIntegrationQuery = { __typename?: 'query_root', companyIntegrations: Array<{ __typename?: 'companyIntegrations', companyId: any, id: any, integrationId: any, name: string }> };

export type CompanyProfileQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type CompanyProfileQuery = { __typename?: 'query_root', companies_by_pk?: { __typename?: 'companies', website: string, name: string } | null };

export type GetCompanyRolesQueryVariables = Exact<{
  companyId?: Scalars['uuid'];
}>;


export type GetCompanyRolesQuery = { __typename?: 'query_root', companyRoles: Array<{ __typename?: 'companyRoles', id: any, name: string, description: string, permissions: any, companyId: any }> };

export type CompanySubsetTableDataMutationVariables = Exact<{
  clientId?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['String']>;
}>;


export type CompanySubsetTableDataMutation = { __typename?: 'mutation_root', companySubsetTableData?: { __typename?: 'companySubsetTableDataOutput', companyIntegrationId?: string | null, dbName?: string | null, error?: { __typename?: 'companySubsetTableDataError', message: string } | null, tableList?: Array<{ __typename?: 'TableList', tableName: string, clientColumn?: string | null, columns?: Array<{ __typename?: 'SubsetColumns', datatype: string, name: string, as: string } | null> | null } | null> | null } | null };

export type CompanyTenancyLevelQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type CompanyTenancyLevelQuery = { __typename?: 'query_root', companies_by_pk?: { __typename?: 'companies', tenancyLevel: string } | null };

export type CompanyWorkspacesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyWorkspacesQuery = { __typename?: 'query_root', getCompanyWorkspaces?: { __typename?: 'GetCompanyWorkspacesOutput', companyWorkspaces?: Array<{ __typename?: 'CompanyWorkspace', companyId: string, description?: string | null, id: string, name: string, tenancyLevel: string, creatorMode?: string | null, companyIntegrations?: Array<{ __typename?: 'CompanyIntegrationData', id: string } | null> | null }> | null } | null };

export type ConnectedCompanyIntegrationQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
  integrationId?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type ConnectedCompanyIntegrationQuery = { __typename?: 'query_root', companyIntegrations: Array<{ __typename?: 'companyIntegrations', companyId: any, id: any, integrationId: any, isEncrypted: boolean, isAuthenticated: boolean, name: any, host: any, role: any, warehouse: any, database: any, schema: any, username: any, port: any, project_id: any, dataset_location: any, dataset_id: any, user: any, cloud_id: any, schemas: any, httpPath: any, serverHostname: any, sshTunnel: any, sshHost: any, sshPort: any, sshUsername: any, sslMode: any, dbName: string }> };

export type ConnectedCompanyIntegrationListQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
}>;


export type ConnectedCompanyIntegrationListQuery = { __typename?: 'query_root', companyIntegrations: Array<{ __typename?: 'companyIntegrations', companyId: any, id: any, integrationId: any, isEncrypted: boolean, isAuthenticated: boolean, workspaceId: any, updatedAt: any, createdAt: any, name: any, host: any, server: any, role: any, warehouse: any, database: any, schema: any, username: any, port: any, project_id: any, dataset_location: any, dataset_id: any, user: any, cloud_id: any, schemas: any, httpPath: any, serverHostname: any, sshTunnel: any, sshHost: any, sshPort: any, sshUsername: any, sslMode: any, dbName: string }> };

export type ConnectedRedisQueryVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type ConnectedRedisQuery = { __typename?: 'query_root', companyRedis_by_pk?: { __typename?: 'companyRedis', expire: number, host: string, id: any, password: string, port: number, isEnabled: boolean, workspaceId: any, isDatabrainCache: boolean } | null };

export type GetConnectionQueryVariables = Exact<{
  connectionId?: InputMaybe<Scalars['String']>;
}>;


export type GetConnectionQuery = { __typename?: 'query_root', getConnection?: { __typename?: 'GetConnectionOutput', data?: any | null } | null };

export type GetConnectionJobsQueryVariables = Exact<{
  connectionId?: InputMaybe<Scalars['String']>;
}>;


export type GetConnectionJobsQuery = { __typename?: 'query_root', getJobs?: { __typename?: 'GetJobsOutput', data?: any | null } | null };

export type GetConnectionsListQueryVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['String']>;
}>;


export type GetConnectionsListQuery = { __typename?: 'query_root', getConnectionsList?: { __typename?: 'GetConnectionsListOutput', data?: any | null } | null };

export type CustomSqlColumnsQueryVariables = Exact<{
  companyIntegrationId?: InputMaybe<Scalars['uuid']>;
}>;


export type CustomSqlColumnsQuery = { __typename?: 'query_root', customSqlColumns: Array<{ __typename?: 'customSqlColumns', companyIntegrationId: any, id: any, sqlColumns: any, tableName: string }> };

export type GetDashboardMetricsQueryVariables = Exact<{
  dashboardId: Scalars['uuid'];
}>;


export type GetDashboardMetricsQuery = { __typename?: 'query_root', dashboardMetrics: Array<{ __typename?: 'dashboardMetrics', id: any, dashboardId: any, width: number, height: number, xAxis: number, yAxis: number, metric: { __typename?: 'metrics', actorId: any, createdAt: any, description: string, id: any, lock: boolean, name: string, publishType: string, query: string, trackLineage: boolean, updatedAt: any, companyId: any, verify: boolean, chartOption: any, dbName: string, inputFields?: any | null, metricQuery?: string | null, outputColumns?: string | null } }> };

export type GetDashboardsQueryVariables = Exact<{
  companyId: Scalars['uuid'];
}>;


export type GetDashboardsQuery = { __typename?: 'query_root', dashboards: Array<{ __typename?: 'dashboards', id: any, name: string }> };

export type DataModelListQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
}>;


export type DataModelListQuery = { __typename?: 'query_root', dataModels: Array<{ __typename?: 'dataModels', companyId: any, createdAt: any, description: string, destinationId: string, id: any, lineageData: any, modelType: string, name: string, query: string }> };

export type GetDataModelQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type GetDataModelQuery = { __typename?: 'query_root', dataModels_by_pk?: { __typename?: 'dataModels', companyId: any, createdAt: any, description: string, destinationId: string, id: any, lineageData: any, modelType: string, name: string, query: string, dbName: string, databaseName: string } | null };

export type DatasetListQueryVariables = Exact<{
  companyIntegrationId?: InputMaybe<Scalars['String']>;
}>;


export type DatasetListQuery = { __typename?: 'query_root', dataModels: Array<{ __typename?: 'dataModels', companyId: any, createdAt: any, databaseName: string, dbName: string, description: string, destinationId: string, id: any, lineageData: any, modelType: string, name: string, query: string, workspaceId: any }> };

export type GetDefaultThemeQueryVariables = Exact<{
  companyId: Scalars['uuid'];
}>;


export type GetDefaultThemeQuery = { __typename?: 'query_root', companies_by_pk?: { __typename?: 'companies', defaultTheme?: any | null } | null };

export type GetDemoConfigQueryVariables = Exact<{
  companyId?: Scalars['uuid'];
}>;


export type GetDemoConfigQuery = { __typename?: 'query_root', demoTheme: Array<{ __typename?: 'demoTheme', id: any, companyId: any, primaryColor?: string | null, dashboardTitle?: string | null, textColor?: string | null, logoUrl?: string | null, navbarColor?: string | null, highlightColor?: string | null, settings?: any | null }> };

export type GetDestinationListQueryVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['String']>;
}>;


export type GetDestinationListQuery = { __typename?: 'query_root', getDestinationList?: { __typename?: 'GetDestinationListOutput', data?: any | null } | null };

export type EmbeddedDashboardMetricsQueryVariables = Exact<{
  where?: InputMaybe<ExternalDashboardMetrics_Bool_Exp>;
}>;


export type EmbeddedDashboardMetricsQuery = { __typename?: 'query_root', externalDashboardMetrics: Array<{ __typename?: 'externalDashboardMetrics', externalMetricId: any, externalDashboardId: any, externalMetric: { __typename?: 'externalMetrics', chartOptions: any, clientId?: string | null, companyId: any, companyIntegrationId: any, createdAt: any, createdBy?: string | null, description: string, id: any, inputFields?: any | null, integrationName: string, isCreatedByClient: boolean, isLive: boolean, metricId: string, metricQuery?: string | null, name: string, outputColumns?: string | null, query: string, timeGrain?: string | null, updatedAt: any, selectedGroupBy: any, isEnableGroupBy: boolean, groupBy: any, rlsConditions: any, companyIntegration: { __typename?: 'companyIntegrations', name: string } } }> };

export type EndUserMetricAccessQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
}>;


export type EndUserMetricAccessQuery = { __typename?: 'query_root', companySubsetTables: Array<{ __typename?: 'companySubsetTables', isAllowMetricCreation: boolean, isAllowMetricDeletion: boolean, isAllowMetricUpdation: boolean, isAllowChangeLayout: boolean }> };

export type GetExternalDashboardClientThemeQueryVariables = Exact<{
  companyId: Scalars['uuid'];
  clientId: Scalars['String'];
}>;


export type GetExternalDashboardClientThemeQuery = { __typename?: 'query_root', externalDashboardThemes: Array<{ __typename?: 'externalDashboardThemes', colors: any, createdAt: any, id: any, name: string }> };

export type GetExternalDashboardIdQueryVariables = Exact<{
  externalDashboardId?: InputMaybe<Scalars['String']>;
}>;


export type GetExternalDashboardIdQuery = { __typename?: 'query_root', externalDashboards: Array<{ __typename?: 'externalDashboards', id: any, filters: any }> };

export type ExternalDashboardListQueryVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type ExternalDashboardListQuery = { __typename?: 'query_root', externalDashboards: Array<{ __typename?: 'externalDashboards', externalDashboardId: string, name: string, id: any, filters: any, defaultClientId?: string | null, layout: any, workspaceId: any, updatedAt: any, externalDashboardMetrics: Array<{ __typename?: 'externalDashboardMetrics', externalMetricId: any, externalMetric: { __typename?: 'externalMetrics', id: any, metricId: string, name: string, updatedAt: any, clientId?: string | null } }> }> };

export type ExternalDashboardMetricListQueryVariables = Exact<{
  externalDashboardId?: InputMaybe<Scalars['uuid']>;
  clientId?: InputMaybe<Scalars['String']>;
}>;


export type ExternalDashboardMetricListQuery = { __typename?: 'query_root', externalDashboardMetrics: Array<{ __typename?: 'externalDashboardMetrics', externalMetric: { __typename?: 'externalMetrics', description: string, id: any, metricId: string, name: string, clickActions: any, datasetMetricSettings?: any | null } }> };

export type ExternalDashboardMetricsQueryVariables = Exact<{
  externalDashboardId?: InputMaybe<Scalars['uuid']>;
  clientId?: InputMaybe<Scalars['String']>;
}>;


export type ExternalDashboardMetricsQuery = { __typename?: 'query_root', externalDashboardMetrics: Array<{ __typename?: 'externalDashboardMetrics', externalMetricId: any, externalDashboardId: any, externalMetric: { __typename?: 'externalMetrics', chartOptions: any, clientId?: string | null, companyId: any, companyIntegrationId: any, createdAt: any, createdBy?: string | null, description: string, id: any, inputFields?: any | null, integrationName: string, isCreatedByClient: boolean, isLive: boolean, metricId: string, metricQuery?: string | null, name: string, outputColumns?: string | null, query: string, resizeAttributes: any, timeGrain?: string | null, updatedAt: any, isEnableGroupBy: boolean, groupBy: any, selectedGroupBy: any, rlsConditions: any, clickActions: any, drillDownSettings?: any | null, limit: number, datasetMetricSettings?: any | null, dataSecuritySettings: any, companyIntegration: { __typename?: 'companyIntegrations', name: string, workspaceId: any } } }> };

export type GetExternalDashboardThemesQueryVariables = Exact<{
  companyId: Scalars['uuid'];
}>;


export type GetExternalDashboardThemesQuery = { __typename?: 'query_root', externalDashboardThemes: Array<{ __typename?: 'externalDashboardThemes', colors: any, createdAt: any, id: any, name: string, externalDashboardThemeClients: Array<{ __typename?: 'externalDashboardThemeClients', id: any, clientId: string, clientName: string }> }> };

export type ExternalDashboardsByCompanyQueryVariables = Exact<{
  companyId: Scalars['uuid'];
}>;


export type ExternalDashboardsByCompanyQuery = { __typename?: 'query_root', externalDashboards: Array<{ __typename?: 'externalDashboards', externalDashboardId: string, name: string, id: any }> };

export type ExternalDatasetQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type ExternalDatasetQuery = { __typename?: 'query_root', externalDatasets_by_pk?: { __typename?: 'externalDatasets', clientColumn: string, columns: any, companyId: any, createdAt: any, id: any, tableName: string, type: string, updatedAt: any, query: string } | null };

export type ExternalDatasetListQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type ExternalDatasetListQuery = { __typename?: 'query_root', externalDatasets: Array<{ __typename?: 'externalDatasets', clientColumn: string, columns: any, companyId: any, createdAt: any, id: any, tableName: string, type: string, updatedAt: any, query: string }> };

export type ExternalMetricQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type ExternalMetricQuery = { __typename?: 'query_root', externalMetrics_by_pk?: { __typename?: 'externalMetrics', chartOptions: any, companyId: any, companyIntegrationId: any, createdAt: any, description: string, id: any, inputFields?: any | null, integrationName: string, metricId: string, metricQuery?: string | null, name: string, outputColumns?: string | null, query: string, updatedAt: any, createdBy?: string | null, isLive: boolean, timeGrain?: string | null, isCreatedByClient: boolean, clientId?: string | null, isEnableGroupBy: boolean, selectedGroupBy: any, groupBy: any, joinFields: any, rlsConditions: any, clickActions: any, datasetMetricSettings?: any | null, drillDownSettings?: any | null, limit: number, dataSecuritySettings: any, currentVersion: any, latestVersion: any, externalDashboardMetrics: Array<{ __typename?: 'externalDashboardMetrics', externalDashboardId: any }> } | null };

export type GetExternalMetricsListQueryVariables = Exact<{
  where?: InputMaybe<ExternalMetrics_Bool_Exp>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type GetExternalMetricsListQuery = { __typename?: 'query_root', externalMetrics: Array<{ __typename?: 'externalMetrics', chartOptions: any, companyId: any, companyIntegrationId: any, createdAt: any, description: string, id: any, inputFields?: any | null, integrationName: string, metricId: string, metricQuery?: string | null, name: string, outputColumns?: string | null, query: string, updatedAt: any, createdBy?: string | null, isLive: boolean, isCreatedByClient: boolean, clientId?: string | null, timeGrain?: string | null, isEnableGroupBy: boolean, selectedGroupBy: any, groupBy: any, rlsConditions: any, limit: number, externalDashboardMetrics: Array<{ __typename?: 'externalDashboardMetrics', externalDashboard: { __typename?: 'externalDashboards', id: any, name: string } }> }> };

export type GuestTokenParamsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type GuestTokenParamsQuery = { __typename?: 'query_root', guestTokens_by_pk?: { __typename?: 'guestTokens', clientId: string, companyId: any, id: any, params: any } | null };

export type GetGuestTokensQueryVariables = Exact<{
  companyId: Scalars['uuid'];
  clientId: Scalars['String'];
}>;


export type GetGuestTokensQuery = { __typename?: 'query_root', guestTokens: Array<{ __typename?: 'guestTokens', id: any, clientId: string, companyId: any, params: any }> };

export type GetIntegrationSpecificationQueryVariables = Exact<{
  integrationId?: InputMaybe<Scalars['uuid']>;
}>;


export type GetIntegrationSpecificationQuery = { __typename?: 'query_root', integrationSpecifications: Array<{ __typename?: 'integrationSpecifications', id: any, integrationId: any, integrationName: string, fields: any }> };

export type IntegrationsListQueryVariables = Exact<{ [key: string]: never; }>;


export type IntegrationsListQuery = { __typename?: 'query_root', integrations: Array<{ __typename?: 'integrations', description: string, icon: string, id: any, name: string }> };

export type GetJobInformationQueryVariables = Exact<{
  jobId?: InputMaybe<Scalars['String']>;
}>;


export type GetJobInformationQuery = { __typename?: 'query_root', getJobInformation?: { __typename?: 'GetJobInformationOutput', data?: any | null } | null };

export type GetLineageDataMutationVariables = Exact<{
  sqlQuery?: InputMaybe<Scalars['String']>;
}>;


export type GetLineageDataMutation = { __typename?: 'mutation_root', getLineageData?: { __typename?: 'GetLineageDataOutput', result?: any | null } | null };

export type GetMetricDashboardsQueryVariables = Exact<{
  metricId: Scalars['uuid'];
}>;


export type GetMetricDashboardsQuery = { __typename?: 'query_root', dashboardMetrics: Array<{ __typename?: 'dashboardMetrics', id: any, metricId: any, xAxis: number, yAxis: number, width: number, height: number, dashboard: { __typename?: 'dashboards', id: any, name: string } }> };

export type GetOnboardingStatusQueryVariables = Exact<{
  companyId: Scalars['uuid'];
}>;


export type GetOnboardingStatusQuery = { __typename?: 'query_root', companies_by_pk?: { __typename?: 'companies', isOnboarded: boolean } | null };

export type GetOrganizationQueryVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type GetOrganizationQuery = { __typename?: 'query_root', organizations: Array<{ __typename?: 'organizations', id: any, tableName: string, tablePrimaryKeyColumn: string, tableClientNameColumn: string }> };

export type GetPreviewTableDataMutationVariables = Exact<{
  dbName?: InputMaybe<Scalars['String']>;
  destinationId?: InputMaybe<Scalars['String']>;
  selectedSchemaList?: InputMaybe<Scalars['json']>;
}>;


export type GetPreviewTableDataMutation = { __typename?: 'mutation_root', getPreviewTableData?: { __typename?: 'GetPreviewTableDataOutput', dataList?: any | null } | null };

export type RawCsvSettingsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type RawCsvSettingsQuery = { __typename?: 'query_root', companyWorkspaces_by_pk?: { __typename?: 'companyWorkspaces', rawCsvSettings: any, id: any } | null };

export type GetSchemaListQueryVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type GetSchemaListQuery = { __typename?: 'query_root', companyCacheSchemas: Array<{ __typename?: 'companyCacheSchemas', companyId: string, schema: any, id: any, workspaceId: any }> };

export type GetSecretsQueryVariables = Exact<{
  companyId: Scalars['uuid'];
}>;


export type GetSecretsQuery = { __typename?: 'query_root', secrets: Array<{ __typename?: 'secrets', id: any, name: string, value: string, companyId: any }> };

export type SharingSettingsQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
}>;


export type SharingSettingsQuery = { __typename?: 'query_root', sharingSettings: Array<{ __typename?: 'sharingSettings', companyId: any, fromAddress: string, host: string, id: any, password: string, port: number, secure: boolean, username: string, replyToAddress: string }> };

export type GetSourceListQueryVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['String']>;
}>;


export type GetSourceListQuery = { __typename?: 'query_root', getSourceList?: { __typename?: 'GetSourceListOutput', data?: Array<any | null> | null } | null };

export type CompanySubsetTableListQueryVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type CompanySubsetTableListQuery = { __typename?: 'query_root', companySubsetTables: Array<{ __typename?: 'companySubsetTables', tableList: any, isAllowMetricCreation: boolean, isAllowMetricDeletion: boolean, isAllowMetricUpdation: boolean, isAllowChangeLayout: boolean, isAllowEmailReports: boolean, workspaceId: any }> };

export type GetThemesQueryVariables = Exact<{
  companyId?: Scalars['uuid'];
}>;


export type GetThemesQuery = { __typename?: 'query_root', themes: Array<{ __typename?: 'themes', id: any, companyId: any, general: any, dashboard: any, cardTitle: any, cardDescription: any, cardCustomization: any, chartCustomization?: any | null, chart: any, workspaceThemes: Array<{ __typename?: 'workspaceThemes', workspaceId: any, themeId: any }> }> };

export type GetUserClientDataQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['String']>;
}>;


export type GetUserClientDataQuery = { __typename?: 'query_root', getUserClientData?: { __typename?: 'GetUserClientDataOutput', data: any } | null };

export type GetUserClientDatabaseQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
}>;


export type GetUserClientDatabaseQuery = { __typename?: 'query_root', companyDatabases_by_pk?: { __typename?: 'companyDatabases', databaseList: any, companyId: any } | null };

export type UserListQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
}>;


export type UserListQuery = { __typename?: 'query_root', companies_by_pk?: { __typename?: 'companies', users: Array<{ __typename?: 'users', firstName: string, lastName: string, id: any, email: string, createdAt: any, invitedBy?: string | null, isAcceptedInvite: boolean, acceptedInviteAt?: any | null, isAdmin: boolean, invitationToken?: string | null, userRoles: Array<{ __typename?: 'userRoles', id: any, workspaces: any, applyOn: string, companyRole: { __typename?: 'companyRoles', id: any, name: string, permissions: any } }> }> } | null };

export type UsersIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type UsersIdQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: any }> };

export type GetWhitelistedDomainsQueryVariables = Exact<{
  companyId: Scalars['uuid'];
}>;


export type GetWhitelistedDomainsQuery = { __typename?: 'query_root', whitelistedDomains_by_pk?: { __typename?: 'whitelistedDomains', companyId: any, domains: any } | null };

export type InviteUserMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  invitedBy?: InputMaybe<Scalars['String']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  appUrl?: InputMaybe<Scalars['String']>;
}>;


export type InviteUserMutation = { __typename?: 'mutation_root', inviteUser?: { __typename?: 'InviteUserOutput', error?: string | null, success?: boolean | null, id?: string | null } | null };

export type ListMetricVersionsQueryVariables = Exact<{
  metricId: Scalars['uuid'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type ListMetricVersionsQuery = { __typename?: 'query_root', metricVersions: Array<{ __typename?: 'metricVersions', id: any, metric: any, metricId: any, version: number, changes?: string | null, createdAt: any, createdBy: string, updatedAt: any, updatedBy: string }> };

export type ManageDashboardMetricsMutationVariables = Exact<{
  dashboardId: Scalars['uuid'];
  metricIds: Array<Scalars['uuid']> | Scalars['uuid'];
}>;


export type ManageDashboardMetricsMutation = { __typename?: 'mutation_root', delete_dashboardMetrics?: { __typename?: 'dashboardMetrics_mutation_response', affected_rows: number } | null };

export type ManageExternalDashboardMetricsMutationVariables = Exact<{
  externalDashboardId?: InputMaybe<Scalars['uuid']>;
  externalMetricIds?: InputMaybe<Array<Scalars['uuid']> | Scalars['uuid']>;
}>;


export type ManageExternalDashboardMetricsMutation = { __typename?: 'mutation_root', delete_externalDashboardMetrics?: { __typename?: 'externalDashboardMetrics_mutation_response', affected_rows: number } | null };

export type MarkDefaultThemeMutationVariables = Exact<{
  companyId: Scalars['uuid'];
  themeId: Scalars['uuid'];
}>;


export type MarkDefaultThemeMutation = { __typename?: 'mutation_root', update_companies_by_pk?: { __typename?: 'companies', defaultTheme?: any | null } | null };

export type MetricsListQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type MetricsListQuery = { __typename?: 'query_root', metrics: Array<{ __typename?: 'metrics', actorId: any, createdAt: any, description: string, id: any, lock: boolean, name: string, publishType: string, query: string, trackLineage: boolean, updatedAt: any, companyId: any, verify: boolean, chartOption: any, dbName: string, inputFields?: any | null, metricQuery?: string | null, outputColumns?: string | null }> };

export type UpdateOnboardStatusMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  isOnboarded?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateOnboardStatusMutation = { __typename?: 'mutation_root', update_companies_by_pk?: { __typename?: 'companies', isOnboarded: boolean } | null };

export type OnboardingWithDemoDatabaseMutationVariables = Exact<{
  companyId: Scalars['String'];
  workspaceId?: InputMaybe<Scalars['String']>;
}>;


export type OnboardingWithDemoDatabaseMutation = { __typename?: 'mutation_root', onboardingWithDemoDatabase?: { __typename?: 'SkipOnboardingOutput', status?: string | null } | null };

export type PreviewTableMutationVariables = Exact<{
  tableName?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  integrationId?: InputMaybe<Scalars['String']>;
  integrationName?: InputMaybe<Scalars['String']>;
}>;


export type PreviewTableMutation = { __typename?: 'mutation_root', previewTable?: { __typename?: 'PreviewTableOutput', data?: { __typename?: 'PreviewTableData', data?: any | null, isError: boolean, name: string } | null, error?: { __typename?: 'PreviewTableError', message: string } | null } | null };

export type PublishExternalMetricMutationVariables = Exact<{
  objects?: InputMaybe<Array<ExternalDashboardMetrics_Insert_Input> | ExternalDashboardMetrics_Insert_Input>;
}>;


export type PublishExternalMetricMutation = { __typename?: 'mutation_root', insert_externalDashboardMetrics?: { __typename?: 'externalDashboardMetrics_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'externalDashboardMetrics', externalMetricId: any }> } | null };

export type QueryExternalMetricQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  globalFilters?: InputMaybe<Scalars['json']>;
  rlsConditions?: InputMaybe<Scalars['json']>;
  tenancyLevel?: InputMaybe<Scalars['String']>;
  filterValues?: InputMaybe<Scalars['json']>;
}>;


export type QueryExternalMetricQuery = { __typename?: 'query_root', externalMetricQuery?: { __typename?: 'ExternalMetricQueryOutput', data?: any | null, timeTaken?: number | null } | null };

export type QueryMetricQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type QueryMetricQuery = { __typename?: 'query_root', queryMetric?: { __typename?: 'QueryMetricOutput', data?: any | null, timeTaken?: number | null } | null };

export type ReInviteUserMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  appUrl?: InputMaybe<Scalars['String']>;
}>;


export type ReInviteUserMutation = { __typename?: 'mutation_root', reInviteUser?: { __typename?: 'InviteUserOutput', error?: string | null, success?: boolean | null } | null };

export type ResetCacheDataMutationVariables = Exact<{
  workspaceId?: InputMaybe<Scalars['String']>;
}>;


export type ResetCacheDataMutation = { __typename?: 'mutation_root', resetCompanyRedisData?: { __typename?: 'ResetCompanyRedisDataOutput', success?: boolean | null, error?: { __typename?: 'Error', message: string } | null } | null };

export type ResetDemoConfigMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ResetDemoConfigMutation = { __typename?: 'mutation_root', delete_demoTheme_by_pk?: { __typename?: 'demoTheme', id: any } | null };

export type ResetPasswordMutationVariables = Exact<{
  password?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
}>;


export type ResetPasswordMutation = { __typename?: 'mutation_root', resetPassword?: { __typename?: 'ResetPasswordOutput', data?: { __typename?: 'ResetPasswordData', companyId?: string | null, email?: string | null, firstName?: string | null, id?: string | null, lastName?: string | null, token?: string | null, workspaceId?: string | null } | null, error?: { __typename?: 'Error', message: string } | null } | null };

export type ResetThemeMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ResetThemeMutation = { __typename?: 'mutation_root', delete_themes_by_pk?: { __typename?: 'themes', id: any } | null };

export type ResizeDashboardMetricMutationVariables = Exact<{
  id: Scalars['uuid'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  xAxis: Scalars['Int'];
  yAxis: Scalars['Int'];
}>;


export type ResizeDashboardMetricMutation = { __typename?: 'mutation_root', update_dashboardMetrics_by_pk?: { __typename?: 'dashboardMetrics', width: number, height: number, xAxis: number, yAxis: number } | null };

export type SaveCompanySubsetMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
  tableList?: InputMaybe<Scalars['jsonb']>;
  isAllowMetricCreation?: InputMaybe<Scalars['Boolean']>;
  isAllowMetricDeletion?: InputMaybe<Scalars['Boolean']>;
  isAllowMetricUpdation?: InputMaybe<Scalars['Boolean']>;
  isAllowChangeLayout?: InputMaybe<Scalars['Boolean']>;
  isAllowEmailReports?: InputMaybe<Scalars['Boolean']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type SaveCompanySubsetMutation = { __typename?: 'mutation_root', insert_companySubsetTables_one?: { __typename?: 'companySubsetTables', companyId: any, id: any, tableList: any } | null };

export type SaveCustomSqlColumnMutationVariables = Exact<{
  companyIntegrationId?: InputMaybe<Scalars['uuid']>;
  sqlColumns?: InputMaybe<Scalars['jsonb']>;
  tableName?: InputMaybe<Scalars['String']>;
}>;


export type SaveCustomSqlColumnMutation = { __typename?: 'mutation_root', insert_customSqlColumns_one?: { __typename?: 'customSqlColumns', companyIntegrationId: any, id: any, sqlColumns: any, tableName: string } | null };

export type SaveDemoConfigMutationVariables = Exact<{
  object: DemoTheme_Insert_Input;
}>;


export type SaveDemoConfigMutation = { __typename?: 'mutation_root', insert_demoTheme_one?: { __typename?: 'demoTheme', id: any, companyId: any, primaryColor?: string | null, dashboardTitle?: string | null, textColor?: string | null, logoUrl?: string | null, navbarColor?: string | null, highlightColor?: string | null, settings?: any | null } | null };

export type SaveOrgDatabaseListMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
  databaseList?: InputMaybe<Scalars['json']>;
}>;


export type SaveOrgDatabaseListMutation = { __typename?: 'mutation_root', insert_companyDatabases?: { __typename?: 'companyDatabases_mutation_response', affected_rows: number } | null };

export type SaveSharingSettingsMutationVariables = Exact<{
  companyId?: InputMaybe<Scalars['uuid']>;
  fromAddress?: InputMaybe<Scalars['String']>;
  host?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['Int']>;
  replyToAddress?: InputMaybe<Scalars['String']>;
  secure?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type SaveSharingSettingsMutation = { __typename?: 'mutation_root', insert_sharingSettings_one?: { __typename?: 'sharingSettings', companyId: any, fromAddress: string, host: string, id: any, password: string, port: number, replyToAddress: string, secure: boolean, username: string } | null };

export type SaveThemeMutationVariables = Exact<{
  object: Themes_Insert_Input;
}>;


export type SaveThemeMutation = { __typename?: 'mutation_root', insert_themes_one?: { __typename?: 'themes', id: any, companyId: any, general: any, dashboard: any, cardTitle: any, cardDescription: any, chart: any, cardCustomization: any, chartCustomization?: any | null } | null };

export type SaveWhitelistedDomainsMutationVariables = Exact<{
  companyId: Scalars['uuid'];
  domains?: InputMaybe<Scalars['jsonb']>;
}>;


export type SaveWhitelistedDomainsMutation = { __typename?: 'mutation_root', insert_whitelistedDomains_one?: { __typename?: 'whitelistedDomains', companyId: any, domains: any } | null };

export type SaveWorkspaceThemeMutationVariables = Exact<{
  themeId?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type SaveWorkspaceThemeMutation = { __typename?: 'mutation_root', insert_workspaceThemes_one?: { __typename?: 'workspaceThemes', id: any, themeId: any, workspaceId: any } | null };

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'mutation_root', signIn?: { __typename?: 'SignInOutput', error?: string | null, token?: string | null, email?: string | null, firstName?: string | null, id?: string | null, lastName?: string | null, companyId?: string | null, userRoles?: Array<{ __typename?: 'UserRole', id: string, workspaces: any, applyOn: string, companyRole: { __typename?: 'CompanyRole', id: string, name: string, permissions: any } } | null> | null } | null };

export type SignUpMutationVariables = Exact<{
  companyName: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'mutation_root', signUp?: { __typename?: 'SignUpOutputRes', token?: string | null, error?: { __typename?: 'SignUpResponse', code: string, message: string } | null, success?: { __typename?: 'SignUpResponse', code: string, message: string } | null } | null };

export type SignUpVerificationMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']>;
}>;


export type SignUpVerificationMutation = { __typename?: 'mutation_root', signUpVerification?: { __typename?: 'SignUpVerificationOutput', companyId?: string | null, companyName?: string | null, email?: string | null, firstName?: string | null, id?: string | null, lastName?: string | null, token?: string | null, workspaceId?: string | null, error?: { __typename?: 'SignUpResponse', code: string, message: string } | null, userRoles?: Array<{ __typename?: 'UserRole', id: string, companyRole: { __typename?: 'CompanyRole', id: string, name: string, permissions: any } } | null> | null } | null };

export type SourceSchemaQueryVariables = Exact<{
  sourceId?: InputMaybe<Scalars['String']>;
}>;


export type SourceSchemaQuery = { __typename?: 'query_root', sourceSchema?: { __typename?: 'SourceSchemaOutput', data?: any | null } | null };

export type SqlQueryMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  dbName?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['json']>;
  disableStringify?: InputMaybe<Scalars['Boolean']>;
}>;


export type SqlQueryMutation = { __typename?: 'mutation_root', sqlQuery?: { __typename?: 'SqlQueryOutput', data?: any | null, timeTaken?: number | null, metaData?: any | null } | null };

export type SyncConnectionMutationVariables = Exact<{
  connectionId?: InputMaybe<Scalars['String']>;
}>;


export type SyncConnectionMutation = { __typename?: 'mutation_root', syncConnection?: { __typename?: 'SyncConnectionOutput', data?: any | null } | null };

export type TestCompanyIntegrationMutationVariables = Exact<{
  credentials?: InputMaybe<Scalars['json']>;
  dbName?: InputMaybe<Scalars['String']>;
}>;


export type TestCompanyIntegrationMutation = { __typename?: 'mutation_root', testIntegration?: { __typename?: 'TestIntegrationOutput', result?: { __typename?: 'Result', message?: string | null, status?: boolean | null } | null } | null };

export type TestDestinationMutationVariables = Exact<{
  body?: InputMaybe<Scalars['json']>;
}>;


export type TestDestinationMutation = { __typename?: 'mutation_root', testDestination?: { __typename?: 'TestDestinationOutput', data?: any | null } | null };

export type TestSmtpSettingsMutationVariables = Exact<{
  host?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['Int']>;
  secure?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type TestSmtpSettingsMutation = { __typename?: 'mutation_root', testSmtpSettings?: { __typename?: 'TestSmtpSettingsOutput', success: boolean } | null };

export type TestSourceMutationVariables = Exact<{
  body?: InputMaybe<Scalars['json']>;
}>;


export type TestSourceMutation = { __typename?: 'mutation_root', testSource?: { __typename?: 'TestSourceOutput', data?: any | null } | null };

export type UnarchiveClientMetricMutationVariables = Exact<{
  id: Scalars['uuid'];
  clientId: Scalars['String'];
}>;


export type UnarchiveClientMetricMutation = { __typename?: 'mutation_root', delete_clientDeletedMetrics?: { __typename?: 'clientDeletedMetrics_mutation_response', returning: Array<{ __typename?: 'clientDeletedMetrics', clientId: string, externalMetricId: any }> } | null };

export type UpdateApiTokenMutationVariables = Exact<{
  id: Scalars['uuid'];
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  scope: Scalars['String'];
  isExpired: Scalars['Boolean'];
  updatedBy: Scalars['uuid'];
}>;


export type UpdateApiTokenMutation = { __typename?: 'mutation_root', update_apiTokens_by_pk?: { __typename?: 'apiTokens', id: any, name: string, description?: string | null, scope: string, isExpired: boolean, companyId: any, createdAt: any, updatedBy?: any | null } | null };

export type UpdateCacheEnableMutationVariables = Exact<{
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  workspaceId?: InputMaybe<Scalars['uuid']>;
}>;


export type UpdateCacheEnableMutation = { __typename?: 'mutation_root', update_companyRedis_by_pk?: { __typename?: 'companyRedis', isEnabled: boolean } | null };

export type UpdateClickActionsMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  clickActions?: InputMaybe<Scalars['json']>;
}>;


export type UpdateClickActionsMutation = { __typename?: 'mutation_root', update_externalMetrics_by_pk?: { __typename?: 'externalMetrics', id: any } | null };

export type UpdateCompanyMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  website?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type UpdateCompanyMutation = { __typename?: 'mutation_root', update_companies_by_pk?: { __typename?: 'companies', website: string, name: string } | null };

export type UpdateCompanyIntegrationCredsMutationVariables = Exact<{
  credentials?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  isEncrypted?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  isAuthenticated?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateCompanyIntegrationCredsMutation = { __typename?: 'mutation_root', update_companyIntegrations_by_pk?: { __typename?: 'companyIntegrations', id: any } | null };

export type UpdateCompanyRoleMutationVariables = Exact<{
  id?: Scalars['uuid'];
  set: CompanyRoles_Set_Input;
}>;


export type UpdateCompanyRoleMutation = { __typename?: 'mutation_root', update_companyRoles_by_pk?: { __typename?: 'companyRoles', id: any } | null };

export type UpdateTenancyLevelMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  tenancyLevel?: InputMaybe<Scalars['String']>;
}>;


export type UpdateTenancyLevelMutation = { __typename?: 'mutation_root', update_companies_by_pk?: { __typename?: 'companies', tenancyLevel: string } | null };

export type UpdateDashboardMutationVariables = Exact<{
  id: Scalars['uuid'];
  name: Scalars['String'];
}>;


export type UpdateDashboardMutation = { __typename?: 'mutation_root', update_dashboards_by_pk?: { __typename?: 'dashboards', name: string } | null };

export type UpdateDashboardMetricsMutationVariables = Exact<{
  metricId: Scalars['uuid'];
  objects: Array<DashboardMetrics_Insert_Input> | DashboardMetrics_Insert_Input;
}>;


export type UpdateDashboardMetricsMutation = { __typename?: 'mutation_root', delete_dashboardMetrics?: { __typename?: 'dashboardMetrics_mutation_response', returning: Array<{ __typename?: 'dashboardMetrics', id: any }> } | null, insert_dashboardMetrics?: { __typename?: 'dashboardMetrics_mutation_response', returning: Array<{ __typename?: 'dashboardMetrics', id: any }> } | null };

export type UpdateDataSecuritySettingsMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  dataSecuritySettings?: InputMaybe<Scalars['jsonb']>;
}>;


export type UpdateDataSecuritySettingsMutation = { __typename?: 'mutation_root', update_externalMetrics_by_pk?: { __typename?: 'externalMetrics', id: any } | null };

export type UpdateDestinationMutationVariables = Exact<{
  body?: InputMaybe<Scalars['json']>;
}>;


export type UpdateDestinationMutation = { __typename?: 'mutation_root', updateDestination?: { __typename?: 'UpdateDestinationOutput', data?: any | null } | null };

export type UpdateDrillDownSettingsMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  drillDownSettings?: InputMaybe<Scalars['jsonb']>;
}>;


export type UpdateDrillDownSettingsMutation = { __typename?: 'mutation_root', update_externalMetrics_by_pk?: { __typename?: 'externalMetrics', id: any } | null };

export type UpdateExternalDashboardFiltersMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  filters?: InputMaybe<Scalars['jsonb']>;
}>;


export type UpdateExternalDashboardFiltersMutation = { __typename?: 'mutation_root', update_externalDashboards_by_pk?: { __typename?: 'externalDashboards', id: any, filters: any, name: string, externalDashboardId: string, companyId: any, defaultClientId?: string | null } | null };

export type UpdateExternalDashboardLayoutMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  layout?: InputMaybe<Scalars['jsonb']>;
}>;


export type UpdateExternalDashboardLayoutMutation = { __typename?: 'mutation_root', update_externalDashboards_by_pk?: { __typename?: 'externalDashboards', layout: any } | null };

export type UpdateExternalDashboardMetricsMutationVariables = Exact<{
  externalMetricId?: InputMaybe<Scalars['uuid']>;
  externalDashboardMetricsObjects?: InputMaybe<Array<ExternalDashboardMetrics_Insert_Input> | ExternalDashboardMetrics_Insert_Input>;
}>;


export type UpdateExternalDashboardMetricsMutation = { __typename?: 'mutation_root', delete_externalDashboardMetrics?: { __typename?: 'externalDashboardMetrics_mutation_response', returning: Array<{ __typename?: 'externalDashboardMetrics', externalDashboardId: any }> } | null, insert_externalDashboardMetrics?: { __typename?: 'externalDashboardMetrics_mutation_response', returning: Array<{ __typename?: 'externalDashboardMetrics', externalDashboardId: any }> } | null };

export type UpdateExternalDashboardThemeMutationVariables = Exact<{
  id: Scalars['uuid'];
  name: Scalars['String'];
  colors: Scalars['jsonb'];
}>;


export type UpdateExternalDashboardThemeMutation = { __typename?: 'mutation_root', update_externalDashboardThemes_by_pk?: { __typename?: 'externalDashboardThemes', id: any, name: string, colors: any } | null };

export type UpdateExternalDashboardThemeClientsMutationVariables = Exact<{
  idsToDelete: Array<Scalars['uuid']> | Scalars['uuid'];
  themeClients: Array<ExternalDashboardThemeClients_Insert_Input> | ExternalDashboardThemeClients_Insert_Input;
}>;


export type UpdateExternalDashboardThemeClientsMutation = { __typename?: 'mutation_root', delete_externalDashboardThemeClients?: { __typename?: 'externalDashboardThemeClients_mutation_response', returning: Array<{ __typename?: 'externalDashboardThemeClients', id: any }> } | null, insert_externalDashboardThemeClients?: { __typename?: 'externalDashboardThemeClients_mutation_response', returning: Array<{ __typename?: 'externalDashboardThemeClients', id: any, clientId: string, clientName: string }> } | null };

export type UpdateDatasetMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  columns?: InputMaybe<Scalars['jsonb']>;
  clientColumn?: InputMaybe<Scalars['String']>;
}>;


export type UpdateDatasetMutation = { __typename?: 'mutation_root', update_externalDatasets_by_pk?: { __typename?: 'externalDatasets', id: any } | null };

export type UpdateExternalMetricMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  set?: InputMaybe<ExternalMetrics_Set_Input>;
}>;


export type UpdateExternalMetricMutation = { __typename?: 'mutation_root', update_externalMetrics_by_pk?: { __typename?: 'externalMetrics', id: any, updatedAt: any, name: string } | null };

export type UpdateExternalMetricRlsFiltersMutationVariables = Exact<{
  metricId: Scalars['uuid'];
  objects: Array<ExternalMetricsRlsFilters_Insert_Input> | ExternalMetricsRlsFilters_Insert_Input;
}>;


export type UpdateExternalMetricRlsFiltersMutation = { __typename?: 'mutation_root', delete_externalMetricsRlsFilters?: { __typename?: 'externalMetricsRlsFilters_mutation_response', returning: Array<{ __typename?: 'externalMetricsRlsFilters', id: any }> } | null, insert_externalMetricsRlsFilters?: { __typename?: 'externalMetricsRlsFilters_mutation_response', returning: Array<{ __typename?: 'externalMetricsRlsFilters', companyRlsFilterId: any, externalMetricId: any, id: any }> } | null };

export type UpdateMetricMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  chartOption?: InputMaybe<Scalars['jsonb']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  publishType?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  companyId?: InputMaybe<Scalars['uuid']>;
  trackLineage?: InputMaybe<Scalars['Boolean']>;
  lock?: InputMaybe<Scalars['Boolean']>;
  verify?: InputMaybe<Scalars['Boolean']>;
  actorId?: InputMaybe<Scalars['uuid']>;
  dbName?: InputMaybe<Scalars['String']>;
  metricQuery?: InputMaybe<Scalars['String']>;
  inputFields?: InputMaybe<Scalars['jsonb']>;
  outputColumns?: InputMaybe<Scalars['String']>;
}>;


export type UpdateMetricMutation = { __typename?: 'mutation_root', update_metrics_by_pk?: { __typename?: 'metrics', id: any, updatedAt: any } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  id: Scalars['uuid'];
  set: Organizations_Set_Input;
}>;


export type UpdateOrganizationMutation = { __typename?: 'mutation_root', update_organizations_by_pk?: { __typename?: 'organizations', id: any, tableName: string, tablePrimaryKeyColumn: string, tableClientNameColumn: string } | null };

export type UpdateRawCsvSettingsMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  rawCsvSettings?: InputMaybe<Scalars['jsonb']>;
}>;


export type UpdateRawCsvSettingsMutation = { __typename?: 'mutation_root', update_companyWorkspaces_by_pk?: { __typename?: 'companyWorkspaces', rawCsvSettings: any, id: any } | null };

export type UpdateSecretMutationVariables = Exact<{
  id: Scalars['uuid'];
  name: Scalars['String'];
  value: Scalars['String'];
}>;


export type UpdateSecretMutation = { __typename?: 'mutation_root', update_secrets_by_pk?: { __typename?: 'secrets', id: any } | null };

export type UpdateSourceMutationVariables = Exact<{
  body?: InputMaybe<Scalars['json']>;
}>;


export type UpdateSourceMutation = { __typename?: 'mutation_root', updateSource?: { __typename?: 'UpdateSourceOutput', data?: any | null } | null };

export type UpdateThemeMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  _set?: InputMaybe<Themes_Set_Input>;
}>;


export type UpdateThemeMutation = { __typename?: 'mutation_root', update_themes_by_pk?: { __typename?: 'themes', cardCustomization: any, chartCustomization?: any | null, cardDescription: any, cardTitle: any, chart: any, companyId: any, dashboard: any, general: any, id: any, workspaceId: any } | null };

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['uuid'];
  isAdmin: Scalars['Boolean'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'mutation_root', update_users_by_pk?: { __typename?: 'users', id: any, firstName: string, lastName: string, isAdmin: boolean } | null };

export type UpdateViewDataModelMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  destinationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['String']>;
  lineageData?: InputMaybe<Scalars['jsonb']>;
  query?: InputMaybe<Scalars['String']>;
  viewName?: InputMaybe<Scalars['String']>;
  dbName?: InputMaybe<Scalars['String']>;
  databaseName?: InputMaybe<Scalars['String']>;
}>;


export type UpdateViewDataModelMutation = { __typename?: 'mutation_root', updateViewDataModel?: { __typename?: 'UpdateViewDataModelOutput', result?: any | null } | null };

export type UpdateWorkspaceMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
  set?: InputMaybe<CompanyWorkspaces_Set_Input>;
}>;


export type UpdateWorkspaceMutation = { __typename?: 'mutation_root', update_companyWorkspaces_by_pk?: { __typename?: 'companyWorkspaces', companyId: any, description: string, id: any, name: string, tenancyLevel: string, creatorMode?: CreatorModeEnums_Enum | null, companyIntegrations: Array<{ __typename?: 'companyIntegrations', id: any }> } | null };

export type UpsertMetricVersionMutationVariables = Exact<{
  metricId: Scalars['uuid'];
  changes: Scalars['String'];
  version: Scalars['Int'];
  metric: Scalars['jsonb'];
  createdBy: Scalars['String'];
  updatedBy: Scalars['String'];
}>;


export type UpsertMetricVersionMutation = { __typename?: 'mutation_root', insert_metricVersions_one?: { __typename?: 'metricVersions', id: any, metricId: any, version: number, changes?: string | null, metric: any, createdAt: any, createdBy: string, updatedAt: any, updatedBy: string } | null };


export const SaveWorkspaceThemeForAllDocument = `
    mutation SaveWorkspaceThemeForAll($objects: [workspaceThemes_insert_input!] = []) {
  insert_workspaceThemes(
    objects: $objects
    on_conflict: {constraint: workspaceThemes_workspaceId_key, update_columns: [themeId]}
  ) {
    returning {
      id
      themeId
      workspaceId
      theme {
        cardCustomization
        cardDescription
        cardTitle
        chart
        companyId
        dashboard
        general
        id
      }
    }
  }
}
    `;
export const useSaveWorkspaceThemeForAllMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveWorkspaceThemeForAllMutation, TError, SaveWorkspaceThemeForAllMutationVariables, TContext>) =>
    useMutation<SaveWorkspaceThemeForAllMutation, TError, SaveWorkspaceThemeForAllMutationVariables, TContext>(
      ['SaveWorkspaceThemeForAll'],
      useFetcher<SaveWorkspaceThemeForAllMutation, SaveWorkspaceThemeForAllMutationVariables>(SaveWorkspaceThemeForAllDocument),
      options
    );
export const AcceptInvitationDocument = `
    mutation AcceptInvitation($password: String = "", $token: String = "") {
  acceptInvitation(input: {password: $password, token: $token}) {
    error
    user {
      companyId
      email
      error
      firstName
      id
      lastName
      token
      workspaceId
      userRoles {
        id
        applyOn
        workspaces
        companyRole {
          id
          name
          permissions
        }
      }
    }
  }
}
    `;
export const useAcceptInvitationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AcceptInvitationMutation, TError, AcceptInvitationMutationVariables, TContext>) =>
    useMutation<AcceptInvitationMutation, TError, AcceptInvitationMutationVariables, TContext>(
      ['AcceptInvitation'],
      useFetcher<AcceptInvitationMutation, AcceptInvitationMutationVariables>(AcceptInvitationDocument),
      options
    );
export const AddOrganizationDocument = `
    mutation AddOrganization($companyId: uuid!, $tableName: String!, $tablePrimaryKeyColumn: String!, $tableClientNameColumn: String!, $workspaceId: uuid = "") {
  insert_organizations_one(
    object: {companyId: $companyId, tableName: $tableName, tablePrimaryKeyColumn: $tablePrimaryKeyColumn, tableClientNameColumn: $tableClientNameColumn, workspaceId: $workspaceId}
    on_conflict: {constraint: organizations_workspaceId_key, update_columns: [tableName, tableClientNameColumn, tablePrimaryKeyColumn]}
  ) {
    id
    tableName
    tablePrimaryKeyColumn
    tableClientNameColumn
    workspaceId
  }
}
    `;
export const useAddOrganizationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddOrganizationMutation, TError, AddOrganizationMutationVariables, TContext>) =>
    useMutation<AddOrganizationMutation, TError, AddOrganizationMutationVariables, TContext>(
      ['AddOrganization'],
      useFetcher<AddOrganizationMutation, AddOrganizationMutationVariables>(AddOrganizationDocument),
      options
    );
export const AddSecretDocument = `
    mutation addSecret($name: String!, $value: String!, $companyId: uuid!) {
  insert_secrets_one(
    object: {name: $name, value: $value, companyId: $companyId}
    on_conflict: {constraint: secrets_name_companyId_key, update_columns: [name, value]}
  ) {
    id
  }
}
    `;
export const useAddSecretMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddSecretMutation, TError, AddSecretMutationVariables, TContext>) =>
    useMutation<AddSecretMutation, TError, AddSecretMutationVariables, TContext>(
      ['addSecret'],
      useFetcher<AddSecretMutation, AddSecretMutationVariables>(AddSecretDocument),
      options
    );
export const ArchiveExternalMetricDocument = `
    mutation ArchiveExternalMetric($id: uuid!, $updatedAt: timestamptz = "now()", $isArchived: Boolean!) {
  update_externalMetrics_by_pk(
    pk_columns: {id: $id}
    _set: {isArchived: $isArchived, updatedAt: $updatedAt}
  ) {
    id
    isArchived
    updatedAt
  }
}
    `;
export const useArchiveExternalMetricMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ArchiveExternalMetricMutation, TError, ArchiveExternalMetricMutationVariables, TContext>) =>
    useMutation<ArchiveExternalMetricMutation, TError, ArchiveExternalMetricMutationVariables, TContext>(
      ['ArchiveExternalMetric'],
      useFetcher<ArchiveExternalMetricMutation, ArchiveExternalMetricMutationVariables>(ArchiveExternalMetricDocument),
      options
    );
export const AssignUserRolesDocument = `
    mutation assignUserRoles($userRoleObjects: [userRoles_insert_input!]!) {
  insert_userRoles(objects: $userRoleObjects) {
    returning {
      id
      applyOn
      workspaces
      companyRole {
        name
        id
        permissions
      }
    }
  }
}
    `;
export const useAssignUserRolesMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AssignUserRolesMutation, TError, AssignUserRolesMutationVariables, TContext>) =>
    useMutation<AssignUserRolesMutation, TError, AssignUserRolesMutationVariables, TContext>(
      ['assignUserRoles'],
      useFetcher<AssignUserRolesMutation, AssignUserRolesMutationVariables>(AssignUserRolesDocument),
      options
    );
export const CacheIntegrationSchemaDocument = `
    mutation CacheIntegrationSchema($companyId: String = "", $companyIntegrationId: String = "", $workspaceId: String = "") {
  cacheIntegrationSchema(
    input: {companyId: $companyId, companyIntegrationId: $companyIntegrationId, workspaceId: $workspaceId}
  ) {
    data
  }
}
    `;
export const useCacheIntegrationSchemaMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CacheIntegrationSchemaMutation, TError, CacheIntegrationSchemaMutationVariables, TContext>) =>
    useMutation<CacheIntegrationSchemaMutation, TError, CacheIntegrationSchemaMutationVariables, TContext>(
      ['CacheIntegrationSchema'],
      useFetcher<CacheIntegrationSchemaMutation, CacheIntegrationSchemaMutationVariables>(CacheIntegrationSchemaDocument),
      options
    );
export const ChangePasswordDocument = `
    mutation ChangePassword($id: String = "", $password: String = "") {
  changePassword(input: {id: $id, password: $password}) {
    token
    error {
      message
    }
  }
}
    `;
export const useChangePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>) =>
    useMutation<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>(
      ['ChangePassword'],
      useFetcher<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument),
      options
    );
export const ChangeUsernameDocument = `
    mutation ChangeUsername($id: String = "", $firstName: String = "", $lastName: String = "") {
  changeUserName(input: {id: $id, firstName: $firstName, lastName: $lastName}) {
    token
    error {
      message
    }
  }
}
    `;
export const useChangeUsernameMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ChangeUsernameMutation, TError, ChangeUsernameMutationVariables, TContext>) =>
    useMutation<ChangeUsernameMutation, TError, ChangeUsernameMutationVariables, TContext>(
      ['ChangeUsername'],
      useFetcher<ChangeUsernameMutation, ChangeUsernameMutationVariables>(ChangeUsernameDocument),
      options
    );
export const DeleteSchemaBasedDataDocument = `
    mutation DeleteSchemaBasedData($workspaceId: uuid = "") {
  delete_organizations(where: {_and: {workspaceId: {_eq: $workspaceId}}}) {
    affected_rows
  }
  delete_companySubsetTables(where: {workspaceId: {_eq: $workspaceId}}) {
    affected_rows
  }
}
    `;
export const useDeleteSchemaBasedDataMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteSchemaBasedDataMutation, TError, DeleteSchemaBasedDataMutationVariables, TContext>) =>
    useMutation<DeleteSchemaBasedDataMutation, TError, DeleteSchemaBasedDataMutationVariables, TContext>(
      ['DeleteSchemaBasedData'],
      useFetcher<DeleteSchemaBasedDataMutation, DeleteSchemaBasedDataMutationVariables>(DeleteSchemaBasedDataDocument),
      options
    );
export const CreateApiTokenDocument = `
    mutation CreateAPIToken($name: String!, $description: String, $companyId: uuid!, $scope: String!, $updatedBy: uuid!, $isTest: Boolean = true) {
  insert_apiTokens_one(
    object: {name: $name, description: $description, companyId: $companyId, scope: $scope, updatedBy: $updatedBy, isTest: $isTest}
  ) {
    id
    name
    description
    scope
    isExpired
    companyId
    updatedBy
    createdAt
    isTest
  }
}
    `;
export const useCreateApiTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateApiTokenMutation, TError, CreateApiTokenMutationVariables, TContext>) =>
    useMutation<CreateApiTokenMutation, TError, CreateApiTokenMutationVariables, TContext>(
      ['CreateAPIToken'],
      useFetcher<CreateApiTokenMutation, CreateApiTokenMutationVariables>(CreateApiTokenDocument),
      options
    );
export const CreateCompanyIntegrationDocument = `
    mutation CreateCompanyIntegration($companyId: uuid = "", $credentials: jsonb = "", $integrationId: uuid = "", $name: String = "", $workspaceId: uuid = "", $createdAt: timestamptz = "now()", $isEncrypted: Boolean = true, $updatedAt: timestamptz = "now()", $isAuthenticated: Boolean = true) {
  insert_companyIntegrations_one(
    object: {companyId: $companyId, credentials: $credentials, integrationId: $integrationId, name: $name, workspaceId: $workspaceId, createdAt: $createdAt, isEncrypted: $isEncrypted, updatedAt: $updatedAt, isAuthenticated: $isAuthenticated}
  ) {
    id
  }
}
    `;
export const useCreateCompanyIntegrationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCompanyIntegrationMutation, TError, CreateCompanyIntegrationMutationVariables, TContext>) =>
    useMutation<CreateCompanyIntegrationMutation, TError, CreateCompanyIntegrationMutationVariables, TContext>(
      ['CreateCompanyIntegration'],
      useFetcher<CreateCompanyIntegrationMutation, CreateCompanyIntegrationMutationVariables>(CreateCompanyIntegrationDocument),
      options
    );
export const CreateCompanyRedisDocument = `
    mutation CreateCompanyRedis($companyId: String = "", $expire: Int = 86400, $host: String = "", $password: String = "", $port: Int = 6379, $workspaceId: String = "", $isDatabrainCache: Boolean = false) {
  createCompanyRedis(
    input: {companyId: $companyId, expire: $expire, host: $host, password: $password, port: $port, workspaceId: $workspaceId, isDatabrainCache: $isDatabrainCache}
  ) {
    success
    error {
      message
    }
  }
}
    `;
export const useCreateCompanyRedisMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCompanyRedisMutation, TError, CreateCompanyRedisMutationVariables, TContext>) =>
    useMutation<CreateCompanyRedisMutation, TError, CreateCompanyRedisMutationVariables, TContext>(
      ['CreateCompanyRedis'],
      useFetcher<CreateCompanyRedisMutation, CreateCompanyRedisMutationVariables>(CreateCompanyRedisDocument),
      options
    );
export const CreateCompanyRlsFilterDocument = `
    mutation createCompanyRlsFilter($columnName: String = "", $companyId: uuid = "", $condition: String = "", $createdAt: timestamptz = "now()", $defaultValue: String = "", $name: String = "", $tableName: String = "", $userId: uuid = "") {
  insert_companyRlsFilters_one(
    object: {columnName: $columnName, companyId: $companyId, condition: $condition, createdAt: $createdAt, defaultValue: $defaultValue, name: $name, tableName: $tableName, userId: $userId}
  ) {
    id
  }
}
    `;
export const useCreateCompanyRlsFilterMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCompanyRlsFilterMutation, TError, CreateCompanyRlsFilterMutationVariables, TContext>) =>
    useMutation<CreateCompanyRlsFilterMutation, TError, CreateCompanyRlsFilterMutationVariables, TContext>(
      ['createCompanyRlsFilter'],
      useFetcher<CreateCompanyRlsFilterMutation, CreateCompanyRlsFilterMutationVariables>(CreateCompanyRlsFilterDocument),
      options
    );
export const CreateCompanyRolesDocument = `
    mutation CreateCompanyRoles($objects: [companyRoles_insert_input!]!) {
  insert_companyRoles(objects: $objects) {
    returning {
      id
      name
    }
  }
}
    `;
export const useCreateCompanyRolesMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCompanyRolesMutation, TError, CreateCompanyRolesMutationVariables, TContext>) =>
    useMutation<CreateCompanyRolesMutation, TError, CreateCompanyRolesMutationVariables, TContext>(
      ['CreateCompanyRoles'],
      useFetcher<CreateCompanyRolesMutation, CreateCompanyRolesMutationVariables>(CreateCompanyRolesDocument),
      options
    );
export const CreateConnectionDocument = `
    mutation CreateConnection($body: json = "") {
  createConnection(input: {body: $body}) {
    data
  }
}
    `;
export const useCreateConnectionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateConnectionMutation, TError, CreateConnectionMutationVariables, TContext>) =>
    useMutation<CreateConnectionMutation, TError, CreateConnectionMutationVariables, TContext>(
      ['CreateConnection'],
      useFetcher<CreateConnectionMutation, CreateConnectionMutationVariables>(CreateConnectionDocument),
      options
    );
export const CreateDashboardDocument = `
    mutation CreateDashboard($companyId: uuid!, $name: String!) {
  insert_dashboards_one(object: {companyId: $companyId, name: $name}) {
    id
    name
  }
}
    `;
export const useCreateDashboardMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateDashboardMutation, TError, CreateDashboardMutationVariables, TContext>) =>
    useMutation<CreateDashboardMutation, TError, CreateDashboardMutationVariables, TContext>(
      ['CreateDashboard'],
      useFetcher<CreateDashboardMutation, CreateDashboardMutationVariables>(CreateDashboardDocument),
      options
    );
export const CreateDashboardMetricsDocument = `
    mutation CreateDashboardMetrics($objects: [dashboardMetrics_insert_input!]!) {
  insert_dashboardMetrics(objects: $objects) {
    returning {
      id
      dashboardId
      metricId
    }
  }
}
    `;
export const useCreateDashboardMetricsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateDashboardMetricsMutation, TError, CreateDashboardMetricsMutationVariables, TContext>) =>
    useMutation<CreateDashboardMetricsMutation, TError, CreateDashboardMetricsMutationVariables, TContext>(
      ['CreateDashboardMetrics'],
      useFetcher<CreateDashboardMetricsMutation, CreateDashboardMetricsMutationVariables>(CreateDashboardMetricsDocument),
      options
    );
export const CreateDatasetDocument = `
    mutation CreateDataset($query: String = "", $dbName: String = "", $companyId: uuid = "", $databaseName: String = "", $description: String = "", $destinationId: String = "", $lineageData: jsonb = "", $modelType: String = "", $name: String = "", $workspaceId: uuid = "") {
  insert_dataModels_one(
    object: {companyId: $companyId, createdAt: "now()", databaseName: $databaseName, dbName: $dbName, description: $description, destinationId: $destinationId, lineageData: $lineageData, modelType: $modelType, name: $name, query: $query, workspaceId: $workspaceId}
  ) {
    companyId
    createdAt
    databaseName
    dbName
    description
    id
    lineageData
    destinationId
    modelType
    name
    query
    workspaceId
  }
}
    `;
export const useCreateDatasetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateDatasetMutation, TError, CreateDatasetMutationVariables, TContext>) =>
    useMutation<CreateDatasetMutation, TError, CreateDatasetMutationVariables, TContext>(
      ['CreateDataset'],
      useFetcher<CreateDatasetMutation, CreateDatasetMutationVariables>(CreateDatasetDocument),
      options
    );
export const CreateDestinationDocument = `
    mutation CreateDestination($body: json = "") {
  createDestination(input: {body: $body}) {
    data
  }
}
    `;
export const useCreateDestinationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateDestinationMutation, TError, CreateDestinationMutationVariables, TContext>) =>
    useMutation<CreateDestinationMutation, TError, CreateDestinationMutationVariables, TContext>(
      ['CreateDestination'],
      useFetcher<CreateDestinationMutation, CreateDestinationMutationVariables>(CreateDestinationDocument),
      options
    );
export const CreateExternalDashboardDocument = `
    mutation CreateExternalDashboard($companyId: uuid = "", $externalDashboardId: String = "", $name: String = "", $filters: jsonb = [], $workspaceId: uuid = "") {
  insert_externalDashboards_one(
    object: {companyId: $companyId, externalDashboardId: $externalDashboardId, name: $name, filters: $filters, workspaceId: $workspaceId}
  ) {
    companyId
    externalDashboardId
    id
    name
    filters
    workspaceId
    layout
    companyWorkspace {
      companyIntegrations {
        id
        name
      }
    }
  }
}
    `;
export const useCreateExternalDashboardMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateExternalDashboardMutation, TError, CreateExternalDashboardMutationVariables, TContext>) =>
    useMutation<CreateExternalDashboardMutation, TError, CreateExternalDashboardMutationVariables, TContext>(
      ['CreateExternalDashboard'],
      useFetcher<CreateExternalDashboardMutation, CreateExternalDashboardMutationVariables>(CreateExternalDashboardDocument),
      options
    );
export const CreateExternalDashboardMetricsDocument = `
    mutation CreateExternalDashboardMetrics($objects: [externalDashboardMetrics_insert_input!] = {externalDashboardId: "", externalMetricId: ""}) {
  insert_externalDashboardMetrics(objects: $objects) {
    affected_rows
  }
}
    `;
export const useCreateExternalDashboardMetricsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateExternalDashboardMetricsMutation, TError, CreateExternalDashboardMetricsMutationVariables, TContext>) =>
    useMutation<CreateExternalDashboardMetricsMutation, TError, CreateExternalDashboardMetricsMutationVariables, TContext>(
      ['CreateExternalDashboardMetrics'],
      useFetcher<CreateExternalDashboardMetricsMutation, CreateExternalDashboardMetricsMutationVariables>(CreateExternalDashboardMetricsDocument),
      options
    );
export const CreateExternalDashboardThemeDocument = `
    mutation CreateExternalDashboardTheme($companyId: uuid!, $name: String!, $colors: jsonb!, $clients: [externalDashboardThemeClients_insert_input!]!) {
  insert_externalDashboardThemes_one(
    object: {colors: $colors, name: $name, companyId: $companyId, externalDashboardThemeClients: {data: $clients}}
  ) {
    id
    name
    colors
    externalDashboardThemeClients {
      clientId
      clientName
      id
    }
    createdAt
  }
}
    `;
export const useCreateExternalDashboardThemeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateExternalDashboardThemeMutation, TError, CreateExternalDashboardThemeMutationVariables, TContext>) =>
    useMutation<CreateExternalDashboardThemeMutation, TError, CreateExternalDashboardThemeMutationVariables, TContext>(
      ['CreateExternalDashboardTheme'],
      useFetcher<CreateExternalDashboardThemeMutation, CreateExternalDashboardThemeMutationVariables>(CreateExternalDashboardThemeDocument),
      options
    );
export const CreateExternalDatsetDocument = `
    mutation CreateExternalDatset($clientColumn: String = "", $columns: jsonb = "", $companyId: uuid = "", $tableName: String = "", $type: String = "", $query: String = "", $workspaceId: uuid = "") {
  insert_externalDatasets_one(
    object: {clientColumn: $clientColumn, columns: $columns, companyId: $companyId, tableName: $tableName, type: $type, query: $query, workpspaceId: $workspaceId}
  ) {
    id
  }
}
    `;
export const useCreateExternalDatsetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateExternalDatsetMutation, TError, CreateExternalDatsetMutationVariables, TContext>) =>
    useMutation<CreateExternalDatsetMutation, TError, CreateExternalDatsetMutationVariables, TContext>(
      ['CreateExternalDatset'],
      useFetcher<CreateExternalDatsetMutation, CreateExternalDatsetMutationVariables>(CreateExternalDatsetDocument),
      options
    );
export const CreateExternalMetricDocument = `
    mutation CreateExternalMetric($chartOptions: jsonb = "", $companyId: uuid = "", $companyIntegrationId: uuid = "", $description: String = "", $inputFields: jsonb = "", $integrationName: String = "", $metricId: String = "", $metricQuery: String = "", $name: String = "", $outputColumns: String = "", $query: String = "", $isLive: Boolean, $clientId: String = "", $isCreatedByClient: Boolean = false, $createdBy: String = "", $timeGrain: String = "", $externalDashboardIds: [externalDashboardMetrics_insert_input!] = {}, $selectedGroupBy: jsonb = [], $isEnableGroupBy: Boolean = false, $groupBy: jsonb = {}, $joinFields: json = [], $rlsConditions: jsonb = [], $datasetMetricSettings: jsonb = "", $limit: Int = 100, $drillDownSettings: jsonb = "", $dataSecuritySettings: jsonb = "", $clickActions: json = "") {
  insert_externalMetrics_one(
    object: {chartOptions: $chartOptions, companyId: $companyId, companyIntegrationId: $companyIntegrationId, description: $description, inputFields: $inputFields, integrationName: $integrationName, metricId: $metricId, metricQuery: $metricQuery, name: $name, outputColumns: $outputColumns, query: $query, isLive: $isLive, clientId: $clientId, isCreatedByClient: $isCreatedByClient, createdBy: $createdBy, timeGrain: $timeGrain, externalDashboardMetrics: {data: $externalDashboardIds}, selectedGroupBy: $selectedGroupBy, isEnableGroupBy: $isEnableGroupBy, groupBy: $groupBy, joinFields: $joinFields, rlsConditions: $rlsConditions, datasetMetricSettings: $datasetMetricSettings, limit: $limit, drillDownSettings: $drillDownSettings, dataSecuritySettings: $dataSecuritySettings, clickActions: $clickActions}
  ) {
    id
    externalDashboardMetrics {
      externalDashboardId
    }
    drillDownSettings
  }
}
    `;
export const useCreateExternalMetricMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateExternalMetricMutation, TError, CreateExternalMetricMutationVariables, TContext>) =>
    useMutation<CreateExternalMetricMutation, TError, CreateExternalMetricMutationVariables, TContext>(
      ['CreateExternalMetric'],
      useFetcher<CreateExternalMetricMutation, CreateExternalMetricMutationVariables>(CreateExternalMetricDocument),
      options
    );
export const CreateExternalMetricsDocument = `
    mutation CreateExternalMetrics($objects: [externalMetrics_insert_input!] = []) {
  insert_externalMetrics(objects: $objects) {
    returning {
      id
    }
  }
}
    `;
export const useCreateExternalMetricsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateExternalMetricsMutation, TError, CreateExternalMetricsMutationVariables, TContext>) =>
    useMutation<CreateExternalMetricsMutation, TError, CreateExternalMetricsMutationVariables, TContext>(
      ['CreateExternalMetrics'],
      useFetcher<CreateExternalMetricsMutation, CreateExternalMetricsMutationVariables>(CreateExternalMetricsDocument),
      options
    );
export const CreateExternalMetricsRlsFiltersDocument = `
    mutation CreateExternalMetricsRlsFilters($objects: [externalMetricsRlsFilters_insert_input!] = {}) {
  insert_externalMetricsRlsFilters(objects: $objects) {
    returning {
      companyRlsFilterId
      externalMetricId
      id
    }
  }
}
    `;
export const useCreateExternalMetricsRlsFiltersMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateExternalMetricsRlsFiltersMutation, TError, CreateExternalMetricsRlsFiltersMutationVariables, TContext>) =>
    useMutation<CreateExternalMetricsRlsFiltersMutation, TError, CreateExternalMetricsRlsFiltersMutationVariables, TContext>(
      ['CreateExternalMetricsRlsFilters'],
      useFetcher<CreateExternalMetricsRlsFiltersMutation, CreateExternalMetricsRlsFiltersMutationVariables>(CreateExternalMetricsRlsFiltersDocument),
      options
    );
export const CreateGuestTokenDocument = `
    mutation CreateGuestToken($companyId: uuid!, $params: jsonb!, $clientId: String!, $expire: String = "") {
  insert_guestTokens_one(
    object: {clientId: $clientId, companyId: $companyId, params: $params, expire: $expire}
  ) {
    id
    clientId
    params
    companyId
    expire
  }
}
    `;
export const useCreateGuestTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateGuestTokenMutation, TError, CreateGuestTokenMutationVariables, TContext>) =>
    useMutation<CreateGuestTokenMutation, TError, CreateGuestTokenMutationVariables, TContext>(
      ['CreateGuestToken'],
      useFetcher<CreateGuestTokenMutation, CreateGuestTokenMutationVariables>(CreateGuestTokenDocument),
      options
    );
export const CreateMetricDocument = `
    mutation CreateMetric($actorId: uuid = "", $chartOption: jsonb = "", $description: String = "", $lock: Boolean = false, $name: String = "", $publishType: String = "", $query: String = "", $trackLineage: Boolean = false, $companyId: uuid = "", $verify: Boolean = false, $dbName: String = "", $inputFields: jsonb = "", $metricQuery: String = "", $outputColumns: String = "") {
  insert_metrics_one(
    object: {actorId: $actorId, chartOption: $chartOption, description: $description, lock: $lock, name: $name, publishType: $publishType, query: $query, trackLineage: $trackLineage, companyId: $companyId, verify: $verify, dbName: $dbName, inputFields: $inputFields, metricQuery: $metricQuery, outputColumns: $outputColumns}
  ) {
    actorId
    chartOption
    description
    id
    name
    query
    companyId
    verify
    updatedAt
    trackLineage
    publishType
    lock
    createdAt
    dbName
    inputFields
    metricQuery
    outputColumns
  }
}
    `;
export const useCreateMetricMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateMetricMutation, TError, CreateMetricMutationVariables, TContext>) =>
    useMutation<CreateMetricMutation, TError, CreateMetricMutationVariables, TContext>(
      ['CreateMetric'],
      useFetcher<CreateMetricMutation, CreateMetricMutationVariables>(CreateMetricDocument),
      options
    );
export const CreateOperationDocument = `
    mutation CreateOperation($body: json = "") {
  createOperation(input: {body: $body}) {
    data
  }
}
    `;
export const useCreateOperationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateOperationMutation, TError, CreateOperationMutationVariables, TContext>) =>
    useMutation<CreateOperationMutation, TError, CreateOperationMutationVariables, TContext>(
      ['CreateOperation'],
      useFetcher<CreateOperationMutation, CreateOperationMutationVariables>(CreateOperationDocument),
      options
    );
export const CreateSourceDocument = `
    mutation CreateSource($body: json = "") {
  createSource(input: {body: $body}) {
    data
  }
}
    `;
export const useCreateSourceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateSourceMutation, TError, CreateSourceMutationVariables, TContext>) =>
    useMutation<CreateSourceMutation, TError, CreateSourceMutationVariables, TContext>(
      ['CreateSource'],
      useFetcher<CreateSourceMutation, CreateSourceMutationVariables>(CreateSourceDocument),
      options
    );
export const CreateViewDataModelDocument = `
    mutation CreateViewDataModel($companyId: String = "", $description: String = "", $destinationId: String = "", $lineageData: jsonb = "", $query: String = "", $viewName: String = "", $dbName: String = "", $databaseName: String = "", $workspaceId: String = "") {
  createViewDataModel(
    input: {companyId: $companyId, destinationId: $destinationId, lineageData: $lineageData, query: $query, viewName: $viewName, description: $description, dbName: $dbName, databaseName: $databaseName, workspaceId: $workspaceId}
  ) {
    result
  }
}
    `;
export const useCreateViewDataModelMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateViewDataModelMutation, TError, CreateViewDataModelMutationVariables, TContext>) =>
    useMutation<CreateViewDataModelMutation, TError, CreateViewDataModelMutationVariables, TContext>(
      ['CreateViewDataModel'],
      useFetcher<CreateViewDataModelMutation, CreateViewDataModelMutationVariables>(CreateViewDataModelDocument),
      options
    );
export const CreateViewInDbDocument = `
    mutation CreateViewInDb($companyIntegrationId: String = "", $dbName: String = "", $viewName: String = "", $query: String = "") {
  createViewInDb(
    input: {companyIntegrationId: $companyIntegrationId, dbName: $dbName, viewName: $viewName, query: $query}
  ) {
    queryResponse
    status
  }
}
    `;
export const useCreateViewInDbMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateViewInDbMutation, TError, CreateViewInDbMutationVariables, TContext>) =>
    useMutation<CreateViewInDbMutation, TError, CreateViewInDbMutationVariables, TContext>(
      ['CreateViewInDb'],
      useFetcher<CreateViewInDbMutation, CreateViewInDbMutationVariables>(CreateViewInDbDocument),
      options
    );
export const CreateWorkspaceDocument = `
    mutation CreateWorkspace($companyId: uuid = "", $description: String = "", $name: String = "") {
  insert_companyWorkspaces_one(
    object: {companyId: $companyId, description: $description, name: $name}
  ) {
    id
    description
    companyId
    name
  }
}
    `;
export const useCreateWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateWorkspaceMutation, TError, CreateWorkspaceMutationVariables, TContext>) =>
    useMutation<CreateWorkspaceMutation, TError, CreateWorkspaceMutationVariables, TContext>(
      ['CreateWorkspace'],
      useFetcher<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(CreateWorkspaceDocument),
      options
    );
export const DatasetMetricCreationDocument = `
    mutation DatasetMetricCreation($cId: String = "", $configuration: json = "", $id: String = "") {
  datasetMetricCreation(
    input: {configuration: $configuration, id: $id, cId: $cId}
  ) {
    data
    error {
      message
    }
    metaData
    query
    timeTaken
  }
}
    `;
export const useDatasetMetricCreationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DatasetMetricCreationMutation, TError, DatasetMetricCreationMutationVariables, TContext>) =>
    useMutation<DatasetMetricCreationMutation, TError, DatasetMetricCreationMutationVariables, TContext>(
      ['DatasetMetricCreation'],
      useFetcher<DatasetMetricCreationMutation, DatasetMetricCreationMutationVariables>(DatasetMetricCreationDocument),
      options
    );
export const DefinitionsDocument = `
    query Definitions($definitionType: String!) {
  definitions(input: {definitionType: $definitionType}) {
    data
  }
}
    `;
export const useDefinitionsQuery = <
      TData = DefinitionsQuery,
      TError = unknown
    >(
      variables: DefinitionsQueryVariables,
      options?: UseQueryOptions<DefinitionsQuery, TError, TData>
    ) =>
    useQuery<DefinitionsQuery, TError, TData>(
      ['Definitions', variables],
      useFetcher<DefinitionsQuery, DefinitionsQueryVariables>(DefinitionsDocument).bind(null, variables),
      options
    );
export const DeleteApiTokenDocument = `
    mutation DeleteAPIToken($id: uuid!) {
  delete_apiTokens_by_pk(id: $id) {
    name
  }
}
    `;
export const useDeleteApiTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteApiTokenMutation, TError, DeleteApiTokenMutationVariables, TContext>) =>
    useMutation<DeleteApiTokenMutation, TError, DeleteApiTokenMutationVariables, TContext>(
      ['DeleteAPIToken'],
      useFetcher<DeleteApiTokenMutation, DeleteApiTokenMutationVariables>(DeleteApiTokenDocument),
      options
    );
export const DeleteCompanyIntegrationDocument = `
    mutation DeleteCompanyIntegration($companyIntegrationId: uuid = "") {
  delete_companyIntegrations_by_pk(id: $companyIntegrationId) {
    id
  }
}
    `;
export const useDeleteCompanyIntegrationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteCompanyIntegrationMutation, TError, DeleteCompanyIntegrationMutationVariables, TContext>) =>
    useMutation<DeleteCompanyIntegrationMutation, TError, DeleteCompanyIntegrationMutationVariables, TContext>(
      ['DeleteCompanyIntegration'],
      useFetcher<DeleteCompanyIntegrationMutation, DeleteCompanyIntegrationMutationVariables>(DeleteCompanyIntegrationDocument),
      options
    );
export const DeleteCompanyRoleDocument = `
    mutation DeleteCompanyRole($id: uuid! = "") {
  delete_companyRoles_by_pk(id: $id) {
    id
  }
}
    `;
export const useDeleteCompanyRoleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteCompanyRoleMutation, TError, DeleteCompanyRoleMutationVariables, TContext>) =>
    useMutation<DeleteCompanyRoleMutation, TError, DeleteCompanyRoleMutationVariables, TContext>(
      ['DeleteCompanyRole'],
      useFetcher<DeleteCompanyRoleMutation, DeleteCompanyRoleMutationVariables>(DeleteCompanyRoleDocument),
      options
    );
export const DeleteDashboardDocument = `
    mutation DeleteDashboard($id: uuid!) {
  delete_dashboards_by_pk(id: $id) {
    name
  }
}
    `;
export const useDeleteDashboardMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteDashboardMutation, TError, DeleteDashboardMutationVariables, TContext>) =>
    useMutation<DeleteDashboardMutation, TError, DeleteDashboardMutationVariables, TContext>(
      ['DeleteDashboard'],
      useFetcher<DeleteDashboardMutation, DeleteDashboardMutationVariables>(DeleteDashboardDocument),
      options
    );
export const DeleteDashboardMetricsDocument = `
    mutation DeleteDashboardMetrics($metricId: uuid!) {
  delete_dashboardMetrics(where: {metricId: {_eq: $metricId}}) {
    returning {
      id
    }
  }
}
    `;
export const useDeleteDashboardMetricsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteDashboardMetricsMutation, TError, DeleteDashboardMetricsMutationVariables, TContext>) =>
    useMutation<DeleteDashboardMetricsMutation, TError, DeleteDashboardMetricsMutationVariables, TContext>(
      ['DeleteDashboardMetrics'],
      useFetcher<DeleteDashboardMetricsMutation, DeleteDashboardMetricsMutationVariables>(DeleteDashboardMetricsDocument),
      options
    );
export const DeleteDefaultClientDocument = `
    mutation DeleteDefaultClient($companyId: uuid = "") {
  update_externalDashboards(
    where: {companyId: {_eq: $companyId}}
    _set: {defaultClientId: ""}
  ) {
    affected_rows
  }
}
    `;
export const useDeleteDefaultClientMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteDefaultClientMutation, TError, DeleteDefaultClientMutationVariables, TContext>) =>
    useMutation<DeleteDefaultClientMutation, TError, DeleteDefaultClientMutationVariables, TContext>(
      ['DeleteDefaultClient'],
      useFetcher<DeleteDefaultClientMutation, DeleteDefaultClientMutationVariables>(DeleteDefaultClientDocument),
      options
    );
export const DeleteDestinationDocument = `
    mutation DeleteDestination($destinationId: String = "") {
  deleteDestination(input: {destinationId: $destinationId}) {
    data
  }
}
    `;
export const useDeleteDestinationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteDestinationMutation, TError, DeleteDestinationMutationVariables, TContext>) =>
    useMutation<DeleteDestinationMutation, TError, DeleteDestinationMutationVariables, TContext>(
      ['DeleteDestination'],
      useFetcher<DeleteDestinationMutation, DeleteDestinationMutationVariables>(DeleteDestinationDocument),
      options
    );
export const DeleteExternalDashboardDocument = `
    mutation DeleteExternalDashboard($id: uuid = "") {
  delete_externalDashboards_by_pk(id: $id) {
    companyId
    externalDashboardId
    id
    name
  }
}
    `;
export const useDeleteExternalDashboardMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteExternalDashboardMutation, TError, DeleteExternalDashboardMutationVariables, TContext>) =>
    useMutation<DeleteExternalDashboardMutation, TError, DeleteExternalDashboardMutationVariables, TContext>(
      ['DeleteExternalDashboard'],
      useFetcher<DeleteExternalDashboardMutation, DeleteExternalDashboardMutationVariables>(DeleteExternalDashboardDocument),
      options
    );
export const DeleteExternalDashboardThemeDocument = `
    mutation DeleteExternalDashboardTheme($id: uuid!) {
  delete_externalDashboardThemes_by_pk(id: $id) {
    id
  }
}
    `;
export const useDeleteExternalDashboardThemeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteExternalDashboardThemeMutation, TError, DeleteExternalDashboardThemeMutationVariables, TContext>) =>
    useMutation<DeleteExternalDashboardThemeMutation, TError, DeleteExternalDashboardThemeMutationVariables, TContext>(
      ['DeleteExternalDashboardTheme'],
      useFetcher<DeleteExternalDashboardThemeMutation, DeleteExternalDashboardThemeMutationVariables>(DeleteExternalDashboardThemeDocument),
      options
    );
export const DeleteExternalDatasetDocument = `
    mutation DeleteExternalDataset($id: uuid = "") {
  delete_externalDatasets_by_pk(id: $id) {
    id
  }
}
    `;
export const useDeleteExternalDatasetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteExternalDatasetMutation, TError, DeleteExternalDatasetMutationVariables, TContext>) =>
    useMutation<DeleteExternalDatasetMutation, TError, DeleteExternalDatasetMutationVariables, TContext>(
      ['DeleteExternalDataset'],
      useFetcher<DeleteExternalDatasetMutation, DeleteExternalDatasetMutationVariables>(DeleteExternalDatasetDocument),
      options
    );
export const DeleteExternalMetricDocument = `
    mutation DeleteExternalMetric($id: uuid!) {
  update_externalMetrics_by_pk(
    pk_columns: {id: $id}
    _set: {isMarkedDeleted: true, updatedAt: "now()"}
  ) {
    id
    isMarkedDeleted
    updatedAt
  }
}
    `;
export const useDeleteExternalMetricMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteExternalMetricMutation, TError, DeleteExternalMetricMutationVariables, TContext>) =>
    useMutation<DeleteExternalMetricMutation, TError, DeleteExternalMetricMutationVariables, TContext>(
      ['DeleteExternalMetric'],
      useFetcher<DeleteExternalMetricMutation, DeleteExternalMetricMutationVariables>(DeleteExternalMetricDocument),
      options
    );
export const DeleteExternalMetricRlsFiltersDocument = `
    mutation DeleteExternalMetricRlsFilters($metricId: uuid!) {
  delete_externalMetricsRlsFilters(where: {externalMetricId: {_eq: $metricId}}) {
    returning {
      id
    }
  }
}
    `;
export const useDeleteExternalMetricRlsFiltersMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteExternalMetricRlsFiltersMutation, TError, DeleteExternalMetricRlsFiltersMutationVariables, TContext>) =>
    useMutation<DeleteExternalMetricRlsFiltersMutation, TError, DeleteExternalMetricRlsFiltersMutationVariables, TContext>(
      ['DeleteExternalMetricRlsFilters'],
      useFetcher<DeleteExternalMetricRlsFiltersMutation, DeleteExternalMetricRlsFiltersMutationVariables>(DeleteExternalMetricRlsFiltersDocument),
      options
    );
export const DeleteIntegrationBasedDataDocument = `
    mutation DeleteIntegrationBasedData($workspaceId: uuid = "") {
  delete_organizations(where: {_and: {workspaceId: {_eq: $workspaceId}}}) {
    affected_rows
  }
  delete_companySubsetTables(where: {workspaceId: {_eq: $workspaceId}}) {
    affected_rows
  }
  delete_companyCacheSchemas(where: {workspaceId: {_eq: $workspaceId}}) {
    affected_rows
  }
}
    `;
export const useDeleteIntegrationBasedDataMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteIntegrationBasedDataMutation, TError, DeleteIntegrationBasedDataMutationVariables, TContext>) =>
    useMutation<DeleteIntegrationBasedDataMutation, TError, DeleteIntegrationBasedDataMutationVariables, TContext>(
      ['DeleteIntegrationBasedData'],
      useFetcher<DeleteIntegrationBasedDataMutation, DeleteIntegrationBasedDataMutationVariables>(DeleteIntegrationBasedDataDocument),
      options
    );
export const DeleteMetricVersionDocument = `
    mutation deleteMetricVersion($id: String!, $version: Float!) {
  deleteMetricVersion(input: {id: $id, version: $version}) {
    metricVersion {
      id
      version
    }
    error
  }
}
    `;
export const useDeleteMetricVersionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteMetricVersionMutation, TError, DeleteMetricVersionMutationVariables, TContext>) =>
    useMutation<DeleteMetricVersionMutation, TError, DeleteMetricVersionMutationVariables, TContext>(
      ['deleteMetricVersion'],
      useFetcher<DeleteMetricVersionMutation, DeleteMetricVersionMutationVariables>(DeleteMetricVersionDocument),
      options
    );
export const DeleteMultiExternalDashboardThemeDocument = `
    mutation DeleteMultiExternalDashboardTheme($ids: [uuid!]!) {
  delete_externalDashboardThemes(where: {id: {_in: $ids}}) {
    returning {
      id
    }
  }
}
    `;
export const useDeleteMultiExternalDashboardThemeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteMultiExternalDashboardThemeMutation, TError, DeleteMultiExternalDashboardThemeMutationVariables, TContext>) =>
    useMutation<DeleteMultiExternalDashboardThemeMutation, TError, DeleteMultiExternalDashboardThemeMutationVariables, TContext>(
      ['DeleteMultiExternalDashboardTheme'],
      useFetcher<DeleteMultiExternalDashboardThemeMutation, DeleteMultiExternalDashboardThemeMutationVariables>(DeleteMultiExternalDashboardThemeDocument),
      options
    );
export const DeleteScheduledSettingsDocument = `
    mutation DeleteScheduledSettings($id: uuid = "") {
  delete_sharingSettings_by_pk(id: $id) {
    id
  }
}
    `;
export const useDeleteScheduledSettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteScheduledSettingsMutation, TError, DeleteScheduledSettingsMutationVariables, TContext>) =>
    useMutation<DeleteScheduledSettingsMutation, TError, DeleteScheduledSettingsMutationVariables, TContext>(
      ['DeleteScheduledSettings'],
      useFetcher<DeleteScheduledSettingsMutation, DeleteScheduledSettingsMutationVariables>(DeleteScheduledSettingsDocument),
      options
    );
export const DeleteSecretDocument = `
    mutation deleteSecret($id: uuid!) {
  delete_secrets_by_pk(id: $id) {
    id
  }
}
    `;
export const useDeleteSecretMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteSecretMutation, TError, DeleteSecretMutationVariables, TContext>) =>
    useMutation<DeleteSecretMutation, TError, DeleteSecretMutationVariables, TContext>(
      ['deleteSecret'],
      useFetcher<DeleteSecretMutation, DeleteSecretMutationVariables>(DeleteSecretDocument),
      options
    );
export const DeleteSourceDocument = `
    mutation DeleteSource($sourceId: String = "") {
  deleteSource(input: {sourceId: $sourceId}) {
    data
  }
}
    `;
export const useDeleteSourceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteSourceMutation, TError, DeleteSourceMutationVariables, TContext>) =>
    useMutation<DeleteSourceMutation, TError, DeleteSourceMutationVariables, TContext>(
      ['DeleteSource'],
      useFetcher<DeleteSourceMutation, DeleteSourceMutationVariables>(DeleteSourceDocument),
      options
    );
export const DeleteThemeDocument = `
    mutation DeleteTheme($id: uuid = "") {
  delete_themes_by_pk(id: $id) {
    cardCustomization
    chartCustomization
    cardDescription
    cardTitle
    chart
    companyId
    dashboard
    general
    id
  }
}
    `;
export const useDeleteThemeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteThemeMutation, TError, DeleteThemeMutationVariables, TContext>) =>
    useMutation<DeleteThemeMutation, TError, DeleteThemeMutationVariables, TContext>(
      ['DeleteTheme'],
      useFetcher<DeleteThemeMutation, DeleteThemeMutationVariables>(DeleteThemeDocument),
      options
    );
export const DeleteUserDocument = `
    mutation DeleteUser($id: uuid = "") {
  delete_users(where: {id: {_eq: $id}, invitedBy: {_is_null: false}}) {
    returning {
      id
    }
  }
}
    `;
export const useDeleteUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>) =>
    useMutation<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>(
      ['DeleteUser'],
      useFetcher<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument),
      options
    );
export const DeleteUserRolesDocument = `
    mutation deleteUserRoles($userId: uuid!) {
  delete_userRoles(where: {userId: {_eq: $userId}}) {
    returning {
      id
    }
  }
}
    `;
export const useDeleteUserRolesMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteUserRolesMutation, TError, DeleteUserRolesMutationVariables, TContext>) =>
    useMutation<DeleteUserRolesMutation, TError, DeleteUserRolesMutationVariables, TContext>(
      ['deleteUserRoles'],
      useFetcher<DeleteUserRolesMutation, DeleteUserRolesMutationVariables>(DeleteUserRolesDocument),
      options
    );
export const EditExternalDashboardDocument = `
    mutation EditExternalDashboard($id: uuid! = "", $set: externalDashboards_set_input!) {
  update_externalDashboards_by_pk(pk_columns: {id: $id}, _set: $set) {
    id
    name
    externalDashboardId
    companyId
    filters
    defaultClientId
    workspaceId
    layout
  }
}
    `;
export const useEditExternalDashboardMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<EditExternalDashboardMutation, TError, EditExternalDashboardMutationVariables, TContext>) =>
    useMutation<EditExternalDashboardMutation, TError, EditExternalDashboardMutationVariables, TContext>(
      ['EditExternalDashboard'],
      useFetcher<EditExternalDashboardMutation, EditExternalDashboardMutationVariables>(EditExternalDashboardDocument),
      options
    );
export const ExecutePythonDocument = `
    mutation ExecutePython($code: String!, $clientId: String, $rlsConditions: json, $isUat: Boolean, $companyId: String!) {
  executePython(
    input: {code: $code, clientId: $clientId, metricFilters: $rlsConditions, companyId: $companyId, isUat: $isUat}
  ) {
    result
    error
  }
}
    `;
export const useExecutePythonMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ExecutePythonMutation, TError, ExecutePythonMutationVariables, TContext>) =>
    useMutation<ExecutePythonMutation, TError, ExecutePythonMutationVariables, TContext>(
      ['ExecutePython'],
      useFetcher<ExecutePythonMutation, ExecutePythonMutationVariables>(ExecutePythonDocument),
      options
    );
export const ForecastDocument = `
    mutation Forecast($inputData: json = "") {
  forecast(input: {inputData: $inputData}) {
    forecastData
  }
}
    `;
export const useForecastMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ForecastMutation, TError, ForecastMutationVariables, TContext>) =>
    useMutation<ForecastMutation, TError, ForecastMutationVariables, TContext>(
      ['Forecast'],
      useFetcher<ForecastMutation, ForecastMutationVariables>(ForecastDocument),
      options
    );
export const ForgetPasswordDocument = `
    mutation ForgetPassword($email: String = "", $appUrl: String = "") {
  forgetPassword(input: {email: $email, appUrl: $appUrl}) {
    success
    error {
      message
    }
  }
}
    `;
export const useForgetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ForgetPasswordMutation, TError, ForgetPasswordMutationVariables, TContext>) =>
    useMutation<ForgetPasswordMutation, TError, ForgetPasswordMutationVariables, TContext>(
      ['ForgetPassword'],
      useFetcher<ForgetPasswordMutation, ForgetPasswordMutationVariables>(ForgetPasswordDocument),
      options
    );
export const GenerateDatasetMetricsDocument = `
    mutation GenerateDatasetMetrics($userInputs: json = "", $integrationName: String = "", $integrationId: String = "") {
  generateDatasetMetrics(
    input: {userInputs: $userInputs, integrationName: $integrationName, integrationId: $integrationId}
  ) {
    error
    query
    result
    timeTaken
    metaData
  }
}
    `;
export const useGenerateDatasetMetricsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GenerateDatasetMetricsMutation, TError, GenerateDatasetMetricsMutationVariables, TContext>) =>
    useMutation<GenerateDatasetMetricsMutation, TError, GenerateDatasetMetricsMutationVariables, TContext>(
      ['GenerateDatasetMetrics'],
      useFetcher<GenerateDatasetMetricsMutation, GenerateDatasetMetricsMutationVariables>(GenerateDatasetMetricsDocument),
      options
    );
export const GenerateDrillQueryDocument = `
    mutation GenerateDrillQuery($baseQuery: String = "", $database: String = "", $filters: json = "", $drillType: String = "") {
  generateDrillQuery(
    input: {database: $database, filters: $filters, baseQuery: $baseQuery, drillType: $drillType}
  ) {
    error
    modifiedQuery
  }
}
    `;
export const useGenerateDrillQueryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GenerateDrillQueryMutation, TError, GenerateDrillQueryMutationVariables, TContext>) =>
    useMutation<GenerateDrillQueryMutation, TError, GenerateDrillQueryMutationVariables, TContext>(
      ['GenerateDrillQuery'],
      useFetcher<GenerateDrillQueryMutation, GenerateDrillQueryMutationVariables>(GenerateDrillQueryDocument),
      options
    );
export const GenerateEmbeddedMeticDocument = `
    mutation GenerateEmbeddedMetic($clientId: String = "", $companyId: String = "", $queryPrompt: String = "", $timeGrain: String = "") {
  generateEmbeddedMetic(
    input: {clientId: $clientId, companyId: $companyId, queryPrompt: $queryPrompt, timeGrain: $timeGrain}
  ) {
    query
    result
    error {
      message
    }
  }
}
    `;
export const useGenerateEmbeddedMeticMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GenerateEmbeddedMeticMutation, TError, GenerateEmbeddedMeticMutationVariables, TContext>) =>
    useMutation<GenerateEmbeddedMeticMutation, TError, GenerateEmbeddedMeticMutationVariables, TContext>(
      ['GenerateEmbeddedMetic'],
      useFetcher<GenerateEmbeddedMeticMutation, GenerateEmbeddedMeticMutationVariables>(GenerateEmbeddedMeticDocument),
      options
    );
export const GenerateExternalMetricQueryDocument = `
    mutation GenerateExternalMetricQuery($inputData: json = "") {
  generateExternalMetricQuery(input: {inputData: $inputData}) {
    query
  }
}
    `;
export const useGenerateExternalMetricQueryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GenerateExternalMetricQueryMutation, TError, GenerateExternalMetricQueryMutationVariables, TContext>) =>
    useMutation<GenerateExternalMetricQueryMutation, TError, GenerateExternalMetricQueryMutationVariables, TContext>(
      ['GenerateExternalMetricQuery'],
      useFetcher<GenerateExternalMetricQueryMutation, GenerateExternalMetricQueryMutationVariables>(GenerateExternalMetricQueryDocument),
      options
    );
export const GenerateMetricQueryDocument = `
    mutation GenerateMetricQuery($inputData: json = "") {
  generateMetricQuery(input: {inputData: $inputData}) {
    query
  }
}
    `;
export const useGenerateMetricQueryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GenerateMetricQueryMutation, TError, GenerateMetricQueryMutationVariables, TContext>) =>
    useMutation<GenerateMetricQueryMutation, TError, GenerateMetricQueryMutationVariables, TContext>(
      ['GenerateMetricQuery'],
      useFetcher<GenerateMetricQueryMutation, GenerateMetricQueryMutationVariables>(GenerateMetricQueryDocument),
      options
    );
export const GetApiTokensDocument = `
    query GetAPITokens($companyId: uuid!) {
  apiTokens(where: {companyId: {_eq: $companyId}}) {
    id
    companyId
    name
    description
    scope
    isExpired
    updatedBy
    createdAt
    isTest
  }
}
    `;
export const useGetApiTokensQuery = <
      TData = GetApiTokensQuery,
      TError = unknown
    >(
      variables: GetApiTokensQueryVariables,
      options?: UseQueryOptions<GetApiTokensQuery, TError, TData>
    ) =>
    useQuery<GetApiTokensQuery, TError, TData>(
      ['GetAPITokens', variables],
      useFetcher<GetApiTokensQuery, GetApiTokensQueryVariables>(GetApiTokensDocument).bind(null, variables),
      options
    );
export const CompanyIntegrationDocument = `
    query CompanyIntegration($workspaceId: uuid = "") {
  companyIntegrations(
    where: {workspaceId: {_eq: $workspaceId}, _and: {isAuthenticated: {_eq: true}}}
  ) {
    companyId
    id
    integrationId
    name
  }
}
    `;
export const useCompanyIntegrationQuery = <
      TData = CompanyIntegrationQuery,
      TError = unknown
    >(
      variables?: CompanyIntegrationQueryVariables,
      options?: UseQueryOptions<CompanyIntegrationQuery, TError, TData>
    ) =>
    useQuery<CompanyIntegrationQuery, TError, TData>(
      variables === undefined ? ['CompanyIntegration'] : ['CompanyIntegration', variables],
      useFetcher<CompanyIntegrationQuery, CompanyIntegrationQueryVariables>(CompanyIntegrationDocument).bind(null, variables),
      options
    );
export const CompanyProfileDocument = `
    query CompanyProfile($id: uuid = "") {
  companies_by_pk(id: $id) {
    website
    name
  }
}
    `;
export const useCompanyProfileQuery = <
      TData = CompanyProfileQuery,
      TError = unknown
    >(
      variables?: CompanyProfileQueryVariables,
      options?: UseQueryOptions<CompanyProfileQuery, TError, TData>
    ) =>
    useQuery<CompanyProfileQuery, TError, TData>(
      variables === undefined ? ['CompanyProfile'] : ['CompanyProfile', variables],
      useFetcher<CompanyProfileQuery, CompanyProfileQueryVariables>(CompanyProfileDocument).bind(null, variables),
      options
    );
export const GetCompanyRolesDocument = `
    query GetCompanyRoles($companyId: uuid! = "") {
  companyRoles(where: {companyId: {_eq: $companyId}}) {
    id
    name
    description
    permissions
    companyId
  }
}
    `;
export const useGetCompanyRolesQuery = <
      TData = GetCompanyRolesQuery,
      TError = unknown
    >(
      variables?: GetCompanyRolesQueryVariables,
      options?: UseQueryOptions<GetCompanyRolesQuery, TError, TData>
    ) =>
    useQuery<GetCompanyRolesQuery, TError, TData>(
      variables === undefined ? ['GetCompanyRoles'] : ['GetCompanyRoles', variables],
      useFetcher<GetCompanyRolesQuery, GetCompanyRolesQueryVariables>(GetCompanyRolesDocument).bind(null, variables),
      options
    );
export const CompanySubsetTableDataDocument = `
    mutation CompanySubsetTableData($clientId: String = "", $companyId: String = "", $workspaceId: String = "") {
  companySubsetTableData(
    input: {clientId: $clientId, companyId: $companyId, workspaceId: $workspaceId}
  ) {
    companyIntegrationId
    dbName
    error {
      message
    }
    tableList {
      tableName
      columns {
        datatype
        name
        as
      }
      clientColumn
    }
  }
}
    `;
export const useCompanySubsetTableDataMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CompanySubsetTableDataMutation, TError, CompanySubsetTableDataMutationVariables, TContext>) =>
    useMutation<CompanySubsetTableDataMutation, TError, CompanySubsetTableDataMutationVariables, TContext>(
      ['CompanySubsetTableData'],
      useFetcher<CompanySubsetTableDataMutation, CompanySubsetTableDataMutationVariables>(CompanySubsetTableDataDocument),
      options
    );
export const CompanyTenancyLevelDocument = `
    query CompanyTenancyLevel($id: uuid = "") {
  companies_by_pk(id: $id) {
    tenancyLevel
  }
}
    `;
export const useCompanyTenancyLevelQuery = <
      TData = CompanyTenancyLevelQuery,
      TError = unknown
    >(
      variables?: CompanyTenancyLevelQueryVariables,
      options?: UseQueryOptions<CompanyTenancyLevelQuery, TError, TData>
    ) =>
    useQuery<CompanyTenancyLevelQuery, TError, TData>(
      variables === undefined ? ['CompanyTenancyLevel'] : ['CompanyTenancyLevel', variables],
      useFetcher<CompanyTenancyLevelQuery, CompanyTenancyLevelQueryVariables>(CompanyTenancyLevelDocument).bind(null, variables),
      options
    );
export const CompanyWorkspacesDocument = `
    query CompanyWorkspaces {
  getCompanyWorkspaces {
    companyWorkspaces {
      companyId
      description
      id
      name
      tenancyLevel
      creatorMode
      companyIntegrations {
        id
      }
    }
  }
}
    `;
export const useCompanyWorkspacesQuery = <
      TData = CompanyWorkspacesQuery,
      TError = unknown
    >(
      variables?: CompanyWorkspacesQueryVariables,
      options?: UseQueryOptions<CompanyWorkspacesQuery, TError, TData>
    ) =>
    useQuery<CompanyWorkspacesQuery, TError, TData>(
      variables === undefined ? ['CompanyWorkspaces'] : ['CompanyWorkspaces', variables],
      useFetcher<CompanyWorkspacesQuery, CompanyWorkspacesQueryVariables>(CompanyWorkspacesDocument).bind(null, variables),
      options
    );
export const ConnectedCompanyIntegrationDocument = `
    query ConnectedCompanyIntegration($companyId: uuid = "", $integrationId: uuid = "", $workspaceId: uuid = "") {
  companyIntegrations(
    where: {companyId: {_eq: $companyId}, integrationId: {_eq: $integrationId}, workspaceId: {_eq: $workspaceId}}
  ) {
    companyId
    name: credentials(path: "$.name")
    host: credentials(path: "$.host")
    role: credentials(path: "$.role")
    warehouse: credentials(path: "$.warehouse")
    database: credentials(path: "$.database")
    schema: credentials(path: "$.schema")
    username: credentials(path: "$.username")
    port: credentials(path: "$.port")
    project_id: credentials(path: "$.project_id")
    dataset_location: credentials(path: "$.dataset_location")
    dataset_id: credentials(path: "$.dataset_id")
    user: credentials(path: "$.user")
    cloud_id: credentials(path: "$.cloud_id")
    schemas: credentials(path: "$.schemas")
    httpPath: credentials(path: "$.httpPath")
    serverHostname: credentials(path: "$.serverHostname")
    sshTunnel: credentials(path: "$.sshTunnel")
    sshHost: credentials(path: "$.sshHost")
    sshPort: credentials(path: "$.sshPort")
    sshUsername: credentials(path: "$.sshUsername")
    sslMode: credentials(path: "$.sslMode")
    id
    integrationId
    dbName: name
    isEncrypted
    isAuthenticated
  }
}
    `;
export const useConnectedCompanyIntegrationQuery = <
      TData = ConnectedCompanyIntegrationQuery,
      TError = unknown
    >(
      variables?: ConnectedCompanyIntegrationQueryVariables,
      options?: UseQueryOptions<ConnectedCompanyIntegrationQuery, TError, TData>
    ) =>
    useQuery<ConnectedCompanyIntegrationQuery, TError, TData>(
      variables === undefined ? ['ConnectedCompanyIntegration'] : ['ConnectedCompanyIntegration', variables],
      useFetcher<ConnectedCompanyIntegrationQuery, ConnectedCompanyIntegrationQueryVariables>(ConnectedCompanyIntegrationDocument).bind(null, variables),
      options
    );
export const ConnectedCompanyIntegrationListDocument = `
    query ConnectedCompanyIntegrationList($companyId: uuid = "") {
  companyIntegrations(where: {companyId: {_eq: $companyId}}) {
    companyId
    name: credentials(path: "$.name")
    host: credentials(path: "$.host")
    server: credentials(path: "$.server")
    role: credentials(path: "$.role")
    warehouse: credentials(path: "$.warehouse")
    database: credentials(path: "$.database")
    schema: credentials(path: "$.schema")
    username: credentials(path: "$.username")
    port: credentials(path: "$.port")
    project_id: credentials(path: "$.project_id")
    dataset_location: credentials(path: "$.dataset_location")
    dataset_id: credentials(path: "$.dataset_id")
    user: credentials(path: "$.user")
    cloud_id: credentials(path: "$.cloud_id")
    schemas: credentials(path: "$.schemas")
    httpPath: credentials(path: "$.httpPath")
    serverHostname: credentials(path: "$.serverHostname")
    sshTunnel: credentials(path: "$.sshTunnel")
    sshHost: credentials(path: "$.sshHost")
    sshPort: credentials(path: "$.sshPort")
    sshUsername: credentials(path: "$.sshUsername")
    sslMode: credentials(path: "$.sslMode")
    id
    integrationId
    dbName: name
    isEncrypted
    isAuthenticated
    workspaceId
    updatedAt
    createdAt
  }
}
    `;
export const useConnectedCompanyIntegrationListQuery = <
      TData = ConnectedCompanyIntegrationListQuery,
      TError = unknown
    >(
      variables?: ConnectedCompanyIntegrationListQueryVariables,
      options?: UseQueryOptions<ConnectedCompanyIntegrationListQuery, TError, TData>
    ) =>
    useQuery<ConnectedCompanyIntegrationListQuery, TError, TData>(
      variables === undefined ? ['ConnectedCompanyIntegrationList'] : ['ConnectedCompanyIntegrationList', variables],
      useFetcher<ConnectedCompanyIntegrationListQuery, ConnectedCompanyIntegrationListQueryVariables>(ConnectedCompanyIntegrationListDocument).bind(null, variables),
      options
    );
export const ConnectedRedisDocument = `
    query ConnectedRedis($workspaceId: uuid = "") {
  companyRedis_by_pk(workspaceId: $workspaceId) {
    expire
    host
    id
    password
    port
    isEnabled
    workspaceId
    isDatabrainCache
  }
}
    `;
export const useConnectedRedisQuery = <
      TData = ConnectedRedisQuery,
      TError = unknown
    >(
      variables?: ConnectedRedisQueryVariables,
      options?: UseQueryOptions<ConnectedRedisQuery, TError, TData>
    ) =>
    useQuery<ConnectedRedisQuery, TError, TData>(
      variables === undefined ? ['ConnectedRedis'] : ['ConnectedRedis', variables],
      useFetcher<ConnectedRedisQuery, ConnectedRedisQueryVariables>(ConnectedRedisDocument).bind(null, variables),
      options
    );
export const GetConnectionDocument = `
    query GetConnection($connectionId: String = "") {
  getConnection(input: {connectionId: $connectionId}) {
    data
  }
}
    `;
export const useGetConnectionQuery = <
      TData = GetConnectionQuery,
      TError = unknown
    >(
      variables?: GetConnectionQueryVariables,
      options?: UseQueryOptions<GetConnectionQuery, TError, TData>
    ) =>
    useQuery<GetConnectionQuery, TError, TData>(
      variables === undefined ? ['GetConnection'] : ['GetConnection', variables],
      useFetcher<GetConnectionQuery, GetConnectionQueryVariables>(GetConnectionDocument).bind(null, variables),
      options
    );
export const GetConnectionJobsDocument = `
    query GetConnectionJobs($connectionId: String = "") {
  getJobs(input: {connectionId: $connectionId}) {
    data
  }
}
    `;
export const useGetConnectionJobsQuery = <
      TData = GetConnectionJobsQuery,
      TError = unknown
    >(
      variables?: GetConnectionJobsQueryVariables,
      options?: UseQueryOptions<GetConnectionJobsQuery, TError, TData>
    ) =>
    useQuery<GetConnectionJobsQuery, TError, TData>(
      variables === undefined ? ['GetConnectionJobs'] : ['GetConnectionJobs', variables],
      useFetcher<GetConnectionJobsQuery, GetConnectionJobsQueryVariables>(GetConnectionJobsDocument).bind(null, variables),
      options
    );
export const GetConnectionsListDocument = `
    query GetConnectionsList($workspaceId: String = "") {
  getConnectionsList(input: {workspaceId: $workspaceId}) {
    data
  }
}
    `;
export const useGetConnectionsListQuery = <
      TData = GetConnectionsListQuery,
      TError = unknown
    >(
      variables?: GetConnectionsListQueryVariables,
      options?: UseQueryOptions<GetConnectionsListQuery, TError, TData>
    ) =>
    useQuery<GetConnectionsListQuery, TError, TData>(
      variables === undefined ? ['GetConnectionsList'] : ['GetConnectionsList', variables],
      useFetcher<GetConnectionsListQuery, GetConnectionsListQueryVariables>(GetConnectionsListDocument).bind(null, variables),
      options
    );
export const CustomSqlColumnsDocument = `
    query CustomSqlColumns($companyIntegrationId: uuid = "") {
  customSqlColumns(where: {companyIntegrationId: {_eq: $companyIntegrationId}}) {
    companyIntegrationId
    id
    sqlColumns
    tableName
  }
}
    `;
export const useCustomSqlColumnsQuery = <
      TData = CustomSqlColumnsQuery,
      TError = unknown
    >(
      variables?: CustomSqlColumnsQueryVariables,
      options?: UseQueryOptions<CustomSqlColumnsQuery, TError, TData>
    ) =>
    useQuery<CustomSqlColumnsQuery, TError, TData>(
      variables === undefined ? ['CustomSqlColumns'] : ['CustomSqlColumns', variables],
      useFetcher<CustomSqlColumnsQuery, CustomSqlColumnsQueryVariables>(CustomSqlColumnsDocument).bind(null, variables),
      options
    );
export const GetDashboardMetricsDocument = `
    query GetDashboardMetrics($dashboardId: uuid!) {
  dashboardMetrics(where: {dashboardId: {_eq: $dashboardId}}) {
    id
    dashboardId
    metric {
      actorId
      createdAt
      description
      id
      lock
      name
      publishType
      query
      trackLineage
      updatedAt
      companyId
      verify
      chartOption
      dbName
      inputFields
      metricQuery
      outputColumns
    }
    width
    height
    xAxis
    yAxis
  }
}
    `;
export const useGetDashboardMetricsQuery = <
      TData = GetDashboardMetricsQuery,
      TError = unknown
    >(
      variables: GetDashboardMetricsQueryVariables,
      options?: UseQueryOptions<GetDashboardMetricsQuery, TError, TData>
    ) =>
    useQuery<GetDashboardMetricsQuery, TError, TData>(
      ['GetDashboardMetrics', variables],
      useFetcher<GetDashboardMetricsQuery, GetDashboardMetricsQueryVariables>(GetDashboardMetricsDocument).bind(null, variables),
      options
    );
export const GetDashboardsDocument = `
    query GetDashboards($companyId: uuid!) {
  dashboards(where: {companyId: {_eq: $companyId}}) {
    id
    name
  }
}
    `;
export const useGetDashboardsQuery = <
      TData = GetDashboardsQuery,
      TError = unknown
    >(
      variables: GetDashboardsQueryVariables,
      options?: UseQueryOptions<GetDashboardsQuery, TError, TData>
    ) =>
    useQuery<GetDashboardsQuery, TError, TData>(
      ['GetDashboards', variables],
      useFetcher<GetDashboardsQuery, GetDashboardsQueryVariables>(GetDashboardsDocument).bind(null, variables),
      options
    );
export const DataModelListDocument = `
    query DataModelList($companyId: uuid = "") {
  dataModels(where: {companyId: {_eq: $companyId}}) {
    companyId
    createdAt
    description
    destinationId
    id
    lineageData
    modelType
    name
    query
  }
}
    `;
export const useDataModelListQuery = <
      TData = DataModelListQuery,
      TError = unknown
    >(
      variables?: DataModelListQueryVariables,
      options?: UseQueryOptions<DataModelListQuery, TError, TData>
    ) =>
    useQuery<DataModelListQuery, TError, TData>(
      variables === undefined ? ['DataModelList'] : ['DataModelList', variables],
      useFetcher<DataModelListQuery, DataModelListQueryVariables>(DataModelListDocument).bind(null, variables),
      options
    );
export const GetDataModelDocument = `
    query getDataModel($id: uuid = "") {
  dataModels_by_pk(id: $id) {
    companyId
    createdAt
    description
    destinationId
    id
    lineageData
    modelType
    name
    query
    dbName
    databaseName
  }
}
    `;
export const useGetDataModelQuery = <
      TData = GetDataModelQuery,
      TError = unknown
    >(
      variables?: GetDataModelQueryVariables,
      options?: UseQueryOptions<GetDataModelQuery, TError, TData>
    ) =>
    useQuery<GetDataModelQuery, TError, TData>(
      variables === undefined ? ['getDataModel'] : ['getDataModel', variables],
      useFetcher<GetDataModelQuery, GetDataModelQueryVariables>(GetDataModelDocument).bind(null, variables),
      options
    );
export const DatasetListDocument = `
    query DatasetList($companyIntegrationId: String = "") {
  dataModels(where: {destinationId: {_eq: $companyIntegrationId}}) {
    companyId
    createdAt
    databaseName
    dbName
    description
    destinationId
    id
    lineageData
    modelType
    name
    query
    workspaceId
  }
}
    `;
export const useDatasetListQuery = <
      TData = DatasetListQuery,
      TError = unknown
    >(
      variables?: DatasetListQueryVariables,
      options?: UseQueryOptions<DatasetListQuery, TError, TData>
    ) =>
    useQuery<DatasetListQuery, TError, TData>(
      variables === undefined ? ['DatasetList'] : ['DatasetList', variables],
      useFetcher<DatasetListQuery, DatasetListQueryVariables>(DatasetListDocument).bind(null, variables),
      options
    );
export const GetDefaultThemeDocument = `
    query GetDefaultTheme($companyId: uuid!) {
  companies_by_pk(id: $companyId) {
    defaultTheme
  }
}
    `;
export const useGetDefaultThemeQuery = <
      TData = GetDefaultThemeQuery,
      TError = unknown
    >(
      variables: GetDefaultThemeQueryVariables,
      options?: UseQueryOptions<GetDefaultThemeQuery, TError, TData>
    ) =>
    useQuery<GetDefaultThemeQuery, TError, TData>(
      ['GetDefaultTheme', variables],
      useFetcher<GetDefaultThemeQuery, GetDefaultThemeQueryVariables>(GetDefaultThemeDocument).bind(null, variables),
      options
    );
export const GetDemoConfigDocument = `
    query GetDemoConfig($companyId: uuid! = "") {
  demoTheme(where: {companyId: {_eq: $companyId}}) {
    id
    companyId
    primaryColor
    dashboardTitle
    textColor
    logoUrl
    navbarColor
    highlightColor
    settings
  }
}
    `;
export const useGetDemoConfigQuery = <
      TData = GetDemoConfigQuery,
      TError = unknown
    >(
      variables?: GetDemoConfigQueryVariables,
      options?: UseQueryOptions<GetDemoConfigQuery, TError, TData>
    ) =>
    useQuery<GetDemoConfigQuery, TError, TData>(
      variables === undefined ? ['GetDemoConfig'] : ['GetDemoConfig', variables],
      useFetcher<GetDemoConfigQuery, GetDemoConfigQueryVariables>(GetDemoConfigDocument).bind(null, variables),
      options
    );
export const GetDestinationListDocument = `
    query GetDestinationList($workspaceId: String = "") {
  getDestinationList(input: {workspaceId: $workspaceId}) {
    data
  }
}
    `;
export const useGetDestinationListQuery = <
      TData = GetDestinationListQuery,
      TError = unknown
    >(
      variables?: GetDestinationListQueryVariables,
      options?: UseQueryOptions<GetDestinationListQuery, TError, TData>
    ) =>
    useQuery<GetDestinationListQuery, TError, TData>(
      variables === undefined ? ['GetDestinationList'] : ['GetDestinationList', variables],
      useFetcher<GetDestinationListQuery, GetDestinationListQueryVariables>(GetDestinationListDocument).bind(null, variables),
      options
    );
export const EmbeddedDashboardMetricsDocument = `
    query EmbeddedDashboardMetrics($where: externalDashboardMetrics_bool_exp) {
  externalDashboardMetrics(where: $where) {
    externalMetricId
    externalDashboardId
    externalMetric {
      chartOptions
      clientId
      companyId
      companyIntegrationId
      createdAt
      createdBy
      description
      id
      inputFields
      integrationName
      isCreatedByClient
      isLive
      metricId
      metricQuery
      name
      outputColumns
      query
      timeGrain
      updatedAt
      selectedGroupBy
      isEnableGroupBy
      groupBy
      rlsConditions
      companyIntegration {
        name
      }
    }
  }
}
    `;
export const useEmbeddedDashboardMetricsQuery = <
      TData = EmbeddedDashboardMetricsQuery,
      TError = unknown
    >(
      variables?: EmbeddedDashboardMetricsQueryVariables,
      options?: UseQueryOptions<EmbeddedDashboardMetricsQuery, TError, TData>
    ) =>
    useQuery<EmbeddedDashboardMetricsQuery, TError, TData>(
      variables === undefined ? ['EmbeddedDashboardMetrics'] : ['EmbeddedDashboardMetrics', variables],
      useFetcher<EmbeddedDashboardMetricsQuery, EmbeddedDashboardMetricsQueryVariables>(EmbeddedDashboardMetricsDocument).bind(null, variables),
      options
    );
export const EndUserMetricAccessDocument = `
    query EndUserMetricAccess($companyId: uuid = "") {
  companySubsetTables(where: {companyId: {_eq: $companyId}}) {
    isAllowMetricCreation
    isAllowMetricDeletion
    isAllowMetricUpdation
    isAllowChangeLayout
  }
}
    `;
export const useEndUserMetricAccessQuery = <
      TData = EndUserMetricAccessQuery,
      TError = unknown
    >(
      variables?: EndUserMetricAccessQueryVariables,
      options?: UseQueryOptions<EndUserMetricAccessQuery, TError, TData>
    ) =>
    useQuery<EndUserMetricAccessQuery, TError, TData>(
      variables === undefined ? ['EndUserMetricAccess'] : ['EndUserMetricAccess', variables],
      useFetcher<EndUserMetricAccessQuery, EndUserMetricAccessQueryVariables>(EndUserMetricAccessDocument).bind(null, variables),
      options
    );
export const GetExternalDashboardClientThemeDocument = `
    query GetExternalDashboardClientTheme($companyId: uuid!, $clientId: String!) {
  externalDashboardThemes(
    where: {companyId: {_eq: $companyId}, externalDashboardThemeClients: {clientId: {_eq: $clientId}}}
    limit: 1
  ) {
    colors
    createdAt
    id
    name
  }
}
    `;
export const useGetExternalDashboardClientThemeQuery = <
      TData = GetExternalDashboardClientThemeQuery,
      TError = unknown
    >(
      variables: GetExternalDashboardClientThemeQueryVariables,
      options?: UseQueryOptions<GetExternalDashboardClientThemeQuery, TError, TData>
    ) =>
    useQuery<GetExternalDashboardClientThemeQuery, TError, TData>(
      ['GetExternalDashboardClientTheme', variables],
      useFetcher<GetExternalDashboardClientThemeQuery, GetExternalDashboardClientThemeQueryVariables>(GetExternalDashboardClientThemeDocument).bind(null, variables),
      options
    );
export const GetExternalDashboardIdDocument = `
    query GetExternalDashboardId($externalDashboardId: String = "") {
  externalDashboards(where: {externalDashboardId: {_eq: $externalDashboardId}}) {
    id
    filters
  }
}
    `;
export const useGetExternalDashboardIdQuery = <
      TData = GetExternalDashboardIdQuery,
      TError = unknown
    >(
      variables?: GetExternalDashboardIdQueryVariables,
      options?: UseQueryOptions<GetExternalDashboardIdQuery, TError, TData>
    ) =>
    useQuery<GetExternalDashboardIdQuery, TError, TData>(
      variables === undefined ? ['GetExternalDashboardId'] : ['GetExternalDashboardId', variables],
      useFetcher<GetExternalDashboardIdQuery, GetExternalDashboardIdQueryVariables>(GetExternalDashboardIdDocument).bind(null, variables),
      options
    );
export const ExternalDashboardListDocument = `
    query ExternalDashboardList($workspaceId: uuid = "") {
  externalDashboards(where: {workspaceId: {_eq: $workspaceId}}) {
    externalDashboardId
    name
    id
    filters
    defaultClientId
    layout
    workspaceId
    updatedAt
    externalDashboardMetrics {
      externalMetricId
      externalMetric {
        id
        metricId
        name
        updatedAt
        clientId
      }
    }
  }
}
    `;
export const useExternalDashboardListQuery = <
      TData = ExternalDashboardListQuery,
      TError = unknown
    >(
      variables?: ExternalDashboardListQueryVariables,
      options?: UseQueryOptions<ExternalDashboardListQuery, TError, TData>
    ) =>
    useQuery<ExternalDashboardListQuery, TError, TData>(
      variables === undefined ? ['ExternalDashboardList'] : ['ExternalDashboardList', variables],
      useFetcher<ExternalDashboardListQuery, ExternalDashboardListQueryVariables>(ExternalDashboardListDocument).bind(null, variables),
      options
    );
export const ExternalDashboardMetricListDocument = `
    query ExternalDashboardMetricList($externalDashboardId: uuid = "", $clientId: String = "") {
  externalDashboardMetrics(
    where: {externalDashboardId: {_eq: $externalDashboardId}, externalMetric: {isArchived: {_eq: false}, isMarkedDeleted: {_eq: false}}, _not: {externalMetric: {clientDeletedMetrics: {clientId: {_eq: $clientId}}}}}
  ) {
    externalMetric {
      description
      id
      metricId
      name
      clickActions
      datasetMetricSettings
    }
  }
}
    `;
export const useExternalDashboardMetricListQuery = <
      TData = ExternalDashboardMetricListQuery,
      TError = unknown
    >(
      variables?: ExternalDashboardMetricListQueryVariables,
      options?: UseQueryOptions<ExternalDashboardMetricListQuery, TError, TData>
    ) =>
    useQuery<ExternalDashboardMetricListQuery, TError, TData>(
      variables === undefined ? ['ExternalDashboardMetricList'] : ['ExternalDashboardMetricList', variables],
      useFetcher<ExternalDashboardMetricListQuery, ExternalDashboardMetricListQueryVariables>(ExternalDashboardMetricListDocument).bind(null, variables),
      options
    );
export const ExternalDashboardMetricsDocument = `
    query ExternalDashboardMetrics($externalDashboardId: uuid = "", $clientId: String = "") {
  externalDashboardMetrics(
    where: {externalDashboardId: {_eq: $externalDashboardId}, externalMetric: {isArchived: {_eq: false}, isMarkedDeleted: {_eq: false}}, _not: {externalMetric: {clientDeletedMetrics: {clientId: {_eq: $clientId}}}}}
  ) {
    externalMetricId
    externalDashboardId
    externalMetric {
      chartOptions
      clientId
      companyId
      companyIntegrationId
      createdAt
      createdBy
      description
      id
      inputFields
      integrationName
      isCreatedByClient
      isLive
      metricId
      metricQuery
      name
      outputColumns
      query
      resizeAttributes
      timeGrain
      updatedAt
      isEnableGroupBy
      groupBy
      selectedGroupBy
      rlsConditions
      companyIntegration {
        name
        workspaceId
      }
      clickActions
      drillDownSettings
      limit
      datasetMetricSettings
      dataSecuritySettings
    }
  }
}
    `;
export const useExternalDashboardMetricsQuery = <
      TData = ExternalDashboardMetricsQuery,
      TError = unknown
    >(
      variables?: ExternalDashboardMetricsQueryVariables,
      options?: UseQueryOptions<ExternalDashboardMetricsQuery, TError, TData>
    ) =>
    useQuery<ExternalDashboardMetricsQuery, TError, TData>(
      variables === undefined ? ['ExternalDashboardMetrics'] : ['ExternalDashboardMetrics', variables],
      useFetcher<ExternalDashboardMetricsQuery, ExternalDashboardMetricsQueryVariables>(ExternalDashboardMetricsDocument).bind(null, variables),
      options
    );
export const GetExternalDashboardThemesDocument = `
    query GetExternalDashboardThemes($companyId: uuid!) {
  externalDashboardThemes(where: {companyId: {_eq: $companyId}}) {
    colors
    createdAt
    id
    name
    externalDashboardThemeClients {
      id
      clientId
      clientName
    }
  }
}
    `;
export const useGetExternalDashboardThemesQuery = <
      TData = GetExternalDashboardThemesQuery,
      TError = unknown
    >(
      variables: GetExternalDashboardThemesQueryVariables,
      options?: UseQueryOptions<GetExternalDashboardThemesQuery, TError, TData>
    ) =>
    useQuery<GetExternalDashboardThemesQuery, TError, TData>(
      ['GetExternalDashboardThemes', variables],
      useFetcher<GetExternalDashboardThemesQuery, GetExternalDashboardThemesQueryVariables>(GetExternalDashboardThemesDocument).bind(null, variables),
      options
    );
export const ExternalDashboardsByCompanyDocument = `
    query ExternalDashboardsByCompany($companyId: uuid!) {
  externalDashboards(where: {companyId: {_eq: $companyId}}) {
    externalDashboardId
    name
    id
  }
}
    `;
export const useExternalDashboardsByCompanyQuery = <
      TData = ExternalDashboardsByCompanyQuery,
      TError = unknown
    >(
      variables: ExternalDashboardsByCompanyQueryVariables,
      options?: UseQueryOptions<ExternalDashboardsByCompanyQuery, TError, TData>
    ) =>
    useQuery<ExternalDashboardsByCompanyQuery, TError, TData>(
      ['ExternalDashboardsByCompany', variables],
      useFetcher<ExternalDashboardsByCompanyQuery, ExternalDashboardsByCompanyQueryVariables>(ExternalDashboardsByCompanyDocument).bind(null, variables),
      options
    );
export const ExternalDatasetDocument = `
    query ExternalDataset($id: uuid = "") {
  externalDatasets_by_pk(id: $id) {
    clientColumn
    columns
    companyId
    createdAt
    id
    tableName
    type
    updatedAt
    query
  }
}
    `;
export const useExternalDatasetQuery = <
      TData = ExternalDatasetQuery,
      TError = unknown
    >(
      variables?: ExternalDatasetQueryVariables,
      options?: UseQueryOptions<ExternalDatasetQuery, TError, TData>
    ) =>
    useQuery<ExternalDatasetQuery, TError, TData>(
      variables === undefined ? ['ExternalDataset'] : ['ExternalDataset', variables],
      useFetcher<ExternalDatasetQuery, ExternalDatasetQueryVariables>(ExternalDatasetDocument).bind(null, variables),
      options
    );
export const ExternalDatasetListDocument = `
    query ExternalDatasetList($companyId: uuid = "", $workspaceId: uuid = "") {
  externalDatasets(
    where: {companyId: {_eq: $companyId}, workpspaceId: {_eq: $workspaceId}}
  ) {
    clientColumn
    columns
    companyId
    createdAt
    id
    tableName
    type
    updatedAt
    query
  }
}
    `;
export const useExternalDatasetListQuery = <
      TData = ExternalDatasetListQuery,
      TError = unknown
    >(
      variables?: ExternalDatasetListQueryVariables,
      options?: UseQueryOptions<ExternalDatasetListQuery, TError, TData>
    ) =>
    useQuery<ExternalDatasetListQuery, TError, TData>(
      variables === undefined ? ['ExternalDatasetList'] : ['ExternalDatasetList', variables],
      useFetcher<ExternalDatasetListQuery, ExternalDatasetListQueryVariables>(ExternalDatasetListDocument).bind(null, variables),
      options
    );
export const ExternalMetricDocument = `
    query ExternalMetric($id: uuid = "") {
  externalMetrics_by_pk(id: $id) {
    chartOptions
    companyId
    companyIntegrationId
    createdAt
    description
    id
    inputFields
    integrationName
    metricId
    metricQuery
    name
    outputColumns
    query
    updatedAt
    createdBy
    isLive
    timeGrain
    isCreatedByClient
    clientId
    externalDashboardMetrics {
      externalDashboardId
    }
    isEnableGroupBy
    selectedGroupBy
    groupBy
    joinFields
    rlsConditions
    clickActions
    datasetMetricSettings
    drillDownSettings
    limit
    dataSecuritySettings
    currentVersion
    latestVersion
  }
}
    `;
export const useExternalMetricQuery = <
      TData = ExternalMetricQuery,
      TError = unknown
    >(
      variables?: ExternalMetricQueryVariables,
      options?: UseQueryOptions<ExternalMetricQuery, TError, TData>
    ) =>
    useQuery<ExternalMetricQuery, TError, TData>(
      variables === undefined ? ['ExternalMetric'] : ['ExternalMetric', variables],
      useFetcher<ExternalMetricQuery, ExternalMetricQueryVariables>(ExternalMetricDocument).bind(null, variables),
      options
    );
export const GetExternalMetricsListDocument = `
    query GetExternalMetricsList($where: externalMetrics_bool_exp, $workspaceId: uuid = "") {
  externalMetrics(where: $where) {
    chartOptions
    companyId
    companyIntegrationId
    createdAt
    description
    id
    inputFields
    integrationName
    metricId
    metricQuery
    name
    outputColumns
    query
    updatedAt
    createdBy
    isLive
    isCreatedByClient
    clientId
    timeGrain
    isEnableGroupBy
    selectedGroupBy
    groupBy
    rlsConditions
    externalDashboardMetrics(
      where: {externalDashboard: {workspaceId: {_eq: $workspaceId}}}
    ) {
      externalDashboard {
        id
        name
      }
    }
    limit
  }
}
    `;
export const useGetExternalMetricsListQuery = <
      TData = GetExternalMetricsListQuery,
      TError = unknown
    >(
      variables?: GetExternalMetricsListQueryVariables,
      options?: UseQueryOptions<GetExternalMetricsListQuery, TError, TData>
    ) =>
    useQuery<GetExternalMetricsListQuery, TError, TData>(
      variables === undefined ? ['GetExternalMetricsList'] : ['GetExternalMetricsList', variables],
      useFetcher<GetExternalMetricsListQuery, GetExternalMetricsListQueryVariables>(GetExternalMetricsListDocument).bind(null, variables),
      options
    );
export const GuestTokenParamsDocument = `
    query GuestTokenParams($id: uuid = "") {
  guestTokens_by_pk(id: $id) {
    clientId
    companyId
    id
    params
  }
}
    `;
export const useGuestTokenParamsQuery = <
      TData = GuestTokenParamsQuery,
      TError = unknown
    >(
      variables?: GuestTokenParamsQueryVariables,
      options?: UseQueryOptions<GuestTokenParamsQuery, TError, TData>
    ) =>
    useQuery<GuestTokenParamsQuery, TError, TData>(
      variables === undefined ? ['GuestTokenParams'] : ['GuestTokenParams', variables],
      useFetcher<GuestTokenParamsQuery, GuestTokenParamsQueryVariables>(GuestTokenParamsDocument).bind(null, variables),
      options
    );
export const GetGuestTokensDocument = `
    query GetGuestTokens($companyId: uuid!, $clientId: String!) {
  guestTokens(
    where: {companyId: {_eq: $companyId}, clientId: {_eq: $clientId}, expire: {_is_null: true}}
  ) {
    id
    clientId
    companyId
    params
  }
}
    `;
export const useGetGuestTokensQuery = <
      TData = GetGuestTokensQuery,
      TError = unknown
    >(
      variables: GetGuestTokensQueryVariables,
      options?: UseQueryOptions<GetGuestTokensQuery, TError, TData>
    ) =>
    useQuery<GetGuestTokensQuery, TError, TData>(
      ['GetGuestTokens', variables],
      useFetcher<GetGuestTokensQuery, GetGuestTokensQueryVariables>(GetGuestTokensDocument).bind(null, variables),
      options
    );
export const GetIntegrationSpecificationDocument = `
    query GetIntegrationSpecification($integrationId: uuid = "") {
  integrationSpecifications(where: {integrationId: {_eq: $integrationId}}) {
    id
    integrationId
    integrationName
    fields
  }
}
    `;
export const useGetIntegrationSpecificationQuery = <
      TData = GetIntegrationSpecificationQuery,
      TError = unknown
    >(
      variables?: GetIntegrationSpecificationQueryVariables,
      options?: UseQueryOptions<GetIntegrationSpecificationQuery, TError, TData>
    ) =>
    useQuery<GetIntegrationSpecificationQuery, TError, TData>(
      variables === undefined ? ['GetIntegrationSpecification'] : ['GetIntegrationSpecification', variables],
      useFetcher<GetIntegrationSpecificationQuery, GetIntegrationSpecificationQueryVariables>(GetIntegrationSpecificationDocument).bind(null, variables),
      options
    );
export const IntegrationsListDocument = `
    query IntegrationsList {
  integrations {
    description
    icon
    id
    name
  }
}
    `;
export const useIntegrationsListQuery = <
      TData = IntegrationsListQuery,
      TError = unknown
    >(
      variables?: IntegrationsListQueryVariables,
      options?: UseQueryOptions<IntegrationsListQuery, TError, TData>
    ) =>
    useQuery<IntegrationsListQuery, TError, TData>(
      variables === undefined ? ['IntegrationsList'] : ['IntegrationsList', variables],
      useFetcher<IntegrationsListQuery, IntegrationsListQueryVariables>(IntegrationsListDocument).bind(null, variables),
      options
    );
export const GetJobInformationDocument = `
    query GetJobInformation($jobId: String = "") {
  getJobInformation(input: {jobId: $jobId}) {
    data
  }
}
    `;
export const useGetJobInformationQuery = <
      TData = GetJobInformationQuery,
      TError = unknown
    >(
      variables?: GetJobInformationQueryVariables,
      options?: UseQueryOptions<GetJobInformationQuery, TError, TData>
    ) =>
    useQuery<GetJobInformationQuery, TError, TData>(
      variables === undefined ? ['GetJobInformation'] : ['GetJobInformation', variables],
      useFetcher<GetJobInformationQuery, GetJobInformationQueryVariables>(GetJobInformationDocument).bind(null, variables),
      options
    );
export const GetLineageDataDocument = `
    mutation GetLineageData($sqlQuery: String = "") {
  getLineageData(input: {sqlQuery: $sqlQuery}) {
    result
  }
}
    `;
export const useGetLineageDataMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GetLineageDataMutation, TError, GetLineageDataMutationVariables, TContext>) =>
    useMutation<GetLineageDataMutation, TError, GetLineageDataMutationVariables, TContext>(
      ['GetLineageData'],
      useFetcher<GetLineageDataMutation, GetLineageDataMutationVariables>(GetLineageDataDocument),
      options
    );
export const GetMetricDashboardsDocument = `
    query GetMetricDashboards($metricId: uuid!) {
  dashboardMetrics(where: {metricId: {_eq: $metricId}}) {
    id
    metricId
    dashboard {
      id
      name
    }
    xAxis
    yAxis
    width
    height
  }
}
    `;
export const useGetMetricDashboardsQuery = <
      TData = GetMetricDashboardsQuery,
      TError = unknown
    >(
      variables: GetMetricDashboardsQueryVariables,
      options?: UseQueryOptions<GetMetricDashboardsQuery, TError, TData>
    ) =>
    useQuery<GetMetricDashboardsQuery, TError, TData>(
      ['GetMetricDashboards', variables],
      useFetcher<GetMetricDashboardsQuery, GetMetricDashboardsQueryVariables>(GetMetricDashboardsDocument).bind(null, variables),
      options
    );
export const GetOnboardingStatusDocument = `
    query GetOnboardingStatus($companyId: uuid!) {
  companies_by_pk(id: $companyId) {
    isOnboarded
  }
}
    `;
export const useGetOnboardingStatusQuery = <
      TData = GetOnboardingStatusQuery,
      TError = unknown
    >(
      variables: GetOnboardingStatusQueryVariables,
      options?: UseQueryOptions<GetOnboardingStatusQuery, TError, TData>
    ) =>
    useQuery<GetOnboardingStatusQuery, TError, TData>(
      ['GetOnboardingStatus', variables],
      useFetcher<GetOnboardingStatusQuery, GetOnboardingStatusQueryVariables>(GetOnboardingStatusDocument).bind(null, variables),
      options
    );
export const GetOrganizationDocument = `
    query GetOrganization($workspaceId: uuid = "") {
  organizations(where: {workspaceId: {_eq: $workspaceId}}, limit: 1) {
    id
    tableName
    tablePrimaryKeyColumn
    tableClientNameColumn
  }
}
    `;
export const useGetOrganizationQuery = <
      TData = GetOrganizationQuery,
      TError = unknown
    >(
      variables?: GetOrganizationQueryVariables,
      options?: UseQueryOptions<GetOrganizationQuery, TError, TData>
    ) =>
    useQuery<GetOrganizationQuery, TError, TData>(
      variables === undefined ? ['GetOrganization'] : ['GetOrganization', variables],
      useFetcher<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument).bind(null, variables),
      options
    );
export const GetPreviewTableDataDocument = `
    mutation GetPreviewTableData($dbName: String = "", $destinationId: String = "", $selectedSchemaList: json = "") {
  getPreviewTableData(
    input: {dbName: $dbName, destinationId: $destinationId, selectedSchemaList: $selectedSchemaList}
  ) {
    dataList
  }
}
    `;
export const useGetPreviewTableDataMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GetPreviewTableDataMutation, TError, GetPreviewTableDataMutationVariables, TContext>) =>
    useMutation<GetPreviewTableDataMutation, TError, GetPreviewTableDataMutationVariables, TContext>(
      ['GetPreviewTableData'],
      useFetcher<GetPreviewTableDataMutation, GetPreviewTableDataMutationVariables>(GetPreviewTableDataDocument),
      options
    );
export const RawCsvSettingsDocument = `
    query RawCsvSettings($id: uuid = "") {
  companyWorkspaces_by_pk(id: $id) {
    rawCsvSettings
    id
  }
}
    `;
export const useRawCsvSettingsQuery = <
      TData = RawCsvSettingsQuery,
      TError = unknown
    >(
      variables?: RawCsvSettingsQueryVariables,
      options?: UseQueryOptions<RawCsvSettingsQuery, TError, TData>
    ) =>
    useQuery<RawCsvSettingsQuery, TError, TData>(
      variables === undefined ? ['RawCsvSettings'] : ['RawCsvSettings', variables],
      useFetcher<RawCsvSettingsQuery, RawCsvSettingsQueryVariables>(RawCsvSettingsDocument).bind(null, variables),
      options
    );
export const GetSchemaListDocument = `
    query GetSchemaList($workspaceId: uuid = "") {
  companyCacheSchemas(where: {workspaceId: {_eq: $workspaceId}}) {
    companyId
    schema
    id
    workspaceId
  }
}
    `;
export const useGetSchemaListQuery = <
      TData = GetSchemaListQuery,
      TError = unknown
    >(
      variables?: GetSchemaListQueryVariables,
      options?: UseQueryOptions<GetSchemaListQuery, TError, TData>
    ) =>
    useQuery<GetSchemaListQuery, TError, TData>(
      variables === undefined ? ['GetSchemaList'] : ['GetSchemaList', variables],
      useFetcher<GetSchemaListQuery, GetSchemaListQueryVariables>(GetSchemaListDocument).bind(null, variables),
      options
    );
export const GetSecretsDocument = `
    query GetSecrets($companyId: uuid!) {
  secrets(where: {companyId: {_eq: $companyId}}) {
    id
    name
    value
    companyId
  }
}
    `;
export const useGetSecretsQuery = <
      TData = GetSecretsQuery,
      TError = unknown
    >(
      variables: GetSecretsQueryVariables,
      options?: UseQueryOptions<GetSecretsQuery, TError, TData>
    ) =>
    useQuery<GetSecretsQuery, TError, TData>(
      ['GetSecrets', variables],
      useFetcher<GetSecretsQuery, GetSecretsQueryVariables>(GetSecretsDocument).bind(null, variables),
      options
    );
export const SharingSettingsDocument = `
    query SharingSettings($companyId: uuid = "") {
  sharingSettings(where: {companyId: {_eq: $companyId}}) {
    companyId
    fromAddress
    host
    id
    password
    port
    secure
    username
    replyToAddress
  }
}
    `;
export const useSharingSettingsQuery = <
      TData = SharingSettingsQuery,
      TError = unknown
    >(
      variables?: SharingSettingsQueryVariables,
      options?: UseQueryOptions<SharingSettingsQuery, TError, TData>
    ) =>
    useQuery<SharingSettingsQuery, TError, TData>(
      variables === undefined ? ['SharingSettings'] : ['SharingSettings', variables],
      useFetcher<SharingSettingsQuery, SharingSettingsQueryVariables>(SharingSettingsDocument).bind(null, variables),
      options
    );
export const GetSourceListDocument = `
    query GetSourceList($workspaceId: String = "") {
  getSourceList(input: {workspaceId: $workspaceId}) {
    data
  }
}
    `;
export const useGetSourceListQuery = <
      TData = GetSourceListQuery,
      TError = unknown
    >(
      variables?: GetSourceListQueryVariables,
      options?: UseQueryOptions<GetSourceListQuery, TError, TData>
    ) =>
    useQuery<GetSourceListQuery, TError, TData>(
      variables === undefined ? ['GetSourceList'] : ['GetSourceList', variables],
      useFetcher<GetSourceListQuery, GetSourceListQueryVariables>(GetSourceListDocument).bind(null, variables),
      options
    );
export const CompanySubsetTableListDocument = `
    query CompanySubsetTableList($workspaceId: uuid = "") {
  companySubsetTables(where: {workspaceId: {_eq: $workspaceId}}) {
    tableList
    isAllowMetricCreation
    isAllowMetricDeletion
    isAllowMetricUpdation
    isAllowChangeLayout
    isAllowEmailReports
    workspaceId
  }
}
    `;
export const useCompanySubsetTableListQuery = <
      TData = CompanySubsetTableListQuery,
      TError = unknown
    >(
      variables?: CompanySubsetTableListQueryVariables,
      options?: UseQueryOptions<CompanySubsetTableListQuery, TError, TData>
    ) =>
    useQuery<CompanySubsetTableListQuery, TError, TData>(
      variables === undefined ? ['CompanySubsetTableList'] : ['CompanySubsetTableList', variables],
      useFetcher<CompanySubsetTableListQuery, CompanySubsetTableListQueryVariables>(CompanySubsetTableListDocument).bind(null, variables),
      options
    );
export const GetThemesDocument = `
    query GetThemes($companyId: uuid! = "") {
  themes(where: {companyId: {_eq: $companyId}}) {
    id
    companyId
    general
    dashboard
    cardTitle
    cardDescription
    cardCustomization
    chartCustomization
    chart
    workspaceThemes {
      workspaceId
      themeId
    }
  }
}
    `;
export const useGetThemesQuery = <
      TData = GetThemesQuery,
      TError = unknown
    >(
      variables?: GetThemesQueryVariables,
      options?: UseQueryOptions<GetThemesQuery, TError, TData>
    ) =>
    useQuery<GetThemesQuery, TError, TData>(
      variables === undefined ? ['GetThemes'] : ['GetThemes', variables],
      useFetcher<GetThemesQuery, GetThemesQueryVariables>(GetThemesDocument).bind(null, variables),
      options
    );
export const GetUserClientDataDocument = `
    query GetUserClientData($companyId: String = "", $workspaceId: String = "") {
  getUserClientData(input: {companyId: $companyId, workspaceId: $workspaceId}) {
    data
  }
}
    `;
export const useGetUserClientDataQuery = <
      TData = GetUserClientDataQuery,
      TError = unknown
    >(
      variables?: GetUserClientDataQueryVariables,
      options?: UseQueryOptions<GetUserClientDataQuery, TError, TData>
    ) =>
    useQuery<GetUserClientDataQuery, TError, TData>(
      variables === undefined ? ['GetUserClientData'] : ['GetUserClientData', variables],
      useFetcher<GetUserClientDataQuery, GetUserClientDataQueryVariables>(GetUserClientDataDocument).bind(null, variables),
      options
    );
export const GetUserClientDatabaseDocument = `
    query getUserClientDatabase($companyId: uuid = "") {
  companyDatabases_by_pk(companyId: $companyId) {
    databaseList
    companyId
  }
}
    `;
export const useGetUserClientDatabaseQuery = <
      TData = GetUserClientDatabaseQuery,
      TError = unknown
    >(
      variables?: GetUserClientDatabaseQueryVariables,
      options?: UseQueryOptions<GetUserClientDatabaseQuery, TError, TData>
    ) =>
    useQuery<GetUserClientDatabaseQuery, TError, TData>(
      variables === undefined ? ['getUserClientDatabase'] : ['getUserClientDatabase', variables],
      useFetcher<GetUserClientDatabaseQuery, GetUserClientDatabaseQueryVariables>(GetUserClientDatabaseDocument).bind(null, variables),
      options
    );
export const UserListDocument = `
    query UserList($companyId: uuid = "") {
  companies_by_pk(id: $companyId) {
    users {
      firstName
      lastName
      id
      email
      createdAt
      invitedBy
      isAcceptedInvite
      acceptedInviteAt
      isAdmin
      invitationToken
      userRoles {
        id
        workspaces
        applyOn
        companyRole {
          id
          name
          permissions
        }
      }
    }
  }
}
    `;
export const useUserListQuery = <
      TData = UserListQuery,
      TError = unknown
    >(
      variables?: UserListQueryVariables,
      options?: UseQueryOptions<UserListQuery, TError, TData>
    ) =>
    useQuery<UserListQuery, TError, TData>(
      variables === undefined ? ['UserList'] : ['UserList', variables],
      useFetcher<UserListQuery, UserListQueryVariables>(UserListDocument).bind(null, variables),
      options
    );
export const UsersIdDocument = `
    query UsersId($id: uuid = "") {
  users(where: {companyId: {_eq: $id}}) {
    id
  }
}
    `;
export const useUsersIdQuery = <
      TData = UsersIdQuery,
      TError = unknown
    >(
      variables?: UsersIdQueryVariables,
      options?: UseQueryOptions<UsersIdQuery, TError, TData>
    ) =>
    useQuery<UsersIdQuery, TError, TData>(
      variables === undefined ? ['UsersId'] : ['UsersId', variables],
      useFetcher<UsersIdQuery, UsersIdQueryVariables>(UsersIdDocument).bind(null, variables),
      options
    );
export const GetWhitelistedDomainsDocument = `
    query GetWhitelistedDomains($companyId: uuid!) {
  whitelistedDomains_by_pk(companyId: $companyId) {
    companyId
    domains
  }
}
    `;
export const useGetWhitelistedDomainsQuery = <
      TData = GetWhitelistedDomainsQuery,
      TError = unknown
    >(
      variables: GetWhitelistedDomainsQueryVariables,
      options?: UseQueryOptions<GetWhitelistedDomainsQuery, TError, TData>
    ) =>
    useQuery<GetWhitelistedDomainsQuery, TError, TData>(
      ['GetWhitelistedDomains', variables],
      useFetcher<GetWhitelistedDomainsQuery, GetWhitelistedDomainsQueryVariables>(GetWhitelistedDomainsDocument).bind(null, variables),
      options
    );
export const InviteUserDocument = `
    mutation InviteUser($companyId: String = "", $email: String = "", $firstName: String = "", $lastName: String = "", $invitedBy: String = "", $isAdmin: Boolean = false, $appUrl: String = "") {
  inviteUser(
    input: {companyId: $companyId, email: $email, firstName: $firstName, lastName: $lastName, invitedBy: $invitedBy, isAdmin: $isAdmin, appUrl: $appUrl}
  ) {
    error
    success
    id
  }
}
    `;
export const useInviteUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InviteUserMutation, TError, InviteUserMutationVariables, TContext>) =>
    useMutation<InviteUserMutation, TError, InviteUserMutationVariables, TContext>(
      ['InviteUser'],
      useFetcher<InviteUserMutation, InviteUserMutationVariables>(InviteUserDocument),
      options
    );
export const ListMetricVersionsDocument = `
    query ListMetricVersions($metricId: uuid!, $limit: Int = 10, $offset: Int) {
  metricVersions(
    where: {metricId: {_eq: $metricId}}
    limit: $limit
    offset: $offset
    order_by: {version: desc}
  ) {
    id
    metric
    metricId
    version
    changes
    createdAt
    createdBy
    updatedAt
    updatedBy
  }
}
    `;
export const useListMetricVersionsQuery = <
      TData = ListMetricVersionsQuery,
      TError = unknown
    >(
      variables: ListMetricVersionsQueryVariables,
      options?: UseQueryOptions<ListMetricVersionsQuery, TError, TData>
    ) =>
    useQuery<ListMetricVersionsQuery, TError, TData>(
      ['ListMetricVersions', variables],
      useFetcher<ListMetricVersionsQuery, ListMetricVersionsQueryVariables>(ListMetricVersionsDocument).bind(null, variables),
      options
    );
export const ManageDashboardMetricsDocument = `
    mutation ManageDashboardMetrics($dashboardId: uuid!, $metricIds: [uuid!]!) {
  delete_dashboardMetrics(
    where: {dashboardId: {_eq: $dashboardId}, metricId: {_nin: $metricIds}}
  ) {
    affected_rows
  }
}
    `;
export const useManageDashboardMetricsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ManageDashboardMetricsMutation, TError, ManageDashboardMetricsMutationVariables, TContext>) =>
    useMutation<ManageDashboardMetricsMutation, TError, ManageDashboardMetricsMutationVariables, TContext>(
      ['ManageDashboardMetrics'],
      useFetcher<ManageDashboardMetricsMutation, ManageDashboardMetricsMutationVariables>(ManageDashboardMetricsDocument),
      options
    );
export const ManageExternalDashboardMetricsDocument = `
    mutation ManageExternalDashboardMetrics($externalDashboardId: uuid = "", $externalMetricIds: [uuid!] = "") {
  delete_externalDashboardMetrics(
    where: {externalDashboardId: {_eq: $externalDashboardId}, externalMetricId: {_nin: $externalMetricIds}}
  ) {
    affected_rows
  }
}
    `;
export const useManageExternalDashboardMetricsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ManageExternalDashboardMetricsMutation, TError, ManageExternalDashboardMetricsMutationVariables, TContext>) =>
    useMutation<ManageExternalDashboardMetricsMutation, TError, ManageExternalDashboardMetricsMutationVariables, TContext>(
      ['ManageExternalDashboardMetrics'],
      useFetcher<ManageExternalDashboardMetricsMutation, ManageExternalDashboardMetricsMutationVariables>(ManageExternalDashboardMetricsDocument),
      options
    );
export const MarkDefaultThemeDocument = `
    mutation MarkDefaultTheme($companyId: uuid!, $themeId: uuid!) {
  update_companies_by_pk(
    pk_columns: {id: $companyId}
    _set: {defaultTheme: $themeId}
  ) {
    defaultTheme
  }
}
    `;
export const useMarkDefaultThemeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<MarkDefaultThemeMutation, TError, MarkDefaultThemeMutationVariables, TContext>) =>
    useMutation<MarkDefaultThemeMutation, TError, MarkDefaultThemeMutationVariables, TContext>(
      ['MarkDefaultTheme'],
      useFetcher<MarkDefaultThemeMutation, MarkDefaultThemeMutationVariables>(MarkDefaultThemeDocument),
      options
    );
export const MetricsListDocument = `
    query MetricsList($id: uuid = "") {
  metrics(where: {companyId: {_eq: $id}}) {
    actorId
    createdAt
    description
    id
    lock
    name
    publishType
    query
    trackLineage
    updatedAt
    companyId
    verify
    chartOption
    dbName
    inputFields
    metricQuery
    outputColumns
  }
}
    `;
export const useMetricsListQuery = <
      TData = MetricsListQuery,
      TError = unknown
    >(
      variables?: MetricsListQueryVariables,
      options?: UseQueryOptions<MetricsListQuery, TError, TData>
    ) =>
    useQuery<MetricsListQuery, TError, TData>(
      variables === undefined ? ['MetricsList'] : ['MetricsList', variables],
      useFetcher<MetricsListQuery, MetricsListQueryVariables>(MetricsListDocument).bind(null, variables),
      options
    );
export const UpdateOnboardStatusDocument = `
    mutation UpdateOnboardStatus($id: uuid = "", $isOnboarded: Boolean = false) {
  update_companies_by_pk(pk_columns: {id: $id}, _set: {isOnboarded: $isOnboarded}) {
    isOnboarded
  }
}
    `;
export const useUpdateOnboardStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateOnboardStatusMutation, TError, UpdateOnboardStatusMutationVariables, TContext>) =>
    useMutation<UpdateOnboardStatusMutation, TError, UpdateOnboardStatusMutationVariables, TContext>(
      ['UpdateOnboardStatus'],
      useFetcher<UpdateOnboardStatusMutation, UpdateOnboardStatusMutationVariables>(UpdateOnboardStatusDocument),
      options
    );
export const OnboardingWithDemoDatabaseDocument = `
    mutation OnboardingWithDemoDatabase($companyId: String!, $workspaceId: String = "") {
  onboardingWithDemoDatabase(
    input: {companyId: $companyId, workspaceId: $workspaceId}
  ) {
    status
  }
}
    `;
export const useOnboardingWithDemoDatabaseMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<OnboardingWithDemoDatabaseMutation, TError, OnboardingWithDemoDatabaseMutationVariables, TContext>) =>
    useMutation<OnboardingWithDemoDatabaseMutation, TError, OnboardingWithDemoDatabaseMutationVariables, TContext>(
      ['OnboardingWithDemoDatabase'],
      useFetcher<OnboardingWithDemoDatabaseMutation, OnboardingWithDemoDatabaseMutationVariables>(OnboardingWithDemoDatabaseDocument),
      options
    );
export const PreviewTableDocument = `
    mutation PreviewTable($tableName: String = "", $limit: Int = 10, $integrationId: String = "", $integrationName: String = "") {
  previewTable(
    input: {tableName: $tableName, limit: $limit, integrationId: $integrationId, integrationName: $integrationName}
  ) {
    data {
      data
      isError
      name
    }
    error {
      message
    }
  }
}
    `;
export const usePreviewTableMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<PreviewTableMutation, TError, PreviewTableMutationVariables, TContext>) =>
    useMutation<PreviewTableMutation, TError, PreviewTableMutationVariables, TContext>(
      ['PreviewTable'],
      useFetcher<PreviewTableMutation, PreviewTableMutationVariables>(PreviewTableDocument),
      options
    );
export const PublishExternalMetricDocument = `
    mutation PublishExternalMetric($objects: [externalDashboardMetrics_insert_input!] = []) {
  insert_externalDashboardMetrics(objects: $objects) {
    affected_rows
    returning {
      externalMetricId
    }
  }
}
    `;
export const usePublishExternalMetricMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<PublishExternalMetricMutation, TError, PublishExternalMetricMutationVariables, TContext>) =>
    useMutation<PublishExternalMetricMutation, TError, PublishExternalMetricMutationVariables, TContext>(
      ['PublishExternalMetric'],
      useFetcher<PublishExternalMetricMutation, PublishExternalMetricMutationVariables>(PublishExternalMetricDocument),
      options
    );
export const QueryExternalMetricDocument = `
    query QueryExternalMetric($id: String = "", $clientId: String = "", $globalFilters: json = "", $rlsConditions: json = [], $tenancyLevel: String = "TABLE", $filterValues: json = "") {
  externalMetricQuery(
    input: {externalMetricId: $id, clientId: $clientId, globalFilters: $globalFilters, rlsConditions: $rlsConditions, tenancyLevel: $tenancyLevel, filterValues: $filterValues}
  ) {
    data
    timeTaken
  }
}
    `;
export const useQueryExternalMetricQuery = <
      TData = QueryExternalMetricQuery,
      TError = unknown
    >(
      variables?: QueryExternalMetricQueryVariables,
      options?: UseQueryOptions<QueryExternalMetricQuery, TError, TData>
    ) =>
    useQuery<QueryExternalMetricQuery, TError, TData>(
      variables === undefined ? ['QueryExternalMetric'] : ['QueryExternalMetric', variables],
      useFetcher<QueryExternalMetricQuery, QueryExternalMetricQueryVariables>(QueryExternalMetricDocument).bind(null, variables),
      options
    );
export const QueryMetricDocument = `
    query QueryMetric($id: String = "") {
  queryMetric(input: {id: $id}) {
    data
    timeTaken
  }
}
    `;
export const useQueryMetricQuery = <
      TData = QueryMetricQuery,
      TError = unknown
    >(
      variables?: QueryMetricQueryVariables,
      options?: UseQueryOptions<QueryMetricQuery, TError, TData>
    ) =>
    useQuery<QueryMetricQuery, TError, TData>(
      variables === undefined ? ['QueryMetric'] : ['QueryMetric', variables],
      useFetcher<QueryMetricQuery, QueryMetricQueryVariables>(QueryMetricDocument).bind(null, variables),
      options
    );
export const ReInviteUserDocument = `
    mutation ReInviteUser($id: String = "", $appUrl: String = "") {
  reInviteUser(input: {id: $id, appUrl: $appUrl}) {
    error
    success
  }
}
    `;
export const useReInviteUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ReInviteUserMutation, TError, ReInviteUserMutationVariables, TContext>) =>
    useMutation<ReInviteUserMutation, TError, ReInviteUserMutationVariables, TContext>(
      ['ReInviteUser'],
      useFetcher<ReInviteUserMutation, ReInviteUserMutationVariables>(ReInviteUserDocument),
      options
    );
export const ResetCacheDataDocument = `
    mutation ResetCacheData($workspaceId: String = "") {
  resetCompanyRedisData(input: {workspaceId: $workspaceId}) {
    success
    error {
      message
    }
  }
}
    `;
export const useResetCacheDataMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResetCacheDataMutation, TError, ResetCacheDataMutationVariables, TContext>) =>
    useMutation<ResetCacheDataMutation, TError, ResetCacheDataMutationVariables, TContext>(
      ['ResetCacheData'],
      useFetcher<ResetCacheDataMutation, ResetCacheDataMutationVariables>(ResetCacheDataDocument),
      options
    );
export const ResetDemoConfigDocument = `
    mutation ResetDemoConfig($id: uuid!) {
  delete_demoTheme_by_pk(id: $id) {
    id
  }
}
    `;
export const useResetDemoConfigMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResetDemoConfigMutation, TError, ResetDemoConfigMutationVariables, TContext>) =>
    useMutation<ResetDemoConfigMutation, TError, ResetDemoConfigMutationVariables, TContext>(
      ['ResetDemoConfig'],
      useFetcher<ResetDemoConfigMutation, ResetDemoConfigMutationVariables>(ResetDemoConfigDocument),
      options
    );
export const ResetPasswordDocument = `
    mutation ResetPassword($password: String = "", $token: String = "") {
  resetPassword(input: {token: $token, password: $password}) {
    data {
      companyId
      email
      firstName
      id
      lastName
      token
      workspaceId
    }
    error {
      message
    }
  }
}
    `;
export const useResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>) =>
    useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      ['ResetPassword'],
      useFetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument),
      options
    );
export const ResetThemeDocument = `
    mutation ResetTheme($id: uuid!) {
  delete_themes_by_pk(id: $id) {
    id
  }
}
    `;
export const useResetThemeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResetThemeMutation, TError, ResetThemeMutationVariables, TContext>) =>
    useMutation<ResetThemeMutation, TError, ResetThemeMutationVariables, TContext>(
      ['ResetTheme'],
      useFetcher<ResetThemeMutation, ResetThemeMutationVariables>(ResetThemeDocument),
      options
    );
export const ResizeDashboardMetricDocument = `
    mutation ResizeDashboardMetric($id: uuid!, $width: Int!, $height: Int!, $xAxis: Int!, $yAxis: Int!) {
  update_dashboardMetrics_by_pk(
    pk_columns: {id: $id}
    _set: {width: $width, height: $height, xAxis: $xAxis, yAxis: $yAxis}
  ) {
    width
    height
    xAxis
    yAxis
  }
}
    `;
export const useResizeDashboardMetricMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResizeDashboardMetricMutation, TError, ResizeDashboardMetricMutationVariables, TContext>) =>
    useMutation<ResizeDashboardMetricMutation, TError, ResizeDashboardMetricMutationVariables, TContext>(
      ['ResizeDashboardMetric'],
      useFetcher<ResizeDashboardMetricMutation, ResizeDashboardMetricMutationVariables>(ResizeDashboardMetricDocument),
      options
    );
export const SaveCompanySubsetDocument = `
    mutation SaveCompanySubset($companyId: uuid = "", $tableList: jsonb = [], $isAllowMetricCreation: Boolean = false, $isAllowMetricDeletion: Boolean = false, $isAllowMetricUpdation: Boolean = false, $isAllowChangeLayout: Boolean = false, $isAllowEmailReports: Boolean = false, $workspaceId: uuid = "") {
  insert_companySubsetTables_one(
    object: {companyId: $companyId, tableList: $tableList, isAllowMetricCreation: $isAllowMetricCreation, isAllowMetricDeletion: $isAllowMetricDeletion, isAllowMetricUpdation: $isAllowMetricUpdation, isAllowChangeLayout: $isAllowChangeLayout, isAllowEmailReports: $isAllowEmailReports, workspaceId: $workspaceId}
    on_conflict: {constraint: companySubsetTables_workspaceId_key, update_columns: [tableList, isAllowMetricCreation, isAllowMetricDeletion, isAllowMetricUpdation, isAllowChangeLayout, isAllowEmailReports]}
  ) {
    companyId
    id
    tableList
  }
}
    `;
export const useSaveCompanySubsetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveCompanySubsetMutation, TError, SaveCompanySubsetMutationVariables, TContext>) =>
    useMutation<SaveCompanySubsetMutation, TError, SaveCompanySubsetMutationVariables, TContext>(
      ['SaveCompanySubset'],
      useFetcher<SaveCompanySubsetMutation, SaveCompanySubsetMutationVariables>(SaveCompanySubsetDocument),
      options
    );
export const SaveCustomSqlColumnDocument = `
    mutation SaveCustomSqlColumn($companyIntegrationId: uuid = "", $sqlColumns: jsonb = [], $tableName: String = "") {
  insert_customSqlColumns_one(
    object: {companyIntegrationId: $companyIntegrationId, sqlColumns: $sqlColumns, tableName: $tableName}
    on_conflict: {constraint: customSqlColumns_companyIntegrationId_tableName_key, update_columns: [sqlColumns]}
  ) {
    companyIntegrationId
    id
    sqlColumns
    tableName
  }
}
    `;
export const useSaveCustomSqlColumnMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveCustomSqlColumnMutation, TError, SaveCustomSqlColumnMutationVariables, TContext>) =>
    useMutation<SaveCustomSqlColumnMutation, TError, SaveCustomSqlColumnMutationVariables, TContext>(
      ['SaveCustomSqlColumn'],
      useFetcher<SaveCustomSqlColumnMutation, SaveCustomSqlColumnMutationVariables>(SaveCustomSqlColumnDocument),
      options
    );
export const SaveDemoConfigDocument = `
    mutation SaveDemoConfig($object: demoTheme_insert_input!) {
  insert_demoTheme_one(
    object: $object
    on_conflict: {constraint: demoTheme_companyId_key, update_columns: [dashboardTitle, primaryColor, logoUrl, textColor, navbarColor, highlightColor, settings]}
  ) {
    id
    companyId
    primaryColor
    dashboardTitle
    textColor
    logoUrl
    navbarColor
    highlightColor
    settings
  }
}
    `;
export const useSaveDemoConfigMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveDemoConfigMutation, TError, SaveDemoConfigMutationVariables, TContext>) =>
    useMutation<SaveDemoConfigMutation, TError, SaveDemoConfigMutationVariables, TContext>(
      ['SaveDemoConfig'],
      useFetcher<SaveDemoConfigMutation, SaveDemoConfigMutationVariables>(SaveDemoConfigDocument),
      options
    );
export const SaveOrgDatabaseListDocument = `
    mutation SaveOrgDatabaseList($companyId: uuid = "", $databaseList: json = []) {
  insert_companyDatabases(
    objects: {companyId: $companyId, databaseList: $databaseList}
    on_conflict: {constraint: companyDatabases_pkey, update_columns: databaseList}
  ) {
    affected_rows
  }
}
    `;
export const useSaveOrgDatabaseListMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveOrgDatabaseListMutation, TError, SaveOrgDatabaseListMutationVariables, TContext>) =>
    useMutation<SaveOrgDatabaseListMutation, TError, SaveOrgDatabaseListMutationVariables, TContext>(
      ['SaveOrgDatabaseList'],
      useFetcher<SaveOrgDatabaseListMutation, SaveOrgDatabaseListMutationVariables>(SaveOrgDatabaseListDocument),
      options
    );
export const SaveSharingSettingsDocument = `
    mutation SaveSharingSettings($companyId: uuid = "", $fromAddress: String = "", $host: String = "", $password: String = "", $port: Int = 10, $replyToAddress: String = "", $secure: Boolean = false, $username: String = "") {
  insert_sharingSettings_one(
    object: {companyId: $companyId, fromAddress: $fromAddress, host: $host, password: $password, port: $port, replyToAddress: $replyToAddress, secure: $secure, username: $username}
    on_conflict: {constraint: sharingSettings_companyId_key, update_columns: [fromAddress, host, password, port, replyToAddress, secure, username]}
  ) {
    companyId
    fromAddress
    host
    id
    password
    port
    replyToAddress
    secure
    username
  }
}
    `;
export const useSaveSharingSettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveSharingSettingsMutation, TError, SaveSharingSettingsMutationVariables, TContext>) =>
    useMutation<SaveSharingSettingsMutation, TError, SaveSharingSettingsMutationVariables, TContext>(
      ['SaveSharingSettings'],
      useFetcher<SaveSharingSettingsMutation, SaveSharingSettingsMutationVariables>(SaveSharingSettingsDocument),
      options
    );
export const SaveThemeDocument = `
    mutation SaveTheme($object: themes_insert_input!) {
  insert_themes_one(object: $object) {
    id
    companyId
    general
    dashboard
    cardTitle
    cardDescription
    chart
    cardCustomization
    chartCustomization
  }
}
    `;
export const useSaveThemeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveThemeMutation, TError, SaveThemeMutationVariables, TContext>) =>
    useMutation<SaveThemeMutation, TError, SaveThemeMutationVariables, TContext>(
      ['SaveTheme'],
      useFetcher<SaveThemeMutation, SaveThemeMutationVariables>(SaveThemeDocument),
      options
    );
export const SaveWhitelistedDomainsDocument = `
    mutation SaveWhitelistedDomains($companyId: uuid!, $domains: jsonb) {
  insert_whitelistedDomains_one(
    object: {companyId: $companyId, domains: $domains}
    on_conflict: {constraint: whitelistedDomains_pkey, update_columns: [domains]}
  ) {
    companyId
    domains
  }
}
    `;
export const useSaveWhitelistedDomainsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveWhitelistedDomainsMutation, TError, SaveWhitelistedDomainsMutationVariables, TContext>) =>
    useMutation<SaveWhitelistedDomainsMutation, TError, SaveWhitelistedDomainsMutationVariables, TContext>(
      ['SaveWhitelistedDomains'],
      useFetcher<SaveWhitelistedDomainsMutation, SaveWhitelistedDomainsMutationVariables>(SaveWhitelistedDomainsDocument),
      options
    );
export const SaveWorkspaceThemeDocument = `
    mutation SaveWorkspaceTheme($themeId: uuid = "", $workspaceId: uuid = "") {
  insert_workspaceThemes_one(
    object: {themeId: $themeId, workspaceId: $workspaceId}
    on_conflict: {constraint: workspaceThemes_workspaceId_key, update_columns: [themeId]}
  ) {
    id
    themeId
    workspaceId
  }
}
    `;
export const useSaveWorkspaceThemeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveWorkspaceThemeMutation, TError, SaveWorkspaceThemeMutationVariables, TContext>) =>
    useMutation<SaveWorkspaceThemeMutation, TError, SaveWorkspaceThemeMutationVariables, TContext>(
      ['SaveWorkspaceTheme'],
      useFetcher<SaveWorkspaceThemeMutation, SaveWorkspaceThemeMutationVariables>(SaveWorkspaceThemeDocument),
      options
    );
export const SignInDocument = `
    mutation SignIn($email: String!, $password: String!) {
  signIn(input: {email: $email, password: $password}) {
    error
    token
    email
    firstName
    id
    lastName
    companyId
    userRoles {
      id
      workspaces
      applyOn
      companyRole {
        id
        name
        permissions
      }
    }
  }
}
    `;
export const useSignInMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignInMutation, TError, SignInMutationVariables, TContext>) =>
    useMutation<SignInMutation, TError, SignInMutationVariables, TContext>(
      ['SignIn'],
      useFetcher<SignInMutation, SignInMutationVariables>(SignInDocument),
      options
    );
export const SignUpDocument = `
    mutation SignUp($companyName: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  signUp(
    input: {companyName: $companyName, email: $email, firstName: $firstName, lastName: $lastName, password: $password}
  ) {
    error {
      code
      message
    }
    success {
      code
      message
    }
    token
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      ['SignUp'],
      useFetcher<SignUpMutation, SignUpMutationVariables>(SignUpDocument),
      options
    );
export const SignUpVerificationDocument = `
    mutation SignUpVerification($token: String = "") {
  signUpVerification(input: {token: $token}) {
    companyId
    companyName
    email
    error {
      code
      message
    }
    firstName
    id
    lastName
    token
    workspaceId
    userRoles {
      id
      companyRole {
        id
        name
        permissions
      }
    }
  }
}
    `;
export const useSignUpVerificationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignUpVerificationMutation, TError, SignUpVerificationMutationVariables, TContext>) =>
    useMutation<SignUpVerificationMutation, TError, SignUpVerificationMutationVariables, TContext>(
      ['SignUpVerification'],
      useFetcher<SignUpVerificationMutation, SignUpVerificationMutationVariables>(SignUpVerificationDocument),
      options
    );
export const SourceSchemaDocument = `
    query SourceSchema($sourceId: String = "") {
  sourceSchema(input: {sourceId: $sourceId}) {
    data
  }
}
    `;
export const useSourceSchemaQuery = <
      TData = SourceSchemaQuery,
      TError = unknown
    >(
      variables?: SourceSchemaQueryVariables,
      options?: UseQueryOptions<SourceSchemaQuery, TError, TData>
    ) =>
    useQuery<SourceSchemaQuery, TError, TData>(
      variables === undefined ? ['SourceSchema'] : ['SourceSchema', variables],
      useFetcher<SourceSchemaQuery, SourceSchemaQueryVariables>(SourceSchemaDocument).bind(null, variables),
      options
    );
export const SqlQueryDocument = `
    mutation SqlQuery($id: String = "", $query: String = "", $dbName: String = "", $filters: json, $disableStringify: Boolean = true) {
  sqlQuery(
    input: {id: $id, query: $query, dbName: $dbName, filters: $filters, disableStringify: $disableStringify}
  ) {
    data
    timeTaken
    metaData
  }
}
    `;
export const useSqlQueryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SqlQueryMutation, TError, SqlQueryMutationVariables, TContext>) =>
    useMutation<SqlQueryMutation, TError, SqlQueryMutationVariables, TContext>(
      ['SqlQuery'],
      useFetcher<SqlQueryMutation, SqlQueryMutationVariables>(SqlQueryDocument),
      options
    );
export const SyncConnectionDocument = `
    mutation SyncConnection($connectionId: String = "") {
  syncConnection(input: {connectionId: $connectionId}) {
    data
  }
}
    `;
export const useSyncConnectionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SyncConnectionMutation, TError, SyncConnectionMutationVariables, TContext>) =>
    useMutation<SyncConnectionMutation, TError, SyncConnectionMutationVariables, TContext>(
      ['SyncConnection'],
      useFetcher<SyncConnectionMutation, SyncConnectionMutationVariables>(SyncConnectionDocument),
      options
    );
export const TestCompanyIntegrationDocument = `
    mutation TestCompanyIntegration($credentials: json = "", $dbName: String = "Snowflake") {
  testIntegration(input: {credentials: $credentials, dbName: $dbName}) {
    result {
      message
      status
    }
  }
}
    `;
export const useTestCompanyIntegrationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TestCompanyIntegrationMutation, TError, TestCompanyIntegrationMutationVariables, TContext>) =>
    useMutation<TestCompanyIntegrationMutation, TError, TestCompanyIntegrationMutationVariables, TContext>(
      ['TestCompanyIntegration'],
      useFetcher<TestCompanyIntegrationMutation, TestCompanyIntegrationMutationVariables>(TestCompanyIntegrationDocument),
      options
    );
export const TestDestinationDocument = `
    mutation TestDestination($body: json = "") {
  testDestination(input: {body: $body}) {
    data
  }
}
    `;
export const useTestDestinationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TestDestinationMutation, TError, TestDestinationMutationVariables, TContext>) =>
    useMutation<TestDestinationMutation, TError, TestDestinationMutationVariables, TContext>(
      ['TestDestination'],
      useFetcher<TestDestinationMutation, TestDestinationMutationVariables>(TestDestinationDocument),
      options
    );
export const TestSmtpSettingsDocument = `
    mutation TestSmtpSettings($host: String = "", $password: String = "", $port: Int = 10, $secure: Boolean = false, $username: String = "") {
  testSmtpSettings(
    input: {host: $host, password: $password, port: $port, secure: $secure, username: $username}
  ) {
    success
  }
}
    `;
export const useTestSmtpSettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TestSmtpSettingsMutation, TError, TestSmtpSettingsMutationVariables, TContext>) =>
    useMutation<TestSmtpSettingsMutation, TError, TestSmtpSettingsMutationVariables, TContext>(
      ['TestSmtpSettings'],
      useFetcher<TestSmtpSettingsMutation, TestSmtpSettingsMutationVariables>(TestSmtpSettingsDocument),
      options
    );
export const TestSourceDocument = `
    mutation TestSource($body: json = "") {
  testSource(input: {body: $body}) {
    data
  }
}
    `;
export const useTestSourceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TestSourceMutation, TError, TestSourceMutationVariables, TContext>) =>
    useMutation<TestSourceMutation, TError, TestSourceMutationVariables, TContext>(
      ['TestSource'],
      useFetcher<TestSourceMutation, TestSourceMutationVariables>(TestSourceDocument),
      options
    );
export const UnarchiveClientMetricDocument = `
    mutation UnarchiveClientMetric($id: uuid!, $clientId: String!) {
  delete_clientDeletedMetrics(
    where: {externalMetricId: {_eq: $id}, clientId: {_eq: $clientId}}
  ) {
    returning {
      clientId
      externalMetricId
    }
  }
}
    `;
export const useUnarchiveClientMetricMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UnarchiveClientMetricMutation, TError, UnarchiveClientMetricMutationVariables, TContext>) =>
    useMutation<UnarchiveClientMetricMutation, TError, UnarchiveClientMetricMutationVariables, TContext>(
      ['UnarchiveClientMetric'],
      useFetcher<UnarchiveClientMetricMutation, UnarchiveClientMetricMutationVariables>(UnarchiveClientMetricDocument),
      options
    );
export const UpdateApiTokenDocument = `
    mutation UpdateAPIToken($id: uuid!, $name: String!, $description: String, $scope: String!, $isExpired: Boolean!, $updatedBy: uuid!) {
  update_apiTokens_by_pk(
    pk_columns: {id: $id}
    _set: {name: $name, description: $description, isExpired: $isExpired, scope: $scope, updatedBy: $updatedBy}
  ) {
    id
    name
    description
    scope
    isExpired
    companyId
    createdAt
    updatedBy
  }
}
    `;
export const useUpdateApiTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateApiTokenMutation, TError, UpdateApiTokenMutationVariables, TContext>) =>
    useMutation<UpdateApiTokenMutation, TError, UpdateApiTokenMutationVariables, TContext>(
      ['UpdateAPIToken'],
      useFetcher<UpdateApiTokenMutation, UpdateApiTokenMutationVariables>(UpdateApiTokenDocument),
      options
    );
export const UpdateCacheEnableDocument = `
    mutation UpdateCacheEnable($isEnabled: Boolean = false, $workspaceId: uuid = "") {
  update_companyRedis_by_pk(
    pk_columns: {workspaceId: $workspaceId}
    _set: {isEnabled: $isEnabled}
  ) {
    isEnabled
  }
}
    `;
export const useUpdateCacheEnableMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCacheEnableMutation, TError, UpdateCacheEnableMutationVariables, TContext>) =>
    useMutation<UpdateCacheEnableMutation, TError, UpdateCacheEnableMutationVariables, TContext>(
      ['UpdateCacheEnable'],
      useFetcher<UpdateCacheEnableMutation, UpdateCacheEnableMutationVariables>(UpdateCacheEnableDocument),
      options
    );
export const UpdateClickActionsDocument = `
    mutation UpdateClickActions($id: uuid = "", $clickActions: json = "") {
  update_externalMetrics_by_pk(
    pk_columns: {id: $id}
    _set: {clickActions: $clickActions}
  ) {
    id
  }
}
    `;
export const useUpdateClickActionsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateClickActionsMutation, TError, UpdateClickActionsMutationVariables, TContext>) =>
    useMutation<UpdateClickActionsMutation, TError, UpdateClickActionsMutationVariables, TContext>(
      ['UpdateClickActions'],
      useFetcher<UpdateClickActionsMutation, UpdateClickActionsMutationVariables>(UpdateClickActionsDocument),
      options
    );
export const UpdateCompanyDocument = `
    mutation UpdateCompany($id: uuid = "", $website: String = "", $name: String = "") {
  update_companies_by_pk(
    pk_columns: {id: $id}
    _set: {website: $website, name: $name}
  ) {
    website
    name
  }
}
    `;
export const useUpdateCompanyMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCompanyMutation, TError, UpdateCompanyMutationVariables, TContext>) =>
    useMutation<UpdateCompanyMutation, TError, UpdateCompanyMutationVariables, TContext>(
      ['UpdateCompany'],
      useFetcher<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument),
      options
    );
export const UpdateCompanyIntegrationCredsDocument = `
    mutation UpdateCompanyIntegrationCreds($credentials: jsonb = "", $id: uuid = "", $isEncrypted: Boolean = true, $updatedAt: timestamptz = "now()", $isAuthenticated: Boolean = true) {
  update_companyIntegrations_by_pk(
    pk_columns: {id: $id}
    _set: {credentials: $credentials, isEncrypted: $isEncrypted, updatedAt: $updatedAt, isAuthenticated: $isAuthenticated}
  ) {
    id
  }
}
    `;
export const useUpdateCompanyIntegrationCredsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCompanyIntegrationCredsMutation, TError, UpdateCompanyIntegrationCredsMutationVariables, TContext>) =>
    useMutation<UpdateCompanyIntegrationCredsMutation, TError, UpdateCompanyIntegrationCredsMutationVariables, TContext>(
      ['UpdateCompanyIntegrationCreds'],
      useFetcher<UpdateCompanyIntegrationCredsMutation, UpdateCompanyIntegrationCredsMutationVariables>(UpdateCompanyIntegrationCredsDocument),
      options
    );
export const UpdateCompanyRoleDocument = `
    mutation UpdateCompanyRole($id: uuid! = "", $set: companyRoles_set_input!) {
  update_companyRoles_by_pk(pk_columns: {id: $id}, _set: $set) {
    id
  }
}
    `;
export const useUpdateCompanyRoleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCompanyRoleMutation, TError, UpdateCompanyRoleMutationVariables, TContext>) =>
    useMutation<UpdateCompanyRoleMutation, TError, UpdateCompanyRoleMutationVariables, TContext>(
      ['UpdateCompanyRole'],
      useFetcher<UpdateCompanyRoleMutation, UpdateCompanyRoleMutationVariables>(UpdateCompanyRoleDocument),
      options
    );
export const UpdateTenancyLevelDocument = `
    mutation updateTenancyLevel($id: uuid = "", $tenancyLevel: String = "") {
  update_companies_by_pk(
    pk_columns: {id: $id}
    _set: {tenancyLevel: $tenancyLevel}
  ) {
    tenancyLevel
  }
}
    `;
export const useUpdateTenancyLevelMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateTenancyLevelMutation, TError, UpdateTenancyLevelMutationVariables, TContext>) =>
    useMutation<UpdateTenancyLevelMutation, TError, UpdateTenancyLevelMutationVariables, TContext>(
      ['updateTenancyLevel'],
      useFetcher<UpdateTenancyLevelMutation, UpdateTenancyLevelMutationVariables>(UpdateTenancyLevelDocument),
      options
    );
export const UpdateDashboardDocument = `
    mutation UpdateDashboard($id: uuid!, $name: String!) {
  update_dashboards_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
    name
  }
}
    `;
export const useUpdateDashboardMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateDashboardMutation, TError, UpdateDashboardMutationVariables, TContext>) =>
    useMutation<UpdateDashboardMutation, TError, UpdateDashboardMutationVariables, TContext>(
      ['UpdateDashboard'],
      useFetcher<UpdateDashboardMutation, UpdateDashboardMutationVariables>(UpdateDashboardDocument),
      options
    );
export const UpdateDashboardMetricsDocument = `
    mutation UpdateDashboardMetrics($metricId: uuid!, $objects: [dashboardMetrics_insert_input!]!) {
  delete_dashboardMetrics(where: {metricId: {_eq: $metricId}}) {
    returning {
      id
    }
  }
  insert_dashboardMetrics(objects: $objects) {
    returning {
      id
    }
  }
}
    `;
export const useUpdateDashboardMetricsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateDashboardMetricsMutation, TError, UpdateDashboardMetricsMutationVariables, TContext>) =>
    useMutation<UpdateDashboardMetricsMutation, TError, UpdateDashboardMetricsMutationVariables, TContext>(
      ['UpdateDashboardMetrics'],
      useFetcher<UpdateDashboardMetricsMutation, UpdateDashboardMetricsMutationVariables>(UpdateDashboardMetricsDocument),
      options
    );
export const UpdateDataSecuritySettingsDocument = `
    mutation UpdateDataSecuritySettings($id: uuid = "", $dataSecuritySettings: jsonb = "") {
  update_externalMetrics_by_pk(
    pk_columns: {id: $id}
    _set: {dataSecuritySettings: $dataSecuritySettings}
  ) {
    id
  }
}
    `;
export const useUpdateDataSecuritySettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateDataSecuritySettingsMutation, TError, UpdateDataSecuritySettingsMutationVariables, TContext>) =>
    useMutation<UpdateDataSecuritySettingsMutation, TError, UpdateDataSecuritySettingsMutationVariables, TContext>(
      ['UpdateDataSecuritySettings'],
      useFetcher<UpdateDataSecuritySettingsMutation, UpdateDataSecuritySettingsMutationVariables>(UpdateDataSecuritySettingsDocument),
      options
    );
export const UpdateDestinationDocument = `
    mutation UpdateDestination($body: json = "") {
  updateDestination(input: {body: $body}) {
    data
  }
}
    `;
export const useUpdateDestinationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateDestinationMutation, TError, UpdateDestinationMutationVariables, TContext>) =>
    useMutation<UpdateDestinationMutation, TError, UpdateDestinationMutationVariables, TContext>(
      ['UpdateDestination'],
      useFetcher<UpdateDestinationMutation, UpdateDestinationMutationVariables>(UpdateDestinationDocument),
      options
    );
export const UpdateDrillDownSettingsDocument = `
    mutation UpdateDrillDownSettings($id: uuid = "", $drillDownSettings: jsonb = "") {
  update_externalMetrics_by_pk(
    pk_columns: {id: $id}
    _set: {drillDownSettings: $drillDownSettings}
  ) {
    id
  }
}
    `;
export const useUpdateDrillDownSettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateDrillDownSettingsMutation, TError, UpdateDrillDownSettingsMutationVariables, TContext>) =>
    useMutation<UpdateDrillDownSettingsMutation, TError, UpdateDrillDownSettingsMutationVariables, TContext>(
      ['UpdateDrillDownSettings'],
      useFetcher<UpdateDrillDownSettingsMutation, UpdateDrillDownSettingsMutationVariables>(UpdateDrillDownSettingsDocument),
      options
    );
export const UpdateExternalDashboardFiltersDocument = `
    mutation UpdateExternalDashboardFilters($id: uuid = "", $filters: jsonb = []) {
  update_externalDashboards_by_pk(
    pk_columns: {id: $id}
    _set: {filters: $filters}
  ) {
    id
    filters
    name
    externalDashboardId
    companyId
    defaultClientId
  }
}
    `;
export const useUpdateExternalDashboardFiltersMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateExternalDashboardFiltersMutation, TError, UpdateExternalDashboardFiltersMutationVariables, TContext>) =>
    useMutation<UpdateExternalDashboardFiltersMutation, TError, UpdateExternalDashboardFiltersMutationVariables, TContext>(
      ['UpdateExternalDashboardFilters'],
      useFetcher<UpdateExternalDashboardFiltersMutation, UpdateExternalDashboardFiltersMutationVariables>(UpdateExternalDashboardFiltersDocument),
      options
    );
export const UpdateExternalDashboardLayoutDocument = `
    mutation UpdateExternalDashboardLayout($id: uuid = "", $layout: jsonb = "") {
  update_externalDashboards_by_pk(pk_columns: {id: $id}, _set: {layout: $layout}) {
    layout
  }
}
    `;
export const useUpdateExternalDashboardLayoutMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateExternalDashboardLayoutMutation, TError, UpdateExternalDashboardLayoutMutationVariables, TContext>) =>
    useMutation<UpdateExternalDashboardLayoutMutation, TError, UpdateExternalDashboardLayoutMutationVariables, TContext>(
      ['UpdateExternalDashboardLayout'],
      useFetcher<UpdateExternalDashboardLayoutMutation, UpdateExternalDashboardLayoutMutationVariables>(UpdateExternalDashboardLayoutDocument),
      options
    );
export const UpdateExternalDashboardMetricsDocument = `
    mutation UpdateExternalDashboardMetrics($externalMetricId: uuid = "", $externalDashboardMetricsObjects: [externalDashboardMetrics_insert_input!] = {externalMetricId: "", externalDashboardId: ""}) {
  delete_externalDashboardMetrics(
    where: {externalMetricId: {_eq: $externalMetricId}}
  ) {
    returning {
      externalDashboardId
    }
  }
  insert_externalDashboardMetrics(
    objects: $externalDashboardMetricsObjects
    on_conflict: {constraint: externalDashboardMetrics_pkey, update_columns: externalDashboardId}
  ) {
    returning {
      externalDashboardId
    }
  }
}
    `;
export const useUpdateExternalDashboardMetricsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateExternalDashboardMetricsMutation, TError, UpdateExternalDashboardMetricsMutationVariables, TContext>) =>
    useMutation<UpdateExternalDashboardMetricsMutation, TError, UpdateExternalDashboardMetricsMutationVariables, TContext>(
      ['UpdateExternalDashboardMetrics'],
      useFetcher<UpdateExternalDashboardMetricsMutation, UpdateExternalDashboardMetricsMutationVariables>(UpdateExternalDashboardMetricsDocument),
      options
    );
export const UpdateExternalDashboardThemeDocument = `
    mutation UpdateExternalDashboardTheme($id: uuid!, $name: String!, $colors: jsonb!) {
  update_externalDashboardThemes_by_pk(
    pk_columns: {id: $id}
    _set: {name: $name, colors: $colors}
  ) {
    id
    name
    colors
  }
}
    `;
export const useUpdateExternalDashboardThemeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateExternalDashboardThemeMutation, TError, UpdateExternalDashboardThemeMutationVariables, TContext>) =>
    useMutation<UpdateExternalDashboardThemeMutation, TError, UpdateExternalDashboardThemeMutationVariables, TContext>(
      ['UpdateExternalDashboardTheme'],
      useFetcher<UpdateExternalDashboardThemeMutation, UpdateExternalDashboardThemeMutationVariables>(UpdateExternalDashboardThemeDocument),
      options
    );
export const UpdateExternalDashboardThemeClientsDocument = `
    mutation UpdateExternalDashboardThemeClients($idsToDelete: [uuid!]!, $themeClients: [externalDashboardThemeClients_insert_input!]!) {
  delete_externalDashboardThemeClients(where: {id: {_in: $idsToDelete}}) {
    returning {
      id
    }
  }
  insert_externalDashboardThemeClients(objects: $themeClients) {
    returning {
      id
      clientId
      clientName
    }
  }
}
    `;
export const useUpdateExternalDashboardThemeClientsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateExternalDashboardThemeClientsMutation, TError, UpdateExternalDashboardThemeClientsMutationVariables, TContext>) =>
    useMutation<UpdateExternalDashboardThemeClientsMutation, TError, UpdateExternalDashboardThemeClientsMutationVariables, TContext>(
      ['UpdateExternalDashboardThemeClients'],
      useFetcher<UpdateExternalDashboardThemeClientsMutation, UpdateExternalDashboardThemeClientsMutationVariables>(UpdateExternalDashboardThemeClientsDocument),
      options
    );
export const UpdateDatasetDocument = `
    mutation UpdateDataset($id: uuid = "", $type: String = "", $query: String = "", $columns: jsonb = "", $clientColumn: String = "") {
  update_externalDatasets_by_pk(
    pk_columns: {id: $id}
    _set: {updatedAt: "now()", type: $type, query: $query, columns: $columns, clientColumn: $clientColumn}
  ) {
    id
  }
}
    `;
export const useUpdateDatasetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateDatasetMutation, TError, UpdateDatasetMutationVariables, TContext>) =>
    useMutation<UpdateDatasetMutation, TError, UpdateDatasetMutationVariables, TContext>(
      ['UpdateDataset'],
      useFetcher<UpdateDatasetMutation, UpdateDatasetMutationVariables>(UpdateDatasetDocument),
      options
    );
export const UpdateExternalMetricDocument = `
    mutation updateExternalMetric($id: uuid = "", $set: externalMetrics_set_input) {
  update_externalMetrics_by_pk(pk_columns: {id: $id}, _set: $set) {
    id
    updatedAt
    name
  }
}
    `;
export const useUpdateExternalMetricMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateExternalMetricMutation, TError, UpdateExternalMetricMutationVariables, TContext>) =>
    useMutation<UpdateExternalMetricMutation, TError, UpdateExternalMetricMutationVariables, TContext>(
      ['updateExternalMetric'],
      useFetcher<UpdateExternalMetricMutation, UpdateExternalMetricMutationVariables>(UpdateExternalMetricDocument),
      options
    );
export const UpdateExternalMetricRlsFiltersDocument = `
    mutation UpdateExternalMetricRlsFilters($metricId: uuid!, $objects: [externalMetricsRlsFilters_insert_input!]!) {
  delete_externalMetricsRlsFilters(where: {externalMetricId: {_eq: $metricId}}) {
    returning {
      id
    }
  }
  insert_externalMetricsRlsFilters(objects: $objects) {
    returning {
      companyRlsFilterId
      externalMetricId
      id
    }
  }
}
    `;
export const useUpdateExternalMetricRlsFiltersMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateExternalMetricRlsFiltersMutation, TError, UpdateExternalMetricRlsFiltersMutationVariables, TContext>) =>
    useMutation<UpdateExternalMetricRlsFiltersMutation, TError, UpdateExternalMetricRlsFiltersMutationVariables, TContext>(
      ['UpdateExternalMetricRlsFilters'],
      useFetcher<UpdateExternalMetricRlsFiltersMutation, UpdateExternalMetricRlsFiltersMutationVariables>(UpdateExternalMetricRlsFiltersDocument),
      options
    );
export const UpdateMetricDocument = `
    mutation UpdateMetric($id: uuid = "", $chartOption: jsonb = "", $description: String = "", $name: String = "", $publishType: String = "", $query: String = "", $updatedAt: timestamptz = "now()", $companyId: uuid = "", $trackLineage: Boolean = false, $lock: Boolean = false, $verify: Boolean = false, $actorId: uuid = "", $dbName: String = "", $metricQuery: String = "", $inputFields: jsonb = "", $outputColumns: String = "") {
  update_metrics_by_pk(
    pk_columns: {id: $id}
    _set: {chartOption: $chartOption, description: $description, lock: $lock, name: $name, publishType: $publishType, query: $query, trackLineage: $trackLineage, updatedAt: $updatedAt, verify: $verify, actorId: $actorId, companyId: $companyId, dbName: $dbName, inputFields: $inputFields, metricQuery: $metricQuery, outputColumns: $outputColumns}
  ) {
    id
    updatedAt
  }
}
    `;
export const useUpdateMetricMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateMetricMutation, TError, UpdateMetricMutationVariables, TContext>) =>
    useMutation<UpdateMetricMutation, TError, UpdateMetricMutationVariables, TContext>(
      ['UpdateMetric'],
      useFetcher<UpdateMetricMutation, UpdateMetricMutationVariables>(UpdateMetricDocument),
      options
    );
export const UpdateOrganizationDocument = `
    mutation UpdateOrganization($id: uuid!, $set: organizations_set_input!) {
  update_organizations_by_pk(pk_columns: {id: $id}, _set: $set) {
    id
    tableName
    tablePrimaryKeyColumn
    tableClientNameColumn
  }
}
    `;
export const useUpdateOrganizationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateOrganizationMutation, TError, UpdateOrganizationMutationVariables, TContext>) =>
    useMutation<UpdateOrganizationMutation, TError, UpdateOrganizationMutationVariables, TContext>(
      ['UpdateOrganization'],
      useFetcher<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument),
      options
    );
export const UpdateRawCsvSettingsDocument = `
    mutation UpdateRawCsvSettings($id: uuid = "", $rawCsvSettings: jsonb = {}) {
  update_companyWorkspaces_by_pk(
    pk_columns: {id: $id}
    _set: {rawCsvSettings: $rawCsvSettings}
  ) {
    rawCsvSettings
    id
  }
}
    `;
export const useUpdateRawCsvSettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateRawCsvSettingsMutation, TError, UpdateRawCsvSettingsMutationVariables, TContext>) =>
    useMutation<UpdateRawCsvSettingsMutation, TError, UpdateRawCsvSettingsMutationVariables, TContext>(
      ['UpdateRawCsvSettings'],
      useFetcher<UpdateRawCsvSettingsMutation, UpdateRawCsvSettingsMutationVariables>(UpdateRawCsvSettingsDocument),
      options
    );
export const UpdateSecretDocument = `
    mutation updateSecret($id: uuid!, $name: String!, $value: String!) {
  update_secrets_by_pk(pk_columns: {id: $id}, _set: {name: $name, value: $value}) {
    id
  }
}
    `;
export const useUpdateSecretMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateSecretMutation, TError, UpdateSecretMutationVariables, TContext>) =>
    useMutation<UpdateSecretMutation, TError, UpdateSecretMutationVariables, TContext>(
      ['updateSecret'],
      useFetcher<UpdateSecretMutation, UpdateSecretMutationVariables>(UpdateSecretDocument),
      options
    );
export const UpdateSourceDocument = `
    mutation UpdateSource($body: json = "") {
  updateSource(input: {body: $body}) {
    data
  }
}
    `;
export const useUpdateSourceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateSourceMutation, TError, UpdateSourceMutationVariables, TContext>) =>
    useMutation<UpdateSourceMutation, TError, UpdateSourceMutationVariables, TContext>(
      ['UpdateSource'],
      useFetcher<UpdateSourceMutation, UpdateSourceMutationVariables>(UpdateSourceDocument),
      options
    );
export const UpdateThemeDocument = `
    mutation UpdateTheme($id: uuid = "", $_set: themes_set_input = {}) {
  update_themes_by_pk(pk_columns: {id: $id}, _set: $_set) {
    cardCustomization
    chartCustomization
    cardDescription
    cardTitle
    chart
    companyId
    dashboard
    general
    id
    workspaceId
  }
}
    `;
export const useUpdateThemeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateThemeMutation, TError, UpdateThemeMutationVariables, TContext>) =>
    useMutation<UpdateThemeMutation, TError, UpdateThemeMutationVariables, TContext>(
      ['UpdateTheme'],
      useFetcher<UpdateThemeMutation, UpdateThemeMutationVariables>(UpdateThemeDocument),
      options
    );
export const UpdateUserDocument = `
    mutation UpdateUser($userId: uuid!, $isAdmin: Boolean!, $firstName: String!, $lastName: String!) {
  update_users_by_pk(
    pk_columns: {id: $userId}
    _set: {isAdmin: $isAdmin, firstName: $firstName, lastName: $lastName}
  ) {
    id
    firstName
    lastName
    isAdmin
  }
}
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      useFetcher<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument),
      options
    );
export const UpdateViewDataModelDocument = `
    mutation UpdateViewDataModel($id: String = "", $destinationId: String = "", $description: String = "", $companyId: String = "", $lineageData: jsonb = "", $query: String = "", $viewName: String = "", $dbName: String = "", $databaseName: String = "") {
  updateViewDataModel(
    input: {companyId: $companyId, description: $description, destinationId: $destinationId, id: $id, lineageData: $lineageData, query: $query, viewName: $viewName, dbName: $dbName, databaseName: $databaseName}
  ) {
    result
  }
}
    `;
export const useUpdateViewDataModelMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateViewDataModelMutation, TError, UpdateViewDataModelMutationVariables, TContext>) =>
    useMutation<UpdateViewDataModelMutation, TError, UpdateViewDataModelMutationVariables, TContext>(
      ['UpdateViewDataModel'],
      useFetcher<UpdateViewDataModelMutation, UpdateViewDataModelMutationVariables>(UpdateViewDataModelDocument),
      options
    );
export const UpdateWorkspaceDocument = `
    mutation UpdateWorkspace($id: uuid = "", $set: companyWorkspaces_set_input) {
  update_companyWorkspaces_by_pk(_set: $set, pk_columns: {id: $id}) {
    companyId
    description
    id
    name
    tenancyLevel
    creatorMode
    companyIntegrations {
      id
    }
  }
}
    `;
export const useUpdateWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateWorkspaceMutation, TError, UpdateWorkspaceMutationVariables, TContext>) =>
    useMutation<UpdateWorkspaceMutation, TError, UpdateWorkspaceMutationVariables, TContext>(
      ['UpdateWorkspace'],
      useFetcher<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(UpdateWorkspaceDocument),
      options
    );
export const UpsertMetricVersionDocument = `
    mutation UpsertMetricVersion($metricId: uuid!, $changes: String!, $version: Int!, $metric: jsonb!, $createdBy: String!, $updatedBy: String!) {
  insert_metricVersions_one(
    object: {version: $version, metricId: $metricId, changes: $changes, metric: $metric, updatedBy: $updatedBy, createdBy: $createdBy}
    on_conflict: {constraint: metricVersions_metricId_version_key, update_columns: [metric, updatedBy, changes]}
  ) {
    id
    metricId
    version
    changes
    metric
    createdAt
    createdBy
    updatedAt
    updatedBy
  }
}
    `;
export const useUpsertMetricVersionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpsertMetricVersionMutation, TError, UpsertMetricVersionMutationVariables, TContext>) =>
    useMutation<UpsertMetricVersionMutation, TError, UpsertMetricVersionMutationVariables, TContext>(
      ['UpsertMetricVersion'],
      useFetcher<UpsertMetricVersionMutation, UpsertMetricVersionMutationVariables>(UpsertMetricVersionDocument),
      options
    );