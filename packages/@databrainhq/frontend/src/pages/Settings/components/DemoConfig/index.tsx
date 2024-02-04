/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-relative-parent-imports */
import React, { useEffect, useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { useForm } from 'react-hook-form';
import SettingsLayout from 'pages/Settings';
import { useNavigate } from 'react-router-dom';
import Flex from 'components/Flex';
import CompletedStatus from 'components/CompletedStatus';
import AccessControl from 'components/AccessControl';
import useDemoConfig from 'hooks/useDemoConfig';
import useAccessControl from 'hooks/useAccessControl';

const DemoConfig = () => {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isCopiedId, setCopiedId] = useState(false);
  const {
    demoConfig,
    saveDemoConfig,
    isLoadingDemoConfig,
    resetDemoConfig,
    isResetted,
  } = useDemoConfig();
  const [isTheming, setTheming] = useState(false);
  useEffect(() => {
    if (isTheming) {
      navigate('/settings/embed/theming');
    }
  }, [isTheming]);

  const { getIsCanAccess } = useAccessControl();

  useEffect(() => {
    if (!demoConfig) return;
    setValue('dashboardTitle', demoConfig.dashboardTitle || '');
    setValue('logoUrl', demoConfig.logoUrl || '');
    setValue('primaryColor', demoConfig.primaryColor || '');
    setValue('textColor', demoConfig.textColor || '');
    setValue('navbarColor', demoConfig.navbarColor || '');
    setValue('highlightColor', demoConfig.highlightColor || '');
    setValue('isHideSettings', demoConfig.settings?.isHideSettings ?? false);
    setValue('isHideProfile', demoConfig.settings?.isHideProfile ?? false);
  }, [demoConfig]);

  useEffect(() => {
    if (isResetted) reset();
  }, [isResetted]);

  useEffect(() => {
    if (!isCopiedId) return;
    setTimeout(() => {
      setCopiedId(false);
    }, 3000);
  }, [isCopiedId]);

  return (
    <>
      <SettingsLayout>
        <form
          onSubmit={
            getIsCanAccess('demoConfig', 'Edit')
              ? handleSubmit(saveDemoConfig)
              : undefined
          }
          onReset={
            getIsCanAccess('demoConfig', 'Delete')
              ? () => resetDemoConfig(demoConfig?.id)
              : undefined
          }
          className="dbn-w-full dbn-h-[calc(100%-3rem)] dbn-overflow-auto"
        >
          <Flex className="dbn-w-full dbn-p-10 dbn-gap-8" direction="col">
            <Ui.Text variant="heading">
              Customize and define the following attributes for a unique
              analytics branding; note that changes in{' '}
              <span
                onClick={() => setTheming(true)}
                className="dbn-cursor-pointer hover:dbn-text-tertiary-dark hover:dbn-underline"
              >
                UI Theming
              </span>{' '}
              will also apply to demo.useDatabrain.com
            </Ui.Text>
            <Flex
              className="dbn-gap-[22px] dbn-w-full md:dbn-w-[70%]"
              direction="col"
            >
              <Ui.InputField
                label="Config Id"
                name="id"
                type="text"
                defaultValue={demoConfig?.id}
                placeholder="Will be auto generated"
                isDisabled
              />
              <Ui.InputField
                label="Dashboard Title*"
                name="dashboardTitle"
                type="text"
                placeholder="E.g. Databrain Sales"
                register={register('dashboardTitle', {
                  required: {
                    value: true,
                    message: 'Dashboard Title is required',
                  },
                })}
                error={errors.dashboardTitle?.message}
                isDisabled={!getIsCanAccess('demoConfig', 'Edit')}
              />
              <Ui.InputField
                label="Brand Logo*"
                name="logoUrl"
                type="text"
                placeholder="Your brand logo url"
                register={register('logoUrl', {
                  required: {
                    value: true,
                    message: 'Brand Logo is required',
                  },
                })}
                error={errors.logoUrl?.message}
                isDisabled={!getIsCanAccess('demoConfig', 'Edit')}
              />
              <Ui.ColorField
                name="primaryColor"
                label="Primary Color"
                placeholder="#FFFFFF"
                value={watch().primaryColor}
                onChange={(value) => setValue('primaryColor', value)}
                isDisabled={!getIsCanAccess('demoConfig', 'Edit')}
              />
              <Ui.ColorField
                name="textColor"
                label="Text Color"
                placeholder="#000000"
                value={watch().textColor}
                onChange={(value) => setValue('textColor', value)}
                isDisabled={!getIsCanAccess('demoConfig', 'Edit')}
              />
              <Ui.ColorField
                name="navbarColor"
                label="Navbar Color"
                placeholder="#FFFFFF"
                value={watch().navbarColor}
                onChange={(value) => setValue('navbarColor', value)}
                isDisabled={!getIsCanAccess('demoConfig', 'Edit')}
              />
              <Ui.ColorField
                name="highlightColor"
                label="Highlight Color"
                placeholder="#333333"
                value={watch().highlightColor}
                onChange={(value) => setValue('highlightColor', value)}
                isDisabled={!getIsCanAccess('demoConfig', 'Edit')}
              />
              <Ui.Checkbox
                label="Hide Settings"
                name="isHideSettings"
                onChange={(e) => setValue('isHideSettings', e.target.checked)}
                checked={watch('isHideSettings')}
              />
              <Ui.Checkbox
                label="Hide Profile"
                name="isHideProfile"
                onChange={(e) => setValue('isHideProfile', e.target.checked)}
                checked={watch('isHideProfile')}
              />
            </Flex>
            <Flex justify="between" alignItems="center">
              <AccessControl feature="demoConfig" permission="Edit">
                <Ui.Button
                  type="submit"
                  variant="primary"
                  isDisabled={isLoadingDemoConfig}
                >
                  {isLoadingDemoConfig ? 'Saving...' : 'Save Config'}
                </Ui.Button>
              </AccessControl>
              <AccessControl feature="demoConfig" permission="Delete">
                {demoConfig && (
                  <Ui.Button
                    type="reset"
                    variant="tab"
                    leftIcon={<Ui.Icons name="not-found" />}
                  >
                    {' '}
                    {/* rese-icon */}
                    Reset Config
                  </Ui.Button>
                )}
                {isResetted && <CompletedStatus text="Reset Successfully!" />}
              </AccessControl>
            </Flex>
          </Flex>
        </form>
      </SettingsLayout>
    </>
  );
};

export default React.memo(DemoConfig);
