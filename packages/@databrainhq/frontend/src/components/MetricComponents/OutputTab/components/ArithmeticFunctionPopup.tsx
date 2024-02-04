/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useState, useMemo, useEffect } from 'react';
import { Ui, consts, helpers, types } from '@databrainhq/plugin';
import { OnChangeHelperFunctionParams } from 'types/metric';
import { DATE_FORMAT } from 'consts/values';
import styles from './tab.module.css';

type ArithmeticFunctionPopupProps = {
  columnOptions: types.SelectedColumn[];
  isHovered: boolean;
  type: types.MetricConfigType;
  onSaveArithMetricOption: (value: types.OnSaveArithmeticColumnParams) => void;
};
const HelperFunctionPopup = ({
  column,
  onChangeHelperFunction,
  type,
}: {
  column?: types.SelectedColumn;
  onChangeHelperFunction: (value: OnChangeHelperFunctionParams) => void;
  type: types.MetricConfigType;
}) => {
  const [dateFormatValue, setDateFormatValue] = useState<string>('');
  const functionOptions = useMemo(
    () => helpers.functionOptions(column),
    [column]
  );
  const helperFunctions = useMemo(
    () => [
      ...functionOptions.filter((v) =>
        type === 'DIMENSION'
          ? !consts.aggregateStrings.includes(v.value)
          : consts.aggregateStrings.includes(v.value)
      ),
      {
        value: 'NONE',
        label: 'Original Value',
      },
    ],
    [functionOptions, type]
  );
  if (!column) return <></>;
  return (
    <Ui.PopoverMenu
      buttonContent={<Ui.Icons name="caret-down-fill" size="xs" />}
    >
      <div className="dbn-p-2">
        {helperFunctions.map((func) =>
          func.value === DATE_FORMAT ? (
            <Ui.PopoverMenu
              tabMenu
              buttonContent={
                <Ui.Button
                  data-closepopover="remainOpen"
                  key={func.value}
                  variant="popover"
                  className={`dbn-justify-between dbn-w-full hover:dbn-bg-gray-3 dbn-px-2 dbn-py-1 ${
                    column.helperFunction === func.value ? 'dbn-bg-gray-50' : ''
                  }`}
                  rightIcon={
                    <div className="-dbn-rotate-90">
                      <Ui.Icons name="chevron-down" />
                    </div>
                  }
                >
                  <span>{func.label}</span>
                </Ui.Button>
              }
              position="right-end"
              menuWidth="dbn-w-[300px]"
            >
              <div className="dbn-flex dbn-flex-col dbn-w-full dbn-items-center dbn-justify-center dbn-p-3 dbn-gap-3">
                <Ui.InputField
                  label="Date Format"
                  defaultValue={column.functionConfiguration?.dateFormat}
                  onChange={(e) => setDateFormatValue(e.target.value)}
                  value={dateFormatValue}
                  placeholder="%Y-%m-%d, yyyy-mm-dd"
                />
                <div className="dbn-flex  dbn-w-full dbn-items-center dbn-justify-between   dbn-gap-2">
                  <Ui.Button variant="secondary" data-closepopover>
                    Cancel
                  </Ui.Button>
                  <Ui.Button
                    variant="primary"
                    data-closepopover
                    onClick={() => {
                      onChangeHelperFunction({
                        column,
                        helperFunction: func,
                        type: 'DIMENSION',
                        functionConfiguration: {
                          dateFormat: dateFormatValue,
                        },
                      });
                    }}
                  >
                    Save
                  </Ui.Button>
                </div>
              </div>
            </Ui.PopoverMenu>
          ) : (
            <Ui.Button
              key={func.value}
              variant="popover"
              className={`dbn-justify-between dbn-w-full hover:dbn-bg-gray-3 dbn-px-2 dbn-py-1 ${
                column.helperFunction === func.value ? 'dbn-bg-gray-50' : ''
              }`}
              onClick={() =>
                onChangeHelperFunction({
                  column,
                  helperFunction: func,
                  type: 'DIMENSION',
                })
              }
            >
              <span>{func.label}</span>
            </Ui.Button>
          )
        )}
      </div>
    </Ui.PopoverMenu>
  );
};

