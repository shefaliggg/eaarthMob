import LoadingScreen from "@/shared/components/LoadingScreen";
import { AuthProvider, useAuth } from "@/shared/contexts/AuthContext";
import { Stack } from "expo-router";
import { View } from "react-native";
import "./globals.css";

function AppRoutes() {
  const { isAuthenticated, initialLoading } = useAuth();

  if (initialLoading) return <LoadingScreen />;

  return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
  );
}