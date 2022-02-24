import { colors } from '../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
export const header = (fun) => {
  return {
    title: 'RentaBike',
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTintColor: colors.dark2,
    headerTitleStyle: {},
    headerShadowVisible: false,
    headerLeft: () => (
      <Icon
        name='arrow-left'
        color={colors.dark2}
        size={18}
        style={{
          marginLeft: 16,
          marginRight: 12,
        }}
        onPress={fun}
      />
    ),
  };
};
