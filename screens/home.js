import React, { useState } from "react";
import { View, TextInput, Button, AsyncStorage, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';


export default function Home({ navigation }) {
    const [username, setUsername] = useState('Guest')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

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

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    }
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }
    
    const handleDatePicker = date => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    }
    
    return (
        <View style={globalStyles.container} o>   
            <Text style={globalStyles.messageBox}>Hello, { username }</Text>
            <View style={globalStyles.inputForm}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:7}}>
                        <TextInput
                            placeholder='Date...'
                            style={{borderLeftWidth : 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                borderColor: 'grey',
                                height: 40,
                                marginBottom: 10,
                                padding: 8,
                                backgroundColor: 'white'}}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={showDatePicker}
                        style={{backgroundColor: 'white', height: 40, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderTopWidth: 1, borderRightWidth: 1, borderColor: 'grey', borderTopRightRadius: 10, borderBottomRightRadius: 10}}
                        >
                            <Ionicons name='md-calendar' size={32} /> 
                        </TouchableOpacity>      
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDatePicker}
                    onCancel={hideDatePicker}
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