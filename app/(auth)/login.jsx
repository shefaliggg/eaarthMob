import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6">

          {/* Logo & Title */}
          <View className="items-center mb-10">
            <Image
              source={require("@/assets/images/eaarth.png")}
              className="w-32 h-32 mb-4"
              resizeMode="contain"
            />

            <Text className="text-[28px] font-bold text-foreground dark:text-foreground-dark text-center">
              Welcome Back
            </Text>

            <Text className="text-muted-foreground-light dark:text-muted-foreground-dark text-base mt-1">
              Please sign in to continue
            </Text>
          </View>

          {/* Form */}
          <View className="w-full">

            {/* Email Label */}
            <Text className="text-sm mb-1 text-foreground dark:text-foreground-dark font-medium">
              Email Address
            </Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#999"
              className="border border-border dark:border-border-dark text-foreground dark:text-foreground-dark rounded-xl p-4 mb-5 bg-white dark:bg-[#1a1a1a] shadow-sm"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password Label */}
            <Text className="text-sm mb-1 text-foreground dark:text-foreground-dark font-medium">
              Password
            </Text>

            <View className="w-full relative">
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#999"
                className="border border-border dark:border-border-dark text-foreground dark:text-foreground-dark rounded-xl p-4 pr-12 bg-white dark:bg-[#1a1a1a] shadow-sm"
                secureTextEntry={!showPassword}
              />

              {/* Show / Hide Password Icon */}
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="mt-3 mb-6 self-end">
              <Text className="text-primary-light font-medium text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity className="bg-primary-light rounded-full p-4 w-full active:opacity-80 shadow-md">
              <Text className="text-white text-center font-semibold text-base">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* OR Separator */}
          <View className="w-full flex-row items-center justify-center my-8">
            <View className="flex-1 h-[1px] bg-border dark:bg-border-dark" />
            <Text className="mx-3 text-muted-foreground-light dark:text-muted-foreground-dark">
              OR
            </Text>
            <View className="flex-1 h-[1px] bg-border dark:bg-border-dark" />
          </View>

          {/* QR Login */}
          <TouchableOpacity
            className="border border-primary-light rounded-full p-4 w-full active:opacity-80"
            onPress={() => router.push("/qr/scanner")}
          >
            <Text className="text-primary-light text-center font-semibold text-base">
              Login with QR Code
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;