import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: '100%', 
        flex: 1
    },
    containerInput: {
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },  
    input: {
        borderColor: '#3a8fdc',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        height: 40,
        marginBottom: 10
    },
    inputTelefone: {
        borderColor: '#3a8fdc',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        width: '60%',
        height: 40
    },
    buttonFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        left: 0, right: 0, bottom: 0,
        height: 50,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: '100%', 
        backgroundColor: '#3a8fdc'
    },
    textButton: {
        fontSize: 20
    }
});

export default styles;