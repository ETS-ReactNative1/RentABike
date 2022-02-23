import { View, Text, Image } from 'react-native';
import React from 'react';

export function MessageCard() {
  return (
    <View
      style={{
        backgroundColor: '#e6e6e6',
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 1,
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
          Owner Name
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
          source={{ uri: 'https://i.pravatar.cc/300' }}
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
          <Text style={{ fontWeight: '100', fontSize: 16 }}>1 minute ago</Text>
        </View>
      </View>
    </View>
  );
}
