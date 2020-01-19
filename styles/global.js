import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        height: 40,
        marginBottom: 10,
        padding: 8,
        backgroundColor: 'white'
    },
    inputForm: {
        marginBottom: 10
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
})