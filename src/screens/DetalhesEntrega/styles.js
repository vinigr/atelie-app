import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Semibold',
    marginBottom: 10,
    fontSize: 20,
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
    marginBottom: 20,
  },
  cliente: {
    marginBottom: 15,
  },
  entregadores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderColor: '#3a8fdc',
    borderStyle: 'solid',
    borderWidth: 0.5,
    width: '100%',
    height: 45,
    backgroundColor: '#F8F8F8',
    marginBottom: 10,
  },
  buttonFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
    height: 50,
    backgroundColor: '#3a8fdc',
    marginTop: 10,
  },
  textButton: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'OpenSans-Semibold',
  },
});

export default styles;
