import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Header from '../../components/common/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import TicketCard from '../../components/common/TicketCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Users} from '../../components/common/Data';

export default function Ticket() {
  return (
    <SafeAreaView style={{paddingBottom: 40}}>
      <Header label="Available Transport" />
      <FlatList data={Users} renderItem={({item}) => <TicketCard seat_number={item.id} />} />
    </SafeAreaView>
  );
}
