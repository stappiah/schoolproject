import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  useColorScheme,
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import {Colors} from '../../components/common/Colors';
import Admin from '../../components/admin/station/Admin';
import Drivers from '../../components/admin/station/Drivers';
import Routes from '../../components/admin/station/Routes';
import {
  AddButton,
  LoadingButton,
  ModalButton,
  ModalCloseButton,
  ModalLoadingButton,
} from '../../components/common/Button';
import TextInputComponent from '../../components/common/TextInputComponent';
import {Picker} from '@react-native-picker/picker';
import {RegionData, WorkingDaysData} from '../../components/common/Data';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';
import {useDispatch, useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReadOnlyTextInput from '../../components/common/ReadOnlyTextInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {imageType, StationType} from '../../components/common/Types';
import {GetStation} from '../../feature/slices/StationSlice';



export default function AdminStation() {
  const [headerIndex, setheaderIndex] = React.useState(0);
  const [openStation, setopenStation] = React.useState(false);
  const [openSnack, setopenSnack] = React.useState(false);
  const [loadingStation, setloadingStation] = React.useState(false);
  const [loadingCreate, setloadingCreate] = React.useState(false);
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

  const [stationData, setstationData] = React.useState<StationType | null>(
    null,
  );

  const [formIndex, setformIndex] = React.useState(0);

  const [message, setmessage] = React.useState('');
  const colorScheme = useColorScheme();
  const user = useSelector(selectuser);
  const dispatch = useDispatch();
  const today = new Date();

  const headerData = [{name: 'Admin'}, {name: 'Drivers'}, {name: 'Routes'}];

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
          setstationData(data[0]);
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
        }
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

  const handleStationCreation = () => {
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
    } else if (!imageUri) {
      setopenSnack(true);
      setmessage('Upload Station image');
      return;
    } else if (workingDays?.length === 0) {
      setopenSnack(true);
      setmessage('Select working days');
      return;
    } else if (
      today?.toTimeString().split(' ')[0] ===
      start_time?.toTimeString().split(' ')[0]
    ) {
      setopenSnack(true);
      setmessage('Select start time');
      return;
    } else if (
      today?.toTimeString().split(' ')[0] ===
      end_time?.toTimeString().split(' ')[0]
    ) {
      setopenSnack(true);
      setmessage('Select closing time');
      return;
    }

    const formData = new FormData();
    formData.append('station_name', station_name);
    formData.append('company_name', company_name);
    formData.append('address', address);
    formData.append('phone_number', phone_number);
    formData.append('region', region);
    formData.append('working_days', JSON.stringify(workingDays));
    formData.append('start_time', start_time.toTimeString().split(' ')[0]);
    formData.append('closing_time', end_time.toTimeString().split(' ')[0]);
    formData.append('image', {
      name: imageUri?.fileName,
      type: imageUri?.type,
      uri: imageUri?.uri,
    });

    setloadingCreate(true);
    axios
      .post(`${BASEURL}/create-bus-station`, formData, {
        headers: {
          Authorization: `token ${user?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        getAdminStation();
        setopenStation(false);
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

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when screen is focused
      getAdminStation();
    }, []),
  );

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
        setImageUri(assets[0]); // Use Asset's uri property here
      }
    }
  };

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      {loadingStation ? (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator animating color={Colors.primary} size={'large'} />
        </View>
      ) : (
        <View>
          {stationAvailability ? (
            <View>
              <View style={styles.header}>
                {headerData.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => setheaderIndex(index)}
                    key={index}
                    style={[
                      styles.headerBtn,
                      headerIndex === index && styles.activeheader,
                    ]}>
                    <Text
                      style={
                        headerIndex === index
                          ? styles.activeheaderBtnText
                          : styles.headerBtnText
                      }>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{paddingTop: 10}}>
                {headerIndex === 0 ? (
                  <Admin />
                ) : headerIndex === 1 ? (
                  <Drivers />
                ) : (
                  <Routes />
                )}
              </View>
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
              <AddButton
                label="Add Station"
                onPress={() => setopenStation(true)}
              />
            </View>
          )}
        </View>
      )}

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
              Add Bus station
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
                  style={{color: Colors.gray}}
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
                            name="radiobox-marked"
                            size={20}
                            color={Colors.primary}
                          />
                        ) : (
                          <Icon
                            name="radiobox-blank"
                            size={20}
                            color={Colors.primary}
                          />
                        )}
                        <Text style={{color: Colors.gray}}>{item.label}</Text>
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
                        label="ADD"
                        onPress={handleStationCreation}
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

      <View>
        <SnackbarComponent
          message={message}
          visible={openSnack}
          onDismiss={() => setopenSnack(false)}
          onPress={() => setopenSnack(false)}
        />
      </View>

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
  },
  headerBtnText: {color: Colors.gray},
  activeheaderBtnText: {color: Colors.white},
  headerBtn: {
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 4,
  },
  activeheader: {
    backgroundColor: Colors.primary,
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
});
