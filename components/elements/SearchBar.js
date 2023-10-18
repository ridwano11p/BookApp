import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { ApiContext } from '../../context/ApiContext'; // Import the ApiContext
import SearchResults from "../sections/SearchResults"; // Import SearchResults component

export default function SearchBarComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  // Access the books data from the ApiContext
  const { books } = useContext(ApiContext);

  useEffect(() => {
    if (searchQuery) {
      const filteredBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredBooks);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, books]); // Include "books" in the dependency array

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search"
            containerStyle={styles.searchInputContainer}
            inputStyle={[styles.input, { color: activeColors.text }]}
            placeholderTextColor={activeColors.tint}
            inputContainerStyle={[
              styles.inputContainer,
              { backgroundColor: activeColors.secondary },
            ]}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        {searchResults.length > 0 ? (
          <SearchResults
            searchResults={searchResults}
            activeColors={activeColors}
          />
        ) : searchQuery ? (
          <Text style={[styles.noResultsText, { color: activeColors.text }]}>
            Your search doesn't match any available books.
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    paddingHorizontal: 0,
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  noResultsText: {
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
  },
});
