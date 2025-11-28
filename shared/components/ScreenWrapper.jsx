import { View } from "react-native";

const ScreenWrapper = ({ children, className = "" }) => (
    <View className={`flex-1 bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark ${className}`}>
      {children}
    </View>
);

export default ScreenWrapper;
