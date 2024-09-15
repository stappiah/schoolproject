import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from './Colors';

interface TextInputType {
  label: string;
  value: string;
}

export default function ReadOnlyTextInput({
  label,
  value,
}: TextInputType) {
  return (
    <View style={styles.textStyle}>
      <TextInput
        mode="outlined"
        readOnly
        label={label}
        value={value}
        placeholderTextColor={Colors.gray}
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
