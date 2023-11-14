import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const defaultScreenOptions = {
  headerShown: false,
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen
        name="Movie"
        options={{
          animation: "slide_from_right",
        }}
        component={MovieScreen}
      />
    </Stack.Navigator>
  );
};

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        //todo lo que tiene defaultScreenOptions mas personalizado
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#282828",
          },
          drawerLabelStyle: {
            color: "white",
            fontWeight: "bold",
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Category" component={CategoryScreen} />
        {/* Agrega más Drawer.Screen según tus necesidades */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
