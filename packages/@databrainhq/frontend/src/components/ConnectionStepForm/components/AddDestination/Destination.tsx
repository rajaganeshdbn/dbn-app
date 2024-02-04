/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useDefinitionsQuery } from 'utils/generated/graphql';
import { Ui } from '@databrainhq/plugin';
import { DESTINATION_DEFINITIONS } from 'consts/values';

const getDestinationData = (
  destinationDefinitionList: any[],
  destinationDefinitionId: string
) => {
  const destination = destinationDefinitionList?.find(
    (s: { destinationDefinitionId: string }) =>
      s.destinationDefinitionId === destinationDefinitionId
  );
  return destination;
};
const Destination = ({
  destination,
  setDestinationId,
  setDestinationDefinitionId,
  setStep,
}: any) => {
  const { data } = useDefinitionsQuery({
    definitionType: DESTINATION_DEFINITIONS,
  });

  const destinationData = getDestinationData(
    data?.definitions?.data?.destinationDefinitions,
    destination?.destinationDefinitionId
  );
  const selectDestination = () => {
    setDestinationId(destination?.destinationId);
    setDestinationDefinitionId(destination?.destinationDefinitionId);
    setStep(3);
  };
  return (
    <>
      {destinationData ? (
        <Ui.Button
          variant="tab"
          type="button"
          onClick={() => selectDestination()}
        >
          <div className="dbn-flex dbn-gap-5 dbn-items-center">
            <img
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                destinationData?.icon as string
              )}`}
              alt=""
              width={30}
              height={30}
            />
            <div>
              <Ui.Text variant="heading">{destinationData?.name}</Ui.Text>
              <Ui.Text variant="body-text-sm">datawarehouse</Ui.Text>
            </div>
          </div>
        </Ui.Button>
      ) : (
        <div>
          <Ui.Icons name="not-found" /> {/* loading icon */}
        </div>
      )}
    </>
  );
};

export default Destination;
