import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/screens/user/Login';
import {AdminParams, RootParams} from './src/components/navigation/RootParams';
import Home from './src/screens/user/Home';
import LoginOption from './src/screens/user/LoginOption';
import Signup from './src/screens/user/Signup';
import BottomTab from './src/components/navigation/BottomTab';
import Station from './src/screens/user/Station';
import Reservation from './src/screens/user/Reservation';
import Ticket from './src/screens/user/Ticket';
import Renting from './src/screens/user/Renting';
import RentingDetails from './src/screens/user/RentingDetails';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AdminStation from './src/screens/admin/AdminStation';
import Bookings from './src/screens/admin/Bookings';
import Schedule from './src/screens/admin/Schedule';
import Buses from './src/screens/admin/Buses';
import Rentals from './src/screens/admin/Rentals';
import {Provider} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import Navigations from './src/components/navigation/navigations';
import { persistor, store } from './src/feature/Store';

export default function App() {
  const Stack = createNativeStackNavigator<RootParams>();
  const Drawer = createDrawerNavigator<AdminParams>();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <Navigations />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
