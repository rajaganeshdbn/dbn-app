import { Link } from 'react-router-dom';
import React from 'react';
import databrainLogoLight from '@src/assets/BrandLogo/databrain-light-full.svg';
import databrainLogoDark from '@src/assets/BrandLogo/databrain-dark-full.svg';
import databrainLogoLightCollapsed from '@src/assets/BrandLogo/databrain-light-collapsed.svg';
import databrainLogoDarkCollapsed from '@src/assets/BrandLogo/databrain-dark-collapsed.svg';

type BrandLogoProps = {
  color?: 'light' | 'dark';
  className?: string;
};

const BrandLogo: React.FC<BrandLogoProps> = React.memo(
  ({ color = 'light', className = '' }) => {
    return (
      <>
        <Link to="/" className={className}>
          {color === 'light' ? (
            <img src={databrainLogoLight} alt="logo" />
          ) : (
            <img src={databrainLogoDark} alt="logo" />
          )}
        </Link>
      </>
    );
  }
);

const BrandLogoCollapsed: React.FC<BrandLogoProps> = React.memo(
  ({ color = 'light', className = '' }) => {
    return (
      <>
        <Link to="/" className={className}>
          {color === 'light' ? (
            <img src={databrainLogoLightCollapsed} alt="logo" />
          ) : (
            <img src={databrainLogoDarkCollapsed} alt="logo" />
          )}
        </Link>
      </>
    );
  }
);

export { BrandLogo, BrandLogoCollapsed };
