import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
  ScrollView,
} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {Colors} from '../../components/common/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {ModalButton} from '../../components/common/Button';
import {useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';
import {selectStation} from '../../feature/slices/StationSlice';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import {useFocusEffect} from '@react-navigation/native';
import {reservationType} from '../../components/common/Types';
import moment from 'moment';
import {Image} from 'react-native';

export default function Bookings() {
  const [openDetail, setopenDetail] = React.useState(false);
  const [openSnack, setopenSnack] = React.useState(false);
  const [reservation, setreservation] = React.useState<reservationType[]>([]);
  const [selectedreservation, setselectedreservation] =
    React.useState<reservationType | null>(null);
  const [message, setmessage] = React.useState('');
  const user = useSelector(selectuser);
  const station = useSelector(selectStation);

  const handleBooking = () => {
    axios
      .get(`${BASEURL}/station-reservation/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        console.log(response.data);
        setreservation(response?.data);
      })
      .catch(error => {
        setmessage('Unable to load bookings');
        setopenSnack(true);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when screen is focused
      handleBooking();
    }, []),
  );

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      {reservation?.length === 0 ? (
        <View
          style={{
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/empty.png')}
            style={{height: 150, width: 150}}
          />
          <Text style={{color: Colors.gray,fontWeight: "600"}}>No Available Booking</Text>
        </View>
      ) : (
        <ScrollView>
          <DataTable>
            <DataTable.Header
              style={{
                justifyContent: 'space-evenly',
                backgroundColor: '#F0F7FD',
              }}>
              <DataTable.Title>
                <Text style={styles.th}>Name</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.th}>Destination</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.th}>Phone</Text>
              </DataTable.Title>
            </DataTable.Header>

            {reservation?.map(item => (
              <DataTable.Row
                key={item?.id}
                onPress={() => {
                  setselectedreservation(item);
                  setopenDetail(true);
                }}>
                <DataTable.Cell>
                  <Text style={{color: Colors.black}}>{item?.full_name}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: Colors.black}}>
                    {item?.get_destination}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: Colors.black}}>
                    {item?.phone_number}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      )}

      <Modal transparent animationType="slide" visible={openDetail}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Booking Information</Text>
            <View style={{paddingHorizontal: 10}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Full Name:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedreservation?.full_name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Phone Number:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedreservation?.phone_number}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Email Address:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14, width: '45%'}}>
                  {selectedreservation?.email}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Booking Date:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14, width: '45%'}}>
                  {moment(
                    selectedreservation?.date_created,
                    'YYYY-MM-DD',
                  ).format('dddd, MMMM Do YYYY')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Seat Number:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>
                  {selectedreservation?.seat_number}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Destination:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>
                  {selectedreservation?.get_destination}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Schedule ID:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>
                  #{selectedreservation?.id}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Car Number:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>
                  {selectedreservation?.get_car_number}
                </Text>
              </View>

              <View style={{paddingTop: 30, width: '40%'}}>
                <ModalButton
                  label="CLOSE"
                  onPress={() => setopenDetail(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <SnackbarComponent
        visible={openSnack}
        message={message}
        onDismiss={() => setopenSnack(false)}
        onPress={() => setopenSnack(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  th: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  modalcontainer: {
    backgroundColor: Colors.white,
    width: '85%',
    elevation: 15,
    padding: 15,
    borderRadius: 10,
  },
  textHeading: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center',
    paddingBottom: 10,
  },
});
