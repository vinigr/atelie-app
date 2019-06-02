import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import api from '../../services/api';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class PedidoRoupas extends Component {
  static navigationOptions = ({ navigation }) => {
    let idpedido = null;
    if(navigation.getParam('itemId')){
      idpedido = navigation.getParam('itemId');
    } else {
      idpedido = navigation.getParam('pedidoId');
    }
    return {
      title: `Pedido #${idpedido}`,
    };
  };

  state = {
    err: null,
    loading: true,
    idpedido: null,
    roupas: [],
  }

  async componentDidMount(){
    const { navigation } = this.props;
    if(navigation.getParam('itemId')){
      let idpedido = navigation.getParam('itemId');
      this.setState({ idpedido });
      this.props.navigation.navigate('AddRoupa', { pedidoId: idpedido });
    } else {
      let idpedido = navigation.getParam('pedidoId');
      await this.setState({ idpedido });
    }
    this.buscaBanco();
  }

  buscaBanco = async () => {
    try{
      const res = await api.get(`/roupa/listagemPedido/${this.state.idpedido}`);
      this.setState({ roupas: res.data, loading: false });
    } catch(err) {
      this.setState({ err, loading: false });
    }
  }
  
  render() {
    
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading ? <ActivityIndicator /> :
          <>
            <FlatList
              data={this.state.roupas}
              keyExtractor={item => `${item.idroupa}`}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity 
                  // onPress={() => this.props.navigation.push('PedidoRoupas', { pedidoId: item.idpedido })}
                  >
                    <View style={styles.pedidoTouchable}>
                      {/* <TextTitulo>#{item.idpedido}</TextTitulo> */}
                      <Text>{item.observacao}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            /> 
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddRoupa', { pedidoId: this.state.idpedido })}>
              <Icon name='plus' style={styles.mais}/>
            </TouchableOpacity>
          </>   
        }
          
          
        {/* </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
      justifyContent: 'center',
      alignItems: 'center',
      position:'absolute',
      right: 25, bottom: 25,
      height: 60,
      width: 60,
      borderRadius: 50,
      backgroundColor: '#3a8fdc'
  },
  mais: {
    fontWeight: "bold",
    fontSize: 30,
    color: '#fff',
  }
})