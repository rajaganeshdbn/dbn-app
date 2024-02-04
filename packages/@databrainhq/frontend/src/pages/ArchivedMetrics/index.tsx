import { useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import Loader from 'components/Loader';
import ClientDropDown from 'components/ClientDropDown';
import useMetricStore from 'hooks/useMetricStore';
import MetricTable from './components/MetricTable';

const ArchivedMetrics = () => {
  const Tabs = ['Archived For All', 'Archived By Client'];
  const [client, setClient] = useState({ label: '', value: '' });
  const [currentTab, setCurrentTab] = useState(Tabs[0]);

  const { metricList, isLoading } = useMetricStore(
    currentTab === Tabs[0],
    currentTab === Tabs[1] ? client.value : undefined
  );

  return (
    <>
      <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col">
        <div className="dbn-h-14 dbn-flex dbn-border-b dbn-items-end">
          <Ui.Tab
            options={Tabs}
            activeTab={currentTab}
            setActiveTab={setCurrentTab}
            className=" dbn-flex dbn-gap-2 dbn-items-end dbn-px-10 dbn-divide-solid dbn-w-[500px]"
          />
          {currentTab === Tabs[1] && (
            <div className="dbn-w-60 dbn-ml-auto dbn-my-auto">
              <ClientDropDown client={client} setClient={setClient} />
            </div>
          )}
        </div>
        <div className="dbn-grow dbn-p-4">
          {isLoading && <Loader />}

          {!isLoading && currentTab === Tabs[0] && (
            <>
              {metricList?.length ? (
                <MetricTable metricList={metricList} canPerformActions />
              ) : (
                <div className="dbn-w-full dbn-h-full dbn-flex dbn-justify-center dbn-items-center">
                  No Data Available
                </div>
              )}
            </>
          )}
          {!isLoading && currentTab === Tabs[1] && (
            <>
              {metricList?.length ? (
                <MetricTable
                  metricList={metricList}
                  canPerformActions={false}
                />
              ) : (
                <div className="dbn-w-full dbn-h-full dbn-flex dbn-justify-center dbn-items-center">
                  No Data Available
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ArchivedMetrics;
