import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { getMovie, getRecommendations, getSimilar } from "../utils/handleApi";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Youtube from "../components/Youtube";
import { Circle } from "react-native-progress";
import { BlurView } from "expo-blur";
import ListHorizontal from "../components/ListHorizontal.tsx";
const windowSize = Dimensions.get("window");

function MovieScreen({ route, navigation }) {
  const { item } = route.params;
  const [movie, setMovie] = useState(item);
  // console.log(item);
  //limit to 2 decimal places
  console.log((Number(movie.vote_average) / 10).toFixed(2));
  useEffect(() => {
    getMovie(item.id).then((res) => {
      console.log(res.data);
      setMovie(res.data);
    });
  }, []);
  const colorProgress = () => {
    if (movie.vote_average < 5) {
      return "#ff0000";
    } else if (movie.vote_average > 5 && movie.vote_average < 7) {
      return "#ffbf00";
    } else if (movie.vote_average > 7) {
      return "#00ff00a7";
    }
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <ArrowLeftCircleIcon
          onPress={() => navigation.goBack()}
          size={50}
          style={{ marginLeft: 10, marginTop: 10 }}
          color={"white"}
        />
        <LinearGradient
          colors={["transparent", "black"]}
          style={styles.gradient}
        >
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
            }}
            style={styles.image}
          />
        </LinearGradient>
        <View style={styles.Content}>
          <View style={{ paddingHorizontal: 30 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.minitext}>{movie.release_date}</Text>
                <Text style={styles.minitext}> ·</Text>
                <Text style={styles.minitext}>{movie.runtime} min</Text>
              </View>
              {/* <BlurView intensity={50} style={styles.circleContainer} tint="dark"> */}
              <Circle
                size={70}
                animated={true}
                color={colorProgress()}
                progress={Number(movie.vote_average) / 10}
                thickness={5}
                borderWidth={0.8}
                showsText={true}
                textStyle={{ fontSize: 20, color: "white" }}
                strokeCap="round"
                formatText={() => {
                  return Number(movie.vote_average * 10).toFixed(0) + "%";
                }}
              />
              {/* </BlurView> */}
            </View>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>

          <ListHorizontal
            title="Similar Movies"
            fetchFunction={getSimilar.bind(this, movie.id)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: "#ff0000",
    backgroundColor: "#000000",
  },
  container: {
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
  Content: {
    position: "relative",
    width: "100%",
    height: "100%",
    // top: windowSize.height / 2.8,
    zIndex: 1,
    marginTop: windowSize.height / 2.8,
    // paddingHorizontal: 30,
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
  circleContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 80,
    height: 80,
    marginTop: 10,
    overflow: "hidden",
  },
});

export default MovieScreen;
