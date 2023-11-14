import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "react-native-heroicons/solid";
import FadeInView from "./animations/FadeView";
import SearchInput from "./SearchInput";
import { useNavigation } from "@react-navigation/native";

const TopMenu = () => {
  const navigation = useNavigation<any>();
  const value = useState(new Animated.Value(0))[0];
  const [isSearchActive, setIsSearchActive] = useState(false);
  return (
    <>
      <BlurView intensity={45} style={styles.menu_container} tint="dark">
        <Bars3Icon
          size={30}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
        <Text style={styles.logo}>
          MOVI <Text style={styles.logo_after}>LUX</Text>
          <SparklesIcon size={30} color={styles.logo_after.color} />
        </Text>
        <MagnifyingGlassIcon
          size={30}
          color={"white"}
          style={styles.magnifying_glass}
          onPress={() => {
            setIsSearchActive(true);
            moveSearchAnimation(value, 1);
          }}
        />
      </BlurView>
      <SearchInput
        animationValue={value}
        setIsSearchActive={setIsSearchActive}
        isSearchActive={isSearchActive}
      />
    </>
  );
};

export default TopMenu;
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

function moveSearchAnimation(
  animationValue,
  position = 0,
  callback = () => {}
) {
  Animated.timing(animationValue, {
    toValue: position,
    duration: 300,
    useNativeDriver: true,
  }).start(callback);
}
