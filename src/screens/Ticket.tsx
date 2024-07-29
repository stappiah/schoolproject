import {View, Text} from 'react-native';
import React from 'react';
import Header from '../components/common/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import TicketCard from '../components/common/TicketCard';
import {ScrollView} from 'react-native-gesture-handler';

export default function Ticket() {
  return (
    <SafeAreaView style={{paddingBottom: 40}}>
      <Header label="Available Transport" />
      <ScrollView>
        <TicketCard />
        <TicketCard />
        <TicketCard />
        <TicketCard />
        <TicketCard />
      </ScrollView>
    </SafeAreaView>
  );
}
