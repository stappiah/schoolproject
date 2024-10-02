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
import {Button, LoadingButton} from '../../components/common/Button';
import TextInputComponent from '../../components/common/TextInputComponent';
import {TextInput} from 'react-native-paper';
import PasswordInputComponent from '../../components/common/PasswordComponent';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {BASEURL} from '../../components/common/BASEURL';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import {GetAuth} from '../../feature/slices/AuthSlice';

type screenType = NativeStackNavigationProp<RootParams>;

export default function Signup() {
  const navigation = useNavigation<screenType>();
  const [first_name, setfirst_name] = React.useState('');
  const [last_name, setlast_name] = React.useState('');
  const [phone_number, setphone_number] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [confirm_password, setconfirm_password] = React.useState('');
  const [user_type, setuser_type] = React.useState('passenger');
  const [user_typeIndex, setuser_typeIndex] = React.useState(0);
  const [loading, setloading] = React.useState(false);
  const [openSnack, setopenSnack] = React.useState(false);
  const [message, setmessage] = React.useState('');

  const dispatch = useDispatch();

  const UserTypeData = [
    {label: 'Passenger', value: 'passenger'},
    {label: 'Station Admin', value: 'admin'},
  ];

  const handleSignup = () => {
    if (!first_name) {
      setopenSnack(true);
      setmessage('First Name is required');
      return;
    } else if (!last_name) {
      setopenSnack(true);
      setmessage('Last Name is required');
      return;
    } else if (!phone_number) {
      setopenSnack(true);
      setmessage('Phone Number is required');
      return;
    } else if (!password) {
      setopenSnack(true);
      setmessage('Password is required');
      return;
    } else if (!confirm_password) {
      setopenSnack(true);
      setmessage('Confirm your Password');
      return;
    }
     else if (password != confirm_password) {
      setopenSnack(true);
      setmessage('Password must match');
      return;
    }
    const body = {
      first_name,
      last_name,
      phone_number,
      password,
      password2: confirm_password,
      user_type,
    };
    setloading(true);
    axios
      .post(`${BASEURL}/account/register`, body)
      .then(response => {
        console.log(response.data);
        const data = response?.data;

        dispatch(
          GetAuth({
            first_name: data?.user?.first_name,
            last_name: data?.user?.last_name,
            phone_number: data?.user?.phone_number,
            user_type: data?.user?.user_type,
            token: data?.token,
          }),
        );
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
          if (error?.response?.data?.phone_number) {
            setopenSnack(true);
            setmessage(error?.response?.data?.phone_number[0]);
          }
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setloading(false));
  };

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
                  key={index}
                  style={[
                    styles.user_typeBtn,
                    user_typeIndex === index && styles.activeBtn,
                  ]}
                  onPress={() => {
                    setuser_type(item?.value);
                    setuser_typeIndex(index);
                  }}>
                  <Text
                    style={[
                      styles.user_type_text,
                      user_typeIndex === index && styles.activeuser_type_text,
                    ]}>
                    {item.label}
                  </Text>
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
                label="Phone Number"
                keyboardType="phone-pad"
                placeholder="Enter phone number"
                value={phone_number}
                onChange={e => setphone_number(e)}
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
              {loading ? (
                <LoadingButton />
              ) : (
                <Button label="Sign up" onPress={handleSignup} />
              )}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>

      <View>
        <SnackbarComponent
          message={message}
          visible={openSnack}
          onDismiss={() => setopenSnack(false)}
          onPress={() => setopenSnack(false)}
        />
      </View>
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
    marginHorizontal: 5,
  },
  user_type_text: {
    color: Colors.gray,
    fontWeight: '500',
    fontSize: 16,
  },
  activeuser_type_text: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
});
