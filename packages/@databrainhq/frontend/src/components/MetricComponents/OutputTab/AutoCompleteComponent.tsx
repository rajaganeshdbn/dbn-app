import { Ui } from '@databrainhq/plugin';
import { NewMetricPointClickConfigProps } from 'types/metric';
import Flex from 'components/Flex';

type Props = {
  newMetricConfigProps: NewMetricPointClickConfigProps;
};

const AutoCompleteComponent = ({
  newMetricConfigProps: {
    functionOptions,
    tableList,
    selectedMainTable,
    setSelectedMainTable,
    selectedAutoCompleteCols,
    setSelectedAutoCompleteCols,
    autoCompleteDropdownOptions,
    onChangeAutoCompleteHelperFunction,
    onChangeAutoCompleteAlias,
    onSubmitSearch,
  },
}: Props) => {
  return (
    <div className="dbn-w-full dbn-h-[10%] dbn-flex dbn-items-center dbn-justify-center">
      <form className="dbn-flex dbn-gap-0 dbn-relative">
        <Flex direction="row" alignItems="center">
          <Ui.FloatingDropDown
            options={tableList?.map((t) => ({
              value: `${t.schemaName}.${t.tableName}`,
              label: t.tableName,
              table: t,
              icon: 'table',
            }))}
            onChange={(option) => {
              setSelectedMainTable?.(option.table);
              setSelectedAutoCompleteCols([]);
            }}
            selectedOption={{
              label: selectedMainTable?.tableName || '',
              value: selectedMainTable
                ? `${selectedMainTable?.schemaName}.${selectedMainTable?.tableName}`
                : '',
              icon: 'table',
            }}
            buttonWidth="250px"
            menuWidth="100%"
            isSearchEnabled
          />
          <div className="dbn-w-[800px]">
            <Ui.AutoCompleteDropdown
              selectedOption={selectedAutoCompleteCols || []}
              setSelectedOptions={setSelectedAutoCompleteCols}
              options={autoCompleteDropdownOptions || []}
              isDisabled={!selectedMainTable}
              functionOptions={functionOptions}
              onChangeHelperFunction={onChangeAutoCompleteHelperFunction}
              onChangeAlias={onChangeAutoCompleteAlias}
            />
          </div>
        </Flex>

        <Ui.Button
          variant="popover"
          type="button"
          isDisabled={
            !selectedAutoCompleteCols?.filter((f) => f.configType !== 'FILTER')
              .length
          }
          onClick={() => {
            onSubmitSearch();
          }}
          leftIcon={<Ui.Icons name="magnifying-glass" color="white" />}
          className="dbn-bg-primary dbn-text-white dbn-px-3 dbn-py-[0.65rem] dbn-rounded-l-none dbn-rounded-md"
        >
          Search
        </Ui.Button>
      </form>
    </div>
  );
};

export default AutoCompleteComponent;
