import { StyleSheet } from 'react-native';
import { colors } from '../../colors';
export const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: colors.background,
  },
  container: {
    width: '100%',
    padding: 26,
    backgroundColor: colors.background,
    /* paddingHorizontal: 26, */
    display: 'flex',
    justifyContent: 'flex-start',
    /* alignItems: 'center', */
  },
  formContainer: {
    width: '100%',
    minHeight: 300,
    alignItems: 'center',
    backgroundColor: 'white',
    backgroundColor: colors.background,
    paddingBottom: 40,
  },
  title: {
    color: colors.dark2,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  label: {
    color: colors.dark2,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 4,
  },
  info: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 4,
  },
  picker: {
    width: '100%',
    height: 30,
  },
  imageContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 16,
  },
  image: {
    /* marginVertical: 16, */
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
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
  submitButton: {
    marginBottom: 8,
  },
  textButton: {
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});
