import { View, Text, Image } from 'react-native';
import React from 'react';
import { colors } from '../../colors';

export function HistoryCard({ data }) {
  const date = data.rent.pickUp
    .split('"')[1]
    .split('T')[0]
    .split('-')
    .reverse()
    .join('/');
  return (
    <View
      style={{
        backgroundColor: colors.background2,
        /*   width: '100%',
        height: '100%', */
        marginHorizontal: 10,
        marginBottom: 20,
        borderColor: 'black',

        padding: 26,
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
      <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
        {data.bike.model}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ width: '65%' }}>
          <Text style={{ fontSize: 16 }}>Owner: {data.owner.name}</Text>
          <Text style={{ fontSize: 16 }}>Days: {data.rent.days}</Text>
          <Text style={{ fontSize: 16 }}>Total Price: ${data.rent.days}</Text>
          <Text style={{ fontSize: 16 }}>Pick up day: {date}</Text>
        </View>
        <Image
          source={{ uri: data.bike.img }}
          style={{
            width: 90,
            height: 90,
            marginLeft: 6,
            borderRadius: 60,
          }}
        />
      </View>
    </View>
  );
}
