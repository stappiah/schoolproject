import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from './Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParams } from '../navigation/RootParams';
import { useNavigation } from '@react-navigation/native';

type screenType = NativeStackNavigationProp<RootParams>;


export default function BusCard() {
  const navigation = useNavigation<screenType>();
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("renting_details")}>
      <View style={{height: 180, width: '95%', marginHorizontal: 'auto'}}>
        <Image
          source={require('../../assets/busimage3.jpg')}
          style={styles.busImage}
        />
      </View>
      <View style={{paddingHorizontal: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 5
          }}>
          <Text style={{color: Colors.black,fontWeight: "600"}}>VIP Transport Service</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: Colors.primary,
                fontWeight: 'bold',
                paddingBottom: 5,
                fontSize: 20
              }}>
              &cent;
            </Text>
            <Text style={{color: Colors.primary, fontSize: 17}}>20</Text>
            <Text style={{color: Colors.black}}>/hr</Text>
          </View>
        </View>

          <View style={{backgroundColor: Colors.light,padding: 0.5}} />

          <View style={{flexDirection: "row", justifyContent: "space-between",paddingVertical: 4}}>
            <View style={{flexDirection: "row",gap: 4,alignItems: 'center'}}>
              <Icon name='google-maps' size={20} color={Colors.primary} />
              <Text>Sowutuom</Text>
            </View>
            <View style={{flexDirection: "row",gap: 4,alignItems: 'center'}}>
              <Icon name='google-maps' size={20} color={Colors.primary} />
              <Text>Sowutuom</Text>
            </View>
            <View style={{flexDirection: "row",gap: 4,alignItems: 'center'}}>
              <Icon name='account' size={20} color={Colors.primary} />
              <Text>5 Seats</Text>
            </View>
          </View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 'auto',
    elevation: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '95%',
    paddingVertical: 10,
    marginVertical: 5
  },
  busImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
