import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { DatePicker } from 'native-base';
import api from '../../services/api';

import styles from './styles';

class AddRoupa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      idpedido: null,
      idcliente: null,
      roupaSelecionada: null,
      isActiveAjuste: [],
      roupas: [],
      ajustes: [],
      prazoEntrega: null,
      observacoes: '',
      err: null,
    };
  }

  componentDidMount() {
    this.buscaBanco();
    const { navigation } = this.props;
    const pedidoId = navigation.getParam('pedidoId');
    const clienteId = navigation.getParam('clienteId');
    this.setState({ idpedido: pedidoId, idcliente: clienteId });
  }

  buscaBanco = async () => {
    try {
      const res = await api.get('tipoRoupa/listagem');
      this.setState({ roupas: res.data, loading: false });
    } catch (err) {
      this.setState({ err: err.data.error, loading: false });
    }
  };

  buscaAjustes = async (id) => {
    try {
      const res = await api.get(`preco/listagemRoupa/${id}`);
      this.setState({ ajustes: res.data });
    } catch (err) {
      this.setState({ err: err.data.error, loading: false });
    }
  };

  cadastrarPedido = async () => {
    const {
      idpedido, idcliente, roupaSelecionada, isActiveAjuste, observacoes, prazoEntrega,
    } = this.state;
    try {
      this.setState({ loading: true });
      await api.post('roupa/cadastrarAjustes', {
        idpedido,
        idcliente,
        roupaSelecionada,
        observacoes,
        prazoEntrega,
        isActiveAjuste,
      });
      this.props.navigation.goBack();
    } catch (err) {
      this.setState({ err: err.data.error, loading: false });
    }
  };

  onShowUnderlay = (id) => {
    this.setState({ roupaSelecionada: id, isActiveAjuste: [] });
    this.buscaAjustes(id);
  };

  onShowAjusteUnderlay = (id) => {
    const ajuste = this.state.isActiveAjuste.filter(ajuste => ajuste === id);
    if (ajuste.length !== 0) {
      this.setState((state) => {
        const isActiveAjuste = state.isActiveAjuste.filter(j => id !== j);
        return {
          isActiveAjuste,
        };
      });
      return;
    }

    this.setState({ isActiveAjuste: [...this.state.isActiveAjuste, id] });
  };

  renderRoupas = roupa => (
    <TouchableOpacity
      onPress={() => this.onShowUnderlay(roupa.idtiporoupa)}
      style={
        this.state.roupaSelecionada === roupa.idtiporoupa
          ? styles.buttonPress
          : styles.button
      }
      key={`${roupa.nomeroupa}-${roupa.idtiporoupa}`}
    >
      <Text style={styles.textRoupas}>{roupa.nomeroupa}</Text>
    </TouchableOpacity>
  );

  renderAjustes = ajuste => (
    <TouchableOpacity
      onPress={() => this.onShowAjusteUnderlay(ajuste.idtipoajuste)}
      style={
        this.state.isActiveAjuste.filter(a => a === ajuste.idtipoajuste)[0]
        === ajuste.idtipoajuste
          ? styles.buttonAjustePress
          : styles.buttonAjuste
      }
      key={`${ajuste.nometipoajuste}-${ajuste.idtipoajuste}`}
    >
      <Text style={styles.text}>{ajuste.nometipoajuste}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View
              style={{
                width: '97%',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: 10,
              }}
            >
              <Text style={styles.text}>Roupa</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {this.state.roupas.map(this.renderRoupas)}
              </ScrollView>
            </View>
            {this.state.ajustes.length !== 0 ? (
              <View
                style={{
                  width: '97%',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                }}
              >
                <Text style={styles.text}>Ajustes</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {this.state.ajustes.map(this.renderAjustes)}
                </View>
              </View>
            ) : null}
            <View
              style={{
                width: '97%',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: 5,
              }}
            >
              <Text style={styles.text}>Prazo de entrega</Text>
              <DatePicker
                minimumDate={new Date(2019, 1, 5)}
                // maximumDate={new Date(2018, 12, 31)}
                locale="en"
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                style={{
                  borderRadius: 5,
                  backgroundColor: '#EFF0F0',
                }}
                animationType="fade"
                androidMode="default"
                textStyle={{ color: '#000' }}
                placeHolderText="Data"
                placeHolderTextStyle={{ color: '#999' }}
                onDateChange={(date) => {
                  this.setState({ prazoEntrega: date });
                }}
                disabled={false}
              />
            </View>

            <View
              style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto' }}
            >
              <Text style={styles.text}>Observações</Text>
              <TextInput
                style={{
                  borderRadius: 5,
                  backgroundColor: '#EFF0F0',
                }}
                multiline
                numberOfLines={5}
                placeholderTextColor="#999"
                value={this.state.observacoes}
                onChangeText={text => this.setState({ observacoes: text })}
                returnKeyType="send"
                onSubmitEditing={this.handleTweet}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonAdicionar}
              onPress={() => this.cadastrarPedido()}
            >
              <Text style={styles.textButton}>Adicionar roupa</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    );
  }
}

export default AddRoupa;
