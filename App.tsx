import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/screens/Login';
import {RootParams} from './src/components/navigation/RootParams';
import Home from './src/screens/Home';
import LoginOption from './src/screens/LoginOption';
import Signup from './src/screens/Signup';
import BottomTab from './src/components/navigation/BottomTab';
import Station from './src/screens/Station';

export default function App() {
  const Stack = createNativeStackNavigator<RootParams>();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="option"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="option" component={LoginOption} />
          <Stack.Screen name="home" component={BottomTab} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="station" component={Station} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
