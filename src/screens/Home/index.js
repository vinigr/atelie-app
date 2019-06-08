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
import { TextTitulo } from '../../styles/styled';
import styles from './styles';

import api from '../../services/api';


export default class Home extends Component {
  state= {
    err: null,
    loading: true,
    refreshing: false,
    roupas: [],
  }

  componentDidMount() {
    this.buscaBanco();
  }

  buscaBanco = async () => {
    try {
      const res = await api.get('/roupa/listagemPendentes');
      this.setState({ roupas: res.data, loading: false });
    } catch (err) {
      this.setState({ err, loading: false });
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
            <>
              <FlatList
                data={this.state.roupas}
                keyExtractor={item => `${item.idroupa}`}
                renderItem={({ item }) => (

                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Detalhes', { roupaId: item.idroupa })
                    }
                  >
                    <View style={styles.roupaTouchable}>
                      <View style={{ flex: 1 }}>
                        <TextTitulo>{item.nomeroupa}</TextTitulo>
                        <Text style={{ color: '#686868' }}>Ajustes pendentes</Text>
                        <FlatList
                          data={item.ajustesPendentes}
                          keyExtractor={i => `${i.idajuste}`}
                          renderItem={({ item }) => <Text>{item.nometipoajuste}</Text>}
                        />
                      </View>
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
            </>
          )}
      </View>
    );
  }
}
