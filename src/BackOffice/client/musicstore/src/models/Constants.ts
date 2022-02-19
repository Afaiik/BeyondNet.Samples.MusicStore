export const APP_NAME = `musicstore`;
export const STORAGE_KEY = `musicstore.appsettings`;

export const THEME_MODES = {
  Light: "light",
  Dark: "dark",
};

export const ENTITY_TYPE = {
  Idea: "Idea",
  Contact: "Contact",
};

export const AZURE_AD_CONFIG = {
  Tenant: process.env.REACT_APP_AZURE_TENANT_ID,
  ClientId: process.env.REACT_APP_AZURE_AD_APP_ID,
  RedirectUri: process.env.REACT_APP_MAIN_URL,
  CacheLocation: "localStorage",
};
