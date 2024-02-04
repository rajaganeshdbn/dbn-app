import React from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { Ui } from '@databrainhq/plugin';

export type FormField = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  description?: string;
  airbyte_type: 'string' | 'integer' | 'boolean' | 'array' | 'object';
  required: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  initialValue?: string | number | boolean;
  fields?: FormField[];
  options?: {
    name: string;
    description?: string;
    enable?: boolean;
    fields?: FormField[];
  }[];
};

export type IntegrationFormFieldsProps = {
  fields: FormField[];
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  control: Control<FieldValues, object>;
  defaultValues?: FieldValues;
  errors?: FieldErrors<FieldValues>;
};

const IntegrationFormFields: React.FC<IntegrationFormFieldsProps> = ({
  register,
  watch,
  fields,
  control,
  defaultValues,
  errors,
}) => {
  // useEffect(() => {
  //   if (defaultValues && setValue)
  //     fields.forEach((field) => {
  //       setValue(field.name, defaultValues[field.name]);
  //     });
  // }, [defaultValues]);

  const renderFields = (formfields: FormField[]): JSX.Element[] => {
    return formfields.map((field) => {
      switch (field.type) {
        case 'select': {
          control.register(field.name);
          const selected = field.options?.find(
            (option) =>
              option.enable === true && option.name === watch(field.name)
          );
          return (
            <>
              <div key={field.name + field.label} className="dbn-mt-4">
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: itm }) => (
                    <Ui.FloatingDropDown
                      buttonWidth="100%"
                      label={field.name}
                      options={
                        field.options
                          ?.filter((option) => option.enable === true)
                          .map((option) => ({
                            value: option.name,
                            label: option.name,
                          })) || []
                      }
                      selectedOption={{
                        value: itm.value,
                        label: itm.value,
                      }}
                      onChange={(option) => itm.onChange(option.value)}
                    />
                  )}
                />
                <Ui.Text variant="body-text-sm">{field.description}</Ui.Text>
              </div>
              {field.fields && renderFields(field.fields)}
              {selected?.fields && renderFields(selected.fields)}
            </>
          );
        }
        case 'textarea': {
          return (
            <div key={field.name + field.label}>
              <Ui.TextAreaField
                id={field.name + field.label}
                label={field.label}
                placeholder={field.placeholder}
                rows={5}
                defaultValue={
                  defaultValues
                    ? defaultValues[field.name]
                    : (field.initialValue as string)
                }
                error={errors?.[field.name]?.message}
                register={register(field.name, {
                  required: field.required
                    ? `*Please enter the ${field.name} value`
                    : '',
                })}
              />
              <Ui.Text variant="body-text-sm">{field.description}</Ui.Text>
            </div>
          );
        }
        case 'number': {
          return (
            <div key={field.name + field.label}>
              <Ui.InputField
                label={field.label}
                placeholder={field.placeholder ?? ''}
                type={field.type}
                defaultValue={
                  defaultValues
                    ? defaultValues[field.name]
                    : (field.initialValue as number)
                }
                register={register(field.name, {
                  required: field.required
                    ? `*Please enter the ${field.name} value`
                    : '',
                  max: field.max,
                  min: field.min,
                })}
                error={errors?.[field.name]?.message}
                supportingText={field.description}
              />
            </div>
          );
        }
        default: {
          return (
            <div key={field.name + field.label}>
              <Ui.InputField
                label={field.label}
                defaultValue={
                  defaultValues
                    ? defaultValues[field.name]
                    : (field.initialValue as string)
                }
                placeholder={field.placeholder ?? ''}
                type={field.type}
                register={register(field.name, {
                  required: field.required
                    ? `*Please enter the ${field.name} value`
                    : '',
                  max: field.max,
                  min: field.min,
                })}
                error={errors?.[field.name]?.message}
                supportingText={field.description}
              />
            </div>
          );
        }
      }
    });
  };

  return <>{renderFields(fields)}</>;
};

export default IntegrationFormFields;
