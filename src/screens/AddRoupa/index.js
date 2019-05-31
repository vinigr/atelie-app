import React, { Component } from 'react';
import { Text, View, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import api from '../../services/api';

class AddRoupa extends Component {
    constructor(props){
      super(props);
      
      this.state = {
        loading: true,
        isActive: null,
        roupas: []
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
        <Text>{roupa.nome}</Text>
      </TouchableOpacity>
    )

    // state = {
    //     id: '4', name: "gfdgdf", ajustes: [
    //       {id: "", name: "", concluido: null},
    //     ], prazo: "", estado: 'PENDENTE', cliente: '', entrega: null
    // }

    // componentDidMount= () => {
    //   const { navigation } = this.props;
    //   const item = navigation.getParam('item');
    //   this.setState(item);
    // }

    render() {   
      const { addRoupa } = this.props;
      // console.log(this.state.roupas.isActive)
      // console.log(this.state.roupas)
      return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          { this.state.loading ? ActivityIndicator : 
          <>
            <View style={{ 
                flex: 1, 
                flexDirection: 'column', 
                // alignItems: 'center', 
                backgroundColor: '#fFF', 
                maxHeight: 40,
                minHeight: 40,
                width: '97%', 
                marginRight: 'auto', 
                marginLeft: 'auto',
                marginBottom: 30,
                
                }}>
              <Text style={{ color: '#000', }}>CLIENTE</Text>
              <TextInput 
                // value={this.state.roupaTipo.name}
              value={this.props.name}
                style={{ 
                    borderColor: '#3a8fdc',
                    borderStyle: 'solid',
                    borderWidth: 2,
                    borderRadius: 5,
                    width: '100%',
                }} />
            
                
            </View>

            <View style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto' }}>
              <Text style={{ color: '#000', }}>ROUPA</Text>
              <ScrollView horizontal
                          showsHorizontalScrollIndicator={false}
              >
                {this.state.roupas.map(this.renderMenusItems)}
              </ScrollView>
            </View>
            
            <View style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto' }}>
              <Text style={{ color: '#000', }}>OBSERVAÇÕES</Text>
              <TextInput
                style={{ 
                  borderColor: 'green',
                  borderStyle: 'solid',
                  borderWidth: 2,
                  borderRadius: 5,
                  
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
            
            <TouchableOpacity 
              style={styles.footer}
                onPress={() => addRoupa(this.state)}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>ADICIONAR</Text>  
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
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    left: 0, right: 0, bottom: 0,
    height: 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%', 
    backgroundColor: '#3a8fdc'
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