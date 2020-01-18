import React, { useState } from "react";
import { View, ScrollView, TextInput, Button, Alert, AsyncStorage } from "react-native";
import { globalStyles } from "../styles/global";
import base64 from 'react-native-base64';



export default function Login({ navigation }) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')

    const signIn = () => {
        getToken()
        AsyncStorage.setItem('userToken', token);
        navigation.push('Home')
    }
     
    const getToken = () => {
        const auth = 'Basic ' + base64.encode(login + ':' + password)
        fetch('https://spendcontrol.herokuapp.com/api/tokens', {
            method: 'POST',
            headers: {
                Authorization: auth
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.token) {
                    setToken(responseJson.token)
                } else {
                    Alert.alert('SignIn', 'Authorisation error')
                }
            })
            .catch(() => {
                Alert.alert('SignIn', 'Authorisation error')
            });
    };

    return (
        <View style={globalStyles.container}>
            <View>
                <ScrollView>
                    <TextInput 
                        style={globalStyles.loginInput}
                        placeholder='Username...'
                        autoFocus={true}
                        onChangeText={(value) => setLogin(value)}
                    />
                    <TextInput 
                        style={globalStyles.loginInput}
                        placeholder='Password...'
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                    />
                    <Button 
                        style={globalStyles.loginButton}
                        title='Sign In'
                        onPress={signIn}
                    />
                </ScrollView>
            </View>
        </View>
    )
}