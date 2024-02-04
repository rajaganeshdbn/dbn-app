/* eslint-disable react/forbid-elements */
/* eslint-disable react/forbid-dom-props */
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import GeneralSettings from 'pages/Settings/components/MyProfile';
// import Integrations from 'pages/Integrations';
// import MetricsDashboard from 'pages/MetricsDashboard';
// import NewDashboard from 'pages/MetricsDashboard/new';
// import OnboardingLayout from 'pages/Onboarding';
import CreateDataModel from 'pages/CreateDataModel';
import DataModel from 'pages/DataModels';
import PreviewDataModel from 'pages/PreviewDataModel';
// import MetricCreate from 'pages/MetricCreate';
// import MetricUpdate from 'pages/MetricUpdate';
import APIToken from 'pages/Settings/components/APIToken';
// import Connections from 'pages/Integrations/components/Connections';
// import Sources from 'pages/Integrations/components/Sources';
// import Destinations from 'pages/Integrations/components/Destinations';
import Externaldashboard from 'pages/ExternalDashboard';
// import ExternalMetricCreate from 'pages/ExternalMetricCreate';
// import ExternalMetricUpdate from 'pages/ExternalMetricUpdate';
import EmbedDashboard from 'pages/EmbedDashboard';
import AccessPermissions from 'pages/Settings/components/AccessPermissions';
import Theming from 'pages/Settings/components/Theming';
import DemoConfig from 'pages/Settings/components/DemoConfig';
import NewExternalDashboard from 'pages/ExternalDashboard/NewExternalDashboard';
// import InviteUser from 'pages/Settings/components/InviteUser';
import MetricStore from 'pages/MetricStore';
import ArchivedMetrics from 'pages/ArchivedMetrics';
import Home from 'pages/Home';
import Cache from 'pages/Settings/components/Cache';
import Configuration from 'pages/Configuration';
import DatasetList from 'pages/ExternalDataset/components/DatasetList';
import ExternalDataset from 'pages/ExternalDataset';
import Dataset from 'pages/ExternalDataset/components/Dataset';
import EmailSettings from 'pages/Settings/components/EmailSettings';
import RawCsvSettings from 'pages/Settings/components/RawCsvSettings';
import WhitelistDomains from 'pages/Settings/components/WhitelistDomains';
import { isTokenAvailable } from 'atoms/application';
import { useAtom } from 'jotai';
import IntegrationForm from 'components/IntegrationForm';
import AppLayout from 'components/AppLayout';
// import ConnectionStepForm from 'components/ConnectionStepForm';
// import Connection from 'components/Connection';
// import Source from 'components/Source';
// import Destination from 'components/Destination';
import SigninModal from 'components/SignInModal';

const AppRoutes = () => {
  const [isShowTokenExpiredModal, setShowTokenExpiredModal] = useState(false);
  const [isTokenValid] = useAtom(isTokenAvailable);

  useEffect(() => {
    if (!isTokenValid) setShowTokenExpiredModal(true);
  }, [isTokenValid]);
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path=":id" element={<MetricsDashboard />} /> */}
          <Route path="externalDashboard/:id" element={<Externaldashboard />} />
          <Route
            path="/externalDashboard/new"
            element={<NewExternalDashboard />}
          />
          {/* <Route
            path="integrations/*"
            element={
              <Integrations>
                <Routes>
                  <Route path="connections" element={<Connections />} />
                  <Route path="sources" element={<Sources />} />
                  <Route path="destinations" element={<Destinations />} />
                </Routes>
              </Integrations>
            }
          /> */}
          {/* <Route path="connection" element={<ConnectionStepForm />} />
          <Route path="source/:id" element={<Source />} />
          <Route path="destination/:id" element={<Destination />} />
          <Route path="connection/:id" element={<Connection />} /> */}
          <Route path="integration/:id" element={<IntegrationForm />} />
          {/* <Route path="/metric/new" element={<MetricCreate />} />
        <Route path="/metric/:id" element={<MetricUpdate />} /> */}
          <Route path="/metricStore" element={<MetricStore />} />
          <Route path="/archivedMetrics" element={<ArchivedMetrics />} />
          {/* <Route
            path="/externalMetric/new"
            element={<ExternalMetricCreate />}
          />
          <Route
            path="/externalMetric/:id"
            element={<ExternalMetricUpdate />}
          /> */}
          {/* <Route path="/onboarding" element={<OnboardingLayout />} /> */}
          <Route path="/dataSources" element={<Configuration />} />
          <Route path="/dataModel" element={<DataModel />} />
          <Route path="/dataModel/new" element={<CreateDataModel />} />
          <Route path="dataModel/preview/:id" element={<PreviewDataModel />} />
          <Route path="/settings/general/" element={<GeneralSettings />} />
          <Route path="/settings/general/apiToken" element={<APIToken />} />
          <Route path="embedDashboards" element={<EmbedDashboard />} />
          {/* <Route path="/settings/general/inviteUser" element={<InviteUser />} /> */}
          <Route
            path="/settings/general/scheduledSettings"
            element={<EmailSettings />}
          />
          <Route
            path="/settings/workspace/accessPermissions"
            element={<AccessPermissions />}
          />
          <Route path="/settings/general/theming" element={<Theming />} />
          <Route path="/settings/general/demoConfig" element={<DemoConfig />} />
          <Route
            path="/settings/general/whitelistDomains"
            element={<WhitelistDomains />}
          />
          <Route path="/settings/workspace/cache" element={<Cache />} />
          <Route
            path="/settings/workspace/downloadSettings"
            element={<RawCsvSettings />}
          />
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
        </Routes>
      </AppLayout>
      <SigninModal
        setShowModal={setShowTokenExpiredModal}
        isShowModal={isShowTokenExpiredModal}
      />
    </>
  );
};

export default AppRoutes;
