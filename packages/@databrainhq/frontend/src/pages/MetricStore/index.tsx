import { Ui } from '@databrainhq/plugin';
import Loader from 'components/Loader';
import useMetricStore from 'hooks/useMetricStore';
import MetricTable from './components/MetricTable';

const MetricStore = () => {
  const { metricList, isLoading } = useMetricStore();

  return (
    <div className="dbn-w-full dbn-h-screen dbn-overflow-y-auto">
      <div className="dbn-sticky dbn-top-0 dbn-flex dbn-w-full dbn-h-16 dbn-px-5 dbn-justify-between dbn-items-center dbn-gap-3 dbn-border-b dbn-bg-white dbn-z-40">
        <Ui.Text variant="heading">Metric Store</Ui.Text>
      </div>
      <div className="dbn-min-h-[calc(100%-4rem)] dbn-px-10 dbn-py-5">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {metricList?.length ? (
              <MetricTable metricList={metricList} />
            ) : (
              <div className="dbn-w-full dbn-h-full dbn-flex dbn-justify-center dbn-items-center">
                No Data Available
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MetricStore;