const CastColumnPopup = ({
  onCickOption,
  column,
}: {
  onCickOption: (option: types.FloatingDropDownOption) => void;
  column?: types.SelectedColumn;
}) => {
  return (
    <Ui.PopoverMenu
      buttonContent={
        <Ui.DataType datatype={column?.cast?.value || column?.datatype || ''} />
      }
    >
      <Ui.Flex direction="col">
        {consts.CAST_COLUMN_AS.map((cast) => (
          <Ui.Button
            variant="tertiary"
            onClick={() => onCickOption(cast)}
            className={`dbn-gap-3 dbn-justify-start dbn-w-full hover:dbn-bg-gray-3 dbn-px-2 dbn-py-1 ${
              column?.cast?.value === cast.value ? 'dbn-bg-gray-50' : ''
            }`}
            leftIcon={<Ui.Icons name={cast.icon as types.IconType} size="xs" />}
          >
            {cast.label}
          </Ui.Button>
        ))}
      </Ui.Flex>
    </Ui.PopoverMenu>
  );
};
const ArithmeticFunctionPopup = ({
  props: { columnOptions, isHovered, type, onSaveArithMetricOption },
}: {
  props: ArithmeticFunctionPopupProps;
}) => {
  const [column, setColumn] = useState<
    types.SelectedColumn['arithmeticConfig']
  >({
    firstOperand: columnOptions?.[0],
    operator: consts.arithmeticOperators?.[0],
    secondOperand: columnOptions?.[0],
  });
  const [alias, setAlias] = useState<string>('');
  const options: types.FloatingDropDownOption[] = useMemo(
    () =>
      columnOptions.map((v) => ({ label: v.alias, value: v.alias, column: v })),
    [columnOptions]
  );
  useEffect(() => {
    if (columnOptions)
      setColumn({
        firstOperand: columnOptions?.[0],
        operator: consts.arithmeticOperators?.[0],
        secondOperand: columnOptions?.[0],
      });
  }, [columnOptions]);
  if (!columnOptions.length) return <></>;

  return (
    <Ui.PopoverMenu
      menuWidth="400px"
      offset={[18, 10]}
      tabMenu
      buttonContent={
        isHovered ? (
          <Ui.Button variant="popover" className={styles.arithmeticPopupBtn}>
            +-*/
          </Ui.Button>
        ) : (
          <></>
        )
      }
      position="bottom-end"
    >
      <Ui.Flex direction="col" className="dbn-gap-2 dbn-p-5">
        <Ui.Flex direction="col" className="dbn-gap-3">
          <Ui.Flex direction="row" alignItems="center" className="dbn-gap-3">
            <CastColumnPopup
              onCickOption={(option) =>
                setColumn((prev: any) => ({
                  ...prev,
                  firstOperand: {
                    ...prev?.firstOperand,
                    cast: option || '',
                  },
                }))
              }
              column={column?.firstOperand}
            />
            <HelperFunctionPopup
              column={column?.firstOperand}
              onChangeHelperFunction={({ helperFunction }) =>
                setColumn((prev: any) => ({
                  ...prev,
                  firstOperand: {
                    ...prev?.firstOperand,
                    helperFunction: helperFunction?.value || '',
                  },
                }))
              }
              type={type}
            />
            <Ui.FloatingDropDown
              onChange={(option) => {
                setColumn((prev: any) => ({
                  ...prev,
                  firstOperand: {
                    ...(option.column as any),
                  },
                }));
              }}
              options={options}
              selectedOption={{
                value: column?.firstOperand?.alias || '',
                label: column?.firstOperand?.alias || '',
              }}
              buttonWidth="230px"
              menuWidth="230px"
            />
          </Ui.Flex>
          <Ui.Flex direction="row" alignItems="center" className="dbn-gap-3">
            <Ui.PopoverMenu
              buttonContent={
                <Ui.Button variant="tab">
                  {column?.operator?.value || '+'}
                </Ui.Button>
              }
            >
              <Ui.Flex direction="col">
                {consts.arithmeticOperators.map((o) => (
                  <Ui.Button
                    variant="tertiary"
                    onClick={() =>
                      setColumn((prev: any) => ({
                        ...prev,
                        operator: o,
                      }))
                    }
                  >
                    {o.label}
                  </Ui.Button>
                ))}
              </Ui.Flex>
            </Ui.PopoverMenu>
            <Ui.Flex direction="row" alignItems="center">
              <CastColumnPopup
                onCickOption={(option) =>
                  setColumn((prev: any) => ({
                    ...prev,
                    secondOperand: {
                      ...prev?.secondOperand,
                      cast: option || '',
                    },
                  }))
                }
                column={column?.secondOperand}
              />
              <HelperFunctionPopup
                column={column?.secondOperand}
                onChangeHelperFunction={({ helperFunction }) =>
                  setColumn((prev: any) => ({
                    ...prev,
                    secondOperand: {
                      ...prev?.secondOperand,
                      helperFunction: helperFunction?.value || '',
                    },
                  }))
                }
                type={type}
              />
              <Ui.FloatingDropDown
                onChange={(option) => {
                  setColumn((prev: any) => ({
                    ...prev,
                    secondOperand: {
                      ...(option.column as any),
                    },
                  }));
                }}
                options={options}
                selectedOption={{
                  value: column?.secondOperand?.alias || '',
                  label: column?.secondOperand?.alias || '',
                }}
                buttonWidth="230px"
                menuWidth="230px"
              />
            </Ui.Flex>
          </Ui.Flex>
          <Ui.InputField
            label="Save as "
            labelVariant="floating"
            onChange={({ target: { value } }) => setAlias(value)}
            value={alias}
          />
        </Ui.Flex>
        <Ui.Flex justify="between" alignItems="center">
          <Ui.Button variant="secondary" data-closepopover>
            Cancel
          </Ui.Button>
          <Ui.Button
            variant="primary"
            data-closepopover
            onClick={() => {
              onSaveArithMetricOption({ column, type, alias });
              setColumn({
                firstOperand: columnOptions?.[0],
                operator: consts.arithmeticOperators?.[0],
                secondOperand: columnOptions?.[0],
              });
              setAlias('');
            }}
          >
            Save
          </Ui.Button>
        </Ui.Flex>
      </Ui.Flex>
    </Ui.PopoverMenu>
  );
};

export default ArithmeticFunctionPopup;
