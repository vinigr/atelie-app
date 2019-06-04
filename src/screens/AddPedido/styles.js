import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '97%',
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    borderColor: '#3a8fdc',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  button: {
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
});

export default styles;
