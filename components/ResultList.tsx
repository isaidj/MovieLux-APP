import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { maxChars } from "../utils/textFunctions";
import { useNavigation } from "@react-navigation/native";

const ResultList = ({ results }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={results}
      renderItem={({ item }) => (
        <RenderItem item={item} navigation={navigation} />
      )}
      scrollEnabled={true}
      style={styles.list}
    />
  );
};

export default ResultList;
const RenderItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Movie", { item })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.text}>{item.vote_average}</Text>
          <Text style={styles.text}>{item.release_date}</Text>
        </View>

        <Text style={styles.text}>{maxChars(item.overview, 120)}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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
  list: {
    flex: 1,
    backgroundColor: "#00000080",
  },
});
