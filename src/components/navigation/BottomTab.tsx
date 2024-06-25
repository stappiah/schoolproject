import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import { Colors } from '../common/Colors';
import Oc from 'react-native-vector-icons/Octicons';
import Fa6 from 'react-native-vector-icons/FontAwesome6';
import Fa from 'react-native-vector-icons/FontAwesome';
import Account from '../../screens/Account';

export default function BottomTab() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{headerShown: false,tabBarShowLabel: false}}>
      <Tab.Screen
        name="home-tab"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            focused?

            <Fa6
              name={'house'}
              size={27}
              style={{
                color: Colors.primary
              }}
            />
            :
            <Oc
              name={'home'}
              size={27}
              style={{
                color: Colors.black
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          tabBarIcon: ({focused}) => (
            focused?

            <Fa
              name={'user'}
              size={27}
              style={{
                color: Colors.primary
              }}
            />
            :
            <Fa
              name={'user-o'}
              size={27}
              style={{
                color: Colors.black
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
