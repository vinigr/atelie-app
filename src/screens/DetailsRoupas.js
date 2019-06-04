import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  CheckBox,
} from 'react-native';
import { DetailsTitulo, AjustesRoupaView } from '../styles/styled';

class DetailsScreen extends Component {
  // static navigationOptions =
  // {
  //     title: 'DETALHES DO PEDIDO',
  // };

  state = {
    id: '',
    name: '',
    ajustes: [{ id: '', name: '', concluido: null }],
    prazo: '',
    estado: '',
    cliente: '',
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    console.log(item);
    this.setState(item);
  };

  render() {
    // const item = navigation.getParam('item');

    // const nameRoupa = navigation.getParam('nameRoupa', 'some default value');

    return (
      <View style={{ flex: 1, backgroundColor: '#E6F4FF' }}>
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
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   data: state.roupas.data
// });

export default connect(null)(DetailsScreen);
