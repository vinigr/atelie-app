import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { TextTitulo } from '../../styles/styled';
import api from '../../services/api';
import styles from './styles';


export default class Pedidos extends Component {
  state={
    pedidos: [],
    loading: true,
    erro: ''
  }

  componentDidMount(){
    this.buscaBanco();
  }

  buscaBanco = async () => {
    try{
      const res = await api.get('/pedido/listagem');
      this.setState({ pedidos: res.data, loading: false })
    } catch(err) {
        this.setState({ erro: err.data.error , loading: false })
    }
  } 
  
  render() {
    return (
      <View>
        {this.state.erro !== '' && <Text>{this.state.erro}</Text>}
        {this.state.loading ? <ActivityIndicator /> : 
        <FlatList
        data={this.state.pedidos}
        keyExtractor={item => item.idpedido}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => this.props.navigation.push('PedidoRoupas', { itemId: item.idpedido })}>
              <View style={styles.pedidoTouchable}>
                <TextTitulo>#{item.idpedido}</TextTitulo>
              </View>
            </TouchableOpacity>
          );
        }}
      />}
    </View>
    )
  }
}


