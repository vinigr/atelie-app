import React from 'react';

import { Image } from 'react-native';
import {
  Container, Content, Header, Body,
} from 'native-base';

import {
  createAppContainer,
  DrawerItems,
  createDrawerNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HamburgerIcon from '../components/HamburgerIcon';
import styles from './styles';

import HomeScreen from '../screens/Home';
import DetalhesRoupa from '../screens/DetalhesRoupa';
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
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Roupas',
      headerTitleStyle: {
        alignSelf: 'center',
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
    }),
  },
  Detalhes: {
    screen: DetalhesRoupa,
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
    }),
  },
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
        marginBottom: 5,
      },
      headerTintColor: '#fff',
    }),
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
    }),
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
    }),
  },
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
    }),
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
    }),
  },
  Detalhes: {
    screen: DetalhesRoupa,
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
    }),
  },
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
    }),
  },
});

const Ajustes = createMaterialTopTabNavigator(
  {
    Cliente: {
      screen: ListaAjusteCliente,
    },
    Empresa: {
      screen: ListaAjusteEmpresa,
    },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#fff',
      pressColor: '#0B5EA7',
      inactiveTintColor: '#CACACA',
      style: {
        backgroundColor: '#2699FB',
      },
      labelStyle: {
        fontSize: 16,
        fontWeight: '200',
      },
      headerTintColor: '#fff',
    },
  },
);

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
    }),
  },
});

const CustomDrawerContentComponent = props => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image style={styles.drawerImage} source={require('../img/logo.png')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    Início: {
      screen: TelaInicial,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ focused }) => (
          <Icon name="home" size={24} color={focused ? '#2699FB' : 'black'} />
        ),
      }),
    },
    Pedidos: {
      screen: PedidosLista,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ focused }) => (
          <Icon
            name="package-variant-closed"
            size={24}
            color={focused ? '#2699FB' : 'black'}
          />
        ),
      }),
    },
    'Cadastro de pedidos': {
      screen: CadastroPedidos,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ focused }) => (
          <Icon
            name="book-multiple-plus"
            size={24}
            color={focused ? '#2699FB' : 'black'}
          />
        ),
      }),
    },
    'Cadastro de clientes': {
      screen: CadastroClientes,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ focused }) => (
          <Icon
            name="account-plus"
            size={24}
            color={focused ? '#2699FB' : 'black'}
          />
        ),
      }),
    },
    'Ajustes de roupas': {
      screen: ListaAjustes,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ focused }) => (
          <Icon name="hanger" size={24} color={focused ? '#2699FB' : 'black'} />
        ),
      }),
    },
    'Entregas Pendentes': {
      screen: Entregas,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ focused }) => (
          <Icon
            name="calendar-clock"
            size={24}
            color={focused ? '#2699FB' : 'black'}
          />
        ),
      }),
    },
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      labelStyle: {
        fontSize: 16,
      },
    },
  },
);

export default createAppContainer(MyDrawerNavigator);
