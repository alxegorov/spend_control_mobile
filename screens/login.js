import React, { Component } from "react";
import { View, TextInput, Button, Alert, AsyncStorage, Switch, Text } from "react-native";
import { globalStyles } from "../styles/global";
import base64 from 'react-native-base64';



export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            login: '',
            password: '',
            rememberMe: false,
            savedAuth: false,
        }
    }

    componentDidMount() {
        this.checkSavedAuth()
    }
         
    signIn = async () => {
        if (this.state.rememberMe) {
            this.saveAuth()
        }
        const auth = 'Basic ' + base64.encode(this.state.login + ':' + this.state.password)
        try {
            let response = await fetch('https://spendcontrol.herokuapp.com/api/tokens', {
                method: 'POST',
                headers: {
                    Authorization: auth
                }
            })
            let responseJson = await response.json()
            if (responseJson.token) {
                AsyncStorage.setItem('userToken', responseJson.token)
                this.props.navigation.push('Home')
            } else {
                Alert.alert('SignIn', 'Authorisation error')
            }
        } catch(error) {
            Alert.alert('SignIn', 'Authorisation error')
        }
    }

    saveAuth = () => {
        AsyncStorage.setItem('login', this.state.login)
        AsyncStorage.setItem('password', this.state.password)
    }

    checkSavedAuth = async () => {
        try {
            let login = await AsyncStorage.getItem('login')
            let password = await AsyncStorage.getItem('password')
            if (login && password) {
                this.setState({rememberMe: true})
                this.setState({savedAuth: true})
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
                    <View style={{flexDirection:'row', marginBottom: 10, alignItems: "center"}}>
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