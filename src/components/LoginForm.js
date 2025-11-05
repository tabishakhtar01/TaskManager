import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import react, { useState } from "react";

const LoginForm = ({
  type,
  navigation,
  userName,
  setUserName,
  showPassword,
  setShowPassword,
  userPassword,
  setUserPassword,
  errorMessage,
  setShowErrorMessage,
  showToast,
  setShowToast,
  onValidate,
}) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>
          {type === "login" ? "Welcome" : "Create"}
        </Text>
        <View style={styles.containerCard}>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter you email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              value={userName}
              onChangeText={setUserName}
            />
            <Fontisto
              style={{ position: "absolute", bottom: 33, right: 15 }}
              name="email"
              size={24}
              color="gray"
            />
          </View>
          <View>
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter you password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              value={userPassword}
              onChangeText={setUserPassword}
            />
            <AntDesign
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", bottom: 33, right: 15 }}
              name={showPassword ? "eye" : "eye-invisible"}
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
              onPress={() => setShowErrorMessage("")}
              style={{ fontWeight: "bold", color: "gray" }}
            >
              X
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onValidate}>
            <Text style={styles.buttonText}>
              {type === "login" ? "Login" : "Sign Up"}
            </Text>
          </TouchableOpacity>
          {type === "login" ? (
            <Text style={styles.account}>
              Dont have an account?{" "}
              <Text
                style={styles.registerText}
                onPress={() => navigation.replace("Register")}
              >
                Register
              </Text>
            </Text>
          ) : (
            <Text style={styles.account}>
              Already have an account?{" "}
              <Text
                style={styles.loginText}
                onPress={() => navigation.replace("Login")}
              >
                Login
              </Text>
            </Text>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingBottom: Platform.OS == "android" ? StatusBar.currentHeight : "",
  },
  welcomeText: {
    alignSelf: "flex-start",
    fontSize: 30,
    fontWeight: "200",
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  containerCard: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 25,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    fontSize: 40,
    letterSpacing: 2,
    marginBottom: 5,
    fontWeight: 200,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: "gray",
    letterSpacing: 1.3,
  },
  button: {
    alignSelf: "center",
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#0d6efd",
    marginVertical: 15,
    borderRadius: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  account: {
    alignSelf: "flex-end",
    marginVertical: 10,
    color: "gray",
  },
  registerText: {
    color: "#0d6efd",
  },
  loginText: {
    color: "#0d6efd",
  },
});
