import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const AddIcon = props => (
  <TouchableOpacity
    onPress={() => props.handleCadastroEntregador()}
  >
    <Image
      source={{ uri: 'https://image.flaticon.com/icons/png/512/14/14866.png' }}
      style={{
        width: 25, height: 25, marginRight: 8, tintColor: '#2699FB',
      }}
    />
  </TouchableOpacity>
);

export default AddIcon;
