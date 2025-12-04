import { navigate } from "expo-router/build/global-state/routing";
import { Button, Text, View } from "react-native";

export default function Test() {
    return (
        <View>
            <Text>Config Screen</Text>

            <Button title="Go to Home" onPress={() => navigate("/")} />

            <Button title="Go to test" onPress={() => navigate('/test')} />
        </View>
    )
}