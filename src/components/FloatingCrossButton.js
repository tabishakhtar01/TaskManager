import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import React from "react";

const FloatingCrossButton = ({ onPressAction }) => {
  return (
    <TouchableOpacity onPress={onPressAction} style={styles.floatingButton}>
      <Ionicons style={{ color: "gray" }} name="close-circle" size={50} />
    </TouchableOpacity>
  );
};

export default FloatingCrossButton;

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    top: 95,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});
