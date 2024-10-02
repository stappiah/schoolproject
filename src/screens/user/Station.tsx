import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import RegionDropdown from '../../components/common/RegionDropdown';
import {MainStationCard} from '../../components/common/StationCard';
import {Colors} from '../../components/common/Colors';
import axios from 'axios';
import {StationType} from '../../components/common/Types';
import {BASEURL} from '../../components/common/BASEURL';
import {useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import {useFocusEffect} from '@react-navigation/native';
import SnackbarComponent from '../../components/common/SnackbarComponent';

export default function Station() {
  const [region, setregion] = React.useState('');
  const [openSnack, setopenSnack] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [searchvalue, setsearchvalue] = React.useState('');
  const [loadingGet, setloadingGet] = React.useState(false);
  const [stationData, setstationData] = React.useState<StationType[]>([]);
  const [searchData, setsearchData] = React.useState<StationType[]>([]);
  const user = useSelector(selectuser);

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

  const getAllStation = () => {
    setloadingGet(true);
    axios
      .get(`${BASEURL}/create-bus-station`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setstationData(response.data);
      })
      .catch(error => {
        setopenSnack(true);
        setmessage(error?.message);
      })
      .finally(() => setloadingGet(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when screen is focused
      getAllStation();
    }, []),
  );

  return (
    <SafeAreaView>
      <Header label="Select Bus station" />
      <StatusBar backgroundColor={'#f4f4f4'} />

      {loadingGet ? (
        <View style={{alignItems: 'center', justifyContent: 'center',height: "80%"}}>
          <ActivityIndicator animating color={Colors.primary} size={"large"} />
        </View>
      ) : (
        <View style={{paddingTop: 10, paddingBottom: 70}}>
          <FlatList
            ListHeaderComponent={
              <View>
                <View style={{padding: 5}}>
                  <SearchBar
                    placeholder="Search Bus Station"
                    onChange={e => setsearchvalue(e)}
                  />
                </View>
              </View>
            }
            data={stationData?.filter(
              item =>
                item?.station_name
                  ?.toLowerCase()
                  ?.includes(searchvalue?.toLowerCase()) ||
                item?.region
                  ?.toLowerCase()
                  ?.toLowerCase()
                  ?.includes(searchvalue?.toLowerCase()),
            )}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <MainStationCard data={item} />}
          />
        </View>
      )}

      <View style={{position: 'absolute', right: 0, left: 0, bottom: 40}}>
        <SnackbarComponent
          visible={openSnack}
          message={message}
          onDismiss={() => setopenSnack(false)}
          onPress={() => setopenSnack(false)}
        />
      </View>
    </SafeAreaView>
  );
}
