import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import React from 'react';
import {Colors} from '../../components/common/Colors';
import {FlatList} from 'react-native';
import {
  AddButton,
  Button,
  ModalButton,
  ModalCloseButton,
} from '../../components/common/Button';
import {Picker} from '@react-native-picker/picker';
import {RouteData, Users} from '../../components/common/Data';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReadOnlyTextInput from '../../components/common/ReadOnlyTextInput';
import AdminBus from '../../components/common/AdminBus';
import TextInputComponent from '../../components/common/TextInputComponent';
import {DataTable} from 'react-native-paper';

export default function Schedule() {
  const [headerIndex, setheaderIndex] = React.useState(0);
  const [openCreate, setopenCreate] = React.useState(false);
  const [route_name, setroute_name] = React.useState('');
  const [showTime, setshowTime] = React.useState(false);
  const [showDepartureTime, setshowDepartureTime] = React.useState(false);
  const [departureTime, setdepartureTime] = React.useState(new Date());
  const [arrivalTime, setarrivalTime] = React.useState(new Date());
  const [bus_number, setbus_number] = React.useState('');
  const [openBus, setopenBus] = React.useState(false);
  const [openDetail, setopenDetail] = React.useState(false);

  const date = new Date();

  const headerData = [
    {id: 1, label: 'Next Day', value: date},
    {id: 2, label: 'Todal', value: date},
    {id: 3, label: 'Yesterday', value: new Date(Date.now() - 86400000)},
    {id: 4, label: 'Past Trips', value: new Date(Date.now() - 86400000 * 2)},
  ];

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || arrivalTime;
    setarrivalTime(currentTime);

    if (selectedTime) {
      setshowTime(false);
    }
  };

  const onChangeDepartureTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || departureTime;
    setdepartureTime(currentTime);

    if (selectedTime) {
      setshowDepartureTime(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar
        backgroundColor={openCreate ? 'rgba(0, 0, 0, 0.5)' : 'transparent'}
      />
      <View style={{alignSelf: 'flex-end', paddingRight: 10, marginBottom: 10}}>
        <AddButton label="Add schedule" onPress={() => setopenCreate(true)} />
      </View>
      <View style={styles.header}>
        <FlatList
          data={headerData}
          horizontal
          keyExtractor={item => item.id?.toLocaleString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setheaderIndex(item?.id)}
              style={[
                styles.headerBtn,
                headerIndex === item?.id && styles.activeheader,
              ]}>
              <Text
                style={
                  headerIndex === item?.id
                    ? styles.activeheaderBtnText
                    : styles.headerBtnText
                }>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{paddingTop: 20}}>
        <DataTable>
          <DataTable.Header
            style={{
              justifyContent: 'space-evenly',
              backgroundColor: '#F0F7FD',
            }}>
            <DataTable.Title>
              <Text style={styles.th}>Destination</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.th}>Departure</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.th}>Amount</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.th}>Status</Text>
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row onPress={() => setopenDetail(true)}>
            <DataTable.Cell>
              <Text style={{color: Colors.black}}>Stephen Appiah</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{color: Colors.black}}>23:00 PM</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{color: Colors.black}}>GHC 200.00</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={{backgroundColor: Colors.primary,paddingVertical: 2,borderRadius: 10,paddingHorizontal: 10}}>
                <Text style={{color: Colors.white}}>On going</Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>

      <Modal animationType="slide" transparent visible={openCreate}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <Text style={styles.textHeading}>Add schedule</Text>
            <View>
              <View style={styles.picker}>
                <Picker
                  selectedValue={route_name}
                  onValueChange={itemValue => setroute_name(itemValue)}>
                  <Picker.Item label={'Select route'} value={''} />
                  {RouteData.map((item, index) => (
                    <Picker.Item
                      label={item.name}
                      value={item.id}
                      key={item?.id}
                    />
                  ))}
                </Picker>
              </View>
              <View style={{paddingTop: 4}}>
                <ReadOnlyTextInput
                  label="Departure Time"
                  value={departureTime?.toLocaleTimeString()}
                />
              </View>
              <View style={{paddingTop: 4}}>
                <ReadOnlyTextInput
                  label="Arrival Time"
                  value={arrivalTime?.toLocaleTimeString()}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <ModalButton
                  label="Departure Time"
                  onPress={() => setshowDepartureTime(true)}
                />
                <ModalCloseButton
                  label="Arrival Time"
                  onPress={() => setshowTime(true)}
                />
              </View>
              <TouchableOpacity onPress={() => setopenBus(true)}>
                <ReadOnlyTextInput label="Select Bus" value={bus_number} />
              </TouchableOpacity>

              <View style={styles.picker}>
                <Picker
                  selectedValue={route_name}
                  onValueChange={itemValue => setroute_name(itemValue)}>
                  <Picker.Item label={'Select Driver'} value={''} />
                  {Users.map((item, index) => (
                    <Picker.Item
                      label={`${item.first_name} ${item.last_name}`}
                      value={item.id}
                      key={item?.id}
                    />
                  ))}
                </Picker>
              </View>

              <TextInputComponent
                keyboardType="number-pad"
                label="Amount"
                placeholder="Enter amount"
              />
              <View
                style={{
                  paddingTop: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <ModalButton
                  label="   CLOSE   "
                  onPress={() => setopenCreate(false)}
                />
                <ModalCloseButton label="     ADD     " />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" visible={openDetail}>
        <View style={styles.mainModalContainer}>
          <View style={styles.modalcontainer}>
            <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
              <Text style={{color: Colors.gray, fontSize: 16, width: '40%'}}>
                Last Name:
              </Text>
              <Text style={{color: Colors.gray, fontSize: 16}}>Appiah</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bus modal */}
      <Modal animationType="slide" visible={openBus}>
        <View style={styles.mainModalContainer}>
          <View style={styles.modalcontainer}>
            <View style={{paddingBottom: 10}}>
              <FlatList data={Users} renderItem={({item}) => <AdminBus />} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Time picker */}
      {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={arrivalTime}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      {showDepartureTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={departureTime}
          mode="time"
          display="default"
          onChange={onChangeDepartureTime}
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
    paddingHorizontal: 14,
    borderRadius: 20,
    paddingVertical: 5,
  },
  activeheader: {
    backgroundColor: Colors.primary,
  },
  mainModalContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
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
  picker: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    marginTop: 10,
  },
  th: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
