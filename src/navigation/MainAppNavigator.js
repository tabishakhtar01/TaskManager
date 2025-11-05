import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import Task from "../screens/Task/Task";
import Profile from "../screens/Profile/Profile";
import { AuthContext } from "../context/AuthContext";
import AddTaskForm from "../components/AddTaskForm";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainAppNavigator = () => {
  const { logout } = useContext(AuthContext);

  const LogoutButton = () => {
    return (
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    );
  };

  const DashboardStackNav = () => {
    return (
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskForm}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };

  const TaskStackNav = () => {
    return (
      <Stack.Navigator initialRouteName="TaskScreen">
        <Stack.Screen
          name="TaskScreen"
          component={Task}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskForm}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // tabBarActiveBackgroundColor: "#f2f2f2",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          position: "absolute",
          bottom: 8,
          marginHorizontal: 50,
          paddingHorizontal: 10,
          backgroundColor: "white",
          borderRadius: 40,
          marginBottom: 10,
          height: 70,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
        },
        tabBarBackground: () => null,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardStackNav}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome color={color} name="home" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Task"
        component={TaskStackNav}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome color={color} name="tasks" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome color={color} name="user" size={24} />
          ),
          headerRight: () => <LogoutButton />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainAppNavigator;

const styles = StyleSheet.create({
  logoutButton: {
    marginHorizontal: 10,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },

  logoutButtonText: {
    fontSize: 15,
    color: "gray",
  },
});
