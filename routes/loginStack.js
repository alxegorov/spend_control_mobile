import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/login';

const screens = {
  Login: {
    screen: Login,
    },
};
 
const LoginStack = createStackNavigator(screens);

export default LoginStack;