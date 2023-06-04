import React, { createContext } from 'react';

interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const initialAuthContext: AuthContextType = {
  user: null,
  setUser: () => {}
};

const AuthContext = createContext(initialAuthContext);

export default AuthContext;
