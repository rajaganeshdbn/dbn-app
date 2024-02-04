import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isTokenAvailable } from 'atoms/application';
import { useAtom } from 'jotai';
import CreateMetric from 'pages/CreateMetric';
import Configuration from 'pages/Configuration';
import Homepage from 'pages/Homepage';
import Externaldashboard from 'pages/ExternalDashboard';
import APIToken from 'pages/Settings/components/APIToken';
import Theming from 'pages/Settings/components/Theming';
import DemoConfig from 'pages/Settings/components/DemoConfig';
import EmailSettings from 'pages/Settings/components/EmailSettings';
import Users from 'pages/Settings/components/Users';
import WhitelistDomains from 'pages/Settings/components/WhitelistDomains';
import AccessPermissions from 'pages/Settings/components/AccessPermissions';
import CompanyProfile from 'pages/Settings/components/CompanyProfile';
// import Cache from 'pages/Settings/components/Cache';
import RawCsvSettings from 'pages/Settings/components/RawCsvSettings';
import MyProfile from 'pages/Settings/components/MyProfile';
import Datasources from 'pages/Datasources';
import ExternalDataset from 'pages/ExternalDataset';
import DatasetList from 'pages/ExternalDataset/components/DatasetList';
import Dataset from 'pages/ExternalDataset/components/Dataset';
import ArchiveMetrics from 'pages/Settings/components/ArchiveMetric';
import MetricStore from 'pages/Settings/components/MetricStore';
import PlayGround from 'pages/Settings/components/Theming/PlayGround';
import ThemesForm from 'pages/Settings/components/Theming/ThemesForm';
import Secrets from 'pages/Settings/components/Secrets';
import Roles from 'pages/Settings/components/Roles';
import NewAppLayout from 'components/AppLayout/NewAppLayout';
import IntegrationForm from 'components/IntegrationForm';
import SigninModal from 'components/SignInModal';
import AddOrgTable from 'components/AddOrgTable';
import useAccessControl from 'hooks/useAccessControl';

const NewAppRoutes = () => {
  const [isShowTokenExpiredModal, setShowTokenExpiredModal] = useState(false);
  const [isTokenValid] = useAtom(isTokenAvailable);
  const { getIsCanAccess } = useAccessControl();

  useEffect(() => {
    if (!isTokenValid) setShowTokenExpiredModal(true);
  }, [isTokenValid]);

  return (
    <>
      <NewAppLayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/externalDashboard/:id"
            element={<Externaldashboard />}
          />

          {getIsCanAccess('datasources', 'Edit Tenancy Level') ? (
            <Route path="/datasourceTableSettings" element={<AddOrgTable />} />
          ) : null}
          {getIsCanAccess('customDatasets', 'View') ? (
            <Route
              path="externalDataset/*"
              element={
                <ExternalDataset>
                  <Routes>
                    <Route path="list" element={<DatasetList />} />
                    <Route path=":id" element={<Dataset />} />
                  </Routes>
                </ExternalDataset>
              }
            />
          ) : null}
          {getIsCanAccess('datasources', 'View') ? (
            <>
              <Route path="/Configuration" element={<Configuration />} />
              <Route path="/datasources" element={<Datasources />} />
            </>
          ) : null}
          <Route path="/settings/me" element={<MyProfile />} />
          {getIsCanAccess('companyProfile', 'View') ? (
            <Route path="/settings/company" element={<CompanyProfile />} />
          ) : null}
          {getIsCanAccess('users', 'View') ? (
            <Route path="/settings/users" element={<Users />} />
          ) : null}
          {/* Not needed for now. */}
          {getIsCanAccess('roles', 'View') ? (
            <Route path="/settings/roles" element={<Roles />} />
          ) : null}
          {getIsCanAccess('archiveMetrics', 'View') ? (
            <Route
              path="/settings/archiveMetrics"
              element={<ArchiveMetrics />}
            />
          ) : null}
          {getIsCanAccess('metricsStore', 'View') ? (
            <Route path="/settings/metricStore" element={<MetricStore />} />
          ) : null}
          {/* <Route path="/settings/general" element={<GeneralSettings />} /> */}
          {getIsCanAccess('uiTheming', 'View') ? (
            <>
              <Route path="/settings/embed/theming" element={<Theming />} />
              <Route path="/playground" element={<PlayGround />} />
              <Route
                path="/settings/embed/themeForm/:name"
                element={<ThemesForm />}
              />
              <Route
                path="/settings/embed/themeForm"
                element={<ThemesForm />}
              />
            </>
          ) : null}
          {getIsCanAccess('apiTokens', 'View') ? (
            <Route path="/settings/embed/apiToken" element={<APIToken />} />
          ) : null}
          {getIsCanAccess('demoConfig', 'View') ? (
            <Route path="/settings/embed/demoConfig" element={<DemoConfig />} />
          ) : null}
          {getIsCanAccess('whitelistedDomains', 'View') ? (
            <Route
              path="/settings/embed/whitelistDomains"
              element={<WhitelistDomains />}
            />
          ) : null}
          {getIsCanAccess('scheduledSettings', 'View') ? (
            <Route
              path="/settings/embed/scheduledSettings"
              element={<EmailSettings />}
            />
          ) : null}
          {getIsCanAccess('accessPermissions', 'View') ? (
            <Route
              path="/settings/embed/accessPermissions"
              element={<AccessPermissions />}
            />
          ) : null}
          {/* <Route path="/settings/workspace/cache" element={<Cache />} /> */}
          {getIsCanAccess('downloadSettings', 'View') ? (
            <Route
              path="/settings/embed/downloadSettings"
              element={<RawCsvSettings />}
            />
          ) : null}
          {getIsCanAccess('metric', 'Create') ? (
            <Route path="/createMetric" element={<CreateMetric />} />
          ) : null}
          {getIsCanAccess('metric', 'Edit') ? (
            <Route path="/metric/:id" element={<CreateMetric />} />
          ) : null}
          {getIsCanAccess('datasources', 'Edit Credentials') ? (
            <Route path="integration/:id" element={<IntegrationForm />} />
          ) : null}
          {getIsCanAccess('secrets', 'View') ? (
            <Route path="/settings/secrets" element={<Secrets />} />
          ) : null}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </NewAppLayout>

      <SigninModal
        setShowModal={setShowTokenExpiredModal}
        isShowModal={isShowTokenExpiredModal}
      />
    </>
  );
};

export default NewAppRoutes;
