import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TaskListCard = ({ item, index, isTaskScreen }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.taskList,
        {
          marginBottom: isTaskScreen ? 10 : 0,
          borderRadius: isTaskScreen ? 8 : 0,
          borderBottomWidth: !isTaskScreen ? 0.5 : 0,
          borderColor: "lightgray",
        },
      ]}
    >
      <View
        style={[
          styles.layer1,
          {
            paddingBottom: isTaskScreen ? 6 : 0,
            borderBottomWidth: isTaskScreen ? 2 : 0,
            paddingBottom: isTaskScreen ? 12 : 0,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 300,
            // marginBottom: 5,
          }}
        >
          Task {index + 1}
        </Text>
        <Text
          style={[
            styles.priorityText,
            {
              color:
                item?.priority == "High"
                  ? "#fe0508"
                  : item?.priority == "Medium"
                  ? "#025deb"
                  : "#2a6f31",
              backgroundColor:
                item?.priority == "High"
                  ? "#fee1da"
                  : item?.priority == "Medium"
                  ? "#d1eefc"
                  : "#d4f5d6",
            },
          ]}
        >
          {item?.priority}
        </Text>
      </View>
      <View style={styles.layer2}>
        <View
          style={[styles.titleText, { marginBottom: isTaskScreen ? 8 : 0 }]}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "400",
            }}
          >
            {item?.title}
          </Text>
        </View>
        {isTaskScreen && (
          <Text style={styles.descriptionText}>{item?.description}</Text>
        )}
      </View>
      <View style={styles.layer3}>
        <View style={styles.status}>
          <Text style={{ color: "#696969" }}>Status</Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "250",
              marginTop: 4,
            }}
          >
            {item?.status}
          </Text>
        </View>
        <View style={styles.date}>
          <Text style={{ color: "#696969" }}>Due-Date </Text>

          <Text
            style={{
              fontSize: 15,
              fontWeight: "250",
              marginTop: 4,
            }}
          >
            {item?.dueDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TaskListCard;

const styles = StyleSheet.create({
  taskList: {
    gap: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: "lightgray",
  },
  priorityText: {
    fontSize: 13,
    fontWeight: "400",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  titleText: {
    fontWeight: 400,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: 300,
    marginTop: 5,
  },
  layer2: {
    marginTop: 5,
  },
  layer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#f2f2f2",
  },
  layer3: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 40,
    marginTop: 8,
  },
});
