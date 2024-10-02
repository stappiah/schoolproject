import { BusRentalType, scheduleType } from "../common/Types";

export type RootParams = {
  signup: undefined;
  login: undefined;
  home: undefined;
  option: undefined;
  station: undefined;
  reservation: undefined;
  ticket: {destination: string};
  renting: undefined;
  renting_details: {details: BusRentalType};
  bus_station: undefined;
  transport_details: {schedule_detail: scheduleType};
};

export type AdminParams = {
  admin_station: undefined;
  bookings: undefined;
  schedule: undefined;
  buses: undefined;
  rentals: undefined;
  settings: undefined;
  change_password: undefined;
}

export type BottomTabType = {
  home_tab: undefined;
  archive: {index: number};
  receipt: undefined;
  account: undefined;
}