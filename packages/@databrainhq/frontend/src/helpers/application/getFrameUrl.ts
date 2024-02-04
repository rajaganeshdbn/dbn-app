const getFrameUrl = (datasource: string) => {
  let urlString: string;
  switch (datasource) {
    case 'snowflake':
      urlString =
        'https://usedatabrain.freshdesk.com/support/solutions/articles/1060000052914-snowflake';
      break;
    case 'redshift':
      urlString =
        'https://usedatabrain.freshdesk.com/support/solutions/articles/1060000052912-amazon-redshift';
      break;
    case 'bigquery':
      urlString =
        'https://usedatabrain.freshdesk.com/support/solutions/articles/1060000052915-bigquery';
      break;
    case 'mysql':
      urlString =
        'https://usedatabrain.freshdesk.com/support/solutions/articles/1060000052916-mysql';
      break;
    case 'postgres':
      urlString =
        'https://usedatabrain.freshdesk.com/support/solutions/articles/1060000052931-postgres';
      break;
    case 'mongodb':
      urlString =
        'https://usedatabrain.freshdesk.com/support/solutions/articles/1060000052932-mongodb';
      break;
    case 'elasticsearch':
      urlString =
        'https://usedatabrain.freshdesk.com/support/solutions/articles/1060000052933-elasticsearch';
      break;
    case 'databricks':
      urlString =
        'https://usedatabrain.freshdesk.com/support/solutions/articles/1060000052934-databricks';
      break;
    case 'clickhouse':
      urlString =
        'https://usedatabrain.freshdesk.com/support/solutions/articles/1060000052935-clickhouse';
      break;
    default:
      urlString =
        'https://usedatabrain.freshdesk.com/support/solutions/articles/1060000052914-snowflake';
  }
  return urlString;
};

export default getFrameUrl;
