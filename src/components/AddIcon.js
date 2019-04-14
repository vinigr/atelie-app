import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

export default class AddIcon extends Component {
    render() {
      return (
  
        <View style={{ flexDirection: 'row' }}>
  
          <TouchableOpacity onPress={() => this.props.navigationProps.navigate('AdicionarRoupa')}>
  
            <Image
              source={{uri: 'https://image.flaticon.com/icons/png/512/14/14866.png'}}
              style={{ width: 25, height: 25, marginRight:8, tintColor: '#2699FB' }}
            />
  
          </TouchableOpacity>
  
        </View>
  
      );
  
  
    }
  }