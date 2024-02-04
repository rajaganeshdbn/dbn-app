/* eslint-disable react/forbid-elements */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useState } from 'react';
import { Ui, types, consts } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';
import { EXPIRY_TIME } from 'consts/application';
import Flex from 'components/Flex';
import useShareableLink, {
  UseShareableLinkProps,
} from 'hooks/useShareableLink';
import styles from './externalDashboardComponents.module.css';

const copyToClipboard = (textToCopy: string) => {
  // Create a temporary textarea element
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = textToCopy;

  // Append the textarea to the DOM
  document.body.appendChild(tempTextArea);

  // Select and copy the text
  tempTextArea.select();
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(tempTextArea);
};
const ShareDemoLink = ({
  dashboardId,
  clientId,
  companyTenancyType,
  clientName,
  isAllClient,
}: UseShareableLinkProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [expiryTime, setExpiryTime] = useState<types.FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const { demoLink, isLoading, generateDemoLink } = useShareableLink({
    companyTenancyType,
    clientId,
    dashboardId,
  });

  const copyLink = useCallback(() => {
    if (consts.IS_SELF_HOSTED) copyToClipboard(demoLink);
    else navigator.clipboard.writeText(demoLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [demoLink]);

  return (
    <>
      <Ui.Tooltip
        content={
          <Ui.Button variant="popover" onClick={() => setOpen(true)}>
            <span className={styles.headerIconWithText}>
              <Ui.Icons name="share" /> Preview
            </span>
          </Ui.Button>
        }
        text={
          !isAllClient
            ? `Preview how ${clientName} views the dashboard`
            : 'Preview how dashboards for all the clients look'
        }
      />
      <Ui.Modal
        headerTitle="Preview & Share Dashboard"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <Flex
          justify="center"
          alignItems="center"
          className="dbn-w-[600px] dbn-h-[100px] dbn-p-5"
        >
          {demoLink ? (
            <div className="dbn-flex dbn-items-center dbn-w-full">
              <Ui.InputField
                type="text"
                defaultValue={demoLink}
                isDisabled
                className="dbn-w-full"
              />
              <Ui.Button
                type="button"
                variant="tab"
                onClick={() => {
                  segmentEvent('copied demo link', {
                    dashboardId,
                  });
                  copyLink();
                }}
              >
                {isCopied ? 'Copied' : 'Copy'}
              </Ui.Button>
            </div>
          ) : (
            <Ui.Alert
              text={`Preview how it looks to ${clientName} when you embed Databrain dashboard inside your app.`}
            />
          )}
        </Flex>
        <Ui.ModalFooter>
          <Flex direction="row" className="dbn-w-full dbn-justify-between">
            {!demoLink ? (
              <Ui.FloatingDropDown
                options={EXPIRY_TIME}
                onChange={(value) => setExpiryTime(value)}
                selectedOption={expiryTime}
                labelVariant="floating"
                buttonWidth="200px"
                menuWidth="100%"
                placeholder="Select an expiry time"
              />
            ) : null}
            <div className="dbn-flex dbn-gap-2">
              {demoLink ? (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    segmentEvent('redirected to demo dashboard', {
                      dashboardId,
                    });
                  }}
                >
                  <Ui.Button
                    variant="primary"
                    type="button"
                    isDisabled={isLoading}
                  >
                    View Demo
                  </Ui.Button>
                </a>
              ) : isLoading ? (
                <Ui.Button
                  variant="primary"
                  type="button"
                  isDisabled={isLoading}
                >
                  Generating...
                </Ui.Button>
              ) : (
                <>
                  <Ui.Button
                    variant="tab"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Ui.Button>
                  <Ui.Button
                    variant="primary"
                    type="button"
                    isDisabled={isLoading || !expiryTime.value}
                    onClick={() =>
                      generateDemoLink(parseInt(expiryTime.value, 10))
                    }
                  >
                    Generate Link
                  </Ui.Button>
                </>
              )}
            </div>
          </Flex>
        </Ui.ModalFooter>
      </Ui.Modal>
    </>
  );
};

export default React.memo(ShareDemoLink);
