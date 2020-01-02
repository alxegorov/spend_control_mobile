import React from "react";
import { View, ScrollView, TextInput, Button} from "react-native";
import { globalStyles } from "../styles/global";

export default function Login() {
    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.loginForm}>
                <ScrollView>
                    <TextInput 
                        style={globalStyles.loginInput}
                        placeholder='Username...'
                        autoFocus={true}
                    />
                    <TextInput 
                        style={globalStyles.loginInput}
                        placeholder='Password...'
                        secureTextEntry={true}
                    />
                    <Button 
                        style={globalStyles.loginButton}
                        title='Sign In'
                    />
                </ScrollView>
            </View>
        </View>
    )
}