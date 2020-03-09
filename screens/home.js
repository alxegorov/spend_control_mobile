import React from "react";
import { View, TextInput, Button, Text, Picker, AppState } from "react-native";
import { globalStyles } from "../styles/global";
import InputDate from '../components/inputDate';


export default class Home extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            message: 'Hello, ' + global.startData.username,
            date: '',
            cars: global.startData.cars_list,
            car: '1',
            types: global.startData.spend_types,
            spendType: '1',
            trip: '',
            price: '',
            mount: '',
            fuelConsumption: global.startData.fuel_consumption,
            kmPrice: global.startData.unit_price,
            monthPrice: global.startData.mouth_price,
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
            this.getUsername()
        }
        this.setState({appState: nextAppState})
    }

    postSpend = async(dataJson) => {
        try{
            let response = await fetch('https://spendcontrol.herokuapp.com/api/spends/move/car/newspend', {
                method: 'POST',
                headers: {
                    Authorization: global.startData.tokenAuth,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: dataJson
            })
            if (response.ok) {
                this.setState({message: 'Spend added'})
            }
            else {
                this.setState({message: 'Error: ' + response.status})
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
            <View style={globalStyles.container}>   
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
                        style={globalStyles.button}
                    />
                </View>
                <View>
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
            </View>
        )
    }
}