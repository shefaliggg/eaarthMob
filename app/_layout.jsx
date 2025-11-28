import LoadingScreen from "@/shared/components/LoadingScreen";
import { AuthProvider, useAuth } from "@/shared/contexts/AuthContext";
import { Stack } from "expo-router";
import { Toaster } from "sonner-native";
import "./globals.css";

function AppRoutes() {
  const { isAuthenticated, initialLoading } = useAuth();

  if (initialLoading) return <LoadingScreen />;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>

        {/* Public Routes */}
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        {/* Private Routes */}
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>

      </Stack>

      <Toaster position="top-center" duration={2000} />
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}