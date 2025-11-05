import { StyleSheet, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";

const TaskSeacrhBar = ({ setSearchResult }) => {
  const [searchedText, setSearchedText] = useState();
  const [taskData, setTaskData] = useState();

  const fetchTaskData = async () => {
    const response = await AsyncStorage.getItem("tasks");
    const tasks = (await JSON.parse(response)) || [];
    setTaskData(tasks);
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  return (
    <View>
      <View>
        <TextInput
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          value={searchedText}
          onChangeText={(text) => {
            setSearchedText(text);
            if (text == "") {
              setSearchResult([]);
            } else {
              try {
                setSearchResult(
                  taskData &&
                    taskData?.length > 0 &&
                    taskData?.filter((task) =>
                      task?.title
                        ?.toLowerCase()
                        .includes(searchedText?.toLowerCase())
                    )
                );
              } catch (e) {
                console.error("error message", e);
              }
            }
          }}
          style={styles.searchInput}
          placeholder="Search your task from title"
        />
        <Feather
          name="search"
          size={20}
          style={{ position: "absolute", right: 8, top: 8 }}
          color="gray"
        />
      </View>
    </View>
  );
};

export default TaskSeacrhBar;

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});
