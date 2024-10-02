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
  useColorScheme,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
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
  ModalLoadingButton,
} from '../../components/common/Button';
import {RegionData} from '../../components/common/Data';
import {Picker} from '@react-native-picker/picker';
import {Modal} from 'react-native';
import {DataTable} from 'react-native-paper';
import {
  BusRentalType,
  BusType,
  rentalPriceType,
} from '../../components/common/Types';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';
import {useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import {Paystack, paystackProps} from 'react-native-paystack-webview';

type navType = NativeStackNavigationProp<RootParams>;
type tabType = NativeStackNavigationProp<BottomTabType>;

export default function RentingDetails({route}: any) {
  const navigation = useNavigation<navType>();
  const bottomTab = useNavigation<tabType>();
  const {width, height} = Dimensions.get('window');

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ['25%', '70%', '90%'], []);
  const {dismiss} = useBottomSheetModal();
  const colorScheme = useColorScheme();

  const [full_name, setfull_name] = React.useState('');
  const [phone_number, setphone_number] = React.useState('');
  const [email, setemail] = React.useState('');
  const [pick_up, setpick_up] = React.useState('');
  const [destination, setdestination] = React.useState('');
  const [region, setregion] = React.useState('');
  const [loadingCreate, setloadingCreate] = React.useState(false);
  const [openTotal, setopenTotal] = React.useState(false);
  const [openSnack, setopenSnack] = React.useState(false);
  const [openPay, setopenPay] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [busDetail, setbusDetail] = React.useState<BusType | null>(null);
  const [rentalPricesData, setrentalPricesData] = React.useState<
    rentalPriceType[]
  >([]);
  const [cost, setcost] = React.useState<number | null>(null);
  const paystackWebViewRef = React.useRef<paystackProps.PayStackRef>();

  const detail: BusRentalType = route?.params.details;
  const user = useSelector(selectuser);

  const handleBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  const handleWhatsApp = () => {
    const phoneNumber = `${detail?.whatsapp}`; // Add country code and phone number here
    const message = `Hello, I want to rent your bus ${busDetail?.car_name} with car number ${busDetail?.car_number}`;

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message,
    )}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            'WhatsApp not installed',
            'Please install WhatsApp to send the message.',
          );
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const makePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;

    // Check if the device can open the phone app
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            'Phone App Not Available',
            'Your device cannot make phone calls.',
          );
        }
      })
      .catch(err => console.error('Error occurred', err));
  };

  const handleBusDetails = () => {
    axios
      .get(`${BASEURL}/get-bus/${detail?.bus}`, {
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

  const handleRentalPrices = () => {
    axios
      .get(`${BASEURL}/bus-rental-prices/${detail?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setrentalPricesData(response.data);
      })
      .catch(error => {
        console.log(error?.message);
      });
  };

  const getCost = (input: string) => {
    rentalPricesData.filter(
      item => item?.destination === input && setcost(Number(item?.price)),
    );
  };

  const handleRentalRequest = () => {
    if (!full_name) {
      setmessage('Full name is required');
      setopenSnack(true);
      return;
    } else if (!phone_number) {
      setmessage('Full name is required');
      setopenSnack(true);
      return;
    } else if (!email) {
      setmessage('Email Address is required');
      setopenSnack(true);
      return;
    } else if (!pick_up) {
      setmessage('Pick up point is required');
      setopenSnack(true);
      return;
    } else if (!destination) {
      setmessage('Destination is required');
      setopenSnack(true);
      return;
    } else if (!region) {
      setmessage('Region is required');
      setopenSnack(true);
      return;
    }
    const body = {
      full_name,
      pickup: pick_up,
      region,
      destination,
      phone_number,
      rental: detail?.id,
      cost,
    };
    setloadingCreate(true);
    axios
      .post(`${BASEURL}/rental-request`, body, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        dismiss();
        setopenTotal(false);
        setopenPay(true);
        paystackWebViewRef?.current?.startTransaction();
      })
      .catch(error => {
        setmessage(error?.message);
        setopenSnack(true);
      })
      .finally(() => setloadingCreate(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRentalPrices();
      handleBusDetails();
    }, []),
  );

  return (
    <>
      <View style={{flex: 1}}>
        <View style={{height: height / 2.5, width: width}}>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={'light-content'}
            translucent
          />
          <Image
            source={{uri: detail?.get_bus_image}}
            style={{height: '100%', width: '100%', resizeMode: 'cover'}}
          />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={17} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailsContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{color: Colors.black, fontWeight: '600', fontSize: 17}}>
              {detail?.get_station_name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.primary,
                  fontWeight: 'bold',
                  paddingBottom: 5,
                  fontSize: 20,
                }}>
                &cent;
              </Text>
              <Text style={{color: Colors.primary, fontSize: 17}}>
                {rentalPricesData[0]?.price}
              </Text>
              <Text style={{color: Colors.black}}>/day</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              justifyContent: 'space-evenly',
            }}>
            <View>
              <TouchableOpacity
                style={styles.phoneWhatsApp}
                onPress={() => makePhoneCall(`${detail?.phone_number}`)}>
                <Icon name="phone" size={25} color={Colors.primary} />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.primary,
                  textAlign: 'center',
                  fontWeight: '600',
                  paddingTop: 2,
                }}>
                Call
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.phoneWhatsApp}
                onPress={handleWhatsApp}>
                <MC name="whatsapp" size={25} color={Colors.primary} />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.primary,
                  textAlign: 'center',
                  fontWeight: '600',
                  paddingTop: 2,
                }}>
                WhatsApp
              </Text>
            </View>
          </View>

          <View>
            <Text style={{color: Colors.gray}}>
              Traveling – it leaves you speechless, then turns you into a
              storyteller. The world is vast, and every journey is an
              opportunity to discover new places, new people, and new
              perspectives.  – Ibn Battuta
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
                {busDetail?.seat_number} Seats
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
                {busDetail?.gear_type === 'auto' ? 'Automatic' : 'Manual'}
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
                {busDetail?.fuel_type === 'petrol' ? 'Petrol' : 'Diesel'}
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
                {busDetail?.station_address}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{paddingTop: 40, paddingBottom: 100}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                padding: 5,
                color: Colors.black,
              }}>
              PRICE DETAILS
            </Text>
            <DataTable>
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
                  style={{borderBottomWidth: 0.5, borderColor: Colors.gray}}>
                  <DataTable.Cell>
                    <Text style={{color: Colors.black}}>
                      {item?.destination}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{color: Colors.black}}>{item?.price}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => bottomSheetRef.current?.present()}>
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

        <Modal animationType="slide" transparent visible={openTotal}>
          <View
            style={{
              height: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              flex: 1,
            }}>
            <View style={styles.modal_container}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: '600',
                  paddingBottom: 10,
                }}>
                Bus Reservation Details
              </Text>
              <View>
                <View>
                  <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                    <Text
                      style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                      Customer Name:
                    </Text>
                    <Text style={{color: Colors.gray, fontSize: 16}}>
                      {full_name}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                    <Text
                      style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                      Phone Number:
                    </Text>
                    <Text style={{color: Colors.gray, fontSize: 16}}>
                      {phone_number}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                    <Text
                      style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                      PickUp:
                    </Text>
                    <Text
                      style={{color: Colors.gray, fontSize: 16, width: '50%'}}>
                      {pick_up}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                    <Text
                      style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                      Destination:
                    </Text>
                    <Text
                      style={{color: Colors.gray, fontSize: 16, width: '45%'}}>
                      {destination}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                    <Text
                      style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                      Destination Region:
                    </Text>
                    <Text style={{color: Colors.gray, fontSize: 16}}>
                      {region}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                    <Text
                      style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                      Rental Cost:
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                      }}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                          fontSize: 20,
                          paddingBottom: 4,
                        }}>
                        &cent;
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}>
                        {cost}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 20,
                  }}>
                  <View style={{width: '40%'}}>
                    <ModalCloseButton
                      label="CLOSE"
                      onPress={() => setopenTotal(false)}
                    />
                  </View>
                  <View style={{width: '40%'}}>
                    {loadingCreate ? (
                      <ModalLoadingButton />
                    ) : (
                      <ModalButton
                        label="CONFIRM"
                        onPress={handleRentalRequest}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {openPay && (
          <View style={{flex: 1}}>
            <Paystack
              paystackKey="pk_test_209ce6f4dd612fce7f2dc5d5b261562022533ecb"
              amount={Number(cost)}
              billingEmail={email}
              billingName={full_name}
              currency="GHS"
              onCancel={res => {}}
              onSuccess={res => {
                bottomTab?.navigate('archive', {index: 1});
                setfull_name('');
                setphone_number('');
                setregion('');
                setdestination('');
                setpick_up('');
                setopenPay(false);
              }}
              ref={paystackWebViewRef}
            />
          </View>
        )}
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}
        enableDismissOnClose
        enablePanDownToClose
        backdropComponent={handleBackdrop}>
        <View style={{paddingHorizontal: 15}}>
          <Text
            style={{
              color: Colors.black,
              fontWeight: '600',
              textAlign: 'center',
              fontSize: 17,
              paddingVertical: 10,
            }}>
            Car Rental
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
          <View>
            <TextInputComponent
              label="Enter pick up point"
              value={pick_up}
              onChange={e => setpick_up(e)}
              keyboardType="default"
              placeholder="Enter your pick up point"
            />
            <TextInputComponent
              label="Enter destination"
              value={destination}
              onChange={e => setdestination(e)}
              keyboardType="default"
              placeholder="Enter your destination"
            />
          </View>
          <View style={styles.picker}>
            <Picker
              style={{color: Colors.gray}}
              selectedValue={region}
              onValueChange={itemValue => {
                setregion(itemValue);
                getCost(itemValue);
              }}>
              <Picker.Item
                label={'Select region'}
                style={{color: Colors.gray}}
                value={''}
              />
              {rentalPricesData.map(item => (
                <Picker.Item
                  color={colorScheme === 'dark' ? Colors.white : Colors.gray}
                  label={item?.destination}
                  value={item?.destination}
                  key={item?.id}
                />
              ))}
            </Picker>
          </View>
          <View style={{paddingTop: 10}}>
            <Button
              label="Rent Bus"
              onPress={() => {
                if (!full_name) {
                  setmessage('Full name is required');
                  setopenSnack(true);
                  return;
                } else if (!phone_number) {
                  setmessage('Full name is required');
                  setopenSnack(true);
                  return;
                } else if (!email) {
                  setmessage('Email Address is required');
                  setopenSnack(true);
                  return;
                } else if (!pick_up) {
                  setmessage('Pick up point is required');
                  setopenSnack(true);
                  return;
                } else if (!destination) {
                  setmessage('Destination is required');
                  setopenSnack(true);
                  return;
                } else if (!region) {
                  setmessage('Region is required');
                  setopenSnack(true);
                  return;
                }
                setopenTotal(true);
              }}
            />
          </View>
          <SnackbarComponent
            visible={openSnack}
            message={message}
            onDismiss={() => setopenSnack(false)}
            onPress={() => setopenSnack(false)}
          />
        </View>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  th: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -15,
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
  modal_container: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    width: '85%',
  },
  picker: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    marginTop: 10,
  },
});
