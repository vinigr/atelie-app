import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, ScrollView, Picker,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

import styles from './styles';
import api from '../../services/api';

import estados from '../../utils/estados';

export default class CadastroClientes extends Component {
  state={
    cliente: '',
    endereco: '',
    cidade: '',
    telefone: '',
    estado: 'BA',
    cpf: '',
    erro: {
      cliente: false,
    },
    err: null,
    aguardando: false,
  }

  handleSubmit = () => {
    this.setState({ aguardando: true, erro: cliente === false });
    const {
      cliente, endereco, telefone, estado, cidade, cpf,
    } = this.state;
    if (cliente === '') {
      this.setState({ erro: cliente === true, aguardando: false });
      return;
    }
    api.post('/cliente/cadastrar', {
      cpf,
      nomecliente: cliente,
      endereco,
      estado,
      cidade,
      telefone,
    }).then((res) => {
      this.setState({
        cliente: '',
        endereco: '',
        cidade: '',
        telefone: '',
        estado: 'BA',
        cpf: '',
        erro: {
          cliente: false,
        },
        aguardando: false,
      });
    }).catch((err) => {
      this.setState({ err: err.data.err, aguardando: false });
    });
  }

  render() {
    const {
      cliente, endereco, telefone, cidade, cpf, estado, aguardando, erro,
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        {this.state.err && <Text>{this.state.err}</Text>}
        <View style={styles.containerInput}>
          <Text>Cliente</Text>
          <TextInput
            value={cliente}
            style={erro.cliente === false ? styles.input : styles.inputErro}
            onChangeText={text => this.setState({ cliente: text })}
          />
          <Text>CPF</Text>
          <TextInputMask
            value={cpf}
            onChangeText={(formatted, extracted) => {
              this.setState({ cpf: extracted });
            }}
            style={styles.inputTelefone}
            mask="[000].[000].[000]-[00]"
            keyboardType="numeric"
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
          <View style={styles.estadoTelefone}>
            <View style={styles.viewTelefone}>
              <Text>Telefone</Text>
              <TextInputMask
                value={telefone}
                onChangeText={(formatted, extracted) => {
                  this.setState({ telefone: extracted });
                }}
                style={styles.inputTelefone}
                mask="([00]) [00000]-[0000]"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.viewPicker}>
              <Text>Estado</Text>
              <Picker
                selectedValue={estado}
                onValueChange={(itemValue, itemIndex) => this.setState({ estado: itemValue })}
              >
                {estados.map((e, index) => (
                  <Picker.Item key={index} label={e} value={e}>{e}</Picker.Item>
                ))}

              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            disabled={aguardando === true}
            onPress={this.handleSubmit}
            style={styles.buttonFooter}
          >
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
