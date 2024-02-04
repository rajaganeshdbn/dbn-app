/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Ui, helpers, types } from '@databrainhq/plugin';
import { useEffect, useState } from 'react';
import { ChartActions } from 'types';
import { useUpdateExternalMetricMutation } from 'utils/generated/graphql';
import { useQueryClient } from 'react-query';
import segmentEvent from 'utils/segmentEvent';
import { TABLE } from 'consts/application';
import ClientDropDown from 'components/ClientDropDown';
import ClientDatabaseDropDown from 'components/ClientDatabaseDropDown';
import AccessControl from 'components/AccessControl';
import styles from './metricCreateHeader.module.css';
import VersionHistory from './VersionHistory';
import DataSecuritySettings from './DataSecuritySettings';
import MetricMenu from './MetricMenu';

type Props = {
  mainBtnText: string;
  isDisableBtn: boolean;
  backBtnText: string;
  metricId?: string;
  metricName?: string;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCloneModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
  client?: any;
  setClient?: any;
  companyTenancyType?: string | undefined;
  id?: string;
  autoSave?: {
    isEnabled: boolean;
    isSaving: boolean;
  };
  setEnableAutoSave?: React.Dispatch<React.SetStateAction<boolean>>;
  metricList?: types.FloatingDropDownOption[];
  parentPage: string | null;
};

const MetricCreateHeader = ({
  setModalShow,
  isDisableBtn,
  backBtnText,
  mainBtnText,
  setCloneModalShow,
  client,
  setClient,
  metricName,
  metricId,
  companyTenancyType,
  id,
  autoSave,
  setEnableAutoSave,
  metricList,
  parentPage,
}: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isShowVersionModal, setShowVersionModal] = useState(false);
  const [selectedMetric, setSelectedMetric] =
    useState<types.FloatingDropDownOption>({
      value: '',
      label: 'Untitled Metric',
    });

  const handleClick = (value: types.FloatingDropDownOption) => {
    setSelectedMetric(value);
    segmentEvent(
      'metric update',
      {
        metricId: value.subValue,
        metricName: value.label,
      },
      'page'
    );
    navigate(
      `/metric/${value.value}/?wid=${searchParams.get(
        'wid'
      )}&dashboardId=${searchParams.get(
        'dashboardId'
      )}&client=${searchParams.get('client')}`
    );
    window.location.reload();
  };
  useEffect(() => {
    if (metricId)
      setSelectedMetric({
        label: metricName || '',
        value: id || '',
        subValue: metricId,
      });
    else
      setSelectedMetric({
        label: 'Untitled Metric',
        value: '',
        subValue: '',
      });
  }, [id, metricId, metricName]);
  return (
    <div className={styles['metricCreateHeader-container']}>
      <div className={styles['metricCreateHeader-wrapper']}>
        <div className={styles['metricCreateHeader-alt-wrapper']}>
          <div
            className={styles.headerIconBtn}
            onClick={() => {
              if (parentPage) {
                navigate(`/?wid=${searchParams.get('wid')}`);
              } else {
                navigate(
                  `/externalDashboard/${searchParams.get(
                    'dashboardId'
                  )}/?wid=${searchParams.get('wid')}`
                );
              }
            }}
          >
            <Ui.Button
              type="button"
              variant="popover"
              leftIcon={<Ui.Icons name="arrow-left" />}
            />
          </div>
          <div className="dbn-flex dbn-justify-center dbn-items-center dbn-gap-4 ">
            {metricList?.length ? (
              <MetricMenu
                label="Metric"
                metricList={metricList}
                onClick={handleClick}
                selectedMetric={selectedMetric}
              />
            ) : null}
            {client && setClient && (
              <div className="">
                <ClientDropDown
                  client={client}
                  setClient={setClient}
                  defaultValue={searchParams.get('client') || ''}
                  tenancyLevel={companyTenancyType}
                />
              </div>
            )}
          </div>

          {/* {metricName && metricId ? (
            <div className="dbn-flex dbn-items-start">
              <Ui.Button
                variant="tertiary"
                type="button"
                onClick={() => setEditingTitle((prev) => !prev)}
              >
                <Ui.Icons name="not-found" />
              </Ui.Button>
              <Ui.Text variant="heading">
                {isEditingTitle ? (
                  <Ui.InputField
                    defaultValue={metricName}
                    placeholder="Edit Title"
                    required
                    onBlur={(e) => {
                      if (!e.target.value.trim()) return;
                      updateTitle({
                        id,
                        set: {
                          name: e.target.value,
                        },
                      });
                    }}
                  />
                ) : (
                  metricName
                )}
                <span className="dbn-leading-1 dbn-text-xs dbn-font-normal dbn-text-[#51649C]">
                  ID: {metricId}
                </span>
              </Ui.Text>
            </div>
          ) : null} */}
        </div>
        <div className="dbn-flex dbn-items-center dbn-justify-between dbn-gap-5 dbn-w-[64%]">
          <div className="dbn-flex-grow dbn-flex dbn-justify-end dbn-items-center dbn-gap-2">
            {metricId && autoSave && setEnableAutoSave && (
              <>
                {autoSave.isSaving && (
                  <Ui.Text variant="body-text-sm">Saving...</Ui.Text>
                )}
                <Ui.Switch
                  enabled={autoSave.isEnabled}
                  placeholder="Auto Save"
                  onChange={setEnableAutoSave}
                />
              </>
            )}

            {metricId && (
              <div className="dbn-flex dbn-gap-3 dbn-px-3">
                <AccessControl feature="versionHistory" permission="View">
                  <VersionHistory
                    isShowVersionModal={isShowVersionModal}
                    setShowVersionModal={setShowVersionModal}
                  />
                  <Ui.Button
                    type="button"
                    variant="popover"
                    isDisabled={isDisableBtn}
                    onClick={() => setShowVersionModal(true)}
                    title="Version History"
                    leftIcon={
                      <div className={styles.headerIconBtn}>
                        <Ui.Icons name="version-history" />
                      </div>
                    }
                  />
                </AccessControl>
                <AccessControl feature="metric" permission="Clone">
                  {setCloneModalShow && (
                    <div
                      className={styles.headerIconBtn}
                      onClick={() => setCloneModalShow(true)}
                    >
                      <Ui.Button
                        type="button"
                        variant="popover"
                        isDisabled={isDisableBtn}
                        title="Clone Metric"
                        leftIcon={<Ui.Icons name="copy" />}
                      />
                    </div>
                  )}
                </AccessControl>
              </div>
            )}

            <Ui.Button
              type="button"
              variant="primary"
              isDisabled={isDisableBtn}
              onClick={() => setModalShow(true)}
              leftIcon={<Ui.Icons name="save" color="white" />}
            >
              {mainBtnText}
            </Ui.Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCreateHeader;
