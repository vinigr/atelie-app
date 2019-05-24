import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: '100%', 
        flex: 1,
        // justifyContent: 'center'
    },
    containerInput: {
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },  
    input: {
        borderColor: '#3a8fdc',
        borderStyle: 'solid',
        borderWidth: 0.5,
        width: '100%',
        height: 45,
        backgroundColor: '#F8F8F8',
        marginBottom: 10
    },
    inputTelefone: {
        borderColor: '#3a8fdc',
        borderStyle: 'solid',
        backgroundColor: '#F8F8F8',
        borderWidth: 0.5,
        width: '60%',
        height: 45,
        marginBottom: 10
    },
    button:{
        width: '100%',
        alignItems: 'center'
    },
    buttonFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: 50,
        backgroundColor: '#3a8fdc',
        marginTop: 10
    },
    textButton: {
        fontSize: 20,
        color: '#fff'
    },
    inputErro: {
        borderColor: '#FF5555',
        borderStyle: 'solid',
        borderWidth: 0.5,
        width: '100%',
        height: 45,
        backgroundColor: '#F8F8F8',
        marginBottom: 10
    },
});

export default styles;