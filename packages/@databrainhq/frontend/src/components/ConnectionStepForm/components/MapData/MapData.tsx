/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-elements */
import { useState, useEffect } from 'react';
import {
  useDefinitionsQuery,
  useSourceSchemaQuery,
} from 'utils/generated/graphql';
import { useForm } from 'react-hook-form';
import { Ui } from '@databrainhq/plugin';
import { DESTINATION_DEFINITIONS, SOURCE_DEFINITIONS } from 'consts/values';
import ModeDropDown from 'components/ModeDropDown';
import useConnection from 'hooks/useConnection';
import style from './mapData.module.css';

const MapData = ({
  sourceId,
  destinationId,
  sourceName,
  sourceDefinitionId,
  destinationDefinitionId,
}: any) => {
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const [streamDataList, setStreamDataList] = useState<any[]>([]);
  const [selectedStreams, setSelectedStreams] = useState<any[]>([]);

  const { data, isLoading, isSuccess } = useSourceSchemaQuery({
    sourceId,
  });
  const { data: sourceDefData, isLoading: isLoadingSrcDef } =
    useDefinitionsQuery({
      definitionType: SOURCE_DEFINITIONS,
    });
  const { data: destinationDefData, isLoading: isLoadingDesDef } =
    useDefinitionsQuery({
      definitionType: DESTINATION_DEFINITIONS,
    });

  const destination =
    destinationDefData?.definitions?.data?.destinationDefinitions?.find(
      (d: { destinationDefinitionId: any }) =>
        d.destinationDefinitionId === destinationDefinitionId
    );

  const source = sourceDefData?.definitions?.data?.sourceDefinitions?.find(
    (s: { sourceDefinitionId: any }) =>
      s.sourceDefinitionId === sourceDefinitionId
  );
  const schema = data?.sourceSchema?.data;

  const streams = schema?.catalog.streams;
  const { createConnection } = useConnection({
    sourceId,
    destinationId,
    setDisabled,
    selectedStreams,
    setError,
    sourceName,
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const fileteredStreamList = streamDataList?.filter((s) =>
    s.stream.name.toLowerCase().includes(searchKeyword)
  );
  const syncTimeList = [
    { value: 1, label: 'Every hour' },
    { value: 4, label: '4 hour once' },
    { value: 8, label: '8 hour once' },
    { value: 24, label: '24 hour once' },
  ];

  useEffect(() => {
    setStreamDataList(streams);
  }, [streams]);

  return (
    <div className={style['mapdata-container']}>
      <div className={style['mapdata-header']}>
        <Ui.Text variant="heading">
          <img
            src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
              source?.icon
            )}`}
            alt=""
            width={30}
            height={30}
          />
          {source?.name}
        </Ui.Text>
        <Ui.Icons name="not-found" />
        <Ui.Text variant="heading">
          <img
            src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
              destination?.icon
            )}`}
            alt=""
            width={30}
            height={30}
          />
          {destination?.name}
        </Ui.Text>
      </div>
      <div className={style['mapdata-body']}>
        {!isLoading && !isLoadingSrcDef && isSuccess && !isLoadingDesDef && (
          <form
            className="dbn-w-full dbn-h-full"
            onSubmit={handleSubmit(createConnection)}
          >
            <div>
              <Ui.Text variant="heading">Choose Tables to sync</Ui.Text>
              <Ui.Text variant="body-text-sm">
                Select the tables that you want from Google Analytics Source to
                be replicated onto your desired data warehouse. You can also
                view column level attributes under each table
              </Ui.Text>
              <Ui.InputField
                id="1"
                name="Name"
                placeholder="SourceName > DestinationName"
                label="Name"
                type=""
                register={register('name')}
              />
              <Ui.Text variant="body-text-sm">
                Pick a name to help you identify this connection in Databrain
              </Ui.Text>
              <div className={style['mapdata-table-container']}>
                <div>
                  <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
                </div>
                <div className={style['mapdata-table-wrapper']}>
                  <div className={style['mapdata-table-head']}>
                    <div className={style['mapdata-table-first-col']}>
                      <Ui.Text>Sync</Ui.Text>
                    </div>
                    <div className={style['mapdata-table-main-col']}>
                      <Ui.Text>Name</Ui.Text>
                    </div>
                    <div className={style['mapdata-table-col']}>
                      <Ui.Text>Source mode</Ui.Text>
                    </div>
                    <div className={style['mapdata-table-col']}>
                      <Ui.Text>Destination mode</Ui.Text>
                    </div>
                    <div className={style['mapdata-table-col']}>
                      <Ui.Text>Cursor field</Ui.Text>
                    </div>
                    <div className={style['mapdata-table-col']}>
                      <Ui.Text>primary key</Ui.Text>
                    </div>
                  </div>
                  <div className={style['mapdata-table-body']}>
                    {fileteredStreamList?.map((item: any) => (
                      <div className={style['mapdata-table-body-wrapper']}>
                        <div className={style['mapdata-table-first-col']}>
                          {!selectedStreams.find(
                            (s) => s.stream.name === item.stream.name
                          ) ? (
                            <Ui.Button
                              type="button"
                              variant="tertiary"
                              onClick={() => {
                                setSelectedStreams((prevStreams) => [
                                  ...prevStreams,
                                  item,
                                ]);
                              }}
                            >
                              <Ui.Icons name="not-found" /> {/* uncheck icon */}
                            </Ui.Button>
                          ) : (
                            <Ui.Button
                              type="button"
                              variant="tertiary"
                              onClick={() => {
                                setSelectedStreams(
                                  selectedStreams.filter(
                                    (s) => s.stream.name !== item.stream.name
                                  )
                                );
                              }}
                            >
                              <Ui.Icons name="not-found" /> {/* check Icon */}
                            </Ui.Button>
                          )}
                        </div>
                        <div className={style['mapdata-table-main-col']}>
                          <Ui.Text variant="body-text-sm">
                            {item.stream.name}
                          </Ui.Text>
                        </div>
                        <div className={style['mapdata-table-col']}>
                          <div className="dbn-w-full">
                            <ModeDropDown
                              options={item.stream.supportedSyncModes?.map(
                                (mode: string) => mode
                              )}
                              name={item.stream.name}
                              selectedStreams={selectedStreams}
                              setSelectedStreams={setSelectedStreams}
                              changeField="source"
                            />
                          </div>
                        </div>
                        <div className={style['mapdata-table-col']}>
                          <div className="dbn-w-full dbn-flex dbn-items-center">
                            <ModeDropDown
                              options={['append', 'overwrite']}
                              name={item.stream.name}
                              selectedStreams={selectedStreams}
                              setSelectedStreams={setSelectedStreams}
                              changeField="destination"
                            />
                          </div>
                        </div>
                        <div className={style['mapdata-table-col']}>
                          <Ui.Text variant="body-text-sm">
                            {item.stream.sourceDefinedCursor
                              ? item.config.cursorField.map(
                                  (field: string) => field
                                )
                              : 'none'}
                          </Ui.Text>
                        </div>
                        <div className={style['mapdata-table-col']}>
                          <Ui.Text variant="body-text-sm">
                            {item.stream.sourceDefinedPrimaryKey?.map(
                              (keyArray: string[]) =>
                                keyArray.map((key: string) => key)
                            )}
                          </Ui.Text>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="dbn-mt-4">
                <Ui.Text variant="heading">Set a frequency of sync</Ui.Text>
                <Ui.Text variant="body-text-sm">
                  Choose a frequency to load the selected tables into your data
                  warehouse
                </Ui.Text>
                <div className="dbn-w-[70%]">
                  <div className=" dbn-flex dbn-justify-between">
                    {syncTimeList.map((t) => (
                      <div className="dbn-flex dbn-flex-col dbn-gap-2">
                        <input
                          type="radio"
                          {...register('sync_time')}
                          value={t.value}
                        />
                        <Ui.Text variant="label">{t.label}</Ui.Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {error && (
              <Ui.Text variant="body-text-sm" color="alert">
                {error}
              </Ui.Text>
            )}
            <Ui.Button
              type="submit"
              variant="primary"
              className="disabled:dbn-cursor-not-allowed dbn-mt-5 dbn-p-1"
              isDisabled={isDisabled}
            >
              Create Connection
            </Ui.Button>
            {isDisabled && (
              <Ui.Text variant="body-text-sm" color="info">
                creating connection...
              </Ui.Text>
            )}
          </form>
        )}
        {isLoading &&
          isLoadingSrcDef &&
          isLoadingDesDef &&
          !fileteredStreamList?.length && (
            <div className={style['mapData-loader-container']}>
              <Ui.Icons name="not-found" />
              {/* loading icon */}
            </div>
          )}
      </div>
    </div>
  );
};

export default MapData;
