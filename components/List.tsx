import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { maxChars } from "../utils/textFunctions";
import { getMoviesPopular } from "../utils/handleApi";
import { useNavigation } from "@react-navigation/native";

const List = ({ title, endpoint }) => {
  const [movies, setMovies] = useState([]);
  const [time, setTime] = useState("day");
  const navigation = useNavigation();
  const getMovies = async () => {
    getMoviesPopular().then((res) => {
      setMovies(res.data.results);
    });
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <View style={styles.list_container}>
      <Text style={styles.title}>Popular Movies</Text>
      {/* <ButtonsTime time={time} setTime={setTime} /> */}

      <FlatList
        data={movies}
        renderItem={({ item, index }) => (
          <CardItem key={index} item={item} navigation={navigation} />
        )}
        style={styles.list}
        horizontal={false}
        scrollEnabled={false}
      />
    </View>
  );
};
export default List;
const styles = StyleSheet.create({
  list_container: {},
  list: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
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

export const CardItem = ({ item, navigation }) => {
  const handlePress = () => {
    navigation.navigate("Movie", {
      item,
    });
  };
  return (
    <TouchableOpacity style={stylesCardItem.container} onPress={handlePress}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={stylesCardItem.image}
      />
      <View style={stylesCardItem.content}>
        <Text style={stylesCardItem.title}>{item.title || item.name}</Text>
        <View style={stylesCardItem.row}>
          <Text style={stylesCardItem.text}>{item.vote_average}</Text>
          <Text style={stylesCardItem.text}>{item.release_date}</Text>
        </View>

        <Text style={stylesCardItem.text}>{maxChars(item.overview, 120)}</Text>
      </View>
    </TouchableOpacity>
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

    marginBottom: 10,
  },
  image: {
    width: "35%",
    height: "100%",
    borderRadius: 10,
  },
  content: {
    height: "100%",
    width: "65%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 10,

    paddingHorizontal: 10,
    // backgroundColor: "rgba(255, 7, 7, 0.5)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    color: "white",
  },
});
