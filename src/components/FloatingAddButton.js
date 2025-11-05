import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const FloatingAddButton = ({ navigation, toRoute }) => {
  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate(toRoute)}
    >
      <Ionicons style={{ color: "#016ecd" }} name="add-circle" size={50} />
    </TouchableOpacity>
  );
};

export default FloatingAddButton;

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 130,
    right: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});
