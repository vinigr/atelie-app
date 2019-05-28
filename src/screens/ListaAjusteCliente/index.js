import React, { Component } from 'react'
import { Text, View, ActivityIndicator, SectionList, Button, ScrollView } from 'react-native'
import api from '../../services/api';

export default class ListaAjusteEmpresa extends Component {
    
    state = {
        errorMessage: '',
        loading: true,
        listaRoupas: [],
        listaAjustes: []
    }
    
    componentDidMount(){
        this.buscaLista();
    }

    buscaLista = async() => {
        try{
           const res = await api.get('/tipoRoupa/listagem');
           const resp = await api.get('/preco/listagemPF');
           this.setState({ listaRoupas: res.data, listaAjustes: resp.data, loading: false });
        } catch(err){
            this.setState({ errorMessage: err.data.error });
        }
   
    }

    render() {
        const { loading ,listaRoupas } = this.state;
        return (   
            <ScrollView>
                {!this.state.errorMessage && <Text style={{ color: '#fff'}}>{this.state.errorMessage}</Text>}
                {/* {console.tron.log(this.state)} */}
                
                { loading ? <ActivityIndicator /> : 
                    <SectionList 
                    renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
                    renderSectionHeader={({section: {title}}) => (
                      <Text style={{fontWeight: 'bold'}}>{title}</Text>
                    )}
                    sections={[
                      {title: 'Title1', data: ['item1', 'item2']},
                      {title: 'Title2', data: ['item3', 'item4']},
                      {title: 'Title3', data: ['item5', 'item6']},
                    ]}
                    keyExtractor={(item, index) => item + index}
                    />
                }

               
                
                
                
            </ScrollView>
        )
    }
}


// { this.state.listaAjustes.map(roupa => (
//     <View key={roupa.id} style={{ marginTop: 15, backgroundColor: 'green' }}>
//         {/* <Text style={{ fontWeight: 'bold' }}>{project.title}</Text> */}
//         <Text>{roupa.nometipoajuste}</Text>
//         <Text>{roupa.preco}</Text>
//     </View>
// ))}