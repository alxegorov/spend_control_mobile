import React from 'react'
import { View, TextInput, Button, Text, Switch, AsyncStorage } from 'react-native'
import { globalStyles } from '../styles/global'
import base64 from 'react-native-base64'
import { API_URL } from '../config'


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            login: '',
            password: '',
            rememberMe: false
        }
    }

    signInButtonHandler() {
        if (this.state.rememberMe) {
            AsyncStorage.multiSet([['login', this.state.login], 
                                   ['password', this.state.password]])
        }
        try {
            let basicAuth = 'Basic ' + base64.encode(this.state.login + ':' + this.state.password)
            let tokenUrl = API_URL + 'tokens'
            fetch(tokenUrl, {
                method: 'POST',
                headers: {Authorization: basicAuth}
            }).then(
                (response) => response.json()
            ).then(
                (json) => {
                    let tokenAuth = 'Bearer ' + json.token
                    let startDataUrl = API_URL + 'spends/move/car/start'
                    fetch(startDataUrl, {
                        method: 'GET',
                        headers: {Authorization: tokenAuth}
                    }).then(
                        (response) => response.json()
                    ).then(
                        (json) => {
                            json.tokenAuth = tokenAuth
                            this.props.navigation.navigate('Home', {startData: json})
                        }
                    )
                }
            )
        } catch {
            Alert.alert('SignIn', 'Authorization error')
        }
    }
    
    render() {
        return (
            <View style={globalStyles.container}>
                <View style={globalStyles.inputForm}>
                    <TextInput 
                        style={globalStyles.input} 
                        placeholder='Username'
                        autoFocus={true}
                        onChangeText={(text) => this.setState({login: text})}
                    />
                    <TextInput 
                        style={globalStyles.input} 
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <View style={globalStyles.item}>
                        <Text style={{marginRight: 10}}>Remember Me</Text>
                        <Switch 
                            value={this.state.rememberMe}
                            onValueChange={(value) => {this.setState({rememberMe: value})}}
                        />     
                    </View>
                    <Button 
                        title='Sign in' onPress={() => this.signInButtonHandler()}
                    />
                </View>
            </View>
        )
    }
}