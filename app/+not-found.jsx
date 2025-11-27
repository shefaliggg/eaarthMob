import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function NotFound() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-xl font-bold">Page not found</Text>

            <Link href="/" className="text-primary mt-4">
                Go back to Home
            </Link>
        </View>
    );
}
