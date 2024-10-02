import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {Colors} from '../../common/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AddButton,
  ModalButton,
  ModalCloseButton,
  ModalLoadingButton,
} from '../../common/Button';
import TextInputComponent from '../../common/TextInputComponent';
import PasswordInputComponent from '../../common/PasswordComponent';
import axios from 'axios';
import {BASEURL} from '../../common/BASEURL';
import {useSelector} from 'react-redux';
import {selectuser} from '../../../feature/slices/AuthSlice';
import SnackbarComponent from '../../common/SnackbarComponent';
import {selectStation} from '../../../feature/slices/StationSlice';
import {useFocusEffect} from '@react-navigation/native';
import {AdminType} from '../../common/Types';

export default function Admin() {
  const [openDetail, setopenDetail] = React.useState(false);
  const [openDelete, setopenDelete] = React.useState(false);
  const [openCreate, setopenCreate] = React.useState(false);

  const [first_name, setfirst_name] = React.useState('');
  const [last_name, setlast_name] = React.useState('');
  const [phone_number, setphone_number] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [confirm_password, setconfirm_password] = React.useState('');
  const [message, setmessage] = React.useState('');
  const [openSnack, setopenSnack] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [getloading, setgetloading] = React.useState(false);
  const [loadingDelete, setloadingDelete] = React.useState(false);
  const [adminData, setadminData] = React.useState<AdminType[]>([]);
  const [selectedadminData, setselectedadminData] =
    React.useState<AdminType | null>(null);

  const user = useSelector(selectuser);
  const station = useSelector(selectStation);

  const getStationMasters = () => {
    setgetloading(true);
    axios
      .get(`${BASEURL}/account/get-station-admin/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setadminData(response?.data);
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

  const handleAdminCreation = () => {
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
    } else if (!password) {
      setopenSnack(true);
      setmessage('Password is required');
      return;
    } else if (!confirm_password) {
      setopenSnack(true);
      setmessage('Confirm your password');
      return;
    }
    const body = {
      first_name,
      last_name,
      phone_number,
      password,
      password2: confirm_password,
      user_type: 'admin',
      station: station?.id,
    };
    setloading(true);
    axios
      .post(`${BASEURL}/account/create-admin`, body, {
        headers: {
          Authorization: `token ${user?.token}`,
        },
      })
      .then(response => {
        setopenSnack(true);
        setmessage('Admin has been added successfully.');
        setfirst_name('');
        setlast_name('');
        setphone_number('');
        setpassword('');
        setconfirm_password('');
        setopenCreate(false);
        getStationMasters();
      })
      .catch(error => {
        if (error?.response?.data) {
          if (error?.response?.data?.phone_number) {
            setopenSnack(true);
            setmessage(error?.response?.data?.phone_number[0]);
          }
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setloading(false));
  };

  const handleAdminDelete = () => {
    setloadingDelete(true);
    axios
      .delete(`${BASEURL}/account/delete-admin/${selectedadminData?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setopenSnack(true);
        setmessage('Admin successfully deleted');
        setselectedadminData(null);
        setopenDelete(false);
        getStationMasters();
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
      getStationMasters();
    }, []),
  );

  return (
    <View style={{backgroundColor: Colors.white, height: '90%'}}>
      <View style={{alignSelf: 'flex-end', padding: 10, marginBottom: 10}}>
        <AddButton label="Add Admin" onPress={() => setopenCreate(true)} />
      </View>

      {getloading ? (
        <View
          style={{
            height: '60%',
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

          <View>
            {adminData?.length === 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '70%',
                }}>
                <Image
                  source={require('../../../assets/empty.png')}
                  style={{height: 150, width: 150}}
                />
                <Text style={{fontWeight: "600",color: Colors.gray,fontSize: 17}}>Admin Data is empty</Text>
              </View>
            ) : (
              <FlatList
                data={adminData}
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
                            setselectedadminData(item);
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
                            setselectedadminData(item);
                            setopenDetail(true);
                          }}>
                          <Icon name="eye" size={20} color={Colors.primary} />
                        </TouchableOpacity>
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
              />
            )}
          </View>
        </DataTable>
      )}

      <Modal transparent animationType="slide" visible={openDelete}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
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
              {selectedadminData?.first_name} {selectedadminData?.last_name}
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
                  <ModalButton label="CONFIRM" onPress={handleAdminDelete} />
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Admin Information</Text>
            <View style={{paddingHorizontal: 10}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  First Name:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedadminData?.first_name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Last Name:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedadminData?.last_name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Phone Number:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedadminData?.phone_number}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Role:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>
                  Administrator
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

      <Modal transparent animationType="slide" visible={openCreate}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Add Admin</Text>

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
                <View style={{marginVertical: 10}}>
                  <PasswordInputComponent
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setpassword(e)}
                  />
                </View>
                <PasswordInputComponent
                  label="Confirm Password"
                  placeholder="Re-type password"
                  value={confirm_password}
                  onChange={e => setconfirm_password(e)}
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
                    <ModalButton label="ADD" onPress={handleAdminCreation} />
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
