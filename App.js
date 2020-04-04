import React from "react";
import { AsyncStorage } from 'react-native'
import base64 from 'react-native-base64'
import { AppLoading } from 'expo'
import { API_URL } from './config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './screens/home'
import Login from './screens/login'


const Stack = createStackNavigator()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      isAuthorized: false,
      startData: {}
    }
    this.getStartFetch = this.getStartFetch.bind(this)
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading 
          startAsync = {this.getStartFetch}
          onFinish = {() => this.setState({isReady: true})}
          onError ={console.warn}
        />
      )
    }

    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isAuthorized ? (
            <Stack.Screen
              name="Home"
              component={Home}
              options={{title: 'Spend Control'}}
              initialParams={{startData: this.state.startData}}
            />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{title: 'Spend Control'}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  async getStartFetch() {
    try {
      let login = await AsyncStorage.getItem('login')
      let password = await AsyncStorage.getItem('password')
      let auth = 'Basic ' + base64.encode(login + ':' + password)
      let tokenUrl = API_URL + 'tokens'
      let response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          Authorization: auth
        }
      })
      let responseJson = await response.json()
      let tokenAuth = 'Bearer ' + responseJson.token
      let startDataUrl = API_URL + 'spends/move/car/start'
      let startDataResponse = await fetch(startDataUrl, {
        method: 'GET',
        headers: {
          Authorization: tokenAuth
        }
      })
      let startDataResponseJson = await startDataResponse.json()
      startDataResponseJson.tokenAuth = tokenAuth
      this.setState({isAuthorized: true})
      this.setState({startData: startDataResponseJson})
    }
    catch {}
  }
}