import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Button,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskSeacrhBar from "../../components/TaskSeacrhBar";
import TaskListCard from "../../components/TaskListCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FloatingAddButton from "../../components/FloatingAddButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "../../components/ToasterComponent";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from "../../context/AuthContext";

const Task = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchResult, setSearchResult] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [taskData, setTaskData] = useState();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchTaskData = async () => {
    const response = await AsyncStorage.getItem("tasks");
    const task = await JSON.parse(response);
    setTaskData(task);
  };

  const handleShowToast = () => {
    setShowToast(true);
    setToastMessage("LoggedIn successfull");
    setTimeout(() => setShowToast(false), 2000);
  };

  const deleteTask = async () => {
    const deletedData = taskData?.filter((task) => task.id !== selectedTask.id);
    await AsyncStorage.setItem("tasks", JSON.stringify(deletedData));
    setTaskData(deletedData);
    setIsModalOpen(false);
    setToastMessage("Task Deleted");
    handleShowToast();
  };

  const updateTask = () => {
    setIsModalOpen(false);
    navigation.navigate("AddTask", { task: selectedTask });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTaskData();
    }, [])
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Task</Text>
        <Text style={styles.quote}>Increase your productivity!!</Text>
      </View>
      <TaskSeacrhBar setSearchResult={setSearchResult} />
      {taskData && taskData.length > 0 ? (
        <View>
          <FlatList
            style={{ borderRadius: 8 }}
            showsVerticalScrollIndicator={false}
            data={
              searchResult && searchResult.length > 0 ? searchResult : taskData
            }
            contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setIsModalOpen(true);
                  setSelectedTask(item);
                }}
              >
                <TaskListCard item={item} index={index} isTaskScreen={true} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item?.id?.toString()}
            ListFooterComponent={
              <View
                style={{
                  backgroundColor: "white",
                  paddingBottom:
                    Platform.OS.toLowerCase() === "android" ? 150 : 100,
                  backgroundColor: "#f2f2f2",
                }}
              />
            }
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyContainerText}>
            No Task created, Please add a few
          </Text>
        </View>
      )}

      <Modal
        style={{ borderRadius: 8 }}
        animationType="slide"
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{selectedTask?.title}</Text>
          <Text style={styles.description}>{selectedTask?.description}</Text>
          <Text style={styles.status}>{selectedTask?.status}</Text>
          <View style={styles.priorityCard}>
            <Text style={styles.dueDate}>{selectedTask?.dueDate}</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Text style={{ fontSize: 18 }}>Priority</Text>
              <View
                style={[
                  styles.priority,
                  {
                    backgroundColor:
                      selectedTask?.priority?.toLowerCase() == "high"
                        ? "#c7254e"
                        : selectedTask?.priority?.toLowerCase() == "medium"
                        ? "#016ecd"
                        : "#5cb85c",
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => updateTask()}
            >
              <Text style={styles.editText}>Update Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask()}
            >
              <Text style={styles.editText}>Delete Task</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setIsModalOpen(false)}
            style={styles.floatingButton}
          >
            <Ionicons style={{ color: "gray" }} name="close-circle" size={50} />
          </TouchableOpacity>
        </View>
      </Modal>
      <FloatingAddButton navigation={navigation} toRoute={"AddTask"} />
    </SafeAreaView>
  );
};

export default Task;

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
  title: {
    fontSize: 30,
    fontWeight: 200,
    marginBottom: 20,
    letterSpacing: 1.3,
  },
  description: {
    fontSize: 30,
  },
  status: {
    fontSize: 18,
  },
  dueDate: {
    fontSize: 18,
  },
  quote: {
    fontSize: 18,
    letterSpacing: 1.3,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingTop: 20,
    backgroundColor: "#f2f2f2",
    gap: 15,
  },
  priorityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priority: {
    height: 30,
    width: 30,
    borderRadius: 30,
    alignSelf: "baseline",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
  },
  editButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  editText: {
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  deleteText: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainerText: {
    fontSize: 20,
    fontWeight: 300,
  },
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
