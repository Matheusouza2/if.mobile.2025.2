import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState("back");
  const [picture, setPicture] = useState(null);
  const cameraRef = useRef(null);

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

  const toggleCameraType = () => {
    setCameraType((prevType) => (prevType == "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    if (photo?.uri) setPicture(photo.uri);
  };

  if (picture) {
    return (
      <View>
        <Image
          source={{ uri: picture }}
          style={{ width: 300, aspectRatio: 1 }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setPicture(null)}
        >
          <Text>Tirar outra foto</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView facing={cameraType} style={styles.camera} ref={cameraRef} />
      <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
        <Text>Trocar câmera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={takePicture} style={styles.button}>
        <Text>Tirar foto</Text>
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
    backgroundColor: "white",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
});
