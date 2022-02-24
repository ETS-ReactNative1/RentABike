import { StyleSheet } from 'react-native';
import { colors } from '../../colors';
export const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  card: {
    marginHorizontal: 30,
    marginVertical: 40,
    height: 180,
  },
  cardCover: {
    height: 160,
  },
  cardContent: {
    paddingVertical: 8,
    paddingTop: 12,
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
  title: {
    color: colors.dark2,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    /* marginBottom: 20, */
  },
  type: {
    color: colors.dark2,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
