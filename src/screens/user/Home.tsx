import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
  FlatList,
  StatusBar,
  Modal,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParams} from '../../components/navigation/RootParams';
import {Avatar} from 'react-native-paper';
import {Colors} from '../../components/common/Colors';
import {Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StationCard} from '../../components/common/StationCard';
import {RegionData, Users} from '../../components/common/Data';
import {Picker} from '@react-native-picker/picker';
import {ModalButton, ModalCloseButton} from '../../components/common/Button';
import {useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import { StationType } from '../../components/common/Types';

type screenType = NativeStackNavigationProp<RootParams>;

export default function Home() {
  const navigation = useNavigation<screenType>();
  const {width, height} = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const [region, setregion] = React.useState('');
  const [openSnack, setopenSnack] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [loadingGet, setloadingGet] = React.useState(false);
  const [stationData, setstationData] = React.useState<StationType[]>([]);

  const user = useSelector(selectuser);

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
    <View
      style={{
        height: height,
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0.40)'}
        animated
        barStyle={'light-content'}
      />
      <Image
        source={require('../../assets/busimage3.jpg')}
        resizeMode="cover"
        style={{height: 350, width: width}}
      />
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: 0,
          left: 0,
          width: '100%',
        }}>
        <Avatar.Text
          label={`${user?.first_name[0]}${user?.last_name[0]}`}
          size={40}
          style={{
            borderColor: Colors.black,
            alignSelf: 'flex-end',
            margin: 20,
            backgroundColor: Colors.primary,
          }}
        />
      </View>
      <View style={styles.contentCard}>
        <View style={{flexDirection: 'row', marginHorizontal: 'auto'}}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('station')}>
            <Image
              source={require('../../assets/bus2.png')}
              style={{height: 70, width: 70}}
            />
            <Text style={styles.cardText}>Reservation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('renting')}>
            <Image
              source={require('../../assets/bus.png')}
              style={{height: 70, width: 70}}
            />
            <Text style={styles.cardText}>Rent Bus</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: Colors.black,
              fontWeight: '600',
              fontSize: 16,
              paddingTop: 10,
              fontFamily: "Roboto-Bold"
            }}>
            Bus Stations
          </Text>
          <TouchableOpacity
          onPress={() => navigation.navigate('station')}
            style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={{color: Colors.primary}}>See More</Text>
            <Icon name="arrow-right" color={Colors.primary} size={17} />
          </TouchableOpacity>
        </View>
        <View>
          {loadingGet ? (
            <View style={{justifyContent: 'center', alignItems: 'center',paddingTop: 20}}>
              <ActivityIndicator
                animating
                size={'large'}
                color={Colors.primary}
              />
            </View>
          ) : (
            <FlatList
              horizontal
              data={stationData}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => <StationCard data={item} />}
            />
          )}
        </View>
      </View>

      <SnackbarComponent
        visible={openSnack}
        message={message}
        onPress={() => setopenSnack(false)}
        onDismiss={() => setopenSnack(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentCard: {
    backgroundColor: Colors.white,
    padding: 10,
    height: '72%',
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: Dimensions.get('window').width,
  },
  card: {
    elevation: 8,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
    paddingVertical: 30,
    margin: 10,
    backgroundColor: Colors.white,
  },
  cardText: {
    color: Colors.black,
    fontSize: 17,
    paddingTop: 10,
  },
});
