import Carousel from "react-native-snap-carousel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import useFetchMovies from "../hooks/useFetchMovies";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const Dime: { width: number; height: number } = Dimensions.get("window");

const MainCarrousel = ({
  title,
  endpoint,
  timeN,
}: {
  title: string;
  endpoint: string;
  timeN: string;
}) => {
  const { movies, time, setTime } = useFetchMovies({
    endpoint,
    timeN,
  });
  const [currentItem, setCurrentItem] = useState(0);
  const [play, setPlay] = useState(false);
  const navigation = useNavigation();
  const [timerToPlay, setTimerToPlay] = useState<number>(3);

  const handleSnapToItem = (index: number) => {
    setCurrentItem(index);
    setPlay(false);
  };
  const itemWidth = () => {
    if (play) {
      return Dime.width;
    } else {
      return Dime.width * 0.7;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setPlay(true);
    }, 3000);
  }, [currentItem]);

  return (
    <View style={styles.list_container}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <Carousel
        data={movies}
        renderItem={({ item, index }) => (
          <CardItem key={index} item={item} navigation={navigation} />
        )}
        sliderWidth={Dime.width}
        itemWidth={Dime.width * 0.7}
        style={styles.carrousel}
        horizontal={true}
        slideStyle={{ display: "flex", alignItems: "center" }}
        inactiveSlideOpacity={0.2}
        inactiveSlideShift={-90}
        inactiveSlideScale={0.8}
        onSnapToItem={handleSnapToItem}
        // onTouchMove={() => setPlay(false)}
        activeAnimationType="spring"

        // decelerationRate={"normal"}
      />
      {movies.length > 0 && (
        <LinearGradient
          colors={["transparent", "#282828"]}
          locations={[0, 1]}
          style={styles.gradient}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movies[currentItem].poster_path}`,
            }}
            style={styles.image}
            blurRadius={50}
          />
        </LinearGradient>
      )}
    </View>
  );
};
export default MainCarrousel;

const styles = StyleSheet.create({
  list_container: {
    height: Dime.height * 0.6,
  },

  carrousel: {
    // paddingHorizontal: 10,
    width: "100%",
    // height: 500,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 50,
    marginBottom: 10,
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
  image: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: -1,
    position: "absolute",
  },
});

const CardItem = ({ item, navigation }) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => {
    console.log("pressed");
    navigation.navigate("Movie", {
      item,
    });
  };

  return (
    <View style={stylesCardItem.container}>
      <TouchableOpacity onPress={handlePress} style={stylesCardItem.container}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={stylesCardItem.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const stylesCardItem = StyleSheet.create({
  container: {
    flexDirection: "row",

    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: Dime.height * 0.5,
    borderRadius: 10,
  },
});
