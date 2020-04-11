import React from "react";
import { View, TextInput, Button, Text, Picker, AppState, Alert, SafeAreaView, FlatList, AsyncStorage } from "react-native";
import { globalStyles } from "../styles/global"
import InputDate from '../components/inputDate'
import SpendsScrollList from '../components/spendsScrollList'
import { API_URL } from '../config'


export default class Home extends React.Component {
    constructor(route, props){
        super(route, props)
        this.state={
            date: new Date(),
            cars: route.route.params.startData.cars_list,
            car: '1',
            types: route.route.params.startData.spend_types,
            spendType: '1',
            trip: '',
            price: '',
            mount: '',
            appState: AppState.currentState,
            fuel_consumption: route.route.params.startData.fuel_consumption,
            unit_price: route.route.params.startData.unit_price,
            month_price: route.route.params.startData.month_price,
            year_price: route.route.params.startData.year_price,
            tokenAuth: route.route.params.startData.tokenAuth
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
                Authorization: this.state.tokenAuth,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: dataJson
        }).then((response) => {
            if (response.ok) {
                this.priceInput.clear()
                this.amountInput.clear()
                Alert.alert('Spend Control', 'Spend successful added')
            } else {
                Alert.alert('Spend Control', 'Error: ' + response.status)
            }
        })
        
    }

    render() {     
        return (
            <SafeAreaView style={globalStyles.container}> 
                <SpendsScrollList 
                    fuel_consumption={this.state.fuel_consumption}
                    unit_price={this.state.unit_price}
                    month_price={this.state.month_price}
                    year_price={this.state.year_price}
                    tokenAuth={this.state.tokenAuth}
                />
                <View style={globalStyles.homeInputForm}>
                    <InputDate 
                        submitDateHandler={this.submitDateHandler} 
                        currentDate={this.state.date}
                    /> 
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
            </SafeAreaView>
        )
    }
}