import Login from "../components/login/Login2";
import Title from "../components/title/Title";
import Profile from "../components/profile/Profile";
import RegisterComponent from "../components/Register/Register";
import RegIcons from "../components/Register/RegIcons";
import Home from "../components/home/Home";
import Food from "../components/food/Food";
import Calendar from "../components/calendar/Calendar";
import Registration from "../components/Register/Registration";
import QA from "../components/Register/QA";

export const PublicComponents = [
  { name: "title", component: Title },
  { name: "login", component: Login },
  //   { name: "register", component: RegisterComponent },
  { name: "registerStep1", component: Registration },
  { name: "registerStep2", component: RegIcons },
  { name: "registerStep3", component: QA },
];

export const AuthComponents = [
  { name: "home", component: Home },
  { name: "food", component: Food },
  { name: "calendar", component: Calendar },
  { name: "profile", component: Profile },
];
