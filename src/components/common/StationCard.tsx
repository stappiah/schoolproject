import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from './Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParams } from '../navigation/RootParams';
import { useNavigation } from '@react-navigation/native';

type propsType = {
  data: {
    name: string;
    address: string;
    region: string;
  };
};

type screenType = NativeStackNavigationProp<RootParams>;

export function MainStationCard({data}: propsType) {
  const navigation = useNavigation<screenType>();

  return (
    <TouchableOpacity style={styles.maincontainer} onPress={() => navigation.navigate("reservation")}>
      <View style={{height: 150, width: '100%'}}>
        <Image
          source={require('../../assets/2.jpg')}
          style={{
            height: '100%',
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View style={styles.details}>
        <Text style={{color: Colors.black, paddingVertical: 5, fontSize: 17}}>
          {data.name}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Icon name="google-maps" color={Colors.primary} size={20} />
          <Text style={{color: Colors.gray}}>Circle Greater Accra Region</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingTop: 5,
            }}>
            <Icon name="briefcase-variant" color={Colors.gray} size={20} />
            <Text style={{color: Colors.gray}}>Monday - Sunday</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingTop: 10,
            }}>
            <Icon
              name="clock-time-three-outline"
              color={Colors.gray}
              size={20}
            />
            <Text style={{color: Colors.gray}}>6am - 6pm</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function StationCard() {
  const navigation = useNavigation<screenType>();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("reservation")}>
      <View style={{height: 150, width: '100%'}}>
        <Image
          source={require('../../assets/2.jpg')}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 10,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View style={styles.details}>
        <Text style={{color: Colors.black, paddingVertical: 5, fontSize: 17}}>
          Accra bus station
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Icon name="google-maps" color={Colors.primary} size={20} />
          <Text style={{color: Colors.gray}}>Circle Greater Accra Region</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingTop: 5,
            }}>
            <Icon name="briefcase-variant" color={Colors.gray} size={20} />
            <Text style={{color: Colors.gray}}>Monday - Sunday</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingTop: 10,
            }}>
            <Icon
              name="clock-time-three-outline"
              color={Colors.gray}
              size={20}
            />
            <Text style={{color: Colors.gray}}>6am - 6pm</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    width: Dimensions.get('window').width / 1.3,
    margin: 10,
    borderRadius: 10,
  },
  maincontainer: {
    elevation: 2,
    width: '95%',
    margin: 10,
    borderBlockColor: Colors.white,
    borderRadius: 10,
  },
  details: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
