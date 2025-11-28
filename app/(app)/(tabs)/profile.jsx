import { useAuth } from "@/shared/contexts/AuthContext"
import { Ionicons } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../../../shared/components/ScreenWrapper'
import { triggerGlobalLogout } from "../../../features/auth/config/globalLogoutConfig"


const Profile = () => {
  const isImageAvailable = false
  const { setIsAuthenticated } = useAuth()

  return (
    <ScreenWrapper className="flex min-h-screen">
      <SafeAreaView>
        <View className="flex gap-2">
          <View className="bg-white dark:bg-black min-h-60 flex justify-center items-center gap-4">
            <View className="p-1 rounded-full shadow-lg border border-border">
              {isImageAvailable ?
                <Image
                  source={{ uri: "https://i.pravatar.cc/100" }}
                  className="w-30 h-30 rounded-full"
                />
                :
                <View className="flex justify-center items-center size-[80px] rounded-full bg-primary-light">
                  <Text className="font-bold text-white text-4xl rounded-full">IM</Text>
                </View>
              }
            </View>
            <View className="flex items-center">
              <Text className="text-3xl font-bold">John Doe</Text>
              <Text className="text-sm text-primary font-bold">John Doe</Text>
            </View>
          </View>

          <View className="p-6 flex gap-7">
            <View className="p-6 rounded-2xl bg-white dark:bg-dark">
              <View className="flex flex-row justify-between items-center mb-3">
                <Text className="text-primary/50">Device Status</Text>
                <Text>✔️ Linked</Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-primary/50">Last Sync</Text>
                <Text>Just Now</Text>
              </View>
            </View>

            <TouchableOpacity
              className="bg-red-600 rounded-xl p-4 w-full flex flex-row justify-center items-center gap-2 active:opacity-80 shadow-md"
              onPress={() => {
                triggerGlobalLogout();
              }}
            >
              <Ionicons name="log-out-outline" size={24} color="#ffffff" />
              <Text className="text-white font-semibold text-base">
                Unlink Device
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  )
}

export default Profile