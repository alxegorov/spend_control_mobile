import React, { useState } from "react";
import { View, TextInput, Button, AsyncStorage, Text, Picker } from "react-native";
import { globalStyles } from "../styles/global";
import InputDate from '../components/inputDate';


export default function Home({ navigation }) {
    const [username, setUsername] = useState('Guest')
    const [spendType, setSpendType] = useState('')

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
                <InputDate /> 
                <View style={{borderWidth: 1, borderColor: 'grey', borderRadius: 10, marginBottom: 10, backgroundColor: 'white'}}>
                    <Picker
                        selectedValue = {spendType} 
                        style = {{height: 40}}
                        onValueChange={(itemValue) => {setSpendType(itemValue)}}>
                        <Picker.Item label="Gasoline 92" value='1' />   
                        <Picker.Item label="Gasoline 95" value='2' />
                        <Picker.Item label="Gasoline 98" value="3" />
                    </Picker>
                </View>
                <TextInput 
                    placeholder='Trip...'
                    style={globalStyles.input}
                />
                <TextInput 
                    placeholder='Prise...'
                    style={globalStyles.input}
                />
                <TextInput 
                    placeholder='Mount...'
                    style={globalStyles.input}
                />
                <Button 
                    title='Add' 
                />
            </View>
        </View>
    );
}