/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useGetJobInformationQuery } from 'utils/generated/graphql';
import { useState, useEffect } from 'react';
import { Ui } from '@databrainhq/plugin';
import styles from './syncJob.module.css';

const SyncJob = ({ job }: any) => {
  const [isShowSyncDetails, setShowSyncDetails] = useState(false);
  const { data } = useGetJobInformationQuery(
    { jobId: String(job.job.id) },
    { enabled: !!job?.job?.id }
  );
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(data?.getJobInformation?.data.attempts[0].logs.logLines);
  }, [data?.getJobInformation?.data]);

  return (
    <>
      {job.job.status === 'running' && (
        <div>
          <Ui.Button
            type="button"
            variant="secondary"
            onClick={() => setShowSyncDetails(!isShowSyncDetails)}
          >
            <div className="dbn-flex dbn-items-center dbn-gap-5">
              <Ui.Icons name="not-found" /> {/* loading Icon */}
              <Ui.Text variant="body-text-sm">Running</Ui.Text>
            </div>
            <div className="dbn-flex dbn-gap-2 dbn-items-center">
              <Ui.Text variant="body-text-sm">
                {` ${new Date(job.job.createdAt * 1000).toDateString()}`}
              </Ui.Text>
              {isShowSyncDetails ? (
                <Ui.Icons name="chevron-down" />
              ) : (
                <Ui.Icons name="not-found" /> // chevron-right
              )}
            </div>
          </Ui.Button>
          {isShowSyncDetails && (
            <div className="dbn-w-full dbn-p-5">
              <Ui.Text variant="body-text-sm">
                {`createdAt: ${new Date(
                  job.job.createdAt * 1000
                ).toDateString()}`}
              </Ui.Text>
              <Ui.Text variant="body-text-sm">
                {`updatedAt: ${new Date(
                  job.job.updatedAt * 1000
                ).toDateString()}`}
              </Ui.Text>
              <Ui.Text variant="heading">Logs:</Ui.Text>
              <div className={styles['connection-log-container']}>
                {logs?.length &&
                  logs.map((log) => (
                    <Ui.Text variant="body-text-sm">{log}</Ui.Text>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
      {job.job.status === 'failed' && (
        <div>
          <Ui.Button
            type="button"
            variant="secondary"
            onClick={() => setShowSyncDetails(!isShowSyncDetails)}
          >
            <div className="dbn-flex dbn-items-center dbn-gap-5">
              <Ui.Icons name="cross" />
              <Ui.Text variant="body-text-sm">Failed</Ui.Text>
            </div>
            <div className="dbn-flex dbn-gap-2 dbn-items-center">
              <Ui.Text variant="body-text-sm">
                {` ${new Date(job.job.createdAt * 1000).toDateString()}`}
              </Ui.Text>

              {isShowSyncDetails ? (
                <Ui.Icons name="chevron-down" />
              ) : (
                <Ui.Icons name="not-found" /> // chevron-right
              )}
            </div>
          </Ui.Button>
          {isShowSyncDetails && (
            <div className="dbn-w-full dbn-p-5">
              <Ui.Text variant="body-text-sm">
                {`createdAt: ${new Date(
                  job.job.createdAt * 1000
                ).toDateString()}`}
              </Ui.Text>
              <Ui.Text variant="body-text-sm">
                {`updatedAt: ${new Date(
                  job.job.updatedAt * 1000
                ).toDateString()}`}
              </Ui.Text>
              {job?.attempts?.[0]?.failureSummary?.failures?.map(
                (f: {
                  failureOrigin: string;
                  failureType: string;
                  internalMessage: string;
                  externalMessage: string;
                }) => (
                  <>
                    <Ui.Text variant="body-text-sm">
                      failureOrigin: {f.failureOrigin}
                    </Ui.Text>
                    <Ui.Text variant="body-text-sm">
                      failureType: {f.failureType}
                    </Ui.Text>
                    <Ui.Text variant="body-text-sm">
                      internalMessage:{f.internalMessage}
                    </Ui.Text>
                    <Ui.Text variant="body-text-sm">
                      externalMessage: {f.externalMessage}
                    </Ui.Text>
                  </>
                )
              )}
              <Ui.Text variant="heading">Logs:</Ui.Text>
              <div className={styles['connection-log-container']}>
                {logs?.length &&
                  logs.map((log) => (
                    <Ui.Text variant="body-text-sm">{log}</Ui.Text>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
      {job.job.status === 'succeeded' && (
        <div>
          <Ui.Button
            type="button"
            variant="secondary"
            onClick={() => setShowSyncDetails(!isShowSyncDetails)}
          >
            <div className="dbn-flex dbn-items-center dbn-gap-5">
              <Ui.Icons name="not-found" /> {/* success icon */}
              <Ui.Text variant="body-text-sm">Succeeded</Ui.Text>
            </div>
            <div className="dbn-flex dbn-gap-2 dbn-items-center">
              <Ui.Text variant="body-text-sm">
                {` ${new Date(job.job.createdAt * 1000).toDateString()}`}
              </Ui.Text>
              {isShowSyncDetails ? (
                <Ui.Icons name="chevron-down" />
              ) : (
                <Ui.Icons name="not-found" /> // chevron-right
              )}
            </div>
          </Ui.Button>
          {isShowSyncDetails && (
            <div className="dbn-w-full dbn-p-5">
              <Ui.Text variant="body-text-sm">
                {`createdAt: ${new Date(
                  job.job.createdAt * 1000
                ).toDateString()}`}
              </Ui.Text>
              <Ui.Text variant="body-text-sm">
                {`updatedAt: ${new Date(
                  job.job.updatedAt * 1000
                ).toDateString()}`}
              </Ui.Text>
              {job?.attempts[0]?.streamStats?.map(
                (s: {
                  id: string;
                  streamName: string;
                  stats: {
                    recordsCommitted: string;
                    recordsEmitted: string;
                  };
                }) => (
                  <Ui.Text variant="body-text-sm" key={s.id}>
                    stream: {s.streamName} | recordsCommitted:
                    {s.stats.recordsCommitted} | recordsEmitted:
                    {s.stats.recordsEmitted}
                  </Ui.Text>
                )
              )}
              <Ui.Text variant="heading">Logs:</Ui.Text>
              <div className={styles['connection-log-container']}>
                {logs?.length &&
                  logs.map((log) => (
                    <Ui.Text variant="body-text-sm">{log}</Ui.Text>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SyncJob;
