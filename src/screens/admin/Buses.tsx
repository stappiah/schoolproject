import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  AddButton,
  Button,
  ModalButton,
  ModalCloseButton,
} from '../../components/common/Button';
import {Avatar, DataTable} from 'react-native-paper';
import {Colors} from '../../components/common/Colors';
import {Users} from '../../components/common/Data';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import TextInputComponent from '../../components/common/TextInputComponent';

export default function Buses() {
  const [openCreateBus, setopenCreateBus] = React.useState(false);
  const [openDetail, setopenDetail] = React.useState(false);
  const [imageUri, setImageUri] = React.useState<string | undefined>(undefined);
  const [openCameraModal, setopenCameraModal] = React.useState(false);

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
        setImageUri(assets[0].uri); // Use Asset's uri property here
      }
    }
  };

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <View style={{padding: 10, alignSelf: 'flex-end'}}>
        <AddButton label="Add bus" onPress={() => setopenCreateBus(true)} />
      </View>

      <View>
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
            data={Users}
            renderItem={() => (
              <DataTable.Row onPress={() => setopenDetail(true)}>
                <DataTable.Cell>
                  <View style={{height: 50, width: 50, paddingVertical: 4}}>
                    <Avatar.Image
                      size={45}
                      source={require('../../assets/busimage3.jpg')}
                    />
                  </View>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: Colors.black}}>GC-2430-18</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{color: Colors.black}}>30</Text>
                </DataTable.Cell>
              </DataTable.Row>
            )}
          />
        </DataTable>
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
                />
              </View>
              <View style={{paddingTop: 10}}>
                <TextInputComponent
                  label="Car Number"
                  keyboardType="default"
                  placeholder="Enter car number"
                />
              </View>
              <View style={{paddingTop: 10}}>
                <TextInputComponent
                  label="Seat Number"
                  keyboardType="number-pad"
                  placeholder="Enter number of seat"
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
                <View style={{width: "40%"}}>
                  <ModalButton
                    label="ADD BUS"
                    onPress={() => setopenCreateBus(false)}
                  />
                </View>
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
            <Text style={styles.modalHeading}>Bus Information</Text>
            <View>
              <View style={{alignSelf: 'center'}}>
                <Avatar.Image
                  size={200}
                  source={require('../../assets/busimage3.jpg')}
                />
              </View>
              <Text
                style={{
                  color: Colors.black,
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 17,
                }}>
                KIA Bus
              </Text>
              <Text
                style={{
                  color: Colors.primary,
                  textAlign: 'center',
                  paddingBottom: 10,
                  fontSize: 17,
                }}>
                GC-2023-18
              </Text>
              <View style={{flexDirection: 'row', gap: 10, paddingLeft: 20}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Date Added:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  August 20, 2024
                </Text>
              </View>
            </View>
            <View style={{paddingTop: 20, width: '60%'}}>
              <ModalCloseButton
                label="CLOSE"
                onPress={() => setopenDetail(false)}
              />
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
                    source={{uri: imageUri}}
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
});
