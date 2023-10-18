import { Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import { storeData, getData } from "./config/asyncStorage";
import * as SplashScreen from "expo-splash-screen";
import RegisterScreen from "./screens/RegisterScreen";
import { ApiProvider } from './context/ApiContext'; // Import the ApiProvider
import { ThemeContext } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const App = () => {
  const [theme, setTheme] = useState({ mode: Appearance.getColorScheme() });

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };
    }
    setTheme(newTheme);
    storeData("homeTheme", newTheme);
  };

  const fetchStoredTheme = async () => {
    try {
      const themeData = await getData("homeTheme");
      if (themeData) {
        updateTheme(themeData);
      }
    } catch ({ message }) {
      alert(message);
    } finally {
      await setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  };

  useEffect(() => {
    fetchStoredTheme();
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme();
      setTheme({ mode: colorScheme });
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <ApiProvider> {/* Wrap the NavigationContainer with ApiProvider */}
       <AuthProvider>

     
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={RegisterScreen}
            />
            <Stack.Screen
              name="Footer"
              component={Footer}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </AuthProvider>
      </ApiProvider>
      
    </ThemeContext.Provider>
  );
};

export default App;
