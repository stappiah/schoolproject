import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from './Colors'
import Icon from 'react-native-vector-icons/AntDesign';

type propsType = {
    label: string;
    onPress: () => void;
}

export function Button({label,onPress}: propsType) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{color: Colors.white,textAlign: "center",fontWeight: "600"}}>{label}</Text>
    </TouchableOpacity>
  )
}

export function LoadingButton() {
  return (
    <TouchableOpacity style={styles.container}>
      <ActivityIndicator animating color={Colors.white} />
    </TouchableOpacity>
  )
}

export function ModalCloseButton({label,onPress}: propsType) {
  return (
    <TouchableOpacity style={styles.modal_close_container} onPress={onPress}>
      <Text style={{color: Colors.primary,textAlign: "center",fontWeight: "600"}}>{label}</Text>
    </TouchableOpacity>
  )
}

export function ModalButton({label,onPress}: propsType) {
  return (
    <TouchableOpacity style={styles.modal_container} onPress={onPress}>
      <Text style={{color: Colors.white,textAlign: "center",fontWeight: "600"}}>{label}</Text>
    </TouchableOpacity>
  )
}

export function ModalLoadingButton() {
  return (
    <TouchableOpacity style={styles.modal_container}>
      <ActivityIndicator animating color={Colors.white} />
    </TouchableOpacity>
  )
}

export function AddButton({label,onPress}: propsType) {
  return (
    <TouchableOpacity style={styles.add_container} onPress={onPress}>
      <Icon name='plus' size={20} color={Colors.white} />
      <Text style={{color: Colors.white,textAlign: "center",fontWeight: "600"}}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 10
    },
    modal_close_container:{
        backgroundColor: Colors.white,
        paddingVertical: 5,
        borderRadius: 8,
        paddingHorizontal: 10,
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    modal_container:{
        backgroundColor: Colors.primary,
        paddingVertical: 5,
        borderRadius: 8,
        paddingHorizontal: 10
    },
    add_container:{
        backgroundColor: Colors.primary,
        paddingVertical: 5,
        borderRadius: 10,
        flexDirection: "row",
        width: "34%",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10
    }
})