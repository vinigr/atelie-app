import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as RoupasActions from '../store/actions/';

import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { DetailsTitulo } from '../styles/styled';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


class AddRoupa extends Component {
    static navigationOptions =
    {
        title: 'Adicionar roupa',
    };
    
    constructor(props){
      super(props);
      
      this.state = {
        roupas: [
          { id: 1, nome: 'Calça Social', isActive: false},
          { id: 2, nome: 'Calça Jeans', isActive: false},
          { id: 3, nome: 'Calça Jeans', isActive: false},
          { id: 4, nome: 'Camisa Social', isActive: false},
          { id: 5, nome: 'Paletó', isActive: false},
        ]
      }
    }
    _onShowUnderlay() {
      this.setState({ pressStatus: !this.state.pressStatus });
    }

    renderMenusItems = (roupa) => (
      <TouchableOpacity  
        onPress={this._onShowUnderlay.bind(this)}
        // underlayColor = {'#F9F9F9'}
        style={{
          backgroundColor: '#F9F9F9',
          color: '#fff',
          marginRight: 10,
          borderRadius: 3,
          padding: 8,
          justifyContent: 'space-between'
        }}
        key={`${roupa.nome}-${roupa.id}`}>
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
      const options =["Home","Savings","Car","GirlFriend"];
      
      const { addRoupa } = this.props;
     
      return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
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
                style={{ 
                    borderColor: '#3a8fdc',
                    borderStyle: 'solid',
                    borderWidth: 2,
                    borderRadius: 5,
                    width: '100%',
                }}></TextInput>
              {/* <Picker
                selectedValue={this.state.language}
                style={{height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({language: itemValue})
                }>
                {options.map((item, index) => {
                  return (< Picker.Item label={item} value={index} key={index} />);
                })} 
              </Picker> */}
            

            </View>

            <View style={{ width: '97%', marginRight: 'auto', marginLeft: 'auto' }}>
              <Text style={{ color: '#000', }}>ROUPA</Text>
              <ScrollView horizontal
                          showsHorizontalScrollIndicator={false}
              >
                {this.state.roupas.map(this.renderMenusItems)}
              </ScrollView>
                {/* {roupasTipo.map((item, index) => {
                  return (< Picker.Item label={item} value={item} key={index} />);
                })}  */}
                {/* < Picker.Item label='Teste' /> */}
                
              {/* { this.state.pressStatus == true ? <Text>Verdadeiro</Text> : <Text>Falso</Text>} */}
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
            <Button onPress={() => addRoupa(this.state)} title="Adicionar">Adicionar</Button>
            {/* <Button onPress={() => console.log(this.props.data)} title="Ver">ver</Button> */}
        </View>
      );
    }
  }

const mapStateToProps = state => ({
  data: state.roupas.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(RoupasActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AddRoupa);


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    color: '#fff',
    marginRight: 10,
    borderRadius: 3,
    padding: 8,
    justifyContent: 'space-between',
  },
  buttonPress: {
    backgroundColor: '#239FC5',
    color: '#fff',
    
  },
  activeTitle: {
    color: 'red',
  },
});