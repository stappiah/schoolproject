import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {AddButton} from '../../components/common/Button';
import {DataTable} from 'react-native-paper';
import {Users} from '../../components/common/Data';
import {Colors} from '../../components/common/Colors';
import Buses from '../../components/admin/Rentals/Buses';
import Request from '../../components/admin/Rentals/Request';

export default function Rentals() {
  const [openCreateBus, setopenCreateBus] = React.useState(false);
  const [openDelete, setopenDelete] = React.useState(false);
  const [headerIndex, setheaderIndex] = React.useState(0);

  const headerData = [{name: 'Buses'}, {name: 'Requests'}];

  return (
    <View>
      <View style={styles.header}>
        {headerData.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.headerBtn,
              headerIndex === index && styles.activeHeader,
            ]}
            key={index}
            onPress={() => setheaderIndex(index)}>
            <Text
              style={{
                color: headerIndex === index ? Colors.white : Colors.gray,
                fontWeight: '600',
                fontSize: 16,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{paddingTop: 15}}>{headerIndex === 0 ? <Buses />:<Request />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 10,
    elevation: 4,
    backgroundColor: Colors.white,
    margin: 10,
    flexDirection: 'row',
  },
  headerBtn: {
    width: '50%',
    alignItems: 'center',
    padding: 10,
  },
  activeHeader: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
});
