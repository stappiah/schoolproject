import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {Colors} from '../../components/common/Colors';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import {BASEURL} from '../../components/common/BASEURL';
import {selectuser} from '../../feature/slices/AuthSlice';
import {reservationType} from '../../components/common/Types';
import moment from 'moment';

export default function RecentReservation() {
  const user = useSelector(selectuser);
  const [reservation, setReservation] = React.useState<reservationType[]>([]);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setloading] = React.useState(false);

  const getReservations = () => {
    setloading(true);
    axios
      .get(`${BASEURL}/user-reservation`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setReservation(response?.data);
      })
      .catch(error => {
        setMessage('Failed to fetch reservations');
        setOpenSnack(true);
      })
      .finally(() => setloading(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      getReservations();
    }, []),
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator animating color={Colors.primary} size={'large'} />
        </View>
      ) : (
        <>
          {reservation?.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '80%',
              }}>
              <Image
                source={require('../../assets/empty.png')}
                style={{height: 150, width: 150}}
              />
              <Text
                style={{color: Colors.gray, fontWeight: '600', fontSize: 17}}>
                No recent reservation
              </Text>
            </View>
          ) : (
            <FlatList
              data={reservation}
              keyExtractor={item => item?.id?.toString()}
              renderItem={({item}) => (
                <View style={styles.body}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../../assets/Transfer_money.png')}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.currencySymbol}>&cent;</Text>
                    <Text style={styles.amountText}>{item?.get_amount}</Text>
                  </View>

                  <View style={styles.infoContainer}>
                    <Text>Trip ID</Text>
                    <Text>No: #{item?.id}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{item?.full_name}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.value}>{item?.phone_number}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Email Address</Text>
                    <Text style={styles.value}>{item?.email}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Seat Number</Text>
                    <Text style={styles.value}>{item?.seat_number}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Destination</Text>
                    <Text style={styles.value}>{item?.get_destination}</Text>
                  </View>

                  <Text style={styles.dateText}>
                    {' '}
                    {moment(item?.date_created, 'YYYY-MM-DD').format(
                      'dddd, MMMM Do YYYY',
                    )}
                  </Text>
                  <Text style={styles.dateText}>
                    {moment(item?.date_created, 'HH:mm:ss').format('h:mm A')}
                  </Text>
                </View>
              )}
            />
          )}
        </>
      )}

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
    flex: 1,
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
    height: 150,
    width: 150,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  currencySymbol: {
    color: Colors.black,
    fontSize: 80,
  },
  amountText: {
    color: Colors.black,
    fontSize: 60,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 30,
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
    paddingTop: 20,
    fontSize: 17,
  },
});
