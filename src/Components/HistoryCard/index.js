import { View, Text, Image } from 'react-native';
import React from 'react';

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
        backgroundColor: '#e6e6e6',
        /*   width: '100%',
        height: '100%', */
        marginHorizontal: 10,
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 1,
        padding: 26,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 32 }}>
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
          style={{ width: '35%', height: '100%', marginLeft:6 }}
        ></Image>
      </View>
    </View>
  );
}
