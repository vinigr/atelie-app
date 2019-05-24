import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'

import styles from './styles';

export default class CadastroClientes extends Component {
  state={
    cliente: '',
    endereco: '',
    cidade: '',
    telefone: '',
    erro: {
      cliente: false
    }
  }
  
  handleSubmit = () => {
    console.tron.log(this.state)
  }
  
  render() {
    const { cliente, endereco, telefone, cidade } = this.state;
    return (
      <View style={styles.container}>
            <View style={styles.containerInput}>
                <Text>Cliente</Text>
                <TextInput 
                  value={cliente} style={ this.state.erro.cliente === false ? styles.input : styles.inputErro } 
                  onChangeText={text => this.setState({ cliente: text})}
                />
                <Text>Endereço</Text>
                <TextInput 
                  value={endereco} 
                  style={styles.input} 
                  onChangeText={text => this.setState({ endereco: text})}
                />
                <Text>Cidade</Text>
                <TextInput 
                  value={cidade} 
                  style={styles.input} 
                  onChangeText={text => this.setState({ cidade: text})}
                />
                <Text>Telefone</Text>
                <TextInput 
                  value={telefone} 
                  style={styles.inputTelefone} 
                  onChangeText={text => this.setState({ telefone: text})}
                  keyboardType='numeric'
                  maxLength={11}
                />
            </View>
            
            <TouchableOpacity onPress={this.handleSubmit} style={styles.buttonFooter}><Text style={styles.textButton}>Cadastrar</Text></TouchableOpacity>
            
      </View>
    )
  }
}


