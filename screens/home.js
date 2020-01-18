import React, { useState } from "react";
import { View, TextInput, Button, AsyncStorage, Text } from "react-native";
import { globalStyles } from "../styles/global";

export default function Home({ navigation }) {
    const [username, setUsername] = useState('Guest')

    const pressHandler = () => {
        navigation.navigate('Login');
    };

    getUsername = async () => {
        try {
            let token = await AsyncStorage.getItem('userToken')
            let auth = 'Bearer ' + token
            console.log(auth)

            let response = await fetch('https://spendcontrol.herokuapp.com/api/users/current', {
                method: 'GET',
                headers: {
                    Authorization: auth,
                }
            })
            let responseJson = await response.json()
            console.log(responseJson)
            if (responseJson.username) {
                setUsername(responseJson.username)
            } else {
                navigation.navigate('Login')
            }
            console.log('end try')
        }
        catch {
            navigation.navigate('Login')
        }
    }

    getUsername()
    
    return (
        <View style={globalStyles.container} o>   
            <Text>Hello, { username }</Text>
            <Button title='Authorisation' onPress={pressHandler} />
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