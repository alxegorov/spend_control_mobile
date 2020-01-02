import React from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "../styles/global";

export default function Home({ navigation }) {
    const pressHandler = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={globalStyles.container}>
            <Text>Home screen</Text>
            <Button title='Sign In' onPress={pressHandler} />
        </View>
    )
}