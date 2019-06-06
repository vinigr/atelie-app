import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 25,
    bottom: 25,
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: '#3a8fdc',
  },
  mais: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  },
  roupaTouchable: {
    backgroundColor: '#62B2F6',
    marginBottom: 6,
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    width: '97%',
    minHeight: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
  },
});

export default styles;
