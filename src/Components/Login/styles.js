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
  textInput: {
    paddingHorizontal: 10,
    height: 50,
    width: '100%',
    borderColor: 'gray',
    marginVertical: 10,
    /* backgroundColor: 'white', */
    /*     borderWidth: StyleSheet.hairlineWidth, */
    borderRadius: 10,
  },
  errorText: {
    marginBottom:14,
    fontSize: 10,
    color: 'red',
  },
  cover: {
    width: '100%',
    height: 120,
  },
  title: {
    color: '#7C8C03',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    marginVertical: 10,
    marginBottom: 20,
    /* backgroundColor:"#465902", */
  },
  link: {
    alignSelf: 'flex-start',
    color: '#7C8C03',
    textAlign: 'left',
    marginBottom: 4,
  },
});
