import React, { Component } from 'react';

import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
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
    modalVisible: false,
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

  buttonClickded = () => {
    Alert.alert(
      'Alert Title',
      'Alert Msg',
      [
        { text: 'Later', onPress: () => console.log('later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  };

  renderAjustes = (ajuste) => {
    if (ajuste.datafinalizacao === null) {
      return (
        <TouchableOpacity
          style={styles.ajustePendente}
          key={`${ajuste.idajuste}`}
          onPress={ajuste => this.buttonClickded(ajuste)}
        >
          <Text>{ajuste.nometipoajuste}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={{ backgroundColor: 'green' }}
        key={`${ajuste.idajuste}`}
      >
        <Text>{ajuste.nometipoajuste}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { roupa } = this.state;
    return (
      <View>
        { this.state.loading ? <ActivityIndicator />
          : (
            <View style={styles.container}>
              <DetailsTitulo>{roupa.nomeroupa}</DetailsTitulo>
              <View style={styles.cliente}>
                <Text style={{ fontSize: 20 }}>Cliente:{roupa.nomecliente}</Text>
              </View>
              <Text style={styles.text}>Ajustes</Text>
              { roupa.ajustes.map(this.renderAjustes)}
              <View style={styles.observacao}>
                <Text style={styles.text}>Observações</Text>
                <Text>{roupa.observacao}</Text>
              </View>
            </View>
          )
        }
      </View>
    );
  }
}
