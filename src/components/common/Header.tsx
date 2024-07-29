import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from './Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParams } from '../navigation/RootParams';
import { useNavigation } from '@react-navigation/native';

type propsType = {
    label: string;
}

type navType = NativeStackNavigationProp<RootParams>;

export default function Header({label}: propsType) {
  const navigation = useNavigation<navType>();

  return (
    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",paddingHorizontal: 10,paddingVertical: 5}}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={25} />
      </TouchableOpacity>
      <Text style={{color: Colors.black,fontSize: 17}}>{label}</Text>
      <Text></Text>
    </View>
  );
}
