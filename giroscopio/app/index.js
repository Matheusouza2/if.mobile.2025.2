import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { Gyroscope } from "expo-sensors";
export default function App() {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Gyroscope.setUpdateInterval(50);

    const subscription = Gyroscope.addListener(({ y }) => {
      Animated.spring(translateX, {
        toValue: translateX.__getValue() + y * -350,
        useNativeDriver: true,
      }).start();
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          marginTop: 50,
          marginBottom: 20,
        }}
      >
        Move your device to see the effect
      </Text>
      <Animated.View
        style={{
          transform: [
            {
              translateX: translateX.interpolate({
                inputRange: [-500, 500],
                outputRange: [-300, 0],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Image
          source={{ uri: "https://picsum.photos/2000/800" }}
          style={styles.img}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    overflow: "hidden",
  },
  img: {
    width: 2000,
    height: "100%",
    resizeMode: "cover",
  },
});
