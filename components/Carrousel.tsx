import Carousel from "react-native-snap-carousel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const Dime: { width: number; height: number } = Dimensions.get("window");

const Carrousel = () => {
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const key = process.env.EXPO_PUBLIC_API_KEY;
    const access_token = process.env.EXPO_PUBLIC_ACCESS_TOKEN;

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/all/day",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    try {
      const response = await axios.request(options);
      //   console.log(response.data);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <Carousel
      data={movies}
      renderItem={({ item, index }) => <CardItem key={index} item={item} />}
      sliderWidth={Dime.width}
      itemWidth={Dime.width * 0.8}
      style={styles.list}
      horizontal={true}
      slideStyle={{ display: "flex", alignItems: "center" }}
      inactiveSlideOpacity={0.2}
    />
  );
};
export default Carrousel;

const styles = StyleSheet.create({
  list: {
    // paddingHorizontal: 10,
    width: "100%",
  },
});

const CardItem = ({ item }) => {
  return (
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      style={stylesCardItem.image}
    />
  );
};

const stylesCardItem = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    height: 300,
    // width: 300,
    // width: 300,
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 10,
  },
});
