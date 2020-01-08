import React from "react";
import { View, ScrollView, TextInput, Button} from "react-native";
import { globalStyles } from "../styles/global";

export default function Login() {
    const clickHandler = () => {
        fetch('https://spendcontrol.herokuapp.com/api/tokens', {
            method: 'POST',
            headers: {
                Authorization: 'Basic Token'
            }
        })
            .then((responseJson) => {
                return console.log(responseJson.json('token'))
            })
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.loginForm}>
                <ScrollView>
                    <TextInput 
                        style={globalStyles.loginInput}
                        placeholder='Username...'
                        autoFocus={true}
                    />
                    <TextInput 
                        style={globalStyles.loginInput}
                        placeholder='Password...'
                        secureTextEntry={true}
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