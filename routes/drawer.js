import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import Home from "../screens/home";
import Login from "../screens/login";

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
    },
    Login: {
        screen: Login,
    },
});

export default createAppContainer(RootDrawerNavigator);