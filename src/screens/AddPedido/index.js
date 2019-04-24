import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Picker, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


export default class AddPedido extends Component {
  
    
    render() {
    return (
      <View style={styles.container}>
        <View>
            <Text>Cliente</Text>
            <TextInput style={styles.input}/>
        </View>
        <View>
        <Text>Empresa</Text>
        <Picker>
            <Picker.Item label="Empresa 1" value="empresa1" />
            <Picker.Item label="Empresa 2" value="empresa2" />
            <Picker.Item label="Cliente" value="cliente" />
        </Picker>
        </View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Cadastrar roupas</Text>
            <Icon name='chevron-right' size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: '97%',
        flex: 1,
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    text:{
        color: '#fff',
        fontSize: 18
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
    picker: {

    },
    button: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 5,
        width: '70%', 
        backgroundColor: '#3a8fdc',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row'
    }
})