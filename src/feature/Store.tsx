import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AuthReducer from './slices/AuthSlice'; // Ensure the path to AuthSlice is correct

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: AuthReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Export store and persistor
export const persistor = persistStore(store);
export default store;
