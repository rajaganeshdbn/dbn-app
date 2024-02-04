/* eslint-disable no-unused-vars */
import React from 'react';
import { MetricForm } from './components/MetricForm';
import styles from './styles.module.css';
import { ConstructMetricProps } from '@/types/metricCreate';

export const ConstructMetric = ({
  dateTimeColumnList,
  columnList,
  database,
  companyId,
  tableName,
  setData,
  setError,
  setLoading,
  setQuery,
  clientId,
  clientColumn,
  databaseId,
  datasetSettings,
  setDatasetSettings,
  setGroupByList,
}: ConstructMetricProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Data</div>
      <MetricForm
        dateTimeColumnList={dateTimeColumnList}
        columnList={columnList}
        database={database}
        companyId={companyId}
        tableName={tableName}
        setData={setData}
        setError={setError}
        setQuery={setQuery}
        setLoading={setLoading}
        clientId={clientId}
        clientColumn={clientColumn}
        databaseId={databaseId}
        datasetSettings={datasetSettings}
        setDatasetSettings={setDatasetSettings}
        setGroupByList={setGroupByList}
      />
    </div>
  );
};
