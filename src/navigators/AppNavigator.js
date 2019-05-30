import React, { Component } from 'react';

import { Text, View } from 'react-native';

import { createAppContainer, DrawerItems, createDrawerNavigator, createStackNavigator, createMaterialTopTabNavigator } from "react-navigation";

// import AddIcon from '../components/AddIcon';
import HamburgerIcon from '../components/HamburgerIcon';

import Home_Screen from '../screens/Home/';
import DetailsScreen from '../screens/DetailsRoupas';
import EntregasPendentesScreen from '../screens/EntregasPendentes';
import AddRoupaScreen from '../screens/AddRoupa';
import CadastroClientesScreen from '../screens/CadastroClientes';
import AddPedido from '../screens/AddPedido';
import PedidosScreen from '../screens/Pedidos';
import PedidoRoupasScreen from '../screens/PedidoRoupas';
import ListaAjusteCliente from '../screens/ListaAjusteCliente';
import ListaAjusteEmpresa from '../screens/ListaAjusteEmpresa';

const TelaInicial = createStackNavigator({
  Home: {
    screen: Home_Screen,
    navigationOptions: ({ navigation }) => ({
      title: 'Roupas',
      headerTitleStyle: {
        alignSelf: 'center' ,
        textAlign: 'center',
        flex: 1,
    },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#2699FB',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        color: '#000',
        // marginLeft: 'auto',
        // marginRight: 'auto',
        marginBottom: 5,
      },
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
    headerTintColor: '#fff',
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
        backgroundColor: '#2699FB',
        elevation: 0,
        shadowOpacity: 0,
        marginBottom: 5
      },
      headerTintColor: '#fff',
    })
  },
  PedidoRoupas: {
    screen: PedidoRoupasScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#2699FB',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#fff',
    })  
  },
  
  AddRoupa: {
    screen: AddRoupaScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Roupa',
      // headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#2699FB',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#fff',
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
        backgroundColor: '#2699FB',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#fff',
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
        backgroundColor: '#2699FB',
        elevation: 0, 
        shadowOpacity: 0, 
      },
      headerTintColor: '#fff',
    })
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Detalhes da roupa',
    headerStyle: {
      backgroundColor: '#E6F4FF',
      elevation: 0,
      shadowOpacity: 0,
      color: '#fff',
      // paddingTop: 5
    },
    headerTintColor: '#fff',
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
        backgroundColor: '#2699FB',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
    })
  },
});

const Ajustes = createMaterialTopTabNavigator({
  Cliente: {
    screen: ListaAjusteCliente,
  },
  Empresa: {
    screen: ListaAjusteEmpresa,
  }
}, {
    tabBarPosition: 'top',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#fff',
      pressColor: '#0B5EA7',
      inactiveTintColor: '#CACACA',
      style: {
        backgroundColor: '#2699FB'
      },
      labelStyle: {
        fontSize: 16,
        fontWeight: '200'
      },
      headerTintColor: '#fff',
    }
});

const ListaAjustes = createStackNavigator({
  First: {
    screen: Ajustes,
    navigationOptions: ({ navigation }) => ({
      title: 'Ajustes',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#2699FB',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
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
    screen: ListaAjustes, 
  },
  'Entregas Pendentes': {
    screen: Entregas,
  },
  'Configurações': {
    screen: CadastroPedidos,
  },  
}
);

export default createAppContainer(MyDrawerNavigator);

