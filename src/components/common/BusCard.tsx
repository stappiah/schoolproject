import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import {Colors} from './Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParams} from '../navigation/RootParams';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BusRentalType, BusType, rentalPriceType} from './Types';
import axios from 'axios';
import {BASEURL} from './BASEURL';
import {useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import SnackbarComponent from './SnackbarComponent';

type screenType = NativeStackNavigationProp<RootParams>;

export default function BusCard({data}: {data: BusRentalType}) {
  const navigation = useNavigation<screenType>();
  const user = useSelector(selectuser);
  const [rentalPricesData, setrentalPricesData] = React.useState<
    rentalPriceType[]
  >([]);
  const [busDetail, setbusDetail] = React.useState<BusType| null>(null);

  const handleRentalPrices = () => {
    axios
      .get(`${BASEURL}/bus-rental-prices/${data?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {        
        setrentalPricesData(response.data);
      })
      .catch(error => {
        console.log(error?.message);
      })
  };

  const handleBusDetails = () => {
    axios
      .get(`${BASEURL}/get-bus/${data?.bus}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        console.log(response.data);
        setbusDetail(response.data);
      })
      .catch(error => {
        console.log(error?.message);
        
      })
  };

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when screen is focused
      handleRentalPrices();
      handleBusDetails();
    }, []),
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('renting_details', {details: data})}>
      <View style={{height: 180, width: '100%', marginHorizontal: 'auto'}}>
        <Image source={{uri: data?.get_bus_image}} style={styles.busImage} />
      </View>
      <View style={{paddingHorizontal: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <Text style={{color: Colors.black, fontWeight: '600'}}>
            {busDetail?.car_name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: Colors.black,
                fontWeight: 'bold',
                paddingBottom: 5,
                fontSize: 20,
              }}>
              &cent;
            </Text>
            <Text style={{color: Colors.black, fontSize: 17}}>{rentalPricesData[0]?.price}</Text>
            <Text style={{color: Colors.black}}> / day</Text>
          </View>
        </View>

        <View style={{backgroundColor: Colors.light, padding: 0.5}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 6,
          }}>
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <Icon name="google-maps" size={20} color={Colors.primary} />
            <Text style={{color: Colors.gray}}>{busDetail?.station_address}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <Icon name="air-conditioner" size={20} color={Colors.primary} />
            <Text style={{color: Colors.gray}}>{busDetail?.air_conditioner === 'yes'? 'AC Available': "AC Not Available"}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <Icon name="account" size={20} color={Colors.primary} />
            <Text style={{color: Colors.gray}}>{busDetail?.seat_number} Seats</Text>
          </View>
        </View>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  busImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
