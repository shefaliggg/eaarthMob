import { appEndpoints } from "@/shared/constants/appRoutesEndpoint";
import { useAuth } from "@/shared/contexts/AuthContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { useQrLogin } from "../../features/auth/hooks/useQrLogin";

const WebQrScanner = () => {
    const router = useRouter();
    const { loginSuccess } = useAuth();

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, []);

    const {
        qrId,
        saveQrId,
        loading,
        error,
        setError,
        handleSubmit
    } = useQrLogin(
        (data) => {
            toast.success("Web session linked successfully!");
            router.replace(appEndpoints.app.home);
        },
        (error) => {
            console.error("QR Login Failed", error);
            setError(error?.message || "Failed to Login Using QR");
            toast.error("QR login failed");
        }
    );


    const handleButtonPress = async () => {
        if (!scanned) return;
        await handleSubmit({ loginType: "web" });
        setScanned(false);
    };

    const handleScan = ({ data }) => {
        console.log(data)
        if (scanned) return;

        setScanned(true);
        saveQrId(data);
    };

    if (!permission)
        return (
            <SafeAreaView className="flex-1 bg-black justify-center items-center">
                <Text className="text-white">Checking camera permissions...</Text>
            </SafeAreaView>
        );

    if (!permission.granted)
        return (
            <SafeAreaView className="flex-1 bg-black justify-center items-center">
                <Text className="text-white mb-4">Camera access is required.</Text>
                <TouchableOpacity
                    onPress={requestPermission}
                    className="bg-white px-6 py-3 rounded-full"
                >
                    <Text className="text-black">Grant Permission</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );

    return (
        <SafeAreaView className="flex-1 bg-black">
            {/* Top Section */}
            <View className="px-4 py-6">
                <Text className="text-white text-center text-lg font-semibold">
                    Link Profile
                </Text>
            </View>

            {/* Scanner Section */}
            <View className="flex-1 justify-center items-center">
                {/* Actual Camera Scanner */}
                <View className="w-72 h-72 overflow-hidden rounded-2xl absolute">
                    <CameraView
                        className="w-full h-full"
                        facing="back"
                        barcodeScannerSettings={{
                            barcodeTypes: ["qr"],
                        }}
                        onBarcodeScanned={handleScan}
                    />
                </View>

                {/* Purple Frame */}
                <View className="w-72 h-72 border border-neutral-700 rounded-2xl relative">
                    <View className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#b26aff] rounded-tl-xl" />
                    <View className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#b26aff] rounded-tr-xl" />
                    <View className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#b26aff] rounded-bl-xl" />
                    <View className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#b26aff] rounded-br-xl" />
                </View>

                <Text className="text-white/70 text-center mt-7 px-10">
                    Align the QR code from the Web Login Page to link your account.
                </Text>
            </View>

            {/* Bottom Button */}
            <View className={`pb-10 justify-center items-center ${!qrId && loading ? "opacity-50" : ""}`}>
                <TouchableOpacity
                    onPress={handleButtonPress}
                    disabled={!qrId || loading}
                    className={`bg-white px-8 py-4 rounded-full flex-row gap-2 items-center justify-center`}
                >
                    {loading && (
                        <ActivityIndicator size="small" color="#fff" />
                    )}

                    <Text className="text-black font-semibold">
                        {loading
                            ? "Verifying QR Code"
                            : scanned
                                ? "Verify QR Code"
                                : "Capture QR Code"}
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

export default WebQrScanner;
