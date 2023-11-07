import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";

const Stack = createNativeStackNavigator();
const defaultScreenOptions = {
  headerShown: false,
};

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={defaultScreenOptions}
          component={HomeScreen}
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
