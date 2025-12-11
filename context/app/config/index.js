import { Text, View } from "react-native";
import { ThemeProvider } from "../context";
import Config from "./config";
import "../../global.css";
export default function index() {
  return (
    <ThemeProvider>
      <Config />
    </ThemeProvider>
  );
}
