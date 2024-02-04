import React, { useCallback, useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import ExternalDashboardForm, {
  DashboardFormType,
} from 'components/ExternalDashboardForm';
import EmbedModal from './EmbedModal';
import styles from './externalDashboardComponents.module.css';
import AccessControl from 'components/AccessControl';

const SettingsButton = ({
  isEditingLayout,
  onChangeEditingLayout,
  isLayoutLocked = false,
  clientId,
}: {
  isEditingLayout: boolean;
  onChangeEditingLayout: (enabled: boolean) => void;
  isLayoutLocked?: boolean;
  clientId?: string;
}) => {
  const [isEmbedModa, setEmbedModal] = useState(false);
  const [modalOptions, setModalOptions] = useState<{
    open: boolean;
    type?: DashboardFormType;
  }>({ open: false, type: DashboardFormType.edit });

  const handleClick = useCallback((type: DashboardFormType) => {
    setModalOptions({ open: true, type });
  }, []);

  return (
    <>
      <Ui.PopoverMenu
        buttonContent={
          <span className={styles.headerIcon}>
            <Ui.NewTooltip text="Dashboard Settings">
              <Ui.Icons name="gear" />
            </Ui.NewTooltip>
          </span>
        }
        tabMenu
        position="bottom-end"
        offset={[10, 15]}
      >
        <div className="dbn-p-2">
          <div className="hover:dbn-bg-gray-3 dbn-rounded-md">
            <Ui.Button
              type="button"
              variant="tertiary"
              onClick={() => setEmbedModal(true)}
            >
              Integrate Dashboard
            </Ui.Button>
          </div>
          {/* <AccessControl feature="dashboardFilters" permission="View">
            <div className="hover:dbn-bg-gray-3 dbn-rounded-md">
              <Ui.Button
                type="button"
                variant="tertiary"
                onClick={() => handleClick(DashboardFormType.filter)}
                isDisabled={isEditingLayout}
              >
                Dashboard Filters
              </Ui.Button>
            </div>
          </AccessControl> */}
          <AccessControl feature="dashboard" permission="Delete">
            <div className="hover:dbn-bg-gray-3 dbn-rounded-md">
              <Ui.Button
                type="button"
                variant="tertiary"
                onClick={() => handleClick(DashboardFormType.delete)}
                isDisabled={isEditingLayout}
              >
                Delete Dashboard
              </Ui.Button>
            </div>
          </AccessControl>
          <AccessControl feature="dashboard" permission="Manage Metrics">
            <div className="hover:dbn-bg-gray-3 dbn-rounded-md">
              <Ui.Button
                type="button"
                variant="tertiary"
                onClick={() => handleClick(DashboardFormType.manage)}
                isDisabled={isEditingLayout}
              >
                Manage Metrics
              </Ui.Button>
            </div>
          </AccessControl>
        </div>
        <AccessControl feature="dashboard" permission="Change Layout">
          {!isLayoutLocked && (
            <div className="dbn-px-2 dbn-py-1 dbn-border-t dbn-border-secondary">
              <div className=" dbn-py-2 dbn-px-3 hover:dbn-bg-gray-3 dbn-rounded-md">
                <Ui.Switch
                  enabled={isEditingLayout}
                  onChange={onChangeEditingLayout}
                  placeholder="Customize Layout"
                  name="editingLayout"
                />
              </div>
            </div>
          )}
        </AccessControl>
      </Ui.PopoverMenu>
      <Ui.Modal
        isOpen={modalOptions.open}
        onClose={() => setModalOptions({ open: false })}
        headerTitle={modalOptions.type}
      >
        <ExternalDashboardForm
          onSuccess={() => setModalOptions({ open: false })}
          type={modalOptions.type}
          onCancel={() => setModalOptions({ open: false })}
          clientId={clientId}
        />
      </Ui.Modal>
      <EmbedModal isOpen={isEmbedModa} onClose={() => setEmbedModal(false)} />
    </>
  );
};

export default React.memo(SettingsButton);
