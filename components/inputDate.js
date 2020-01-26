import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment'

export default function InputDate() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [text, setText] = useState('')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleDatePicker = date => {  
        hideDatePicker();
        setText(Moment(date).format('MMMM Do YYYY'));
        console.log(date)

    };
    
    return (
        <View>
            <TouchableOpacity onPress={showDatePicker}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:7}}>
                        <Text style={globalStyles.inputWithButton}>{ text }</Text>
                    </View>
                    <View style={{flex:1}}>
                        <View style={globalStyles.buttonForInput}>
                            <Ionicons name='md-calendar' size={32} color='grey' /> 
                        </View>      
                    </View>  
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDatePicker}
                    onCancel={hideDatePicker}
                />
            </TouchableOpacity>
        </View>
    );
};