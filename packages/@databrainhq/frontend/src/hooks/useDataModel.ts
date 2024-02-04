import { useNavigate } from 'react-router-dom';
import {
  useCreateViewDataModelMutation,
  useUpdateViewDataModelMutation,
} from 'utils/generated/graphql';
import { SOMETHING_WENT_WRONG } from 'consts/values';

const useDataModel = ({
  companyId,
  destinationId,
  query,
  setModelCreating,
  setModelError,
  nodeList,
  edgesList,
  id,
  dbName,
}: any) => {
  const navigate = useNavigate();
  const createViewDataModelMutation = useCreateViewDataModelMutation();
  const updateViewDataModelMutation = useUpdateViewDataModelMutation();
  const createViewDataModel = (data: any) => {
    setModelError('');
    setModelCreating(true);
    if (createViewDataModelMutation.isLoading) {
      setModelCreating(true);
    }

    createViewDataModelMutation.mutate(
      {
        companyId,
        description: data.description,
        databaseName: data.databaseName,
        destinationId,
        lineageData: { edgesList, nodeList },
        query,
        viewName: data.name.split(' ').join('_'),
        dbName,
      },
      {
        onSuccess: (res) => {
          if (res.createViewDataModel?.result.status) {
            setModelCreating(false);
            setModelError('');
            navigate('/dataModel');
          } else {
            setModelCreating(false);
            setModelError(res.createViewDataModel?.result.message);
          }
        },
        onError: () => {
          setModelCreating(false);
          setModelError(SOMETHING_WENT_WRONG);
        },
      }
    );
  };

  const updateViewDataModel = (data: any) => {
    setModelError('');
    setModelCreating(true);
    if (updateViewDataModelMutation.isLoading) {
      setModelCreating(true);
    }

    updateViewDataModelMutation.mutate(
      {
        companyId,
        description: data.description,
        databaseName: data.databaseName,
        destinationId,
        lineageData: { edgesList, nodeList },
        query,
        viewName: data.name.split(' ').join('_'),
        id,
        dbName,
      },
      {
        onSuccess: (res) => {
          if (res.updateViewDataModel?.result.status) {
            setModelCreating(false);
            setModelError('');
            navigate('/dataModel');
          } else {
            setModelCreating(false);
            setModelError(res.updateViewDataModel?.result.message);
          }
        },
        onError: () => {
          setModelCreating(false);
          setModelError(SOMETHING_WENT_WRONG);
        },
      }
    );
  };
  return {
    createViewDataModel,
    updateViewDataModel,
  };
};

export default useDataModel;
