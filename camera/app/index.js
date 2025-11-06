import { useCameraPermissions } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  
  if (!permission && !permission?.granted) {
    return (
      <View>
        <Text>Você precisa permitir o acesso à câmera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Permitir acesso à câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.navigate("/camera")}
        style={styles.button}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Tirar foto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.navigate("/pictures")}
        style={styles.button}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Galeria de fotos
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    bottom: 40,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
    backgroundColor: "blue",
  },
});
