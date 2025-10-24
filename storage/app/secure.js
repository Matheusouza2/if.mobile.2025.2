import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Switch, View } from "react-native";

export default function Secure() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    SecureStore.getItemAsync("theme").then((storedTheme) => {
      setTheme(storedTheme);
    });
  }, []);

  const switchHandle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    SecureStore.setItemAsync("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme === "light" ? "#fff" : "#333",
      }}
    >
      <Switch onValueChange={switchHandle} value={theme === "dark"} />
    </View>
  );
}
