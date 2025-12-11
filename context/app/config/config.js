import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context";

export default function Config() {
  const { theme, toggleTheme } = useTheme();
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Config screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
