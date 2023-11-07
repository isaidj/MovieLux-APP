import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { getMovie } from "../utils/handleApi";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";

const windowSize = Dimensions.get("window");
function MovieScreen({ route, navigation }) {
  const { item } = route.params;
  const [movie, setMovie] = useState(item);
  console.log(item);
  useEffect(() => {
    getMovie(item.id).then((res) => {
      setMovie(res.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ArrowLeftCircleIcon
        onPress={() => navigation.goBack()}
        size={50}
        style={{ marginLeft: 10, marginTop: 10 }}
        color={"white"}
      />
      <View style={styles.textContent}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.minitext}>{movie.release_date}</Text>
          <Text style={styles.minitext}> ·</Text>
          <Text style={styles.minitext}>{movie.runtime} min</Text>
        </View>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
      <LinearGradient colors={["transparent", "black"]} style={styles.gradient}>
        <Image
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
          }}
          style={styles.image}
        />
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    // alignItems: "center",
    // justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "50%",
    zIndex: -1,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  textContent: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: windowSize.height / 2.8,
    zIndex: 1,
    paddingHorizontal: 30,
  },
  title: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    marginTop: 10,
  },
  minitext: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 10,
  },
  overview: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
  },
});

export default MovieScreen;
