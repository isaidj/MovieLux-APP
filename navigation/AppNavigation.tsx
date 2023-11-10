import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Stack = createNativeStackNavigator();
const defaultScreenOptions = {
  headerShown: false,
};
// const LeftDrawer = createDrawerNavigator();

// const LeftDrawerScreen = () => {
//   return (
//     <LeftDrawer.Navigator screenOptions={{ drawerPosition: "left" }}>
//       <LeftDrawer.Screen name="Home" component={HomeScreen} />
//     </LeftDrawer.Navigator>
//   );
// };

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      {/* <LeftDrawerScreen /> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={defaultScreenOptions}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Category"
          options={defaultScreenOptions}
          component={CategoryScreen}
        />
        <Stack.Screen
          name="Movie"
          //animation + defaultScreenOptions
          options={{
            animation: "slide_from_right",

            ...defaultScreenOptions,
          }}
          component={MovieScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
