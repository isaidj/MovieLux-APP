import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TopMenu from "../components/TopMenu";
const CategoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopMenu />
      <Text>CategoryScreen</Text>
    </View>
  );
};

export default CategoryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828",
  },

  safeArea: {
    // marginBottom: ios ? -20 : 30,
  },
});
