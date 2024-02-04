import { Ui, types } from '@databrainhq/plugin';

type MetricFilterPopupProps = {
  appFilters: types.RlsCondition[];
  onChangeFilterValue?: (
    name: string,
    value: string,
    labelValue?: string,
    customValue?: Record<string, Date>,
    stringValues?: types.FloatingDropDownOption[]
  ) => void;
  clientName: string | undefined;
  workspaceId: string;
  rlsConditions: types.RlsCondition[];
  isAllClient?: boolean;
  dropdownTheme?: {
    width: string;
    variant: 'static' | 'floating';
    radius: string;
  };
  tenancyLevel?: string;
};
const MetricFilterPopup = ({
  appFilters,
  clientName,
  workspaceId,
  onChangeFilterValue,
  rlsConditions,
  isAllClient,
  dropdownTheme,
  tenancyLevel = 'TABLE',
}: MetricFilterPopupProps) => {
  return (
    <>
      {appFilters.length ? (
        <Ui.PopoverMenu
          buttonContent={<Ui.Icons name="kebab-menu-vertical" />}
          position="bottom-end"
          tabMenu
          menuWidth="250px"
        >
          <div className="dbn-p-3 dbn-flex dbn-flex-col dbn-gap-3">
            <Ui.Text variant="heading">App Filters</Ui.Text>
            {appFilters.map((filter) => (
              <Ui.MetricFilterDropDown
                onChangeFilterValue={onChangeFilterValue}
                dropdownTheme={dropdownTheme}
                rlsConditions={filter}
                workspaceId={workspaceId || ''}
                clientId={clientName}
                rlsConditionList={rlsConditions}
                isAllClient={isAllClient}
                tenancyLevel={tenancyLevel}
              />
            ))}
          </div>
        </Ui.PopoverMenu>
      ) : null}
    </>
  );
};

export default MetricFilterPopup;
