/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { useGenerateDrillQueryMutation } from 'utils/generated/graphql';

type DrillDownParams = {
  columnName: string | undefined;
  chartType: string;
  baseQuery: string;
  database: string;
  params: any;
  onSuccess: (query: string) => void;
  onError: (error: string) => void;
  onDrillStart: () => void;
  selectedDimensions: string[];
  filters: {
    columnName: string;
    value: string | number;
  }[];
  setFilters: React.Dispatch<
    React.SetStateAction<
      {
        columnName: string;
        value: string | number;
      }[]
    >
  >;
};
type GenerateDrillQuery = {
  baseQuery: string;
  database: string;
};
const useDrill = () => {
  const [drillQuery, setDrillQuery] = useState('');

  const {
    mutate: generateDrillQueryFunc,
    mutateAsync: generateDrillDownQuery,
  } = useGenerateDrillQueryMutation();
  const onDrillDown = ({
    baseQuery,
    database,
    params,
    onSuccess,
    onDrillStart,
    onError,
    selectedDimensions,
    filters,
    setFilters,
    columnName,
  }: DrillDownParams) => {
    onDrillStart();
    generateDrillQueryFunc(
      {
        baseQuery,
        database,
        filters:
          selectedDimensions.length > filters.length && columnName
            ? [...filters, { columnName, value: params?.name }]
            : [],
        drillType: '',
      },
      {
        onSuccess({ generateDrillQuery }) {
          const modefiedQuery = generateDrillQuery?.modifiedQuery;
          const error = generateDrillQuery?.error;
          if (modefiedQuery) {
            if (columnName) {
              setFilters((prev) =>
                selectedDimensions.length > prev.length
                  ? [...prev, { columnName, value: params?.name }]
                  : []
              );
            } else {
              setFilters([]);
            }
            onSuccess(modefiedQuery);
          } else if (error) {
            onError(error);
          }
        },
      }
    );
  };
  const generateDrillQueryStr = async ({
    baseQuery,
    database,
  }: GenerateDrillQuery) => {
    setDrillQuery(baseQuery);
    await generateDrillDownQuery(
      { baseQuery, database, filters: [] },
      {
        onSuccess({ generateDrillQuery }) {
          const modefiedQuery = generateDrillQuery?.modifiedQuery;
          if (modefiedQuery) {
            setDrillQuery(modefiedQuery);
          } else {
            setDrillQuery(baseQuery);
          }
        },
      }
    );
    return drillQuery;
  };
  const onDrillUp = ({
    filters,
    onDrillStart,
    onSuccess,
    setFilters,
    baseQuery,
    database,
    index,
    onError,
  }: {
    index: number;
    baseQuery: string;
    database: string;
    filters: {
      columnName: string;
      value: string | number;
    }[];
    setFilters: React.Dispatch<
      React.SetStateAction<
        {
          columnName: string;
          value: string | number;
        }[]
      >
    >;
    onSuccess: (query: string) => void;
    onError: (error: string) => void;

    onDrillStart: () => void;
  }) => {
    onDrillStart();

    generateDrillDownQuery(
      {
        baseQuery,
        database,
        filters: index > 0 && filters.length ? filters.slice(0, -1) : [],
      },
      {
        onSuccess({ generateDrillQuery }) {
          const modefiedQuery = generateDrillQuery?.modifiedQuery;
          const error = generateDrillQuery?.error;
          if (modefiedQuery) {
            if (index > 0 && filters.length) {
              const updatedFilters = filters.slice(0, -1);
              setFilters(updatedFilters);
            } else {
              setFilters([]);
            }
            onSuccess(modefiedQuery);
          } else if (error) {
            onError(error);
          }
        },
      }
    );
  };
  return { onDrillDown, generateDrillQueryStr, onDrillUp };
};

export default useDrill;
