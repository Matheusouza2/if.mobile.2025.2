import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function Index() {
  const [position, setPosition] = useState({ x: 150, y: 300 });
  const [target, setTarget] = useState({
    x: Math.random() * 300,
    y: Math.random() * 600,
  });
  const [score, setScore] = useState(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(16);

    const subscription = Accelerometer.addListener(({ x, y }) => {
      setPosition((prevState) => {
        const newX = prevState.x + x * -10;
        const newY = prevState.y + y * 10;

        return {
          y: Math.max(0, Math.min(650, newY)),
          x: Math.max(0, Math.min(320, newX)),
        };
      });
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const distance = Math.hypot(position.x - target.x, position.y - target.y);

    if (distance < 30) {
      setScore((s) => s + 1);
      setTarget({
        x: Math.random() * 300,
        y: Math.random() * 600,
      });
    }
  }, [position]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>
        Pontuação: {score}
        {"\n"}
        X: {position.x.toFixed(2)} Y: {position.y.toFixed(2)}
      </Text>

      <View style={[styles.ball, { top: position.y, left: position.x }]}></View>

      <View style={[styles.target, { top: target.y, left: target.x }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    paddingTop: 50,
  },
  score: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  ball: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "green",
    position: "absolute",
  },
  target: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "yellow",
    position: "absolute",
  },
});
