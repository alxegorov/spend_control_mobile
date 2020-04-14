import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment'

export default function InputDate({ submitDateHandler }) {
    var currentDate = new Date()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [text, setText] = useState(Moment(currentDate).format('MMMM Do YYYY'))

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleDatePicker = date => {  
        currentDate = new Date
        if (date <= currentDate) {
            hideDatePicker()
            setText(Moment(date).format('MMMM Do YYYY'))
            submitDateHandler(date)
        } else {
            hideDatePicker()
            Alert.alert("Spend Control", "The date should be no more than the current")
        }

    };
    
    return (
        <TouchableOpacity onPress={showDatePicker}>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:7}}>
                    <Text style={globalStyles.inputWithButton}>{ text }</Text>
                </View>
                <View style={globalStyles.buttonForInput}>
                    <Ionicons name='md-calendar' size={32} color='grey' /> 
                </View>      
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDatePicker}
                onCancel={hideDatePicker}
            />
        </TouchableOpacity>
    );
};