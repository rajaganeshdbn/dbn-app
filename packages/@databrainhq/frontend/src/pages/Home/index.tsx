import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import useExternalDashboards from 'hooks/useExternalDashboard';

const Home = () => {
  const { dashboards, isGettingDashboard } = useExternalDashboards();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isGettingDashboard && dashboards) {
      navigate(
        `/externalDashboard/${dashboards.length ? dashboards[0].id : 'new'}`
      );
    } else {
      navigate(`/externalDashboard/new`);
    }
  }, [dashboards, isGettingDashboard, navigate]);
  return <Loader />;
};

export default Home;
