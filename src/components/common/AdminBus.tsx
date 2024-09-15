import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import { Colors } from './Colors';

export default function AdminBus() {
  return (
    <View>
      <TouchableOpacity style={{marginBottom: 10}}>
        <View style={{height: 180, width: "100%"}}>
          <Image
            source={require('../../assets/busimage2.jpg')}
            //   style={styles.imageStyle}
            style={{height: '100%', width: '100%',borderRadius: 10}}
          />
        </View>
        <View style={{flexDirection: "row",justifyContent: "space-between",paddingTop: 10}}>
            <Text style={{color: Colors.black,fontWeight: "600",fontSize: 17}}>GC 1 24</Text>
            <Text style={{color: Colors.primary,fontSize: 16}}>30 seat</Text>
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
