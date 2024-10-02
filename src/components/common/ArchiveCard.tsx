import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from './Colors';
import { reservationType } from './Types';
import axios from 'axios';
import { BASEURL } from './BASEURL';
import { useSelector } from 'react-redux';
import { selectuser } from '../../feature/slices/AuthSlice';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

export default function ArchiveCard({data}:{data:reservationType}) {
  const user = useSelector(selectuser);
  const [reservationDetail, setreservationDetail] = React.useState<reservationType | null>(null);

  const handleScheduleDetails = () => {
    axios.get(`${BASEURL}/schedule/${data?.schedule}`,{
      headers:{Authorization: `token ${user?.token}`}
    }).then((response) => {
      console.log('login', response.data);
      setreservationDetail(response?.data)
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      handleScheduleDetails();
    }, []),
  );

  return (
    <View>
      <View style={styles.container}>
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
            <Text
              style={{color: Colors.black, fontWeight: 'bold', fontSize: 20}}>
              {data?.get_amount}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{color: Colors.primary, fontWeight: '500'}}>
              {reservationDetail?.get_station}
            </Text>

            <Text style={styles.departureText}>Departure Date</Text>
            <Text style={styles.departureDataTime}>
            {moment(reservationDetail?.departure_date, 'YYYY-MM-DD').format(
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
            <Text style={styles.departureDataTime}>{moment(reservationDetail?.departure_time, 'HH:mm:ss').format('h:mm A')}</Text>
          </View>
          <View>
            <Text style={styles.departureText}>Phone Number</Text>
            <Text style={styles.departureDataTime}>{data?.phone_number}</Text>
          </View>
        </View>
      </View>
    </View>
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
