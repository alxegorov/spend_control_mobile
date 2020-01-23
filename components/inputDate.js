import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';

export default function InputDate() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleDatePicker = date => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    
    return (
        <View>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:7}}>
                    <TextInput
                        placeholder='Date...'
                        style={globalStyles.inputWithButton}
                    />
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity 
                        onPress={showDatePicker}
                        style={globalStyles.buttonForInput}
                    >
                        <Ionicons name='md-calendar' size={32} /> 
                    </TouchableOpacity>      
                </View>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDatePicker}
                onCancel={hideDatePicker}
            />
        </View>
    );
};