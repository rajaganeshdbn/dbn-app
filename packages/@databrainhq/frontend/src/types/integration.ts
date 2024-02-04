export type Datawarehouse = 'Snowflake' | 'BigQuery' | 'Redshift';

export type Destination = Record<Datawarehouse, string>;

export type SourceType =
  | 'Postgres'
  | 'HubSpot'
  | 'Salesforce'
  | 'GoogleAds'
  | 'Stripe';

export type Source = Record<SourceType, string>;

export type IntegrationDataList = {
  name: string;
  category: string;
  image: string;
  id: string;
};

export type Integration = {
  name: string;
  icon: string;
  description: string;
  id: string;
  label: string;
};

export type CompanyIntegration = {
  id: string;
  companyId: string;
  integrationId: string;
  credentials: Record<string, any>;
  name: string;
};

export type Step = 1 | 2;
export type SelectedOrgTable = {
  name: string;
  columnList: {
    dataType: string;
    name: string;
  }[];
  primaryKeyColumn: string;
  clientNameColumn: string;
};
export type StepProps = {
  onComplete?: () => void;
  onConfigurationAdded?: () => void;
  isConfig?: boolean;
};
