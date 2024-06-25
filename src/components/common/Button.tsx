import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from './Colors'

type propsType = {
    label: string;
    onPress: () => void;
}

export default function Button({label,onPress}: propsType) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{color: Colors.white,textAlign: "center",fontWeight: "600"}}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 10
    }
})