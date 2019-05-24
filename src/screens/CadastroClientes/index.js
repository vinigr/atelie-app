import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'

import styles from './styles';
import api from '../../services/api';

export default class CadastroClientes extends Component {
  state={
    cliente: '',
    endereco: '',
    cidade: '',
    telefone: '',
    estado: '',
    cpf: '',
    erro: {
      cliente: false
    },
    aguardando: false
  }
  
  handleSubmit = () => {
    this.setState({ aguardando: true });
    const { cliente, endereco, telefone, estado, cidade, cpf } = this.state;
    api.post('/cliente/cadastrar', {
      cpf, 
      nomecliente : cliente, 
      endereco, 
      estado, 
      cidade, 
      telefone
    }).then(res => {
      console.tron.log(res.data.response)
      this.setState({ 
        cliente: '',
        endereco: '',
        cidade: '',
        telefone: '',
        estado: '',
        cpf: '',
        erro: {
          cliente: false
        },
        aguardando: false 
      });
    }).catch(err => {
      this.setState({ aguardando: false });
      console.tron.log(err);
    })

    
  }
  
  render() {
    const { cliente, endereco, telefone, cidade, cpf, estado, aguardando } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerInput}>
            <Text>Cliente</Text>
            <TextInput 
              value={cliente} style={ this.state.erro.cliente === false ? styles.input : styles.inputErro } 
              onChangeText={text => this.setState({ cliente: text})}
            />
            <Text>CPF</Text>
            <TextInput 
              value={cpf} 
              style={styles.inputTelefone} 
              onChangeText={text => this.setState({ cpf: text })}
              keyboardType='numeric'
              maxLength={11}
            />
            <Text>Endereço</Text>
            <TextInput 
              value={endereco} 
              style={styles.input} 
              onChangeText={text => this.setState({ endereco: text })}
            />
            <Text>Cidade</Text>
            <TextInput 
              value={cidade} 
              style={styles.input} 
              onChangeText={text => this.setState({ cidade: text })}
            />
            <Text>Estado</Text>
            <TextInput 
              value={estado} 
              style={styles.input} 
              onChangeText={text => this.setState({ estado: text })}
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
        <View style={styles.button}>
          <TouchableOpacity 
            disabled={aguardando === true ? true : false}
            onPress={this.handleSubmit} 
            style={styles.buttonFooter}
          >
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>     
        </View>
        
      </ScrollView>
    )
  }
}


