import React from "react";
import { AsyncStorage } from 'react-native'
import base64 from 'react-native-base64'
import { AppLoading } from 'expo'
import { API_URL } from './config'
import Navigator from "./routes/drawer"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
    global.startData = {}
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
          let startDataUrl = API_URL + 'spends/move/car/start'
          let startDataResponse = await fetch(startDataUrl, {
            method: 'GET',
            headers: {
              Authorization: tokenAuth
            }
          })
          if (startDataResponse.ok) {
            let startDataResponseJson = await startDataResponse.json()
            startDataResponseJson.tokenAuth = tokenAuth
            global.startData = startDataResponseJson
            global.initialRouteName = 'Home'
          }
        }      
      } else {
        global.initialRouteName = 'Login'
      }
    }
    catch {
      console.warn
    }
  }
}