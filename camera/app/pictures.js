import { Directory, Paths } from "expo-file-system";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Pictures() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const appDir = new Directory(Paths.document, "photos");

      const items = await appDir.list();

      setPhotos(items);
    })();
  }, []);

  const deletePicture = async (file) => {
    await file.delete();
    setPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo.uri !== file.uri)
    );
  };

  return (
    <View>
      <Text>
        {photos.length === 0
          ? "Não foi encontrada nenhuma foto"
          : `Fotos encontradas: ${photos.length}`}
      </Text>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.uri }}
              style={{ width: 200, height: 200 }}
            />
            <TouchableOpacity
              onPress={() => deletePicture(item)}
              style={{
                marginBottom: 20,
                backgroundColor: "red",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Deletar foto</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
