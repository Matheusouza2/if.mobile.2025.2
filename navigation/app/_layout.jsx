import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="config" options={{ title: "Configuration" }} />
      <Drawer.Screen name="test" options={{ title: "Teste de App" }} />
      <Drawer.Screen name="teste2" options={{ title: "Teste2" }} />
    </Drawer>
  );
}
