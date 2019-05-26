import React, { Component } from 'react'
import { Text, View } from 'react-native'
import api from '../../services/api';

export default class ListaAjusteEmpresa extends Component {
    
    state = {
        listaAjustes: []
    }
    
    componentDidMount(){

    }

    async buscaLista(){
        
    }

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
