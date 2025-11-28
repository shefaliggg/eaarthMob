import { appEndpoints } from "@/shared/constants/appRoutesEndpoint";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLogin } from "../../features/auth/hooks/useLogin";
import ScreenWrapper from "../../shared/components/ScreenWrapper";
import { Loader2 } from "lucide-react-native";

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
    <ScreenWrapper className="flex-1 justify-center min-h-screen">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 80}
      >
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="justify-center px-6">

              {/* Logo & Title */}
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
              {error && (
                <Text className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm">
                  {error}
                </Text>
              )}

              {/* Form */}
              <View className="w-full">

                {/* Email Label */}
                <Text className="text-sm mb-1 text-foreground dark:text-foreground-dark font-medium">
                  Email Address
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                  className="border border-border dark:border-border-dark text-foreground dark:text-foreground-dark rounded-xl p-4 mb-5 bg-white dark:bg-[#1a1a1a]"
                />


                <View className="flex items-center justify-between flex-row mb-1">
                  {/* Password Label */}
                  <Text className="text-sm text-foreground dark:text-foreground-dark font-medium">
                    Password
                  </Text>
                  {/* Forgot Password */}
                  <TouchableOpacity className="mt-3 mb-6 self-end">
                    <Text className="text-primary-light font-medium text-sm">
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="w-full relative">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#999"
                    className="border border-border dark:border-border-dark text-foreground dark:text-foreground-dark rounded-xl p-4 pr-12 bg-white dark:bg-[#1a1a1a]"
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

                {/* Login Button */}
                <TouchableOpacity
                  className={`bg-primary-light rounded-xl p-4 w-full active:opacity-80 shadow-md mt-6 flex-row items-center justify-center ${!email || !password ? "opacity-50" : ""}`}
                  onPress={handleFormSubmit}
                  disabled={!email || !password || loading}
                >
                  {loading && (
                    <Loader2
                      size={20}
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                  )}

                  <Text className="text-white text-center font-semibold text-base">
                    {loading ? "Signing In" : "Sign In"}
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
                className="border border-primary-light rounded-xl p-4 w-full active:opacity-80"
                onPress={() => router.push(appEndpoints.auth.qrScanner)}
              >
                <Text className="text-primary-light text-center font-semibold text-base">
                  Login with QR Code
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Login;