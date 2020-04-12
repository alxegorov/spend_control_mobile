import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    item: {
        flexDirection:'row', 
        marginBottom: 10, 
        alignItems: "center"
    },
    pickerBox: {
        marginBottom: 10, 
        backgroundColor: 'whitesmoke'
    },
    inputForm: {
        padding: 20,
        marginBottom: 10
    },   
    input: {
        height: 40,
        marginBottom: 10,
        padding: 8,
        backgroundColor: 'whitesmoke'
    },
    inputWithButton: {
        height: 40,
        marginBottom: 10,
        padding: 8,
        backgroundColor: 'whitesmoke'
    },
    button: {
        marginBottom: 10
    },
    buttonForInput: {
        backgroundColor: 'whitesmoke', 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
        
    },
    leftBar: {
        flex: 1, 
        height: 180,
        width: 180,
        backgroundColor: 'white', 
        marginRight: 20, 
        padding: 10, 
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    homeInputForm: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7
    },
    autoScrollView: {
        backgroundColor: 'whitesmoke',
        padding: 20,
        height: 220
    }
})