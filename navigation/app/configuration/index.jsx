import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Configuration() {
    return (
        <View>
            <Text>Configuration</Text>
            <Link href="/configuration/config2">Go to Config 2</Link>
        </View>
    );
}