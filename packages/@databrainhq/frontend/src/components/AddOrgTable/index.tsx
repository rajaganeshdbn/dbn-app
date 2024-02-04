/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  useCompanyIntegrationQuery,
  useGetOrganizationQuery,
} from 'utils/generated/graphql';
import { useEffect, useState, useMemo } from 'react';
import { Ui } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';
import { useNavigate } from 'react-router-dom';
import { SelectedOrgTable, StepProps } from 'types/integration';
import { ELASTICSEARCH, TABLE } from 'consts/application';
import CompletedStatus from 'components/CompletedStatus';
import useOrganizations from 'hooks/useOrganizations';
import useCompanySchema from 'hooks/useCompanySchema';
import useTenancyLevel from 'hooks/useTenancyLevel';
import useWorkspace from 'hooks/useWorkspace';
import { getCurrentUser } from 'helpers/application/auth';
import styles from './addOrgTable.module.css';
import SelectDatabase from './components/SelectDatabase';

type SelectTableDropdownSelectedOptions = {
  label: string;
  value: string;
  columnList: string[];
  icon: string;
};

const AddOrgTable: React.FC<StepProps> = ({ onComplete }) => {
  const user = getCurrentUser();
  const { workspace } = useWorkspace();
  const navigate = useNavigate();

  const { data: organizationData } = useGetOrganizationQuery(
    {
      workspaceId: workspace?.id,
    },
    { enabled: !!workspace?.id }
  );
  const organization = organizationData?.organizations[0];
  const { schemaList, isLoadingSchema } = useCompanySchema();
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<SelectedOrgTable>({
    name: '',
    columnList: [],
    primaryKeyColumn: '',
    clientNameColumn: '',
  });

  const [selectTableDropdownOptions, setSelectTableDropdownOptions] =
    useState<SelectTableDropdownSelectedOptions>({
      label: 'Select an option',
      value: 'noOptionSelected',
      columnList: [],
      icon: 'table',
    });

  const [customerAttribute, setCustomerAttribute] = useState({
    primaryKeyColumn: {
      label: 'Select an option',
      value: 'noOptionSelected',
    },
    clientNameColumn: {
      label: 'Select an option',
      value: 'noOptionSelected',
    },
  });

  const {
    addOrganization,
    updateOrganization,
    isMutatingOrganization,
    errorMutatingOrganization,
    deleteDefaultClient,
  } = useOrganizations();
  const databaseNameList = [
    ...new Set(schemaList?.map((s: { schemaName: string }) => s.schemaName)),
  ] as string[];
  const {
    setTenancyLevel,
    tenancyLevel,
    tenacyLevelList,
    onSumbitDatabaseList,
    isDisableBtn,
    isCompleted: isCompletedDatabaseSelection,
    updateTenacyLevel,
  } = useTenancyLevel();
  const mutateOrganization = async () => {
    const orgData = {
      tableName: selectedTable.name,
      tablePrimaryKeyColumn: selectedTable.primaryKeyColumn,
      tableClientNameColumn: selectedTable.clientNameColumn,
    };

    if (organization)
      return updateOrganization(
        {
          id: organization.id,
          set: orgData,
        },
        {
          onSuccess: async () => {
            await deleteDefaultClient({ companyId: user?.companyId });
            updateTenacyLevel({
              tenancyLevel: tenancyLevel.value,
            });
            segmentEvent('table settings updated', {
              workspaceId: workspace?.id,
              ...selectedTable,
            });
            setIsCompleted(true);
            onComplete?.();
          },
        }
      );

    return addOrganization(
      {
        companyId: user?.companyId,
        ...orgData,
        workspaceId: workspace?.id,
      },
      {
        onSuccess: async () => {
          await deleteDefaultClient({ companyId: user?.companyId });
          segmentEvent('table settings added', {
            workspaceId: workspace?.id,
            ...selectedTable,
          });
          updateTenacyLevel({
            tenancyLevel: tenancyLevel.value,
          });
          setIsCompleted(true);

          onComplete?.();
        },
      }
    );
  };

  useEffect(() => {
    if (!organization || !schemaList) {
      setSelectedTable({
        name: '',
        columnList: [],
        primaryKeyColumn: '',
        clientNameColumn: '',
      });
      return;
    }
    const columnList =
      schemaList?.find(
        (schema: any) =>
          `${schema.schemaName}.${schema.tableName}` === organization.tableName
      )?.columnsWithDataType || [];
    setSelectedTable({
      name: organization.tableName,
      primaryKeyColumn: organization.tablePrimaryKeyColumn,
      clientNameColumn: organization.tableClientNameColumn,
      columnList,
    });
    setSelectTableDropdownOptions({
      label: `${organization.tableName}`,
      value: `${organization.tableName}`,
      columnList: columnList?.map((col) => col.name),
      icon: 'table',
    });

    setCustomerAttribute({
      primaryKeyColumn: {
        label: organization.tablePrimaryKeyColumn,
        value: organization.tablePrimaryKeyColumn,
      },
      clientNameColumn: {
        label: organization.tableClientNameColumn,
        value: organization.tableClientNameColumn,
      },
    });
  }, [organization, schemaList]);

  const { data } = useCompanyIntegrationQuery(
    {
      workspaceId: workspace?.id,
    },
    { enabled: !!workspace?.id }
  );

  const dbName = useMemo(
    () => data?.companyIntegrations[0]?.name,
    [data?.companyIntegrations]
  );

  const handleSubmit = async () => {
    await mutateOrganization();
    navigate('/');
  };

  const error = errorMutatingOrganization;

  useEffect(() => {
    if (onComplete && isCompletedDatabaseSelection) {
      onComplete();
    }
  }, [isCompletedDatabaseSelection, onComplete]);

  const tableNameDropdownOnChange = (option: any) => {
    setSelectedTable((prev) => ({
      ...prev,
      name: option.value,
      columnList: option.columnList,
    }));
    setSelectTableDropdownOptions((prev) => ({
      ...prev,
      label: option.label,
      value: option.value,
      columnList: option.columnList,
    }));
  };

  const primaryKeyDropDownOnChange = (option: any) => {
    setCustomerAttribute((prev) => ({
      ...prev,
      primaryKeyColumn: {
        label: option.label,
        value: option.value,
      },
    }));
    setSelectedTable((prev) => ({
      ...prev,
      primaryKeyColumn: option.value,
    }));
  };

  const customerNameDropDownOnChange = (option: any) => {
    setSelectedTable((prev) => ({
      ...prev,
      clientNameColumn: option.value,
    }));
    setCustomerAttribute((prev) => ({
      ...prev,
      clientNameColumn: {
        label: option.label,
        value: option.value,
      },
    }));
  };

  return (
    <div className={styles['addOrgTable-container']}>
      <div
        className={`dbn-w-[5%] dbn-h-full dbn-flex dbn-items-start dbn-pt-14 ${
          isCollapsed ? 'dbn-pr-16' : ''
        }`}
      >
        <div
          className={styles.backArrow}
          onClick={() => {
            navigate(-1);
          }}
        >
          <Ui.Icons name="arrow-left" size="sm" />
        </div>
      </div>
      <div
        className={`${styles['addOrgTable-desc']} ${
          isCollapsed
            ? 'dbn-w-[90%] lg:dbn-w-[93%] lg:dbn-mr-[140px] lg:dbn-ml-[150px]'
            : 'dbn-w-[70%]'
        }`}
      >
        <div className={styles.selectTableInfo}>
          <Ui.Text variant="heading-lg">
            Select your organization tables or databases
          </Ui.Text>
          <Ui.Text variant="body-text-sm" color="secondary-dark">
            Choose the tables or databases containing your customers information
            so that we can embed a unique analytics experience to your customers
          </Ui.Text>
          <div className={styles['tl-dropdown']}>
            <Ui.FloatingDropDown
              selectedOption={tenancyLevel}
              buttonWidth="100%"
              menuWidth="100%"
              options={
                dbName?.toLowerCase() === ELASTICSEARCH
                  ? tenacyLevelList.filter((v) => v.value === TABLE)
                  : tenacyLevelList
              }
              onChange={setTenancyLevel}
              label="Tenancy Level"
            />
          </div>
        </div>
        {tenancyLevel.value === TABLE && (
          <div className={styles.selectTableInfo}>
            <div className={styles.tableInfoWrapper}>
              <Ui.Text variant="heading-lg">
                Select the table that contains your customers identifiable
                information.
              </Ui.Text>
              <div className="dbn-mt-4 dbn-flex dbn-flex-col dbn-gap-2">
                <Ui.FloatingDropDown
                  buttonWidth="100%"
                  menuWidth="100%"
                  label="Table"
                  options={
                    schemaList?.map((schema: any) => ({
                      label: `${schema.schemaName}.${schema.tableName}`,
                      value: `${schema.schemaName}.${schema.tableName}`,
                      columnList: schema.columns || [],
                      icon: 'table',
                    })) || []
                  }
                  selectedOption={selectTableDropdownOptions}
                  onChange={tableNameDropdownOnChange}
                  isSearchEnabled
                  isDisabled={isLoadingSchema}
                />
              </div>
              <div className="dbn-mt-4 dbn-flex dbn-flex-col dbn-gap-2">
                <Ui.FloatingDropDown
                  buttonWidth="100%"
                  menuWidth="100%"
                  label="Primary Key"
                  isSearchEnabled
                  options={selectTableDropdownOptions.columnList.map(
                    (column: any) => ({
                      label: column,
                      value: column,
                    })
                  )}
                  selectedOption={customerAttribute.primaryKeyColumn}
                  onChange={primaryKeyDropDownOnChange}
                  isDisabled={isLoadingSchema}
                />
                <Ui.Text variant="body-text-sm" color="secondary-dark">
                  Choose the column that contains the primary key of the
                  customer (ie. id, user_id, org_id etc)
                </Ui.Text>
              </div>
              <div className="dbn-mt-4 dbn-flex dbn-flex-col dbn-gap-2">
                <Ui.FloatingDropDown
                  buttonWidth="100%"
                  menuWidth="100%"
                  label="Customer Name"
                  options={selectTableDropdownOptions.columnList.map(
                    (column: any) => ({
                      label: column,
                      value: column,
                    })
                  )}
                  selectedOption={customerAttribute.clientNameColumn}
                  onChange={customerNameDropDownOnChange}
                  isSearchEnabled
                  isDisabled={isLoadingSchema}
                />
                <Ui.Text variant="body-text-sm" color="secondary-dark">
                  Choose the column that contains the name of the customer (ie.
                  name, client_name, org_name, company_name etc)
                </Ui.Text>
              </div>
              {error ? (
                <div className="dbn-mt-4">
                  <Ui.Text variant="body-text-sm" color="alert">
                    {(error as Error).message}
                  </Ui.Text>
                </div>
              ) : null}
              {isCompleted && (
                <div className="dbn-mt-4">
                  <CompletedStatus />
                </div>
              )}
              <div className="dbn-flex dbn-mt-4 dbn-justify-end">
                <Ui.Button
                  variant="primary"
                  onClick={() => {
                    handleSubmit();
                  }}
                  isDisabled={isMutatingOrganization}
                >
                  Complete
                </Ui.Button>
              </div>
            </div>
          </div>
        )}
        {tenancyLevel.value === 'DATABASE' && (
          <div className={styles.selectTableInfo}>
            <div className={styles.tableInfoWrapper}>
              <form onSubmit={onSumbitDatabaseList}>
                <SelectDatabase databaseNameList={databaseNameList} />
                <div className="dbn-flex dbn-items-center dbn-gap-2 dbn-justify-end dbn-mt-6">
                  <Ui.Button
                    variant="primary"
                    type="submit"
                    isDisabled={isDisableBtn}
                    // onClick={() => navigate('/')}
                  >
                    {!isDisableBtn ? 'Complete' : 'Saving'}
                  </Ui.Button>
                  {isCompletedDatabaseSelection ? <CompletedStatus /> : null}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="dbn-w-0 dbn-border dbn-border-secondary dbn-relative">
        <div
          className={`${styles.collapseButton} ${
            isCollapsed ? 'dbn-rotate-90' : '-dbn-rotate-90'
          }`}
          onClick={() => setCollapsed((s) => !s)}
        >
          <Ui.Icons name="chevron-down" />
        </div>
      </div>
      {!isCollapsed && (
        <div className={styles.tableSettings}>
          <div className="dbn-w-[100%] dbn-border dbn-border-secondary dbn-rounded-lg dbn-shadow-lg dbn-h-[100%] dbn-overflow-hidden">
            <iframe
              title="Configurations"
              src="https://usedatabrain.freshdesk.com/support/solutions/articles/1060000059020-configure-organizations"
              allowFullScreen
              id="dbn-iframe-configuration"
              className="dbn-relative -dbn-top-40 dbn-w-[100%] dbn-border dbn-border-secondary dbn-rounded-lg dbn-shadow-lg dbn-h-[125%]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrgTable;
