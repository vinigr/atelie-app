import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  viewTitle: {
    backgroundColor: '#11AFE6',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 5,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'OpenSans-Semibold',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  viewAjustes: {
    width: '97%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textAjustes: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
  },
});

export default styles;
