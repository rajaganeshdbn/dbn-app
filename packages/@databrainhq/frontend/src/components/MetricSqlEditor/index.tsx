/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/dot-notation */
import SqlEditor from './SqlEditor';

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  setLimit?: React.Dispatch<React.SetStateAction<string>>;
  limit?: string;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  onExecute: (queryValue?: string) => void;
};
const MetricSqlEditor = ({
  query,
  setQuery,
  isLoading,
  limit,
  setLimit,
  onExecute,
  onSubmit,
}: Props) => {
  return (
    <SqlEditor
      query={query}
      setQuery={setQuery}
      isLoading={isLoading}
      limit={limit}
      setLimit={setLimit}
      onExecute={onExecute}
      onSubmit={onSubmit}
    />
  );
};

export default MetricSqlEditor;
