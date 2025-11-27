import { View, Text, TouchableOpacity } from "react-native";

export default function FullScreenError({ msg, onRetry }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 15, textAlign: "center" }}>
        {msg}
      </Text>

      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 12,
            backgroundColor: "#000",
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
