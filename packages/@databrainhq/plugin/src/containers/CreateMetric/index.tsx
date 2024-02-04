/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-relative-parent-imports */
import React from 'react';
import { PluginProvider } from '../PluginProvider';
import DashboardProvider from '../Dashboard/DashboardProvider';
import {
  CreateEmbedMetricProps,
  CreateEmbeddedMetric,
} from './CreateEmbeddedMetric';
import DbnStyles from '@/containers/DbnStyles';

export const CreateEmbedMetric = (props: CreateEmbedMetricProps) => {
  return (
    <>
      <DbnStyles componentName="create-metric" />
      <PluginProvider theme={props.theme}>
        <DashboardProvider token={props.token} dashboardId={props.dashboardId}>
          <CreateEmbeddedMetric {...props} />
        </DashboardProvider>
      </PluginProvider>
    </>
  );
};
