/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import styles from './icons.module.css';
import { logos } from './Logos';
import { iconSvgSprite } from './icons';
import { IconsProps, LogoType } from '@/types';

export const Icons: React.FC<IconsProps> = ({
  name,
  size = 'md',
  color = 'primary',
}) => {
  const [isAddSvgSpriteHtml, setisAddSvgSpriteHtml] = useState(false);
  useEffect(() => {
    const svgDiv = document.querySelectorAll('.dbn-icon-svg-sprite');
    if (svgDiv.length === 0) {
      setisAddSvgSpriteHtml(true);
    } else {
      setisAddSvgSpriteHtml(false);
    }
    if (svgDiv.length > 1) {
      [...svgDiv].forEach((item, index) => {
        if (index === 0) return;
        item.remove();
      });
    }
  }, []);
  return (
    <>
      {isAddSvgSpriteHtml ? (
        <span
          className={`${styles['dbn-icon-svg-sprite']} ${styles.iconSvgSpriteHidden}`}
          dangerouslySetInnerHTML={{ __html: iconSvgSprite }}
        />
      ) : null}
      <svg className={`${styles[size]} ${styles[color]}`}>
        <use href={`#${name}`} />
      </svg>
    </>
  );
};
type LogoProps = {
  name: LogoType;
  width?: number;
};

export const Logo: React.FC<LogoProps> = ({ name, width = 48 }) => {
  return <img src={logos[name]} width={width} alt={name} />;
};
