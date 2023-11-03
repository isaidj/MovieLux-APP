import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SparklesIcon } from "react-native-heroicons/solid";
import axios from "axios";
import { useEffect } from "react";
export default function App() {
  const getMovies = async () => {
    const options = {
      method: "GET",
      url: "https://unogs-unogs-v1.p.rapidapi.com/search/titles",
      params: {
        order_by: "date",
        type: "movie",
      },
      headers: {
        "X-RapidAPI-Key": "ab7b6b2ce0msh3a4bfcc05986bc8p194872jsn082f7ade7843",
        "X-RapidAPI-Host": "unogs-unogs-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      <SparklesIcon name="sparkles" size={32} color="black" />
      <Text>Open up App.js to start working on your app!</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
