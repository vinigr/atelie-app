import React, { Component } from 'react';

import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Picker,
  TextInput,
} from 'react-native';
import {
  SCLAlert,
  SCLAlertButton,
} from 'react-native-scl-alert';

import { DetailsTitulo } from '../../styles/styled';
import styles from './styles';


import api from '../../services/api';
import AddIcon from '../../components/AddIcon';

export default class DetalhesEntrega extends Component {
  state = {
    loading: true,
    idRoupa: null,
    roupa: [],
    err: false,
    show: false,
    entregadores: [],
    identregador: null,
    idajuste: null,
    showCadastroEntregador: false,
    nomeentregador: null,
    showAlert: false,
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
      const entregadores = await api.get('/entregador/listagem');
      this.setState({ roupa: res.data, entregadores: entregadores.data, loading: false });
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

  concluirRoupa = async (idcostureira) => {
    const { idRoupa, identregador } = this.state;

    if (!identregador || identregador === -1) {
      this.handleClose();
      this.setState({ err: 'Escolha o entregador' });
      return;
    }

    api.put(`/roupa/cadastrarEntrega/${idRoupa}`, {
      identregador,
      dataentrega: new Date().toISOString(),
    }).then((res) => {
      this.setState({ err: false });
      this.buscaBanco();
    }).catch((err) => {
      this.setState({ err: 'Erro ao concluir ajuste' });
    });

    this.handleClose();
    this.props.navigation.goBack();
  }

  cadastroEntregador = async () => {
    const { nomeentregador } = this.state;

    if (!nomeentregador || nomeentregador === '') {
      return this.setState({ err: 'Nome do entregador imcompleto' });
    }

    this.setState({ loading: true });
    try {
      await api.post('/entregador/cadastrar', {
        nomeEntregador: nomeentregador,
        ativo: true,
      }).then((res) => {
        this.buscaBanco();
      });
    } catch (err) {
      this.setState({ err: 'Erro ao cadastrar entregador' });
    }
    this.setState({ loading: false, showCadastroEntregador: false });
  }

  handleOpen = () => {
    this.setState({ showAlert: true });
  }

  handleClose = () => {
    this.setState({ showAlert: false });
  }

  handleCadastroEntregador = () => {
    this.setState({ showCadastroEntregador: !this.state.showCadastroEntregador });
  }


  render() {
    const { roupa } = this.state;
    return (
      <ScrollView>
        { this.state.loading ? <ActivityIndicator />
          : (
            <View style={styles.container}>
              {this.state.err && <Text>{this.state.err}</Text>}
              <DetailsTitulo>{roupa.nomeroupa}</DetailsTitulo>
              <View style={styles.cliente}>
                <Text style={{ fontSize: 20 }}>Cliente: {roupa.nomecliente}</Text>
              </View>
              <Text style={styles.text}>Ajustes</Text>
              { roupa.ajustes.map(this.renderAjustes)}
              <View style={styles.observacoes}>
                <Text style={styles.text}>Observações</Text>
                <Text>{roupa.observacao}</Text>
              </View>
              <View>
                <View style={styles.entregadores}>
                  <Text style={styles.text}>Entregador</Text>
                  <AddIcon
                    handleCadastroEntregador={this.handleCadastroEntregador}
                  />
                </View>
                <Picker
                  selectedValue={this.state.identregador}
                  onValueChange={(itemValue) => {
                    this.setState({ identregador: itemValue });
                  }}
                  placeHolderText="Selecione"
                >

                  <Picker.Item label="Selecione" value={-1} />
                  { this.state.entregadores.map(entregador => (
                    <Picker.Item
                      key={entregador.identregador}
                      label={entregador.nome}
                      value={entregador.identregador}
                    />
                  ))}
                </Picker>
                { this.state.showCadastroEntregador === true && (
                <View style={{ alignItems: 'center' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome do entregador"
                    onChangeText={text => this.setState({ nomeentregador: text })}
                  />
                  <TouchableOpacity
                    style={styles.buttonFooter}
                    onPress={() => this.cadastroEntregador()}
                  >
                    <Text style={styles.textButton}>Cadastrar entregador</Text>
                  </TouchableOpacity>
                </View>
                )}


              </View>

              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.buttonFooter}
                  onPress={() => this.handleOpen()}
                >
                  <Text style={styles.textButton}>Concluir roupa</Text>
                </TouchableOpacity>
              </View>
              <SCLAlert
                theme="success"
                show={this.state.showAlert}
                title="Concluir"
                subtitle="Quem concluir essa roupa?"
                onRequestClose={() => this.handleClose()}
              >
                <SCLAlertButton theme="success" onPress={() => this.concluirRoupa()}>Concluir</SCLAlertButton>
                <SCLAlertButton theme="danger" onPress={() => this.handleClose()}>Cancelar</SCLAlertButton>
              </SCLAlert>
            </View>
          )
        }
      </ScrollView>
    );
  }
}
