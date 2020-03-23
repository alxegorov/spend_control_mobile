import React from "react";
import { View, TextInput, Button, Text, Picker, AppState, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import InputDate from '../components/inputDate';
import { API_URL } from '../config'


export default class Home extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            date: new Date(),
            cars: global.startData.cars_list,
            car: '1',
            types: global.startData.spend_types,
            spendType: '1',
            trip: '',
            price: '',
            mount: '',
            fuelConsumption: global.startData.fuel_consumption,
            kmPrice: global.startData.unit_price,
            monthPrice: global.startData.month_price,
            yearPrice: global.startData.year_price,
            appState: AppState.currentState,
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange)
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange)
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.updateData()
        }
        this.setState({appState: nextAppState})
    }

    submitDateHandler = (text) => {
        this.setState({date: text})
    }

    submitSpendHandler = () => {
        let data = {"date":this.state.date,"car":this.state.car,"type":this.state.spendType,"trip":this.state.trip,"price":this.state.price,"mount":this.state.mount}
        let dataJson = JSON.stringify(data)
        let url = API_URL + 'spends/move/car/newspend'
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: global.startData.tokenAuth,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: dataJson
        }).then((response) => {
            if (response.ok) {
                this.updateData()
                this.priceInput.clear()
                this.amountInput.clear()
                Alert.alert('Spend Control', 'Spend successful added')
            } else {
                Alert.alert('Spend Control', 'Error: ' + response.status)
            }
        })
        
    }

    updateData() {
        let url = API_URL + 'spends/move/car/start'
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: global.startData.tokenAuth
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.tokenAuth = global.startData.tokenAuth
                global.startData = responseJson
                this.setState({
                    cars: responseJson.cars_list,
                    types: responseJson.spend_types,
                    fuelConsumption: responseJson.fuel_consumption,
                    kmPrice: responseJson.unit_price,
                    monthPrice: responseJson.month_price,
                    yearPrice: responseJson.year_price,
                })
            })
    }


    render() {     
        return (
            <View style={globalStyles.container}>   
                <View style={globalStyles.autoScrollView}>
                    <View style={globalStyles.item}>
                        <View style={globalStyles.leftBar}>
                            <Text style={{fontSize: 40}}>{this.state.fuelConsumption}</Text>
                            <Text style={{fontSize: 24}}>L/100km</Text>
                        </View>
                        <View style={globalStyles.rightBar}>
                            <Text style={{fontSize: 40}}>{this.state.kmPrice}</Text>
                            <Text style={{fontSize: 24}}>RUB/km</Text>
                        </View>
                    </View>
                    <View style={globalStyles.item}>
                        <View style={globalStyles.leftBar}>
                            <Text style={{fontSize: 40}}>{this.state.monthPrice}</Text>
                            <Text style={{fontSize: 24}}>RUB/M</Text>
                        </View>
                        <View style={globalStyles.rightBar}>
                            <Text style={{fontSize: 40}}>{this.state.yearPrice}</Text>
                            <Text style={{fontSize: 24}}>RUB/Y</Text>
                        </View>
                    </View>
                </View>
                <View style={globalStyles.homeInputForm}>
                    <InputDate submitDateHandler={this.submitDateHandler} currentDate={this.state.date}/> 
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
                        ref={input => {this.priceInput = input}}
                    />
                    <TextInput 
                        placeholder='Amount...'
                        style={globalStyles.input}
                        onChangeText={(text) => this.setState({mount: text})}
                        ref={input => {this.amountInput = input}}
                    />
                    <Button 
                        title='Add'
                        onPress={this.submitSpendHandler}
                        style={globalStyles.button}
                    />
                </View>
            </View>
        )
    }
}