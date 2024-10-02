import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  useColorScheme,
  ActivityIndicator,
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
import {Picker} from '@react-native-picker/picker';
import {RegionData, RouteData} from '../../common/Data';
import axios from 'axios';
import {BASEURL} from '../../common/BASEURL';
import {useSelector} from 'react-redux';
import {selectuser} from '../../../feature/slices/AuthSlice';
import {selectStation} from '../../../feature/slices/StationSlice';
import SnackbarComponent from '../../common/SnackbarComponent';
import {useFocusEffect} from '@react-navigation/native';
import {RouteType} from '../../common/Types';

export default function Routes() {
  const [openEdit, setopenEdit] = React.useState(false);
  const [openDelete, setopenDelete] = React.useState(false);
  const [openCreate, setopenCreate] = React.useState(false);
  const [deleteName, setdeleteName] = React.useState('');

  const [message, setmessage] = React.useState('');
  const [openSnack, setopenSnack] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [loadingEdit, setloadingEdit] = React.useState(false);
  const [getloading, setgetloading] = React.useState(false);
  const [loadingDelete, setloadingDelete] = React.useState(false);
  const [routeData, setrouteData] = React.useState<RouteType[]>([]);
  const [selectedRouteData, setselectedRouteData] =
    React.useState<RouteType | null>(null);

  const user = useSelector(selectuser);
  const station = useSelector(selectStation);

  const [route_name, setroute_name] = React.useState<string>('');
  const [region, setregion] = React.useState<string>('');
  const colorScheme = useColorScheme();

  const handleRouteCreation = () => {
    if (!route_name) {
      setopenSnack(true);
      setmessage('Route name is required');
      return;
    } else if (!region) {
      setopenSnack(true);
      setmessage('Region is required');
      return;
    }
    const body = {
      route_name,
      region,
      station: station?.id,
    };
    setloading(true);
    axios
      .post(`${BASEURL}/create-bus-route`, body, {
        headers: {
          Authorization: `token ${user?.token}`,
        },
      })
      .then(response => {
        setopenSnack(true);
        setmessage('Route added successfully.');
        setroute_name('');
        setregion('');
        setopenCreate(false);
        getStationRoute();
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

  const handleRouteUpdate = () => {
    if (!route_name) {
      setopenSnack(true);
      setmessage('Route name is required');
      return;
    } else if (!region) {
      setopenSnack(true);
      setmessage('Region is required');
      return;
    }
    const body = {
      route_name,
      region,
      station: station?.id,
    };
    setloadingEdit(true);
    axios
      .patch(`${BASEURL}/bus-route-details/${selectedRouteData?.id}`, body, {
        headers: {
          Authorization: `token ${user?.token}`,
        },
      })
      .then(response => {
        setopenSnack(true);
        setmessage('Route updated successfully.');
        setroute_name('');
        setregion('');
        setopenEdit(false);
        getStationRoute();
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setloadingEdit(false));
  };

  const getStationRoute = () => {
    setgetloading(true);
    axios
      .get(`${BASEURL}/station-routes/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        console.log(response.data);
        setrouteData(response?.data);
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


  const handleRouteDelete = () => {
    setloadingDelete(true);
    axios
      .delete(`${BASEURL}/bus-route-details/${selectedRouteData?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setopenSnack(true);
        setmessage('Route successfully deleted');
        setselectedRouteData(null);
        setopenDelete(false);
        getStationRoute();
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
      getStationRoute();
    }, []),
  );

  return (
    <View style={{height: '90%'}}>
      <View style={{alignSelf: 'flex-end', padding: 10, marginBottom: 10}}>
        <AddButton label="Add Route" onPress={() => setopenCreate(true)} />
      </View>

      {getloading ? (
        <View
          style={{
            height: '70%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator animating size={'large'} color={Colors.primary} />
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
              <Text style={styles.th}>Region</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.th}>Action</Text>
            </DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={routeData}
            keyExtractor={item => item?.id.toLocaleString()}
            renderItem={({item}) => (
              <DataTable.Row
                style={{borderBottomWidth: 0.5, borderColor: Colors.gray}}>
                <DataTable.Cell>
                  <Text style={{color: Colors.black}}>{item?.route_name}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: Colors.black}}>{item?.region}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => {
                        setselectedRouteData(item);
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
                        setselectedRouteData(item);
                        setroute_name(item?.route_name);
                        setregion(item?.region);
                        setopenEdit(true);
                      }}>
                      <Icon name="edit" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            )}
          />
        </DataTable>
      )}

      <Modal transparent animationType="slide" visible={openDelete}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
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
              {selectedRouteData?.route_name}
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
                  <ModalButton label="CONFIRM" onPress={handleRouteDelete} />
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="slide" visible={openEdit}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.textHeading}>Edit Route</Text>
            <View style={{paddingHorizontal: 10}}>
              <View>
                <TextInputComponent
                  label="Name of Route"
                  keyboardType="default"
                  placeholder="Enter route"
                  value={route_name}
                  onChange={e => setroute_name(e)}
                />
                <View style={styles.picker}>
                  <Picker
                  style={{color: Colors.gray}}
                    selectedValue={region}
                    onValueChange={itemValue => setregion(itemValue)}>
                    <Picker.Item
                      style={{color: Colors.gray}}
                      label={'Select region'}
                      value={''}
                    />
                    {RegionData.map((item, index) => (
                      <Picker.Item
                        label={item.label}
                        value={item.value}
                        key={index}
                        style={{
                          color:
                            colorScheme === 'dark'
                              ? Colors.white
                              : Colors.black,
                        }}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View
                style={{flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
                <View style={{paddingTop: 30, width: '40%'}}>
                  <ModalCloseButton
                    label="CLOSE"
                    onPress={() => {
                      setroute_name("");
                      setregion("");
                      setopenEdit(false);
                    }}
                  />
                </View>
                <View style={{paddingTop: 30, width: '40%'}}>
                  {loadingEdit ? (
                    <ModalLoadingButton />
                  ) : (
                    <ModalButton label="UPDATE" onPress={handleRouteUpdate} />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={openCreate}
        animationType="slide"
        onRequestClose={() => setopenCreate(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.textHeading}>Route</Text>

            <View style={{paddingHorizontal: 10}}>
              <View>
                <TextInputComponent
                  label="Name of Route"
                  keyboardType="default"
                  placeholder="Enter route"
                  value={route_name}
                  onChange={e => setroute_name(e)}
                />
                <View style={styles.picker}>
                  <Picker
                  style={{color: Colors.gray}}
                    selectedValue={region}
                    onValueChange={itemValue => setregion(itemValue)}>
                    <Picker.Item label={'Select region'} value={''} />
                    {RegionData.map((item, index) => (
                      <Picker.Item
                        label={item.label}
                        value={item.value}
                        key={index}
                        style={{
                          color:
                            colorScheme === 'dark'
                              ? Colors.white
                              : Colors.black,
                        }}
                      />
                    ))}
                  </Picker>
                </View>
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
                    <ModalButton label="ADD" onPress={handleRouteCreation} />
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
  modalContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  modal: {
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
  picker: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    marginTop: 10,
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
