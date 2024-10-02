import {View, Text, FlatList, ActivityIndicator, Image} from 'react-native';
import React from 'react';
import Header from '../../components/common/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import TicketCard from '../../components/common/TicketCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Users} from '../../components/common/Data';
import {useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';
import {selectStation} from '../../feature/slices/StationSlice';
import {useFocusEffect} from '@react-navigation/native';
import {scheduleType} from '../../components/common/Types';
import { Colors } from '../../components/common/Colors';

export default function Ticket({route}: any) {
  const [loading, setloading] = React.useState(false);
  const [scheduleData, setscheduleData] = React.useState<scheduleType[]>([]);
  const user = useSelector(selectuser);
  const station = useSelector(selectStation);
  const destination = route?.params.destination;

  const getSchedule = () => {
    setloading(true);
    axios
      .get(`${BASEURL}/ongoing-schedule/${station?.id}`, {
        headers: {Authorization: `token ${user?.token}`},
      })
      .then(response => {
        const data = response?.data;
        const filteredData = data?.filter((item: scheduleType) =>
          item?.get_destination
            ?.toLowerCase()
            .includes(destination?.toLowerCase()),
        );
        console.log('data', data);
        
        setscheduleData(filteredData);
      })
      .catch(error => {
        console.log(error?.message);
      })
      .finally(() => setloading(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when screen is focused
      getSchedule();
    }, []),
  );

  return (
    <SafeAreaView style={{paddingBottom: 40}}>
      <Header label="Available Transport" />

      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <ActivityIndicator size={'large'} animating color={Colors.primary} />
        </View>
      ) : (
        <View>
          {scheduleData?.length === 0 ? (
            <View style={{height: "90%",alignItems: "center",justifyContent: "center"}}>
              <Image source={require("../../assets/empty.png")} style={{height: 200,width: 200}} />
              <View style={{flexDirection: "row",alignItems: "center",gap: 2}}>
              <Text style={{color: Colors.black,fontSize: 16}}>No result found for </Text>
              <Text style={{color: Colors.primary,fontSize: 16}}>{destination}</Text>

              </View>
            </View>
          ) : (
            <FlatList
              data={scheduleData}
              renderItem={({item}) => <TicketCard data={item} />}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
