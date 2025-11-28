export const appEndpoints = {
  auth: {
    login: "/(auth)/login",
    otpVerification: "/(auth)/otp-verification",
    qrScanner: "/(auth)/mobile-qr-scanner",
  },
  app: {
    home: "/(tabs)",
    reminders: "/(tabs)/reminders",
    notifications: "/(tabs)/notifications",
    profile: "/(tabs)/profile",
    qrScanner: "/(app)/web-qr-scanner",
  },
};
