import { StyleSheet } from 'react-native';
export const stylesForm = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 650,
    maxHeight:'100%',
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 26,
  },
  formContainer: {
    width: '100%',
    minHeight: 300,
    alignItems: 'center',
    backgroundColor: 'white',
    backgroundColor: '#e6e6e6',
    paddingBottom: 40,
  },
  title: {
    color: '#7C8C03',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  label: {
    color: '#7C8C03',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  picker: {
    width: '100%',
    height: 30,
  },
  imageContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    marginVertical: 16,
    width: 200,
    height: 200,
  },
  textInput: {
    paddingHorizontal: 10,
    height: 40,
    width: '100%',
    borderColor: 'gray',
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});
