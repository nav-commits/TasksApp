import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
const TaskDetailScreen = ({ route }: any) => {
  const { taskId } = route.params;
  const [taskDetail, setTaskDetail] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTaskDetail = async () => {
      const taskDoc = await getDoc(doc(db, "todo", taskId));
      if (taskDoc.exists()) {
        setTaskDetail(taskDoc.data() as Todo);
      }
    };
    fetchTaskDetail();
  }, [taskId]);

  if (!taskDetail) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {" "}
      {/* Use ScrollView for content that might overflow */}
      <View style={styles.header}>
        <Text style={styles.title}>Task Details</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.detailTitle}>Title: {taskDetail.title}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Completed:</Text>
          <Text style={styles.detailValue}>
            {taskDetail.completed ? "Yes" : "No"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    width: 80,
  },
  detailValue: {
    fontSize: 16,
    flex: 1,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",
  },
  markCompleteButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TaskDetailScreen;
