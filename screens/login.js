import React, { useState } from "react";
import { View, ScrollView, TextInput, Button, AsyncStorage, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import base64 from 'react-native-base64';

export default function Login({ navigation }) {
    const signIn = (token) => {
        AsyncStorage.setItem('userToken', token)
        navigation.push('Home')
    };

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const clickHandler = () => {
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
                    signIn(responseJson.token)
                } else {
                    Alert.alert('SignIn Error', 'Authorisation error')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.loginForm}>
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
                        onPress={clickHandler}
                    />
                </ScrollView>
            </View>
        </View>
    )
}