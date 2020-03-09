import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    item: {
        flexDirection:'row', 
        marginBottom: 10, 
        alignItems: "center"
    },
    messageBox: {
        marginBottom: 10,
        backgroundColor: 'lightblue',
        borderWidth: 1,
        borderColor: 'powderblue',
        borderRadius: 6,
        color: 'navy',
        padding: 10,
        height: 50,
        textAlignVertical: 'center'
    },
    pickerBox: {
        borderWidth: 1, 
        borderColor: 'grey', 
        borderRadius: 10, 
        marginBottom: 10, 
        backgroundColor: 'white'
    },
    inputForm: {
        marginBottom: 10
    },   
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        height: 40,
        marginBottom: 10,
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 10
    },
    inputWithButton: {
        borderLeftWidth : 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: 'grey',
        height: 40,
        marginBottom: 10,
        padding: 8,
        backgroundColor: 'white'
    },
    button: {
        marginBottom: 10
    },
    buttonForInput: {
        backgroundColor: 'white', 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderTopWidth: 1, 
        borderRightWidth: 1, 
        borderColor: 'grey', 
        borderTopRightRadius: 10, 
        borderBottomRightRadius: 10
    },
    leftBar: {
        flex: 1, 
        borderColor: 'black', 
        borderWidth: 1, 
        marginRight: 10, 
        padding: 10, 
        alignItems: 'center',
    },
    rightBar: {
        flex: 1, 
        borderColor: 'black', 
        borderWidth: 1, 
        padding: 10, 
        alignItems: 'center'
    }
})