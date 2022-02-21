import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e6e6e6',
  },
  card: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderColor: 'black',
  },
  card: {
    marginBottom: 20,
  },
  cardCover: {
    height: 160,
  },
  cardContent: {
    backgroundColor: '#ffffff',
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
    /* marginBottom: 20, */
  },
  type: {
    /* color: '#7C8C03', */
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  edit: {
    backgroundColor: 'white',
    borderRadius: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 42,
    height: 42,
    position: 'absolute',
    margin: 16,
    right: 52,
    top: 0,
  },
  delete: {
    backgroundColor: 'white',
    borderRadius: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 42,
    height: 42,
    position: 'absolute',
    margin: 16,
    right: 4,
    top: 0,
  },
});
