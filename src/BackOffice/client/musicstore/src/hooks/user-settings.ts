import { useEffect, useState } from "react";

import { UserSettings } from "../models";
import { loadState, saveState } from "../services/local-storage.service";

const UserSettingsInitial = (): UserSettings => {
  const value = loadState<UserSettings>();

  return value ?? new UserSettings(false, true, false);
};

const useUserSettings = () => {
  const { menuDrawer, lightTheme, miniNavBar } = UserSettingsInitial();

  const [localMenuDrawer, setMenuDrawer] = useState(menuDrawer);
  const [localLightTheme, setLightTheme] = useState(lightTheme);
  const [localMiniNavBar, setMiniNavBar] = useState(miniNavBar);

  const toggleNavBar = () => setMenuDrawer((prvNavBar) => !prvNavBar);
  const toggleTheme = () => setLightTheme((prvTheme) => !prvTheme);
  const toggleSideBar = () => setMiniNavBar((prvSideBar) => !prvSideBar);

  useEffect(() => {
    var value = new UserSettings(
      localMenuDrawer,
      localLightTheme,
      localMiniNavBar
    );

    saveState(JSON.stringify(value));
  }, [localMenuDrawer, localLightTheme, localMiniNavBar]);

  return [
    {
      menuDrawer: localMenuDrawer,
      lightTheme: localLightTheme,
      miniNavBar: localMiniNavBar,
    },
    { toggleNavBar, toggleTheme, toggleSideBar },
  ];
};

export default useUserSettings;
