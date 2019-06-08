import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import date from 'date-fns/difference_in_days';
import formatData from 'date-fns/format';
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
    idcliente: null,
    roupas: [],
    refreshing: false,
    preco: null,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const idcliente = navigation.getParam('clienteId');
    this.setState({ idcliente });
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
      this.setState({ roupas: res.data.roupas, preco: res.data.preco, loading: false });
    } catch (err) {
      this.setState({ err, loading: false });
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.buscaBanco().then(() => this.setState({ refreshing: false }));
  }

  renderData = (data) => {
    const resp = date(
      data,
      Date(),
    );

    const dataformat = formatData(
      data,
      'DD/MM/YYYY',
    );


    if (resp <= 3) {
      return (
        <Text style={{ color: 'red' }}>{dataformat}</Text>
      );
    }
    return <Text>{dataformat}</Text>;
  }

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
                <TouchableOpacity onPress={() => this.props.navigation.push('Detalhes', { roupaId: item.idroupa })}>
                  <View style={styles.roupaTouchable}>
                    {/* <TextTitulo>#{item.idpedido}</TextTitulo> */}
                    <Text style={styles.title}>{item.nomeroupa}</Text>
                    <View
                      style={{
                        flex: 1,
                        marginBottom: 'auto',
                        alignItems: 'flex-end',
                      }}
                    >
                      <Text>Prazo</Text>
                      {this.renderData(item.dataprevista)}
                    </View>
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('AddRoupa', {
                pedidoId: this.state.idpedido,
                clienteId: this.state.idcliente,
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
