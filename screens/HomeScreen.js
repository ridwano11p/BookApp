import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

import BookList from "../components/sections/BookList";
import ButtonTabs from "../components/elements/Buttontabs";

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState("New Releases");
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <View style={styles.buttonTabsContainer}>
        <ButtonTabs
          tabs={["New Releases", "Trending", "Top Rated", "Recommended"]}
          activeTab={activeTab}
          onChangeTab={handleTabChange}
          activeColor={activeColors.secondary}
          inactiveColor={activeColors.text}
        />
      </View>
      <View style={styles.bookListContainer}>
        {activeTab === "New Releases" && <BookList />}
        {/* Render other booklists based on the activeTab value */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonTabsContainer: {
    marginTop: 10,
  },
  bookListContainer: {
    flex: 1,
  },
});

export default HomeScreen;
