import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/common/Header'
import BusCard from '../components/common/BusCard'

export default function Renting() {
  return (
    <SafeAreaView>
      <Header label='Select Bus' />
      <BusCard />
      <BusCard />
      <BusCard />
    </SafeAreaView>
  )
}