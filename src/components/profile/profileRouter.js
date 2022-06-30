import AdminProfile from "./adminProfile/AdminProfile";
import MainProfile from "./mainProfile/MainProfile";
import SettingsProfile from "./settingsProfile/SettingsProfile";

export const profileRouter = [
    { name: "main", component: MainProfile },
    { name: "settings", component: SettingsProfile },
    { name: "admin", component: AdminProfile }
]