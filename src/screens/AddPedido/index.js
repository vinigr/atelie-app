import React, { Component, } from 'react'
import { Text, TextInput, ScrollView, View, TouchableOpacity, Picker, StyleSheet, DatePickerAndroid, ActivityIndicator } from 'react-native'

import { DatePicker } from 'native-base';
import AutoComplete  from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

export default class AddPedido extends Component {
    state = {
        cliente: '',
        datarecebimento: '',
        clientes: [],
        loading: true,
        empresas: [],
        erro: ''
    }
    
    componentDidMount(){
        this.buscaBanco();
    }

    buscaBanco = async() => {
        try{
            const res = await api.get('/cliente/listagem');
            const resp = await api.get('/loja/listagem');
            this.setState({ clientes: res.data, empresas: resp.data, loading: false })
        } catch(err) {
            this.setState({ erro: err.data.error , loading: false })
        }
    } 


    render() {  
        const View1 = (
            <View>
                <View>
                    <Text>Cliente</Text>
                    {/* { console.tron.log('Olá', this.state.clientes.nomecliente)} */}
                    <AutoComplete 
                        data={this.state.clientes.nomecliente}
                    />
                </View>
            <View>
            <Text>Empresa</Text>
            <Picker>
                { this.state.empresas.map(empresa => ( 
                    <Picker.Item key={empresa.idloja} label={empresa.nomeloja} value={empresa.nomeloja} />
                ))}
            </Picker>
            </View>
            <View>
                <Text>Data de entrada</Text>
                <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2018, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    textStyle={{ color: "#000" }}
                    placeHolderTextStyle={{ color: "#000" }}
                    onDateChange={date => this.setState({ datarecebimento: date })}
                    disabled={false}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('PedidoRoupas', {
              itemId: Math.random,
              otherParam: 'anything you want here',
            })}>
                <Text style={styles.text}>Cadastrar roupas</Text>
                <Icon name='chevron-right' size={30} color="#fff" />
            </TouchableOpacity>
            </View>
        )
         
        return (
            <ScrollView style={styles.container}>
                {this.state.erro !== '' && <Text>{this.state.erro}</Text>}
                {this.state.loading ? <ActivityIndicator /> : View1}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '97%',
        flex: 1,
        // justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    text:{
        color: '#fff',
        fontSize: 18
    },
    input: {
        borderColor: '#3a8fdc',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        height: 40,
        marginBottom: 10
    },
    picker: {

    },
    button: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 5,
        width: '70%', 
        backgroundColor: '#3a8fdc',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row'
    }
})