import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../Types';

export const StationSlice = createSlice({
  name: 'station',
  initialState: {
    station: null,
  },
  reducers: {
    GetStation: (state, action) => {
      state.station = action.payload;
    },
    ClearStation: (state) => {
      state.station = null;
    }
  },
});

export const {GetStation, ClearStation} = StationSlice.actions;
export const selectStation = (state: RootState) => state.station.station;
export default StationSlice.reducer;
