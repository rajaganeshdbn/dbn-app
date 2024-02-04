import { atom, useAtom } from 'jotai';
import { GetThemesQuery } from 'utils/generated/graphql';

type ThemeStateType = {
  theme: GetThemesQuery['themes'][0] | undefined;
  chartColors: string[] | undefined;
};

const themeAtom = atom<ThemeStateType>({
  theme: undefined,
  chartColors: undefined,
});

const useThemeGlobalState = () => {
  const [themeState, setThemeState] = useAtom(themeAtom);

  const setTheme = (appTheme: GetThemesQuery['themes'][0]) => {
    setThemeState((prev) => ({ ...prev, theme: appTheme }));
  };

  const setChartColors = (chartColors: string[]) => {
    setThemeState((prev) => ({ ...prev, chartColors }));
  };

  return {
    themeState,
    setTheme,
    setChartColors,
    setThemeState,
  };
};

export default useThemeGlobalState;
