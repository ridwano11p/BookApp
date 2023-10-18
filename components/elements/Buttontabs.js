import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const { width } = Dimensions.get("window");

const ButtonTabs = ({ tabs, activeTab, onChangeTab }) => {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const handleTabPress = (tab) => {
    onChangeTab(tab);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tabButton,
            tab === activeTab && styles.activeTabButton,
            {
              backgroundColor:
                tab === activeTab
                  ? activeColors.secondary
                  : activeColors.primary,
            },
          ]}
          onPress={() => handleTabPress(tab)}
        >
          <Text
            style={[
              styles.tabButtonText,
              tab === activeTab && styles.activeTabButtonText,
              {
                color:
                  tab === activeTab ? activeColors.text : activeColors.tint,
              },
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    minWidth: width / 4,
  },
  activeTabButton: {
    backgroundColor: "#000",
  },
  tabButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  activeTabButtonText: {
    color: "#fff",
  },
});

export default ButtonTabs;
