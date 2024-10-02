import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/user/Home';
import {Colors} from '../common/Colors';
import Oc from 'react-native-vector-icons/Octicons';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import Fa from 'react-native-vector-icons/FontAwesome';
import Io from 'react-native-vector-icons/Ionicons';
import Account from '../../screens/user/Account';
import Archive from '../../screens/user/Archive';
import RecentReservation from '../../screens/user/RecentReservation';
import { BottomTabType } from './RootParams';

export default function BottomTab() {
  const Tab = createBottomTabNavigator<BottomTabType>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          margin: 5,
          borderRadius: 10,
        },
      }}>
      <Tab.Screen
        name="home_tab"
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Fa6
                name={'house'}
                size={27}
                style={{
                  color: Colors.primary,
                }}
              />
            ) : (
              <Oc
                name={'home'}
                size={27}
                style={{
                  color: Colors.black,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="archive"
        component={Archive}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Io
                name={'folder-open'}
                size={27}
                style={{
                  color: Colors.primary,
                }}
              />
            ) : (
              <Io
                name={'folder-open-outline'}
                size={27}
                style={{
                  color: Colors.black,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="receipt"
        component={RecentReservation}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Io
                name={'document'}
                size={27}
                style={{
                  color: Colors.primary,
                }}
              />
            ) : (
              <Io
                name={'document-outline'}
                size={27}
                style={{
                  color: Colors.black,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Fa
                name={'user'}
                size={27}
                style={{
                  color: Colors.primary,
                }}
              />
            ) : (
              <Fa
                name={'user-o'}
                size={27}
                style={{
                  color: Colors.black,
                }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
