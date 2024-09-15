import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../components/common/Colors';
import { AdminParams, RootParams } from '../../components/navigation/RootParams';
import { Logout, selectuser } from '../../feature/slices/AuthSlice';

type screenType = NativeStackNavigationProp<RootParams>;

export default function Account() {
  const navigation = useNavigation<screenType>();
  const {width, height} = Dimensions.get("window");
  const dispatch = useDispatch();
  const user = useSelector(selectuser)

  return (
    <SafeAreaView style={{backgroundColor: Colors.white}}>
      <StatusBar barStyle={'dark-content'}backgroundColor={"white"} />
      <View
        style={{
          backgroundColor: Colors.black,
          height: 300,
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
          style={{height: 300, width: width}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.39)',
            }}>
            <View style={{borderColor: Colors.white,borderWidth: 2,height: 50,width: 50,borderRadius: 100,alignItems: "center",justifyContent: "center"}}>
              <Text style={{color: Colors.white,fontWeight: "bold",fontSize: 20}}>SA</Text>
            </View>
            <Text style={{color: Colors.white,fontWeight: "600",fontSize: 17,paddingTop: 10}}>Stephen Appiah</Text>
            <Text style={{color: Colors.white,fontWeight: "600",fontSize: 17,paddingBottom: 10}}>{user?.user_type}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={{marginHorizontal: 20, backgroundColor: Colors.white,borderRadius: 10,marginTop: -15,paddingVertical: 10,elevation: 10}}>
        <TouchableOpacity style={{flexDirection: "row",gap: 10,padding: 10}}>
          <Icon name='manage-accounts' size={20} color={Colors.gray} />
          <Text style={{color: Colors.black}}>Edit Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: "row",gap: 10,padding: 10}}>
          <Icon name='lock' size={20} color={Colors.gray} />
          <Text style={{color: Colors.black}}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: "row",gap: 10,padding: 10}} onPress={() => dispatch(Logout())}>
          <Icon name='power-settings-new' size={20} color={Colors.gray} />
          <Text style={{color: Colors.black}}>Logout</Text>
        </TouchableOpacity>
      </View>
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
})