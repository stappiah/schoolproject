import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import {Colors} from './Colors';

interface PasswordType {
  label: string;
  value: string;
  placeholder: string;
  onChange: (e: string) => void;
}

export default function PasswordInputComponent({
  label,
  value,
  placeholder,
  onChange,
}: PasswordType) {
  const [viewPassword, setviewPassword] = useState(false);

  return (
    <View style={styles.textStyle}>
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        onChangeText={onChange}
        placeholderTextColor={Colors.gray}
        placeholder={placeholder}
        secureTextEntry={viewPassword ? false : true}
        outlineStyle={{borderWidth: 1, borderColor: Colors.black}}
        style={styles.inputStyle}
      />
      <View style={styles.eyeIcon}>
        {!viewPassword ? (
          <TouchableOpacity onPress={() => setviewPassword(true)}>
            <Icon
              name="eye"
              size={25}
              color={'#ddd'}
              style={{paddingHorizontal: 10}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setviewPassword(false)}>
            <Icon
              name="eye-off"
              size={25}
              color={'#ddd'}
              style={{paddingHorizontal: 10}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    backgroundColor: Colors.white,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    color: Colors.black,
    backgroundColor: Colors.white,
    height: 50,
  },
  eyeIcon:{
    position: "absolute",
    right: 0,
  }
});
