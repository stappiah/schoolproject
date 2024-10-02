import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../../components/common/Header';
import {Users} from '../../components/common/Data';
import ArchiveCard from '../../components/common/ArchiveCard';
import {Colors} from '../../components/common/Colors';
import Rental from '../../components/achive/Rental';
import {useSelector} from 'react-redux';
import {
  RentalRequestType,
  reservationType,
} from '../../components/common/Types';
import {selectuser} from '../../feature/slices/AuthSlice';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import { BottomTabType } from '../../components/navigation/RootParams';

type achiveNav = RouteProp<BottomTabType, 'archive'>;

export default function Archive({route}: {route:achiveNav}) {
  const headerData = [{name: 'Reservations'}, {name: 'Rentals'}];
  const [headerIndex, setheaderIndex] = React.useState(0);
  const user = useSelector(selectuser);
  const [rentalData, setrentalData] = React.useState<RentalRequestType[]>([]);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [loadingReservation, setloadingReservation] = React.useState(false);
  const [loadingRequest, setloadingRequest] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [reservation, setReservation] = React.useState<reservationType[]>([]);

  const { index } = route.params || {};

  const getRentalRequest = () => {
    setloadingRequest(true);
    axios
      .get(`${BASEURL}/user-rental-request`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        setrentalData(response?.data);
      })
      .catch(error => {
        setMessage('Failed to fetch reservations');
        setOpenSnack(true);
      })
      .finally(() => setloadingRequest(false));
  };

  const getReservations = () => {
    setloadingReservation(true);
    axios
      .get(`${BASEURL}/completed-reservation`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        console.log('daa', response.data);

        setReservation(response?.data);
      })
      .catch(error => {
        setMessage('Failed to fetch reservations');
        setOpenSnack(true);
      })
      .finally(() => setloadingReservation(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      getReservations();
      getRentalRequest();
    }, [headerIndex]),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (index !== undefined) {
        setheaderIndex(index);
      }else{
        setheaderIndex(0);
      }
    }, [index]),
  );

  return (
    <View>
      <Header label="All Rservations" />
      <StatusBar backgroundColor={'#f0f0f0'} />

      <View style={{paddingBottom: 200}}>
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

        {headerIndex === 0 ? (
          <>
            {loadingReservation ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80%',
                }}>
                <ActivityIndicator
                  animating
                  color={Colors.primary}
                  size={'large'}
                />
              </View>
            ) : (
              <>
                {reservation?.length === 0 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '80%',
                    }}>
                    <Image
                      source={require('../../assets/empty.png')}
                      style={{height: 150, width: 150}}
                    />
                    <Text style={{color: Colors.gray, fontWeight: '600'}}>
                      Reservation data is empty
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={reservation}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({item}) => <ArchiveCard data={item} />}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {loadingRequest ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80%',
                }}>
                <ActivityIndicator
                  animating
                  color={Colors.primary}
                  size={'large'}
                />
              </View>
            ) : (
              <>
                {rentalData?.length === 0 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '80%',
                    }}>
                    <Image
                      source={require('../../assets/empty.png')}
                      style={{height: 150, width: 150}}
                    />
                  </View>
                ) : (
                  <FlatList
                    data={rentalData}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({item}) => <Rental data={item} />}
                  />
                )}
              </>
            )}
          </>
        )}
      </View>
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
