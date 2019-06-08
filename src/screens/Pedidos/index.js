import React, { Component } from 'react';
import {
  Text, View, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl,
} from 'react-native';
import { TextTitulo } from '../../styles/styled';
import api from '../../services/api';
import styles from './styles';


export default class Pedidos extends Component {
  state={
    pedidos: [],
    loading: true,
    refreshing: false,
    erro: '',
  }

  componentDidMount() {
    this.buscaBanco();
  }

  buscaBanco = async () => {
    try {
      const res = await api.get('/pedido/listagem');
      this.setState({ pedidos: res.data, loading: false });
    } catch (err) {
      this.setState({ erro: err.data.error, loading: false });
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.buscaBanco().then(() => this.setState({ refreshing: false }));
  }

  render() {
    return (
      <View>
        {this.state.erro !== '' && <Text>{this.state.erro}</Text>}
        {this.state.loading ? <ActivityIndicator />
          : (
            <FlatList
              data={this.state.pedidos}
              keyExtractor={item => `${item.idpedido}`}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.props.navigation.push('PedidoRoupas', { pedidoId: item.idpedido, clienteId: item.idcliente })}>
                  <View style={styles.pedidoTouchable}>
                    <TextTitulo>#{item.idpedido}</TextTitulo>
                    <Text>{item.nomecliente}</Text>
                  </View>
                </TouchableOpacity>
              )}
              refreshControl={(
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              )}
            />
          )
        }
      </View>
    );
  }
}
