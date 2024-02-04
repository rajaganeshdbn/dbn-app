/**
 * colors - object of customizable colors
 * typography - object of customizable typography
 * border - object of customizable border
 * shadow - object of customizable box shadow
 * breakpoint - object of customizable breakpoint
 * metricLayoutCols - object of customizable metric chart layout columns
 */
export interface ThemeType {
  colors?: {
    background?: string;
    backgroundLight?: string;
    primary?: string;
    secondary?: string;
    tertiary?: string;
    dark?: string;
    light?: string;
    primaryDark?: string;
    primaryLight?: string;
    secondaryDark?: string;
    secondaryLight?: string;
    tertiaryDark?: string;
    tertiaryLight?: string;
    error?: string;
    errorDark?: string;
    errorLight?: string;
    success?: string;
    successLight?: string;
    successDark?: string;
    warning?: string;
    warningLight?: string;
    warningDark?: string;
    gray50?: string;
    gray100?: string;
    gray200?: string;
    gray300?: string;
    gray400?: string;
    gray500?: string;
    gray600?: string;
    gray700?: string;
    gray800?: string;
    gray900?: string;
  };
  typography?: {
    colorPrimary?: string;
    colorSecondary?: string;
    colorTertiary?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeightThin?: number;
    fontWeightLight?: number;
    fontWeightRegular?: number;
    fontWeightSemibold?: number;
    fontWeightBold?: number;
  };
  breakpoint?: {
    xl?: number;
    lg?: number;
    md?: number;
    sm?: number;
    xs?: number;
  };
  metricLayoutCols?: {
    xl?: number;
    lg?: number;
    md?: number;
    sm?: number;
    xs?: number;
    xxs?: number;
  };
  border?: {
    radiusNone?: number | string;
    radiusSm?: number | string;
    radiusMd?: number | string;
    radiusDefault?: number | string;
    radiusLg?: number | string;
    radiusXl?: number | string;
    radius2xl?: number | string;
    radius3xl?: number | string;
    radiusFull?: number | string;
  };
  shadow?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
}

export const applyTheme = (theme: ThemeType): void => {
  const root = document.documentElement;
  if (theme.colors)
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (key && value)
        root.style.setProperty(`--dbn-color-${key}`, `${value}`);
    });
  if (theme.border)
    Object.entries(theme.border).forEach(([key, value]) => {
      if (key && value)
        root.style.setProperty(`--dbn-border-${key}`, `${value}`);
    });
  if (theme.shadow)
    Object.entries(theme.shadow).forEach(([key, value]) => {
      if (key && value)
        root.style.setProperty(`--dbn-shadow-${key}`, `${value}`);
    });
  if (theme.typography)
    Object.entries(theme.typography).forEach(([key, value]) => {
      if (key && value)
        root.style.setProperty(`--dbn-typography-${key}`, `${value}`);
    });
  if (theme.breakpoint)
    Object.entries(theme.breakpoint).forEach(([key, value]) => {
      if (key && value)
        root.style.setProperty(`--dbn-breakpoint-${key}`, `${value}`);
    });
};
