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
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderLeftWidth: 2,
          padding: 14,
          /*  backgroundColor:"red" */
        }}
      >
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
            <Text style={{ fontWeight: 'bold', fontSize: 18, width: '65%' }}>
              {item.owner.name}
            </Text>
            <Text
              style={{
                fontWeight: '200',
                fontSize: 16,
              }}
            >
              ({item.bike.model})
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
