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
import {AdminParams, RootParams} from '../../components/navigation/RootParams';
import {Colors} from '../../components/common/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, LoadingButton} from '../../components/common/Button';
import TextInputComponent from '../../components/common/TextInputComponent';
import {TextInput} from 'react-native-paper';
import PasswordInputComponent from '../../components/common/PasswordComponent';
import {loginData} from '../../components/common/Data';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import {useDispatch} from 'react-redux';
import {GetAuth} from '../../feature/slices/AuthSlice';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';

type screenType = NativeStackNavigationProp<RootParams>;
type screenType2 = NativeStackNavigationProp<AdminParams>;

export default function Login() {
  const navigation = useNavigation<screenType>();
  const dispatch = useDispatch();

  const [phone_number, setphone_number] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [message, setmessage] = React.useState('');
  const [openSnack, setopenSnack] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const handleLogin = () => {
    if (!phone_number) {
      setopenSnack(true);
      setmessage('Enter phone number');
      return;
    }
    if (!password) {
      setopenSnack(true);
      setmessage('Enter password');
      return;
    }
    const body = {
      username: phone_number,
      password,
    };
    setloading(true);
    axios
      .post(`${BASEURL}/account/login`, body)
      .then(response => {
        console.log(response.data);

        dispatch(
          GetAuth({
            first_name: response?.data?.first_name,
            last_name: response?.data?.last_name,
            phone_number: response?.data?.phone_number,
            user_type: response?.data?.user_type,
            token: response?.data?.token,
          }),
        );
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
          if (error?.response?.data?.non_field_errors) {
            setopenSnack(true);
            setmessage(error?.response?.data?.non_field_errors[0]);
          }
        } else {
          setopenSnack(true);
          setmessage(error?.message);
        }
      })
      .finally(() => setloading(false));
  };

  return (
    <View style={{flex: 1, height: '100%'}}>
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
          <View style={styles.content}>
            <Text style={styles.firstText}>Welcome back</Text>
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
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{paddingTop: 20}}>
              {loading ? (
                <LoadingButton />
              ) : (
                <Button label="Login" onPress={handleLogin} />
              )}
            </View>
          </View>
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
    height: '60%',
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
    paddingVertical: 15,
  },
});
