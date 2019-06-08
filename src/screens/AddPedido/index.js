import React, { Component } from 'react';
import {
  Text, ScrollView, View, TouchableOpacity, ActivityIndicator, Picker,
} from 'react-native';

import { DatePicker } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

import api from '../../services/api';

export default class AddPedido extends Component {
    state = {
      datarecebimento: '',
      idloja: null,
      idcliente: null,
      clientes: [],
      loading: true,
      empresas: [],
      err: null,
      clienteQuery: [],
      query: '',
    }

    componentDidMount() {
      this.buscaBanco();
    }

    buscaBanco = async () => {
      try {
        const res = await api.get('/cliente/listagem');
        const resp = await api.get('/loja/listagem');
        this.setState({ clientes: res.data, empresas: resp.data, loading: false });
      } catch (err) {
        this.setState({ erro: err.data.error, loading: false });
      }
    }

    cadastrarPedido = async () => {
      const { idcliente, idloja, datarecebimento } = this.state;

      if (!idcliente || idcliente === -1 || idloja === -1 || !idloja || !datarecebimento) {
        this.setState({ err: 'Dados incompletos' });
        return;
      }


      this.setState({ loading: true });


      try {
        await api.post('/pedido/cadastrar', {
          idcliente,
          idloja,
          datarecebimento,
        }).then((res) => {
          this.setState({ loading: false });
          this.props.navigation.navigate('PedidoRoupas', { itemId: res.data[0].idpedido, clienteId: idcliente });
        });
      } catch (err) {
        this.setState({ erro: err.data.error, loading: false });
      }
    }

    queryCliente = async (text) => {
      try {
        await this.setState({ query: text });
        if (this.state.query === '') return;
        const res = await api.get(`/cliente/listagemNome/${text}`);
        await this.setState({ clienteQuery: res.data });
      } catch (err) {
        this.setState({ erro: err.data.error });
      }
    }

    render() {
      const View1 = (
        <View>
          {this.state.err && <Text style={{ color: 'red' }}>{this.state.err}</Text>}
          <View>
            <Text>Cliente</Text>
            <Picker
              selectedValue={this.state.idcliente}
              onValueChange={(itemValue) => {
                this.setState({ idcliente: itemValue });
              }}
            >
              <Picker.Item key={-1} label="" value={-1} />
              { this.state.clientes.map(cliente => (
                <Picker.Item key={cliente.idcliente} label={cliente.nomecliente} value={cliente.idcliente} />
              ))}
            </Picker>
          </View>
          <View>
            <Text>Empresa</Text>
            <Picker
              selectedValue={this.state.idloja}
              onValueChange={(itemValue) => {
                this.setState({ idloja: itemValue });
              }}
              placeHolderText="Selecione"
            >

              <Picker.Item label="" value={-1} />
              { this.state.empresas.map(empresa => (
                <Picker.Item key={empresa.idloja} label={empresa.nomeloja} value={empresa.idloja} />
              ))}
            </Picker>
          </View>
          <View>
            <Text>Data de entrada</Text>
            <DatePicker
              minimumDate={new Date(2019, 1, 1)}
              locale="en"
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType="fade"
              androidMode="default"
              textStyle={{ color: '#000' }}
              placeHolderText="Selecione"
              placeHolderTextStyle={{ color: '#B9B9B9' }}
              onDateChange={(date) => {
                this.setState({ datarecebimento: date });
              }
                    }
              disabled={false}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => this.cadastrarPedido()}>
            <Text style={styles.text}>Cadastrar roupas</Text>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      );

      return (
        <ScrollView style={styles.container}>
          {this.state.erro && <Text>{this.state.erro}</Text>}
          {this.state.loading ? <ActivityIndicator /> : View1}
        </ScrollView>
      );
    }
}
