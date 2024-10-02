import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from './Colors';
import {BusType} from './Types';


type propsType = {
  data: BusType;
  onPress: () => void;
};

export default function AdminBus({data, onPress}: propsType) {

  return (
    <View>
      <TouchableOpacity
        style={{marginBottom: 10,elevation: 4}}
        onPress={onPress}>
        <View style={{height: 180, width: '100%'}}>
          <Image
            source={{uri: data?.bus_image}}
            style={{height: '100%', width: '100%', borderRadius: 10}}
          />
        </View>
        <Text
          style={{
            color: Colors.gray,
            fontWeight: '600',
            fontSize: 17,
            paddingVertical: 3,
          }}>
          {data?.car_name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10
          }}>
          <Text style={{color: Colors.black, fontWeight: '600', fontSize: 17}}>
            {data?.car_number}
          </Text>
          <Text style={{color: Colors.primary, fontSize: 16}}>
            {data?.seat_number} seat
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'center',
    flex: 1,
  },
});
