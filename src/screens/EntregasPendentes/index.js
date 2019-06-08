import React, { Component } from 'react';

import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';


import date from 'date-fns/difference_in_days';
import formatData from 'date-fns/format';
import styles from './styles';


import api from '../../services/api';

import { TextTitulo, TextPrazo } from '../../styles/styled';

export default class EntregasPendentes extends Component {
  state ={
    loading: true,
    refreshing: false,
    err: false,
    roupas: [],
  }

  componentDidMount() {
    this.buscaBanco();
  }

  componentWillUnmount() {
    this.buscaBanco();
    this.state.roupas === [];
  }

  buscaBanco = async () => {
    try {
      const res = await api.get('/roupa/listagemNaoEntregues');
      this.setState({ roupas: res.data, loading: false });
    } catch (err) {
      this.setState({ err: err.data.err, loading: false });
    }
  }

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
      <View>
        { this.state.loading ? <ActivityIndicator />
          : (
            <FlatList
              data={this.state.roupas}
              keyExtractor={item => `${item.idroupa}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('DetalhesEntrega', { roupaId: item.idroupa })
              }
                >
                  <View style={styles.roupaTouchable}>
                    <View style={{ flex: 1 }}>
                      <TextTitulo>{item.nomeroupa}</TextTitulo>
                      <Text>{item.nomecliente}</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginBottom: 'auto',
                        alignItems: 'flex-end',
                      }}
                    >
                      <TextPrazo>Prazo</TextPrazo>
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
          )
      }
      </View>
    );
  }
}
