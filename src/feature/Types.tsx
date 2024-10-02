import {StationType} from '../components/common/Types';

interface userType {
  first_name: string;
  last_name: string;
  token: string;
  user_type: string;
}

export interface RootState {
  auth: {
    user: userType;
  };
  station: {
    station: StationType;
  };
}
