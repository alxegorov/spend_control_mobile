import React from "react";
import { AsyncStorage } from 'react-native'
import base64 from 'react-native-base64'
import { AppLoading } from 'expo'
import { API_URL } from './config'
import Navigator from "./routes/drawer"

export default class App extends React.Component {
  state = {
    isReady: false
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading 
          startAsync = {this._getStartFetch}
          onFinish = {() => this.setState({isReady: true})}
          onError ={console.warn}
        />
      )
    }

    return (
      <Navigator />
    )
  }

  async _getStartFetch() {
    try {
      let login = await AsyncStorage.getItem('login')
      let password = await AsyncStorage.getItem('password')
      if (login && password) {
        let auth = 'Basic ' + base64.encode(login + ':' + password)
        let tokenUrl = API_URL + 'tokens'
        let response = await fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    Authorization: auth
                }
            })
        if (response.ok) {
          let responseJson = await response.json()
          let tokenAuth = 'Bearer ' + responseJson.token
          // Get data from backend
        }      
      } else {
        // Unaythorisated data
      }
    }
    catch {
      console.warn
    }
  }
}