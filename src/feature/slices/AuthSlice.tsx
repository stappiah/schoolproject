import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../Types';

export const AuthSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    GetAuth: (state, action) => {
      state.user = action.payload;
    },
    Logout: (state) => {
      state.user = null;
    },
  },
});

export const {GetAuth, Logout} = AuthSlice.actions;
export const selectuser = (state: RootState) => state.auth.user;
export default AuthSlice.reducer;