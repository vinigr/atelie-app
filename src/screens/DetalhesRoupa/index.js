import React, { Component } from 'react';

import {
  Text,
  View,
  FlatList,
  CheckBox,
  ActivityIndicator,
} from 'react-native';
import { DetailsTitulo, AjustesRoupaView } from '../../styles/styled';

import api from '../../services/api';

class DetalhesRoupa extends Component {
  state = {
    loading: true,
    idRoupa: null,
    roupa: null,
    err: null,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const roupaId = navigation.getParam('roupaId');
    console.tron.log(roupaId);
    await this.setState({ idRoupa: roupaId });
    this.buscaBanco();
  }

  buscaBanco = async () => {
    try {
      const res = await api.get(`/roupa/mostrar/${this.state.idRoupa}`);
      this.setState({ roupa: res.data, loading: false });
    } catch (err) {
      this.setState({ err, loading: false });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading ? <ActivityIndicator />
          : (
            <>
              <DetailsTitulo>{this.state.name}</DetailsTitulo>
              {/* <AjustesRoupaView> */}
              <Text style={{ fontSize: 20 }}>Cliente: {this.state.cliente}</Text>
              <Text>Vendedor: {this.state.cliente}</Text>
              <View style={{ flex: 1, justifyContent: 'center', maxHeight: 150 }}>
                <Text>Ajustes</Text>
                <FlatList
                  data={this.state.ajustes}
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
                />
              </View>
              <Text>Observações</Text>
            </>
          )
        }
      </View>
    );
  }
}

export default DetalhesRoupa;
