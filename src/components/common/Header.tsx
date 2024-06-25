import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from './Colors';

type propsType = {
    label: string;
}
export default function Header({label}: propsType) {
  return (
    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",paddingHorizontal: 10,paddingVertical: 4}}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity>
        <Icon name="arrow-back-ios" size={25} />
      </TouchableOpacity>
      <Text style={{color: Colors.black,fontSize: 17}}>{label}</Text>
      <Text></Text>
    </View>
  );
}
