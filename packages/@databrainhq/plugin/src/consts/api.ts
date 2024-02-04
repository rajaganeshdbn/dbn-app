const selfHostedUrl = () =>
  `${window.location.protocol}//${window.location.hostname}:3000`;
export const API_BASE_URL = import.meta.env.VITE_END_POINT || selfHostedUrl();
export const DASHBOARD_PATH = '/api/v2/dashboard';
export const METRIC_PATH = '/api/v2/metric';
export const NEW_METRIC_PATH = '/api/v3/metric';

export const DASHBOARD_DATA_QUERY = 'dashboardData';

export const DASHBOARD_EMBEDDED_METRIC_PATH = `${DASHBOARD_PATH}/embeddedMetric`;
export const DASHBOARD_EMBEDDED_METRIC_QUERY = 'embeddedMetric';

export const DASHBOARD_LAYOUT_PATH = `${METRIC_PATH}/layout`;
export const DASHBOARD_LAYOUT_QUERY = 'dashboardLayout';

export const DASHBOARD_SCHEDULED_REPORT_PATH = `${DASHBOARD_PATH}/scheduledReport`;
export const DASHBOARD_SCHEDULED_REPORT_QUERY = 'dashboardScheduledReport';

export const DASHBOARD_SAVE_LAYOUT_PATH = `${METRIC_PATH}/saveLayout`;
export const DASHBOARD_SAVE_LAYOUT_MUTATION = 'saveLayout';

export const DASHBOARD_SAVE_SCHEDULED_REPORT_PATH = `${DASHBOARD_PATH}/saveScheduleReport`;
export const DASHBOARD_SAVE_SCHEDULED_REPORT_MUTATION = 'saveScheduleReport';

export const DASHBOARD_DELETE_SCHEDULED_REPORT_PATH = `${DASHBOARD_PATH}/deleteScheduleReport`;
export const DASHBOARD_DELETE_SCHEDULED_REPORT_MUTATION =
  'deleteScheduleReport';

export const DASHBOARD_CREATE_METRIC_PATH = `${DASHBOARD_PATH}/createMetric`;
export const DASHBOARD_CREATE_METRIC_MUTATION = 'createMetric';

export const DASHBOARD_UPDATE_METRIC_PATH = `${DASHBOARD_PATH}/updateMetric`;
export const DASHBOARD_UPDATE_METRIC_MUTATION = 'updateMetric';

export const DASHBOARD_UPDATE_ADMIN_METRIC_PATH = `${DASHBOARD_PATH}/updateAdminMetric`;
export const DASHBOARD_UPDATE_ADMIN_METRIC_MUTATION = 'updateAdminMetric';

export const DASHBOARD_GENERATE_METRIC_PATH = `${DASHBOARD_PATH}/generateMetric`;
export const DASHBOARD_GENERATE_METRIC_MUTATION = 'generateMetric';

export const DASHBOARD_DATASET_METRIC_PATH = `${DASHBOARD_PATH}/datasetMetricCreation`;
export const DASHBOARD_DATASET_METRIC_MUTATION = 'datasetMetricCreation';

export const DASHBOARD_PREVIEW_TABLE_PATH = `${DASHBOARD_PATH}/previewTable`;
export const DASHBOARD_PREVIEW_TABLE_MUTATION = 'previewTable';

export const DASHBOARD_GEN_METRIC_DATA_PATH = `${DASHBOARD_PATH}/generatetMetricData`;
export const DASHBOARD_GEN_METRIC_DATA_MUTATION = '/generatetMetricData';

export const DASHBOARD_CHAT_RESPONSE_PATH = `${DASHBOARD_PATH}/getOpenaiChatResponse`;
export const DASHBOARD_CHAT_RESPONSE_MUTATION = 'getOpenaiChatResponse';

export const DASHBOARD_THEME_PATH = `${DASHBOARD_PATH}/getTheme`;
export const DASHBOARD_THEME_QUERY = 'getTheme';

export const METRIC_QUERY_PATH = `${METRIC_PATH}/query`;
export const NEW_METRIC_QUERY_PATH = `${NEW_METRIC_PATH}/query`;
export const METRIC_QUERY_QUERY = 'query';

export const NEW_METRIC_DATASET_METRIC_PATH = `${NEW_METRIC_PATH}/datasetMetricCreation`;
export const NEW_METRIC_DATASET_METRIC_MUTATION = 'newDatasetMetricCreation';

export const METRIC_RAW_DOWNLOAD_SETTINGS_PATH = `${METRIC_PATH}/rawDownloadSettings`;
export const METRIC_RAW_DOWNLOAD_SETTINGS_QUERY = 'rawDownloadSettings';

export const METRIC_COLUMN_PATH = `${METRIC_PATH}/column`;
export const METRIC_COLUMN_MUTATION = 'column';

export const METRIC_UNDERLYING_DATA_PATH = `${METRIC_PATH}/underlyingData`;
export const METRIC_UNDERLYING_DATA_MUTATION = 'underlyingData';

export const METRIC_SHARE_CSV_PATH = `${METRIC_PATH}/invokeShareCsv`;
export const METRIC_SHARE_CSV_MUTATION = 'invokeShareCsv';

export const METRIC_MARK_ARCHIVED_PATH = `${METRIC_PATH}/markArchived`;
export const METRIC_MARK_ARCHIVED_MUTATION = 'markArchived';

export const METRIC_EXECUTE_PYTHON_CODE_PATH = `${METRIC_PATH}/executePython`;
export const METRIC_EXECUTE_PYTHON_CODE_MUTATION = 'executePython';

export const METRIC_DOWNLOAD_RAW_CSV_PATH = `${METRIC_PATH}/download-csv`;
