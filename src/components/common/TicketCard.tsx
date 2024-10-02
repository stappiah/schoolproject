import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from './Colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParams} from '../navigation/RootParams';
import {useNavigation} from '@react-navigation/native';
import {scheduleType} from './Types';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {selectStation} from '../../feature/slices/StationSlice';

type screenType = NativeStackNavigationProp<RootParams>;

export default function TicketCard({data}: {data: scheduleType}) {
  const navigation = useNavigation<screenType>();
  const station = useSelector(selectStation);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('transport_details', {
          schedule_detail: data,
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.gray}}>TicketCard</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 1}}>
          <Text
            style={{
              color: Colors.black,
              fontWeight: 'bold',
              fontSize: 24,
              paddingBottom: 4,
            }}>
            &cent;
          </Text>
          <Text style={{color: Colors.black, fontWeight: 'bold', fontSize: 20}}>
            {data?.amount}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={{color: Colors.primary, fontWeight: '500'}}>
            {station?.company_name}
          </Text>

          <Text style={styles.departureText}>Departure Date</Text>
          <Text style={styles.departureDataTime}>
            {moment(data?.departure_date, 'YYYY-MM-DD').format(
              'dddd, MMMM Do YYYY',
            )}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 20,
              color: Colors.black,
              paddingLeft: 10,
            }}>
            {data?.seat_number}
          </Text>
          <Text style={{fontWeight: '600', fontSize: 16, color: Colors.gray}}>
            Seat
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.departureText}>Departure Time</Text>
          <Text style={styles.departureDataTime}>
            {moment(data?.departure_time, 'HH:mm:ss').format('h:mm A')}
          </Text>
        </View>
        <View>
          <Text style={styles.departureText}>Car Number</Text>
          <Text style={styles.departureDataTime}>{data?.car_number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    width: '95%',
    marginHorizontal: 'auto',
    marginVertical: 5,
  },
  departureDataTime: {
    color: Colors.black,
    fontWeight: '600',
  },
  departureText: {
    color: Colors.gray,
    paddingTop: 10,
  },
});
