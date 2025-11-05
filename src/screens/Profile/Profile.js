import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "../../components/ToasterComponent";
import UpdateUserModal from "../../components/UpdateUserModal";

const Profile = () => {
  const { logout, currentUserDetails, updateUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState();
  const [allUserDetails, setAllUserDetails] = useState();
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    type: "email",
  });
  const [getEmail, setGetEmail] = useState("");
  const [getPassword, setGetPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    currPass: false,
    newPass: false,
  });

  const fetchAlluserData = async () => {
    const resposne = await AsyncStorage.getItem("users");
    const users = (await JSON.parse(resposne)) || [];
    setAllUserDetails(users);
  };

  const updateUserEmail = async () => {
    const isFieldEmpty = getEmail == "" && getPassword == "";
    const isPasswordValid = allUserDetails?.some(
      (user) =>
        user?.userId === currentUserDetails?.userId &&
        user?.userPassword === getPassword
    );
    if (isFieldEmpty) {
      setErrorMessage("Field cant be empty");
    } else {
      if (isPasswordValid) {
        if (
          currentUserDetails?.userName?.toLowerCase() == getEmail?.toLowerCase()
        ) {
          setErrorMessage("You cant chose your existing email");
        } else {
          const toUpdateUser = allUserDetails.map((user) => {
            if (user?.userId === currentUserDetails?.userId) {
              return { ...user, userName: getEmail };
            }
            return user;
          });
          await AsyncStorage.setItem("users", JSON.stringify(toUpdateUser));
          const contextUserData = toUpdateUser.filter(
            (user) => currentUserDetails?.userId === user?.userId
          );
          setIsModalOpen({
            ...isModalOpen,
            isOpen: false,
          });
          await AsyncStorage.setItem(
            "currentUser",
            JSON.stringify(contextUserData[0])
          );
          await updateUser(contextUserData[0]);
          setToastMessage("Email updated succesfully");
          setShowToast(true);
        }
      } else {
        setErrorMessage("Incorrect Password");
      }
    }
  };

  const updateUserPassword = async () => {
    const isFieldEmpty = currentPassword == "" && newPassword == "";
    if (isFieldEmpty) {
      setErrorMessage("Fields cant be empty");
    } else {
      if (currentPassword === newPassword) {
        setErrorMessage("Old and new cant be same");
      } else {
        if (currentUserDetails?.userPassword === currentPassword) {
          const toUpdateUser = allUserDetails?.map((user) => {
            if (user?.userId === currentUserDetails?.userId) {
              return { ...user, userPassword: newPassword };
            }
            return user;
          });
          await AsyncStorage.setItem("users", JSON.stringify(toUpdateUser));
          setIsModalOpen({
            ...isModalOpen,
            isOpen: false,
          });
          const contextUserData = toUpdateUser.filter(
            (user) => currentUserDetails?.userId === user?.userId
          );
          await AsyncStorage.setItem(
            "currentUser",
            JSON.stringify(contextUserData[0])
          );
          await updateUser(contextUserData[0]);
          setToastMessage("Password updated succesfully");
          setShowToast(true);
        } else {
          setErrorMessage("Incorrect current password");
        }
      }
    }
  };

  useEffect(() => {
    setGetEmail("");
    setGetPassword("");
    setCurrentPassword("");
    setNewPassword("");
    fetchAlluserData();
    setErrorMessage("");
  }, [isModalOpen]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View>
        <Text style={styles.welcomeText}>Profile</Text>
        <Text style={styles.quote}>Tweaks your setting here!!</Text>
        <View style={styles.body}>
          <View style={{ flexShrink: 1 }}>
            <Text
              style={[
                styles.settingsText,
                {
                  borderBottomWidth: 2,
                  paddingBottom: 8,
                  borderColor: "gray",
                  marginBottom: 30,
                  fontWeight: 700,
                  fontSize: 24,
                  flexWrap: "wrap",
                  width: "100%",
                },
              ]}
            >
              {currentUserDetails?.userName}
            </Text>
          </View>
          <Text
            onPress={() => alert("Features to be added later!")}
            style={styles.settingsText}
          >
            Settings
          </Text>
          <TouchableOpacity
            onPress={() =>
              setIsModalOpen({
                isOpen: true,
                type: "email",
              })
            }
          >
            <Text style={styles.settingsText}>Change your email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setIsModalOpen({
                isOpen: true,
                type: "password",
              })
            }
          >
            <Text style={styles.settingsText}>Change your Password</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.settingsText}>Drop all your task</Text>
          </TouchableOpacity>
        </View>
        {isModalOpen && (
          <UpdateUserModal
            isModalOpen={isModalOpen}
            updateUserEmail={updateUserEmail}
            updateUserPassword={updateUserPassword}
            setGetEmail={setGetEmail}
            setGetPassword={setGetPassword}
            setCurrentPassword={setCurrentPassword}
            setNewPassword={setNewPassword}
            setIsModalOpen={setIsModalOpen}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            getEmail={getEmail}
            getPassword={getPassword}
            newPassword={newPassword}
            currentPassword={currentPassword}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#DC143C" }]}
          onPress={() => logout()}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop:
      Platform.OS.toLowerCase() === "android"
        ? StatusBar.currentHeight + 10
        : 20,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 200,
    marginBottom: 20,
    letterSpacing: 1.3,
  },
  quote: {
    fontSize: 18,
    letterSpacing: 1.3,
    marginBottom: 20,
  },
  body: {
    gap: 20,
    marginTop: 40,
  },
  settingsText: {
    fontSize: 20,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderColor: "lightgray",
  },
  button: {
    marginVertical: 20,
    backgroundColor: "#016ecd",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 1.1,
    color: "white",
  },
});
