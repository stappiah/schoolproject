import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParams} from '../components/navigation/RootParams';
import {Avatar} from 'react-native-paper';
import {Colors} from '../components/common/Colors';
import {Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StationCard } from '../components/common/StationCard';

type screenType = NativeStackNavigationProp<RootParams>;

export default function Home() {
  const navigation = useNavigation<screenType>();
  const {width, height} = Dimensions.get('window');

  // const Header = () => {
  //   <View>
  //     <Avatar.Text></Avatar.Text>
  //   </View>
  // }

  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.39)',
        height: height,
        flex: 1,
      }}>
      <Image
        source={require('../assets/busimage3.jpg')}
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
          label="HH"
          size={40}
          style={{borderColor: Colors.black, alignSelf: 'flex-end', margin: 20}}
        />
      </View>
      <View style={styles.contentCard}>
        <View style={{flexDirection: "row",marginHorizontal: "auto"}}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("station")}>
            <Image
              source={require('../assets/bus2.png')}
              style={{height: 70, width: 70}}
            />
            <Text style={styles.cardText}>Reservation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("renting")}>
            <Image
              source={require('../assets/bus.png')}
              style={{height: 70, width: 70}}
            />
            <Text style={styles.cardText}>Rent Bus</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row",justifyContent: "space-between"}}>
        <Text style={{color: Colors.black,fontWeight: "600",fontSize: 16,paddingTop: 10}}>Bus Stations</Text>
          <TouchableOpacity style={{flexDirection: "row",alignItems: "center",gap: 5}}>
            <Text style={{color: Colors.primary}}>See More</Text>
            <Icon name="arrow-right" color={Colors.primary} size={17} />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={{width: width}}>
          <StationCard />
          <StationCard />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentCard: {
    backgroundColor: Colors.white,
    padding: 10,
    height: '72%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: Dimensions.get("window").width
  },
  card: {
    elevation: 8,
    borderRadius: 10,
    width: "40%",
    alignItems: 'center',
    paddingVertical: 30,
    margin: 10,
    backgroundColor: Colors.white
  },
  cardText: {
    color: Colors.black,
    fontSize: 17,
    paddingTop: 10,
  },
});
