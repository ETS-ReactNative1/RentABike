import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../colors';

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
          /*    borderWidth: 1, */
          padding: 12,
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
          borderBottomStartRadius: 15,
          borderBottomEndRadius: 15,
          marginBottom: 8,
          /*  backgroundColor:"red" */
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
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
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
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
