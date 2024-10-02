import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParams} from '../../components/navigation/RootParams';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../components/common/Colors';
import TextInputComponent from '../../components/common/TextInputComponent';
import {Button} from '../../components/common/Button';
import {useSelector} from 'react-redux';
import {selectStation} from '../../feature/slices/StationSlice';
import SnackbarComponent from '../../components/common/SnackbarComponent';

type screenType = NativeStackNavigationProp<RootParams>;

export default function Reservation() {
  const navigation = useNavigation<screenType>();
  const station = useSelector(selectStation);
  const [destination, setdestination] = React.useState('');
  const [openSnack, setopenSnack] = React.useState(false);
  const [message, setmessage] = React.useState('');

  return (
    <View style={{height: Dimensions.get('window').height}}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{padding: 5}}>
          <Icon name="arrow-back-ios" size={25} color={Colors.white} />
        </TouchableOpacity>
        <View style={{paddingTop: 25}}>
          <Text style={styles.headerText}>Traveling</Text>
          <Text style={styles.headerText}>Made Easy</Text>
          <Text style={{color: Colors.white, fontSize: 17, paddingTop: 10}}>
            Enter your destination details
          </Text>
        </View>
      </View>

      <ScrollView style={styles.destinationCard}>
        <View style={styles.destinationInput}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              width: '10%',
            }}>
            <Icon name="location-pin" color={Colors.primary} size={30} />
            <View
              style={{
                backgroundColor: Colors.gray,
                padding: 0.5,
                height: 50,
                width: 0.5,
              }}
            />
            <Icon name="location-pin" color={Colors.primary} size={30} />
          </View>
          <View style={{width: '80%'}}>
            <Text style={{color: Colors.gray}}>From</Text>
            <TextInput
              readOnly
              value={station?.address}
              style={{color: Colors.gray}}
            />

            <View
              style={{
                backgroundColor: Colors.gray,
                padding: 0.5,
                width: '100%',
              }}
            />
            <Text style={{color: Colors.gray, paddingTop: 15}}>
              Destination
            </Text>
            <TextInput
              placeholder="Enter name of city or town"
              style={{color: Colors.gray}}
              placeholderTextColor={Colors.gray}
              value={destination}
              onChangeText={e => setdestination(e)}
            />
          </View>
        </View>

        <View style={{width: '96%', marginTop: 30, marginHorizontal: 'auto'}}>
          <Button
            label="Search Availability"
            onPress={() => {
              if(!destination){
                setopenSnack(true);
                setmessage("Enter your destination");
                return;
              }
              navigation.navigate('ticket', {destination: destination});
            }}
          />
        </View>
        <View style={{paddingTop: 100}}>
          <SnackbarComponent
            message={message}
            visible={openSnack}
            onDismiss={() => setopenSnack(false)}
            onPress={() => setopenSnack(false)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    backgroundColor: Colors.black,
    paddingVertical: 35,
    height: '50%',
    flex: 1,
  },
  headerText: {color: Colors.white, fontWeight: '600', fontSize: 30},
  destinationCard: {
    backgroundColor: Colors.white,
    padding: 10,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    height: '65%',
    zIndex: 10,
    right: 0,
    left: 0,
    flex: 1,
  },

  destinationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '95%',
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    padding: 10,
    marginHorizontal: 'auto',
  },
});
