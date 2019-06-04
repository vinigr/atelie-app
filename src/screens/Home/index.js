import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { StyledView, TextTitulo, TextPrazo } from '../../styles/styled';

import styles from './styles';

class HomeScreen extends Component {
  render() {
    const { data } = this.props.state;
    return (
      <View>
        <FlatList
          data={data.filter(roupa => roupa.estado === 'PENDENTE')}
          keyExtractor={item => item.id}
          // extraData={this.props.state}
          renderItem={({ item }) => (
            // console.log(item)
            // <Text>{item.name}</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Details', { item })
              }
            >
              <View style={styles.roupaTouchable}>
                <View style={{ flex: 1 }}>
                  <TextTitulo>{item.name}</TextTitulo>
                  <Text style={{ color: '#686868' }}>Ajustes pendentes</Text>
                  <FlatList
                    data={item.ajustes.filter(
                      ajuste => ajuste.concluido === false,
                    )}
                    keyExtractor={item => item.id}
                    // extraData={data}
                    renderItem={({ item }) => <Text>{item.name}</Text>}
                  />
                  {/*
                      {item.ajustes ?
                        <Text>{item.ajustes.name}</Text>
                          :<Text>Nenhum ajuste necessário</Text>} */}
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
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state: state.roupas,
});

export default connect(mapStateToProps)(HomeScreen);
