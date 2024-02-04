/* eslint-disable import/prefer-default-export */
export const INTEGRATION_SPECIFICATIONS = [
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
        description:
          'Pick a name to help you identify this destination in Databrain',
        placeholder: 'Redshift Destination',
        airbyte_type: 'string',
      },
      {
        name: 'host',
        type: 'text',
        label: 'Host',
        required: true,
        description:
          'Host Endpoint of the Redshift Cluster (must include the cluster-id, region and end with .redshift.amazonaws.com)',
        airbyte_type: 'string',
      },
      {
        name: 'port',
        type: 'text',
        label: 'Port',
        required: true,
        description: 'Port of the database. (e.g. 5439)',
        airbyte_type: 'string',
      },
      {
        name: 'database',
        type: 'text',
        label: 'Database',
        required: true,
        description:
          'Enter the name of the database you want to sync data into',
        airbyte_type: 'string',
      },
      {
        name: 'schema',
        type: 'text',
        label: 'Default Schema',
        required: true,
        description:
          'The default schema tables are written to if the source does not specify a namespace. Unless specifically configured, the usual value for this field is public. (e.g. public)',
        airbyte_type: 'string',
        initialValue: 'public',
      },
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        required: true,
        description: 'Username to use to access the database.',
        airbyte_type: 'string',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        description: 'Password associated with the username.',
        airbyte_type: 'string',
      },
      {
        name: 'sslMode',
        type: 'checkbox',
        label: 'SSL mode',
        required: false,
        description:
          'ssl mode id required, is require_secure_transport parameter is turned on?',
        placeholder: 'ssl mode',
        airbyte_type: 'boolean',
      },
      {
        name: 'sshTunnel',
        type: 'select',
        label: 'SSH Tunnel',
        options: [
          {
            name: 'enable',
            enable: true,
            fields: [
              {
                name: 'sshHost',
                type: 'text',
                label: 'SSH Host',
                required: true,
                description:
                  'shh host endpoint of ssh instance(databrain IP should be whitelisted).',
                airbyte_type: 'string',
              },
              {
                max: 65536,
                min: 0,
                name: 'sshPort',
                type: 'number',
                label: 'SSH Port',
                required: true,
                description: 'shh host endpoint of ssh instance.',
                airbyte_type: 'integer',
                initialValue: 22,
              },
              {
                name: 'sshUsername',
                type: 'text',
                label: 'Username',
                required: true,
                description: 'username to connect ssh host',
                airbyte_type: 'string',
              },
              {
                name: 'sshPrivateKey',
                type: 'textarea',
                label: 'Private key',
                required: true,
                description: 'private key to authenticate ssh host.',
                airbyte_type: 'string',
              },
            ],
          },
          {
            name: 'disable',
            enable: true,
            fields: [],
          },
        ],
        required: true,
        description: 'The type of authentication to be used.',
        airbyte_type: 'object',
      },
    ],
    integrationName: 'Redshift',
    id: 'fe883f0c-5824-4df7-9d98-e8dc9ed44af7',
    integrationId: '878b4588-c432-42c5-9a5b-fefa330d6a82',
  },
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
        description:
          'Pick a name to help you identify this destination in Databrain',
        placeholder: 'MySql',
        airbyte_type: 'string',
      },
      {
        name: 'host',
        type: 'text',
        label: 'Host',
        required: true,
        description: 'Enter your mysql account locator',
        airbyte_type: 'string',
      },
      {
        name: 'user',
        type: 'text',
        label: 'Username',
        required: true,
        description:
          'Enter the name of the user you want to use to access the database',
        airbyte_type: 'string',
      },
      {
        max: 65536,
        min: 0,
        name: 'port',
        type: 'number',
        label: 'Port',
        required: true,
        description: 'Port of the database.',
        airbyte_type: 'integer',
        initialValue: 3306,
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        description:
          'Enter the password of the user you want to use to access the database',
        airbyte_type: 'string',
      },
    ],
    integrationName: 'MySql',
    id: '2432b4f2-6baf-4e55-931f-a0bdd4e15285',
    integrationId: '36040137-ca80-49c0-acea-28764f059bd4',
  },
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
        description:
          'Pick a name to help you identify this destination in Databrain',
        placeholder: 'Clickhouse server',
        airbyte_type: 'string',
      },
      {
        name: 'host',
        type: 'text',
        label: 'Host',
        required: true,
        description:
          'Enter your clickhouse account locator. (eg. https://ru7b3vwqoe.eu-west-1.aws.clickhouse.cloud)',
        airbyte_type: 'string',
      },
      {
        name: 'user',
        type: 'text',
        label: 'Username',
        required: true,
        description:
          'Enter the name of the user you want to use to access the database',
        airbyte_type: 'string',
      },
      {
        max: 65536,
        min: 0,
        name: 'port',
        type: 'number',
        label: 'Port',
        required: true,
        description: 'Port of the database.',
        airbyte_type: 'integer',
        initialValue: 8443,
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        description:
          'Enter the password of the user you want to use to access the database',
        airbyte_type: 'string',
      },
    ],
    integrationName: 'ClickHouse',
    id: '57404e31-e3cf-414b-9049-6f03692e92e0',
    integrationId: 'cb685ee6-93d0-476f-86d3-0c115a62ba68',
  },
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
        description:
          'Pick a name to help you identify this destination in Databrain',
        placeholder: 'Snowflake Destination Spec',
        airbyte_type: 'string',
      },
      {
        name: 'host',
        type: 'text',
        label: 'Host',
        required: true,
        description:
          'Enter your Snowflake accounts locator (in the format <account_locator>.<region>.<cloud>)',
        airbyte_type: 'string',
      },
      {
        name: 'role',
        type: 'text',
        label: 'Role',
        required: true,
        description: 'Enter the role that you want to use to access Snowflake',
        airbyte_type: 'string',
      },
      {
        name: 'warehouse',
        type: 'text',
        label: 'Warehouse',
        required: true,
        description:
          'Enter the name of the warehouse that you want to sync data into',
        airbyte_type: 'string',
      },
      {
        name: 'database',
        type: 'text',
        label: 'Database',
        required: true,
        description:
          'Enter the name of the database you want to sync data into',
        airbyte_type: 'string',
      },
      {
        name: 'schema',
        type: 'text',
        label: 'Default Schema',
        required: true,
        description: 'Enter the name of the default schema',
        airbyte_type: 'string',
      },
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        required: true,
        description:
          'Enter the name of the user you want to use to access the database',
        airbyte_type: 'string',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        description:
          'Enter the password of the user you want to use to access the database',
        airbyte_type: 'string',
      },
    ],
    integrationName: 'Snowflake',
    id: '68cb964f-e33b-42a3-ae38-a59d28ab045b',
    integrationId: '0c3ae3db-c321-4c97-a9d7-61b46de88af4',
  },
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
        description:
          'Pick a name to help you identify this integration in Databrain',
        placeholder: 'MongoDB',
        airbyte_type: 'string',
      },
      {
        name: 'host',
        type: 'text',
        label: 'Host',
        required: true,
        description: 'Enter your MongoDB BI connector Hostname.',
        airbyte_type: 'string',
      },
      {
        name: 'user',
        type: 'text',
        label: 'Username',
        required: true,
        description: 'Enter your MongoDB BI connector User.',
        airbyte_type: 'string',
      },
      {
        max: 65536,
        min: 0,
        name: 'port',
        type: 'number',
        label: 'Port',
        required: true,
        description: 'Enter your MongoDB BI connector Port.',
        airbyte_type: 'integer',
        initialValue: 3306,
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        description:
          'Enter the password of the user you want to use to access the database',
        airbyte_type: 'string',
      },
    ],
    integrationName: 'MongoDB',
    id: 'bde84239-4dae-4cda-8d70-5efee3d30f83',
    integrationId: '41ea38b9-ae21-4bd7-b906-59291a42a2d1',
  },
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Integration Name',
        required: true,
        description:
          'Pick a name to help you identify this source in Databrain.',
        placeholder: 'elastic search',
        airbyte_type: 'string',
      },
      {
        name: 'server_type',
        type: 'select',
        label: 'Server Type',
        options: [
          {
            name: 'elastic-cloud',
            enable: true,
            fields: [
              {
                name: 'cloud_id',
                type: 'text',
                label: 'Cloud ID',
                required: true,
                description: 'The Cloud ID of the Elasticsearch server.',
                placeholder: 'cloud id',
                airbyte_type: 'string',
              },
            ],
          },
          {
            name: 'self-managed',
            enable: true,
            fields: [
              {
                name: 'server_url',
                type: 'text',
                label: 'Server url',
                required: true,
                description: 'The hosted url of the Elasticsearch server.',
                placeholder: 'https://...',
                airbyte_type: 'string',
              },
            ],
          },
        ],
        required: true,
        description: 'The type of elastic server to be used.',
        airbyte_type: 'object',
      },
      {
        name: 'credentials',
        type: 'select',
        label: 'Credentials',
        options: [
          {
            name: 'username/password',
            enable: true,
            fields: [
              {
                name: 'username',
                type: 'text',
                label: 'Username',
                required: true,
                description:
                  'Basic auth username to access a secure Elasticsearch server.',
                airbyte_type: 'string',
              },
              {
                name: 'password',
                type: 'password',
                label: 'Password',
                required: true,
                description:
                  'Basic auth password to access a secure Elasticsearch server.',
                airbyte_type: 'string',
              },
            ],
          },
          {
            name: 'API Key',
            enable: false,
            fields: [
              {
                name: 'api_key_id',
                type: 'text',
                label: 'API Key ID',
                required: true,
                description:
                  'The Key ID to used when accessing an enterprise Elasticsearch instance.',
                airbyte_type: 'string',
              },
              {
                name: 'api_key_secret',
                type: 'text',
                label: 'API Key Secret',
                required: true,
                description: 'The secret associated with the API Key ID.',
                airbyte_type: 'string',
              },
            ],
          },
        ],
        required: true,
        description: 'The type of authentication to be used.',
        airbyte_type: 'object',
      },
    ],
    integrationName: 'elasticSearch',
    id: 'ca201fc7-5b49-41d5-8bef-f30901f24ebc',
    integrationId: '68f351a7-2745-4bef-ad7f-996b8e51bb8c',
  },
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
        description:
          'Pick a name to help you identify this destination in Databrain',
        placeholder: 'BigQuery Destination Spec',
        airbyte_type: 'string',
      },
      {
        name: 'project_id',
        type: 'text',
        label: 'Project ID',
        required: true,
        description:
          'The GCP project ID for the project containing the target BigQuery dataset.',
        airbyte_type: 'string',
      },
      {
        name: 'dataset_location',
        type: 'select',
        label: 'Dataset Location',
        options: [
          {
            name: 'US',
            enable: true,
          },
          {
            name: 'EU',
            enable: true,
          },
          {
            name: 'asia-east1',
            enable: true,
          },
          {
            name: 'asia-east2',
            enable: true,
          },
          {
            name: 'asia-northeast1',
            enable: true,
          },
          {
            name: 'asia-northeast2',
            enable: true,
          },
          {
            name: 'asia-northeast3',
            enable: true,
          },
          {
            name: 'asia-south1',
            enable: true,
          },
          {
            name: 'asia-south2',
            enable: true,
          },
          {
            name: 'asia-southeast1',
            enable: true,
          },
          {
            name: 'asia-southeast2',
            enable: true,
          },
          {
            name: 'australia-southeast1',
            enable: true,
          },
          {
            name: 'australia-southeast2',
            enable: true,
          },
          {
            name: 'europe-central2',
            enable: true,
          },
          {
            name: 'europe-north1',
            enable: true,
          },
          {
            name: 'europe-west1',
            enable: true,
          },
          {
            name: 'europe-west2',
            enable: true,
          },
          {
            name: 'europe-west3',
            enable: true,
          },
          {
            name: 'europe-west4',
            enable: true,
          },
          {
            name: 'europe-west6',
            enable: true,
          },
          {
            name: 'northamerica-northeast1',
            enable: true,
          },
          {
            name: 'northamerica-northeast2',
            enable: true,
          },
          {
            name: 'southamerica-east1',
            enable: true,
          },
          {
            name: 'southamerica-west1',
            enable: true,
          },
          {
            name: 'us-central1',
            enable: true,
          },
          {
            name: 'us-east1',
            enable: true,
          },
          {
            name: 'us-east4',
            enable: true,
          },
          {
            name: 'us-west1',
            enable: true,
          },
          {
            name: 'us-west2',
            enable: true,
          },
          {
            name: 'us-west3',
            enable: true,
          },
          {
            name: 'us-west4',
            enable: true,
          },
          {
            name: 'aws-us-east-1',
            enable: true,
          },
        ],
        required: true,
        description:
          'The default BigQuery Dataset ID that tables are replicated to if the source does not specify a namespace.',
        airbyte_type: 'string',
      },
      {
        name: 'dataset_id',
        type: 'text',
        label: 'Default Dataset ID',
        required: true,
        description:
          'The default BigQuery Dataset ID that tables are replicated to if the source does not specify a namespace.',
        airbyte_type: 'string',
      },
      {
        name: 'credentials_json',
        type: 'text',
        label:
          'Service Account Key JSON (Required For Cloud, Optional For Open-Source)',
        required: true,
        description: 'The JSON value of Service Account Key.',
        airbyte_type: 'string',
      },
    ],
    integrationName: 'Bigquery',
    id: '9ff1b0d9-f5cd-4475-aded-c06d3172e798',
    integrationId: '383ed796-2e23-4bc1-9141-ee46fc52f9bd',
  },
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
        description:
          'Pick a name to help you identify this data source in Databrain',
        placeholder: 'Databricks GCP',
        airbyte_type: 'string',
      },
      {
        name: 'serverHostname',
        type: 'text',
        label: 'Host',
        required: true,
        description:
          'Host Endpoint of the Databricks Cluster. (e.g. dbc-a1b2345c-d6e7.cloud.databricks.com)',
        airbyte_type: 'string',
      },
      {
        name: 'httpPath',
        type: 'text',
        label: 'Path',
        required: true,
        description:
          'Path of the datawarehouse. (e.g. /sql/1.0/endpoints/a1b234c5678901d2)',
        airbyte_type: 'string',
      },
      {
        name: 'token',
        type: 'text',
        label: 'Token',
        required: true,
        description:
          'Access token. (e.g. dapi1ab2c34defabc567890123d4efa56789)',
        airbyte_type: 'string',
      },
    ],
    integrationName: 'databricks',
    id: 'e06b2e99-2e0f-4b84-8d50-224e826b6402',
    integrationId: '640a0d04-9a99-48e4-870c-53273aab641f',
  },
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Integration Name',
        required: true,
        description:
          'Pick a name to help you identify this source in Databrain',
        placeholder: 'Postgres Source Spec',
        airbyte_type: 'string',
      },
      {
        name: 'host',
        type: 'text',
        label: 'Host',
        required: true,
        description: 'Hostname of the database.',
        airbyte_type: 'string',
      },
      {
        max: 65536,
        min: 0,
        name: 'port',
        type: 'number',
        label: 'Port',
        required: true,
        description: 'Port of the database.',
        airbyte_type: 'integer',
        initialValue: 5432,
      },
      {
        name: 'database',
        type: 'text',
        label: 'Database Name',
        required: true,
        description: 'Name of the database.',
        airbyte_type: 'string',
      },
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        required: true,
        description: 'Username to access the database.',
        airbyte_type: 'string',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        description: 'Password associated with the username.',
        airbyte_type: 'string',
      },
      {
        name: 'schemas',
        type: 'text',
        label: 'Schemas',
        required: false,
        description:
          'The list of schemas (case sensitive) to sync from. Defaults to public.',
        airbyte_type: 'array',
        initialValue: 'public',
      },
      {
        name: 'sslMode',
        type: 'checkbox',
        label: 'SSL mode',
        required: false,
        description: 'is require_secure_transport parameter is turned on?',
        placeholder: 'ssl mode',
        airbyte_type: 'boolean',
      },
      {
        name: 'sshTunnel',
        type: 'select',
        label: 'SSH Tunnel',
        options: [
          {
            name: 'enable',
            enable: true,
            fields: [
              {
                name: 'sshHost',
                type: 'text',
                label: 'SSH Host',
                required: true,
                description:
                  'shh host endpoint of ssh instance(databrain IP should be whitelisted).',
                airbyte_type: 'string',
              },
              {
                max: 65536,
                min: 0,
                name: 'sshPort',
                type: 'number',
                label: 'SSH Port',
                required: true,
                description: 'shh host endpoint of ssh instance.',
                airbyte_type: 'integer',
                initialValue: 22,
              },
              {
                name: 'sshUsername',
                type: 'text',
                label: 'Username',
                required: true,
                description: 'username to connect ssh host',
                airbyte_type: 'string',
              },
              {
                name: 'sshPrivateKey',
                type: 'textarea',
                label: 'Private key',
                required: true,
                description: 'private key to authenticate ssh host.',
                airbyte_type: 'string',
              },
            ],
          },
          {
            name: 'disable',
            enable: true,
            fields: [],
          },
        ],
        required: true,
        description: 'The type of authentication to be used.',
        airbyte_type: 'object',
      },
    ],
    integrationName: 'Postgres',
    id: 'dd9ce8ea-aa71-4175-9b24-dcf0bb2f3e0e',
    integrationId: 'decd338e-5647-4c0b-adf4-da0e75f5a750',
  },
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
        description:
          'Pick a name to help you identify this destination in Databrain',
        placeholder: 'MsSql',
        airbyte_type: 'string',
      },
      {
        name: 'server',
        type: 'text',
        label: 'Server',
        required: true,
        description:
          'Enter your MsSql account locator. (eg. mssql-server.database.windows.net)',
        airbyte_type: 'string',
      },
      {
        max: 65536,
        min: 0,
        name: 'port',
        type: 'number',
        label: 'Port',
        required: true,
        description: 'Port of the database. (eg. 1433)',
        airbyte_type: 'integer',
        initialValue: 1433,
      },
      {
        name: 'database',
        type: 'text',
        label: 'Database Name',
        required: true,
        description: 'Name of the database.',
        airbyte_type: 'string',
      },
      {
        name: 'user',
        type: 'text',
        label: 'User',
        required: true,
        description:
          'Enter the name of the user you want to use to access the database',
        airbyte_type: 'string',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        description:
          'Enter the password of the user you want to use to access the database',
        airbyte_type: 'string',
      },
    ],
    integrationName: 'MsSql',
    id: 'd511da03-7bf1-48a6-a07b-e8cb7a4ebbe4',
    integrationId: '529c4fb1-1288-4e6f-9f1e-8cabef9893fa',
  },
  {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
        description:
          'Pick a name to help you identify this destination in Databrain',
        placeholder: 'AWSS3 Destination Spec',
        airbyte_type: 'string',
      },
      {
        name: 's3Region',
        type: 'text',
        placeholder: 'S3 Region',
        initialValue: 'ap-south-1',
        label: 'S3 Region',
        required: true,
        description: 'Enter you S3 Bucket Region eg.: ap-south-1',
        airbyte_type: 'string',
      },
      {
        name: 's3AccessKeyId',
        type: 'text',
        placeholder: 'AKIAY.............PHZP',
        initialValue: '',
        label: 'S3 Access Key ID',
        required: true,
        description: 'Enter you S3 Access Key ID eg.: AKIJDHKSHSKJHKSHZP',
        airbyte_type: 'string',
      },
      {
        name: 's3SecretAccessKey',
        type: 'text',
        placeholder: 'DklHsGD....+K4DsIgJ/.....+PHZP',
        initialValue: '',
        label: 'S3 Secret Access Key',
        required: true,
        description:
          'Enter you S3 Secret Access Key eg.: DklHsGDM6R1+K4DsIgJsHDA/baAyc1+V9NsdPHZP',
        airbyte_type: 'string',
      },
      {
        name: 'datasetPath',
        type: 'text',
        placeholder: '/',
        initialValue: '',
        label: 'S3 Bucket Dataset Folder Path ',
        required: true,
        description: 'Enter you S3 Bucket Dataset Path eg.: path/dataset/*',
        airbyte_type: 'string',
      },
      {
        name: 'bucketName',
        type: 'text',
        placeholder: 'Bucket',
        initialValue: '',
        label: 'S3 Bucket Name',
        required: true,
        description: 'Enter you S3 Bucket Name',
        airbyte_type: 'string',
      },
    ],
    integrationName: 'AwsS3',
    id: '85bc9c7f-56b5-466f-9a09-b23cbd549f13',
    integrationId: '0b0ba8fc-4426-487d-bbc6-34f6e8b8c27c',
  },
];
