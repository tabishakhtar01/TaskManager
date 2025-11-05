import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import MainAppNavigator from "./src/navigation/MainAppNavigator";
import AuthProvider, { AuthContext } from "./src/context/AuthContext";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const dummyTasks = [
//   {
//     id: 1,
//     title: "Design login page UI",
//     description: "Create a clean and responsive design for the login page.",
//     dueDate: "2025-10-22",
//     priority: "High",
//     status: "In Progress",
//   },
//   {
//     id: 2,
//     title: "Fix API integration bug",
//     description:
//       "Resolve the issue with 500 error on task creation endpoint.",
//     dueDate: "2025-10-21",
//     priority: "High",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     title: "Write unit tests for Task component",
//     description: "Add Jest tests for all major task-related functions.",
//     dueDate: "2025-10-25",
//     priority: "Medium",
//     status: "Pending",
//   },
//   {
//     id: 4,
//     title: "Update README documentation",
//     description:
//       "Add setup instructions and contribution guidelines Add setup instructions and contribution guidelines Add setup instructions and contribution guidelines.",
//     dueDate: "2025-10-28",
//     priority: "Low",
//     status: "Completed",
//   },
//   {
//     id: 5,
//     title: "Team meeting - Project Alpha",
//     description: "Discuss sprint goals and timeline adjustments.",
//     dueDate: "2025-10-20",
//     priority: "Medium",
//     status: "Completed",
//   },
//   {
//     id: 6,
//     title: "Add dark mode support",
//     description: "Implement dark mode theme toggle using context.",
//     dueDate: "2025-10-27",
//     priority: "Low",
//     status: "Pending",
//   },
//   {
//     id: 7,
//     title: "Optimize image loading",
//     description: "Reduce load time by adding caching for large images.",
//     dueDate: "2025-10-23",
//     priority: "High",
//     status: "In Progress",
//   },
// ];

function RootNavigator() {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <MainAppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
