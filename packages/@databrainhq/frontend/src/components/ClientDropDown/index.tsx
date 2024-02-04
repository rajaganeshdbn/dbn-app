/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo } from 'react';
import { useGetUserClientDataQuery } from 'utils/generated/graphql';
import { Ui } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';
import { DATABASE, TABLE } from 'consts/application';
import useWorkspace from 'hooks/useWorkspace';
import useCompanySchema from 'hooks/useCompanySchema';
import { getCurrentUser } from 'helpers/application/auth';

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
  tenancyLevel?: string;
};
const ClientDropDown = ({
  client,
  setClient,
  defaultValue,
  tenancyLevel = TABLE,
  ...rest
}: ClientDropDownProps) => {
  const user = getCurrentUser();
  const { workspace } = useWorkspace();
  const { data } = useGetUserClientDataQuery(
    {
      companyId: user?.companyId,
      workspaceId: workspace?.id,
    },
    {
      enabled:
        tenancyLevel === TABLE &&
        !client.value &&
        !!user?.companyId &&
        !!workspace?.id,
    }
  );
  const { schemaList } = useCompanySchema(tenancyLevel === DATABASE);

  const clientDataList = useMemo(() => {
    if (tenancyLevel === DATABASE) {
      if (schemaList && Array.isArray(schemaList)) {
        const list = [
          ...new Set(
            schemaList.map((t: { schemaName: string }) => t.schemaName)
          ),
        ] as string[];
        const databaseList = list.map((d: string) => ({
          value: d,
          label: d,
        }));
        return databaseList;
      }
      return [];
    }
    return data?.getUserClientData?.data;
  }, [data?.getUserClientData?.data, tenancyLevel, schemaList]);

  useEffect(() => {
    if (!clientDataList?.length) {
      setClient({ label: '', value: '' });
      return;
    }

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
  }, [clientDataList?.[0], defaultValue]);

  return (
    <Ui.FloatingDropDown
      options={clientDataList || []}
      selectedOption={client}
      customButton={
        <div className="dbn-flex dbn-gap-1 dbn-w-full">
          <span className="dbn-font-bold">Client:</span>
          <span className="dbn-font-semibold dbn-truncate dbn-w-[90%]">
            {client.label || 'Not selected'}
          </span>
        </div>
      }
      menuWidth="200px"
      buttonWidth="200px"
      onChange={(option) => {
        segmentEvent('client selected', {
          clientId: option.value,
          clientName: option.label,
          workspaceId: workspace?.id,
          workspaceName: workspace?.name,
        });
        setClient(option);
      }}
      labelVariant="floating"
      {...rest}
      isSearchEnabled
      button={rest.children}
      disableAutoClose
    />
  );
};

export default React.memo(ClientDropDown);
