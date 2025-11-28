import { appEndpoints } from "@/shared/constants/appRoutesEndpoint";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useLogin } from "../../features/auth/hooks/useLogin";
import ScreenWrapper from "../../shared/components/ScreenWrapper";

const Login = () => {
  const router = useRouter();

  console.log("endpoint", appEndpoints)

  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    setRememberMe,
    loading,
    error,
    handleSubmit,
  } = useLogin(

    (data) => {
      router.replace({
        pathname: appEndpoints.auth.otpVerification,
        params: {
          email: data.email,
          password,
          rememberMe: data.rememberMe,
          otpSend: data.otpSend,
          otp: data.otp,
        }
      });
    },

    (err) => {
      console.error("Login error:", err);
    }
  );

  const handleFormSubmit = async () => {
    setRememberMe(true);
    await handleSubmit();
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6">

            {/* Logo */}
            <View className="items-center mb-10">
              <Image
                source={require("@/assets/images/eaarth.png")}
                className="w-42 h-20 mb-4"
                resizeMode="contain"
              />
              <Text className="text-muted-foreground-light dark:text-muted-foreground-dark text-base mt-1">
                Please sign in to continue with Us
              </Text>
            </View>

            {/* Error */}
            {error && (
              <Text className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm">
                {error}
              </Text>
            )}

            {/* FORM */}
            <View>

              {/* Email */}
              <Text className="text-sm mb-1 text-foreground dark:text-foreground-dark font-medium">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                keyboardType="email-address"
                className="border border-border dark:border-border-dark text-foreground dark:text-foreground-dark rounded-xl p-4 mb-5 bg-white dark:bg-[#1a1a1a]"
              />

              {/* Password */}
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-sm text-foreground dark:text-foreground-dark font-medium">
                  Password
                </Text>
                <TouchableOpacity>
                  <Text className="text-primary-light text-sm font-medium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  className="border border-border dark:border-border-dark rounded-xl p-4 pr-12 bg-white dark:bg-[#1a1a1a]"
                />
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

              {/* Login Button */}
              <TouchableOpacity
                className={`bg-primary-light rounded-xl p-4 w-full flex-row items-center gap-2 justify-center active:opacity-80 shadow-md mt-6 ${!email || !password ? "opacity-50" : ""
                  }`}
                onPress={handleFormSubmit}
                disabled={!email || !password || loading}
              >
                {loading && (
                  <ActivityIndicator size="small" color="#fff" />
                )}

                <Text className="text-white font-semibold text-base">
                  {loading ? "Signing In" : "Sign In"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* OR */}
            <View className="flex-row items-center justify-center my-8">
              <View className="flex-1 h-[1px] bg-border dark:bg-border-dark" />
              <Text className="mx-3 text-muted-foreground-light dark:text-muted-foreground-dark">
                OR
              </Text>
              <View className="flex-1 h-[1px] bg-border dark:bg-border-dark" />
            </View>

            {/* QR Login */}
            <TouchableOpacity
              className="border border-primary-light rounded-xl p-4 w-full"
              onPress={() => router.push(appEndpoints.auth.qrScanner)}
            >
              <Text className="text-primary-light text-center font-semibold text-base">
                Login with QR Code
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );

};

export default Login;