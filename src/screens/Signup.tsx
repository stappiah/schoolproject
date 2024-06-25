import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
  } from 'react-native';
  import React from 'react';
  import {useNavigation} from '@react-navigation/native';
  import {NativeStackNavigationProp} from '@react-navigation/native-stack';
  import {RootParams} from '../components/navigation/RootParams';
  import {Colors} from '../components/common/Colors';
  import Icon from 'react-native-vector-icons/MaterialIcons';
  import Button from '../components/common/Button';
  import TextInputComponent from '../components/common/TextInputComponent';
  import {TextInput} from 'react-native-paper';
  import PasswordInputComponent from '../components/common/PasswordComponent';
  
  type screenType = NativeStackNavigationProp<RootParams>;
  
  export default function Signup() {
    const navigation = useNavigation<screenType>();
    const [email, setemail] = React.useState('');
    const [password, setpassword] = React.useState('');
  
    return (
      <View style={{flex: 1, height: '100%'}}>
        <ImageBackground
          resizeMode="cover"
          source={require('../assets/1.jpg')}
          style={{height: '100%', width: '100%'}}>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={'light-content'}
            translucent
          />
          <View style={{backgroundColor: 'rgba(0, 0, 0, 0.39)', flex: 1}}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" size={15} color={Colors.white} />
              <Text
                style={{color: Colors.white, fontWeight: '600', fontSize: 17}}>
                Back
              </Text>
            </TouchableOpacity>
            <View style={styles.content}>
              <Text style={styles.firstText}>Get Started</Text>
              <View style={{paddingBottom: 10}}>
                <TextInputComponent
                  label="First name"
                  keyboardType="default"
                  placeholder="Enter first name"
                  value={email}
                  onChange={e => setemail(e)}
                />
              </View>
              <View style={{paddingBottom: 10}}>
                <TextInputComponent
                  label="Last name"
                  keyboardType="default"
                  placeholder="Enter phone number"
                  value={email}
                  onChange={e => setemail(e)}
                />
              </View>
              <View style={{paddingBottom: 10}}>
                <TextInputComponent
                  label="Email"
                  keyboardType="email-address"
                  placeholder="Enter email address"
                  value={email}
                  onChange={e => setemail(e)}
                />
              </View>
              <View style={{paddingBottom: 15}}>
                <PasswordInputComponent
                  label="Password"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setpassword(e)}
                />
              </View>
              <View style={{paddingBottom: 15}}>
                <PasswordInputComponent
                  label="Confirm Password"
                  placeholder="Re-type password"
                  value={password}
                  onChange={e => setpassword(e)}
                />
              </View>
                
              <View style={{paddingTop: 20}}>
                <Button label="Sign up" />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    content: {
      backgroundColor: Colors.white,
      paddingVertical: 10,
      paddingHorizontal: 15,
      height: '80%',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      marginTop: -15,
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
    },
    backBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingLeft: 10,
      paddingTop: 40,
    },
    firstText: {
      color: Colors.primary,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 25,
      paddingVertical: 10,
    },
  });
  