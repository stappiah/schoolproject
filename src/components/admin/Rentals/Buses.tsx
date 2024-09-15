import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React from 'react';
import {Colors} from '../../common/Colors';
import TextInputComponent from '../../common/TextInputComponent';
import {AddButton, ModalButton, ModalCloseButton} from '../../common/Button';
import {Avatar, DataTable} from 'react-native-paper';
import {Users} from '../../common/Data';
import Icon from 'react-native-vector-icons/AntDesign';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import AdminBus from '../../common/AdminBus';

export default function Buses() {
  const [openCreateBus, setopenCreateBus] = React.useState(false);
  const [openDelete, setopenDelete] = React.useState(false);
  const [deleteName, setdeleteName] = React.useState('');
  const [openDetail, setopenDetail] = React.useState(false);
  const [openBus, setopenBus] = React.useState(false);

  return (
    <View>
      <View style={{padding: 10, alignSelf: 'flex-end'}}>
        <AddButton label="Add bus" onPress={() => setopenCreateBus(true)} />
      </View>

      <DataTable>
        <DataTable.Header
          style={{justifyContent: 'space-evenly', backgroundColor: '#F0F7FD'}}>
          <DataTable.Title>
            <Text style={styles.th}>Image</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.th}>Price / Day</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.th}>Action</Text>
          </DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={Users}
          keyExtractor={item => item?.id.toLocaleString()}
          renderItem={({item}) => (
            <DataTable.Row
              style={{borderBottomWidth: 0.5, borderColor: Colors.gray}}>
              <DataTable.Cell>
                <View style={{height: 50, width: 50, paddingVertical: 4}}>
                  <Avatar.Image
                    size={45}
                    source={require('../../../assets/busimage3.jpg')}
                  />
                </View>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{color: Colors.black}}>GHC 230.00</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                      setdeleteName(`${item?.first_name} ${item?.last_name}`);
                      setopenDelete(true);
                    }}>
                    <MI name="delete-outline" size={20} color={Colors.white} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.otherBtn}
                    onPress={() => setopenDetail(true)}>
                    <Icon name="eye" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>

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
              {deleteName}
            </Text>

            <View style={{flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
              <View style={{paddingTop: 30, width: '40%'}}>
                <ModalCloseButton
                  label="CLOSE"
                  onPress={() => setopenDelete(false)}
                />
              </View>
              <View style={{paddingTop: 30, width: '40%'}}>
                <ModalButton
                  label="CONFIRM"
                  onPress={() => setopenDelete(false)}
                />
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
                  source={require('../../../assets/busimage3.jpg')}
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
                  Price / day:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  GHC 230.00
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingLeft: 20,paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Phone Number:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  0244419419
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
                  <Text style={{color: Colors.gray}}>Select Bus</Text>
                </TouchableOpacity>
                <View style={{paddingTop: 10}}>
                  <TextInputComponent label='Price' placeholder='Enter bus price for a day' keyboardType='numeric' />
                </View>
                <View style={{paddingTop: 10}}>
                  <TextInputComponent label='Phone Number' placeholder='Enter phone number' keyboardType='phone-pad' />
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
                  <ModalButton
                    label="ADD"
                    onPress={() => setopenCreateBus(false)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" visible={openBus}>
        <View style={styles.mainModalContainer}>
          <View style={styles.modalcontainer}>
            <View style={{paddingBottom: 10}}>
              <FlatList data={Users} renderItem={({item}) => <AdminBus />} />
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
});
