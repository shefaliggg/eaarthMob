import { View, Text } from "react-native";
import { useError } from "../contexts/ErrorContext";


export default function ErrorBanner() {
  const { errorBanner } = useError();

  if (!errorBanner) return null;

  const colors = {
    network: "#ffb300",
    server: "#ff5252",
    database: "#ff7043",
    timeout: "#ff8f00",
    unknown: "#616161",
  };

  return (
    <View
      style={{
        backgroundColor: colors[errorBanner.type] || "#333",
        padding: 8,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>
        {errorBanner.message}
      </Text>
    </View>
  );
}
