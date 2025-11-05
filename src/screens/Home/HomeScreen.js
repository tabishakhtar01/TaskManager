import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TaskListCard from "../../components/TaskListCard";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskSeacrhBar from "../../components/TaskSeacrhBar";
import FloatingAddButton from "../../components/FloatingAddButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "../../components/ToasterComponent";
import { AuthContext } from "../../context/AuthContext";
const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [taskData, setTaskData] = useState();
  const [completeTask, setCompletedTask] = useState();
  const [pendingTask, setPendingTask] = useState();
  const [inProgressTask, setInProgressTask] = useState();
  const [selectedFilter, setSelectedFilter] = useState(taskData);
  const [searchResult, setSearchResult] = useState();

  const statusFilter = (status) => {
    return taskData?.filter(
      (task) => task?.status?.toLowerCase() === status?.toLowerCase()
    )?.length;
  };

  const clearAllTasks = async () => {
    try {
      await AsyncStorage.removeItem("tasks");
      console.log("All tasks deleted!");
    } catch (e) {
      console.error("error message", e);
    }
  };

  const clearAllUsers = async () => {
    try {
      await AsyncStorage.removeItem("users");
      console.log("All users deleted!");
    } catch (e) {
      console.error("error message", e);
    }
  };
  useEffect(() => {
    // clearAllTasks();
    // clearAllUsers();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getTaskData = async () => {
        const response = await AsyncStorage.getItem("tasks");
        const tasks = (await JSON.parse(response)) || [];
        setTaskData(tasks);
      };
      getTaskData();
    }, [])
  );

  useEffect(() => {
    setCompletedTask(
      taskData?.filter((task) => task?.status?.toLowerCase() == "completed")
    );
    setPendingTask(
      taskData?.filter((task) => task?.status?.toLowerCase() == "pending")
    );
    setInProgressTask(
      taskData?.filter((task) => task?.status?.toLowerCase() == "in progress")
    );
    setSelectedFilter(taskData);
  }, [taskData]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View>
        <Text style={styles.welcomeText}>Hi, User</Text>
        <Text style={styles.quote}>Stay Productive Today!!</Text>
      </View>
      <View style={styles.taskContainer}>
        <TouchableOpacity
          onPress={() => setSelectedFilter(taskData)}
          style={styles.taskCard}
        >
          <Text style={styles.taskText}>Total Task</Text>
          <Text style={styles.taskCount}>{taskData?.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedFilter(completeTask)}
          style={styles.taskCard}
        >
          <Text style={styles.taskText}>Completed</Text>
          <Text style={styles.taskCount}>{statusFilter("Completed")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedFilter(inProgressTask)}
          style={styles.taskCard}
        >
          <Text style={styles.taskText}>Working</Text>
          <Text style={styles.taskCount}>{statusFilter("In Progress")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedFilter(pendingTask)}
          style={styles.taskCard}
        >
          <Text style={styles.taskText}>Pending</Text>
          <Text style={styles.taskCount}>{statusFilter("Pending")}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TaskSeacrhBar setSearchResult={setSearchResult} />
      </View>
      {taskData && taskData?.length > 0 ? (
        <View style={styles.cardList}>
          <FlatList
            style={{
              borderRadius: 8,
            }}
            data={
              searchResult && searchResult.length > 0
                ? searchResult
                : selectedFilter
            }
            contentContainerStyle={{ paddingBottom: insets.bottom }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TaskListCard item={item} index={index} isTaskScreen={false} />
            )}
            keyExtractor={(item) => item?.id?.toString()}
            ListFooterComponent={
              <View
                style={{
                  backgroundColor: "white",
                  paddingBottom:
                    Platform.OS.toLowerCase() === "android" ? 100 : 70,
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
      <FloatingAddButton navigation={navigation} toRoute={"AddTask"} />
    </SafeAreaView>
  );
};

export default HomeScreen;

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
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    borderRadius: 8,
  },
  taskCard: {
    width: "48%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
  },
  taskCount: {
    fontSize: 28,
    letterSpacing: 1.3,
    marginTop: 5,
    fontWeight: 600,
  },
  searchText: {
    fontSize: 18,
    marginVertical: 10,
    letterSpacing: 1.3,
  },
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardList: {
    flex: 1,
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
});
