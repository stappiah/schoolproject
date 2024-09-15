import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {Colors} from '../../common/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {AddButton, ModalButton, ModalCloseButton} from '../../common/Button';
import TextInputComponent from '../../common/TextInputComponent';
import {Users} from '../../common/Data';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Drivers() {
  const [openDetail, setopenDetail] = React.useState(false);
  const [openDelete, setopenDelete] = React.useState(false);
  const [openCreate, setopenCreate] = React.useState(false);

  const [first_name, setfirst_name] = React.useState('');
  const [last_name, setlast_name] = React.useState('');
  const [phone_number, setphone_number] = React.useState('');
  const [email_address, setemail_address] = React.useState('');
  const [deleteName, setdeleteName] = React.useState('');

  return (
    <View>
      <View style={{alignSelf: 'flex-end', padding: 10, marginBottom: 10}}>
        <AddButton label="Add Driver" onPress={() => setopenCreate(true)} />
      </View>

      <DataTable>
        <DataTable.Header
          style={{justifyContent: 'space-evenly', backgroundColor: '#F0F7FD'}}>
          <DataTable.Title>
            <Text style={styles.th}>Name</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.th}>Phone</Text>
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
                <Text style={{color: Colors.black}}>
                  {item?.first_name} {item?.last_name}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{color: Colors.black}}>{item?.phone_number}</Text>
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
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

      <Modal transparent animationType="slide" visible={openDetail}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Admin Information</Text>
            <View style={{paddingHorizontal: 10}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  First Name:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>Stephen</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Last Name:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>Appiah</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Phone Number:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  0554897867
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Email Address:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>
                  stephenappiaa@gmail.com
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Role:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>
                  Administrator
                </Text>
              </View>

              <View style={{paddingTop: 30, width: '40%'}}>
                <ModalButton
                  label="CLOSE"
                  onPress={() => setopenDetail(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="slide" visible={openCreate}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Add Driver</Text>

            <View style={{paddingHorizontal: 10}}>
              <View>
                <TextInputComponent
                  label="First Name"
                  keyboardType="default"
                  placeholder="Enter first name"
                  value={first_name}
                  onChange={e => setfirst_name(e)}
                />
                <TextInputComponent
                  label="Last Name"
                  keyboardType="default"
                  placeholder="Enter last name"
                  value={last_name}
                  onChange={e => setlast_name(e)}
                />
                <TextInputComponent
                  label="Phone Number"
                  keyboardType="phone-pad"
                  placeholder="Enter phone number"
                  value={phone_number}
                  onChange={e => setphone_number(e)}
                />
                <TextInputComponent
                  label="Email Address"
                  keyboardType="email-address"
                  placeholder="Enter email address"
                  value={email_address}
                  onChange={e => setfirst_name(e)}
                />
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
                  <ModalButton
                    label="ADD"
                    onPress={() => setopenCreate(false)}
                  />
                </View>
              </View>
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
});
