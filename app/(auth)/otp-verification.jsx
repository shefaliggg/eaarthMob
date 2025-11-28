import eaarthLogo from "@/assets/images/eaarth.png";
import { useOTPVerification } from "@/features/auth/hooks/useOTPVerification";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Info } from "lucide-react-native";
import { useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


const OTPVerificationPage = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { loginSuccess } = useAuth();

    const email = params.email;
    const password = params.password;
    const rememberMe = params.rememberMe === "true";
    const devOtp = params.otp;

    useEffect(() => {
        console.log("params", params)
        if (!email) {
            console.error("email is not found in Otp page")
            router.replace("(auth)/login");
        }
    }, [email]);

    const {
        otp,
        loading,
        error,
        canResend,
        countdown,
        inputRefs,
        handleInput,
        handleBackspace,
        handleSubmit,
        handleResend,
    } = useOTPVerification(
        (data) => {
            loginSuccess({user:data.user, accessToken: data.accessToken, refreshToken: data.refreshToken });
        },
        (err) => console.error("OTP verification error:", err)
    );

    const handleFormSubmit = async () => {
        await handleSubmit(email);
    };

    const handleResendClick = async () => {
        if (password) {
            await handleResend(email, password, rememberMe);
        } else {
            console.error("Cannot resend: password not available");
        }
    };

    const handleBackClick = () => {
        router.back();
    };

    if (!email) return null;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4 bg-gray-50"> <TouchableOpacity onPress={handleBackClick} className="absolute top-10 left-4 z-10 p-2"> <ArrowLeft size={24} color="#333" /> </TouchableOpacity>
            <View className="items-center mt-16 mb-5">
                <Image source={eaarthLogo} className="w-40 h-16 mb-2" resizeMode="contain" />
                <Text className="text-gray-600 font-semibold text-sm">OTP VERIFICATION</Text>
            </View>

            <View className="bg-white rounded-3xl p-5 border border-gray-200">
                <Text className="text-center text-lg font-medium mb-2">VERIFY YOUR IDENTITY</Text>
                <Text className="text-center text-gray-500 mb-4">Enter the 6-digit code sent to your email</Text>

                <View className="flex-row items-center bg-purple-50 border border-gray-200 rounded-xl p-3 mb-4">
                    <Info size={20} color="#9333ea" />
                    <Text className="ml-2 text-gray-800 flex-shrink">
                        Email: <Text className="font-semibold">{email}</Text>
                    </Text>
                </View>

                {devOtp && (
                    <View className="bg-yellow-50 border border-yellow-300 rounded-xl p-3 mb-4">
                        <Text className="text-yellow-800 font-semibold">Dev Mode OTP: {devOtp}</Text>
                    </View>
                )}

                {error && (
                    <View className="bg-red-100 p-3 rounded-lg mb-4">
                        <Text className="text-red-700">{error}</Text>
                    </View>
                )}

                <View className="flex-row justify-center space-x-3 mb-6">
                    {otp.map((digit, i) => (
                        <TextInput
                            key={i}
                            ref={(el) => (inputRefs.current[i] = el)}
                            className={`w-12 h-14 border rounded-lg text-center text-lg font-semibold ${loading ? 'bg-gray-200' : 'bg-white'}`}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleInput(i, text)}
                            onKeyPress={(e) => handleBackspace(i, e)}
                            editable={!loading}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    onPress={handleFormSubmit}
                    disabled={loading || otp.join("").length !== 6}
                    className={`flex-row items-center justify-center gap-2 py-3 rounded-2xl ${loading || otp.join("").length !== 6 ? 'bg-purple-300' : 'bg-purple-700'}`}
                >
                    {loading ? (
                        <>
                            <ActivityIndicator color="#fff" />
                            <Text className="text-white font-semibold">VERIFYING...</Text>
                        </>
                    ) : (
                        <Text className="text-white font-semibold">VERIFY</Text>
                    )}
                </TouchableOpacity>

                <View className="mt-4 items-center">
                    <Text className="text-gray-500 text-sm mb-1">Didnt receive the code?</Text>
                    <TouchableOpacity
                        onPress={handleResendClick}
                        disabled={!canResend || loading || !password}
                    >
                        <Text className={`font-semibold ${canResend ? 'text-purple-700' : 'text-gray-400'}`}>
                            {canResend ? "Resend Code" : `Resend in ${countdown}s`}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-3 items-center">
                    <TouchableOpacity onPress={handleBackClick}>
                        <Text className="text-purple-700 text-sm font-semibold">Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text className="text-center text-gray-400 text-xs mt-3">Step 2 of 4 — OTP Verification</Text>
        </ScrollView>

    );
};

export default OTPVerificationPage;
