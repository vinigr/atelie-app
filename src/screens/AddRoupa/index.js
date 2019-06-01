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
        roupas: [],
        prazoEntrega: null,
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

    _onShowUnderlay(id) {
      this.setState({ isActive: id, })

    }

    renderMenusItems = (roupa) => (
      <TouchableOpacity  
        onPress={() => this._onShowUnderlay(roupa.idtiporoupa)}
        // underlayColor = {'#F9F9F9'}
        style={this.state.isActive === roupa.idtiporoupa ? styles.buttonPress : styles.button}
        key={`${roupa.nomeroupa}-${roupa.idtiporoupa}`}>
        {/* <Icon height={40} width={40} source={source} /> */}
        <Text style={styles.textRoupas}>{roupa.nomeroupa}</Text>
      </TouchableOpacity>
    )

    render() { 
      return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          { this.state.loading ? <ActivityIndicator /> : 
          <>
            <View style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto' }}>
              <Text style={styles.text}>Roupa</Text>
              <ScrollView horizontal
                          showsHorizontalScrollIndicator={false}
              >
                {this.state.roupas.map(this.renderMenusItems)}
              </ScrollView>
            </View>
            
            <View style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto' }}>
              <Text style={styles.text}>Prazo de entrega</Text>
              <DatePicker
                      minimumDate={new Date(2019, 1, 5)}
                      // maximumDate={new Date(2018, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      textStyle={{ color: "#000" }}
                      placeHolderText="Data"
                      // placeHolderTextStyle={{ color: "#000" }}
                      onDateChange={date => {
                          this.setState({ prazoEntrega: date })}                  
                      }
                      disabled={false}             
                  />
            </View>

            <View style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto', marginTop: 10 }}>
              <Text style={styles.text}>Observações</Text>
              <TextInput
                style={{ 
                  borderRadius: 5,
                  backgroundColor: '#EFF0F0'
                }}
                multiline
                numberOfLines={5}
                placeholderTextColor='#999'
                value={this.state.newTweet}
                onChangeText={this.handleInputChange}
                returnKeyType='send'
                onSubmitEditing={this.handleTweet}
              />
            </View>
            
            <TouchableOpacity style={styles.buttonAdicionar} onPress={() => this.cadastrarPedido()}>
                <Text style={styles.textButton}>Cadastrar roupas</Text>
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
    // color: '#999'
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
    // fontSize: 25,
    height: 100, 
    marginLeft: 'auto', 
    marginRight: 'auto',
    
    // padding: 0,
  }
});