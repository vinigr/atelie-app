import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  SectionList,
  ScrollView,
} from 'react-native';
import styles from '../ListaAjusteCliente/styles';
import api from '../../services/api';

export default class ListaAjusteEmpresa extends Component {
  state = {
    errorMessage: null,
    loading: true,
    listaRoupas: [],
  };

  componentDidMount() {
    this.buscaLista();
  }

  buscaLista = async () => {
    try {
      const res = await api.get('/preco/listagemPrecoRoupaPJ');
      this.setState({ listaRoupas: res.data, loading: false });
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  };

  render() {
    const { loading, listaRoupas } = this.state;
    return (
      <ScrollView>
        {this.state.errorMessage && (
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        )}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <SectionList
            renderItem={({ item, index, section }) => (
              <View style={styles.viewAjustes} key={index}>
                <Text style={styles.textAjustes}>{item.nometipoajuste}</Text>
                <Text style={styles.textAjustes}>{item.preco}</Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.viewTitle}>
                <Text style={styles.title}>{title}</Text>
              </View>
            )}
            sections={listaRoupas}
            keyExtractor={(item, index) => item + index}
          />
        )}
      </ScrollView>
    );
  }
}
