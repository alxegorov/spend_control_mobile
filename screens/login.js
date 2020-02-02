import React, { useState, Component } from "react";
import { View, TextInput, Button, Alert, AsyncStorage } from "react-native";
import { globalStyles } from "../styles/global";
import base64 from 'react-native-base64';



export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            login: '',
            password: ''
        }
    }
         
    signIn = async () => {
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

    render() {
        return (
            <View style={globalStyles.container}>
                <View style={globalStyles.inputForm}>
                    <TextInput 
                        style={globalStyles.input}
                        placeholder='Username...'
                        autoFocus={true}
                        onChangeText={(value) => this.setState({login: value})}
                    />
                    <TextInput 
                        style={globalStyles.input}
                        placeholder='Password...'
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({password: value})}
                    />
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