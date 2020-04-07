import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { globalStyles } from "../styles/global"
import NumberFormat from 'react-number-format'
import { MaterialCommunityIcons } from '@expo/vector-icons'


export default class SpendsScrollList extends React.Component {
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
                    icon: 'road'
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
        setInterval(() => this.scroll(), 3000)
    }

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
                    renderItem={({ item }) => (
                        <View style={globalStyles.leftBar}>
                            <NumberFormat 
                                value={item.title} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={value => <Text style={{fontSize: 40}}>{value}</Text>}
                            />
                            <Text style={{fontSize: 24}}>{item.text}</Text>
                            <MaterialCommunityIcons name={item.icon} size={32} color='black' />
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