/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/jsx-props-no-spreading */
import { Ui } from '@databrainhq/plugin';
import { FieldValues, useForm } from 'react-hook-form';
import { required } from 'consts/validations';
import { CLICKHOUSE, DATABRICKS, MONGODB } from 'consts/application';
import Flex from 'components/Flex';

type DatasetCreateFormProps = {
  modalProps: Ui.ModalProps;
  onSaveCreateDataset: (values: FieldValues, onComplete?: () => void) => void;
  datasetCreateState: {
    error: string;
    isLoading: boolean;
  };
  dbName: string;
};

const DatasetCreateForm = ({
  datasetCreateFormProps: {
    modalProps,
    onSaveCreateDataset,
    datasetCreateState,
    dbName,
  },
}: {
  datasetCreateFormProps: DatasetCreateFormProps;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  return (
    <Ui.Modal {...modalProps}>
      <form
        onSubmit={handleSubmit((values) => onSaveCreateDataset(values, reset))}
      >
        <Flex direction="col" className="dbn-p-5 dbn-gap-3">
          <Ui.InputField
            label="Name"
            type="text"
            placeholder="Enter name"
            error={errors.name?.message}
            register={register('name', required)}
            supportingText="unique name to identify the dataset."
          />
          <Ui.Text variant="label">Materialise as a</Ui.Text>
          <Flex direction="row" className="dbn-gap-3">
            <Ui.RadioButton
              label="sub query"
              register={register('materialise', required)}
              rightIcon={
                <Ui.NewTooltip
                  text="Save dataset SQL as sub query."
                  position="right"
                >
                  <Ui.Icons name="info" />
                </Ui.NewTooltip>
              }
              value="subQuery"
            />
            <Ui.RadioButton
              label="view"
              register={register('materialise', required)}
              rightIcon={
                <Ui.NewTooltip
                  text="Save dataset in schema as virtual table."
                  position="right"
                >
                  <Ui.Icons name="info" />
                </Ui.NewTooltip>
              }
              value="view"
              disabled={[MONGODB, DATABRICKS, CLICKHOUSE].includes(
                dbName?.toLowerCase()
              )}
              isDisabled={[MONGODB, DATABRICKS, CLICKHOUSE].includes(
                dbName?.toLowerCase()
              )}
            />
          </Flex>
          {errors.materialise?.message &&
            typeof errors.materialise.message === 'string' && (
              <Ui.Text color="alert">{errors.materialise.message}</Ui.Text>
            )}
          <Ui.InputField
            label="Schema (optional)"
            type="text"
            placeholder="Enter name"
            error={errors.schemaName?.message}
            register={register('schemaName', {
              required:
                watch('materialise') === 'view'
                  ? 'Schema name is required.'
                  : '',
            })}
            supportingText="schema name to create the dataset (if materialised as view)."
          />
          {datasetCreateState.error &&
            typeof datasetCreateState.error === 'string' && (
              <Ui.Text color="alert">{datasetCreateState.error}</Ui.Text>
            )}
        </Flex>

        <Ui.ModalFooter>
          <Ui.Button
            variant="secondary"
            type="button"
            isDisabled={datasetCreateState.isLoading}
            onClick={() => {
              reset();
              modalProps.onClose();
            }}
          >
            Cancel
          </Ui.Button>
          <Ui.Button
            variant="primary"
            type="submit"
            isDisabled={datasetCreateState.isLoading}
          >
            Save
          </Ui.Button>
        </Ui.ModalFooter>
      </form>
    </Ui.Modal>
  );
};

export default DatasetCreateForm;
