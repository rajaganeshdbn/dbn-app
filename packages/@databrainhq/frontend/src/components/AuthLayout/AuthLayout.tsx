/* eslint-disable react/forbid-elements */
/* eslint-disable react/forbid-dom-props */
import { useLocation } from 'react-router-dom';
import databrainLogoDark from '@src/assets/BrandLogo/databrain-dark-full.svg';
import { useEffect, useState } from 'react';
import Databrain3D from './Databrain3D.svg';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const [isSignUp, setSignUp] = useState<boolean>(false);
  useEffect(() => {
    if (pathname.includes('/sign-up')) setSignUp(true);
    else setSignUp(false);
  }, [pathname]);
  if (pathname.includes('/embedDashboards')) return <>{children}</>;
  return (
    <div className="dbn-h-screen dbn-w-screen dbn-flex dbn-flex-col dbn-px-6 dbn-relative dbn-overflow-y-scroll">
      <div className="dbn-hidden dbn-w-full lg:dbn-h-[10%] lg:dbn-block dbn-h-[10%] dbn-py-5">
        <div className="dbn-w-fit">
          <a href="https://www.usedatabrain.com">
            <img
              src={databrainLogoDark}
              alt="Databrain Logo"
              style={{ height: '30px' }}
            />
          </a>
        </div>
      </div>
      <div className={`${isSignUp ? '' : 'dbn-h-[80%]'} dbn-w-full`}>
        {children}
      </div>
      <div className="dbn-fixed dbn-right-28 dbn-bottom-0">
        <img src={Databrain3D} alt="logo" />
      </div>
    </div>
  );
};

export default AuthLayout;
