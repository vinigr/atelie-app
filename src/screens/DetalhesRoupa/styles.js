import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Semibold',
    marginBottom: 10,
  },
  container: {
    width: '97%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ajustePendente: {
    backgroundColor: '#F9F9F9',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 5,
    borderRadius: 3,
    padding: 8,
    width: '45%',
    alignItems: 'center',
  },
  ajusteConcluido: {
    backgroundColor: '#239FC5',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 5,
    borderRadius: 3,
    padding: 8,
    width: '45%',
    alignItems: 'center',
  },
  observacoes: {
    marginTop: 20,
  },
  cliente: {
    marginBottom: 15,
  },
});

export default styles;
