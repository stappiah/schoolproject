import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {
  AddButton,
  Button,
  ModalButton,
  ModalCloseButton,
  ModalLoadingButton,
} from '../../components/common/Button';
import {Avatar, DataTable} from 'react-native-paper';
import {Colors} from '../../components/common/Colors';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import MC from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputComponent from '../../components/common/TextInputComponent';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';
import {useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import {selectStation} from '../../feature/slices/StationSlice';
import {useFocusEffect} from '@react-navigation/native';
import {BusType} from '../../components/common/Types';
import moment from 'moment';

type imageType = {
  fileName: string;
  type: string;
  uri: string;
};

export default function Buses() {
  const [openCreateBus, setopenCreateBus] = React.useState(false);
  const [openDetail, setopenDetail] = React.useState(false);
  const [openCameraModal, setopenCameraModal] = React.useState(false);
  const [formIndex, setformIndex] = React.useState(0);
  const [openSnack, setopenSnack] = React.useState(false);
  const [message, setmessage] = React.useState('');

  const [imageUri, setImageUri] = React.useState<imageType | null>(null);
  const [car_name, setcar_name] = React.useState('');
  const [car_number, setcar_number] = React.useState('');
  const [seat_number, setseat_number] = React.useState('');
  const [air_con, setair_con] = React.useState(false);
  const [gear_type, setgear_type] = React.useState('auto');
  const [fuel_type, setfuel_type] = React.useState('petrol');
  const [loadingCreate, setloadingCreate] = React.useState(false);
  const [loadingGet, setloadingGet] = React.useState(false);
  const [loadingDelete, setloadingDelete] = React.useState(false);
  const [openDelete, setopenDelete] = React.useState(false);
  const [busData, setbusData] = React.useState<BusType[]>([]);
  const [selectedBus, setselectedBus] = React.useState<BusType | null>(null);

  const user = useSelector(selectuser);
  const station = useSelector(selectStation);

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

  const handleBusCreation = () => {
    const formData = new FormData();
    formData.append('car_name', car_name);
    formData.append('car_number', car_number);
    formData.append('seat_number', Number(seat_number));
    formData.append('air_conditioner', air_con ? 'yes' : 'no');
    formData.append('fuel_type', fuel_type);
    formData.append('gear_type', gear_type);
    formData.append('station', station?.id);
    formData.append('bus_image', {
      name: imageUri?.fileName,
      type: imageUri?.type,
      uri: imageUri?.uri,
    });
    setloadingCreate(true);

    axios
      .post(`${BASEURL}/create-bus`, formData, {
        headers: {
          Authorization: `token ${user?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        getBuses();
        setcar_name('');
        setcar_number('');
        setseat_number('');
        setopenCreateBus(false);
        setImageUri(null);
        setformIndex(0);
        setmessage('Bus added successfully');
        setopenSnack(true);
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
  const handleBusDelete = () => {
    setloadingDelete(true);
    axios
      .delete(`${BASEURL}/delete-bus/${selectedBus?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setopenSnack(true);
        setmessage('Bus successfully deleted');
        setselectedBus(null);
        setopenDelete(false);
        setopenDetail(false);
        getBuses();
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
      getBuses();
    }, []),
  );

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <View style={{padding: 10, alignSelf: 'flex-end'}}>
        <AddButton label="Add bus" onPress={() => setopenCreateBus(true)} />
      </View>

      <View>
        {loadingGet ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator
              animating
              size={'large'}
              color={Colors.primary}
            />
          </View>
        ) : (
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
                <Text style={styles.th}>Car Number</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.th}>Seats</Text>
              </DataTable.Title>
            </DataTable.Header>

            <FlatList
              data={busData}
              keyExtractor={item => item?.id?.toString()}
              renderItem={({item}) => (
                <DataTable.Row
                  onPress={() => {
                    setopenDetail(true);
                    setselectedBus(item);
                  }}>
                  <DataTable.Cell>
                    <View style={{height: 50, width: 50, paddingVertical: 4}}>
                      <Avatar.Image
                        size={45}
                        source={{uri: item?.bus_image}}
                      />
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{color: Colors.black}}>
                      {item?.car_number}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{color: Colors.black}}>
                      {item?.seat_number}
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            />
          </DataTable>
        )}
      </View>

      <Modal animationType="slide" transparent visible={openCreateBus}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.modalHeading}>Add Bus</Text>
            {formIndex === 0 ? (
              <View>
                <TouchableOpacity
                  style={styles.busImage}
                  onPress={() => {
                    setopenCameraModal(true);
                    setopenCreateBus(false);
                  }}>
                  <Icon name="camera" size={25} color={Colors.primary} />
                  <Text style={{color: Colors.gray}}>
                    {imageUri ? 'Change Bus Image' : 'Add Bus Image'}
                  </Text>
                </TouchableOpacity>
                <View style={{paddingTop: 10}}>
                  <TextInputComponent
                    label="Car Name"
                    keyboardType="default"
                    placeholder="Enter car name/brand"
                    value={car_name}
                    onChange={e => setcar_name(e)}
                  />
                </View>
                <View style={{paddingTop: 10}}>
                  <TextInputComponent
                    label="Car Number"
                    keyboardType="default"
                    placeholder="Enter car number"
                    value={car_number}
                    onChange={e => setcar_number(e)}
                  />
                </View>
                <View style={{paddingTop: 10}}>
                  <TextInputComponent
                    label="Seat Number"
                    keyboardType="number-pad"
                    placeholder="Enter number of seat"
                    value={seat_number}
                    onChange={e => setseat_number(e)}
                  />
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
                      onPress={() => setopenCreateBus(false)}
                    />
                  </View>
                  <View style={{width: '40%'}}>
                    <ModalButton
                      label="NEXT"
                      onPress={() => {
                        if (!imageUri) {
                          setopenSnack(true);
                          setmessage('Upload bus image');
                          return;
                        } else if (!car_name) {
                          setopenSnack(true);
                          setmessage('Bus name is required.');
                          return;
                        } else if (!car_number) {
                          setopenSnack(true);
                          setmessage('Car number is required.');
                          return;
                        } else if (!car_number) {
                          setopenSnack(true);
                          setmessage('Number of seat is required.');
                          return;
                        }
                        setformIndex(1);
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={{paddingBottom: 10}}>
                  <Text
                    style={{
                      color: Colors.gray,
                      fontWeight: '600',
                      fontSize: 17,
                      paddingBottom: 5,
                    }}>
                    Fuel Type
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '60%',
                    }}>
                    <TouchableOpacity
                      style={styles.radioStyle}
                      onPress={() => setfuel_type('diesel')}>
                      {fuel_type === 'diesel' ? (
                        <MC
                          name="radiobox-marked"
                          color={Colors.primary}
                          size={20}
                        />
                      ) : (
                        <MC
                          name="radiobox-blank"
                          color={Colors.primary}
                          size={20}
                        />
                      )}
                      <Text style={{color: Colors.gray}}>Diesel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.radioStyle}
                      onPress={() => setfuel_type('petrol')}>
                      {fuel_type === 'petrol' ? (
                        <MC
                          name="radiobox-marked"
                          color={Colors.primary}
                          size={20}
                        />
                      ) : (
                        <MC
                          name="radiobox-blank"
                          color={Colors.primary}
                          size={20}
                        />
                      )}
                      <Text style={{color: Colors.gray}}>Petrol</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{paddingBottom: 10}}>
                  <Text
                    style={{
                      color: Colors.gray,
                      fontWeight: '600',
                      fontSize: 17,
                      paddingBottom: 5,
                    }}>
                    Gear Type
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '70%',
                    }}>
                    <TouchableOpacity
                      style={styles.radioStyle}
                      onPress={() => setgear_type('manual')}>
                      {gear_type === 'manual' ? (
                        <MC
                          name="radiobox-marked"
                          color={Colors.primary}
                          size={20}
                        />
                      ) : (
                        <MC
                          name="radiobox-blank"
                          color={Colors.primary}
                          size={20}
                        />
                      )}
                      <Text style={{color: Colors.gray}}>Manual</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.radioStyle}
                      onPress={() => setgear_type('auto')}>
                      {gear_type === 'auto' ? (
                        <MC
                          name="radiobox-marked"
                          color={Colors.primary}
                          size={20}
                        />
                      ) : (
                        <MC
                          name="radiobox-blank"
                          color={Colors.primary}
                          size={20}
                        />
                      )}
                      <Text style={{color: Colors.gray}}>Automatic</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      color: Colors.gray,
                      fontWeight: '600',
                      fontSize: 17,
                      paddingBottom: 5,
                    }}>
                    Air Conditioner
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '60%',
                    }}>
                    <TouchableOpacity
                      style={styles.radioStyle}
                      onPress={() => setair_con(true)}>
                      {air_con ? (
                        <MC
                          name="radiobox-marked"
                          color={Colors.primary}
                          size={20}
                        />
                      ) : (
                        <MC
                          name="radiobox-blank"
                          color={Colors.primary}
                          size={20}
                        />
                      )}
                      <Text style={{color: Colors.gray}}>YES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.radioStyle}
                      onPress={() => setair_con(false)}>
                      {!air_con ? (
                        <MC
                          name="radiobox-marked"
                          color={Colors.primary}
                          size={20}
                        />
                      ) : (
                        <MC
                          name="radiobox-blank"
                          color={Colors.primary}
                          size={20}
                        />
                      )}
                      <Text style={{color: Colors.gray}}>NO</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
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
                      <ModalButton
                        label="ADD BUS"
                        onPress={handleBusCreation}
                      />
                    )}
                  </View>
                </View>
              </View>
            )}
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
            <Text style={styles.modalHeading}>Bus Information</Text>
            <View>
              <View style={{alignSelf: 'center'}}>
                <Avatar.Image
                  size={200}
                  source={{uri: selectedBus?.bus_image}}
                />
              </View>
              <Text
                style={{
                  color: Colors.black,
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 17,
                }}>
                {selectedBus?.car_name}
              </Text>
              <Text
                style={{
                  color: Colors.primary,
                  textAlign: 'center',
                  paddingBottom: 10,
                  fontSize: 17,
                }}>
                {selectedBus?.car_number}
              </Text>
              <View style={{flexDirection: 'row', gap: 10, paddingLeft: 20}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Date Added:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16, width: '50%'}}>
                  {moment(selectedBus?.date_created, 'YYYY-MM-DD').format(
                    'dddd, MMMM Do YYYY',
                  )}
                </Text>
              </View>
            </View>
            <View style={{paddingTop: 20, flexDirection: 'row',gap: 10}}>
              <View style={{width: '45%'}}>
                <ModalCloseButton
                  label="CLOSE"
                  onPress={() => setopenDetail(false)}
                />
              </View>
              <View style={{width: "45%"}}>
                <ModalButton
                  label="DELETE"
                  onPress={() => setopenDelete(true)}
                />
              </View>
            </View>
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
          <View style={styles.modalcontainer}>
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
                <Button
                  label="Proceed"
                  onPress={() => {
                    setopenCameraModal(false);
                    setopenCreateBus(true);
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>

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
              {selectedBus?.car_name}
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
                  <ModalButton label="CONFIRM" onPress={handleBusDelete} />
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <SnackbarComponent
        visible={openSnack}
        onDismiss={() => setopenSnack(false)}
        onPress={() => setopenSnack(false)}
        message={message}
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
  modalHeading: {
    color: Colors.black,
    textAlign: 'center',
    fontWeight: '600',
    paddingBottom: 10,
    fontSize: 17,
  },
  busImage: {
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
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
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textHeading: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center',
    paddingBottom: 10,
  },
});
