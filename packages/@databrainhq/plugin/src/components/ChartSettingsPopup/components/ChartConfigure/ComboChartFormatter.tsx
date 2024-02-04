import React, { useEffect, useMemo, useState } from 'react';
import styles from './configure.module.css';
import { ChartSettingsType } from '@/types';
import { Text } from '@/components/Text';
import { InputField } from '@/components/InputField';
import { Switch } from '@/components/Switch';
import { Button } from '@/components/Button';
import { Icons } from '@/components/Icons';
import { STACK_AXIS } from '@/consts';

type Props = {
  chartSettings: ChartSettingsType;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
};

const ComboChartFormatter = ({ chartSettings, setChartSettings }: Props) => {
  const [rangeModal, setRangeModal] = useState<string>('');
  const [axisWithRanges, setAxisWithRanges] = useState<string[]>([]);
  const [range, setRange] = useState<{
    label: string;
    upperLimit: number;
    lowerLimit: number;
  }>({
    label: '',
    upperLimit: 0,
    lowerLimit: 0,
  });
  const setRangeAxis = (axis: string) => {
    const isAxisPresent =
      !!chartSettings?.customSettings?.comboLabelFormatter?.find(
        (opt) => opt.axis === axis
      )?.axis;
    if (isAxisPresent) {
      const remainingAxis =
        chartSettings.customSettings?.comboLabelFormatter?.filter(
          (opt) => opt.axis !== axis
        );
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          comboLabelFormatter: remainingAxis,
        },
      }));
      setAxisWithRanges(remainingAxis?.map((val) => val.axis) || []);
    } else {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          comboLabelFormatter: [
            ...(chartSettings.customSettings?.comboLabelFormatter || []),
            {
              axis,
              formatter: [],
            },
          ],
        },
      }));
      setAxisWithRanges([
        ...(chartSettings.customSettings?.comboLabelFormatter?.map(
          (val) => val.axis
        ) || []),
        axis,
      ]);
    }
  };
  const onSaveRange = (
    axisRange: {
      label: string;
      upperLimit: number;
      lowerLimit: number;
    },
    axis: string
  ) => {
    const prevRangeLimits =
      chartSettings.customSettings?.comboLabelFormatter?.find(
        (opt) => opt.axis === axis
      )?.formatter || [];
    const updatedRangeLimits = [...prevRangeLimits, axisRange];
    setChartSettings((prev) => ({
      ...prev,
      customSettings: {
        ...prev.customSettings,
        comboLabelFormatter:
          chartSettings.customSettings?.comboLabelFormatter?.map((val) => {
            if (val.axis === axis) {
              return {
                axis,
                formatter: updatedRangeLimits,
              };
            }
            return val;
          }),
      },
    }));
    setRange({
      label: '',
      upperLimit: 0,
      lowerLimit: 0,
    });
    setRangeModal('');
  };

  const onDeleteRange = (
    format: {
      upperLimit: number;
      lowerLimit: number;
      label: string;
    },
    axis: string
  ) => {
    const existingRanges =
      chartSettings.customSettings?.comboLabelFormatter?.find(
        (val) => val.axis === axis
      )?.formatter || [];
    const updatedRanges = existingRanges?.filter(
      (val) =>
        val.label !== format.label &&
        val.lowerLimit !== format.lowerLimit &&
        val.upperLimit !== format.upperLimit
    );
    setChartSettings((prev) => ({
      ...prev,
      customSettings: {
        ...prev.customSettings,
        comboLabelFormatter:
          chartSettings.customSettings?.comboLabelFormatter?.map((val) => {
            if (val.axis === axis) {
              return {
                axis,
                formatter: updatedRanges,
              };
            }
            return val;
          }),
      },
    }));
  };
  const stackAxisName = useMemo(
    () =>
      chartSettings.customSettings?.comboStackAxisSymbols?.name || STACK_AXIS,
    [chartSettings.customSettings?.comboStackAxisSymbols?.name]
  );
  const hasStackRange = useMemo(
    () => axisWithRanges.includes(stackAxisName),
    [stackAxisName, axisWithRanges]
  );
  const stackFormatter = useMemo(() => {
    return chartSettings?.customSettings?.comboLabelFormatter?.find(
      (opt) => opt.axis === stackAxisName
    )?.formatter;
  }, [chartSettings.customSettings?.comboLabelFormatter, stackAxisName]);
  useEffect(() => {
    if (chartSettings.customSettings?.comboLabelFormatter?.length) {
      setAxisWithRanges(
        chartSettings.customSettings?.comboLabelFormatter?.map(
          (opt) => opt.axis
        )
      );
    }
  }, [chartSettings.customSettings?.comboLabelFormatter]);
  return (
    <>
      {chartSettings.customSettings?.isStackBar
        ? chartSettings.customSettings.comboAxisSymbols
            .filter((i: any) => !chartSettings.comboBarList.includes(i.name))
            .map((val: any) => {
              const hasRange = axisWithRanges.includes(val.name);
              const formatter =
                chartSettings.customSettings?.comboLabelFormatter?.find(
                  (opt) => opt.axis === val.name
                )?.formatter || [];
              return (
                <>
                  <Text variant="body-text-sm">{`${val.name} axis`}</Text>
                  <div className={styles.prefixSuffixContainer}>
                    <InputField
                      type="text"
                      label="Prefix"
                      placeholder="Add prefix to labels"
                      value={val.prefix}
                      onChange={(e) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            comboAxisSymbols:
                              prev.customSettings?.comboAxisSymbols?.map(
                                (s: any) =>
                                  s.name === val.name
                                    ? {
                                        ...s,
                                        prefix: e.target.value,
                                      }
                                    : s
                              ),
                          },
                        }))
                      }
                    />
                    <InputField
                      type="text"
                      label="Suffix"
                      placeholder="Add suffix to labels"
                      value={val.suffix}
                      onChange={(e) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          customSettings: {
                            ...prev.customSettings,
                            comboAxisSymbols:
                              prev.customSettings?.comboAxisSymbols?.map(
                                (s: any) =>
                                  s.name === val.name
                                    ? {
                                        ...s,
                                        suffix: e.target.value,
                                      }
                                    : s
                              ),
                          },
                        }))
                      }
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <Text variant="btn">Label Formatting</Text>
                    <Switch
                      name={val.name}
                      defaultEnabled
                      enabled={
                        !!chartSettings.customSettings?.comboLabelFormatter?.find(
                          (opt) => opt.axis === val.name
                        )
                      }
                      onChange={() => setRangeAxis(val.name)}
                    />
                  </div>
                  {hasRange ? (
                    <>
                      {formatter?.length ? (
                        <div className="dbn-w-full dbn-flex dbn-flex-wrap dbn-gap-2">
                          {formatter?.map((format) => (
                            <span className="dbn-px-2 dbn-py-1 dbn-rounded-md dbn-text-xs dbn-font-semibold dbn-flex dbn-gap-1 dbn-items-center dbn-justify-center dbn-bg-gray">
                              {`${format.label}(${format.lowerLimit} - ${format.upperLimit})`}
                              <Button
                                variant="popover"
                                leftIcon={<Icons name="cross" size="xxs" />}
                                onClick={() => onDeleteRange(format, val.name)}
                              />
                            </span>
                          ))}
                        </div>
                      ) : null}
                      {rangeModal !== val.name ? (
                        <Button
                          variant="secondary"
                          onClick={() => setRangeModal(val.name)}
                          fitContainer
                          leftIcon={<Icons name="plus" size="sm" />}
                        >
                          Add a range
                        </Button>
                      ) : null}
                      {rangeModal === val.name ? (
                        <div className="dbn-w-full dbn-p-4 dbn-rounded-md dbn-m-4 dbn-border dbn-border-secondary dbn-bg-gray dbn-flex dbn-flex-col dbn-gap-3">
                          <div className="dbn-flex dbn-gap-4">
                            <InputField
                              type="number"
                              label="Lower Limit"
                              onChange={(e) =>
                                setRange((prev) => ({
                                  ...prev,
                                  lowerLimit: Number(e.target.value),
                                }))
                              }
                              value={range.lowerLimit}
                            />
                            <InputField
                              type="number"
                              label="Upper Limit"
                              onChange={(e) =>
                                setRange((prev) => ({
                                  ...prev,
                                  upperLimit: Number(e.target.value),
                                }))
                              }
                              value={range.upperLimit}
                            />
                          </div>
                          <InputField
                            type="text"
                            label="Label"
                            onChange={(e) =>
                              setRange((prev) => ({
                                ...prev,
                                label: e.target.value,
                              }))
                            }
                            value={range.label}
                          />
                          <div className="dbn-w-full dbn-flex dbn-gap-4 dbn-justify-end">
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setRangeModal('');
                                setRange({
                                  label: '',
                                  upperLimit: 0,
                                  lowerLimit: 0,
                                });
                              }}
                            >
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => onSaveRange(range, val.name)}
                              isDisabled={
                                !range.label ||
                                !range.lowerLimit.toString() ||
                                !range.upperLimit.toString() ||
                                range.upperLimit === range.lowerLimit
                              }
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </>
              );
            })
        : chartSettings.customSettings?.comboAxisSymbols?.map((val: any) => {
            const hasRange = axisWithRanges.includes(val.name);
            const formatter =
              chartSettings.customSettings?.comboLabelFormatter?.find(
                (opt) => opt.axis === val.name
              )?.formatter || [];
            return (
              <>
                <Text variant="body-text-sm">{`${val.name} axis`}</Text>
                <div className={styles.prefixSuffixContainer}>
                  <InputField
                    type="text"
                    label="Prefix"
                    placeholder="Add prefix to labels"
                    value={val.prefix}
                    onChange={(e) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        customSettings: {
                          ...prev.customSettings,
                          comboAxisSymbols:
                            prev.customSettings?.comboAxisSymbols?.map(
                              (s: any) =>
                                s.name === val.name
                                  ? {
                                      ...s,
                                      prefix: e.target.value,
                                    }
                                  : s
                            ),
                        },
                      }))
                    }
                  />
                  <InputField
                    type="text"
                    label="Suffix"
                    placeholder="Add suffix to labels"
                    value={val.suffix}
                    onChange={(e) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        customSettings: {
                          ...prev.customSettings,
                          comboAxisSymbols:
                            prev.customSettings?.comboAxisSymbols?.map(
                              (s: any) =>
                                s.name === val.name
                                  ? {
                                      ...s,
                                      suffix: e.target.value,
                                    }
                                  : s
                            ),
                        },
                      }))
                    }
                  />
                </div>
                <div className={styles.wrapper}>
                  <Text variant="btn">Label Formatting</Text>
                  <Switch
                    name={val.name}
                    defaultEnabled
                    enabled={
                      !!chartSettings.customSettings?.comboLabelFormatter?.find(
                        (opt) => opt.axis === val.name
                      )
                    }
                    onChange={() => setRangeAxis(val.name)}
                  />
                </div>
                {hasRange ? (
                  <>
                    {formatter?.length ? (
                      <div className="dbn-w-full dbn-flex dbn-flex-wrap dbn-gap-2">
                        {formatter?.map((format) => (
                          <span className="dbn-px-2 dbn-py-1 dbn-rounded-md dbn-text-xs dbn-font-semibold dbn-flex dbn-gap-1 dbn-items-center dbn-justify-center dbn-bg-gray">
                            {`${format.label}(${format.lowerLimit} - ${format.upperLimit})`}
                            <Button
                              variant="popover"
                              leftIcon={<Icons name="cross" size="xxs" />}
                              onClick={() => onDeleteRange(format, val.name)}
                            />
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {rangeModal !== val.name ? (
                      <Button
                        variant="secondary"
                        onClick={() => setRangeModal(val.name)}
                        fitContainer
                        leftIcon={<Icons name="plus" size="sm" />}
                      >
                        Add a range
                      </Button>
                    ) : null}
                    {rangeModal === val.name ? (
                      <div className="dbn-w-full dbn-p-4 dbn-rounded-md dbn-m-4 dbn-border dbn-border-secondary dbn-bg-gray dbn-flex dbn-flex-col dbn-gap-3">
                        <div className="dbn-flex dbn-gap-4">
                          <InputField
                            type="number"
                            label="Lower Limit"
                            onChange={(e) =>
                              setRange((prev) => ({
                                ...prev,
                                lowerLimit: Number(e.target.value),
                              }))
                            }
                            value={range.lowerLimit}
                          />
                          <InputField
                            type="number"
                            label="Upper Limit"
                            onChange={(e) =>
                              setRange((prev) => ({
                                ...prev,
                                upperLimit: Number(e.target.value),
                              }))
                            }
                            value={range.upperLimit}
                          />
                        </div>
                        <InputField
                          type="text"
                          label="Label"
                          onChange={(e) =>
                            setRange((prev) => ({
                              ...prev,
                              label: e.target.value,
                            }))
                          }
                          value={range.label}
                        />
                        <div className="dbn-w-full dbn-flex dbn-gap-4 dbn-justify-end">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setRangeModal('');
                              setRange({
                                label: '',
                                upperLimit: 0,
                                lowerLimit: 0,
                              });
                            }}
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => onSaveRange(range, val.name)}
                            isDisabled={
                              !range.label ||
                              !range.lowerLimit.toString() ||
                              !range.upperLimit.toString() ||
                              range.upperLimit === range.lowerLimit
                            }
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : null}
              </>
            );
          })}
      {chartSettings.customSettings?.isStackBar && (
        <>
          <Text variant="body-text-sm">Stack axis</Text>
          <div className={styles.wrapper}>
            <InputField
              type="text"
              label="Name"
              placeholder="Add axis name"
              value={chartSettings?.customSettings?.comboStackAxisSymbols?.name}
              onChange={({ target: { value } }) =>
                setChartSettings((prev) => ({
                  ...prev,
                  customSettings: {
                    ...prev.customSettings,
                    comboStackAxisSymbols: {
                      prefix:
                        prev.customSettings?.comboStackAxisSymbols?.prefix ||
                        '',
                      name: value,
                      suffix:
                        prev.customSettings?.comboStackAxisSymbols?.suffix ||
                        '',
                    },
                  },
                }))
              }
            />
          </div>
          <div className={styles.prefixSuffixContainer}>
            <InputField
              type="text"
              label="Suffix"
              placeholder="Add Suffix to labels"
              value={
                chartSettings?.customSettings?.comboStackAxisSymbols?.suffix
              }
              onChange={({ target: { value } }) =>
                setChartSettings((prev) => ({
                  ...prev,
                  customSettings: {
                    ...prev.customSettings,
                    comboStackAxisSymbols: {
                      suffix: value,
                      name:
                        prev.customSettings?.comboStackAxisSymbols?.name || '',
                      prefix:
                        prev.customSettings?.comboStackAxisSymbols?.prefix ||
                        '',
                    },
                  },
                }))
              }
            />
            <InputField
              type="text"
              label="Prefix"
              placeholder="Add Prefix to labels"
              value={
                chartSettings?.customSettings?.comboStackAxisSymbols?.prefix
              }
              onChange={({ target: { value } }) =>
                setChartSettings((prev) => ({
                  ...prev,
                  customSettings: {
                    ...prev.customSettings,
                    comboStackAxisSymbols: {
                      prefix: value,
                      name:
                        prev.customSettings?.comboStackAxisSymbols?.name || '',
                      suffix:
                        prev.customSettings?.comboStackAxisSymbols?.suffix ||
                        '',
                    },
                  },
                }))
              }
            />
          </div>
          <div className={styles.wrapper}>
            <Text variant="btn">Label Formatting</Text>
            <Switch
              name="stack axis"
              defaultEnabled
              enabled={
                !!chartSettings.customSettings?.comboLabelFormatter?.find(
                  (opt) =>
                    [
                      chartSettings.customSettings?.comboStackAxisSymbols?.name,
                      STACK_AXIS,
                    ].includes(opt.axis)
                )
              }
              onChange={() =>
                setRangeAxis(
                  chartSettings.customSettings?.comboStackAxisSymbols?.name ||
                    STACK_AXIS
                )
              }
            />
          </div>
          {hasStackRange ? (
            <>
              {stackFormatter?.length ? (
                <div className="dbn-w-full dbn-flex dbn-flex-wrap dbn-gap-2">
                  {stackFormatter?.map((format) => (
                    <span className="dbn-px-2 dbn-py-1 dbn-rounded-md dbn-text-xs dbn-font-semibold dbn-flex dbn-gap-1 dbn-items-center dbn-justify-center dbn-bg-gray">
                      {`${format.label}(${format.lowerLimit} - ${format.upperLimit})`}
                      <Button
                        variant="popover"
                        leftIcon={<Icons name="cross" size="xxs" />}
                        onClick={() => onDeleteRange(format, stackAxisName)}
                      />
                    </span>
                  ))}
                </div>
              ) : null}
              {rangeModal !== stackAxisName ? (
                <Button
                  variant="secondary"
                  onClick={() => setRangeModal(stackAxisName)}
                  fitContainer
                  leftIcon={<Icons name="plus" size="sm" />}
                >
                  Add a range
                </Button>
              ) : null}
              {rangeModal === stackAxisName ? (
                <div className="dbn-w-full dbn-p-4 dbn-rounded-md dbn-m-4 dbn-border dbn-border-secondary dbn-bg-gray dbn-flex dbn-flex-col dbn-gap-3">
                  <div className="dbn-flex dbn-gap-4">
                    <InputField
                      type="number"
                      label="Lower Limit"
                      onChange={(e) =>
                        setRange((prev) => ({
                          ...prev,
                          lowerLimit: Number(e.target.value),
                        }))
                      }
                      value={range.lowerLimit}
                    />
                    <InputField
                      type="number"
                      label="Upper Limit"
                      onChange={(e) =>
                        setRange((prev) => ({
                          ...prev,
                          upperLimit: Number(e.target.value),
                        }))
                      }
                      value={range.upperLimit}
                    />
                  </div>
                  <InputField
                    type="text"
                    label="Label"
                    onChange={(e) =>
                      setRange((prev) => ({
                        ...prev,
                        label: e.target.value,
                      }))
                    }
                    value={range.label}
                  />
                  <div className="dbn-w-full dbn-flex dbn-gap-4 dbn-justify-end">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setRangeModal('');
                        setRange({
                          label: '',
                          upperLimit: 0,
                          lowerLimit: 0,
                        });
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => onSaveRange(range, stackAxisName)}
                      isDisabled={
                        !range.label ||
                        !range.lowerLimit.toString() ||
                        !range.upperLimit.toString() ||
                        range.upperLimit === range.lowerLimit
                      }
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default ComboChartFormatter;
