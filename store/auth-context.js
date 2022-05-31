import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  deviceToken: '',
  authenticate: (token) => {},
  putDeviceToken: (devicetoken) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [deviceToken, setDeviceToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }
  function putDeviceToken(devicetoken) {
    setDeviceToken(devicetoken);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    deviceToken: deviceToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    putDeviceToken: putDeviceToken,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
