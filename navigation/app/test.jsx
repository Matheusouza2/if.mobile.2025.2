import { navigate } from "expo-router/build/global-state/routing";
import { Button, Text, View } from "react-native";

export default function Test() {
    return (
        <View>
            <Text>Test Screen</Text>

            <Button title="Go to Config" onPress={() => navigate("/config")} />

            <Button title="Go to Home" onPress={() => navigate('/')} />
        </View>
    )
}