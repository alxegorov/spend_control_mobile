import React from "react";
import { View, TextInput, Button, Alert, AsyncStorage, Switch, Text } from "react-native";
import { globalStyles } from "../styles/global";
import base64 from 'react-native-base64';
import { API_URL } from '../config'



export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state={
            login: '',
            password: '',
            rememberMe: false,
        }
    }
         
    componentDidMount() {
        this.checkSavedAuth()
    }
    
    async signIn() {
        if (this.state.rememberMe) {
            AsyncStorage.setItem('login', this.state.login)
            AsyncStorage.setItem('password', this.state.password)
        }        
        try {
            let auth = 'Basic ' + base64.encode(this.state.login + ':' + this.state.password)
            let url = API_URL + 'tokens'
            let response = await fetch(url, {
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
                    this.props.navigation.navigate('Home')
                }    
            } else {
                Alert.alert('SignIn', 'Authorization error')
            }
        } catch(error) {
            Alert.alert('SignIn', 'Authorization error')
        }
    }

    async checkSavedAuth() {
        try {
            let login = await AsyncStorage.getItem('login')
            let password = await AsyncStorage.getItem('password')
            if (login && password) {
                this.setState({rememberMe: true})
                this.setState({login: login})
                this.setState({password: password})
            }

        } catch(error){
            console.log(error)
        }
    }

    render() {
        return (
            <View style={globalStyles.container}>
                <View style={globalStyles.inputForm}>
                    <TextInput 
                        style={globalStyles.input}
                        placeholder='Username...'
                        autoFocus={true}
                        onChangeText={(value) => this.setState({login: value})}
                        value={this.state.login}
                    />
                    <TextInput 
                        style={globalStyles.input}
                        placeholder='Password...'
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({password: value})}
                        value={this.state.password}
                    />
                    <View style={globalStyles.item}>
                        <Text style={{marginRight: 10}}>Remember Me</Text>
                        <Switch 
                            value={this.state.rememberMe}
                            onValueChange={(value) => {this.setState({rememberMe: value})}}
                        />     
                    </View>
                    <Button 
                        style={globalStyles.loginButton}
                        title='Sign In'
                        onPress={ this.signIn }
                    /> 
                </View>
            </View>
        )
    }
}