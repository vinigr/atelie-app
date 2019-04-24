import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'

import styles from './styles';

export default class CadastroClientes extends Component {
  render() {
    return (
      <View style={styles.container}>
            <View style={styles.containerInput}>
                <Text>Cliente</Text>
                <TextInput style={styles.input}/>
                <Text>Endereço</Text>
                <TextInput style={styles.input}/>
                <Text>Telefone</Text>
                <TextInput style={styles.inputTelefone}/>
            </View>
            
            <TouchableOpacity style={styles.buttonFooter}><Text style={styles.textButton}>Cadastrar cliente</Text></TouchableOpacity>
            
      </View>
    )
  }
}


