import { StyleSheet } from 'react-native';
import { colors } from '../../colors';
export const styles = StyleSheet.create({
  login: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  loginContainer: {
    width: '100%',
    minHeight: 400,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 26,
    paddingTop: 10,
    backgroundColor: colors.background,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  submitButton: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    marginBottom: 20,
  },
  label: {
    width: '100%',
    fontSize: 22,
    fontWeight: 'bold',
  },
  info: {
    width: '100%',
    fontSize: 20,
    /* fontWeight: 'bold', */
  },
  last: {
    display: 'flex',
    width: '100%',
    minHeight: 60,
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'grey',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  itemFlex: {
    width: '45%',
    height: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCheckoutLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemCheckout: {
    fontSize: 18,
    /* fontWeight: 'bold', */
    textAlign: 'center',
  },
});
