import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DatePicker } from 'native-base';

import api from '../../services/api';

class AddRoupa extends Component {
    constructor(props){
      super(props);
      
      this.state = {
        loading: true,
        isActive: null,
        isActiveAjuste: [],
        roupas: [],
        ajustes: [],
        prazoEntrega: null,
        observacoes: '',
      }
      this._onShowUnderlay = this._onShowUnderlay.bind(this);
    }

    componentDidMount(){
      this.buscaBanco();
    }

    buscaBanco = async() => {
      try{
        const res = await api.get('tipoRoupa/listagem')
        this.setState({ roupas: res.data, loading: false })
      } catch(err){
        this.setState({ erro: err.data.error , loading: false })
      }      
    }

    buscaAjustes = async id => {
      try{
        const res = await api.get(`preco/listagemRoupa/${id}`)
        this.setState({ ajustes: res.data })
      } catch(err){
        this.setState({ erro: err.data.error , loading: false })
      }
      console.tron.log(this.state.ajustes)
    }

    _onShowUnderlay(id) {
      this.setState({ isActive: id, isActiveAjuste: [] })
      this.buscaAjustes(id);
    }

    _onShowAjusteUnderlay = id => {
      const ajuste = this.state.isActiveAjuste.filter(ajuste => ajuste === id);
      if(ajuste.length !== 0) {
        this.setState(state => {
          const isActiveAjuste = state.isActiveAjuste.filter(j => id !== j);
          return {
            isActiveAjuste,
          };
        });
        return
      }

      this.setState({ isActiveAjuste: [...this.state.isActiveAjuste, id] });
    } 

    renderRoupas = (roupa) => (
      <TouchableOpacity  
        onPress={() => this._onShowUnderlay(roupa.idtiporoupa)}
        style={this.state.isActive === roupa.idtiporoupa ? styles.buttonPress : styles.button}
        key={`${roupa.nomeroupa}-${roupa.idtiporoupa}`}
      >
        <Text style={styles.textRoupas}>{roupa.nomeroupa}</Text>
      </TouchableOpacity>
    )

    renderAjustes = (ajuste) => (
      <TouchableOpacity  
        onPress={() => this._onShowAjusteUnderlay(ajuste.idtipoajuste)}
        style={this.state.isActiveAjuste.filter(a => a === ajuste.idtipoajuste)[0] === ajuste.idtipoajuste ? styles.buttonAjustePress : styles.buttonAjuste }
        key={`${ajuste.nometipoajuste}-${ajuste.idtipoajuste}`}
      >
        <Text style={styles.text}>{ajuste.nometipoajuste}</Text>
      </TouchableOpacity>
    )

    cadastrarPedido = () => {
      console.tron.log(this.state);
    }

    render() { 
      return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          { this.state.loading ? <ActivityIndicator /> : 
          <>
            <View style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto', marginBottom: 10 }}>
              <Text style={styles.text}>Roupa</Text>
              <ScrollView horizontal
                          showsHorizontalScrollIndicator={false}
              >
                {this.state.roupas.map(this.renderRoupas)}
              </ScrollView>
            </View>
            {
              this.state.ajustes.length !== 0 ? 
                <View style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto' }}>
                    <Text style={styles.text}>Ajustes</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto' }}>
                      {this.state.ajustes.map(this.renderAjustes)} 
                    </View>              
                </View>
              : null 
            }
            <View style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto', marginBottom: 5 }}>
              <Text style={styles.text}>Prazo de entrega</Text>
              <DatePicker
                minimumDate={new Date(2019, 1, 5)}
                // maximumDate={new Date(2018, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                style={{ 
                  borderRadius: 5,
                  backgroundColor: '#EFF0F0'
                }}
                animationType={"fade"}
                androidMode={"default"}
                textStyle={{ color: "#000" }}
                placeHolderText="Data"
                placeHolderTextStyle={{ color: "#999" }}
                onDateChange={date => {
                    this.setState({ prazoEntrega: date })}                  
                }
                disabled={false}             
              />
            </View>

            <View style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto' }}>
              <Text style={styles.text}>Observações</Text>
              <TextInput
                style={{ 
                  borderRadius: 5,
                  backgroundColor: '#EFF0F0'
                }}
                multiline
                numberOfLines={5}
                placeholderTextColor='#999'
                value={this.state.observacoes}
                onChangeText={text => this.setState({ observacoes: text })}
                returnKeyType='send'
                onSubmitEditing={this.handleTweet}
              />
            </View>
            
            <TouchableOpacity style={styles.buttonAdicionar} onPress={() => this.cadastrarPedido()}>
                <Text style={styles.textButton}>Adicionar roupa</Text>
            </TouchableOpacity>
          </>
        }
        </View>   
      );
    }
}

export default AddRoupa;


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F9F9F9',
    marginRight: 10,
    borderRadius: 3,
    padding: 8,
    justifyContent: 'space-between',
  },
  buttonPress: {
    backgroundColor: '#239FC5',
    color: '#fff',
    marginRight: 10,
    borderRadius: 3,
    padding: 8,
    justifyContent: 'space-between',
  },
  buttonAjuste: {
    backgroundColor: '#F9F9F9',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 5,
    borderRadius: 3,
    padding: 8,
    width: '47.5%',
    alignItems: 'center'
  },
  buttonAjustePress: {
    backgroundColor: '#239FC5',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 5,
    borderRadius: 3,
    padding: 8,
    width: '47.5%',
    alignItems: 'center'
  },
  activeTitle: {
    color: 'red',
  },
  buttonAdicionar: {
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
  text: {
    fontFamily: 'OpenSans-Regular',
    color: '#000'
  },
  textRoupas: {
    fontFamily: 'OpenSans-Regular',
  },
  textButton:{
    color: '#fff',
    fontSize: 18,
    fontFamily: 'OpenSans-Semibold',
  },  
  buttonFixed: {
    color: '#fff', 
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center', 
    height: 100, 
    marginLeft: 'auto', 
    marginRight: 'auto',
  }
});