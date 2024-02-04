// import { isLoggedIn } from 'helpers/application/auth';
// import AppRoutes from './app.routes';
import { getCurrentUser } from 'helpers/application/auth';
import AuthRoutes from './auth.routes';
import NewAppRoutes from './newApp.routes';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from 'atoms/application';

const Routes = () => {
  const user = getCurrentUser();
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  return <div>{isLoggedIn || user ? <NewAppRoutes /> : <AuthRoutes />}</div>;
};

export default Routes;
