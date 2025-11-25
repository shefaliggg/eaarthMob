import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center p-6 px-12" >
      <Text className="text-3xl font-bold text-primary p-3 text-center">Welcome to Eaarthstudios.com.</Text>
      <Link href={"/qrcode"}>Go to QR Code</Link>
    </View>
  );
}
