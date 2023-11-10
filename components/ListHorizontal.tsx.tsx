import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { maxChars } from "../utils/textFunctions";
import { getMoviesPopular } from "../utils/handleApi";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon, ArrowRightIcon } from "react-native-heroicons/solid";

const ListHorizontal = ({
  title,
  fetchFunction,
}: {
  title: string;
  fetchFunction: Function;
}) => {
  const [movies, setMovies] = useState<any[]>([]);
  const navigation = useNavigation();
  const handleCategoryPress = () => {
    navigation.navigate("Category", {});
  };

  const getMovies = async () => {
    fetchFunction().then((res = { data: { results: [] } }) => {
      setMovies(res.data.results);
    });
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <View style={styles.list_container}>
      <TouchableOpacity style={styles.category} onPress={handleCategoryPress}>
        <Text style={styles.title}>{title}</Text>
        <ArrowRightIcon
          size={30}
          color="#afafaf"
          onPress={() => navigation.goBack()}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
      {/* <ButtonsTime time={time} setTime={setTime} /> */}

      <FlatList
        data={movies}
        renderItem={({ item, index }) => (
          <CardItem key={index} item={item} navigation={navigation} />
        )}
        style={styles.list}
        horizontal={true}
        // scrollEnabled={false}
      />
    </View>
  );
};
export default ListHorizontal;
const styles = StyleSheet.create({
  list_container: {
    height: 250,
  },
  list: {
    marginTop: 10,
    // marginHorizontal: 10,
    gap: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  category: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

const CardItem = ({ item, navigation }) => {
  const handlePress = () => {
    console.log(item);
    navigation.push("Movie", {
      item,
    });
  };
  return (
    <TouchableOpacity style={stylesCardItem.container} onPress={handlePress}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={stylesCardItem.image}
      />
    </TouchableOpacity>
  );
};

const stylesCardItem = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(34, 34, 34, 0.5)5)0.5)",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 150,

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
