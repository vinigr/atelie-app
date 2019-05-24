import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { } from 'react-native-vector-icons/MaterialCommunityIcons';

const AddIcon = () => (
  <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.props.navigationProps.navigate('AdicionarRoupa')}>
            <Image
              source={{uri: 'https://image.flaticon.com/icons/png/512/14/14866.png'}}
              style={{ width: 25, height: 25, marginRight:8, tintColor: '#2699FB' }}
            />
          </TouchableOpacity> 
  </View>
)

// export default AddIcon;
// export default class AddIcon extends Component {
//     render() {
//       return (
  
        
  
//       );
  
  
//     }
//   }