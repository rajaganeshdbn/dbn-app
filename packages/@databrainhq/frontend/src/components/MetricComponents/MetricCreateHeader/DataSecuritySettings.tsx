import { Ui, consts, types } from '@databrainhq/plugin';
import { useEffect, useMemo, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useUpdateDataSecuritySettingsMutation } from 'utils/generated/graphql';

type DataSecuritySettingsProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: {
    underlyingColumns: string[];
    csvColumns: string[];
    id: string;
    selectedColumns?: types.SelectedColumns[];
  };
};
const DataSecuritySettings = ({
  isOpen,
  onClose,
  defaultValues,
}: DataSecuritySettingsProps) => {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const {
    mutate: updateDataSecuritySettings,
    isLoading,
    isSuccess,
  } = useUpdateDataSecuritySettingsMutation();
  const saveSettings = (values: FieldValues) => {
    setError('');
    updateDataSecuritySettings(
      {
        id: defaultValues.id,
        dataSecuritySettings: {
          csvColumns: values.csvColumns,
          underlyingColumns: values.underlyingColumns,
        },
      },
      {
        onError() {
          setError(consts.SOMETHING_WENT_WRONG);
        },
      }
    );
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  const columnOptions = useMemo(() => {
    if (!defaultValues.selectedColumns) return [];
    return defaultValues.selectedColumns.map((col) => ({
      label: col.column,
      value: col.column,
    }));
  }, [defaultValues.selectedColumns]);

  return (
    <Ui.Modal
      isOpen={isOpen}
      onClose={onClose}
      headerTitle="Data Security Settings"
    >
      <form onSubmit={handleSubmit(saveSettings)}>
        <div className="dbn-p-5 dbn-w-[500px] dbn-h-[300px] dbn-flex dbn-flex-col dbn-gap-[22px] dbn-overflow-y-auto">
          <Ui.HookMultiSelect
            label="Hide column from underlying data"
            control={control}
            placeHolder="Select columns"
            name="underlyingColumns"
            options={columnOptions}
            isSearchEnabled
          />
          <Ui.HookMultiSelect
            label="Hide column from raw CSV"
            control={control}
            placeHolder="Select columns"
            name="csvColumns"
            options={columnOptions}
            isSearchEnabled
          />
          {/* <Ui.TagInputField
            control={control}
            type="text"
            label="Hide column from underlying data"
            placeholder="Enter column names"
            defaultTagValue={defaultValues.underlyingColumns}
            onChangeTags={(tags) => setValue('underlyingColumns', tags)}
          />
          <Ui.TagInputField
            control={control}
            type="text"
            label="Hide column from raw CSV"
            placeholder="Enter column names"
            defaultTagValue={defaultValues.csvColumns}
            onChangeTags={(tags) => {
              setValue('csvColumns', tags);
            }}
          /> */}
        </div>
        {error && <Ui.Alert text={error} variant="error" />}
        <Ui.ModalFooter>
          <Ui.Button
            variant="tab"
            type="button"
            isDisabled={isLoading}
            onClick={() => onClose()}
          >
            Cancel
          </Ui.Button>
          <Ui.Button variant="primary" type="submit" isDisabled={isLoading}>
            Save
          </Ui.Button>
        </Ui.ModalFooter>
      </form>
    </Ui.Modal>
  );
};

export default DataSecuritySettings;
