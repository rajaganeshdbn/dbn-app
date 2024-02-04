import React, { useEffect, useId, useState } from 'react';
import { AdminThemeOptionsType } from '@/types';

const DbnStyles = ({
  componentName,
  adminTheme,
}: {
  componentName: string;
  adminTheme?: AdminThemeOptionsType;
}) => {
  const [adminThemeStyles, setAdminThemesStyles] = useState('');
  const [headStyles, setHeadStyles] = useState('');
  const id = useId();

  useEffect(() => {
    const dbnStyles = document.querySelector('#dbn-styles');
    if (dbnStyles) setHeadStyles(dbnStyles.innerHTML);
  }, []);

  useEffect(() => {
    if (!adminTheme) return setAdminThemesStyles('');

    let style = '';
    if (adminTheme.general.fontFamily?.trim()) {
      style = `
      .dbn-metric {
        font-family: ${adminTheme.general.fontFamily} !important;
      }
      .dbn-dashboard {
        font-family: ${adminTheme.general.fontFamily} !important;
      }`;
    }
    if (adminTheme.dashboard.backgroundColor?.trim()) {
      style = `${style}
      .dbn-dashboard {
        background-color: ${adminTheme.dashboard.backgroundColor} !important;
      }
      .dbn-selectBox {
        background-color: ${adminTheme.dashboard.backgroundColor} !important;
      }`;
    }
    if (adminTheme.dashboard.ctaColor?.trim()) {
      style = `${style}
      .dbn-btn-primary {
        background-color: ${adminTheme.dashboard.ctaColor} !important;
      }`;
    }
    if (adminTheme.dashboard.ctaTextColor?.trim()) {
      style = `${style}
      .dbn-btn-primary {
        color: ${adminTheme.dashboard.ctaTextColor} !important;
      }`;
    }
    if (adminTheme.cardTitle.fontWeight?.trim()) {
      style = `${style}
      .dbn-metric-card-title {
        font-weight: ${adminTheme.cardTitle.fontWeight} !important;
      }`;
    }
    if (adminTheme.cardTitle.fontSize?.trim()) {
      style = `${style}
      .dbn-metric-card-title {
        font-size: ${adminTheme.cardTitle.fontSize} !important;
      }`;
    }
    if (adminTheme.cardTitle.color?.trim()) {
      style = `${style}
      .dbn-metric-card-title {
        color: ${adminTheme.cardTitle.color} !important;
      }`;
    }
    if (adminTheme.cardDescription.fontWeight?.trim()) {
      style = `${style}
      .dbn-metric-card-description {
        font-weight: ${adminTheme.cardDescription.fontWeight} !important;
      }`;
    }
    if (adminTheme.cardDescription.fontSize?.trim()) {
      style = `${style}
      .dbn-metric-card-description {
        font-size: ${adminTheme.cardDescription.fontSize} !important;
      }`;
    }
    if (adminTheme.cardDescription.color?.trim()) {
      style = `${style}
      .dbn-metric-card-description {
        color: ${adminTheme.cardDescription.color} !important;
      }`;
    }
    if (adminTheme.cardCustomization.borderRadius?.trim()) {
      style = `${style}
      .dbn-metric-card {
        border-radius: ${adminTheme.cardCustomization.borderRadius} !important;
      }
      .dbn-metric-card-container {
        border-radius: ${adminTheme.cardCustomization.borderRadius} !important;
      }
      .dbn-metric {
        border-radius: ${adminTheme.cardCustomization.borderRadius} !important;
      }
      `;
    }
    if (adminTheme.cardCustomization.padding?.trim()) {
      style = `${style}
      .dbn-metric-card {
        padding: ${adminTheme.cardCustomization.padding} !important;
      }`;
    }
    if (adminTheme.cardCustomization.shadow?.trim()) {
      style = `${style}
      .dbn-metric-card-container {
        box-shadow: ${adminTheme.cardCustomization.shadow} !important;
      }
      .dbn-metric {
        box-shadow: ${adminTheme.cardCustomization.shadow} !important;
      }`;
    }
    if (adminTheme.dashboard.selectBoxTextColor?.trim()) {
      style = `${style}
      .dbn-selectBox {
        color: ${adminTheme.dashboard.selectBoxTextColor} !important;
      }`;
    }
    setAdminThemesStyles(style);
  }, [adminTheme]);

  return (
    <>
      <style id={`dbn-${componentName}-${id}-styles`}>{headStyles}</style>
      {adminThemeStyles ? (
        <style id={`dbn-${componentName}-${id}-admin-styles`}>
          {adminThemeStyles}
        </style>
      ) : null}
    </>
  );
};

export default DbnStyles;
