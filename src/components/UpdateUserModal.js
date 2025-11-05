import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingCrossButton from "./FloatingCrossButton";

const UpdateUserModal = ({
  updateUserEmail,
  updateUserPassword,
  setGetEmail,
  setGetPassword,
  setCurrentPassword,
  setNewPassword,
  isModalOpen,
  setIsModalOpen,
  errorMessage,
  setErrorMessage,
  getPassword,
  currentPassword,
  getEmail,
  newPassword,
  setShowPassword,
  showPassword,
}) => {
  return (
    <Modal visible={isModalOpen?.isOpen} animationType="slide">
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <SafeAreaView style={styles.viewContainer}>
          <Text style={styles.text}>
            {isModalOpen.type === "email" ? "Email" : "Current Password"}
          </Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder={
                isModalOpen.type === "email"
                  ? "Enter your new email"
                  : "Enter your new password"
              }
              value={isModalOpen.type === "email" ? getEmail : currentPassword}
              onChangeText={
                isModalOpen.type === "email" ? setGetEmail : setCurrentPassword
              }
              secureTextEntry={
                isModalOpen.type === "email" ? false : !showPassword.currPass
              }
              autoCapitalize="none"
              autoComplete="off"
            />
            {isModalOpen.type === "email" ? (
              <Fontisto
                style={{ position: "absolute", bottom: 33, right: 15 }}
                name="email"
                size={24}
                color="gray"
              />
            ) : (
              <AntDesign
                onPress={() =>
                  setShowPassword({
                    ...showPassword,
                    currPass: !showPassword.currPass,
                  })
                }
                style={{
                  position: "absolute",
                  bottom: 33,
                  right: 15,
                }}
                name={showPassword.currPass ? "eye" : "eye-invisible"}
                size={24}
                color="gray"
              />
            )}
          </View>
          <Text style={styles.text}>
            {isModalOpen.type === "email" ? "Password" : "New Password"}
          </Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder={
                isModalOpen.type === "email"
                  ? "Enter your password"
                  : "Enter your new password"
              }
              autoCapitalize="none"
              autoComplete="off"
              secureTextEntry={!showPassword.newPass}
              value={isModalOpen.type === "email" ? getPassword : newPassword}
              onChangeText={
                isModalOpen.type === "email" ? setGetPassword : setNewPassword
              }
            />
            <AntDesign
              onPress={() =>
                setShowPassword({
                  ...showPassword,
                  newPass: !showPassword.newPass,
                })
              }
              style={{
                position: "absolute",
                bottom: 33,
                right: 15,
              }}
              name={showPassword.newPass ? "eye" : "eye-invisible"}
              size={24}
              color="gray"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              opacity: errorMessage.length > 0 ? 1 : 0,
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {errorMessage}
            </Text>
            <Text
              onPress={() => setErrorMessage("")}
              style={{ fontWeight: "bold", color: "gray" }}
            >
              X
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              isModalOpen.type === "password"
                ? updateUserPassword()
                : updateUserEmail()
            }
          >
            <Text style={styles.buttonText}>
              {isModalOpen.type === "email"
                ? "Change Email"
                : "Change Password"}
            </Text>
          </TouchableOpacity>
          <FloatingCrossButton
            onPressAction={() =>
              setIsModalOpen({
                ...isModalOpen,
                isOpen: false,
              })
            }
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default UpdateUserModal;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: 25,
    // paddingTop:
    //   Platform.OS.toLowerCase() === "android"
    //     ? StatusBar.currentHeight + 10
    //     : 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: "gray",
    letterSpacing: 1.3,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
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
