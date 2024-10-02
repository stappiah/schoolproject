import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {Colors} from '../../components/common/Colors';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import {BASEURL} from '../../components/common/BASEURL';
import {selectuser} from '../../feature/slices/AuthSlice';
import {BusRentalType, BusType, RentalRequestType} from '../../components/common/Types';
import moment from 'moment';

export default function Rental({data}: {data: RentalRequestType}) {
  const user = useSelector(selectuser);
  const [busRental, setbusRental] = React.useState<BusRentalType | null>(null);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const getBusRental = () => {
    axios
      .get(`${BASEURL}/bus-rental/${data?.rental}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        console.log(response.data);
        setbusRental(response?.data);
      })
      .catch(error => {
        setMessage('Failed to fetch reservations');
        setOpenSnack(true);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getBusRental();
    }, []),
  );

  return (
    <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/Transfer_money.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>&cent;</Text>
              <Text style={styles.amountText}>{data?.cost}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text>Car No:</Text>
              <Text>{busRental?.get_car_number}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Station</Text>
              <Text style={styles.value}>{busRental?.get_station_name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Admin</Text>
              <Text style={styles.value}>{busRental?.phone_number}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{data?.full_name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Destination</Text>
              <Text style={styles.value}>{data?.destination}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Region</Text>
              <Text style={styles.value}>{data?.region}</Text>
            </View>

            <Text style={styles.dateText}>
              {' '}
              {moment(data?.created_at, 'YYYY-MM-DD').format(
                'dddd, MMMM Do YYYY',
              )}
            </Text>
            <Text style={styles.dateText}>
              {moment(data?.created_at, 'HH:mm:ss').format('h:mm A')}
            </Text>
          </View>

      <SnackbarComponent
        message={message}
        visible={openSnack}
        onDismiss={() => setOpenSnack(false)}
        onPress={() => setOpenSnack(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  body: {
    borderWidth: 0.5,
    borderColor: Colors.gray,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 140,
    width: 140,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  currencySymbol: {
    color: Colors.black,
    fontSize: 60,
  },
  amountText: {
    color: Colors.black,
    fontSize: 60,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light,
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 16,
  },
  value: {
    color: Colors.gray,
    fontWeight: '600',
    fontSize: 16,
  },
  dateText: {
    color: Colors.black,
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 17,
  },
});
