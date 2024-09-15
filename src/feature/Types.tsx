interface userType {
    first_name: string;
    last_name: string;
    token: string;
    email: string;
    user_type: string;
  }
  
  export interface RootState {
    auth: {
      user: userType;
    };
  }