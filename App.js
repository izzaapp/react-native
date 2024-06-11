import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import About from "./screens/About";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Flashpage from "./screens/Flashpage";
import Menu from "./screens/Menu";
import Editprofil from "./screens/Editprofil";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Flash">
        <Stack.Screen
          name="Flash"
          component={Flashpage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }} // Hide header for this screen
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }} // Hide header for this screen
        />

        <Stack.Screen
          name="Editprofil"
          component={Editprofil}
          options={{ headerShown: false }} // Hide header for this screen
        />

        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }} // Hide header for this screen
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: false }} // Hide header for this screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
