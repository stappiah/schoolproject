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
import Reservation from './src/screens/Reservation';
import Ticket from './src/screens/Ticket';
import Renting from './src/screens/Renting';
import RentingDetails from './src/screens/RentingDetails';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

export default function App() {
  const Stack = createNativeStackNavigator<RootParams>();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <Stack.Navigator
            initialRouteName="renting_details"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="option" component={LoginOption} />
            <Stack.Screen name="home" component={BottomTab} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="station" component={Station} />
            <Stack.Screen name="reservation" component={Reservation} />
            <Stack.Screen name="ticket" component={Ticket} />
            <Stack.Screen name="renting" component={Renting} />
            <Stack.Screen name="renting_details" component={RentingDetails} />
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
