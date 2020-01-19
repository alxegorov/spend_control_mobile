import React, { useState } from "react";
import { View, TextInput, Button, AsyncStorage, Text } from "react-native";
import { globalStyles } from "../styles/global";

export default function Home({ navigation }) {
    const [username, setUsername] = useState('Guest')

    getUsername = async () => {
        try {
            let token = await AsyncStorage.getItem('userToken')
            console.log('Token from AsyncStorage recived: ' + token)
            let auth = 'Bearer ' + token

            let response = await fetch('https://spendcontrol.herokuapp.com/api/users/current', {
                method: 'GET',
                headers: {
                    Authorization: auth,
                }
            })
            let responseJson = await response.json()
            if (responseJson.username) {
                console.log('Username from backend recived: ' + responseJson.username)
                setUsername(responseJson.username)
            } else {
                console.log('There is no username in response from backend')
                navigation.navigate('Login')
            }
        }
        catch (error) {
            console.error(error.message)
            navigation.navigate('Login')
        }
    }

    getUsername()
    
    return (
        <View style={globalStyles.container} o>   
            <Text style={globalStyles.messageBox}>Hello, { username }</Text>
            <View style={globalStyles.inputForm}>
                <TextInput 
                    placeholder='Date...'
                    style={globalStyles.input}
                />
                <TextInput 
                    placeholder='Trip...'
                    style={globalStyles.input}
                />
                <TextInput 
                    placeholder='Type...'
                    style={globalStyles.input}
                />
                <TextInput 
                    placeholder='Prise...'
                    style={globalStyles.input}
                />
                <TextInput 
                    placeholder='Munt...'
                    style={globalStyles.input}
                />
                <Button 
                    title='Add' 
                />
            </View>
        </View>
    );
}