/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ui, hooks } from '@databrainhq/plugin';
import {
  ExternalDashboardMetrics,
  GetThemesQuery,
  useExternalDashboardMetricsQuery,
} from 'utils/generated/graphql';
import { useEffect, useMemo, useState } from 'react';
import { Layout } from 'react-grid-layout';
import ExternalMetricList from 'pages/ExternalDashboard/components/ExternalMetricList';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  FontWeightOptions,
  RadiusOptions,
  ShadowOptions,
  SizeOptions,
  Variants,
} from 'consts/values';
import CompletedStatus from 'components/CompletedStatus';
import Flex from 'components/Flex';
import useExternalDashboard from 'hooks/useExternalDashboard';
import useWorkspace from 'hooks/useWorkspace';
import useTheme from 'hooks/useTheme';
import useDebounce from 'hooks/useDebounce';
import styles from './playGround.module.css';
import ChartPalettes from './ChartPalettes';

const PlayGround: React.FC<any> = () => {
  const [selectedDashboard, setSelectedDashboard] = useState({
    label: '',
    value: '',
  });
  const [userTheme, setUserTheme] = useState<any>();
  const [isShowCustomisePanel, setShowCustomisePanel] =
    useState<boolean>(false);

  const [isChangesUnsaved, setIsChangesUnsaved] = useState(false);

  const { workspace, workspaces, setWorkspace } = useWorkspace();
  const { dashboards, isGettingDashboard } = useExternalDashboard(
    workspace?.id || undefined
  );
  const [isResetted, setResetted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setResetted(false);
    }, 5000);
  }, [isResetted]);

  const navigate = useNavigate();

  const {
    workspaceTheme,
    applyTheme,
    isLoadingTheme,
    setAdminTheme,
    saveTheme,
  } = useTheme();
  useEffect(() => {
    if (workspaceTheme) setUserTheme(workspaceTheme);
  }, [workspaceTheme]);

  const externalDashboard = dashboards?.find(
    (dash) => dash.id === selectedDashboard.value
  );

  const { data: externalDashboardMetricsData, isLoading } =
    useExternalDashboardMetricsQuery(
      {
        externalDashboardId: externalDashboard?.id || '',
        clientId: externalDashboard?.defaultClientId || '',
      },
      { enabled: !!externalDashboard?.id }
    );

  const externalDashboardMetrics = useMemo(
    () => externalDashboardMetricsData?.externalDashboardMetrics,
    [externalDashboardMetricsData?.externalDashboardMetrics]
  );

  const { isLayoutLocked, layout: clientLayout } =
    hooks.useClientDashboardLayout({
      externalDashboardId: externalDashboard?.id as unknown as string,
      clientId: externalDashboard?.defaultClientId || '',
    });

  useEffect(() => {
    if (!workspace?.id) {
      setWorkspace(workspaces[0]);
    }

    if (workspace?.id && dashboards?.length) {
      setSelectedDashboard({
        label: dashboards[0].name,
        value: dashboards[0].id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace?.id, JSON.stringify(dashboards)]);

  const getDropdownWidth = useMemo(() => {
    let dropdownWidth = '180px';

    switch (userTheme?.dashboard.selectBoxSize) {
      case 'small':
        dropdownWidth = '130px';
        break;
      case 'medium':
        dropdownWidth = '180px';
        break;
      case 'large':
        dropdownWidth = '250px';
        break;
      default:
        dropdownWidth = '180px';
    }

    return dropdownWidth;
  }, [userTheme]);
  const getCardRadius = useMemo(() => {
    return userTheme?.cardCustomization.borderRadius
      ? userTheme?.cardCustomization.borderRadius?.toString().includes('px')
        ? userTheme?.cardCustomization.borderRadius
        : `${userTheme?.cardCustomization.borderRadius}px`
      : '4px';
  }, [userTheme]);

  return (
    <div className={styles.playGroundContainer}>
      <section className={styles.navbar}>
        <Ui.Button
          leftIcon={<Ui.Icons name="arrow-left" />}
          variant="popover"
          className="dbn-border dbn-border-secondary dbn-p-2 dbn-rounded"
          onClick={() => navigate(-1)}
        />

        <div className="dbn-flex dbn-gap-4">
          <Ui.FloatingDropDown
            isSearchEnabled
            options={
              workspaces.map((itm) => ({
                label: itm.name,
                value: itm.id,
              })) || []
            }
            selectedOption={{
              label: workspace?.name || '',
              value: workspace?.id,
            }}
            onChange={(option) =>
              setWorkspace(workspaces.find((itm) => itm.id === option.value))
            }
            menuWidth="100%"
          />
          <Ui.FloatingDropDown
            options={
              dashboards?.map((dashboard) => ({
                label: dashboard.name,
                value: dashboard.id,
              })) || []
            }
            selectedOption={selectedDashboard}
            onChange={(option) => setSelectedDashboard(option)}
          />
        </div>

        {isChangesUnsaved ? (
          <div className=" dbn-bg-yellow-400 dbn-p-2 dbn-rounded dbn-mx-auto dbn-flex dbn-gap-2">
            <Ui.Text variant="body-text-sm">Changes Unsaved! </Ui.Text>{' '}
            <span
              className="dbn-cursor"
              onClick={() => setIsChangesUnsaved(false)}
            >
              <Ui.Icons name="cross" size="sm" />
            </span>
          </div>
        ) : null}

        <div className="dbn-ml-auto dbn-self-end dbn-flex dbn-gap-4">
          <div className={styles.switchColorPalettes}>
            {userTheme?.chart?.palettes?.map((palette: any) => {
              const isSelected = userTheme.chart?.selected === palette.name;

              return (
                <Ui.NewTooltip text={palette.name}>
                  <Ui.Button
                    variant="popover"
                    className={`${
                      isSelected ? `dbn-border-2` : ''
                    } dbn-rounded-full`}
                    style={{ borderColor: isSelected ? palette.colors[0] : '' }}
                    onClick={() => {
                      setIsChangesUnsaved(true);
                      setUserTheme((prev: any) => ({
                        ...prev,
                        chart: {
                          ...userTheme.chart,
                          selected: palette.name,
                        },
                      }));
                      applyTheme({
                        ...userTheme,
                        chart: {
                          ...userTheme.chart,
                          selected: palette.name,
                        },
                      });
                    }}
                  >
                    <span className={styles.paletteItem} key={palette.name}>
                      <Ui.ThemeBlock colors={palette?.colors} hideBackground />
                    </span>
                  </Ui.Button>
                </Ui.NewTooltip>
              );
            })}
          </div>
          <Ui.PopoverMenu
            buttonContent={
              <Ui.Button
                leftIcon={<Ui.Icons name="paint-brush" color="white" />}
                variant="primary"
                onClick={() => setShowCustomisePanel(true)}
              >
                Customize
              </Ui.Button>
            }
            position="left"
            menuWidth="400px"
            tabMenu
          >
            <ThemingOptions
              setIsChangesUnsaved={setIsChangesUnsaved}
              theme={userTheme}
              applyTheme={setAdminTheme}
              setTemporaryTheme={setUserTheme}
              saveTheme={saveTheme}
              isLoadingTheme={isLoadingTheme}
              navigate={navigate}
              resetTheme={() => {
                setResetted(true);
                setUserTheme(workspaceTheme);
                setAdminTheme(workspaceTheme);
              }}
              isResetted={isResetted}
            />
          </Ui.PopoverMenu>
        </div>
      </section>
      <section
        className={`${styles.metricContainer} dbn-btn-primary`}
        id="dbn-dashboard"
      >
        <ExternalMetricList
          layout={{
            clientLayout,
            adminLayout: externalDashboard?.layout || [],
            isLocked: true,
            onChange: (layout: Layout[]) => {},
          }}
          externalDashboardId={externalDashboard?.id || ''}
          userProvidedDashboardId={externalDashboard?.externalDashboardId || ''}
          client={externalDashboard?.defaultClientId || ''}
          externalDashboardMetrics={externalDashboardMetrics as any}
          isMetricListLoading={isGettingDashboard || isLoading}
          workspaceId={workspace?.id}
          dropdownTheme={{
            width: getDropdownWidth,
            variant: userTheme?.dashboard?.selectBoxVariant,
            radius: `${
              userTheme?.dashboard?.selectBoxBorderRadius
                ?.toString()
                .includes('px')
                ? userTheme?.dashboard?.selectBoxBorderRadius
                : `${userTheme?.dashboard?.selectBoxBorderRadius}px`
            }`,
          }}
        />
      </section>
    </div>
  );
};

const ThemingOptions: React.FC<{
  setIsChangesUnsaved: React.Dispatch<React.SetStateAction<boolean>>;
  theme: any;
  applyTheme: any;
  setTemporaryTheme: any;
  navigate: any;
  saveTheme: any;
  isLoadingTheme: boolean;
  resetTheme: any;
  isResetted: boolean;
}> = ({
  setIsChangesUnsaved,
  theme,
  applyTheme,
  setTemporaryTheme,
  navigate,
  saveTheme,
  isLoadingTheme,
  resetTheme,
  isResetted,
}) => {
  const [randomValue, setRandomvalue] = useState<any>();
  const debounceValue = useDebounce(randomValue, 500);
  const { control, register, setValue, watch, handleSubmit, reset, getValues } =
    useForm();
  const values = getValues();

  const getUpdatedTheme = () => {
    const newTheme = {
      id: theme?.id,
      companyId: theme?.companyId,
      general: {
        name: values.name,
        fontFamily: values.fontFamily,
      },
      dashboard: {
        backgroundColor: values.bgColor,
        ctaColor: values.ctaColor,
        ctaTextColor: values.ctaTextColor,
        selectBoxSize: values.selectBoxSize,
        selectBoxVariant: values.selectBoxVariant,
        selectBoxBorderRadius: values.selectBoxBorderRadius,
        selectBoxTextColor: values.selectBoxTextColor,
      },
      cardTitle: {
        fontWeight: values.cardTitleFontWeight,
        fontSize: values.cardTitleFontSize,
        color: values.cardTitleTextColor,
      },
      cardDescription: {
        fontWeight: values.cardDescriptionFontWeight,
        fontSize: values.cardDescriptionFontSize,
        color: values.cardDescriptionTextColor,
      },
      cardCustomization: {
        borderRadius: values.cardCustomisationBorderRadius,
        padding: values.cardPadding,
        shadow: values.cardShadow,
      },
      chart: {
        selected: values.chartPalette,
        palettes: values.chartPalettes,
      },
    };
    return newTheme;
  };

  useEffect(() => {
    if (Object.entries(values).length === 0) return;
    setTemporaryTheme(getUpdatedTheme());
    applyTheme(getUpdatedTheme(), true);
    setIsChangesUnsaved(true);
  }, [debounceValue]);

  useEffect(() => {
    if (!theme) return;
    setValue('name', theme.general.name);
    setValue('fontFamily', theme.general.fontFamily);
    setValue('bgColor', theme.dashboard.backgroundColor);
    setValue('ctaColor', theme.dashboard.ctaColor);
    setValue('ctaTextColor', theme.dashboard.ctaTextColor);
    setValue('selectBoxTextColor', theme.dashboard?.selectBoxTextColor);
    setValue('selectBoxSize', theme.dashboard.selectBoxSize);
    setValue('selectBoxVariant', theme.dashboard.selectBoxVariant);
    setValue('selectBoxBorderRadius', theme.dashboard.selectBoxBorderRadius);
    setValue('cardTitleFontWeight', theme.cardTitle.fontWeight);
    setValue('cardTitleFontSize', theme.cardTitle.fontSize);
    setValue('cardTitleTextColor', theme.cardTitle.color);
    setValue('cardDescriptionFontWeight', theme.cardDescription.fontWeight);
    setValue('cardDescriptionFontSize', theme.cardDescription.fontSize);
    setValue('cardDescriptionTextColor', theme.cardDescription.color);
    setValue(
      'cardCustomisationBorderRadius',
      theme.cardCustomization.borderRadius
    );
    setValue('cardPadding', theme.cardCustomization.padding);
    setValue('chartPalettes', theme.chart.palettes);
    setValue('chartPalette', theme.chart.selected);
    setValue('cardShadow', theme.cardCustomization?.shadow);
  }, [theme]);

  useEffect(() => {
    if (isResetted) reset();
  }, [isResetted]);

  return (
    <>
      <form
        onReset={() => {
          setIsChangesUnsaved(false);
          resetTheme();
        }}
        onSubmit={handleSubmit(() => {
          saveTheme(values, () => {
            navigate('/settings/embed/theming');
          });
        })}
        onChange={() => setRandomvalue(Math.random())}
        className="dbn-w-full dbn-h-[600px] dbn-overflow-y-auto"
      >
        <Flex className="dbn-w-full dbn-p-4 dbn-gap-8" direction="col">
          <Flex direction="col" className="dbn-gap-4">
            <Ui.Text variant="heading">General</Ui.Text>
            <Flex className="dbn-gap-[22px]" direction="col">
              <Ui.InputField
                label="Theme Name"
                name="name"
                type="text"
                placeholder="e.g Dark Theme"
                register={register('name', { required: true })}
              />
              <Ui.InputField
                label="Font Family"
                name="fontFamily"
                type="text"
                placeholder="E.g sans-serif. Should be included in your project."
                register={register('fontFamily', { required: true })}
              />
            </Flex>
          </Flex>
          <Flex direction="col" className="dbn-gap-4">
            <Ui.Text variant="heading">Dashboard</Ui.Text>
            <Flex className="dbn-gap-[22px]" direction="col">
              <Ui.ColorField
                name="bgColor"
                label="Dashboard Background Color"
                placeholder="#FFFFFF"
                defaultValue="#FFFFFF"
                value={watch().bgColor}
                onChange={(value) => setValue('bgColor', value)}
              />
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
                    onChange={(option) => {
                      setRandomvalue(Math.random());
                      field.onChange(option.value);
                    }}
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
                    onChange={(option) => {
                      setRandomvalue(Math.random());
                      field.onChange(option.value);
                    }}
                  />
                )}
              />
              <Ui.InputField
                name="selectBoxBorderRadius"
                type="number"
                label="Dropdown Border Radius (in px)"
                placeholder="11"
                register={register('selectBoxBorderRadius')}
              />
            </Flex>
          </Flex>
          <Flex direction="col" className="dbn-gap-4">
            <Ui.Text variant="heading">Card Title</Ui.Text>
            <Flex className="dbn-gap-[22px]" direction="col">
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
                    onChange={(option) => {
                      setRandomvalue(Math.random());
                      field.onChange(option.value);
                    }}
                  />
                )}
              />
              <Ui.InputField
                name="cardTitleFontSize"
                type="number"
                label="Card Title Text Size (in px)"
                placeholder="0"
                register={register('cardTitleFontSize')}
              />
              <Ui.ColorField
                name="cardTitleTextColor"
                label="Card Title Text Color"
                defaultValue="#C0CCF5"
                placeholder="#C0CCF5"
                value={watch().cardTitleTextColor}
                onChange={(value) => setValue('cardTitleTextColor', value)}
              />
            </Flex>
          </Flex>
          <Flex direction="col" className="dbn-gap-4">
            <Ui.Text variant="heading">Card Description</Ui.Text>
            <Flex className="dbn-gap-[22px]" direction="col">
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
                    onChange={(option) => {
                      setRandomvalue(Math.random());
                      field.onChange(option.value);
                    }}
                  />
                )}
              />
              <Ui.InputField
                name="cardDescriptionFontSize"
                type="number"
                label="Card Description Text Size (in px)"
                placeholder="0"
                register={register('cardDescriptionFontSize')}
              />
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
            </Flex>
          </Flex>
          <Flex direction="col" className="dbn-gap-4">
            <Ui.Text variant="heading">Card Customisation</Ui.Text>
            <Flex className="dbn-gap-[22px]" direction="col">
              <div className="dbn-w-full dbn-flex dbn-flex-col">
                <Ui.Text variant="body-text-sm">
                  Default Card Border Radius
                </Ui.Text>
                <div className="dbn-w-full dbn-flex dbn-gap-8 dbn-mt-1.5">
                  {RadiusOptions?.map((opt) => (
                    <Ui.Button
                      variant="popover"
                      className={`${
                        theme?.cardCustomization?.shadow === opt.value ||
                        watch('cardCustomisationBorderRadius') === opt.value
                          ? 'dbn-bg-gray'
                          : 'dbn-bg-white'
                      } dbn-px-2 dbn-py-1 dbn-rounded-md dbn-flex dbn-flex-col dbn-gap-2 dbn-text-xs dbn-font-bold`}
                      onClick={() => {
                        setRandomvalue(Math.random());
                        setValue('cardCustomisationBorderRadius', opt.value);
                      }}
                    >
                      <span
                        style={{ borderRadius: `${opt.value}px` }}
                        className="dbn-w-10 dbn-h-10 dbn-border dbn-border-secondary"
                      />
                      {opt.label}
                    </Ui.Button>
                  ))}
                </div>
              </div>
              <Ui.InputField
                name="cardCustomisationBorderRadius"
                type="number"
                label="Card Border Radius (in px)"
                placeholder="0"
                register={register('cardCustomisationBorderRadius')}
              />
              <Ui.InputField
                name="cardPadding"
                type="number"
                label="Padding (in px)"
                placeholder="0"
                register={register('cardPadding')}
              />
              <div className="dbn-w-full dbn-flex dbn-flex-col">
                <Ui.Text variant="body-text-sm">Shadow</Ui.Text>
                <div className="dbn-w-full dbn-grid dbn-grid-cols-4 dbn-mt-1 dbn-px-2">
                  {ShadowOptions?.map((opt) => (
                    <Ui.Button
                      variant="popover"
                      className={`${
                        watch('cardShadow') === opt.value
                          ? 'dbn-bg-gray'
                          : 'dbn-bg-white'
                      } dbn-p-2 dbn-rounded-md dbn-flex dbn-gap-2 dbn-flex-col dbn-text-xs dbn-font-bold`}
                      onClick={() => {
                        setValue('cardShadow', opt.value);
                        setRandomvalue(Math.random());
                      }}
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
            </Flex>
          </Flex>
          <Flex direction="col" className="dbn-gap-4">
            <Ui.Text variant="heading">Chart</Ui.Text>
            <Flex className="dbn-gap-3" direction="col">
              <Ui.Text variant="body-text-sm">Chart Color Palette</Ui.Text>
              <ChartPalettes
                watch={watch}
                setValue={setValue}
                palettes={theme?.chart.palettes}
              />
            </Flex>
          </Flex>
          <Flex justify="between" alignItems="center">
            {theme && (
              <>
                <Ui.Button type="reset" variant="secondary">
                  Reset Theme
                </Ui.Button>
                <Ui.Button
                  type="submit"
                  variant="primary"
                  isDisabled={isLoadingTheme || !watch('name')?.length}
                  onClick={() => setIsChangesUnsaved(false)}
                >
                  {isLoadingTheme ? 'Saving...' : 'Save Theme'}
                </Ui.Button>
              </>
            )}
            {isResetted && <CompletedStatus text="Reset Successfully!" />}
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default PlayGround;
