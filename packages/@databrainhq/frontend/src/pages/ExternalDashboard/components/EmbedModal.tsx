/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-elements */
import React, { useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { NavLink } from 'react-router-dom';
import styles from './externalDashboardComponents.module.css';

const EmbedModal = ({
  isOpen,
  onClose,
}: {
  isDisabled?: boolean;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isCopied, setCopied] = useState(false);
  return (
    <>
      <Ui.Modal
        isOpen={isOpen}
        onClose={onClose}
        headerTitle="Integrate Dashboard"
      >
        {isCopied && (
          <div className="dbn-fixed dbn-bottom-5 dbn-left-1/2 -dbn-translate-x-1/2 dbn-z-overlay dbn-bg-white dbn-rounded dbn-p-2 dbn-text-success">
            Copied ✓
          </div>
        )}
        <div className="dbn-p-4 dbn-px-6 dbn-mt-2 dbn-w-[700px] dbn-flex dbn-flex-col dbn-gap-4">
          <div className="step-1">
            <span className="dbn-font-bold dbn-block">
              Step 1: Install databrain npm package
            </span>
            <code className={styles.codeSnippet}>
              <div>
                <span className="dbn-text-purple-600">npm install</span>{' '}
                @databrainhq/plugin
              </div>
              <Ui.Button
                variant="popover"
                onClick={() => {
                  navigator.clipboard.writeText(
                    'npm install @databrainhq/plugin'
                  );
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 3000);
                }}
                className={styles.copyBtn}
              >
                <Ui.Icons name="copy" />
              </Ui.Button>
            </code>
          </div>
          <div className="step-2">
            <span className="dbn-font-bold dbn-block">
              Step 2: Import it at the top level of your application e.g.
              main/index/app
            </span>
            <code className={styles.codeSnippet}>
              <div>
                <span className="dbn-text-red-600">import</span>{' '}
                '@databrainhq/plugin/web;'
              </div>
              <Ui.Button
                variant="popover"
                onClick={() => {
                  navigator.clipboard.writeText(
                    "import '@databrainhq/plugin/web';"
                  );
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 3000);
                }}
                className={styles.copyBtn}
              >
                <Ui.Icons name="copy" />
              </Ui.Button>
            </code>
          </div>
          <div className="step-3">
            <span className="dbn-font-bold dbn-block">
              Step 3: Use the components anywhere in your app.
            </span>
            <code className={styles.codeSnippet}>
              <div>
                <span className="dbn-text-success">&lt;dbn-dashboard</span>{' '}
                <span className="dbn-text-blue-600">token</span>="token"{' '}
                <span className="dbn-text-blue-600">dashboard-id</span>
                ="dashboardId" <span className="dbn-text-success">/&gt;</span>
              </div>
              <Ui.Button
                variant="popover"
                onClick={() => {
                  navigator.clipboard.writeText(
                    '<dbn-dashboard token="token" dashboard-id="dashboardId" />'
                  );
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 3000);
                }}
                className={styles.copyBtn}
              >
                <Ui.Icons name="copy" />
              </Ui.Button>
            </code>
            or
            <code className={styles.codeSnippet}>
              <div>
                <span className="dbn-text-success">&lt;dbn-metric</span>{' '}
                <span className="dbn-text-blue-600">token</span>="token"{' '}
                <span className="dbn-text-blue-600">metric-id</span>
                ="metricId" <span className="dbn-text-success">/&gt;</span>
              </div>
              <Ui.Button
                variant="popover"
                onClick={() => {
                  navigator.clipboard.writeText(
                    '<dbn-metric token="token" metric-id="metricId" />'
                  );
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 3000);
                }}
                className={styles.copyBtn}
              >
                <Ui.Icons name="copy" />
              </Ui.Button>
            </code>
          </div>

          {/* <Ui.Text variant="body-text"></Ui.Text> */}
        </div>
        <Ui.ModalFooter>
          <Ui.Button type="button" variant="tab" onClick={onClose}>
            <Ui.Text variant="body-text-sm">Cancel</Ui.Text>
          </Ui.Button>
          <NavLink
            to="https://docs.usedatabrain.com/developer-docs/"
            target="_blank"
          >
            <Ui.Button type="button" variant="primary">
              View Docs
            </Ui.Button>
          </NavLink>
        </Ui.ModalFooter>
      </Ui.Modal>
    </>
  );
};

export default React.memo(EmbedModal);
