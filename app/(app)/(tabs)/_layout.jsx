import { Tabs } from "expo-router";
import { Home, Bell, Calendar, User } from "lucide-react-native";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarActiveTintColor: "#6C63FF",
        tabBarInactiveTintColor: "#A0A0A0",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={26} />,
        }}
      />

      <Tabs.Screen
        name="reminders"
        options={{
          title: "Reminders",
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={26} />,
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => <Bell color={color} size={26} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={26} />,
        }}
      />
    </Tabs>
  );
}