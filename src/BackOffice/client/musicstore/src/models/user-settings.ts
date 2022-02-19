export default class UserSettings {
  menuDrawer: boolean;
  lightTheme: boolean;
  miniNavBar: boolean;

  toggleTheme: any;
  toggleSideBar: any;
  toggleNavBar: any;

  constructor(menuDrawer: boolean, lightTheme: boolean, miniNavBar: boolean) {
    this.menuDrawer = menuDrawer;
    this.lightTheme = lightTheme;
    this.miniNavBar = miniNavBar;
  }
}
