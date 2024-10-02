import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
  useColorScheme,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';
import {Colors} from '../../components/common/Colors';
import {FlatList} from 'react-native';
import {
  AddButton,
  Button,
  ModalButton,
  ModalCloseButton,
  ModalLoadingButton,
} from '../../components/common/Button';
import {Picker} from '@react-native-picker/picker';
import {RouteData, Users} from '../../components/common/Data';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReadOnlyTextInput from '../../components/common/ReadOnlyTextInput';
import AdminBus from '../../components/common/AdminBus';
import TextInputComponent from '../../components/common/TextInputComponent';
import {DataTable} from 'react-native-paper';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';
import {useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import {selectStation} from '../../feature/slices/StationSlice';
import {
  BusType,
  DriverType,
  RouteType,
  scheduleType,
} from '../../components/common/Types';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AdminParams} from '../../components/navigation/RootParams';

type screenType = NativeStackNavigationProp<AdminParams>;

export default function Schedule() {
  const [headerIndex, setheaderIndex] = React.useState(0);
  const [openCreate, setopenCreate] = React.useState(false);
  const [route_id, setroute_id] = React.useState('');
  const [showTime, setshowTime] = React.useState(false);
  const [showDepartureTime, setshowDepartureTime] = React.useState(false);
  const [showDepartureDate, setshowDepartureDate] = React.useState(false);
  const [departureTime, setdepartureTime] = React.useState(new Date());
  const [arrivalTime, setarrivalTime] = React.useState(new Date());
  const [departureDate, setdepartureDate] = React.useState(new Date());
  const [bus_number, setbus_number] = React.useState('');
  const [openBus, setopenBus] = React.useState(false);
  const [openDetail, setopenDetail] = React.useState(false);
  const [routeData, setrouteData] = React.useState<RouteType[]>([]);
  const [message, setmessage] = React.useState('');
  const [openSnack, setopenSnack] = React.useState(false);
  const [loadingCreate, setloadingCreate] = React.useState(false);
  const [loadingUpdate, setloadingUpdate] = React.useState(false);
  const [openStatusModal, setopenStatusModal] = React.useState(false);
  const [loadingGet, setloadingGet] = React.useState(false);
  const [busData, setbusData] = React.useState<BusType[]>([]);
  const [driverData, setdriverData] = React.useState<DriverType[]>([]);
  const [scheduleData, setscheduleData] = React.useState<scheduleType[]>([]);
  const [selectedBus, setselectedBus] = React.useState<number | null>(null);
  const [selectedDriver, setselectedDriver] = React.useState<number | null>(
    null,
  );
  const [formIndex, setformIndex] = React.useState<number>(0);
  const [status, setstatus] = React.useState<string>('');
  const [amount, setamount] = React.useState('');
  const [selectedScheduleData, setselectedScheduleData] =
    React.useState<scheduleType | null>(null);

  const date = new Date();
  const colorScheme = useColorScheme();
  const user = useSelector(selectuser);
  const station = useSelector(selectStation);
  const navigation = useNavigation<screenType>();

  const headerData = [
    {id: 1, label: 'All', value: ''},
    {id: 2, label: 'On going', value: 'on_going'},
    {id: 3, label: 'Completed', value: 'completed'},
  ];

  const ScheduleStatus = [
    {label: 'On going', value: 'on_going'},
    {label: 'Completed', value: 'completed'},
  ];

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || arrivalTime;

    setshowTime(false);
    setarrivalTime(currentTime);
  };

  const onChangeDepartureTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || departureTime;
    setshowDepartureTime(false);
    setdepartureTime(currentTime);
  };

  const onChangeDepartureDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || departureTime;
    setshowDepartureDate(false);
    setdepartureDate(currentDate);
  };

  const getStationRoute = () => {
    axios
      .get(`${BASEURL}/station-routes/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setrouteData(response?.data);
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage('Unable to load routes');
        }
      });
  };

  const getStationBuses = () => {
    axios
      .get(`${BASEURL}/station-bus/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setbusData(response?.data);
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage('Unable to load buses');
        }
      });
  };

  const getStationDriver = () => {
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
      });
  };

  const getStationSchedule = () => {
    setloadingGet(true);
    axios
      .get(`${BASEURL}/station-schedule/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setscheduleData(response?.data);
        console.log(response?.data);
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setloadingGet(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when screen is focused
      if (station?.id) {
        getStationRoute();
        getStationBuses();
        getStationDriver();
        getStationSchedule();
      }
      setheaderIndex(1);
      
    }, []),
  );

  const handleAdminBusPress = (item: BusType) => {
    setselectedBus(item?.id);
    setopenBus(false);
  };

  const createSchedule = () => {
    if (!route_id) {
      setmessage('Select destination for schedule');
      setopenSnack(true);
      return;
    } else if (!selectedBus) {
      setmessage('Select bus for schedule');
      setopenSnack(true);
      return;
    } else if (!selectedDriver) {
      setmessage('Select driver for schedule');
      setopenSnack(true);
      return;
    } else if (!amount) {
      setmessage('Amount is required for schedule');
      setopenSnack(true);
      return;
    }
    const body = {
      station: station?.id,
      destination: Number(route_id),
      bus: selectedBus,
      departure_time: departureTime?.toTimeString().split(' ')[0],
      arrival_time: arrivalTime?.toTimeString().split(' ')[0],
      driver: selectedDriver,
      amount: Number(amount),
      status: 'on_going',
      departure_date: departureDate?.toISOString().split('T')[0],
    };

    setloadingCreate(true);
    axios
      .post(`${BASEURL}/schedule`, body, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setopenSnack(true);
        setmessage('Schedule created successfully');
        setopenCreate(false);
        setroute_id('');
        setselectedBus(null);
        setselectedDriver(null);
        setamount('');
        setformIndex(0);
        getStationSchedule();
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setloadingCreate(false));
  };

  const updateScheduleStatus = () => {
    const body = {
      status: status,
    };

    setloadingUpdate(true);
    axios
      .patch(`${BASEURL}/schedule/${selectedScheduleData?.id}`, body, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setopenSnack(true);
        setmessage('Schedule updated successfully');
        setopenStatusModal(false);
        getStationSchedule();
        setstatus('');
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setloadingUpdate(false));
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar
        backgroundColor={openCreate ? 'rgba(0, 0, 0, 0.5)' : 'transparent'}
      />
      <View style={{alignSelf: 'flex-end', paddingRight: 10, marginBottom: 10}}>
        <AddButton label="Add schedule" onPress={() => setopenCreate(true)} />
      </View>
      <View style={styles.header}>
        {headerData?.map((item) => (
          <TouchableOpacity
          key={item?.id}
          onPress={() => setheaderIndex(item?.id)}
          style={[
            styles.headerBtn,
            headerIndex === item?.id && styles.activeheader,
          ]}>
          <Text
            style={
              headerIndex === item?.id
                ? styles.activeheaderBtnText
                : styles.headerBtnText
            }>
            {item.label}
          </Text>
        </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={{paddingTop: 20}}>
        <DataTable>
          <DataTable.Header
            style={{
              justifyContent: 'space-evenly',
              backgroundColor: '#F0F7FD',
            }}>
            <DataTable.Title>
              <Text style={styles.th}>Destination</Text>
            </DataTable.Title>

            <DataTable.Title>
              <Text style={styles.th}>Amount</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.th}>Status</Text>
            </DataTable.Title>
          </DataTable.Header>

          {loadingGet ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <ActivityIndicator
                animating
                size={'large'}
                color={Colors.primary}
              />
            </View>
          ) : (
            <View>
              {scheduleData?.length === 0 ? (
                <View
                  style={{
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 50,
                  }}>
                  <Image
                    source={require('../../assets/empty.png')}
                    style={{height: 150, width: 150}}
                  />
                  <Text style={{color: Colors.gray, fontWeight: '600'}}>
                    No Available Schedule
                  </Text>
                </View>
              ) : (
                <>
                  {headerIndex === 1 ? (
                    <View>
                      {scheduleData.map(item => (
                        <DataTable.Row
                          key={item?.id}
                          onPress={() => {
                            setselectedScheduleData(item);
                            setopenDetail(true);
                          }}>
                          <DataTable.Cell>
                            <Text style={{color: Colors.black}}>
                              {item?.get_destination}
                            </Text>
                          </DataTable.Cell>

                          <DataTable.Cell>
                            <Text style={{color: Colors.black}}>
                              GHC {item?.amount}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell>
                            <View
                              style={{
                                backgroundColor:
                                  item?.status === 'on_going'
                                    ? Colors.gray
                                    : Colors.primary,
                                paddingVertical: 2,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                              }}>
                              <Text style={{color: Colors.white}}>
                                {item?.status === 'on_going'
                                  ? 'On going'
                                  : 'Completed'}
                              </Text>
                            </View>
                          </DataTable.Cell>
                        </DataTable.Row>
                      ))}
                    </View>
                  ) : headerIndex === 2 ? (
                    <View>
                      {scheduleData
                        .filter(item => item?.status === 'on_going')
                        .map(item => (
                          <DataTable.Row
                            key={item?.id}
                            onPress={() => {
                              setselectedScheduleData(item);
                              setopenDetail(true);
                            }}>
                            <DataTable.Cell>
                              <Text style={{color: Colors.black}}>
                                {item?.get_destination}
                              </Text>
                            </DataTable.Cell>

                            <DataTable.Cell>
                              <Text style={{color: Colors.black}}>
                                GHC {item?.amount}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell>
                              <View
                                style={{
                                  backgroundColor:
                                    item?.status === 'on_going'
                                      ? Colors.gray
                                      : Colors.primary,
                                  paddingVertical: 2,
                                  borderRadius: 10,
                                  paddingHorizontal: 10,
                                }}>
                                <Text style={{color: Colors.white}}>
                                  {item?.status === 'on_going'
                                    ? 'On going'
                                    : 'Completed'}
                                </Text>
                              </View>
                            </DataTable.Cell>
                          </DataTable.Row>
                        ))}
                    </View>
                  ) : (
                    headerIndex === 3 && (
                      <View>
                        {scheduleData
                          .filter(item => item?.status === 'completed')
                          .map(item => (
                            <DataTable.Row
                              key={item?.id}
                              onPress={() => {
                                setselectedScheduleData(item);
                                setopenDetail(true);
                              }}>
                              <DataTable.Cell>
                                <Text style={{color: Colors.black}}>
                                  {item?.get_destination}
                                </Text>
                              </DataTable.Cell>

                              <DataTable.Cell>
                                <Text style={{color: Colors.black}}>
                                  GHC {item?.amount}
                                </Text>
                              </DataTable.Cell>
                              <DataTable.Cell>
                                <View
                                  style={{
                                    backgroundColor:
                                      item?.status === 'on_going'
                                        ? Colors.gray
                                        : Colors.primary,
                                    paddingVertical: 2,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                  }}>
                                  <Text style={{color: Colors.white}}>
                                    {item?.status === 'on_going'
                                      ? 'On going'
                                      : 'Completed'}
                                  </Text>
                                </View>
                              </DataTable.Cell>
                            </DataTable.Row>
                          ))}
                      </View>
                    )
                  )}
                </>
              )}
            </View>
          )}
        </DataTable>
      </ScrollView>

      <Modal animationType="slide" transparent visible={openCreate}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Add schedule</Text>
            <View>
              {formIndex === 0 ? (
                <View>
                  <View style={styles.picker}>
                    <Picker
                      style={{color: Colors.gray}}
                      selectedValue={route_id}
                      onValueChange={itemValue => setroute_id(itemValue)}>
                      <Picker.Item
                        label={'Select destination'}
                        value={''}
                        style={{color: Colors.gray}}
                      />
                      {routeData.map((item, index) => (
                        <Picker.Item
                          label={item.route_name}
                          value={item.id}
                          key={item?.id}
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
                  <View style={{paddingTop: 4}}>
                    <ReadOnlyTextInput
                      label="Departure Time"
                      value={departureTime?.toLocaleTimeString()}
                    />
                  </View>
                  <View style={{paddingTop: 4}}>
                    <ReadOnlyTextInput
                      label="Arrival Time"
                      value={arrivalTime?.toLocaleTimeString()}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}>
                    <ModalButton
                      label="Departure Time"
                      onPress={() => setshowDepartureTime(true)}
                    />
                    <ModalCloseButton
                      label="Arrival Time"
                      onPress={() => setshowTime(true)}
                    />
                  </View>

                  <View
                    style={{
                      paddingTop: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: '40%'}}>
                      <ModalCloseButton
                        label="CLOSE"
                        onPress={() => setopenCreate(false)}
                      />
                    </View>
                    <View style={{width: '40%'}}>
                      <ModalButton
                        label="NEXT"
                        onPress={() => setformIndex(1)}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <TouchableOpacity onPress={() => setopenBus(true)}>
                    <ReadOnlyTextInput
                      label={selectedBus ? 'Change bus' : 'Select Bus'}
                      value={bus_number}
                    />
                  </TouchableOpacity>

                  <View style={styles.picker}>
                    <Picker
                      style={{color: Colors.gray}}
                      selectedValue={selectedDriver}
                      onValueChange={itemValue => setselectedDriver(itemValue)}>
                      <Picker.Item
                        label={'Select Driver'}
                        value={''}
                        color={Colors.gray}
                      />
                      {driverData.map(item => (
                        <Picker.Item
                          label={`${item.first_name} ${item.last_name}`}
                          value={item.id}
                          key={item?.id}
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

                  <View style={{paddingTop: 4}}>
                    <ReadOnlyTextInput
                      label="Departure Date"
                      value={departureDate?.toLocaleDateString()}
                    />
                  </View>
                  <View
                    style={{
                      paddingVertical: 10,
                    }}>
                    <ModalCloseButton
                      label="Departure Date"
                      onPress={() => setshowDepartureDate(true)}
                    />
                  </View>

                  <TextInputComponent
                    keyboardType="number-pad"
                    label="Amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={e => setamount(e)}
                  />

                  <View
                    style={{
                      paddingTop: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: '40%'}}>
                      <ModalCloseButton
                        label="BACK"
                        onPress={() => setformIndex(0)}
                      />
                    </View>
                    <View style={{width: '40%'}}>
                      {loadingCreate ? (
                        <ModalLoadingButton />
                      ) : (
                        <ModalButton label="ADD" onPress={createSchedule} />
                      )}
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={openDetail}>
        <View style={styles.mainModalContainer}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Schedule Details</Text>
            <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
              <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                Destination:
              </Text>
              <Text style={{color: Colors.gray, fontSize: 16}}>
                {selectedScheduleData?.get_destination}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
              <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                Departure Time:
              </Text>
              <Text style={{color: Colors.gray, fontSize: 16}}>
                {' '}
                {moment(
                  selectedScheduleData?.departure_time,
                  'HH:mm:ss',
                ).format('h:mm A')}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
              <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                Apprival Time:
              </Text>
              <Text style={{color: Colors.gray, fontSize: 16}}>
                {' '}
                {moment(selectedScheduleData?.arrival_time, 'HH:mm:ss').format(
                  'h:mm A',
                )}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
              <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                Amount:
              </Text>
              <Text style={{color: Colors.gray, fontSize: 16}}>
                GHC {selectedScheduleData?.amount}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
              <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                Date:
              </Text>
              <View style={{width: '50%'}}>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  {moment(
                    selectedScheduleData?.departure_date,
                    'YYYY-MM-DD',
                  ).format('dddd, MMMM Do YYYY')}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
              <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                Status:
              </Text>
              <Text style={{color: Colors.gray, fontSize: 16}}>
                {selectedScheduleData?.status === 'on_going' && 'On going'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View style={{width: '40%'}}>
                <ModalCloseButton
                  label="CLOSE"
                  onPress={() => setopenDetail(false)}
                />
              </View>
              <View style={{width: '40%'}}>
                <ModalButton
                  label="STATUS"
                  onPress={() => {
                    setopenDetail(false);
                    setopenStatusModal(true);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bus modal */}
      <Modal animationType="slide" visible={openBus}>
        <View style={styles.mainModalContainer}>
          <View style={styles.modalcontainer}>
            {busData?.length === 0 ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/empty.png')}
                  style={{height: 150, width: 150}}
                />
                <Text
                  style={{
                    color: Colors.gray,
                    fontSize: 16,
                    fontWeight: '600',
                    paddingBottom: 20,
                  }}>
                  No Bus Available
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{paddingVertical: 20, width: '40%'}}>
                    <ModalCloseButton
                      label="CLOSE"
                      onPress={() => setopenBus(false)}
                    />
                  </View>
                  <View style={{paddingVertical: 20, width: '40%'}}>
                    <ModalButton
                      label="ADD BUS"
                      onPress={() => navigation.navigate('buses')}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View style={{paddingBottom: 100, paddingTop: 40}}>
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
            )}
          </View>
        </View>
      </Modal>

      {/* Status Modal */}
      <Modal visible={openStatusModal} animationType="slide" transparent>
        <View style={styles.mainModalContainer}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Change Status</Text>

            <View style={styles.picker}>
              <Picker
                style={{color: Colors.gray}}
                selectedValue={status}
                onValueChange={itemValue => setstatus(itemValue)}>
                <Picker.Item
                  label={'Select Status'}
                  value={''}
                  color={Colors.gray}
                />
                {ScheduleStatus.map((item, index) => (
                  <Picker.Item
                    label={item?.label}
                    value={item.value}
                    key={index}
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                  />
                ))}
              </Picker>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View style={{width: '40%'}}>
                <ModalCloseButton
                  label="CLOSE"
                  onPress={() => {
                    setopenStatusModal(false);
                    setopenDetail(true);
                  }}
                />
              </View>
              <View style={{width: '40%'}}>
                {selectedScheduleData?.status === status || status === '' ? (
                  <ModalButton
                    label="UPDATE"
                    onPress={() => {
                      setopenStatusModal(false);
                    }}
                  />
                ) : (
                  <>
                    {loadingUpdate ? (
                      <ModalLoadingButton />
                    ) : (
                      <ModalButton
                        label="UPDATE"
                        onPress={updateScheduleStatus}
                      />
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Time picker */}
      {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={arrivalTime}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      {showDepartureTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={departureTime}
          mode="time"
          display="default"
          onChange={onChangeDepartureTime}
        />
      )}

      {showDepartureDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={departureTime}
          mode="date"
          display="default"
          onChange={onChangeDepartureDate}
        />
      )}

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
    elevation: 4,
    backgroundColor: Colors.white,
    margin: 10,
    borderRadius: 10,
    width: '100%',
  },
  headerBtnText: {color: Colors.gray, fontSize: 16},
  activeheaderBtnText: {color: Colors.white},
  headerBtn: {
    paddingHorizontal: 14,
    borderRadius: 20,
    paddingVertical: 5,
  },
  activeheader: {
    backgroundColor: Colors.primary,
  },
  mainModalContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
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
  picker: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    marginTop: 10,
  },
  th: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
