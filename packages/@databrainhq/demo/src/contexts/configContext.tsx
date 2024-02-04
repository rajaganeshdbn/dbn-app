import React, { useEffect, useState, createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";

// const CONFIG_URL = 'https://api.usedatabrain.com/api/v1/demoThemes';
const NEW_CONFIG_URL = "https://backend.usedatabrain.com/v1/graphql";

type Config = {
  id: string;
  dashboardTitle?: string;
  primaryColor?: string;
  highlightColor?: string;
  textColor?: string;
  logoUrl?: string;
  navbarColor?: string;
  settings: {
    isHideSettings?: boolean;
    isHideProfile?: boolean;
  };
};

interface IConfigContext {
  config?: Config;
  configId: string;
  setConfigId: (configId: string) => void;
}

const ConfigContext = createContext<IConfigContext | undefined>(undefined);

type ConfigProviderProps = React.PropsWithChildren & {
  configId?: string;
};

export const useConfigContext = () => {
  return useContext(ConfigContext) as IConfigContext;
};

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [searchParams] = useSearchParams();
  const [config, setConfig] = useState<Config>();
  const [configId, setConfigId] = useState(searchParams.get("configId") || "");

  useEffect(() => {
    if (!configId) return;
    // fetch(`${CONFIG_URL}/${configId}`, {
    fetch(NEW_CONFIG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hasura-Role": "anonymous",
      },
      body: JSON.stringify({
        query: `
						query GetDemoConfig($configId: uuid!) {
							demoTheme_by_pk(id: $configId) {
								id
								dashboardTitle
								primaryColor
								logoUrl
								textColor
								highlightColor
								navbarColor
								settings
							}
						}
					`,
        variables: {
          configId,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors) alert(result.errors[0]);
        if (result.data.demoTheme_by_pk) setConfig(result.data.demoTheme_by_pk);
      })
      .catch((err) => {
        console.error("ERROR FETCHING CONFIG DETAILS:", err);
      });
  }, [configId]);

  return (
    <>
      <ConfigContext.Provider
        value={{
          config,
          configId,
          setConfigId,
        }}
      >
        {children}
      </ConfigContext.Provider>
    </>
  );
};
