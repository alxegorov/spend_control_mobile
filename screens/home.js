import React, { Component } from "react";
import { View, TextInput, Button, AsyncStorage, Text, Picker } from "react-native";
import { globalStyles } from "../styles/global";
import InputDate from '../components/inputDate';


export default class Home extends Component {
    
    constructor(props){
        super(props)
        this.state={
            username: 'Guest',
            types: [{value: 'Spend type', id: 1}],
            date: '',
            spendType: '1',
            trip: '',
            price: '',
            mount: ''
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

    getSpendTyps = async() => {
        try{
            let token = await AsyncStorage.getItem('userToken')
            let response = await fetch('https://spendcontrol.herokuapp.com/api/spends/move/car/types', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
            if (response.ok) {
                let responseJson = await response.json()
                this.setState({types: responseJson})
            }
        }
        catch(error) {
            console.error(error)
        }
    }

    submitDateHandler = (text) => {
        this.setState({date: text})
    }

    submitSpendHandler = () => {
        let data = {"date":this.state.date,"type":this.state.spendType,"trip":this.state.trip,"prise":this.state.price,"mount":this.state.mount}
        let dataJson = JSON.stringify(data)
        console.log(dataJson)
    }


    render() {     
        return (
            <View style={globalStyles.container} o>   
                <Text style={globalStyles.messageBox}>Hello, { this.state.username }</Text>
                <View style={globalStyles.inputForm}>
                    <InputDate submitDateHandler={this.submitDateHandler} /> 
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
                        onChangeText={(text) => this.setState({trip: text})}
                    />
                    <TextInput 
                        placeholder='Prise...'
                        style={globalStyles.input}
                        onChangeText={(text) => this.setState({price: text})}
                    />
                    <TextInput 
                        placeholder='Mount...'
                        style={globalStyles.input}
                        onChangeText={(text) => this.setState({mount: text})}
                    />
                    <Button 
                        title='Add'
                        onPress={this.submitSpendHandler}
                    />
                </View>
            </View>
        )
    }
}