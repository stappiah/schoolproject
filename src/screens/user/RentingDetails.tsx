import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../../components/common/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MC from 'react-native-vector-icons/MaterialCommunityIcons';
import Antd from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParams} from '../../components/navigation/RootParams';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import TextInputComponent from '../../components/common/TextInputComponent';
import {Button} from '../../components/common/Button';

type navType = NativeStackNavigationProp<RootParams>;

export default function RentingDetails() {
  const navigation = useNavigation<navType>();
  const {width, height} = Dimensions.get('window');

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ['25%', '50%', '90%'], []);
  const {dismiss} = useBottomSheetModal();

  const handleBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  return (
    <>
      <View style={{flex: 1}}>
        <View style={{height: height / 2.5, width: width}}>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={'light-content'}
            translucent
          />
          <Image
            source={require('../../assets/busimage3.jpg')}
            style={{height: '100%', width: '100%', resizeMode: 'cover'}}
          />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={17} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{color: Colors.black, fontWeight: '600', fontSize: 17}}>
              VIP Transport Service
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.primary,
                  fontWeight: 'bold',
                  paddingBottom: 5,
                  fontSize: 20,
                }}>
                &cent;
              </Text>
              <Text style={{color: Colors.primary, fontSize: 17}}>200.00</Text>
              <Text style={{color: Colors.black}}>/day</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              justifyContent: 'space-evenly',
            }}>
            <View>
              <TouchableOpacity style={styles.phoneWhatsApp}>
                <Icon name="phone" size={25} color={Colors.primary} />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.primary,
                  textAlign: 'center',
                  fontWeight: '600',
                  paddingTop: 2,
                }}>
                Call
              </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.phoneWhatsApp}>
                <MC name="whatsapp" size={25} color={Colors.primary} />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.primary,
                  textAlign: 'center',
                  fontWeight: '600',
                  paddingTop: 2,
                }}>
                WhatsApp
              </Text>
            </View>
          </View>

          <View>
            <Text style={{color: Colors.gray}}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Praesentium eum maiores ut eaque repellendus recusandae inventore
              cumque similique? Neque asperiores fugit ducimus sequi expedita!
              Facilis, natus laboriosam. Perferendis, natus earum?
            </Text>
          </View>

          <Text
            style={{
              fontWeight: '600',
              color: Colors.black,
              paddingTop: 15,
              paddingBottom: 10,
            }}>
            SPECIFICATIONS
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 15,
              gap: 20,
            }}>
            <TouchableOpacity style={styles.iconCard}>
              <View
                style={{
                  backgroundColor: Colors.light,
                  padding: 3,
                  borderRadius: 20,
                }}>
                <MC name="car-seat" size={20} color={Colors.primary} />
              </View>
              <Text style={{color: Colors.black, fontSize: 17}}>5 Seats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCard}>
              <View
                style={{
                  backgroundColor: Colors.light,
                  padding: 3,
                  borderRadius: 20,
                }}>
                <MC name="car-seat" size={20} color={Colors.primary} />
              </View>
              <Text style={{color: Colors.black, fontSize: 17}}>Automatic</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 20,
            }}>
            <TouchableOpacity style={styles.iconCard}>
              <View
                style={{
                  backgroundColor: Colors.light,
                  padding: 3,
                  borderRadius: 20,
                }}>
                <MC name="fuel" size={20} color={Colors.primary} />
              </View>
              <Text style={{color: Colors.black, fontSize: 17}}>Diesel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCard}>
              <View
                style={{
                  backgroundColor: Colors.light,
                  padding: 3,
                  borderRadius: 30,
                }}>
                <MC name="google-maps" size={20} color={Colors.primary} />
              </View>
              <Text style={{color: Colors.black, fontSize: 17}}>Sowutuom</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => bottomSheetRef.current?.present()}>
            <Text
              style={{
                color: Colors.white,
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 17,
              }}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enableDismissOnClose
        enablePanDownToClose
        backdropComponent={handleBackdrop}>
        <View style={{paddingHorizontal: 15}}>
          <Text
            style={{
              color: Colors.black,
              fontWeight: '600',
              textAlign: 'center',
              fontSize: 17,
              paddingVertical: 10,
            }}>
            Car Rental
          </Text>
          <View>
            <TextInputComponent label="Enter your name" />
          </View>
          <View>
            <TextInputComponent label="Enter phone number" />
          </View>
          <View>
            <TextInputComponent label="Enter pick up point" />
            <TextInputComponent label="Enter destination" />
          </View>
          <View style={{paddingTop: 10}}>
            <Button label="Rent Bus" />
          </View>
        </View>
      </BottomSheetModal>
      {/* <View style={{flex: 1}}>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={handleBackdrop}>
          <Text
            style={{
              color: Colors.black,
              fontWeight: '600',
              paddingBottom: 10,
              fontSize: 17,
            }}>
            Add New Product
          </Text>
        </BottomSheetModal>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -15,
  },
  backBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 30,
    marginLeft: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: 35,
    height: 35,
    paddingLeft: 4
  },
  phoneWhatsApp: {
    backgroundColor: Colors.white,
    padding: 4,
    elevation: 4,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  iconCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 4,
  },
  btn: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: Colors.primary,
    right: 10,
    left: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: 450,
  },
});
