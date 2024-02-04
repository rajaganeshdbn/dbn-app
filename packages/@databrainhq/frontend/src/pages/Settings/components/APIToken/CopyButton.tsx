import { useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';
import Flex from 'components/Flex';
import { ApiTokenType } from './ApiRow';
import AccessControl from 'components/AccessControl';

const CopyButton = ({ row }: { row: ApiTokenType }) => {
  const [isCopied, setCopied] = useState(false);
  return (
    <Flex className="dbn-gap-2" alignItems="center">
      <Ui.Text variant="body-text-sm">XXXX</Ui.Text>
      <AccessControl feature="apiTokens" permission="Copy">
        <Ui.Button
          variant="tertiary"
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(row.id);
            segmentEvent('api token copied', {
              token: row.id,
            });
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 3000);
          }}
          leftIcon={<Ui.Icons name="copy" />}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </Ui.Button>
      </AccessControl>
    </Flex>
  );
};

export default CopyButton;
