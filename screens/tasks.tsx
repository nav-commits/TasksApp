import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const TasksScreen = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todo"));
      const todosList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(todosList);
    };

    fetchTodos();
  }, []);

  // Add new task to Firestore
  const addTask = async () => {
    if (newTaskText.trim()) {
      try {
        const docRef = await addDoc(collection(db, "todo"), {
          title: newTaskText,
          completed: false,
          createdAt: new Date(),
        });
        setTasks([...tasks, { id: docRef.id, title: newTaskText, completed: false }]);
        setNewTaskText(""); // Clear the input field
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = async (id: string) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      await updateDoc(doc(db, "todo", id), { completed: updatedTask.completed });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: updatedTask.completed } : task
        )
      );
    }
  };

  // Delete task from Firestore
  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todo", id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const renderItem = ({ item }: { item: { id: string; title: string; completed: boolean } }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
        <View style={styles.checkbox}>
          {item.completed && <Ionicons name="checkmark-outline" size={20} color="black" />}
        </View>
      </TouchableOpacity>
      <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>{item.title}</Text>
      <TouchableOpacity onPress={() => console.log("Editing item")}>
        <Ionicons name="pencil-outline" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Ionicons name="trash-outline" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Taskify</Text>
        <TouchableOpacity style={styles.addTaskButton} onPress={addTask}>
          <Text style={styles.addTaskButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={newTaskText}
          onChangeText={setNewTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  addTaskButton: {
    backgroundColor: "red", 
    padding: 10,
    borderRadius: 5,
  },
  addTaskButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTaskText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
  },
});

export default TasksScreen;
