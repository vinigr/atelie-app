import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

import api from '../../services/api';


export default class PedidoRoupas extends Component {
  static navigationOptions = ({ navigation }) => {
    let idpedido = null;
    if (navigation.getParam('itemId')) {
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
  };

  async componentDidMount() {
    const { navigation } = this.props;
    if (navigation.getParam('itemId')) {
      const idpedido = navigation.getParam('itemId');
      this.setState({ idpedido });
      this.props.navigation.navigate('AddRoupa', { pedidoId: idpedido });
    } else {
      const idpedido = navigation.getParam('pedidoId');
      await this.setState({ idpedido });
    }
    this.buscaBanco();
  }

  buscaBanco = async () => {
    try {
      const res = await api.get(`/roupa/listagemPedido/${this.state.idpedido}`);
      this.setState({ roupas: res.data, loading: false });
    } catch (err) {
      this.setState({ err, loading: false });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <FlatList
              data={this.state.roupas}
              keyExtractor={item => `${item.idroupa}`}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View style={styles.pedidoTouchable}>
                    {/* <TextTitulo>#{item.idpedido}</TextTitulo> */}
                    <Text>{item.observacao}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('AddRoupa', {
                pedidoId: this.state.idpedido,
              })
              }
            >
              <Icon name="plus" style={styles.mais} />
            </TouchableOpacity>
          </>
        )}

        {/* </View> */}
      </View>
    );
  }
}
