import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../components/LoginForm";
import Toaster from "../../components/ToasterComponent";
import { Keyboard } from "react-native";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setShowErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  const handleShowToast = () => {
    setShowToast(true);
    setToastMessage("LoggedIn successfull");
    setTimeout(() => setShowToast(false), 2000);
  };

  // In case we want to empty the storage
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("All AsyncStorage data cleared!");
    } catch (e) {
      console.log("error message", e);
    }
  };

  const fetchUserData = async () => {
    const userData = await AsyncStorage.getItem("users");
    setUsers(JSON.parse(userData));
  };

  const validateUser = async () => {
    const isFormValid = userName.trim() !== "" && userPassword.trim() !== "";

    if (isFormValid) {
      if (!users) {
        setShowErrorMessage("Sorry, No user found");
      } else {
        const isValid = users.find(
          (user) =>
            user.userName === userName && user.userPassword === userPassword
        );
        isValid &&
          (await AsyncStorage.setItem("currentUser", JSON.stringify(isValid)));
        if (isValid) {
          Keyboard.dismiss();
          handleShowToast();
          setTimeout(() => login(), 800);
        } else {
          setShowErrorMessage("Incorrect credentials");
          await AsyncStorage.setItem("isLoggedIn", "false");
          setUserName("");
          setUserPassword("");
        }
      }
    } else {
      setShowErrorMessage("Fields cant be empty");
    }
  };

  useEffect(() => {
    // clearAllData();
    fetchUserData();
  }, []);
  return (
    <>
      <LoginForm
        type="login"
        navigation={navigation}
        userName={userName}
        setUserName={setUserName}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        userPassword={userPassword}
        setUserPassword={setUserPassword}
        errorMessage={errorMessage}
        setShowErrorMessage={setShowErrorMessage}
        showToast={showToast}
        setShowToast={setShowToast}
        onValidate={validateUser}
      />
      {toastMessage.length > 0 && <Toaster message={toastMessage} />}
    </>
  );
};

export default LoginScreen;
