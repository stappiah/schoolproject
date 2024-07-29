import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from './Colors';

export default function TicketCard() {
  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.gray}}>TicketCard</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 1}}>
          <Text
            style={{
              color: Colors.black,
              fontWeight: 'bold',
              fontSize: 24,
              paddingBottom: 4,
            }}>
            &cent;
          </Text>
          <Text style={{color: Colors.black, fontWeight: 'bold', fontSize: 20}}>
            200
          </Text>
        </View>
      </View>
      <Text style={{color: Colors.primary, fontWeight: '500'}}>
        VIP Transport Limited
      </Text>

      <Text style={styles.departureText}>Departure Date</Text>
      <Text style={styles.departureDataTime}>Sunday, 20th July, 2024</Text>

      <View style={{flexDirection: "row",justifyContent: "space-between"}}>
        <View>
          <Text style={styles.departureText}>Departure Time</Text>
          <Text style={styles.departureDataTime}>9:00AM</Text>
        </View>
        <View>
          <Text style={styles.departureText}>Phone Number</Text>
          <Text style={styles.departureDataTime}>0551878700</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    width: '95%',
    marginHorizontal: 'auto',
    marginVertical: 5
  },
  departureDataTime: {
    color: Colors.black,
    fontWeight: '600',
  },
  departureText: {
    color: Colors.gray,
    paddingTop: 10,
  },
});
