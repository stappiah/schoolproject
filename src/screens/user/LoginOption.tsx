import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Colors} from '../../components/common/Colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParams} from '../../components/navigation/RootParams';
import {useNavigation} from '@react-navigation/native';

type screenType = NativeStackNavigationProp<RootParams>;

export default function LoginOption() {
  const navigation = useNavigation<screenType>();

  return (
    <ImageBackground
      source={require('../../assets/1.jpg')}
      style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent
      />
      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.40)', height: '100%'}}>
        <View style={styles.welcome}>
          <Text style={{color: Colors.white, fontSize: 30, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text style={{color: Colors.white,fontSize: 17,fontWeight: "800"}}>Your bus ticketing and rentals made easy</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('login')}>
            <Text
              style={{color: Colors.white, fontWeight: '700', fontSize: 17}}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => navigation.navigate('signup')}>
            <Text
              style={{color: Colors.primary, fontWeight: '700', fontSize: 17}}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: Colors.black,
  },
  buttons: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    alignItems: 'center',
    width: Dimensions.get('window').width / 2,
    // backgroundColor: Colors.primary,
    paddingVertical: 20
  },
  btn2: {
    paddingHorizontal: 10,
    alignItems: 'center',
    width: Dimensions.get('window').width / 2,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    borderTopLeftRadius: 10,
  },
  welcome: {
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
});
