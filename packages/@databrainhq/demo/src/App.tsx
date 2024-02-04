import { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import MainSidebar from './components/MainSidebar';
import { useConfigContext } from './contexts/configContext';

function App() {
  const { config } = useConfigContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState(
    searchParams.get('token') || localStorage.getItem('token') || ''
  );
  const [configId, setConfigId] = useState(
    searchParams.get('configId') || localStorage.getItem('configId') || ''
  );
  const [primaryColor, setPrimaryColor] = useState(config?.primaryColor || '');
  const dashboardId =
    searchParams.get('dashboardId') ||
    localStorage.getItem('dashboardId') ||
    '';
  const dashboardId2 =
    searchParams.get('dashboardId2') ||
    localStorage.getItem('dashboardId2') ||
    '';
  const metricId =
    searchParams.get('metricId') || localStorage.getItem('metricId') || '';
  const height = searchParams.get('height');
  const width = searchParams.get('width');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('dashboardId', dashboardId);
      localStorage.setItem('metricId', metricId);
      localStorage.setItem('configId', configId);
    } else if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') as string);
    }
    if (localStorage.getItem('config')) {
      let configData = JSON.parse(localStorage.getItem('config') as string);
      setPrimaryColor(configData.primaryColor);
    }
  }, []);

  useEffect(() => {
    if (
      !searchParams.has('token') &&
      !searchParams.has('configId') &&
      !searchParams.has('dashboardId')
    ) {
      setSearchParams((prev) => ({ ...prev, token, configId, dashboardId }));
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <MainSidebar onSubmitToken={(value) => setToken(value)} token={token} />
      <div className="w-full overflow-x-hidden">
        <Routes>
          <Route
            path="/demo/"
            index
            element={
              <div className="w-full">
                <dbn-dashboard
                  token={token}
                  theme={JSON.stringify({
                    colors: {
                      primary: config?.primaryColor || primaryColor,
                    },
                  })}
                  dashboard-id={dashboardId}
                />
              </div>
            }
          />
          <Route
            path="/multi"
            element={
              <div className="w-full grid grid-cols-2">
                <div className="col-span-1">
                  <dbn-dashboard
                    token={token}
                    theme={JSON.stringify({
                      colors: {
                        primary: config?.primaryColor || primaryColor,
                      },
                    })}
                    dashboard-id={dashboardId}
                  />
                </div>
                <div className="col-span-1">
                  <dbn-dashboard
                    token={token}
                    theme={JSON.stringify({
                      colors: {
                        primary: config?.primaryColor || primaryColor,
                      },
                    })}
                    dashboard-id={dashboardId2}
                  />
                </div>
              </div>
            }
          />
          <Route
            path="/metric"
            element={
              <div className="w-full h-screen flex justify-center items-center">
                <dbn-metric
                  token={token}
                  theme={JSON.stringify({
                    colors: {
                      primary: config?.primaryColor || primaryColor,
                    },
                  })}
                  metric-id={metricId}
                  width={Number(width) || 800}
                  height={Number(height) || 600}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dbn-dashboard': any;
      'dbn-metric': any;
    }
  }
}
