import { Stack } from 'expo-router'

const AppLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="web-qr-scanner" />
    </Stack>
  )
}

export default AppLayout