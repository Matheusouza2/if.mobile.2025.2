import { ThemeProvider } from "./context";
import Home from "./Home";

export default function Index() {
  return (
    <ThemeProvider>
      <Home  />
    </ThemeProvider>
  );
}
