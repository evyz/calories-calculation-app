import AdminProfile from "./adminProfile/AdminProfile";

import MainProfile from "./mainProfile/MainProfile";
import SettingsProfileComponent from "./settingsProfile/SettingsProfile";
import SettingsProfile from "./settingsProfile/SettingsProfile";
import ChangePass from "./settingsProfile/settings/changePass";
import ChangeName from "./settingsProfile/settings/changeName";
import Adress from "./settingsProfile/settings/Adress";
import Security from "./settingsProfile/settings/securitySystem";

export const profileRouter = [
  { name: "main", component: MainProfile },
  { name: "settings", component: SettingsProfile },
  { name: "admin", component: AdminProfile },
  { name: "changePassword", component: ChangePass },
  { name: "changeName", component: ChangeName },
  { name: "adress", component: Adress },
  { name: "security", component: Security },
];
