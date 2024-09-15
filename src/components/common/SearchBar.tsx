import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from './Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

type propsType = {
  placeholder: string;
};
export default function SearchBar({placeholder}: propsType) {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color={Colors.gray} />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={Colors.gray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 5,
    gap: 5,
  },
  input: {
    color: Colors.gray,
    backgroundColor: Colors.white,
    flex: 1,
  },
});
