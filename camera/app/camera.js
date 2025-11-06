import { CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Directory, File, Paths } from "expo-file-system";

export default function Camera() {
  const [cameraType, setCameraType] = useState("back");
  const cameraRef = useRef(null);

  const toggleCameraType = () => {
    setCameraType((prevType) => (prevType == "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    const { uri } = photo;

    const appDir = new Directory(Paths.document, "photos");
    if (!appDir.exists) {
      await appDir.create({ intermediates: true });
    }

    const sourceFile = new File(uri);
    const fileName = `photos_${Date.now()}.jpg`;
    const file = new File(appDir, fileName);

    await sourceFile.move(file);
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} facing={cameraType} style={styles.camera} />

      <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
        <Text style={{ color: "white" }}>Virar a câmera</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={takePicture} style={styles.button}>
        <Text style={{ color: "white" }}>Tirar Foto</Text>
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
    color: "white",
  },
});
