import React, { useState } from "react";
import { View, TextInput, Button, Alert, AsyncStorage } from "react-native";
import { globalStyles } from "../styles/global";
import base64 from 'react-native-base64';



export default function Login({ navigation }) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
     
    signIn = async () => {
        const auth = 'Basic ' + base64.encode(login + ':' + password)
        try {
            let response = await fetch('https://spendcontrol.herokuapp.com/api/tokens', {
                method: 'POST',
                headers: {
                    Authorization: auth
                }
            })
            let responseJson = await response.json()
            if (responseJson.token) {
                console.log('Token from backend recived: ' + responseJson.token)
                AsyncStorage.setItem('userToken', responseJson.token)
                navigation.push('Home')
            } else {
                console.log('There is no token in response from backend')
                Alert.alert('SignIn', 'Authorisation error')
            }
        } catch(error) {
            console.error(error)
            Alert.alert('SignIn', 'Authorisation error')
        }
    }

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.inputForm}>
                <TextInput 
                    style={globalStyles.input}
                    placeholder='Username...'
                    autoFocus={true}
                    onChangeText={(value) => setLogin(value)}
                />
                <TextInput 
                    style={globalStyles.input}
                    placeholder='Password...'
                    secureTextEntry={true}
                    onChangeText={(value) => setPassword(value)}
                />
                <Button 
                    style={globalStyles.loginButton}
                    title='Sign In'
                    onPress={signIn}
                /> 
            </View>
        </View>
    )
}