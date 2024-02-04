/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Ui } from '@databrainhq/plugin';
// import Guide from '../../assets/guide.svg';
import Loader from 'components/Loader';
import getFrameUrl from 'helpers/application/getFrameUrl';
import IntegrationConnectForm from './components/IntegrationConnectForm';
import IntegrationConfigurationForm from './components/IntegrationConfigureForm';
import styles from './integrationForm.module.css';

const IntegrationForm = () => {
  const navigate = useNavigate();
  const routerStateData = useLocation().state;
  const { id } = useParams();
  const connectedIntegration = routerStateData?.datasource;
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const [frameUrl, setFrameUrl] = useState<string>('');
  const [integration, setIntegration] = useState<string>('');
  const [isFrameLoading, setIsFrameLoading] = useState<boolean>(true);
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (connectedIntegration?.dbName || integration) {
      const url = getFrameUrl(
        connectedIntegration?.dbName.toString().toLowerCase() || integration
      );
      setFrameUrl(url);
    }
  }, [connectedIntegration?.dbName, integration]);

  const iframeCurrent = iFrameRef.current;

  useEffect(() => {
    iframeCurrent?.addEventListener('load', () => setIsFrameLoading(false));
    return () => {
      iframeCurrent?.removeEventListener('load', () =>
        setIsFrameLoading(false)
      );
    };
  }, [iframeCurrent]);

  return (
    <div className={styles['integrationForm-container']}>
      <div
        className={
          isCollapsed
            ? `${styles['integrationForm-wrapper']} dbn-pr-8`
            : styles['integrationForm-wrapper']
        }
      >
        <div className="dbn-w-[10%] dbn-h-full dbn-flex dbn-justify-center dbn-py-12">
          <div
            className={styles.backArrow}
            onClick={() => {
              navigate(-1);
            }}
          >
            <Ui.Icons name="arrow-left" size="sm" />
          </div>
        </div>
        <div
          className={`${styles['integrationForm-alt-container']} ${
            isCollapsed ? 'dbn-w-[90%]' : 'dbn-w-[70%]'
          }`}
        >
          {!connectedIntegration && (
            <IntegrationConnectForm id={id} setIntegration={setIntegration} />
          )}
          {connectedIntegration && (
            <IntegrationConfigurationForm
              connectedIntegration={connectedIntegration}
            />
          )}
        </div>
        <div className="dbn-w-0 dbn-border dbn-border-secondary dbn-relative">
          <div
            className={`${styles.collapseButton} ${
              isCollapsed ? 'dbn-rotate-90' : '-dbn-rotate-90'
            }`}
            onClick={() => setCollapsed((s) => !s)}
          >
            <Ui.Icons name="chevron-down" />
          </div>
        </div>
        {!isCollapsed && (
          <div className={styles.guideContainer}>
            <div className="dbn-w-[100%] dbn-border dbn-border-secondary dbn-rounded-lg dbn-shadow-lg dbn-h-[100%] dbn-overflow-hidden">
              {isFrameLoading && (
                <div className="dbn-w-full dbn-h-full">
                  <Loader />
                </div>
              )}
              <iframe
                ref={iFrameRef}
                title="Integrations"
                src={frameUrl}
                allowFullScreen
                id="dbn-iframe-datasource-guide"
                className={`dbn-relative -dbn-top-40 dbn-w-[100%] dbn-border dbn-border-secondary dbn-rounded-lg dbn-shadow-lg dbn-h-[125%] ${
                  isFrameLoading ? 'dbn-invisible' : 'visible'
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationForm;
