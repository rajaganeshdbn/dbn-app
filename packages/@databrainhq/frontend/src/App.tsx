import RouterSetting from 'settings/RouterSetting';
import ReactQuerySetting from 'settings/ReactQuerySetting';
import Routes from 'routes';
import '@/index.css';

const App = () => {
  return (
    <div className="dbn-flex-column dbn-justify-center">
      <ReactQuerySetting>
        <RouterSetting>
          <Routes />
        </RouterSetting>
      </ReactQuerySetting>
    </div>
  );
};

export default App;
