import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  useColorScheme,
  ActivityIndicator,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import {Colors} from '../../common/Colors';
import TextInputComponent from '../../common/TextInputComponent';
import {
  AddButton,
  ModalButton,
  ModalCloseButton,
  ModalLoadingButton,
} from '../../common/Button';
import {Avatar, DataTable} from 'react-native-paper';
import {RegionData, Users} from '../../common/Data';
import Icon from 'react-native-vector-icons/AntDesign';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import AdminBus from '../../common/AdminBus';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {selectuser} from '../../../feature/slices/AuthSlice';
import {selectStation} from '../../../feature/slices/StationSlice';
import {BASEURL} from '../../common/BASEURL';
import {BusRentalType, BusType, rentalPriceType} from '../../common/Types';
import SnackbarComponent from '../../common/SnackbarComponent';
import {useFocusEffect} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from 'react-native';

export default function Buses() {
  const [openCreateBus, setopenCreateBus] = React.useState(false);
  const [openDelete, setopenDelete] = React.useState(false);
  const [deleteName, setdeleteName] = React.useState('');
  const [openDetail, setopenDetail] = React.useState(false);
  const [openBus, setopenBus] = React.useState(false);
  const [loadingCreate, setloadingCreate] = React.useState(false);
  const [loadingGet, setloadingGet] = React.useState(false);
  const [loadingDelete, setloadingDelete] = React.useState(false);
  const [loadingRental, setloadingRental] = React.useState(false);
  const [loadingPrice, setloadingPrice] = React.useState(false);
  const [loadingPriceData, setloadingPriceData] = React.useState(false);
  const [busData, setbusData] = React.useState<BusType[]>([]);
  const [openSnack, setopenSnack] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [selectedBus, setselectedBus] = React.useState<number | null>(null);
  const [phone_number, setphone_number] = React.useState('');
  const [whatsApp, setwhatsApp] = React.useState('');
  const [region, setregion] = React.useState('');
  const [price, setprice] = React.useState<number | null>(null);
  const [formIndex, setformIndex] = React.useState(0);
  const [rental_id, setrental_id] = React.useState<number | null>(null);
  const [rentalData, setrentalData] = React.useState<BusRentalType[]>([]);
  const [rentalPricesData, setrentalPricesData] = React.useState<
    rentalPriceType[]
  >([]);
  const [selectedRental, setselectedRental] =
    React.useState<BusRentalType | null>(null);

  const user = useSelector(selectuser);
  const station = useSelector(selectStation);
  const colorScheme = useColorScheme();

  console.log(user?.token);
  console.log(station?.id);

  const getBuses = () => {
    setloadingGet(true);
    axios
      .get(`${BASEURL}/station-bus/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setbusData(response?.data);
      })
      .catch(error => {
        if (error?.message) {
          setmessage(error?.message);
          setopenSnack(true);
        }
      })
      .finally(() => setloadingGet(false));
  };

  const handleAdminBusPress = (item: BusType) => {
    setselectedBus(item?.id);
    setopenBus(false);
  };

  const getStationRental = () => {
    setloadingRental(true);
    axios
      .get(`${BASEURL}/station-bus-rental/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setrentalData(response?.data);
        console.log(response.data);
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
      // Code to run when screen is focused
      getBuses();
      getStationRental();
      // getStationDriver();
      // getStationSchedule();
    }, []),
  );

  const handleRentalCreation = () => {
    if (!selectedBus) {
      setmessage('Select preferred bus');
      setopenSnack(true);
      return;
    } else if (!phone_number) {
      setmessage('Phone number is required');
      setopenSnack(true);
      return;
    }

    const body = {
      station: station?.id,
      bus: selectedBus,
      phone_number,
      whatsapp: whatsApp,
    };
    setloadingCreate(true);
    axios
      .post(`${BASEURL}/bus-rental`, body, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setformIndex(1);
        setselectedBus(null);
        setphone_number('');
        setwhatsApp('');
        setrental_id(response?.data?.id);
        console.log(response?.data);
      })
      .catch(error => {
        setopenSnack(true);
        setmessage(error?.message);
        console.log(error?.response?.data);
      })
      .finally(() => setloadingCreate(false));
  };

  const handlePriceCreation = () => {
    if (!region) {
      setmessage('Region is required');
      setopenSnack(true);
      return;
    } else if (!price) {
      setmessage('Price is required');
      setopenSnack(true);
      return;
    }
    const body = {
      price,
      destination: region,
      rental: rental_id,
    };
    setloadingPrice(true);
    axios
      .post(`${BASEURL}/rental-price`, body, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setprice(null);
        setregion('');
        setmessage('Price added successfully');
        setopenSnack(true);
      })
      .catch(error => {
        setmessage(error?.message);
        setopenSnack(true);
      })
      .finally(() => setloadingPrice(false));
  };

  const handleRentalDelete = () => {
    setloadingDelete(true);
    axios
      .delete(`${BASEURL}/delete-bus-rental/${selectedRental?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setmessage('Rental deleted successfully');
        setopenSnack(true);
        setopenDelete(false);
        setselectedRental(null);
        getStationRental();
      })
      .catch(error => {
        setmessage(error?.message);
        setopenSnack(true);
      })
      .finally(() => setloadingDelete(false));
  };

  const handleRentalPrices = (rental_id: number) => {
    setloadingPriceData(true);
    axios
      .get(`${BASEURL}/bus-rental-prices/${rental_id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setrentalPricesData(response.data);
      })
      .catch(error => {
        setmessage(error?.message);
        setopenSnack(true);
      })
      .finally(() => setloadingPriceData(false));
  };

  return (
    <View style={{height: '100%', paddingBottom: 120}}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
      <View style={{padding: 10, alignSelf: 'flex-end'}}>
        <AddButton label="Add rental" onPress={() => setopenCreateBus(true)} />
      </View>

      {loadingRental ? (
        <View
          style={{
            height: '70%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator animating color={Colors.primary} size={'large'} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {rentalData?.length === 0 ? (
            <View style={{justifyContent: "center",alignItems: "center",paddingTop: 100}}>
              <Image
                source={require('../../../assets/empty.png')}
                style={{height: 150, width: 150}}
              />
              <Text style={{color: Colors.gray,fontWeight: "600"}}>Rental Data is empty</Text>
            </View>
          ) : (
            <View style={{height: '100%'}}>
              <DataTable>
                <DataTable.Header
                  style={{
                    justifyContent: 'space-evenly',
                    backgroundColor: '#F0F7FD',
                  }}>
                  <DataTable.Title>
                    <Text style={styles.th}>Image</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text style={styles.th}>Phone</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text style={styles.th}>Action</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {rentalData?.map(item => (
                  <DataTable.Row
                    key={item?.id}
                    style={{borderBottomWidth: 0.5, borderColor: Colors.gray}}>
                    <DataTable.Cell>
                      <View style={{height: 50, width: 50, paddingVertical: 4}}>
                        <Avatar.Image
                          size={45}
                          source={{uri: item?.get_bus_image}}
                        />
                      </View>
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
                            setselectedRental(item);
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
                            setopenDetail(true);
                            setselectedRental(item);
                            handleRentalPrices(item?.id);
                          }}>
                          <Icon name="eye" size={20} color={Colors.primary} />
                        </TouchableOpacity>
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
          )}
        </ScrollView>
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
              Rental
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
                  <ModalButton label="CONFIRM" onPress={handleRentalDelete} />
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={openDetail}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Bus Information</Text>
            <View>
              <View style={{alignSelf: 'center'}}>
                <Avatar.Image
                  size={200}
                  source={{uri: selectedRental?.get_bus_image}}
                />
              </View>
              <Text
                style={{
                  color: Colors.black,
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 17,
                }}>
                {selectedRental?.get_bus_name}
              </Text>
              <Text
                style={{
                  color: Colors.primary,
                  textAlign: 'center',
                  paddingBottom: 10,
                  fontSize: 17,
                }}>
                {selectedRental?.get_car_number}
              </Text>
              <View style={{flexDirection: 'row', gap: 10, paddingLeft: 20}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Phone Number:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {selectedRental?.phone_number}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                padding: 5,
                color: Colors.black,
                paddingTop: 10,
                paddingLeft: 20,
              }}>
              PRICE DETAILS
            </Text>
            {loadingPriceData ? (
              <View
                style={{
                  height: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator
                  animating
                  color={Colors.primary}
                  size={'large'}
                />
              </View>
            ) : (
              <ScrollView
                style={{
                  paddingTop: 20,
                  paddingBottom: 100,
                  height: '50%',
                  width: '100%',
                }}>
                <DataTable style={{width: '100%', paddingBottom: 100}}>
                  <DataTable.Header
                    style={{
                      justifyContent: 'space-evenly',
                      backgroundColor: '#F0F7FD',
                    }}>
                    <DataTable.Title>
                      <Text style={styles.th}>Region</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                      <Text style={styles.th}>Amount / Day (&cent;)</Text>
                    </DataTable.Title>
                  </DataTable.Header>

                  {rentalPricesData.map(item => (
                    <DataTable.Row
                      key={item?.id}
                      style={{
                        borderBottomWidth: 0.5,
                        borderColor: Colors.gray,
                      }}>
                      <DataTable.Cell>
                        <Text style={{color: Colors.black}}>
                          {item?.destination}
                        </Text>
                      </DataTable.Cell>

                      <DataTable.Cell style={{justifyContent: 'center'}}>
                        <Text
                          style={{color: Colors.black, textAlign: 'center'}}>
                          {item?.price}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </ScrollView>
            )}
            <View style={{paddingTop: 20, width: '60%',position: "absolute",bottom: 20,left: 10}}>
              <ModalCloseButton
                label="CLOSE"
                onPress={() => setopenDetail(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="slide" visible={openCreateBus}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Add Bus</Text>

            {formIndex === 0 ? (
              <View style={{paddingHorizontal: 10}}>
                <View>
                  <TouchableOpacity
                    onPress={() => setopenBus(true)}
                    style={{
                      borderWidth: 1,
                      borderColor: Colors.gray,
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: Colors.gray}}>
                      {!selectedBus ? 'Select Bus' : 'Change Bus'}
                    </Text>
                  </TouchableOpacity>
                  <View style={{paddingTop: 10}}>
                    <TextInputComponent
                      label="Phone Number"
                      placeholder="Enter phone number"
                      keyboardType="phone-pad"
                      value={phone_number}
                      onChange={e => setphone_number(e)}
                    />
                  </View>
                  <View style={{paddingTop: 10}}>
                    <TextInputComponent
                      label="WhatsApp"
                      placeholder="Enter whatsApp number"
                      keyboardType="numeric"
                      value={whatsApp}
                      onChange={e => setwhatsApp(e)}
                    />
                  </View>
                </View>

                <View
                  style={{flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
                  <View style={{paddingTop: 30, width: '40%'}}>
                    <ModalCloseButton
                      label="CLOSE"
                      onPress={() => setopenCreateBus(false)}
                    />
                  </View>
                  <View style={{paddingTop: 30, width: '40%'}}>
                    {loadingCreate ? (
                      <ModalLoadingButton />
                    ) : (
                      <ModalButton label="ADD" onPress={handleRentalCreation} />
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <View>
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

                <View style={{paddingTop: 10}}>
                  <TextInputComponent
                    label="Amount"
                    placeholder="Enter the amount"
                    keyboardType="numeric"
                    value={price}
                    onChange={e => setprice(e)}
                  />
                </View>

                <View
                  style={{flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
                  <View style={{paddingTop: 30, width: '40%'}}>
                    <ModalCloseButton
                      label="DONE"
                      onPress={() => {
                        setopenCreateBus(false);
                        setformIndex(0);
                        setrental_id(null);
                        getStationRental();
                      }}
                    />
                  </View>
                  <View style={{paddingTop: 30, width: '40%'}}>
                    {loadingPrice ? (
                      <ModalLoadingButton />
                    ) : (
                      <ModalButton
                        label="ADD"
                        onPress={() => handlePriceCreation()}
                      />
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" visible={openBus}>
        <View style={styles.mainModalContainer}>
          <View style={styles.modalcontainer}>
            <View style={{paddingBottom: 100}}>
              <FlatList
                data={busData}
                renderItem={({item}) => (
                  <AdminBus
                    data={item}
                    onPress={() => handleAdminBusPress(item)}
                  />
                )}
              />

              <View style={{paddingVertical: 20, width: '40%'}}>
                <ModalCloseButton
                  label="CLOSE"
                  onPress={() => setopenBus(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View>
        <SnackbarComponent
          visible={openSnack}
          onDismiss={() => setopenSnack(false)}
          onPress={() => setopenSnack(false)}
          message={message}
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
  mainModalContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  picker: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    marginTop: 10,
  },
});
