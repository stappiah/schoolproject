import {View, Text, StatusBar, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/common/Header';
import BusCard from '../../components/common/BusCard';
import {Users} from '../../components/common/Data';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectuser } from '../../feature/slices/AuthSlice';
import { BusRentalType } from '../../components/common/Types';
import { useFocusEffect } from '@react-navigation/native';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import { BASEURL } from '../../components/common/BASEURL';

export default function Renting() {
  const user = useSelector(selectuser);
  const [openSnack, setopenSnack] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [loadingRental, setloadingRental] = React.useState(false);
  const [rentalData, setrentalData] = React.useState<BusRentalType[]>([]);

  const getStationRental = () => {
    setloadingRental(true);
    axios
      .get(`${BASEURL}/list-bus-rental`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setrentalData(response?.data);
        console.log(response.data);
      })
      .catch(error => {
        if (error?.message) {
          setmessage(error?.message);
          setopenSnack(true);
        }
      })
      .finally(() => setloadingRental(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when screen is focused
      getStationRental();
      // getStationDriver();
      // getStationSchedule();
    }, []),
  );


  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'#f4f4f4'} />
      <Header label="Select Bus" />
      <View style={{paddingBottom: 70}}>
        <FlatList data={rentalData} renderItem={({item}) => <BusCard data={item} />} />
      </View>

      <View>
        <SnackbarComponent
          visible={openSnack}
          onDismiss={() => setopenSnack(false)}
          onPress={() => setopenSnack(false)}
          message={message}
        />
      </View>
    </SafeAreaView>
  );
}
