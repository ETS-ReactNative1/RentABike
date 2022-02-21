import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  login: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e6e6e6',
  },
  loginContainer: {
    width: '100%',
    minHeight: 400,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 26,
    paddingTop: 10,
    backgroundColor: '#e6e6e6',
    paddingBottom: 40,
  },
  title: {
    color: '#7C8C03',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    marginBottom: 20,
    /* backgroundColor:"#465902", */
  },
  item: {
    width: '100%',
    minHeight: 30,
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'grey',
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
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
    width: '60%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemCheckout: {
    width: '60%',
    fontSize: 18,
    /* fontWeight: 'bold', */
    textAlign: 'center',
  },
});
