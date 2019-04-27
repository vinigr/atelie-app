import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class PedidoRoupas extends Component {
  componentDidMount(){
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    if(itemId !== 'NO-ID') {
      this.props.navigation.navigate('AddRoupa')
    }

  }
  
  render() {
    
    return (
      <View style={{ flex: 1 }}>
      {/* <Text>{itemId}</Text> */}
        <Text> Conteudo Pedido </Text>
        {/* <View> */}
          <TouchableOpacity style={styles.button}>
          <Icon name='plus' style={styles.mais}/>
          </TouchableOpacity>
          
        {/* </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
      justifyContent: 'center',
      alignItems: 'center',
      position:'absolute',
      right: 25, bottom: 25,
      height: 60,
      width: 60,
      borderRadius: 50,
      backgroundColor: '#3a8fdc'
  },
  mais: {
    fontWeight: "bold",
    fontSize: 30,
    color: '#fff',
  }
})