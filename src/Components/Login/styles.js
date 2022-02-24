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
    padding: 26,
    paddingTop: 10,
    backgroundColor: colors.background,
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
    marginBottom: 14,
    fontSize: 10,
    color: colors.important,
  },
  cover: {
    width: '100%',
    height: 120,
  },
  title: {
    color: colors.dark2,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    marginVertical: 10,
    marginBottom: 20,
  },
  link: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: colors.secundary,
    textAlign: 'left',
    marginBottom: 6,
  },
});
