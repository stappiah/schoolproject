import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../components/common/Colors';
import { AdminParams, RootParams } from '../../components/navigation/RootParams';
import { Logout, selectuser } from '../../feature/slices/AuthSlice';
import { ModalButton, ModalCloseButton } from '../../components/common/Button';

type screenType = NativeStackNavigationProp<RootParams>;

export default function Account() {
  const navigation = useNavigation<screenType>();
  const {width, height} = Dimensions.get("window");
  const dispatch = useDispatch();
  const user = useSelector(selectuser)
  const [openLogout, setopenLogout] = React.useState(false)

  return (
    <SafeAreaView style={{backgroundColor: Colors.white}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={"transparent"} translucent />
      <View
        style={{
          backgroundColor: Colors.black,
          height: 360,
          position: 'relative',
        }}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" color={Colors.black} size={20} />
        </TouchableOpacity>
        <ImageBackground
          source={require('../../assets/busimage2.jpg')}
          resizeMode="cover"
          style={{height: 360, width: width}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.39)',
            }}>
            <View style={{borderColor: Colors.white,borderWidth: 2,height: 50,width: 50,borderRadius: 100,alignItems: "center",justifyContent: "center"}}>
              <Text style={{color: Colors.white,fontWeight: "bold",fontSize: 20}}>{user?.first_name[0]}{user?.last_name[0]}</Text>
            </View>
            <Text style={{color: Colors.white,fontWeight: "600",fontSize: 17,paddingTop: 10}}>{user?.first_name}{" "} {user?.last_name}</Text>
            <Text style={{color: Colors.white,fontWeight: "600",fontSize: 17,paddingBottom: 10}}>{user?.user_type}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={{marginHorizontal: 20, backgroundColor: Colors.white,borderRadius: 10,marginTop: -20,paddingVertical: 10,elevation: 10}}>
        <TouchableOpacity style={{flexDirection: "row",gap: 10,padding: 10}}>
          <Icon name='manage-accounts' size={20} color={Colors.gray} />
          <Text style={{color: Colors.black}}>Edit Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: "row",gap: 10,padding: 10}}>
          <Icon name='lock' size={20} color={Colors.gray} />
          <Text style={{color: Colors.black}}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: "row",gap: 10,padding: 10}} onPress={() => setopenLogout(true)}>
          <Icon name='power-settings-new' size={20} color={Colors.gray} />
          <Text style={{color: Colors.black}}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent animationType="slide" visible={openLogout}>
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
          }}>
          <View style={styles.modalcontainer}>
            <View style={{flexDirection: "row",alignItems: 'center',justifyContent: "center"}}>

            <Text style={styles.textHeading}>
              Are you sure you want to{' '}
            </Text>
            <Text
              style={{
                color: Colors.primary,
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
              }}>
              Logout
            </Text>
            </View>

            <View style={{flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
              <View style={{paddingTop: 30, width: '40%'}}>
                <ModalCloseButton
                  label="CLOSE"
                  onPress={() => setopenLogout(false)}
                />
              </View>
              <View style={{paddingTop: 30, width: '40%'}}>
                
                  <ModalButton label="CONFIRM" onPress={() => dispatch(Logout())} />
                
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  backArrow: {
    height: 30,
    width: 30,
    backgroundColor: Colors.white,
    borderRadius: 100,
    top: 25,
    position: 'absolute',
    left: 10,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 6,
  },
  modalcontainer: {
    backgroundColor: Colors.white,
    width: '85%',
    elevation: 15,
    padding: 15,
    borderRadius: 10,
  },
  textHeading: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 10,
  },
})