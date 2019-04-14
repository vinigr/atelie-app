import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { StyledEntregas, TextTitulo, TextPrazo } from '../styles/styled';

class EntregasPendentes extends Component {
 
    render() {
        const { data } = this.props;
        console.log(data);
      return (
        <View>
          <FlatList
          data={data.filter(roupa => roupa.estado === 'CONCLUÍDO' && roupa.entrega === false)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {                        
            return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Details',{
                item})}>
                <StyledEntregas>
                  <View style={{ flex: 1 }}>
                      <TextTitulo>{item.name}</TextTitulo>
                      <Text>{item.cliente}</Text>
 
                  </View>               
                  <View style={{ flex: 1, marginBottom: 'auto', alignItems: 'flex-end'}}>
                      <TextPrazo>Prazo</TextPrazo>
                      {item.prazo === '15/04/19' ? <Text style={{ color: 'red' }}>{item.prazo}</Text> : <Text>{item.prazo}</Text> }
          
                      
                  </View>  
                </StyledEntregas>
              </TouchableOpacity>
              

            );
          }}
        />
        </View>
      );
    }
}

const mapStateToProps = state => ({
  data: state.roupas.data
});


export default connect(mapStateToProps)(EntregasPendentes);