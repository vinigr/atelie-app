import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Pedidos extends Component {
  render() {
    return (
      <View>
        <Text onPress={() => this.props.navigation.push('PedidoRoupas')}> Pedido </Text>
      </View>
    )
  }
}


