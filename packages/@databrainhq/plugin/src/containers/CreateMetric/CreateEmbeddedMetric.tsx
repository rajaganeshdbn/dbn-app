/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-relative-parent-imports */
import React, { HTMLAttributes, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  EmbeddedMetricCreation,
  Icons,
  Loader,
} from '@/components';
import { useDashboardContext } from '@/hooks/useDashboardContext';
import { ThemeType } from '@/utils';

export interface CreateEmbedMetricProps extends HTMLAttributes<HTMLElement> {
  token: string;
  dashboardId?: string;
  options?: {
    disableMetricCreation?: boolean;
    disableMetricUpdation?: boolean;
    disableMetricDeletion?: boolean;
    chartColors?: string[];
  };
  theme?: ThemeType;
}

export const CreateEmbeddedMetric = ({ options }: CreateEmbedMetricProps) => {
  const { data, isLoading, error } = useDashboardContext();
  const [isShowMetricCreateModal, setShowMetricCreateModal] = useState(false);
  const adminThemeChartColors = useMemo(() => {
    const colors: string[] | undefined =
      data?.adminTheme?.chart?.palettes?.find(
        (palette: { name: string; colors: string[] }) =>
          palette.name === data?.adminTheme?.chart?.selected
      )?.colors;
    return colors;
  }, [data?.adminTheme]);
  return (
    <div className="dbn-w-full dbn-h-full">
      {!options?.disableMetricCreation &&
      data?.isAllowedToCreateMetrics &&
      data &&
      !error ? (
        <>
          <Button
            type="button"
            variant="primary"
            onClick={() => setShowMetricCreateModal(true)}
            leftIcon={<Icons name="plus" color="light" />}
            isDisabled={isLoading || !!error}
          >
            Create Metric
          </Button>
          {isShowMetricCreateModal ? (
            <EmbeddedMetricCreation
              clientId={data.clientId as string}
              companyId={data.companyId}
              isLiveMode={false}
              externalDashboardId={data.externalDashboard.id}
              chartColors={adminThemeChartColors ?? options?.chartColors}
              isShowMetricCreateModal={isShowMetricCreateModal}
              setShowMetricCreateModal={setShowMetricCreateModal}
              workspaceId={data.workspace?.id}
              userProvidedDashboardId={
                data.externalDashboard.externalDashboardId
              }
            />
          ) : null}
        </>
      ) : (
        <Alert text={error || 'Create metric is not enabled'} />
      )}
      {isLoading ? (
        <div className="dbn-w-full dbn-h-full dbn-flex dbn-items-center dbn-justify-center">
          <Loader />
        </div>
      ) : null}
    </div>
  );
};
