import { Link } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';

const CreateMetricButton = ({
  client,
  isDisabled,
}: {
  client?: string;
  isDisabled?: boolean;
}) => {
  if (isDisabled)
    return (
      <Ui.Button type="button" variant="primary" isDisabled={isDisabled}>
        Create Metric
      </Ui.Button>
    );
  return (
    <Link to={`/externalMetric/new${client ? `/?client=${client}` : ''}`}>
      <Ui.Button
        type="button"
        variant="primary"
        onClick={() => {
          segmentEvent('create metric', {}, 'page');
        }}
      >
        Create Metric
      </Ui.Button>
    </Link>
  );
};

export default CreateMetricButton;
