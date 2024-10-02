import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from './Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParams} from '../navigation/RootParams';
import {useNavigation} from '@react-navigation/native';
import {StationType} from './Types';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {GetStation} from '../../feature/slices/StationSlice';

type propsType = {
  data: StationType;
};

type screenType = NativeStackNavigationProp<RootParams>;

export function MainStationCard({data}: propsType) {
  const navigation = useNavigation<screenType>();
  const dispatch = useDispatch();

  const length = data?.working_days?.length;
  const new_working_days = [
    data?.working_days[0],
    data?.working_days[length - 1],
  ];

  return (
    <TouchableOpacity
      style={styles.maincontainer}
      onPress={() => {
        dispatch(
          GetStation({
            id: data?.id,
            admin: data?.admin,
            address: data?.address,
            station_name: data?.station_name,
            company_name: data?.company_name,
            start_time: data?.start_time,
            closing_time: data?.closing_time,
            region: data?.region,
          }),
        );
        navigation.navigate('reservation');
      }}>
      <View style={{height: 150, width: '100%'}}>
        <Image
          source={{uri: data?.image}}
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
          {data?.station_name}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Icon name="google-maps" color={Colors.primary} size={20} />
          <Text style={{color: Colors.gray}}>{data?.address} {data?.region}</Text>
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
            <Text style={{color: Colors.gray}}>
            {new_working_days[0]} - {new_working_days[1]}
            </Text>
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
            <Text style={{color: Colors.gray}}>
            {moment(data?.start_time, 'HH:mm:ss').format('h:mm A')} -{' '}
            {moment(data?.closing_time, 'HH:mm:ss').format('h:mm A')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function StationCard({data}: propsType) {
  const navigation = useNavigation<screenType>();
  const dispatch = useDispatch();

  const length = data?.working_days?.length;
  const new_working_days = [
    data?.working_days[0],
    data?.working_days[length - 1],
  ];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(
          GetStation({
            id: data?.id,
            admin: data?.admin,
            address: data?.address,
            station_name: data?.station_name,
            company_name: data?.company_name,
            start_time: data?.start_time,
            closing_time: data?.closing_time,
            region: data?.region,
          }),
        );
        navigation.navigate('reservation');
      }}>
      <View style={{height: 150, width: '100%'}}>
        <Image
          source={{uri: data?.image}}
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
          {data?.station_name}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Icon name="google-maps" color={Colors.primary} size={20} />
          <Text style={{color: Colors.gray}}>
            {data?.address} {data?.region}
          </Text>
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
            <Text style={{color: Colors.gray}}>
              {new_working_days[0]} - {new_working_days[1]}
            </Text>
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
            <Text style={{color: Colors.gray}}>
              {moment(data?.start_time, 'HH:mm:ss').format('h:mm A')} -{' '}
              {moment(data?.closing_time, 'HH:mm:ss').format('h:mm A')}
            </Text>
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
