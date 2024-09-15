import {View, Text, FlatList, StyleSheet, Modal} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Users} from '../../common/Data';
import {Colors} from '../../common/Colors';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import { ModalButton } from '../../common/Button';

export default function Request() {
  const [openDetail, setopenDetail] = React.useState(false);

  return (
    <View>
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
            <Text style={styles.th}>Destination</Text>
          </DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={Users}
          keyExtractor={item => item?.id.toLocaleString()}
          renderItem={({item}) => (
            <DataTable.Row
            onPress={() => setopenDetail(true)}
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
                <Text>Tamale</Text>
              </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>


      <Modal transparent animationType="slide" visible={openDetail}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Bus Rental Information</Text>
            <View style={{paddingHorizontal: 10}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Customer:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>Stephen Appiah</Text>
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
                  Destination:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  Ayawaso Central
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Pick Up Point:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  Kumasi
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
