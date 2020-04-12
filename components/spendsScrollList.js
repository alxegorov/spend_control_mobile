import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { globalStyles } from "../styles/global"
import NumberFormat from 'react-number-format'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { API_URL } from '../config'


export default class SpendsScrollList extends React.Component {
    _isMounted = false

    constructor(data, params) {
        super(data, params)
        this.state={
            flatListData: [
                {
                    id: '0',
                    title: data.fuel_consumption,
                    text: 'L/100km',
                    icon: 'fuel'
                },
                {
                    id: '1',
                    title: data.unit_price,
                    text: 'RUB/km',
                    icon: 'road-variant'
                },
                {
                    id: '2',
                    title: data.month_price,
                    text: 'RUB/M',
                    icon: 'calendar'
                },
                {
                    id: '3',
                    title: data.year_price,
                    text: 'RUB/Y',
                    icon: 'calendar-multiple'
                }
            ],
            init: true
        }
        this.flatList=React.createRef()
    }

    componentDidMount() {
        this._isMounted = true
        setInterval(() => this.scroll(), 3000)
    }

    componentDidUpdate(data) {
        let dataUrl = API_URL + 'spends/move/car/start'
        fetch(dataUrl, {
            method: 'GET',
            headers:{Authorization: data.tokenAuth}
        }).then(
            (response) => response.json()
        ).then(
            (json) => {
                this.setState({flatListData: [
                    {
                        id: '0',
                        title: json.fuel_consumption,
                        text: 'L/100km',
                        icon: 'fuel'
                    },
                    {
                        id: '1',
                        title: json.unit_price,
                        text: 'RUB/km',
                        icon: 'road-variant'
                    },
                    {
                        id: '2',
                        title: json.month_price,
                        text: 'RUB/M',
                        icon: 'calendar'
                    },
                    {
                        id: '3',
                        title: json.year_price,
                        text: 'RUB/Y',
                        icon: 'calendar-multiple'
                    }
                ]})
            }
        )
    }

    componentWillUnmount() {this._isMounted = false}

    scroll() {
        try{
            if (this.state.init) {
                this.flatList.scrollToIndex({index: 2})
                this.setState({init: false})
            } else {
                this.flatList.scrollToIndex({index: 0})
                this.setState({init: true})
            }
            
        } catch {}
    }
    
    render() {
        return(
            <View style={globalStyles.autoScrollView}>
                <FlatList 
                    horizontal={true}
                    data={this.state.flatListData}
                    extraData={this.state.flatListData}
                    renderItem={({ item }) => (
                        <View style={globalStyles.leftBar}>
                            <NumberFormat 
                                value={item.title} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={value => <Text style={{fontSize: 40}}>{value}</Text>}
                            />
                            <Text style={{fontSize: 24}}>{item.text}</Text>
                            <MaterialCommunityIcons name={item.icon} size={64} color='black' />
                        </View>)}
                    keyExtractor = {item => item.id}
                    showsHorizontalScrollIndicator={false}
                    ref={list => {this.flatList=list}}
                    onScrollToIndexFailed={() => {}}
                /> 
            </View>
        )
    }
}