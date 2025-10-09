import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [infos, setInfos] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  /* fetch("https://api.dicionario-aberto.net/near/cavalo")
    .then((response) => response.json())
    .then((data) => setInfos(data)); */

  const fetchData = async () => {
    axios
      .get(`https://api.dicionario-aberto.net/near/${searchTerm}`)
      .then((response) => {
        setInfos(response.data);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.display}
        placeholder="Digite uma palavra"
        onChangeText={(e) => setSearchTerm(e.target.value)}
      />
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <Text style={styles.display}>
        {infos.map((info) => (
          <Text key={info}>
            {info}
            {"\n"}
          </Text>
        ))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  button: {
    width: 139,
    height: 139,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 10,
    backgroundColor: "#0000ef",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  display: {
    width: "100%",
    height: 100,
    textAlign: "right",
    textAlignVertical: "center",
    paddingRight: 20,
    backgroundColor: "#d3d3d3",
    fontSize: 50,
  },
});
