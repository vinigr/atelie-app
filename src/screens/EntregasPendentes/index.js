import React, { Component } from 'react';

import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import api from '../../services/api';

import { StyledEntregas, TextTitulo, TextPrazo } from '../styles/styled';

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

  buscaBanco = async () => {
    try {
      const res = await api.get('/roupa/listagemNaoEntregues');
      this.setState({ roupa: res.data, loading: false });
    } catch (err) {
      this.setState({ err: err.data.err, loading: false });
    }
  }


  render() {
    return (
      <View>
        <FlatList
          data={data.filter(
            roupa => roupa.estado === 'CONCLUÍDO' && roupa.entrega === false,
          )}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Details', { item })
              }
            >
              <StyledEntregas>
                <View style={{ flex: 1 }}>
                  <TextTitulo>{item.name}</TextTitulo>
                  <Text>{item.cliente}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginBottom: 'auto',
                    alignItems: 'flex-end',
                  }}
                >
                  <TextPrazo>Prazo</TextPrazo>
                  {item.prazo === '15/04/19' ? (
                    <Text style={{ color: 'red' }}>{item.prazo}</Text>
                  ) : (
                    <Text>{item.prazo}</Text>
                  )}
                </View>
              </StyledEntregas>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
