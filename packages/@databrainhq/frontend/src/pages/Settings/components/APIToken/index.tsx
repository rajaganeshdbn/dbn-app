/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-relative-parent-imports */
import { useMemo, useState } from 'react';
import { useGetApiTokensQuery } from 'utils/generated/graphql';
import { Ui } from '@databrainhq/plugin';
import SettingsLayout from 'pages/Settings';
import EmptyApi from 'components/Svg/No_data.svg';
import Flex from 'components/Flex';
import AccessControl from 'components/AccessControl';
import useAccessControl from 'hooks/useAccessControl';
import { getCurrentUser } from 'helpers/application/auth';
import style from './apiToken.module.css';
import ApiModal from './ApiModal';
import { ApiTokenType } from './ApiRow';
import PermissionsMenu from './PermissionsMenu';
import CopyButton from './CopyButton';

const APIToken = () => {
  const { data: apiTokensData, isLoading: isGettingTokens } =
    useGetApiTokensQuery(
      {
        companyId: getCurrentUser()?.companyId,
      },
      { enabled: !!getCurrentUser()?.companyId }
    );
  const tokenList = useMemo(
    () => apiTokensData?.apiTokens || [],
    [apiTokensData?.apiTokens]
  );

  const { getIsCanAccess } = useAccessControl();

  const [isShowApiModal, setShowApiModal] = useState(false);

  const headers = useMemo(() => {
    return [
      {
        name: 'Token Name',
        columnKey: 'name',
        colSpan: 1,
        columnCell: (row: ApiTokenType) => (
          <Flex className="dbn-gap-2" alignItems="center">
            <Ui.Text variant="body-text-sm">{row.name}</Ui.Text>
            {row.description ? (
              <Ui.InfoTooltip text={row.description} position="right" />
            ) : null}
          </Flex>
        ),
      },
      {
        name: 'Permissions',
        columnKey: 'scope',
        colSpan: 1,
        columnCell: (row: ApiTokenType) => <PermissionsMenu row={row} />,
      },
      {
        name: 'Created By',
        columnKey: 'updatedBy',
        colSpan: 1,
        columnCell: () => '-',
      },
      {
        name: 'Created On',
        columnKey: 'createdAt',
        colSpan: 1,
        columnCell: (row: ApiTokenType) =>
          row.createdAt ? new Date(row.createdAt).toDateString() : '-',
      },
      {
        name: 'Status',
        columnKey: 'isExpired',
        colSpan: 1,
        columnCell: (row: ApiTokenType) =>
          row.isExpired ? (
            'Expired'
          ) : (
            <div className="dbn-font-bold dbn-bg-green-100 dbn-rounded-2xl dbn-text-success dbn-text-[0.75rem] dbn-px-[10px] dbn-py-1">
              Active
            </div>
          ),
      },
      {
        name: 'API Key',
        columnKey: 'id',
        colSpan: 1,
        columnCell: (row: ApiTokenType) => <CopyButton row={row} />,
      },
      ...(getIsCanAccess('apiTokens', 'Delete')
        ? [
            {
              name: 'Action',
              columnKey: 'action',
              colSpan: 1,
              columnCell: (row: ApiTokenType) => (
                <Ui.NewTooltip position="top" text="Delete Token">
                  <Ui.Button
                    variant="tertiary"
                    type="button"
                    leftIcon={<Ui.Icons name="delete" />}
                  />
                </Ui.NewTooltip>
              ),
            },
          ]
        : []),
    ] as Ui.ListHeaderType[];
  }, []);

  return (
    <SettingsLayout>
      <div className={style['settings-container']}>
        <Flex alignItems="center" justify="between">
          <Ui.Text variant="body-text-lg">API Tokens</Ui.Text>
          <AccessControl feature="apiTokens" permission="Create">
            <Ui.Button
              variant="primary"
              type="button"
              onClick={() => setShowApiModal(true)}
            >
              Generate Token
            </Ui.Button>
          </AccessControl>
        </Flex>
        {tokenList.length ? (
          <Ui.List headers={headers} data={tokenList} />
        ) : null}
        {isGettingTokens ? (
          <Ui.SkeletonLoader variant="list" />
        ) : (
          !tokenList.length && (
            <div className={style['token-alt-container']}>
              <div className={style['token-alt-wrapper']}>
                <img src={EmptyApi} alt="" />
                <div className={`${style['token-alt-wrapper']}`}>
                  <Ui.Text variant="heading">
                    No api token generated yet
                  </Ui.Text>
                  <Ui.Text variant="body-text-sm">
                    Start generating an api token and gain access to our app's
                    features
                  </Ui.Text>
                  <AccessControl feature="apiTokens" permission="Create">
                    <Ui.Button
                      type="button"
                      variant="primary"
                      onClick={() => setShowApiModal(true)}
                    >
                      Generate api token
                    </Ui.Button>
                  </AccessControl>
                </div>
              </div>
            </div>
          )
        )}
        <ApiModal
          setShowApiModal={setShowApiModal}
          isShowApiModal={isShowApiModal}
        />
      </div>
    </SettingsLayout>
  );
};

export default APIToken;
