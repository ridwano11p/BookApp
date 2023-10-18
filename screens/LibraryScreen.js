import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors } from '../config/theme';
import { ApiContext } from '../context/ApiContext';
import { ThemeContext } from '../context/ThemeContext';

export default function LibraryScreen() {
  const { libraryBooks, removeBookFromLibrary } = useContext(ApiContext);
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const handleDeleteBook = (bookId) => {
    removeBookFromLibrary(bookId);
  };

  // Helper function to render star ratings dynamically
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const remaining = 5 - fullStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    for (let i = 0; i < remaining; i++) {
      stars.push('☆');
    }
    return stars.join(' ');
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <FlatList
        data={libraryBooks}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <View style={styles.bookImageContainer}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
            </View>
            <View style={styles.bookDetails}>
              <Text style={[styles.bookTitle, { color: activeColors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.bookAuthor, { color: activeColors.tint }]}>
                {item.author}
              </Text>
              <Text style={[styles.bookDescription, { color: activeColors.tint }]}>
                {item.description}
              </Text>
              <Text style={[styles.bookRatings, { color: 'yellow' }]}>
                {/* Use yellow color for ratings */}
                {renderStars(item.ratings)}
              </Text>
              <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: 'red' }]}
                onPress={() => handleDeleteBook(item.id)}
              >
                <Text style={{ color: 'white' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  bookImageContainer: {
    marginRight: 10,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 16,
    marginBottom: 5,
  },
  bookDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  bookRatings: {
    fontSize: 18,
    marginBottom: 5,
  },
  deleteButton: {
    fontSize: 14,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
});
