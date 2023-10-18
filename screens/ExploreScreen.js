import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import SearchBar from "../components/elements/SearchBar";

import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

export default function ExploreScreen() {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
