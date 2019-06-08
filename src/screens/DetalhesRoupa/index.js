import React, { Component } from 'react';

import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  SCLAlert,
  SCLAlertButton,
} from 'react-native-scl-alert';

import { DetailsTitulo } from '../../styles/styled';
import styles from './styles';


import api from '../../services/api';

export default class DetalhesRoupa extends Component {
  state = {
    loading: true,
    idRoupa: null,
    roupa: [],
    err: false,
    show: false,
    costureiras: [],
    idajuste: null,
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
      const costureiras = await api.get('/costureira/listagem');
      this.setState({ roupa: res.data, costureiras: costureiras.data, loading: false });
    } catch (err) {
      this.setState({ err: err.data.err, loading: false });
    }
  }

  renderAjustes = (ajuste) => {
    if (ajuste.datafinalizacao === null) {
      return (
        <TouchableOpacity
          style={styles.ajustePendente}
          key={`${ajuste.idajuste}`}
          onPress={() => this.handleOpen(ajuste.idajuste)}
        >
          <Text>{ajuste.nometipoajuste}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.ajusteConcluido}
        key={`${ajuste.idajuste}`}
      >
        <Text>{ajuste.nometipoajuste}</Text>
      </TouchableOpacity>
    );
  }

  concluirAjuste = async (idcostureira) => {
    const { idajuste, idRoupa } = this.state;

    api.put(`/ajuste/atualizar/${idajuste}`, {
      idcostureiraresponsavel: idcostureira,
      idroupa: idRoupa,
      datafinalizacao: new Date().toISOString(),
    }).then((res) => {
      this.setState({ err: false });
      this.buscaBanco();
    }).catch((err) => {
      this.setState({ err: 'Erro ao concluir ajuste' });
    });

    this.handleClose();
  }

  handleOpen = (idajuste) => {
    this.setState({ idajuste, show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  render() {
    const { roupa } = this.state;
    return (
      <View>
        { this.state.loading ? <ActivityIndicator />
          : (
            <View style={styles.container}>
              {this.state.err && <Text>{this.state.err}</Text>}
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
              <SCLAlert
                theme="success"
                show={this.state.show}
                title="Concluir"
                subtitle="Quem realizou o ajuste?"
                onRequestClose={() => this.handleClose()}
              >
                { this.state.costureiras.map(costureira => (
                  <SCLAlertButton
                    key={costureira.idcostureiraresponsavel}
                    theme="success"
                    onPress={() => this.concluirAjuste(costureira.idcostureiraresponsavel)}
                  >
                    {costureira.nomeresponsavel}
                  </SCLAlertButton>
                ))}
                <SCLAlertButton theme="danger" onPress={() => this.handleClose()}>Cancelar</SCLAlertButton>
              </SCLAlert>
            </View>
          )
        }
      </View>
    );
  }
}
