import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  Bars3Icon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "react-native-heroicons/solid";
import List from "../components/List";
import MainCarrousel from "../components/MainCarrousel";
import { LinearGradient } from "expo-linear-gradient";
import ListHorizontal from "../components/ListHorizontal.tsx";
import {
  getMoviesPopular,
  getMoviesTopRated,
  getMoviesUpcoming,
} from "../utils/handleApi";

const ios = Platform.OS === "ios";
const Dim = Dimensions.get("window");
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <BlurView intensity={45} style={styles.menu_container} tint="dark">
          <Bars3Icon
            size={30}
            color="white"
            onPress={() => navigation.getParent("LeftDrawer").openDrawer()}
          />
          <Text style={styles.logo}>
            MOVI <Text style={styles.logo_after}>LUX</Text>
            <SparklesIcon size={30} color={styles.logo_after.color} />
          </Text>
          <MagnifyingGlassIcon
            size={30}
            color={"white"}
            style={styles.magnifying_glass}
          />
        </BlurView>
        <SearchInput />

        <ScrollView showsVerticalScrollIndicator={false}>
          <MainCarrousel
            title="Trending"
            endpoint="/trending/all"
            timeN="day"
          />
          {/* <List title="Top Rated" endpoint="/movie/top_rated" /> */}
          <ListHorizontal
            title="Popular Movies"
            fetchFunction={getMoviesPopular}
          />
          <ListHorizontal
            title="Upcoming Movies"
            fetchFunction={getMoviesUpcoming}
          />
          <ListHorizontal
            title="Top Rated Movies"
            fetchFunction={getMoviesTopRated}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828",
  },

  safeArea: {
    // marginBottom: ios ? -20 : 30,
  },
  menu_container: {
    width: "100%",
    //flex to left
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    // opacity: 0.5,
  },
  logo: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  logo_after: {
    fontSize: 20,
    color: "#ff0b91",
  },
  magnifying_glass: {
    opacity: 0.5,
  },
});

const SearchInput = () => {
  return (
    <View style={stylesInput.container}>
      <View style={stylesInput.search_container}>
        <BlurView intensity={100} tint="dark" style={stylesInput.search}>
          <MagnifyingGlassCircleIcon
            size={30}
            color={"white"}
            style={styles.magnifying_glass}
          />
          <TextInput style={stylesInput.search_input} placeholder="Search" />
        </BlurView>
      </View>
    </View>
  );
};
const stylesInput = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  search_container: {
    position: "absolute",
    zIndex: 2,
    top: Dim.height * 0.3,
    width: "100%",

    paddingHorizontal: 10,
    marginBottom: 20,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 70,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.836)",
  },
  magnifying_glass: {
    opacity: 0.5,
    marginRight: 10,
  },
  search_input: {
    color: "white",
    fontSize: 20,
    width: "100%",
  },
});
