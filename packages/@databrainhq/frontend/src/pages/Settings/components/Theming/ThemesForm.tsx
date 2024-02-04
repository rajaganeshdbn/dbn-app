/* eslint-disable react/forbid-dom-props */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-relative-parent-imports */
import React, { useEffect, useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { Controller, useForm } from 'react-hook-form';
import SettingsLayout from 'pages/Settings';
import { useNavigate } from 'react-router-dom';
import {
  FontWeightOptions,
  RadiusOptions,
  ShadowOptions,
  SizeOptions,
  Variants,
} from 'consts/values';
import Flex from 'components/Flex';
import useTheme from 'hooks/useTheme';
import ChartPalettes from './ChartPalettes';

const ThemesForm = () => {
  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { saveTheme, isLoadingTheme, updateTheme, theme } = useTheme();

  useEffect(() => {
    if (!theme) return;
    setValue('name', theme.general?.name);
    setValue('fontFamily', theme.general?.fontFamily);
    setValue('bgColor', theme.dashboard?.backgroundColor);
    setValue('ctaColor', theme.dashboard?.ctaColor);
    setValue('ctaTextColor', theme.dashboard?.ctaTextColor);
    setValue('selectBoxTextColor', theme.dashboard?.selectBoxTextColor);
    setValue('selectBoxSize', theme.dashboard?.selectBoxSize);
    setValue('selectBoxVariant', theme.dashboard?.selectBoxVariant);
    setValue('selectBoxBorderRadius', theme.dashboard?.selectBoxBorderRadius);
    setValue('cardTitleFontWeight', theme.cardTitle?.fontWeight);
    setValue('cardTitleFontSize', theme.cardTitle?.fontSize);
    setValue('cardTitleTextColor', theme.cardTitle?.color);
    setValue('cardDescriptionFontWeight', theme.cardDescription?.fontWeight);
    setValue('cardDescriptionFontSize', theme.cardDescription?.fontSize);
    setValue('cardDescriptionTextColor', theme.cardDescription?.color);
    setValue(
      'cardCustomisationBorderRadius',
      theme.cardCustomization?.borderRadius
    );
    setValue('cardPadding', theme.cardCustomization?.padding);
    setValue('chartPalettes', theme.chart?.palettes);
    setValue('chartPalette', theme.chart?.selected);
    setValue('workspaces', theme.general?.workspace);
    setValue('cardShadow', theme.cardCustomization?.shadow);
  }, [theme]);

  return (
    <>
      <SettingsLayout>
        <form
          onSubmit={handleSubmit((values) => {
            if (theme?.general?.name) {
              updateTheme(values, theme.id, () => {
                navigate('/settings/embed/theming');
              });
            } else {
              saveTheme(values, () => {
                navigate('/settings/embed/theming');
              });
            }
          })}
          className="dbn-w-full dbn-h-[calc(100%-3rem)] dbn-overflow-auto"
        >
          <Flex className="dbn-w-full dbn-p-10 dbn-gap-8" direction="col">
            <Flex direction="col" className="dbn-gap-5">
              <Ui.Text variant="heading">Theme</Ui.Text>
              <div className="dbn-w-full dbn-grid dbn-grid-cols-3 dbn-px-10 dbn-gap-[22px]">
                <Ui.InputField
                  label="Theme Name *"
                  name="name"
                  type="text"
                  placeholder="e.g Dark Theme"
                  register={register('name', {
                    required: {
                      value: true,
                      message: 'Theme name is required',
                    },
                  })}
                  error={errors.name?.message}
                />
                <Ui.InputField
                  label="Font Family *"
                  name="fontFamily"
                  type="text"
                  placeholder="E.g sans-serif. Should be included in your project."
                  register={register('fontFamily', {
                    required: {
                      value: true,
                      message: 'Font family is required',
                    },
                  })}
                  error={errors.fontFamily?.message}
                />
              </div>
            </Flex>
            <Flex direction="col" className="dbn-gap-5">
              <Ui.Text variant="heading">Dashboard</Ui.Text>
              <Flex className="dbn-px-10 dbn-gap-[22px]" direction="col">
                <div className="dbn-w-full dbn-grid dbn-grid-cols-3 dbn-gap-[22px]">
                  <Ui.ColorField
                    name="bgColor"
                    label="Dashboard Background Color"
                    placeholder="#FFFFFF"
                    defaultValue="#FFFFFF"
                    value={watch().bgColor}
                    onChange={(value) => setValue('bgColor', value)}
                  />
                  <Flex className="dbn-gap-[2.5px]" direction="col">
                    <Ui.Text variant="body-text-sm">Color Palette</Ui.Text>
                    <ChartPalettes
                      watch={watch}
                      setValue={setValue}
                      palettes={theme?.chart?.palettes}
                    />
                  </Flex>
                </div>
                <div className="dbn-w-full dbn-grid dbn-grid-cols-3 dbn-gap-[22px]">
                  <Ui.ColorField
                    name="ctaColor"
                    label="CTA Button Color"
                    defaultValue="#5865F6"
                    placeholder="#5865F6"
                    value={watch().ctaColor}
                    onChange={(value) => setValue('ctaColor', value)}
                  />
                  <Ui.ColorField
                    name="ctaTextColor"
                    label="CTA Text Color"
                    defaultValue="#FFFFFF"
                    placeholder="#FFFFFF"
                    value={watch().ctaTextColor}
                    onChange={(value) => setValue('ctaTextColor', value)}
                  />
                  <Ui.ColorField
                    name="selectBoxTextColor"
                    label="Select Box Text Color"
                    defaultValue="#FFFFFF"
                    placeholder="#FFFFFF"
                    value={watch().selectBoxTextColor}
                    onChange={(value) => setValue('selectBoxTextColor', value)}
                  />
                </div>
                <div className="dbn-w-full dbn-grid dbn-grid-cols-3 dbn-gap-[22px]">
                  <Controller
                    name="selectBoxSize"
                    control={control}
                    render={({ field }) => (
                      <Ui.FloatingDropDown
                        buttonWidth="100%"
                        label="Dropdown size"
                        options={SizeOptions}
                        selectedOption={{
                          value: field.value,
                          label: field.value,
                        }}
                        onChange={(option) => field.onChange(option.value)}
                      />
                    )}
                  />
                  <Controller
                    name="selectBoxVariant"
                    control={control}
                    render={({ field }) => (
                      <Ui.FloatingDropDown
                        buttonWidth="100%"
                        label="Dropdown variant"
                        options={Variants}
                        selectedOption={{
                          value: field.value,
                          label: field.value,
                        }}
                        onChange={(option) => field.onChange(option.value)}
                      />
                    )}
                  />
                  <Ui.InputField
                    name="selectBoxBorderRadius"
                    type="text"
                    label="Dropdown Border Radius"
                    placeholder="11px"
                    register={register('selectBoxBorderRadius')}
                  />
                </div>
              </Flex>
            </Flex>
            <Flex direction="col" className="dbn-gap-5">
              <Ui.Text variant="heading">Card</Ui.Text>
              <div className="dbn-w-full dbn-grid dbn-grid-cols-3 dbn-px-10 dbn-gap-[22px]">
                <Ui.InputField
                  name="cardCustomisationBorderRadius"
                  type="text"
                  label="Card Border Radius"
                  placeholder="11px"
                  register={register('cardCustomisationBorderRadius')}
                />
                <Ui.InputField
                  name="cardPadding"
                  type="text"
                  label="Padding"
                  placeholder="11px"
                  register={register('cardPadding')}
                />
              </div>
              <div className="dbn-w-full dbn-grid dbn-grid-cols-3 dbn-gap-[22px] dbn-px-10">
                <Ui.ColorField
                  name="cardDescriptionTextColor"
                  label="Card Description Text Color"
                  defaultValue="#C0CCF5"
                  placeholder="#C0CCF5"
                  value={watch().cardDescriptionTextColor}
                  onChange={(value) =>
                    setValue('cardDescriptionTextColor', value)
                  }
                />
                <Ui.ColorField
                  name="cardTitleTextColor"
                  label="Card Title Text Color"
                  defaultValue="#C0CCF5"
                  placeholder="#C0CCF5"
                  value={watch().cardTitleTextColor}
                  onChange={(value) => setValue('cardTitleTextColor', value)}
                />
                <Ui.InputField
                  name="cardTitleFontSize"
                  type="text"
                  label="Card Title Text Size"
                  placeholder="14px"
                  register={register('cardTitleFontSize')}
                />
              </div>
              <div className="dbn-w-full dbn-grid dbn-grid-cols-3 dbn-gap-[22px] dbn-px-10">
                <Ui.InputField
                  name="cardDescriptionFontSize"
                  type="text"
                  label="Card Description Text Size"
                  placeholder="11px"
                  register={register('cardDescriptionFontSize')}
                />
                <Controller
                  name="cardDescriptionFontWeight"
                  control={control}
                  render={({ field }) => (
                    <Ui.FloatingDropDown
                      buttonWidth="100%"
                      label="Card Description Text Weight"
                      options={FontWeightOptions}
                      selectedOption={{
                        value: field.value,
                        label: field.value,
                      }}
                      onChange={(option) => field.onChange(option.value)}
                    />
                  )}
                />
                <Controller
                  name="cardTitleFontWeight"
                  control={control}
                  render={({ field }) => (
                    <Ui.FloatingDropDown
                      buttonWidth="100%"
                      label="Card Title Text Weight"
                      options={FontWeightOptions}
                      selectedOption={{
                        value: field.value,
                        label: field.value,
                      }}
                      onChange={(option) => field.onChange(option.value)}
                    />
                  )}
                />
              </div>
              <div className="dbn-w-full dbn-grid dbn-grid-cols-3 dbn-px-10 dbn-gap-[22px]">
                <div className="dbn-w-full dbn-flex dbn-flex-col">
                  <Ui.Text variant="body-text-sm">
                    Default Card Border Radius
                  </Ui.Text>
                  <div className="dbn-w-full dbn-flex dbn-gap-6 dbn-mt-1.5">
                    {RadiusOptions?.map((opt) => (
                      <Ui.Button
                        variant="popover"
                        className={`${
                          theme?.cardCustomization?.shadow === opt.unitValue ||
                          watch('cardCustomisationBorderRadius') ===
                            opt.unitValue
                            ? 'dbn-bg-gray'
                            : 'dbn-bg-white'
                        } dbn-px-2 dbn-py-1 dbn-rounded-md dbn-flex dbn-flex-col dbn-gap-2 dbn-text-xs dbn-font-bold`}
                        onClick={() =>
                          setValue(
                            'cardCustomisationBorderRadius',
                            opt.unitValue
                          )
                        }
                      >
                        <span
                          style={{ borderRadius: opt.unitValue }}
                          className="dbn-w-10 dbn-h-10 dbn-border dbn-border-secondary"
                        />
                        {opt.label}
                      </Ui.Button>
                    ))}
                  </div>
                </div>
                <div className="dbn-w-full dbn-flex dbn-flex-col">
                  <Ui.Text variant="body-text-sm">Shadow</Ui.Text>
                  <div className="dbn-w-full dbn-flex dbn-gap-6 dbn-mt-1.5">
                    {ShadowOptions?.map((opt) => (
                      <Ui.Button
                        variant="popover"
                        className={`${
                          theme?.cardCustomization?.shadow === opt.value ||
                          watch('cardShadow') === opt.value
                            ? 'dbn-bg-gray'
                            : 'dbn-bg-white'
                        } dbn-px-2 dbn-py-1 dbn-rounded-md dbn-flex dbn-flex-col dbn-gap-2 dbn-text-xs dbn-font-bold`}
                        onClick={() => setValue('cardShadow', opt.value)}
                      >
                        <span
                          style={{ boxShadow: opt.value }}
                          className="dbn-w-10 dbn-h-10 dbn-border dbn-border-secondary dbn-rounded-md"
                        />
                        {opt.label}
                      </Ui.Button>
                    ))}
                  </div>
                </div>
              </div>
            </Flex>
            <Flex justify="end" alignItems="center">
              {!theme?.general?.name ? (
                <Ui.Button
                  type="submit"
                  variant="primary"
                  isDisabled={isLoadingTheme || !watch('name')?.length}
                >
                  {isLoadingTheme ? 'Saving...' : 'Save Theme'}
                </Ui.Button>
              ) : (
                <Ui.Button
                  type="submit"
                  variant="secondary"
                  isDisabled={isLoadingTheme}
                >
                  {isLoadingTheme ? 'Updating...' : 'Update Theme'}
                </Ui.Button>
              )}
            </Flex>
          </Flex>
        </form>
      </SettingsLayout>
    </>
  );
};

export default React.memo(ThemesForm);
