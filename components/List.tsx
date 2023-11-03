import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { maxChars } from "../utils/textFunctions";
const List = () => {
  const [movies, setMovies] = useState([]);
  const [time, setTime] = useState("day");

  const getMovies = async () => {
    const key = process.env.EXPO_PUBLIC_API_KEY;
    const access_token = process.env.EXPO_PUBLIC_ACCESS_TOKEN;

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/trending/all/${time}`,
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
  }, [time]);
  return (
    <View>
      <ButtonsTime time={time} setTime={setTime} />
      <FlatList
        data={movies}
        renderItem={({ item, index }) => <CardItem key={index} item={item} />}
        style={styles.list}
        horizontal={false}
      />
    </View>
  );
};
export default List;
const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: "row",

    marginBottom: 10,
    borderColor: "white",
    borderWidth: 1,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    color: "black",
  },
});
const ButtonsTime = ({ time, setTime }) => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        onPress={() => {
          setTime("day");
        }}
        style={styles.button}
      >
        <Text>Day</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setTime("week");
        }}
      >
        <Text>Week</Text>
      </TouchableOpacity>
    </View>
  );
};

const CardItem = ({ item }) => {
  return (
    <View style={stylesCardItem.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={stylesCardItem.image}
      />
      <View style={stylesCardItem.content}>
        <Text style={stylesCardItem.title}>{item.title || item.name}</Text>
        <Text>{item.vote_average}</Text>
        <Text>{item.release_date}</Text>

        <Text>{maxChars(item.overview, 100)}</Text>
      </View>
    </View>
  );
};

const stylesCardItem = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    // backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    color: "white",
  },
  image: {
    width: "35%",
    height: 150,
    borderRadius: 10,
  },
  content: {
    height: "100%",
    width: "65%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    color: "white",
    paddingHorizontal: 10,
    // backgroundColor: "rgba(255, 7, 7, 0.5)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
