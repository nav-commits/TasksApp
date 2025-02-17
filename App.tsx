import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/home";
import TasksScreen from "./screens/tasks";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
  route: BottomTabBarProps['state']['routes'][number];
  focused: boolean;
  color: string;
  size: number;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ route, focused, color, size }) => {
  let iconName: keyof typeof Ionicons.glyphMap = 'home'; 
  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'tasks') {
    iconName = focused ? 'list' : 'list-outline';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: (props) => <TabBarIcon route={route} {...props} />,
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tasks" component={TasksScreen} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}