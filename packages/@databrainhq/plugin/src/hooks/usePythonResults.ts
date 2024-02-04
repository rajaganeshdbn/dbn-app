/* eslint-disable import/prefer-default-export */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect, useMemo, useCallback, useState } from 'react';
import { SOMETHING_WENT_WRONG } from '@/consts';
import getColumnTypes from '@/helpers/getColumnType';
import { RlsCondition, SqlError, TableColumn } from '@/types';
import { useExecutePythonMutation } from '@/queries/metric.mutation';

export const usePythonResults = ({
  setError,
  setLoading,
  setData,
}: {
  setError?: (error: SqlError) => void;
  setLoading?: (loading: boolean) => void;
  setData?: (data: Record<string, any>[]) => void;
}) => {
  const [pythonResult, setPythonResult] = useState<Record<string, any>[]>([]);
  const [pythonError, setPythonError] = useState('');
  const { mutateAsync: executePythonMutation, isLoading: isLoadingPython } =
    useExecutePythonMutation();

  useEffect(() => {
    setLoading?.(isLoadingPython);
  }, [isLoadingPython]);

  const executePython = useCallback(
    async ({
      code,
      clientId,
      rlsConditions,
      companyId,
    }: {
      code: string;
      clientId?: string;
      rlsConditions?: RlsCondition[];
      companyId: string;
    }) => {
      if (!code) {
        return setError?.({
          errorMessage: 'Code not provided!',
          explanation: '',
          solution: '',
        });
      }
      await executePythonMutation(
        {
          code,
          clientId,
          rlsConditions,
          companyId,
        },
        {
          onSuccess: (res: any) => {
            if (!res) {
              setError?.({
                errorMessage: SOMETHING_WENT_WRONG,
                explanation: '',
                solution: '',
              });
              setPythonError(SOMETHING_WENT_WRONG);
            } else {
              const { data, error } = res;
              if (error) {
                setError?.({
                  errorMessage: error,
                  explanation: '',
                  solution: '',
                });
                setPythonError(error);
              } else if (!Array.isArray(data)) {
                setError?.({
                  errorMessage: 'Error: result should be an array of objects.',
                  explanation: '',
                  solution: '',
                });
                setPythonError('Error: result should be an array of objects.');
              } else {
                setError?.({
                  errorMessage: '',
                  explanation: '',
                  solution: '',
                });
                setPythonError('');
                setData?.(Array.isArray(data) ? data : []);
                setPythonResult(Array.isArray(data) ? data : []);
              }
            }
          },
        }
      );
    },
    [executePythonMutation]
  );

  const pythonColumns: TableColumn[] = useMemo(() => {
    if (!pythonResult) return [];
    const dataTypes = getColumnTypes(pythonResult.slice(0, 10));
    return Object.entries(dataTypes).map(([name, dataType]) => ({
      name,
      dataType,
      as: name,
      type: 'python',
    }));
  }, [pythonResult]);

  return {
    pythonResult,
    pythonError,
    isLoadingPython,
    pythonColumns,
    executePython,
  };
};
