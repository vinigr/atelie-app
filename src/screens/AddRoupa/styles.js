import { StyleSheet } from 'react-native';


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
    alignItems: 'center',
  },
  buttonAjustePress: {
    backgroundColor: '#239FC5',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 5,
    borderRadius: 3,
    padding: 8,
    width: '47.5%',
    alignItems: 'center',
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
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  textRoupas: {
    fontFamily: 'OpenSans-Regular',
  },
  textButton: {
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
  },
});

export default styles;
