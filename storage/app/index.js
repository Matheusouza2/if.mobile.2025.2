import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Switch, View } from "react-native";

export default function Index() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    AsyncStorage.getItem("theme").then((storedTheme) => {
      if (storedTheme) {
        setTheme(storedTheme);
      }
    });
  }, []);

  const switchHandle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    AsyncStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  const resetSettings = () => {
    AsyncStorage.clear();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme === "light" ? "#fff" : "#000",
      }}
    >
      <Link href="/secure">Ir para Secure Store</Link>
      <Switch onValueChange={switchHandle} value={theme === "dark"} />
      <Button title="Resetar configurações" onPress={resetSettings} />
    </View>
  );
}
