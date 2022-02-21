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
      width:'100%',
    height: 40,
    marginVertical: 10,
    marginBottom: 20,
    /* backgroundColor:"#465902", */
  },
  item: {
    width: '100%',
    height: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemFlex: {
    width: '45%',
    height: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCheckout: {
    width: '60%',
    height: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
