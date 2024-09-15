import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParams} from '../../components/navigation/RootParams';
import {Colors} from '../../components/common/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from '../../components/common/Button';
import TextInputComponent from '../../components/common/TextInputComponent';
import {TextInput} from 'react-native-paper';
import PasswordInputComponent from '../../components/common/PasswordComponent';
import {Picker} from '@react-native-picker/picker';

type screenType = NativeStackNavigationProp<RootParams>;

export default function Signup() {
  const navigation = useNavigation<screenType>();
  const [first_name, setfirst_name] = React.useState('');
  const [last_name, setlast_name] = React.useState('');
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [confirm_password, setconfirm_password] = React.useState('');
  const [user_type, setuser_type] = React.useState('passenger');
  const [user_typeIndex, setuser_typeIndex] = React.useState(0);

  const UserTypeData = [
    {label: 'Passenger', value: 'passenger'},
    {label: 'Station Admin', value: 'admin'},
  ];

  const handleSignup = () => {
    console.log(first_name);
    console.log(last_name);
    console.log(email);
    console.log(password);
    console.log(confirm_password);
    console.log(user_type);
    
  }


  return (
    <View style={{flex: 1, height: Dimensions.get('screen').height}}>
      <ImageBackground
        resizeMode="cover"
        source={require('../../assets/1.jpg')}
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
          <ScrollView style={styles.content}>
            <Text style={styles.firstText}>Get Started</Text>
            <View style={styles.user_type}>
              {UserTypeData?.map((item, index) => (
                <TouchableOpacity
                  style={[styles.user_typeBtn, user_typeIndex=== index&&styles.activeBtn]}
                  onPress={() => {
                    setuser_type(item?.value);
                    setuser_typeIndex(index);
                  }}>
                  <Text style={[styles.user_type_text, user_typeIndex===index && styles.activeuser_type_text]}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{paddingBottom: 10}}>
              <TextInputComponent
                label="First name"
                keyboardType="default"
                placeholder="Enter first name"
                value={first_name}
                onChange={e => setfirst_name(e)}
              />
            </View>
            <View style={{paddingBottom: 10}}>
              <TextInputComponent
                label="Last name"
                keyboardType="default"
                placeholder="Enter phone number"
                value={last_name}
                onChange={e => setlast_name(e)}
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
                value={confirm_password}
                onChange={e => setconfirm_password(e)}
              />
            </View>

            <View style={{paddingTop: 20}}>
              <Button label="Sign up" onPress={handleSignup} />
            </View>
          </ScrollView>
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
  user_typeBtn: {
    padding: 10,
    width: '50%',
    alignItems: 'center',
  },
  activeBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  user_type: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 50,
    marginVertical: 10,
    elevation: 10,
    marginHorizontal: 5
  },
  user_type_text:{
    color: Colors.gray,
    fontWeight: "500",
    fontSize: 16
  },
  activeuser_type_text:{
    color: Colors.white,
    fontWeight: "500",
    fontSize: 16
  },
});
