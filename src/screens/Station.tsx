import {View, Text, StatusBar, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/common/Header';
import SearchBar from '../components/common/SearchBar';
import RegionDropdown from '../components/common/RegionDropdown';
import {MainStationCard} from '../components/common/StationCard';

export default function Station() {
  const [region, setregion] = React.useState('');

  const STATIONDATA = [
    {
      name: 'Accra bus station',
      address: 'Sowutuom',
      region: 'Greater Accra Region',
    },
    {
      name: 'Kumasi bus station',
      address: 'Sowutuom',
      region: 'Greater Accra Region',
    },
    {
      name: 'Tema bus station',
      address: 'Sowutuom',
      region: 'Greater Accra Region',
    },
    {
      name: 'Tamale bus station',
      address: 'Sowutuom',
      region: 'Greater Accra Region',
    },
    {
      name: 'Ofankor bus station',
      address: 'Sowutuom',
      region: 'Greater Accra Region',
    },
    {
      name: 'Bolgatanga bus station',
      address: 'Sowutuom',
      region: 'Greater Accra Region',
    },
    {
      name: 'Ayawaso bus station',
      address: 'Sowutuom',
      region: 'Greater Accra Region',
    },
    {
      name: 'Koforidua bus station',
      address: 'Sowutuom',
      region: 'Greater Accra Region',
    },
    {
      name: 'Accra bus station',
      address: 'Sowutuom',
      region: 'Greater Accra Region',
    },
    {
      name: 'Accra bus station',
      address: 'Sowutuom',
      region: 'Greater Accra Region',
    },
  ];

  return (
    <SafeAreaView>
      <Header label="Select Bus station" />

      <View style={{paddingTop: 10,paddingBottom: 70}}>
        <FlatList
          ListHeaderComponent={
            <View>
              <View style={{padding: 5}}>
                <SearchBar placeholder="Search name of bus station" />
              </View>
              <View style={{paddingHorizontal: 6}}>
                <RegionDropdown value={region} setValue={setregion} />
              </View>
            </View>
          }
          data={STATIONDATA}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <MainStationCard data={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
