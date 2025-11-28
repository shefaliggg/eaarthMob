import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "Login", headerShown: false }} />
      <Stack.Screen name="otp-verification" options={{ title: "Otp Verification", headerShown: false }} />
      <Stack.Screen name="mobile-qr-scanner" options={{ title: "Mobile QR Scanner", headerShown: false }} />
    </Stack>
  );
}
