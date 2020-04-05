import React from 'react'
import { View, FlatList, Text, Button } from 'react-native'
import { globalStyles } from "../styles/global"


export default class SpendsScrollList extends React.Component {
    constructor(data, params) {
        super(data, params)
        this.state={
            flatListData: [
                {
                    id: '0',
                    title: data.fuel_consumption,
                    text: 'L/100km'
                },
                {
                    id: '1',
                    title: data.unit_price,
                    text: 'RUB/km'
                },
                {
                    id: '2',
                    title: data.month_price,
                    text: 'RUB/M'
                },
                {
                    id: '3',
                    title: data.year_price,
                    text: 'RUB/Y'
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
                            <Text style={{fontSize: 40}}>{item.title}</Text>
                            <Text style={{fontSize: 24}}>{item.text}</Text>
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