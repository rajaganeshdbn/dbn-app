import React, { useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { ThemeType } from 'hooks/useExternalDashboardThemes';
import ThemeForm from './ThemeForm';

const ThemeTable = ({ isLoading, themes }: any) => {
  const [isShowThemeModal, setShowThemeModal] = useState(false);
  const [modalTheme, setModalTheme] = useState<{
    mode: 'edit' | 'delete';
    theme?: ThemeType;
  }>({
    mode: 'edit',
  });

  const handleModalClose = () => {
    setShowThemeModal(false);
    setModalTheme((prev) => ({
      ...prev,
      theme: undefined,
    }));
  };

  return (
    <>
      {isLoading ? (
        <div className="dbn-w-full dbn-h-full dbn-flex dbn-justify-center dbn-items-center">
          <Ui.Icons name="not-found" /> {/* loading icon */}
        </div>
      ) : (
        <>
          <table
            className="dbn-w-full dbn-my-5 dbn-border"
            cellPadding={8}
            border={1}
            cellSpacing={5}
          >
            <thead>
              <tr className="dbn-bg-[#F9FAFB] dbn-text-left">
                <th className="dbn-px-10 dbn-font-semibold">Theme Name</th>
                <th className="dbn-px-10 dbn-font-semibold">Theme Users</th>
                <th className="dbn-px-10 dbn-font-semibold">
                  Chart Color Palettes
                </th>
                <th className="dbn-px-10 dbn-font-semibold">Created Date</th>
                <th className="dbn-px-10 dbn-font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {themes?.map((theme: any) => (
                <tr key={theme.id} className="dbn-border-t">
                  <td className="dbn-px-10">{theme.name}</td>
                  <td className="dbn-px-10">
                    {theme.clients.map((client: any) => (
                      <span
                        className="dbn-px-2 dbn-py-1 dbn-text-xs dbn-rounded dbn-mr-1 dbn-bg-slate-100"
                        key={client.clientId}
                      >
                        {client.clientName}
                      </span>
                    ))}
                  </td>
                  <td className="dbn-px-10">
                    {theme.colors.map((color: string) => (
                      <span
                        className="dbn-h-4 dbn-w-4 dbn-border dbn-mx-1 dbn-inline-block dbn-rounded"
                        // eslint-disable-next-line
                        style={{ backgroundColor: color }}
                        key={color}
                      />
                    ))}
                  </td>
                  <td className="dbn-px-10">
                    {new Date(theme.createdAt).toDateString()}
                  </td>
                  <td className="dbn-px-10 dbn-flex dbn-justify-around dbn-items-center">
                    <Ui.Button
                      onClick={() => {
                        setModalTheme({
                          mode: 'edit',
                          theme,
                        });
                        setShowThemeModal(true);
                      }}
                      variant="tertiary"
                      type="button"
                    >
                      <Ui.Icons name="pencil-simple" />
                    </Ui.Button>
                    <Ui.Button
                      onClick={() => {
                        setModalTheme({
                          mode: 'delete',
                          theme,
                        });
                        setShowThemeModal(true);
                      }}
                      variant="tertiary"
                      type="button"
                    >
                      <Ui.Icons name="cross" />
                    </Ui.Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <Ui.Modal
        isOpen={isShowThemeModal}
        onClose={handleModalClose}
        headerTitle={modalTheme.mode === 'edit' ? 'Edit Theme' : 'Delete Theme'}
      >
        <ThemeForm
          onCancel={handleModalClose}
          onSave={handleModalClose}
          defaultValues={modalTheme.theme}
          mode={modalTheme.mode}
        />
      </Ui.Modal>
    </>
  );
};

export default React.memo(ThemeTable);
