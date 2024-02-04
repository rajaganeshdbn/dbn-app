import React, { useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';

export interface ApiTokenType {
  __typename?: 'apiTokens' | undefined;
  id: any;
  companyId: any;
  name: string;
  description?: string | null | undefined;
  scope: string;
  isExpired: boolean;
  createdAt: string | null;
  updatedBy: string | null;
  isTest: boolean;
}

type ApiRowProps = {
  item: ApiTokenType;
};

const ApiRow: React.FC<ApiRowProps> = ({ item }) => {
  const [isShowMore, setShowMore] = useState(false);
  const [isCopied, setCopied] = useState(false);

  return (
    <tr key={item.id} className="dbn-border-t">
      <td className="dbn-px-4 dbn-text-left">
        <Ui.Text variant="body-text-sm">{item.name}</Ui.Text>
      </td>
      <td className="dbn-px-4 dbn-flex dbn-flex-wrap dbn-py-2">
        {(isShowMore
          ? item.scope.split(',')
          : item.scope.split(',').slice(0, 1)
        ).map((val: any) => (
          <Ui.Text variant="body-text-sm">{val}</Ui.Text>
        ))}
        {item.scope.split(',').length > 1 && (
          <div
            className={`${
              isShowMore ? 'dbn-hidden' : ''
            } dbn-text-xs dbn-text-blue-600`}
          >
            <Ui.Button
              type="button"
              variant="tertiary"
              onClick={() => setShowMore(true)}
            >
              +more
            </Ui.Button>
          </div>
        )}
      </td>
      <td className="dbn-px-4 dbn-text-left">
        <Ui.Text variant="body-text-sm">
          {item.createdAt ? new Date(item.createdAt).toDateString() : ''}
        </Ui.Text>
      </td>
      <td className="dbn-px-4 dbn-text-left">
        <Ui.Text variant="body-text-sm" color="success">
          {item.isExpired ? 'Expired' : 'Active'}
        </Ui.Text>
      </td>
      <td className="dbn-px-4 dbn-flex dbn-gap-2 dbn-justify-start dbn-items-center">
        <Ui.Text variant="body-text-sm">XXXX</Ui.Text>
        <Ui.Button
          variant="tertiary"
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(item.id);
            segmentEvent('api token copied', {
              token: item.id,
            });
            setCopied(true);
          }}
          leftIcon={<Ui.Icons name="copy" />}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </Ui.Button>
      </td>
    </tr>
  );
};

export default React.memo(ApiRow);
