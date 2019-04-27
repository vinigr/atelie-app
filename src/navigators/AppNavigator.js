import React, { Component } from 'react';

import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

import { createAppContainer, DrawerItems, createDrawerNavigator, createStackNavigator } from "react-navigation";

import AddIcon from '../components/AddIcon';

import Home_Screen from '../screens/Home/';
import DetailsScreen from '../screens/DetailsRoupas';
import EntregasPendentesScreen from '../screens/EntregasPendentes';
import AddRoupaScreen from '../screens/AddRoupa';
import CadastroClientesScreen from '../screens/CadastroClientes';
import AddPedido from '../screens/AddPedido';
import PedidosScreen from '../screens/Pedidos';
import PedidoRoupasScreen from '../screens/PedidoRoupas';

class HamburgerIcon extends Component {

  toggleDrawer = () => {

    this.props.navigationProps.toggleDrawer();

  }

  render() {

    return (
      
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >

          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
            style={{ width: 25, height: 25, marginLeft: 8, tintColor: '#2699FB' }}
          />

        </TouchableOpacity>

      </View>

    );


  }
}


class Settings_Screen extends Component {

  static navigationOptions =
    {
      title: 'Settings',
    };

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Settings Screen Activity.</Text>

      </View>
    );
  }
}


const TelaInicial = createStackNavigator({
  Home: {
    screen: Home_Screen,
    navigationOptions: ({ navigation }) => ({
      title: 'Roupas',
      headerTitleStyle: {
        alignSelf: 'center' ,
        textAlign: 'center',
        flex: 1,
        // marginRight: 70
    },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      // headerRight: <AddIcon navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        color: '#000',
        borderRadius: 10,
        marginTop: 5,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        marginBottom: 5,
        width: '97%',
        
        // paddingTop: 5
      },
      // headerTintColor: '#2699FB',
    })
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Detalhes da roupa',
    headerStyle: {
      backgroundColor: '#E6F4FF',
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
      color: '#000',
      // paddingTop: 5
    },
    headerTintColor: '#2699FB',
  })
  } 
});

const PedidosLista = createStackNavigator({
  First: {
    screen: PedidosScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Pedidos',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#2699FB',
    })
  },
  PedidoRoupas: {
    screen: PedidoRoupasScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Pedido #2025',
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#2699FB',
    })
  },
  
  AddRoupa: {
    screen: AddRoupaScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Roupa',
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#2699FB',
    })
  }
});

const CadastroPedidos = createStackNavigator({
  AdicionarPedido: {
    screen: AddPedido,
    navigationOptions: ({ navigation }) => ({
      title: 'Cadastro de pedido',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#2699FB',
    })
  },
});

const Entregas = createStackNavigator({
  Entregas: {
    screen: EntregasPendentesScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Entregas Pendentes',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#2699FB',
    })
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Detalhes da roupa',
    headerStyle: {
      backgroundColor: '#E6F4FF',
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
      color: '#000',
      // paddingTop: 5
    },
    headerTintColor: '#2699FB',
  })
  }
});

const CadastroClientes = createStackNavigator({
  First: {
    screen: CadastroClientesScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Cadastro de clientes',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#2699FB',
    })
  },
});



const MyDrawerNavigator = createDrawerNavigator({
  'Início': {
    screen: TelaInicial,
  },
  'Pedidos': {
    screen: PedidosLista
  },
  'Cadastro de pedidos': {
    screen: CadastroPedidos,
  },
  'Cadastro de clientes': {
    screen: CadastroClientes,
  },
  'Ajustes de roupas': {
    screen: CadastroPedidos,
  },
  'Entregas Pendentes': {
    screen: Entregas,
  },
  'Configurações': {
    screen: CadastroPedidos,
  },  
}, {
  // contentComponent:{
  //     backgroundColor: 'red',
      
  // } 
}

);

export default createAppContainer(MyDrawerNavigator);

