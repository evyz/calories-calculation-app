import Login from "../components/login/Login"
import Title from "../components/title/Title"
import Profile from "../components/profile/Profile"
import RegisterComponent from "../components/Register/Register"

export const PublicComponents = [
    { name: "register", component: RegisterComponent },
    { name: "login", component: Login },
    { name: "title", component: Title },
]

export const AuthComponents = [
    { name: "login", component: Login },
    { name: "title", component: Title },
    { name: "profile", component: Profile },
]