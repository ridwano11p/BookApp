import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors } from '../../config/theme';
import { ThemeContext } from '../../context/ThemeContext';
import { ApiContext } from '../../context/ApiContext';
import AddToLibraryButton from '../elements/AddToLibraryButton';
import PlayButton from '../elements/PlayButton';

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push('★');
  }
  if (halfStar) {
    stars.push('½');
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push('☆');
  }
  return stars.join(' ');
};

export default function BookModal({ selectedBook, onCloseModal }) {
  const { theme } = useContext(ThemeContext);
  const { addBookToLibrary } = useContext(ApiContext);
  const activeColors = colors[theme.mode];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: activeColors.primary }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: selectedBook.image }} style={styles.bookCover} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: activeColors.text }]}>{selectedBook.title}</Text>
        <Text style={[styles.author, { color: activeColors.tint }]}>By {selectedBook.author}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Rating:</Text>
          <Text style={[styles.infoText, { color: 'yellow' }]}>{renderStars(selectedBook.ratings)}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Publication Date:</Text>
          <Text style={[styles.infoText, { color: activeColors.text }]}>{selectedBook.publishingDate}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Total Reviews:</Text>
          <Text style={[styles.infoText, { color: activeColors.text }]}>{selectedBook.totalReviews}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={[styles.description, { color: activeColors.text }]}>{selectedBook.description}</Text>
        </View>
      </View>

      <View style={styles.addToLibraryButtonContainer}>
        <AddToLibraryButton
          selectedBook={selectedBook}
          addBookToLibrary={addBookToLibrary}
          onCloseModal={onCloseModal}
        />
      </View>
      <View>
      <PlayButton onCloseModal={onCloseModal} />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    flexGrow: 1, // To enable vertical scrolling
    alignItems: 'center', // Center the content horizontally
  },
  imageContainer: {
    alignItems: 'center', // Center the image horizontally
    marginBottom: 15,
  },
  bookCover: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  textContainer: {
    alignSelf: 'stretch', // Make the container take the full width of the screen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingHorizontal: 10, // Add padding to space the info properly
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  infoText: {
    fontSize: 16,
  },
  descriptionContainer: {
    marginHorizontal: 10, // Add horizontal margin to the description
  },
  description: {
    fontSize: 16,
    textAlign: 'left', // Align the description text to the left
    lineHeight: 24,
  },
  addToLibraryButtonContainer: {
    marginVertical: 15, // Add some vertical margin
  },
});
