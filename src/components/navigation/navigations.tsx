import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AdminParams, RootParams} from './RootParams';
import {NavigationContainer} from '@react-navigation/native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import LoginOption from '../../screens/user/LoginOption';
import BottomTab from './BottomTab';
import Login from '../../screens/user/Login';
import Signup from '../../screens/user/Signup';
import Station from '../../screens/user/Station';
import Reservation from '../../screens/user/Reservation';
import Ticket from '../../screens/user/Ticket';
import Renting from '../../screens/user/Renting';
import RentingDetails from '../../screens/user/RentingDetails';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AdminStation from '../../screens/admin/AdminStation';
import Bookings from '../../screens/admin/Bookings';
import Schedule from '../../screens/admin/Schedule';
import Buses from '../../screens/admin/Buses';
import Rentals from '../../screens/admin/Rentals';
import {useSelector} from 'react-redux';
import {selectuser} from '../../feature/slices/AuthSlice';
import Settings from '../../screens/admin/Settings';
import {Colors} from '../common/Colors';
import Archive from '../../screens/user/Archive';
import TransportDetails from '../../screens/user/TransportDetails';
import {selectStation} from '../../feature/slices/StationSlice';
import ChangePassword from '../../screens/admin/ChangePassword';

export default function Navigations() {
  const Stack = createNativeStackNavigator<RootParams>();
  const Drawer = createDrawerNavigator<AdminParams>();
  const selectUser = useSelector(selectuser);
  const station = useSelector(selectStation);

  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        {selectUser?.user_type === 'passenger' ? (
          <Stack.Navigator
            initialRouteName="home"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="home" component={BottomTab} />
            <Stack.Screen name="station" component={Station} />
            <Stack.Screen name="reservation" component={Reservation} />
            <Stack.Screen name="ticket" component={Ticket} />
            <Stack.Screen name="renting" component={Renting} />
            <Stack.Screen name="renting_details" component={RentingDetails} />
            <Stack.Screen
              name="transport_details"
              component={TransportDetails}
            />
          </Stack.Navigator>
        ): selectUser === null ? (
          <Stack.Navigator
            initialRouteName="option"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="option" component={LoginOption} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
          </Stack.Navigator>
        ) : (
          <Drawer.Navigator
            screenOptions={{
              drawerActiveBackgroundColor: Colors.primary,
              drawerActiveTintColor: Colors.white,
              drawerInactiveTintColor: Colors.gray,
            }}>
            <Drawer.Screen
              name="admin_station"
              component={AdminStation}
              options={{
                drawerLabel: 'Station',
                title: station?.station_name ?? '',
              }}
            />
            <Drawer.Screen
              name="bookings"
              component={Bookings}
              options={{
                drawerLabel: 'All Bookings',
                title: station?.station_name ?? '',
              }}
            />
            <Drawer.Screen
              name="schedule"
              component={Schedule}
              options={{
                drawerLabel: 'Schedule',
                title: station?.station_name ?? '',
              }}
            />
            <Drawer.Screen
              name="buses"
              component={Buses}
              options={{
                drawerLabel: 'Buses',
                title: station?.station_name ?? '',
              }}
            />
            <Drawer.Screen
              name="rentals"
              component={Rentals}
              options={{
                drawerLabel: 'Car Rentals',
                title: station?.station_name ?? '',
              }}
            />
            <Drawer.Screen
              name="settings"
              component={Settings}
              options={{
                drawerLabel: 'Settings',
                title: station?.station_name ?? '',
                headerShown: false
              }}
            />
            <Drawer.Screen
              name="change_password"
              component={ChangePassword}
              options={{
                drawerLabel: '',
                title: '',
                headerShown: false
              }}
            />
          </Drawer.Navigator>
        )}
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
