/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo } from 'react';
import { Ui } from '@databrainhq/plugin';
import useCompanySchema from 'hooks/useCompanySchema';

export type ClientType = {
  label: string;
  value: string;
};

export type ClientDropDownProps = Omit<
  Ui.FloatingDropDownProps,
  'selectedOption' | 'onChange' | 'options'
> & {
  setClient: React.Dispatch<React.SetStateAction<ClientType>>;
  client: ClientType;
  defaultValue?: string;
};

/**
 * @deprecated This component is deprecated now use client dropdown instead
 */
const ClientDropDown = ({
  client,
  setClient,
  defaultValue,
  ...rest
}: ClientDropDownProps) => {
  const { schemaList } = useCompanySchema();

  const clientDataList = useMemo(() => {
    if (schemaList && Array.isArray(schemaList)) {
      const list = [
        ...new Set(schemaList.map((t: { schemaName: string }) => t.schemaName)),
      ] as string[];
      const databaseList = list.map((d: string) => ({
        value: d,
        label: d,
      }));
      return databaseList;
    }
    return [];
  }, [schemaList]);

  useEffect(() => {
    if (!clientDataList.length) return;

    if (defaultValue) {
      const defaultClient = clientDataList.find(
        (cl: ClientType) => cl.value === defaultValue
      );

      if (defaultClient) {
        setClient(defaultClient);
      } else {
        setClient(clientDataList[0]);
      }
    } else {
      setClient(clientDataList[0]);
    }
  }, [clientDataList[0], defaultValue]);

  return (
    <Ui.FloatingDropDown
      options={clientDataList || []}
      selectedOption={client}
      customButton={
        <div className="dbn-flex dbn-gap-1">
          <span>Client:</span>
          <span className="dbn-font-bold">{client.label}</span>
        </div>
      }
      menuWidth="200px"
      buttonWidth="200px"
      onChange={setClient}
      labelVariant="floating"
      {...rest}
      isSearchEnabled
    />
  );
};

export default React.memo(ClientDropDown);
