import React, { Component } from "react";
import { View, TextInput, Button, AsyncStorage, Text, Picker } from "react-native";
import { globalStyles } from "../styles/global";
import InputDate from '../components/inputDate';


export default class Home extends Component {
    
    constructor(props){
        super(props)
        this.state={
            username: 'Guest',
            spendType: '1',
            types: []
        }
    }

    componentDidMount(){
        this.getUsername()
        this.getSpendTyps()
    }

    getUsername = async() => {
        try {
            let token = await AsyncStorage.getItem('userToken')
            let response = await fetch('https://spendcontrol.herokuapp.com/api/users/current', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
            let responseJson = await response.json()
            if (responseJson.username) {
                this.setState({username: responseJson.username})
            } else {
                this.props.navigation.navigate('Login')
            }
        }
        catch {
            this.props.navigation.navigate('Login')
        }
    }
x
    getSpendTyps = async() => {
        try{
            let token = await AsyncStorage.getItem('userToken')
            let response = await fetch('https://spendcontrol.herokuapp.com/api/spends/move/car/types', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
            let responseJson = await response.json()
            this.setState({types: responseJson})
        }
        catch(error) {
            console.error(error)
        }
    }

    render() {     
        return (
            <View style={globalStyles.container} o>   
                <Text style={globalStyles.messageBox}>Hello, { this.state.username }</Text>
                <View style={globalStyles.inputForm}>
                    <InputDate /> 
                    <View style={{borderWidth: 1, borderColor: 'grey', borderRadius: 10, marginBottom: 10, backgroundColor: 'white'}}>
                        <Picker
                            selectedValue = { this.state.spendType } 
                            style = {{height: 40}}
                            onValueChange={(itemValue) => {this.setState({spendType: itemValue})}}>
                            {this.state.types.map((data) => {
                                return (
                                    <Picker.Item label={data.value} value={data.id} key={data.id} />
                                )
                            })}
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
        )
    }
}