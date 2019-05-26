import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class HamburgerIcon extends Component {
    toggleDrawer = () => { 
      this.props.navigationProps.toggleDrawer();
    }
  
    render() {
      return (    
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
            <Icon 
                name='menu-open'
                size={30}
                style={{ marginLeft: 8, color: '#fff' }}
            />
          </TouchableOpacity>
        </View> 
      );  
    }
  }

export default HamburgerIcon;