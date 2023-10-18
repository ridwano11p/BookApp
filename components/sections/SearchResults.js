import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SearchResults({ searchResults, activeColors }) {
  const handlePlayPress = (book) => {
    console.log(`Playing book: ${book.title}`);
  };

  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookPress = (book) => {
    setSelectedBook(book);
  };

  return (
    <ScrollView>
      <View style={styles.resultsContainer}>
        {searchResults.map((book) => {
          const isSelected = selectedBook && selectedBook.id === book.id;
          const resultStyle = isSelected ? [styles.result, styles.selectedResult] : styles.result;

          return (
            <View key={book.id} style={resultStyle}>
              <TouchableOpacity
                style={styles.bookCoverContainer}
                onPress={() => handleBookPress(book)}
              >
                <Image source={{ uri: book.image }} style={styles.bookCover} />
              </TouchableOpacity>
              <View style={styles.bookDetails}>
                <Text style={[styles.bookTitle, { color: activeColors.text }]}>
                  {book.title}
                </Text>
                <Text style={[styles.bookAuthor, { color: activeColors.tint }]}>
                  {book.author}
                </Text>
                <Text
                  style={[styles.bookDescription, { color: activeColors.text }]}
                >
                  {book.description}
                </Text>
                <View style={styles.bookTimeContainer}>
                  <TouchableOpacity
                    style={[styles.playButton, { backgroundColor: "green" }]}
                    onPress={() => handlePlayPress(book)}
                  >
                    <MaterialIcons name="play-arrow" size={24} color="white" />
                  </TouchableOpacity>
                  <Text style={[styles.bookTime, { color: activeColors.tint }]}>
                    {book.time}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    marginTop: 8,
  },
  result: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  selectedResult: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  bookCoverContainer: {
    width: "30%",
    marginRight: 8,
  },
  bookCover: {
    width: "100%",
    height: undefined,
    aspectRatio: 0.5,
    borderRadius: 4,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    marginBottom: 4,
  },
  bookDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  bookTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  bookTime: {
    fontSize: 14,
  },
});
