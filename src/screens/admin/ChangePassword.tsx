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
import {useDispatch, useSelector} from 'react-redux';
import {GetAuth, selectuser} from '../../feature/slices/AuthSlice';
import axios from 'axios';
import {BASEURL} from '../../components/common/BASEURL';

type screenType = NativeStackNavigationProp<AdminParams>;

export default function ChangePassword() {
  const navigation = useNavigation<screenType>();
  const user = useSelector(selectuser);

  const [current_password, setcurrent_password] = React.useState('');
  const [confirm_password, setconfirm_password] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [message, setmessage] = React.useState('');
  const [openSnack, setopenSnack] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const handlePasswordChange = () => {
    if (!current_password) {
      setopenSnack(true);
      setmessage('Enter current password');
      return;
    }
    if (!password) {
      setopenSnack(true);
      setmessage('Enter password');
      return;
    }
    if (!confirm_password) {
      setopenSnack(true);
      setmessage('Confirm your password');
      return;
    }
    if (confirm_password !== password) {
      setopenSnack(true);
      setmessage('Password must match');
      return;
    }
    const body = {
      current_password,
      password,
    };
    setloading(true);
    axios
      .patch(`${BASEURL}/account/change-password`, body,{
        headers: {Authorization: `token ${user?.token}`}
      })
      .then(response => {
        console.log(response.data);
        setmessage("Password successfully changed");
        setopenSnack(true);
        navigation?.goBack();
        setcurrent_password("");
        setpassword("");
        setconfirm_password("")
      })
      .catch(error => {
        if (error?.response?.data) {
          console.log(error?.response?.data);
          if (error?.response?.data?.current_password) {
            setopenSnack(true);
            setmessage(error?.response?.data?.current_password);
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
            onPress={() => navigation.navigate('settings')}>
            <Icon name="arrow-back-ios" size={15} color={Colors.white} />
            <Text
              style={{color: Colors.white, fontWeight: '600', fontSize: 17}}>
              Back
            </Text>
          </TouchableOpacity>
          <View style={styles.content}>
            <Text style={styles.firstText}>Change Password</Text>

            <View style={{paddingBottom: 15}}>
              <PasswordInputComponent
                label="Current Password"
                placeholder="Enter current password"
                value={current_password}
                onChange={e => setcurrent_password(e)}
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
                placeholder="Re-type your password"
                value={confirm_password}
                onChange={e => setconfirm_password(e)}
              />
            </View>
          

            <View style={{paddingTop: 20}}>
              {loading ? (
                <LoadingButton />
              ) : (
                <Button label="Change password" onPress={handlePasswordChange} />
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
