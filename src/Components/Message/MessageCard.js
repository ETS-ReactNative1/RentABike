import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export function MessageCard({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('ChatScreen', {
          rentId: item.rent.rentId,
          ownerName: item.owner.name,
          bikeModel: item.bike.model,
        })
      }
    >
      <View
        style={{
          backgroundColor: '#e6e6e6',
          borderColor: 'black',
          borderWidth: 1,
          borderLeftWidth:2,
          borderRightWidth:2,
          borderLeftWidth:2,
          padding: 26,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <View style={{ width: 80 }}></View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, width: '65%' }}>
            {item.owner.name}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Image
            source={{ uri: item.bike.img }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          ></Image>
          <View
            style={{
              width: '65%',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Text
              style={{
                fontWeight: '200',
                fontSize: 16,
              }}
            >
              (Bike Model)
            </Text>
            <Text style={{ fontSize: 16 }}>
              {'blablbalb blbalbadsadasdasasd dlsakdaslkd'.substring(0, 18) +
                '...'}{' '}
            </Text>
            <Text style={{ fontWeight: '100', fontSize: 16 }}>
              1 minute ago
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
