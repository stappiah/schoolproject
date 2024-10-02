import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native';
import React from 'react';
import {Colors} from '../../components/common/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MC from 'react-native-vector-icons/MaterialCommunityIcons';
import Antd from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  BottomTabType,
  RootParams,
} from '../../components/navigation/RootParams';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import TextInputComponent from '../../components/common/TextInputComponent';
import {
  Button,
  ModalButton,
  ModalCloseButton,
} from '../../components/common/Button';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import {
  BusType,
  scheduleReservation,
  scheduleType,
} from '../../components/common/Types';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';
import {useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import {Paystack, paystackProps} from 'react-native-paystack-webview';

type navType = NativeStackNavigationProp<RootParams>;
type tabType = NativeStackNavigationProp<BottomTabType>;

export default function TransportDetails({route}: any) {
  const navigation = useNavigation<navType>();
  const tab = useNavigation<tabType>();
  const {width, height} = Dimensions.get('window');
  const scheduleData: scheduleType = route?.params?.schedule_detail;
  const user = useSelector(selectuser);
  const paystackWebViewRef = React.useRef<paystackProps.PayStackRef>();

  const [openSnack, setopenSnack] = React.useState(false);
  const [openBook, setopenBook] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [full_name, setfull_name] = React.useState('');
  const [phone_number, setphone_number] = React.useState('');
  const [email, setemail] = React.useState('');
  const [selected_seat, setselected_seat] = React.useState<number | null>(null);
  const [openPayment, setopenPayment] = React.useState(false);
  const [confirm, setconfirm] = React.useState(false);
  const [reservationData, setreservationData] = React.useState<
    scheduleReservation[]
  >([]);
  const [busDetail, setbusDetail] = React.useState<BusType | null>(null);

  const handleSeatList = (seatNumber: number): {value: number}[] => {
    return Array.from({length: seatNumber}, (_, index) => ({value: index + 1}));
  };
  const selectedData: number[] = [];
  const seat_number = handleSeatList(scheduleData?.seat_number);

  const seatTakenFunction = (seat_number: number) => {
    setopenSnack(true);
    setmessage(`Seat number ${seat_number} is taken`);
  };

  const handleReservation = () => {
    const body = {
      full_name,
      phone_number,
      email,
      schedule: scheduleData?.id,
      seat_number: selected_seat,
    };
    axios
      .post(`${BASEURL}/create-reservation`, body, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {})
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      });
  };

  const handlePayment = () => {
    const body = {
      full_name,
      phone_number,
      email,
      amount: Number(scheduleData?.amount),
    };
    axios
      .post(`${BASEURL}/create-payment`, body, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        tab?.navigate('receipt');
        setopenPayment(false);
        setopenBook(false);
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

  const handleScheduleReservation = () => {
    axios
      .get(`${BASEURL}/schedule-reservation/${scheduleData?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        const data = response?.data;
        setreservationData(data);
        // Check if data exists and is an array before iterating
        if (Array.isArray(data)) {
          data.forEach(item => {
            selectedData.push(item.seat_number); // Push seat_number to selectedData array
          });
        }
      });
  };

  const handleBusDetails = () => {
    axios
      .get(`${BASEURL}/get-bus/${scheduleData?.bus}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        console.log(response.data);
        setbusDetail(response.data);
      })
      .catch(error => {
        console.log(error?.message);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      handleScheduleReservation();
      handleBusDetails();
      console.log('ddd...', scheduleData);
    }, []),
  );

  return (
    <>
      <View style={{height: height}}>
        <View style={{height: height / 2.5, width: width}}>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={'light-content'}
            translucent
          />
          {busDetail?.bus_image && (
            <Image
              source={{uri: busDetail?.bus_image}}
              style={{height: '100%', width: '100%', resizeMode: 'cover'}}
            />
          )}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={17} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{color: Colors.black, fontWeight: '600', fontSize: 17}}>
              {scheduleData?.get_station}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: 'bold',
                  paddingBottom: 5,
                  fontSize: 20,
                }}>
                &cent;
              </Text>
              <Text
                style={{color: Colors.black, fontSize: 18, fontWeight: '600'}}>
                {scheduleData?.amount}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: Colors.gray,
                fontWeight: '600',
                paddingTop: 5,
                fontSize: 17,
              }}>
              Car Number
            </Text>
            <Text style={{color: Colors.gray}}>{scheduleData?.car_number}</Text>
          </View>

          <View>
            <Text
              style={{
                color: Colors.gray,
                fontWeight: '600',
                paddingTop: 5,
                fontSize: 17,
              }}>
              Destination
            </Text>
            <Text style={{color: Colors.gray}}>
              {scheduleData?.get_destination}
            </Text>
          </View>

          <View style={{paddingTop: 10}}>
            <Text style={{color: Colors.gray}}>
              The world is a book, and those who do not travel read only one
              page.
              – Saint Augustine
            </Text>
          </View>

          <Text
            style={{
              fontWeight: '600',
              color: Colors.black,
              paddingTop: 15,
              paddingBottom: 10,
            }}>
            SPECIFICATIONS
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 15,
              gap: 20,
            }}>
            <TouchableOpacity style={styles.iconCard}>
              <View
                style={{
                  backgroundColor: Colors.light,
                  padding: 3,
                  borderRadius: 20,
                }}>
                <MC name="car-seat" size={20} color={Colors.primary} />
              </View>
              <Text style={{color: Colors.black, fontSize: 17}}>
                {scheduleData?.seat_number} Seats
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCard}>
              <View
                style={{
                  backgroundColor: Colors.light,
                  padding: 3,
                  borderRadius: 20,
                }}>
                <MC name="car-seat" size={20} color={Colors.primary} />
              </View>
              <Text style={{color: Colors.black, fontSize: 17}}>
                {scheduleData?.gear_type === 'auto' ? 'Automatic' : 'Manual'}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 20,
            }}>
            <TouchableOpacity style={styles.iconCard}>
              <View
                style={{
                  backgroundColor: Colors.light,
                  padding: 3,
                  borderRadius: 20,
                }}>
                <MC name="fuel" size={20} color={Colors.primary} />
              </View>
              <Text style={{color: Colors.black, fontSize: 17}}>
                {scheduleData?.fuel_type === 'petrol' ? 'Petrol' : 'Diesel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCard}>
              <View
                style={{
                  backgroundColor: Colors.light,
                  padding: 3,
                  borderRadius: 30,
                }}>
                <MC name="google-maps" size={20} color={Colors.primary} />
              </View>
              <Text style={{color: Colors.black, fontSize: 17}}>
                {scheduleData?.station_address}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => setopenBook(true)}>
            <Text
              style={{
                color: Colors.white,
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 17,
              }}>
              Book Now
            </Text>
          </TouchableOpacity>
          <SnackbarComponent
            visible={openSnack}
            message={message}
            onDismiss={() => setopenSnack(false)}
            onPress={() => setopenSnack(false)}
          />
        </View>

        <Modal visible={openBook} transparent animationType="slide">
          <View
            style={{
              height: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              flex: 1,
            }}>
            <View style={styles.modalcontainer}>
              <View style={{paddingHorizontal: 5}}>
                <Text
                  style={{
                    color: Colors.black,
                    fontWeight: '600',
                    textAlign: 'center',
                    fontSize: 17,
                    paddingVertical: 10,
                  }}>
                  Make Reservation
                </Text>
                <View>
                  <TextInputComponent
                    label="Enter your name"
                    value={full_name}
                    onChange={e => setfull_name(e)}
                    keyboardType="default"
                    placeholder="Enter your full name"
                  />
                </View>
                <View>
                  <TextInputComponent
                    label="Enter phone number"
                    value={phone_number}
                    onChange={e => setphone_number(e)}
                    keyboardType="phone-pad"
                    placeholder="Enter your phone number"
                  />
                </View>
                <View>
                  <TextInputComponent
                    label="Enter email address"
                    value={email}
                    onChange={e => setemail(e)}
                    keyboardType="email-address"
                    placeholder="Enter your email address"
                  />
                </View>
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{
                      color: Colors.gray,
                      paddingVertical: 10,
                      fontWeight: '500',
                    }}>
                    Select seat number
                  </Text>
                  <FlatList
                    data={seat_number}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          reservationData?.find(
                            check => check.seat_number === item?.value,
                          )
                            ? seatTakenFunction(item.value)
                            : setselected_seat(item.value);
                        }}
                        style={[
                          reservationData?.find(
                            check => check.seat_number === item?.value,
                          )
                            ? styles.selected_seat
                            : selected_seat === item?.value
                            ? styles.current_seat
                            : styles.seat_number,
                        ]}>
                        <Text
                          style={[
                            styles.seat_text,
                            selected_seat === item?.value &&
                              styles.current_text,
                          ]}>
                          {item.value}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <View
                  style={{
                    paddingTop: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <View style={{width: '45%'}}>
                    <ModalCloseButton
                      label="CLOSE"
                      onPress={() => setopenBook(false)}
                    />
                  </View>
                  <View style={{width: '45%'}}>
                    <ModalButton
                      label="RESERVE NOW"
                      onPress={() => {
                        if (!full_name) {
                          setopenSnack(true);
                          setmessage('Full name is required');
                          return;
                        } else if (!phone_number) {
                          setopenSnack(true);
                          setmessage('Phone number is required');
                          return;
                        } else if (!email) {
                          setopenSnack(true);
                          setmessage('Email address is required');
                          return;
                        } else if (!selected_seat) {
                          setopenSnack(true);
                          setmessage('Select your prefered seat');
                          return;
                        }
                        setopenPayment(true);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" visible={openPayment} transparent>
          <View
            style={{
              height: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              flex: 1,
            }}>
            <View style={styles.modalcontainer}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../../assets/Transfer_money.png')}
                  style={{height: 200, width: 200}}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View style={{width: '40%'}}>
                  {!confirm && (
                    <ModalCloseButton
                      label="CANCEL"
                      onPress={() => setopenPayment(false)}
                    />
                  )}
                </View>
                <View style={{width: '40%'}}>
                  {!confirm ? (
                    <ModalButton
                      label="PAY"
                      onPress={() =>
                        paystackWebViewRef?.current?.startTransaction()
                      }
                    />
                  ) : (
                    <ModalButton
                      label="CONTINUE"
                      onPress={() => {
                        handleReservation();
                        handlePayment();
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={{flex: 1}}>
        <Paystack
          paystackKey="pk_test_209ce6f4dd612fce7f2dc5d5b261562022533ecb"
          amount={scheduleData?.amount}
          billingEmail={email}
          billingName={full_name}
          currency="GHS"
          onCancel={res => {}}
          onSuccess={res => {
            setconfirm(true);
            setopenBook(false);
          }}
          ref={paystackWebViewRef}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -15,
    height: '60%',
  },
  backBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 30,
    marginLeft: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: 35,
    height: 35,
    paddingLeft: 4,
  },
  phoneWhatsApp: {
    backgroundColor: Colors.white,
    padding: 4,
    elevation: 4,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  iconCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 4,
  },
  btn: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: Colors.primary,
    right: 10,
    left: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: 450,
  },
  seat_number: {
    borderWidth: 0.8,
    borderColor: Colors.gray,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  selected_seat: {
    borderWidth: 0.8,
    borderColor: Colors.gray,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#CAE5FA',
  },
  current_seat: {
    borderWidth: 0.8,
    borderColor: Colors.gray,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: Colors.primary,
  },
  seat_text: {
    fontWeight: '600',
    color: Colors.black,
  },
  current_text: {
    fontWeight: '600',
    color: Colors.white,
  },
  modalcontainer: {
    backgroundColor: Colors.white,
    width: '90%',
    elevation: 15,
    padding: 15,
    borderRadius: 10,
  },
});
