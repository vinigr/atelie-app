import React, { Component } from 'react'
import { Text, View, ActivityIndicator, SectionList, Button, ScrollView, StyleSheet } from 'react-native'
import api from '../../services/api';

export default class ListaAjusteEmpresa extends Component {
    
    state = {
        errorMessage: null,
        loading: true,
        listaRoupas: [],
    }
    
    componentDidMount(){
        this.buscaLista();
    }

    buscaLista = async() => {
        try{
           const res = await api.get('/preco/listaPJ');
           this.setState({ listaRoupas: res.data, loading: false });
        } catch(err){
            this.setState({ errorMessage: err.data.error });
        }
    }

    render() {
        const { loading, listaRoupas } = this.state;
        return (   
            <ScrollView>
                {this.state.errorMessage && <Text style={{ color: 'red'}}>{this.state.errorMessage}</Text>}             
                { loading ? <ActivityIndicator /> : 
                    <SectionList 
                    renderItem={({item, index, section}) => (
                        <View style={styles.viewAjustes} key={index}>
                            <Text style={styles.textAjustes}>{item.nometipoajuste}</Text>
                            <Text style={styles.textAjustes}>{item.preco}</Text>
                        </View>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={styles.viewTitle}>
                            <Text style={styles.title}>{title}</Text>
                        </View> 
                    )}
                    sections={listaRoupas}
                    keyExtractor={(item, index) => item + index}
                    />
                }               
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    viewTitle: {
        backgroundColor: '#11AFE6',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        paddingLeft: 5,
        marginBottom: 10
    },
    title: {
        fontFamily: 'OpenSans-Semibold',
        textTransform: 'uppercase',
        fontSize: 18
    },
    viewAjustes: {
        width: '97%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    textAjustes: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 15
    }
});

