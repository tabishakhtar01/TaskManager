import react, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginForm from "../../components/LoginForm";
import Toaster from "../../components/ToasterComponent";
import { Keyboard } from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setShowErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  const handleShowToast = () => {
    setShowToast(true);
    setToastMessage("User Created");
    setTimeout(() => setShowToast(false), 2000);
  };

  const getUserDetails = async () => {
    const newUser = {
      userId: new Date().getTime().toString(),
      userName,
      userPassword,
    };
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
      const existedUser = usersArray.find((user) => user.userName === userName);
      const isFormValid = userName.trim() !== "" && userPassword.trim() !== "";

      if (isFormValid) {
        if (!existedUser) {
          usersArray.push(newUser);
          await AsyncStorage.setItem("users", JSON.stringify(usersArray));
          Keyboard.dismiss();
          handleShowToast();
          setTimeout(() => {
            navigation.replace("Login");
          }, 800);
        } else {
          setShowErrorMessage("Email Already exist!");
          setUserName("");
          setUserPassword("");
        }
      } else {
        setShowErrorMessage("Fields cant be empty");
      }
    } catch (e) {
      console.error("error message", e);
    }
  };

  return (
    <>
      <LoginForm
        type="register"
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
        onValidate={getUserDetails}
      />
      {toastMessage.length > 0 && <Toaster message={toastMessage} />}
    </>
  );
};

export default RegisterScreen;
