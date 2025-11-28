import { appEndpoints } from "@/shared/constants/appRoutesEndpoint";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();

  const isImageAvailable = false
  return (
    <SafeAreaView className="flex-1 bg-[#F4F7FA]">
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-[22px] font-semibold text-black">
              Hello, Shefali
            </Text>
            <Text className="text-[12px] text-purple-600 font-medium">CREW</Text>
          </View>
          {isImageAvailable ?
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              className="w-10 h-10 rounded-full"
            />
            :
            <View className="flex justify-center items-center size-10 rounded-full bg-primary-light">
              <Text className="font-bold text-white rounded-full">IM</Text>
            </View>
          }
        </View>

        {/* CURRENT PRODUCTION */}
        <Text className="text-[12px] text-gray-500 tracking-widest mb-2">
          CURRENT PRODUCTION
        </Text>

        <View className="bg-[#0E1D3A] p-6 rounded-3xl mb-6 shadow-2xl">
          <View className="flex-row items-center justify-between mb-3">
            <View className="bg-slate-600 p-3 rounded-2xl">
              <Text className="text-white text-xl font-extrabold">A1</Text>
            </View>

            <View className="bg-green-800/50 text-green-300 border border-green-800 px-3 py-1.5 rounded-full">
              <Text className="text-white font-semibold text-sm  rounded-full">LIVE</Text>
            </View>
          </View>

          <Text className="text-white text-[20px] font-bold mb-1">AVATAR 1</Text>
          <Text className="text-gray-300 mb-5">
            Production • Active Member
          </Text>

          <TouchableOpacity className="bg-white p-3 rounded-xl flex-row items-center justify-between">
            <Text className="font-semibold text-[14px]">ENTER WORKSPACE</Text>
            <Ionicons name="arrow-forward" size={18} />
          </TouchableOpacity>
        </View>

        {/* WEB ACCESS */}
        <Text className="text-[12px] text-gray-500 tracking-widest mb-2">
          WEB ACCESS
        </Text>

        <TouchableOpacity
          className="bg-white p-4 rounded-2xl border border-gray-200 mb-6 flex-row items-center shadow-md"
          onPress={() => router.push(appEndpoints.app.qrScanner)}
        >
          <View className="bg-blue-100 p-3 rounded-xl mr-4">
            <Ionicons name="scan" size={28} color="#2563EB" />
          </View>

          <View className="flex-1">
            <Text className="text-[16px] font-semibold">
              Authorize Web Login
            </Text>
            <Text className="text-gray-500 text-[12px]">
              Scan QR at www.eaarth.app
            </Text>
          </View>
        </TouchableOpacity>

        {/* ALL PROJECTS */}
        <Text className="text-[12px] text-gray-500 tracking-widest mb-2">
          ALL PROJECTS
        </Text>

        {/* Project Card 1 */}
        <TouchableOpacity className="bg-white p-5 rounded-t-3xl border border-border flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-xl bg-gray-200 items-center justify-center mr-4">
              <Text className="font-bold text-gray-700">AV</Text>
            </View>
            <View>
              <Text className="font-semibold text-[16px]">AVATAR 1</Text>
              <Text className="text-gray-500 text-[12px]">Production</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        {/* Project Card 2 */}
        <TouchableOpacity className="bg-white p-5 rounded-b-3xl border border-border mb-10 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-xl bg-gray-200 items-center justify-center mr-4">
              <Text className="font-bold text-gray-700">WA</Text>
            </View>
            <View>
              <Text className="font-semibold text-[16px]">WARWULF</Text>
              <Text className="text-gray-500 text-[12px]">Pre-Production</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}
