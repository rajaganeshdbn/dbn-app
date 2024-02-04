import { useGetPreviewTableDataMutation } from 'utils/generated/graphql';

const usePreviewTableData = () => {
  const previewTableDataMutation = useGetPreviewTableDataMutation();
  const getPreviewTableData = ({
    dbName,
    destinationId,
    selectedSchemaList,
    setPreviewTableDataList,
  }: any) => {
    previewTableDataMutation.mutate(
      { dbName, destinationId, selectedSchemaList },
      {
        onSuccess: (res) => {
          setPreviewTableDataList(res.getPreviewTableData?.dataList);
        },
      }
    );
  };
  return { getPreviewTableData };
};

export default usePreviewTableData;
