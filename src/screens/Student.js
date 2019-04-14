import React, { Component } from 'react';

import { Text, View, Button, TouchableOpacity, Image } from 'react-native';

import styles from '../styles/styles';

class StudentScreen extends Component {

    static navigationOptions =
      {
        title: 'Student',
  
      };
  
    gotoNextActivity = () => {
      this.props.navigation.navigate('Forth');
  
    }
  
    render() {
  
      return (
  
        <View style={styles.MainContainer}>
  
          <Text style={styles.text}>This is Student Screen Activity.</Text>
  
          <Button onPress={this.gotoNextActivity} title='Open Details Activity' />
  
        </View>
      );
    }
}

export default StudentScreen;