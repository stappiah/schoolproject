import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import React from 'react';
import {Colors} from '../../components/common/Colors';
import Admin from '../../components/admin/station/Admin';
import Drivers from '../../components/admin/station/Drivers';
import Routes from '../../components/admin/station/Routes';
import {AddButton, ModalButton, ModalCloseButton} from '../../components/common/Button';
import TextInputComponent from '../../components/common/TextInputComponent';
import { Picker } from '@react-native-picker/picker';
import { RegionData } from '../../components/common/Data';

export default function AdminStation() {
  const [headerIndex, setheaderIndex] = React.useState(0);
  const [region, setregion] = React.useState("");
  const [openStation, setopenStation] = React.useState(false);

  const headerData = [{name: 'Admin'}, {name: 'Drivers'}, {name: 'Routes'}];

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
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

      {/* <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <AddButton label="Add station" onPress={() => setopenStation(true)} />
      </View> */}

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
            <Text style={{color: Colors.black,fontSize: 16,fontWeight: "600",paddingBottom: 10}}>Add Bus station</Text>
            <View>
              <TextInputComponent keyboardType='default' label='Station Name' placeholder='Enter bus station name' />
              <TextInputComponent keyboardType='default' label='Company Name' placeholder='Enter name of company' />
              <TextInputComponent keyboardType='phone-pad' label='Phone Number' placeholder='Enter phone number' />
              <TextInputComponent keyboardType='email-address' label='Email Address' placeholder='Enter email address' />
              <TextInputComponent keyboardType='default' label='Address' placeholder='Enter station address' />
              <View style={styles.picker}>
                <Picker
                  selectedValue={region}
                  onValueChange={itemValue => setregion(itemValue)}>
                  <Picker.Item label={'Select region'} value={''} />
                  {RegionData.map((item, index) => (
                    <Picker.Item
                      label={item.label}
                      value={item.value}
                      key={index}
                    />
                  ))}
                </Picker>
              </View>
              {/* 0543083824             */}
              <View style={{flexDirection: "row",justifyContent: "space-between",paddingVertical: 10}}>
                <ModalCloseButton label='   CLOSE   ' onPress={() => setopenStation(false)} />
                <ModalButton label='ADD STATION' onPress={() => setopenStation(false)} />
              </View>
              </View>
          </View>
        </View>
      </Modal>
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
    width: "85%"
  },
  picker: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    marginTop: 10,
  },
});
