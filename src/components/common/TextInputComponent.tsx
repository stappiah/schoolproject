import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from './Colors';

interface TextInputType {
  //   icon: string;
  label: string;
  placeholder: string;
  keyboardType:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'number-pad';
  value: any;
  onChange: (e: any) => void;
}

export default function TextInputComponent({
  //   icon,
  label,
  placeholder,
  keyboardType,
  value,
  onChange,
}: TextInputType) {
  return (
    <View style={styles.textStyle}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        placeholderTextColor={Colors.gray}
        keyboardType={keyboardType}
        onChangeText={onChange}
        placeholder={placeholder}
        style={{backgroundColor: Colors.white}}
        outlineStyle={{borderWidth: 1, borderColor: Colors.black}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    backgroundColor: Colors.white,
    width: '100%',
    height: 60,
  },
  inputStyle: {
    borderRadius: 5,
    flex: 1,
    elevation: 5,
    padding: 4,
    height: 55,
    backgroundColor: Colors.white,
    color: Colors.black,
  },
});
