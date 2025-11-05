import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserDetails, setCurrentUserDetails] = useState();

  const fetchUserData = async () => {
    const response = await AsyncStorage.getItem("currentUser");
    const userData = (await JSON.parse(response)) || [];
    setCurrentUserDetails(userData);
  };

  useEffect(() => {
    fetchUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    const checkLogin = async () => {
      const logged = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(logged === "true");
    };
    checkLogin();
  }, []);

  const login = async () => {
    await AsyncStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  const updateUser = async (user) => {
    setCurrentUserDetails(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        updateUser,
        currentUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
