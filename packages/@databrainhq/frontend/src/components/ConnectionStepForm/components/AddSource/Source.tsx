/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useDefinitionsQuery } from 'utils/generated/graphql';
import { Ui } from '@databrainhq/plugin';
import { SOURCE_DEFINITIONS } from 'consts/values';
import styles from './addSource.module.css';

const getSourceData = (
  sourceDefinitionList: any[],
  sourceDefinitionId: string
) => {
  const source = sourceDefinitionList?.find(
    (s: { sourceDefinitionId: string }) =>
      s.sourceDefinitionId === sourceDefinitionId
  );
  return source;
};
const Source = ({
  setSourceId,
  setSourceDefinitionId,
  setSourceName,
  setStep,
  source,
}: any) => {
  const { data } = useDefinitionsQuery({ definitionType: SOURCE_DEFINITIONS });
  const sourceData = getSourceData(
    data?.definitions?.data?.sourceDefinitions,
    source.sourceDefinitionId
  );
  const selectSource = () => {
    setSourceId(source?.sourceId);
    setSourceDefinitionId(source?.sourceDefinitionId);
    setSourceName(source.name);
    setStep(2);
  };
  return (
    <>
      {sourceData ? (
        <Ui.Button
          variant="tertiary"
          type="button"
          className={styles['addSource-btn']}
          onClick={() => selectSource()}
        >
          <div className="dbn-flex dbn-gap-5 dbn-items-center">
            <img
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                sourceData?.icon as string
              )}`}
              alt=""
              width={30}
              height={30}
            />
            <div>
              <Ui.Text variant="heading">{sourceData?.name}</Ui.Text>
              <Ui.Text variant="body-text-sm">{sourceData?.sourceType}</Ui.Text>
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

export default Source;
