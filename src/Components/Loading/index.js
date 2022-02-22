import { Image, Text, ActivityIndicator, View } from 'react-native';

export default function Loading({ loading }) {
  return (
    <>
      {loading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            elevation: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size='large' color='#7C8C03' />
        </View>
      )}
    </>
  );
}
