import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
