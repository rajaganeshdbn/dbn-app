/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-relative-parent-imports */
import React, { useEffect, useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import SettingsLayout from 'pages/Settings';
import { NavLink, useNavigate } from 'react-router-dom';
import Flex from 'components/Flex';
import AccessControl from 'components/AccessControl';
import useTheme from 'hooks/useTheme';
import useAccessControl from 'hooks/useAccessControl';
import { getCurrentUser } from 'helpers/application/auth';
import ChartPalettes from './ChartPalettes';

const Theming = () => {
  const navigate = useNavigate();
  const [themes, setTheme] = useState<any[]>();
  const { getIsCanAccess } = useAccessControl();

  const [defaultThemeAlert, setDefaultThemeAlert] = useState<{
    isOpen: boolean;
    theme: string;
  }>({
    isOpen: false,
    theme: '',
  });
  const {
    themesData,
    deleteTheme,
    isLoadingTheme,
    defaultTheme,
    markDefaultTheme,
  } = useTheme();
  useEffect(() => {
    setTheme(themesData?.themes || []);
  }, [themesData]);
  useEffect(() => {
    if (defaultThemeAlert.isOpen) {
      setTimeout(() => {
        setDefaultThemeAlert({
          isOpen: false,
          theme: '',
        });
      }, 3000);
    }
  }, [defaultThemeAlert.isOpen]);
  return (
    <>
      <SettingsLayout>
        <div className="dbn-w-3/4 dbn-h-[calc(100%-3rem)] dbn-overflow-auto">
          <Flex className="dbn-w-full dbn-p-10 dbn-gap-4" direction="col">
            <section className="dbn-border dbn-border-secondary dbn-p-4 dbn-rounded dbn-flex dbn-items-center dbn-justify-between">
              <div>
                <Ui.Text variant="heading-lg">What's New</Ui.Text>
                <Ui.Text variant="body-text">
                  We just launched a new playground for you to pick the theme of
                  your choice
                </Ui.Text>
              </div>
              <NavLink to="/playground">
                <Ui.Button variant="secondary">Enter playground</Ui.Button>
              </NavLink>
            </section>
            <div className="dbn-flex dbn-justify-end">
              <AccessControl feature="uiTheming" permission="Create">
                <NavLink to="/settings/embed/themeForm/">
                  <Ui.Button
                    variant="primary"
                    leftIcon={<Ui.Icons size="sm" name="plus" color="white" />}
                  >
                    Add New Theme
                  </Ui.Button>
                </NavLink>
              </AccessControl>
            </div>
            {defaultThemeAlert.isOpen ? (
              <Ui.Alert
                text={`${defaultThemeAlert.theme} is marked as the default theme`}
                variant="success"
              />
            ) : null}
            <table className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-3">
              <tbody className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-2">
                {themes?.length ? (
                  <>
                    {themes.map((theme: any) => {
                      const colors =
                        theme?.chart?.palettes?.find(
                          (palette: { name: string; colors: string[] }) =>
                            palette.name === theme?.chart?.selected
                        )?.colors ||
                        theme?.chart?.palettes?.find(
                          (palette: { name: string; colors: string[] }) =>
                            palette.name === 'Default'
                        )?.colors;
                      return (
                        <tr
                          key={theme.id}
                          className="dbn-w-full dbn-flex dbn-rounded-md dbn-flex-row dbn-border dbn-border-secondary dbn-py-2 dbn-px-4"
                        >
                          <td className="dbn-w-[95%] dbn-flex dbn-gap-4 dbn-items-center dbn-px-2 dbn-text-sm dbn-truncate">
                            <Ui.ThemeBlock
                              colors={colors}
                              bgColor={theme.dashboard?.backgroundColor}
                            />
                            <AccessControl
                              feature="uiTheming"
                              permission="Edit"
                              fallback={theme.general.name}
                            >
                              <NavLink
                                to={`/settings/embed/themeForm/${theme.general.name}/`}
                                className="hover:dbn-underline"
                              >
                                {theme.general.name}
                              </NavLink>
                            </AccessControl>
                            {defaultTheme === theme.id && (
                              <span className="dbn-bg-success dbn-text-white dbn-px-2.5 dbn-py-1 dbn-rounded-2xl">
                                Default
                              </span>
                            )}
                          </td>
                          {getIsCanAccess('uiTheming', 'Mark Default') ||
                          getIsCanAccess('uiTheming', 'Edit') ||
                          getIsCanAccess('uiTheming', 'Delete') ? (
                            <td className="dbn-w-[5%] dbn-px-2 dbn-flex dbn-items-center">
                              <Ui.PopoverMenu
                                buttonContent={
                                  <Ui.Icons name="kebab-menu-vertical" />
                                }
                                position="right"
                                menuWidth="200px"
                              >
                                <AccessControl
                                  feature="uiTheming"
                                  permission="Mark Default"
                                >
                                  <Ui.Button
                                    variant="popover"
                                    onClick={async () => {
                                      await markDefaultTheme({
                                        companyId: getCurrentUser()?.companyId,
                                        themeId: theme.id,
                                      });
                                      setDefaultThemeAlert({
                                        isOpen: true,
                                        theme: theme.general.name,
                                      });
                                    }}
                                    isDisabled={
                                      isLoadingTheme ||
                                      theme.id === defaultTheme
                                    }
                                    className="dbn-w-full dbn-flex dbn-justify-start dbn-px-3 dbn-py-2 hover:dbn-bg-gray"
                                  >
                                    Mark As Default Theme
                                  </Ui.Button>
                                </AccessControl>
                                <AccessControl
                                  feature="uiTheming"
                                  permission="Edit"
                                >
                                  <Ui.Button
                                    variant="popover"
                                    onClick={() =>
                                      navigate(
                                        `/settings/embed/themeForm/${theme.general.name}/`
                                      )
                                    }
                                    isDisabled={isLoadingTheme}
                                    className="dbn-w-full dbn-flex dbn-justify-start dbn-px-3 dbn-py-2 hover:dbn-bg-gray"
                                  >
                                    Edit
                                  </Ui.Button>
                                </AccessControl>
                                <AccessControl
                                  feature="uiTheming"
                                  permission="Delete"
                                >
                                  <Ui.Button
                                    variant="popover"
                                    onClick={() => deleteTheme(theme.id)}
                                    isDisabled={isLoadingTheme}
                                    className="dbn-w-full dbn-flex dbn-justify-start dbn-px-3 dbn-py-2 hover:dbn-bg-gray"
                                  >
                                    Delete
                                  </Ui.Button>
                                </AccessControl>
                              </Ui.PopoverMenu>
                            </td>
                          ) : null}
                        </tr>
                      );
                    })}
                  </>
                ) : null}
                {!themes?.length ? (
                  <div className="dbn-w-full dbn-flex dbn-flex-col dbn-h-32 dbn-justify-center dbn-items-center dbn-border-t dbn-border-secondary">
                    <Ui.Text variant="btn">No Themes Created Yet</Ui.Text>
                    <Ui.Text variant="body-text-sm">
                      Click on the button above to create themes and apply to
                      different workspaces
                    </Ui.Text>
                  </div>
                ) : null}
              </tbody>
            </table>
          </Flex>
        </div>
      </SettingsLayout>
    </>
  );
};

export default React.memo(Theming);
