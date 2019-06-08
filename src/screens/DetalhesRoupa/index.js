import React, { Component } from 'react';

import {
  Text,
  View,
  FlatList,
  CheckBox,
  ActivityIndicator,
} from 'react-native';
import { DetailsTitulo } from '../../styles/styled';
import styles from './styles';


import api from '../../services/api';

export default class DetalhesRoupa extends Component {
  state = {
    loading: true,
    idRoupa: null,
    roupa: [],
    err: null,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const roupaId = navigation.getParam('roupaId');
    await this.setState({ idRoupa: roupaId });
    this.buscaBanco();
  }


  buscaBanco = async () => {
    try {
      const res = await api.get(`/roupa/mostrar/${this.state.idRoupa}`);
      this.setState({ roupa: res.data, loading: false });
    } catch (err) {
      this.setState({ err: err.data.err, loading: false });
    }
  }

  render() {
    const { roupa } = this.state;
    return (
      <View>
        { this.state.loading ? <ActivityIndicator />
          : (
            <View style={styles.container}>
              <DetailsTitulo>{roupa.nomeroupa}</DetailsTitulo>
              <Text style={{ fontSize: 20 }}>Cliente:{roupa.nomecliente}</Text>
              <View style={{ flex: 1, justifyContent: 'center', maxHeight: 150 }}>
                <Text>Ajustes</Text>
                {/* <FlatList
                  data={roupas.ajustes}
                  style={{}}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <View
                      style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                    >
                      <CheckBox value={item.concluido} />
                      <Text>{item.name}</Text>
                    </View>
                  )}
                /> */}
              </View>
              <View>
                <Text>Observações</Text>
                <Text>{roupa.observacao}</Text>
              </View>
            </View>
          )
        }
      </View>
    );
  }
}
