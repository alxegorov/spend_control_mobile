import React, { Component } from "react";
import { View, TextInput, Button, AsyncStorage, Text, Picker } from "react-native";
import { globalStyles } from "../styles/global";
import InputDate from '../components/inputDate';


export default class Home extends Component {
    
    constructor(props){
        super(props)
        this.state={
            message: 'Hello, Guest',
            types: [{value: 'Spend type', id: 1}],
            cars: [{value: 'Car', id: 1}],
            date: '',
            car: '1',
            spendType: '1',
            trip: '',
            price: '',
            mount: ''
        }
    }

    componentDidMount() {
        this.getUsername()
        this.getCars()
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
                this.setState({message: 'Hello, ' + responseJson.username})
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

    getCars = async() => {
        try{
            let token = await AsyncStorage.getItem('userToken')
            let response = await fetch('https://spendcontrol.herokuapp.com/api/spends/move/car/cars', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
            if (response.ok) {
                let responseJson = await response.json()
                this.setState({cars: responseJson})
            }
        }
        catch(error) {
            console.error(error)
        }
    }

    postSpend = async(dataJson) => {
        try{
            let token = await AsyncStorage.getItem('userToken')
            let response = await fetch('https://spendcontrol.herokuapp.com/api/spends/move/car/newspend', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: dataJson
            })
            if (response.ok) {
                this.setState({message: 'Spend added'})
            }
            else {
                console.log(response.status)
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
        let data = {"date":this.state.date,"car":this.state.car,"type":this.state.spendType,"trip":this.state.trip,"price":this.state.price,"mount":this.state.mount}
        let dataJson = JSON.stringify(data)
        this.postSpend(dataJson)
    }


    render() {     
        return (
            <View style={globalStyles.container} o>   
                <Text style={globalStyles.messageBox}>{ this.state.message }</Text>
                <View style={globalStyles.inputForm}>
                    <InputDate submitDateHandler={this.submitDateHandler} /> 
                    <View style={globalStyles.pickerBox}>
                        <Picker
                            selectedValue = { this.state.car } 
                            style = {{height: 40}}
                            onValueChange={(itemValue) => {this.setState({car: itemValue})}}>
                            {this.state.cars.map((data) => {
                                return (
                                    <Picker.Item label={data.value} value={data.id} key={data.id} />
                                )
                            })}
                        </Picker>
                    </View>
                    <View style={globalStyles.pickerBox}>
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
                        placeholder='Amount...'
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