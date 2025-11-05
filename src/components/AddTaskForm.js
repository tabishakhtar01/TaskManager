import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import FloatingCrossButton from "./FloatingCrossButton";
import Fontisto from "@expo/vector-icons/Fontisto";
import { AuthContext } from "../context/AuthContext";
import Toaster from "./ToasterComponent";

const AddTaskForm = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const existingTask = route.params?.task || "";
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [dueDate, setDueDate] = useState();
  const [priority, setPriority] = useState();
  const [status, setStatus] = useState();
  const [showToast, setShowToast] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(
    existingTask?.priority || "Medium"
  );
  const [selectedStatus, setSelectedStatus] = useState(
    existingTask?.status || "In Progress"
  );

  const [toastMessage, setToastMessage] = useState("");

  const handleShowToast = () => {
    Keyboard.dismiss();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  const addTask = async () => {
    try {
      const response = await AsyncStorage.getItem("tasks");
      const tasks = response ? await JSON.parse(response) : [];
      if (!isUpdate) {
        const newTask = {
          id: new Date().getTime().toString(),
          title,
          description,
          dueDate,
          priority: selectedPriority,
          status: selectedStatus,
        };
        tasks.push(newTask);
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
        setToastMessage("Task created succesfully");
        handleShowToast();
      } else {
        const updatedData = tasks?.map((task) => {
          if (task.id === existingTask.id) {
            return {
              ...task,
              title,
              description,
              status: selectedStatus,
              dueDate,
              priority: selectedPriority,
            };
          }
          return task;
        });
        await AsyncStorage.setItem("tasks", JSON.stringify(updatedData));
        setToastMessage("Task updated succesfully");
        handleShowToast();
      }
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (e) {
      console.error("error message", e);
    }
  };

  const getStatusButtonStyle = (status, isStatus = false) => {
    return {
      borderWidth:
        (!isStatus ? selectedStatus : selectedPriority) === status ? 1 : 0,
      borderColor:
        (!isStatus ? selectedStatus : selectedPriority) === status
          ? "#016ecd"
          : "#fff",
      backgroundColor:
        (!isStatus ? selectedStatus : selectedPriority) === status
          ? "#016ecd"
          : "#fff",
      color:
        (!isStatus ? selectedStatus : selectedPriority) === status
          ? "#016ecd"
          : "#fff",
    };
  };

  useEffect(() => {
    setTitle(existingTask ? existingTask?.title : "");
    setDescription(existingTask ? existingTask?.description : "");
    setDueDate(existingTask ? existingTask?.dueDate : "");
    setPriority(/*existingTask ? existingTask?.priority : ""*/ "Low");
    setStatus(existingTask ? existingTask?.status : "");
    setIsUpdate(existingTask ? true : false);
  }, []);

  useEffect(() => {
    if (dueDate && showCalendar) setShowCalendar(false);
  }, [dueDate]);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.welcomeText}>Create</Text>
            <Text style={styles.quote}>Make good use of your time!!</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.addBottomBorder}>
              <Text style={styles.text}>Title</Text>
              <TextInput
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                style={styles.input}
                placeholder="Jot down your title"
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View style={styles.addBottomBorder}>
              <Text style={styles.text}>Description</Text>
              <TextInput
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                style={styles.input}
                placeholder="Jot down your description"
                multiline={true}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View
              style={[
                styles.addBottomBorder,
                { borderBottomWidth: showCalendar ? 0 : 1 },
              ]}
            >
              <Text style={styles.text}>Due Date</Text>
              <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
                <Text
                  style={[
                    styles.input,
                    { color: dueDate ? "black" : "#bcbcbe" },
                  ]}
                  placeholder="Pick your due date"
                >
                  {dueDate ? dueDate : "Pick your due date"}
                </Text>
                <Fontisto
                  style={{
                    position: "absolute",
                    right: 10,
                    color: "gray",
                  }}
                  name="date"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              {showCalendar && (
                <Calendar
                  style={{ borderRadius: 20 }}
                  onDayPress={(day) => setDueDate(day.dateString)}
                  markedDates={{
                    [dueDate]: { selected: true, selectedColor: "#0d6efd" },
                  }}
                />
              )}
            </View>
            <View style={styles.addBottomBorder}>
              <Text style={styles.text}>Priority</Text>
              <View style={styles.priorityButton}>
                <TouchableOpacity
                  onPress={() => setSelectedPriority("High")}
                  style={[
                    styles.priorityLayout,
                    getStatusButtonStyle("High", true),
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      {
                        color: selectedPriority === "High" ? "#fff" : "black",
                      },
                    ]}
                  >
                    High
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedPriority("Medium")}
                  style={[
                    styles.priorityLayout,
                    getStatusButtonStyle("Medium", true),
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      {
                        color: selectedPriority === "Medium" ? "#fff" : "black",
                      },
                    ]}
                  >
                    Medium
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedPriority("Low")}
                  style={[
                    styles.priorityLayout,
                    getStatusButtonStyle("Low", true),
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      {
                        color: selectedPriority === "Low" ? "#fff" : "black",
                      },
                    ]}
                  >
                    Low
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.addBottomBorder}>
              <Text style={styles.text}>Status</Text>
              <View style={styles.priorityButton}>
                <TouchableOpacity
                  onPress={() => setSelectedStatus("Completed")}
                  style={[
                    styles.priorityLayout,
                    getStatusButtonStyle("Completed"),
                    ,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      {
                        color:
                          selectedStatus === "Completed" ? "#fff" : "black",
                      },
                    ]}
                  >
                    Completed
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedStatus("Pending")}
                  style={[
                    styles.priorityLayout,
                    getStatusButtonStyle("Pending"),
                    ,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      {
                        color: selectedStatus === "Pending" ? "#fff" : "black",
                      },
                    ]}
                  >
                    Pending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedStatus("In Progress")}
                  style={[
                    styles.priorityLayout,
                    getStatusButtonStyle("In Progress"),
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      {
                        color:
                          selectedStatus === "In Progress" ? "#fff" : "black",
                      },
                    ]}
                  >
                    In Progress
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={addTask} style={[styles.addButton]}>
              <Text style={styles.addText}>
                {isUpdate ? "Update Task" : "Add Task"}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 100,
              backgroundColor: "#f2f2f2",
            }}
          />
        </ScrollView>
        <FloatingCrossButton onPressAction={() => navigation.goBack()} />
        {toastMessage.length > 0 && <Toaster message={toastMessage} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddTaskForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
    backgroundColor: "#f2f2f2",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 200,
    marginBottom: 20,
    letterSpacing: 1.3,
  },
  quote: {
    fontSize: 18,
    letterSpacing: 1.3,
    marginBottom: 60,
  },
  text: {
    fontSize: 25,
    fontWeight: "300",
    marginBottom: 10,
    letterSpacing: 1.3,
  },
  input: {
    paddingVertical: 10,
    borderRadius: 5,
    letterSpacing: 1.3,
  },
  addButton: {
    marginVertical: 20,
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  addText: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 1.1,
    color: "lightgray",
  },
  priorityButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 20,
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  priorityLayout: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 18,
  },
  priorityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addBottomBorder: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    marginBottom: 15,
  },
});
