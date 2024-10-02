export interface StationType {
  id: number;
  admin: number;
  address: string;
  station_name: string;
  company_name: string;
  start_time: string;
  closing_time: string;
  region: string;
  working_days: string[];
  image: string;
}

export interface AdminType {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface DriverType {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  license_id: string;
}

export interface RouteType {
  id: number;
  region: string;
  route_name: string;
}

export interface BusType {
  id: number;
  bus_image: string;
  car_name: string;
  car_number: string;
  date_created: string;
  fuel_type: string;
  gear_type: string;
  air_conditioner: string;
  seat_number: number;
  station_address: string;
}

export interface scheduleType {
  id: number;
  amount: number;
  arrival_time: string;
  departure_time: string;
  departure_date: string;
  destination: number;
  status: string;
  get_destination: string;
  seat_number: number;
  car_number: number;
  bus: number;
  station: number;
  fuel_type: string;
  gear_type: string;
  get_station: string;
  station_address: string;
}

export type imageType = {
  fileName: string;
  type: string;
  uri: string;
};

export interface reservationType {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  seat_number: number;
  date_created: string;
  get_amount: number;
  get_destination: string;
  get_car_number: string;
  get_station: string;
  schedule: number;
  departure_date: string;
  departure_time: string;
}

export interface scheduleReservation {
  id: number;
  email: string;
  full_name: string;
  seat_number: number;
}

export interface BusRentalType {
  id: number;
  phone_number: string;
  whatsapp: string;
  station: number;
  bus: number;
  get_bus_image: string;
  get_car_number: string;
  get_bus_name: string;
  get_station_name: string;
}

export interface rentalPriceType {
  id: number;
  destination: string;
  price: string;
  rental: number;
}

export interface RentalRequestType {
  id: number;
  cost: string;
  pickup: string;
  destination: string;
  full_name: string;
  phone_number: string;
  region: string;
  rental: number;
  created_at: string;
}
