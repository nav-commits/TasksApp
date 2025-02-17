import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home";
import TasksScreen from "./screens/Tasks";
import TaskDetailScreen from "./screens/TaskDetail";
import AuthScreen from "./screens/auth";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack for Task Details
function TasksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
}

// Main App Component
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main">
            {() => (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "home";
                    if (route.name === "Home") {
                      iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Tasks") {
                      iconName = focused ? "list" : "list-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: "red",
                  tabBarInactiveTintColor: "gray",
                })}
              >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Tasks" component={TasksStack} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
