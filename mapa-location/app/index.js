import { Text, View, Platform } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Index() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      }, 5000);
      
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -8.058361,
            longitude: -39.094811,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Minha localização"
          />
        </MapView>
      )}
    </View>
  );

  // ----------------------LOCALIZAÇÃO--------------------------

  let text = "Esperando...";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{text}</Text>
    </View>
  );
}
