import Login from "../components/login/Login2";
import Title from "../components/title/Title";
import Profile from "../components/profile/Profile";
import RegIcons from "../components/Register/RegIcons";
import Home from "../components/home/Home";
import Food from "../components/food/Food";
import Calendar from "../components/calendar/Calendar";
import Registration from "../components/Register/Registration";
import QA from "../components/Register/QA";
import HomeIcon from "../icons/home/homeIcon";
import FoodIcon from "../icons/food/foodIcon.js";
import CalendarIcon from "../icons/calendar/calendarIcon.js";
import ProfileIcon from "../icons/profile/profileIcon.js";

export const PublicComponents = [
  { name: "title", component: Title },
  { name: "login", component: Login },
  { name: "registerStep1", component: Registration },
  { name: "registerStep2", component: RegIcons },
  { name: "registerStep3", component: QA },
];

export const AuthComponents = [
  { name: "home", component: Home, icon: HomeIcon },
  { name: "food", component: Food, icon: FoodIcon },
  { name: "calendar", component: Calendar, icon: CalendarIcon },
  { name: "profile", component: Profile, icon: ProfileIcon },
  // { name: "settings", component: Settings },
];
