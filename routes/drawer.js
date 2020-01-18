import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import HomeStack from "./homeStack"
import LoginStack from "./loginStack";

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
    },
    Login: {
        screen: LoginStack,
    },
});

export default createAppContainer(RootDrawerNavigator);