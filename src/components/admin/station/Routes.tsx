import {View, Text, StyleSheet, TouchableOpacity, Modal, FlatList} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {Colors} from '../../common/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import {AddButton, ModalButton, ModalCloseButton} from '../../common/Button';
import TextInputComponent from '../../common/TextInputComponent';
import {Picker} from '@react-native-picker/picker';
import {RegionData, RouteData} from '../../common/Data';

export default function Routes() {
  const [openEdit, setopenEdit] = React.useState(false);
  const [openDelete, setopenDelete] = React.useState(false);
  const [openCreate, setopenCreate] = React.useState(false);
  const [deleteName, setdeleteName] = React.useState('');

  const [route_name, setroute_name] = React.useState<string>('');
  const [region, setregion] = React.useState<string>("");

  return (
    <View>
      <View style={{alignSelf: 'flex-end', padding: 10, marginBottom: 10}}>
        <AddButton label="Add Route" onPress={() => setopenCreate(true)} />
      </View>

      <DataTable>
        <DataTable.Header
          style={{justifyContent: 'space-evenly', backgroundColor: '#F0F7FD'}}>
          <DataTable.Title>
            <Text style={styles.th}>Name</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.th}>Region</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.th}>Action</Text>
          </DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={RouteData}
          keyExtractor={item => item?.id.toLocaleString()}
          renderItem={({item}) => (
            <DataTable.Row
              style={{borderBottomWidth: 0.5, borderColor: Colors.gray}}>
              <DataTable.Cell>
                <Text style={{color: Colors.black}}>
                  {item?.name}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{color: Colors.black}}>{item?.region}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                      setdeleteName(item?.name);
                      setopenDelete(true);
                    }}>
                    <MI name="delete-outline" size={20} color={Colors.white} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.otherBtn}
                    onPress={() => setopenEdit(true)}>
                    <Icon name="edit" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>

      <Modal transparent animationType="slide" visible={openDelete}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
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

      <Modal transparent animationType="slide" visible={openEdit}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.textHeading}>Edit Route</Text>
            <View style={{paddingHorizontal: 10}}>
              <View>
                <TextInputComponent
                  label="Name of Route"
                  keyboardType="default"
                  placeholder="Enter route"
                  value={route_name}
                  onChange={e => setroute_name(e)}
                />
                <View style={styles.picker}>
                  <Picker
                    selectedValue={region}
                    onValueChange={itemValue => setregion(itemValue)}>
                    <Picker.Item
                      label={"Select region"}
                      value={""}
                    />
                    {RegionData.map((item, index) => (
                      <Picker.Item
                        label={item.label}
                        value={item.value}
                        key={index}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View
                style={{flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
                <View style={{paddingTop: 30, width: '40%'}}>
                  <ModalCloseButton
                    label="CLOSE"
                    onPress={() => setopenEdit(false)}
                  />
                </View>
                <View style={{paddingTop: 30, width: '40%'}}>
                  <ModalButton
                    label="UPDATE"
                    onPress={() => setopenEdit(false)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={openCreate}
        animationType="slide"
        onRequestClose={() => setopenCreate(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.textHeading}>Route</Text>

            <View style={{paddingHorizontal: 10}}>
              <View>
                <TextInputComponent
                  label="Name of Route"
                  keyboardType="default"
                  placeholder="Enter route"
                  value={route_name}
                  onChange={e => setroute_name(e)}
                />
                <View style={styles.picker}>
                  <Picker
                    selectedValue={region}
                    onValueChange={itemValue => setregion(itemValue)}>
                    <Picker.Item
                      label={"Select region"}
                      value={""}
                    />
                    {RegionData.map((item, index) => (
                      <Picker.Item
                        label={item.label}
                        value={item.value}
                        key={index}
                      />
                    ))}
                  </Picker>
                </View>
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
  modalContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  modal: {
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
