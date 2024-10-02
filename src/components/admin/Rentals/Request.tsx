import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Users} from '../../common/Data';
import {Colors} from '../../common/Colors';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import {ModalButton} from '../../common/Button';
import axios from 'axios';
import {BASEURL} from '../../common/BASEURL';
import {useSelector} from 'react-redux';
import {selectuser} from '../../../feature/slices/AuthSlice';
import {selectStation} from '../../../feature/slices/StationSlice';
import SnackbarComponent from '../../common/SnackbarComponent';
import {useFocusEffect} from '@react-navigation/native';
import {RentalRequestType} from '../../common/Types';

export default function Request() {
  const [openDetail, setopenDetail] = React.useState(false);
  const [openSnack, setopenSnack] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [loadingRental, setloadingRental] = React.useState(false);
  const [rentalData, setrentalData] = React.useState<RentalRequestType[]>([]);
  const [selectedrental, setselectedrental] =
    React.useState<RentalRequestType | null>(null);
  const user = useSelector(selectuser);
  const station = useSelector(selectStation);

  const getStationRental = () => {
    setloadingRental(true);
    axios
      .get(`${BASEURL}/station-rental-request/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setrentalData(response?.data);
        console.log('data', response.data);
      })
      .catch(error => {
        console.log(error?.response.data);
        if (error?.message) {
          setmessage(error?.message);
          setopenSnack(true);
        }
      })
      .finally(() => setloadingRental(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      getStationRental();
    }, []),
  );

  return (
    <View>
      <DataTable>
        <DataTable.Header
          style={{justifyContent: 'space-evenly', backgroundColor: '#F0F7FD'}}>
          <DataTable.Title>
            <Text style={styles.th}>Name</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.th}>Phone</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.th}>Destination</Text>
          </DataTable.Title>
        </DataTable.Header>
        {loadingRental ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '80%',
            }}>
            <ActivityIndicator
              animating
              color={Colors.primary}
              size={'large'}
            />
          </View>
        ) : (
          <FlatList
            data={rentalData}
            keyExtractor={item => item?.id.toLocaleString()}
            renderItem={({item}) => (
              <DataTable.Row
                onPress={() => {
                  setselectedrental(item);
                  setopenDetail(true);
                }}
                style={{borderBottomWidth: 0.5, borderColor: Colors.gray}}>
                <DataTable.Cell>
                  <Text style={{color: Colors.gray}}>{item?.full_name}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: Colors.gray}}>{item?.phone_number}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: Colors.gray}}>{item?.destination}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            )}
          />
        )}
      </DataTable>

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
            <Text style={styles.textHeading}>Bus Rental Information</Text>
            <View style={{paddingHorizontal: 10}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Customer:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedrental?.full_name}
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Phone Number:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedrental?.phone_number}
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Destination:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedrental?.destination}
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Region:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedrental?.region}
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Pick Up Point:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>{selectedrental?.pickup}</Text>
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
        onPress={() => setopenSnack(false)}
        onDismiss={() => setopenSnack(false)}
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
  deleteBtn: {
    backgroundColor: Colors.red,
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherBtn: {
    backgroundColor: '#CAE5FA',
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
