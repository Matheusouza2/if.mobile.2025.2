import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./context";
import "../global.css";
import { useState } from "react";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick((prevState) => !prevState);
  };

  return (
    <View
      className={`flex-1 justify-center items-center ${theme === "light" ? "bg-purple-100" : "bg-purple-800"}`}
    >
      <Text
        className={`${theme === "light" ? "text-purple-900" : "text-purple-200"}`}
      >
        Edit app/index.tsx to edit this screen.
      </Text>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={toggleTheme}>
        <Text style={{ color: "blue" }}>Toggle Theme (Current: {theme})</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`bg-blue-100 p-2 rounded-lg mt-5 active:bg-blue-500 ${click ? "bg-blue-900" : "bg-blue-100"}`}
        onPress={handleClick}
      >
        <Text className="text-lg">Go to Config</Text>
      </TouchableOpacity>
    </View>
  );
}
