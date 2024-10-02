import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  FlatList,
  useColorScheme,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../components/common/Colors';
import {AdminParams} from '../../components/navigation/RootParams';
import {Logout, selectuser} from '../../feature/slices/AuthSlice';
import {imageType} from '../../components/common/Types';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';
import {
  ClearStation,
  GetStation,
  selectStation,
} from '../../feature/slices/StationSlice';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import {
  ModalButton,
  ModalCloseButton,
  ModalLoadingButton,
} from '../../components/common/Button';
import ReadOnlyTextInput from '../../components/common/ReadOnlyTextInput';
import {Picker} from '@react-native-picker/picker';
import TextInputComponent from '../../components/common/TextInputComponent';
import {RegionData, WorkingDaysData} from '../../components/common/Data';

type screenType = NativeStackNavigationProp<AdminParams>;

export default function Settings() {
  const navigation = useNavigation<screenType>();
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();
  const user = useSelector(selectuser);
  const station = useSelector(selectStation);
  const colorScheme = useColorScheme();

  const [formIndex, setformIndex] = React.useState(0);
  const [openStation, setopenStation] = React.useState(false);
  const [openSnack, setopenSnack] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [loadingStation, setloadingStation] = React.useState(false);
  const [loadingCreate, setloadingUpdate] = React.useState(false);
  const [stationAvailability, setstationAvailability] = React.useState(false);

  const [station_name, setstation_name] = React.useState('');
  const [company_name, setcompany_name] = React.useState('');
  const [phone_number, setphone_number] = React.useState('');
  const [address, setaddress] = React.useState('');
  const [region, setregion] = React.useState('');
  const [start_time, setstart_time] = React.useState(new Date());
  const [end_time, setend_time] = React.useState(new Date());
  const [workingDays, setworkingDays] = React.useState<string[]>([]);
  const [imageUri, setImageUri] = React.useState<imageType | null>(null);

  const [show_start_time, setshow_start_time] = React.useState(false);
  const [show_end_time, setshow_end_time] = React.useState(false);
  const [openCameraModal, setopenCameraModal] = React.useState(false);
  const [openLogout, setopenLogout] = React.useState(false);

  const getAdminStation = () => {
    setloadingStation(true);
    axios
      .get(`${BASEURL}/admin-station`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        const data = response?.data;
        if (data?.length === 0) {
          setstationAvailability(false);
        } else {
          setstationAvailability(true);
          dispatch(
            GetStation({
              id: data[0]?.id,
              admin: data[0]?.admin,
              address: data[0]?.address,
              station_name: data[0]?.station_name,
              company_name: data[0]?.company_name,
              start_time: data[0]?.start_time,
              closing_time: data[0]?.closing_time,
              region: data[0]?.region,
              image: data[0]?.image,
            }),
          );
          setstation_name(data[0]?.station_name);
          setcompany_name(data[0]?.company_name);
          setphone_number(data[0]?.phone_number);
          setaddress(data[0]?.address);
          setregion(data[0]?.region);
          setworkingDays(data[0]?.working_days);
        }
        console.log(data);
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setloadingStation(false));
  };

  const handleStationUpdate = () => {
    if (!station_name) {
      setopenSnack(true);
      setmessage('Station name is required');
      return;
    } else if (!company_name) {
      setopenSnack(true);
      setmessage('Company name is required');
      return;
    }
    if (workingDays?.length === 0) {
      setopenSnack(true);
      setmessage('Select working days');
      return;
    }

    const formData = new FormData();
    formData.append('station_name', station_name);
    formData.append('company_name', company_name);
    formData.append('address', address);
    formData.append('region', region);
    formData.append('working_days', JSON.stringify(workingDays));
    {
      imageUri &&
        formData.append('image', {
          name: imageUri?.fileName,
          type: imageUri?.type,
          uri: imageUri?.uri,
        });
    }

    setloadingUpdate(true);
    axios
      .patch(`${BASEURL}/bus-station-details/${station?.id}`, formData, {
        headers: {
          Authorization: `token ${user?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        getAdminStation();
        setopenStation(false);
        setopenSnack(true);
        setmessage('Station Updated successfully');
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

  const onChangeStartTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || start_time;

    setshow_start_time(false);
    setstart_time(currentTime);
  };

  const onChangeEndTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || end_time;
    setshow_end_time(false);
    setend_time(currentTime);
  };

  const handleWorkingDays = (day: string) => {
    setworkingDays(prev => {
      const exists = prev.some(d => d === day);

      if (exists) {
        return prev?.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const openCamera = () => {
    launchCamera({}, (response: ImagePickerResponse) => {
      handleResponse(response);
    });
  };

  const openGallery = () => {
    launchImageLibrary({}, (response: ImagePickerResponse) => {
      handleResponse(response);
    });
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      const assets: Asset[] | undefined = response.assets;
      if (assets && assets.length > 0) {
        console.log(assets);

        setImageUri(assets[0]); // Use Asset's uri property here
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when screen is focused
      getAdminStation();
    }, []),
  );

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, height: '100%'}}>
      <StatusBar barStyle={'dark-content'} hidden translucent />
      <View
        style={{
          backgroundColor: Colors.black,
          height: 360,
          position: 'relative',
        }}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" color={Colors.black} size={20} />
        </TouchableOpacity>
        <ImageBackground
          source={require('../../assets/busimage2.jpg')}
          resizeMode="cover"
          style={{height: 360, width: width}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.39)',
            }}>
            <View
              style={{
                borderColor: Colors.white,
                borderWidth: 2,
                height: 50,
                width: 50,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{color: Colors.white, fontWeight: 'bold', fontSize: 20}}>
                {user?.first_name[0]}
                {user?.last_name[0]}
              </Text>
            </View>
            <Text
              style={{
                color: Colors.white,
                fontWeight: '600',
                fontSize: 17,
                paddingTop: 10,
              }}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontWeight: '600',
                fontSize: 17,
                paddingBottom: 10,
              }}>
              {user?.user_type}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: Colors.white,
          borderRadius: 10,
          marginTop: -15,
          paddingVertical: 10,
          elevation: 10,
        }}>
        {stationAvailability && (
          <TouchableOpacity
            style={{flexDirection: 'row', gap: 10, padding: 10}}
            onPress={() => setopenStation(true)}>
            <Icon name="manage-accounts" size={20} color={Colors.gray} />
            <Text style={{color: Colors.black}}>Edit Station</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{flexDirection: 'row', gap: 10, padding: 10}}>
          <Icon name="manage-accounts" size={20} color={Colors.gray} />
          <Text style={{color: Colors.black}}>Edit Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('change_password')}
          style={{flexDirection: 'row', gap: 10, padding: 10}}>
          <Icon name="lock" size={20} color={Colors.gray} />
          <Text style={{color: Colors.black}}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', gap: 10, padding: 10}}
          onPress={() => setopenLogout(true)}>
          <Icon name="power-settings-new" size={20} color={Colors.gray} />
          <Text style={{color: Colors.black}}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent visible={openStation}>
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
              Update Bus station
            </Text>
            {formIndex === 0 ? (
              <View>
                <TextInputComponent
                  keyboardType="default"
                  label="Station Name"
                  placeholder="Enter bus station name"
                  value={station_name}
                  onChange={e => setstation_name(e)}
                />
                <TextInputComponent
                  keyboardType="default"
                  label="Company Name"
                  placeholder="Enter name of company"
                  value={company_name}
                  onChange={e => setcompany_name(e)}
                />
                <TextInputComponent
                  keyboardType="phone-pad"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={phone_number}
                  onChange={e => setphone_number(e)}
                />
                <TextInputComponent
                  keyboardType="default"
                  label="Address"
                  placeholder="Enter station address"
                  value={address}
                  onChange={e => setaddress(e)}
                />
                <View style={styles.picker}>
                  <Picker
                    selectedValue={region}
                    onValueChange={itemValue => setregion(itemValue)}>
                    <Picker.Item
                      label={'Select region'}
                      value={''}
                      style={{color: Colors.gray}}
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

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <ModalCloseButton
                    label="   CLOSE   "
                    onPress={() => setopenStation(false)}
                  />
                  <ModalButton
                    label="NEXT"
                    onPress={() => {
                      if (!station_name) {
                        setopenSnack(true);
                        setmessage('Station name is required');
                        return;
                      } else if (!company_name) {
                        setopenSnack(true);
                        setmessage('Company name is required');
                        return;
                      } else if (!phone_number) {
                        setopenSnack(true);
                        setmessage('Phone number is required');
                        return;
                      } else if (!address) {
                        setopenSnack(true);
                        setmessage('Address is required');
                        return;
                      } else if (!region) {
                        setopenSnack(true);
                        setmessage('Region is required');
                        return;
                      }
                      setformIndex(1);
                    }}
                  />
                </View>
              </View>
            ) : (
              <View>
                <View style={{paddingTop: 4}}>
                  <ReadOnlyTextInput
                    label="Start Time"
                    value={start_time?.toLocaleTimeString()}
                  />
                </View>
                <View style={{paddingTop: 4}}>
                  <ReadOnlyTextInput
                    label="Closing Time"
                    value={end_time?.toLocaleTimeString()}
                  />
                </View>

                <View style={{paddingTop: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}>
                    <ModalCloseButton
                      label="Start Time"
                      onPress={() => setshow_start_time(true)}
                    />
                    <ModalButton
                      label="End Time"
                      onPress={() => setshow_end_time(true)}
                    />
                  </View>
                </View>

                <View style={{paddingTop: 20}}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                      fontWeight: '600',
                      paddingBottom: 10,
                    }}>
                    Select Working Days
                  </Text>
                  <FlatList
                    data={WorkingDaysData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index?.toString()}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.days}
                        onPress={() => handleWorkingDays(item.value)}>
                        {workingDays?.includes(item?.value) ? (
                          <Icon
                            name="radio-button-on"
                            size={20}
                            color={Colors.primary}
                          />
                        ) : (
                          <Icon
                            name="radio-button-off"
                            size={20}
                            color={Colors.primary}
                          />
                        )}
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>

                <View style={{paddingTop: 10}}>
                  <TouchableOpacity
                    style={styles.busImage}
                    onPress={() => {
                      setopenCameraModal(true);
                      setopenStation(false);
                    }}>
                    <Icon name="camera" size={25} color={Colors.primary} />
                    <Text style={{color: Colors.gray}}>
                      {imageUri ? 'Change Station Image' : 'Add Station Image'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 10,
                  }}>
                  <View style={{width: '48%'}}>
                    <ModalCloseButton
                      label="   BACK   "
                      onPress={() => setformIndex(0)}
                    />
                  </View>
                  <View style={{width: '48%'}}>
                    {loadingCreate ? (
                      <ModalLoadingButton />
                    ) : (
                      <ModalButton
                        label="UPDATE"
                        onPress={handleStationUpdate}
                      />
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" visible={openCameraModal} transparent>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modal_container}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {imageUri ? (
                <TouchableOpacity style={styles.openFile} onPress={openGallery}>
                  <Image
                    source={{uri: imageUri?.uri}}
                    style={{height: '100%', width: '100%'}}
                  />
                  <View style={styles.changeImage}>
                    <Text style={{color: Colors.primary}}>Change</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.openFile} onPress={openGallery}>
                  <Icon name="camera" color={Colors.gray} size={25} />
                  <Text style={{color: Colors.gray}}>Select file</Text>
                </TouchableOpacity>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 20,
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View
                  style={{
                    backgroundColor: Colors.gray,
                    padding: 0.5,
                    width: '35%',
                  }}
                />
                <Text style={{color: Colors.gray}}>or</Text>
                <View
                  style={{
                    backgroundColor: Colors.gray,
                    padding: 0.5,
                    width: '35%',
                  }}
                />
              </View>

              <TouchableOpacity style={styles.openCamera} onPress={openCamera}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Open Camera & Take Photo
                </Text>
              </TouchableOpacity>

              {imageUri && (
                <ModalButton
                  label="Proceed"
                  onPress={() => {
                    setopenCameraModal(false);
                    setopenStation(true);
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="slide" visible={openLogout}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.textHeading}>Are you sure you want to </Text>
              <Text
                style={{
                  color: Colors.primary,
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Logout
              </Text>
            </View>

            <View style={{flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
              <View style={{paddingTop: 30, width: '40%'}}>
                <ModalCloseButton
                  label="CLOSE"
                  onPress={() => setopenLogout(false)}
                />
              </View>
              <View style={{paddingTop: 30, width: '40%'}}>
                <ModalButton
                  label="CONFIRM"
                  onPress={() => {
                    dispatch(Logout());
                    dispatch(ClearStation());
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {show_start_time && !show_end_time && (
        <DateTimePicker
          testID="dateTimePicker"
          value={start_time}
          mode="time"
          display="default"
          onChange={onChangeStartTime}
        />
      )}

      {show_end_time && !show_start_time && (
        <DateTimePicker
          testID="dateTimePicker"
          value={end_time}
          mode="time"
          display="default"
          onChange={onChangeEndTime}
        />
      )}

      <View style={{position: 'absolute', bottom: 10, right: 0, left: 0}}>
        <SnackbarComponent
          message={message}
          visible={openSnack}
          onDismiss={() => setopenSnack(false)}
          onPress={() => setopenSnack(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    height: 30,
    width: 30,
    backgroundColor: Colors.white,
    borderRadius: 100,
    top: 25,
    position: 'absolute',
    left: 10,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 6,
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
  days: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 20,
  },
  openCamera: {
    backgroundColor: '#CAE5FA',
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  openFile: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    width: '80%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  changeImage: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
  },
  busImage: {
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
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
    paddingVertical: 10,
  },
});
