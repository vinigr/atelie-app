import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, View, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { StyledView, TextTitulo, TextPrazo } from '../../styles/styled';

import styles from './styles';

class HomeScreen extends Component {

    render() {
        const { data } = this.props.state;
        // console.log(data);
      return (
        <View>
          <FlatList
          data={data.filter(roupa => roupa.estado === 'PENDENTE')}
          keyExtractor={item => item.id}
          // extraData={this.props.state}
          renderItem={({ item }) => {
            // console.log(item)
            return (
              // <Text>{item.name}</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Details',{
                item})}>
                <View style={styles.roupaTouchable}>
                  <View style={{ flex: 1 }}>
                      <TextTitulo>{item.name}</TextTitulo>
                      <Text style={{ color: '#686868' }}>Ajustes pendentes</Text>
                      <FlatList
                        data={item.ajustes.filter(ajuste => ajuste.concluido === false)}
                        keyExtractor={item => item.id}
                        // extraData={data}
                        renderItem={({ item }) => {
                          return(
                            <Text>{item.name}</Text>
                          )}}
                      />
                      {/* 
                      {item.ajustes ? 
                        <Text>{item.ajustes.name}</Text>
                          :<Text>Nenhum ajuste necessário</Text>} */}
                      
                      
                  </View>               
                  <View style={{ flex: 1, marginBottom: 'auto', alignItems: 'flex-end'}}>
                      <TextPrazo>Prazo</TextPrazo>
                      {item.prazo === '15/04/19' ? <Text style={{ color: 'red' }}>{item.prazo}</Text> : <Text>{item.prazo}</Text> }
          
                      
                  </View>  
                </View>
              </TouchableOpacity>
              

            );
          }}
        />
        {/* <Button onPress={() => console.log(this.props.state.data.length)} title="Ver">ver</Button> */}
        </View>
      );
    }
}

const mapStateToProps = state => {
  return {
    state: state.roupas
  }
};




export default connect(mapStateToProps)(HomeScreen);
