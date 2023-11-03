import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  Bars3Icon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "react-native-heroicons/solid";
import List from "../components/List";
import Carrousel from "../components/Carrousel";

const ios = Platform.OS === "ios";
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <BlurView intensity={45} style={styles.menu_container} tint="dark">
          <Bars3Icon size={30} color="white" />
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ paddingBottom: 30 }}
        >
          <Carrousel />
          <List />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363636",
  },
  safeArea: {
    //if ios is true
    marginBottom: ios ? -20 : 30,
  },
  menu_container: {
    width: "100%",
    //flex to left
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 10,
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
