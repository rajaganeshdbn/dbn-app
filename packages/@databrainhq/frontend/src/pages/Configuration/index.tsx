/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable react/forbid-dom-props */
import { useMemo, useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { useIntegrationsListQuery } from 'utils/generated/graphql';
import { BIGQUERY, INTEGRATION_LABEL } from 'consts/application';
import IntegrationList from 'components/AddIntegration/components/IntegrationList';
import useWorkspace from 'hooks/useWorkspace';
import DLogo from '../../assets/BrandLogo/databrain-dark-collapsed.svg';
import styles from './configuration.module.css';

const Configuration = () => {
  const { data } = useIntegrationsListQuery();
  const integrationDataList = data?.integrations;
  const { workspaces, isLoadingWorkspaces } = useWorkspace();

  const formattedIntegrationDataList = useMemo(
    () =>
      integrationDataList?.map((i) => ({
        ...i,
        label: INTEGRATION_LABEL[i.name?.toUpperCase() || ''] || i.name,
      })) || [],
    [integrationDataList]
  );
  return (
    <div className="dbn-w-full dbn-h-full dbn-overflow-hidden">
      <div className={styles['configuration-container']}>
        <div className="dbn-w-[580px] dbn-h-full dbn-flex dbn-flex-col dbn-gap-8 dbn-items-center dbn-justify-center">
          {!isLoadingWorkspaces && workspaces?.length <= 1 && (
            <>
              <div className={styles.configHeader}>
                <div className={styles['congifHeader-wrapper']}>
                  <Ui.Text variant="heading-lg">Explore Demo Instance</Ui.Text>
                  <div className={styles.badge}>3-min</div>
                </div>
                <div className="dbn-w-full dbn-h-20 dbn-p-4 dbn-rounded-md dbn-border dbn-border-secondary dbn-shadow-bs-10 dbn-flex dbn-items-center dbn-justify-between">
                  <div className="dbn-w-auto dbn-flex dbn-gap-4 dbn-items-center dbn-py-[5px] dbn-pr-[13px]">
                    <img src={DLogo} alt="" style={{ height: '48px' }} />
                    <Ui.Text variant="body-text">
                      Databrain Demo Instance
                    </Ui.Text>
                  </div>
                  <Ui.Button
                    variant="primary"
                    rightIcon={<Ui.Icons name="arrow-right" color="white" />}
                  >
                    Get Started
                  </Ui.Button>
                </div>
              </div>
              <div className="dbn-w-full dbn-flex dbn-flex-row dbn-gap-0 dbn-items-center dbn-justify-center">
                <div className={styles.line} />
                <div className="dbn-h-[34px] dbn-px-[10px] dbn-flex dbn-items-center dbn-justify-center dbn-rounded-[250px] dbn-border dbn-border-[#CCC] dbn-shadow-bs-11">
                  <Ui.Text variant="btn">OR</Ui.Text>
                </div>
                <div className={styles.line} />
              </div>
            </>
          )}
          <IntegrationList
            integrationDataList={formattedIntegrationDataList ?? []}
          />
        </div>
      </div>
    </div>
  );
};

export default Configuration;
