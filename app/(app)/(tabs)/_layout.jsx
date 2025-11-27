import { Tabs } from 'expo-router'

const AppLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home", headerShown : false }}/>
      <Tabs.Screen name="reminders" options={{ title: "Reminders", headerShown : false }}/>
      <Tabs.Screen name="notifications" options={{ title: "Notifications", headerShown : false }}/>
      <Tabs.Screen name="profile" options={{ title: "Profile", headerShown : false }}/>
    </Tabs>
  )
}

export default AppLayout