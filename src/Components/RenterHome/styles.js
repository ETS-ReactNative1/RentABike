import { StyleSheet } from 'react-native';
import { colors } from '../../colors';
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  card: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderColor: colors.dark2,
    backgroundColor: colors.background2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardCover: {
    height: 160,
  },
  cardContent: {
    paddingVertical: 4,
  },
  title: {
    color: colors.dark2,
    fontSize: 24,
    fontWeight: 'bold',
    /* marginBottom: 20, */
  },
  text: {
    fontWeight: 'bold',
  },
  edit: {
    backgroundColor: colors.backgroundOpac,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  delete: {
    backgroundColor: colors.backgroundOpac,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
