import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {Colors} from '../../components/common/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {ModalButton} from '../../components/common/Button';

export default function Bookings() {
  const [openDetail, setopenDetail] = React.useState(false);

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <DataTable>
        <DataTable.Header
          style={{justifyContent: 'space-evenly', backgroundColor: '#F0F7FD'}}>
          <DataTable.Title>
            <Text style={styles.th}>Name</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.th}>Destination</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.th}>Phone</Text>
          </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row onPress={() => setopenDetail(true)}>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>Stephen Appiah</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>Brong Ahafo</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>0545158948</Text>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row onPress={() => setopenDetail(true)}>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>Stephen Appiah</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>Brong Ahafo</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>0545158948</Text>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row onPress={() => setopenDetail(true)}>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>Stephen Appiah</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>Brong Ahafo</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>0545158948</Text>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row onPress={() => setopenDetail(true)}>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>Stephen Appiah</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>Brong Ahafo</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>0545158948</Text>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row onPress={() => setopenDetail(true)}>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>Stephen Appiah</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>Brong Ahafo</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{color: Colors.black}}>0545158948</Text>
          </DataTable.Cell>
        </DataTable.Row>
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
            <Text style={styles.textHeading}>Booking Information</Text>
            <View style={{paddingHorizontal: 10}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Full Name:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 16}}>
                  Stephen Appiah
                </Text>
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
                  Booking Date:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>
                  June 1, 2025 - 10:20pm
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Seat Number:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>25</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Destination:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>Tamale</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
                <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                  Schedule ID:
                </Text>
                <Text style={{color: Colors.gray, fontSize: 14}}>10</Text>
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
});
