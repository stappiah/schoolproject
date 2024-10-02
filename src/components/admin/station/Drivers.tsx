import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {Colors} from '../../common/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  AddButton,
  ModalButton,
  ModalCloseButton,
  ModalLoadingButton,
} from '../../common/Button';
import TextInputComponent from '../../common/TextInputComponent';
import {Users} from '../../common/Data';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {selectuser} from '../../../feature/slices/AuthSlice';
import {selectStation} from '../../../feature/slices/StationSlice';
import axios from 'axios';
import {BASEURL} from '../../common/BASEURL';
import {useFocusEffect} from '@react-navigation/native';
import SnackbarComponent from '../../common/SnackbarComponent';
import {DriverType} from '../../common/Types';

export default function Drivers() {
  const [openDetail, setopenDetail] = React.useState(false);
  const [openDelete, setopenDelete] = React.useState(false);
  const [openCreate, setopenCreate] = React.useState(false);

  const [first_name, setfirst_name] = React.useState('');
  const [last_name, setlast_name] = React.useState('');
  const [phone_number, setphone_number] = React.useState('');
  const [license_id, setlicense_id] = React.useState('');

  const [message, setmessage] = React.useState('');
  const [openSnack, setopenSnack] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [getloading, setgetloading] = React.useState(false);
  const [loadingDelete, setloadingDelete] = React.useState(false);
  const [driverData, setdriverData] = React.useState<DriverType[]>([]);
  const [selectedDriverData, setselectedDriverData] =
    React.useState<DriverType | null>(null);

  const user = useSelector(selectuser);
  const station = useSelector(selectStation);

  const getStationDriver = () => {
    setgetloading(true);
    axios
      .get(`${BASEURL}/get-driver/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setdriverData(response?.data);
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setgetloading(false));
  };

  const handleDriverCreation = () => {
    if (!first_name) {
      setopenSnack(true);
      setmessage('First name is required');
      return;
    } else if (!last_name) {
      setopenSnack(true);
      setmessage('Last name is required');
      return;
    } else if (!phone_number) {
      setopenSnack(true);
      setmessage('Phone number is required');
      return;
    } else if (!license_id) {
      setopenSnack(true);
      setmessage('License ID is required');
      return;
    }
    const body = {
      first_name,
      last_name,
      phone_number,
      license_id,
      station: station?.id,
    };
    setloading(true);
    axios
      .post(`${BASEURL}/create-driver`, body, {
        headers: {
          Authorization: `token ${user?.token}`,
        },
      })
      .then(response => {
        setopenSnack(true);
        setmessage('Driver added successfully.');
        setfirst_name('');
        setlast_name('');
        setphone_number('');
        setlicense_id('');
        setopenCreate(false);
        getStationDriver();
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setloading(false));
  };

  const handleDriverDelete = () => {
    setloadingDelete(true);
    axios
      .delete(`${BASEURL}/delete-driver/${selectedDriverData?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setopenSnack(true);
        setmessage('Driver successfully deleted');
        setselectedDriverData(null);
        setopenDelete(false);
        getStationDriver();
      })
      .catch(error => {
        if (error) {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setloadingDelete(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when screen is focused
      getStationDriver();
    }, []),
  );

  return (
    <View style={{height: '90%'}}>
      <View style={{alignSelf: 'flex-end', padding: 10, marginBottom: 10}}>
        <AddButton label="Add Driver" onPress={() => setopenCreate(true)} />
      </View>

      {getloading ? (
        <View
          style={{
            height: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator animating color={Colors.primary} size={'large'} />
        </View>
      ) : (
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
              <Text style={styles.th}>Phone</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.th}>Action</Text>
            </DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={driverData}
            keyExtractor={item => item?.id.toLocaleString()}
            renderItem={({item}) => (
              <DataTable.Row
                style={{borderBottomWidth: 0.5, borderColor: Colors.gray}}>
                <DataTable.Cell>
                  <Text style={{color: Colors.black}}>
                    {item?.first_name} {item?.last_name}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: Colors.black}}>
                    {item?.phone_number}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => {
                        setselectedDriverData(item);
                        setopenDelete(true);
                      }}>
                      <MI
                        name="delete-outline"
                        size={20}
                        color={Colors.white}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.otherBtn}
                      onPress={() => {
                        setselectedDriverData(item);
                        setopenDetail(true);
                      }}>
                      <Icon name="eye" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            )}
          />
        </DataTable>
      )}

      <Modal transparent animationType="slide" visible={openDelete}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>
              Are you sure you want to delete{' '}
            </Text>
            <Text
              style={{
                color: Colors.primary,
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
              }}>
              {selectedDriverData?.first_name} {selectedDriverData?.last_name}
            </Text>

            <View style={{flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
              <View style={{paddingTop: 30, width: '40%'}}>
                <ModalCloseButton
                  label="CLOSE"
                  onPress={() => setopenDelete(false)}
                />
              </View>
              <View style={{paddingTop: 30, width: '40%'}}>
                {loadingDelete ? (
                  <ModalLoadingButton />
                ) : (
                  <ModalButton label="CONFIRM" onPress={handleDriverDelete} />
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="slide" visible={openDetail}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Admin Information</Text>
            <View style={{paddingHorizontal: 10}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  First Name:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedDriverData?.first_name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Last Name:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedDriverData?.last_name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Phone Number:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedDriverData?.phone_number}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  License ID:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>
                  {selectedDriverData?.license_id}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Role:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>Driver</Text>
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

      <Modal transparent animationType="slide" visible={openCreate}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Add Driver</Text>

            <View style={{paddingHorizontal: 10}}>
              <View>
                <TextInputComponent
                  label="First Name"
                  keyboardType="default"
                  placeholder="Enter first name"
                  value={first_name}
                  onChange={e => setfirst_name(e)}
                />
                <TextInputComponent
                  label="Last Name"
                  keyboardType="default"
                  placeholder="Enter last name"
                  value={last_name}
                  onChange={e => setlast_name(e)}
                />
                <TextInputComponent
                  label="Phone Number"
                  keyboardType="phone-pad"
                  placeholder="Enter phone number"
                  value={phone_number}
                  onChange={e => setphone_number(e)}
                />
                <TextInputComponent
                  label="License ID"
                  keyboardType="default"
                  placeholder="Enter driver's license ID"
                  value={license_id}
                  onChange={e => setlicense_id(e)}
                />
              </View>

              <View
                style={{flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
                <View style={{paddingTop: 30, width: '40%'}}>
                  <ModalCloseButton
                    label="CLOSE"
                    onPress={() => setopenCreate(false)}
                  />
                </View>
                <View style={{paddingTop: 30, width: '40%'}}>
                  {loading ? (
                    <ModalLoadingButton />
                  ) : (
                    <ModalButton label="ADD" onPress={handleDriverCreation} />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{position: 'absolute', bottom: 0, right: 0, left: 0}}>
        <SnackbarComponent
          message={message}
          onDismiss={() => setopenSnack(false)}
          onPress={() => setopenSnack(false)}
          visible={openSnack}
        />
      </View>
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
