import React, { Component, } from 'react'
import { Text, TextInput, ScrollView, View, TouchableOpacity, Picker, StyleSheet, DatePickerAndroid, ActivityIndicator } from 'react-native'

import { DatePicker } from 'native-base';
import AutoComplete  from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

export default class AddPedido extends Component {
    state = {
        datarecebimento: '',
        idloja: null,
        idcliente: null,
        clientes: [],
        loading: true,
        empresas: [],
        erro: '',
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

    cadastrarPedido = async() => {
        const { idcliente , idloja, datarecebimento } = this.state;
        if(!idcliente, !idloja, !datarecebimento) return


        this.setState({ loading: true })

        
        try{
            await api.post('/pedido/cadastrar', {
                idcliente,
                idloja,
                datarecebimento
            }).then(res => {
                this.setState({ loading: false })
                this.props.navigation.navigate('PedidoRoupas', { itemId: res.data[0].idpedido })
            });
            
            
        } catch(err) {
            this.setState({ erro: err.data.error , loading: false })
            console.log('err' + err)
        }

    }

    
    // renderListCliente = () => {
    //     clientes.filter(cliente => {
    //         return cliente.nomecliente.
    //     })
    // }

    render() {  
        const View1 = (
            <View>
                <View>
                    <Text>Cliente</Text>
                    {/* { console.tron.log('Olá', this.state.clientes.nomecliente)} */}
                    <Picker
                        selectedValue={this.state.idcliente}
                        onValueChange={itemValue => {
                            console.tron.log(this.state.idcliente)
                            this.setState({idcliente: itemValue})
                        }
                            
                        }
                    >
                        { this.state.clientes.map(cliente => ( 
                            <Picker.Item key={cliente.idcliente} label={cliente.nomecliente} value={cliente.idcliente} />
                        ))}
                    </Picker>
                    
                </View>
            <View>
            <Text>Empresa</Text>
            <Picker
                selectedValue={this.state.idloja}
                onValueChange={itemValue => {
                    this.setState({ idloja: itemValue })
                }
                    
                }
            >
                { this.state.empresas.map(empresa => ( 
                    <Picker.Item key={empresa.idloja} label={empresa.nomeloja} value={empresa.idloja} />
                ))}
            </Picker>
            </View>
            <View>
                <Text>Data de entrada</Text>
                <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date(2019, 1, 1)}
                    // maximumDate={new Date(2018, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    textStyle={{ color: "#000" }}
                    placeHolderTextStyle={{ color: "#000" }}
                    onDateChange={date => {
                        this.setState({ datarecebimento: date })}          
                    }
                    disabled={false} 
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.cadastrarPedido()}>
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
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 18,
        zIndex: 1
      }
})

{/* <View style={styles.autocompleteContainer}>
                        <AutoComplete 
                        data={clientes.nomecliente}
                        defaultValue={query}
                        onChangeText={text => this.setState({ query: text })}
                        renderItem={({ item, i }) => (
                          <TouchableOpacity onPress={() => this.setState({ query: item })}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}/>
                    </View> */}