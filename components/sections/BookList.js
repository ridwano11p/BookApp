import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { colors } from '../../config/theme';
import { ThemeContext } from '../../context/ThemeContext';
import Modal from 'react-native-modal';
import BookModal from '../sections/BookModal';
import { ApiContext } from '../../context/ApiContext'; // Import the ApiContext


const BookList = () => {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);


  // Access the books data from the ApiContext
  const { books } = useContext(ApiContext);

  const handleBookPress = (book) => {
    setSelectedBook(book);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };



  // Helper function to generate star icons based on the ratings
  const renderRatingStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.ratingContainer}>
        {[...Array(filledStars)].map((_, index) => (
          <MaterialIcons key={`star-filled-${index}`} name="star" size={16} color="gold" />
        ))}
        {halfStar && <MaterialIcons name="star-half" size={16} color="gold" />}
        {[...Array(emptyStars)].map((_, index) => (
          <MaterialIcons key={`star-empty-${index}`} name="star-border" size={16} color="gold" />
        ))}
      </View>
    );
  };

  const renderBookItem = ({ item, index }) => {
    const isSelected = selectedBook && selectedBook.id === item.id;
    const bookContainerStyle = isSelected
      ? [styles.bookContainer, styles.selectedBookContainer]
      : styles.bookContainer;

    // Add a special style for the last two rows
    const lastTwoRowsStyle = index >= books.length - 2 && styles.lastTwoRows;

    return (
      <TouchableOpacity
        style={[bookContainerStyle, lastTwoRowsStyle]} // Apply lastTwoRowsStyle conditionally
        onPress={() => handleBookPress(item)}
      >
        <Image source={{ uri: item.image }} style={styles.bookCover} />
        <View style={styles.bookDetails}>
          <Text
            style={[styles.bookTitle, { color: activeColors.text }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
          <Text
            style={[styles.bookAuthor, { color: activeColors.tint }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.author}
          </Text>
          {renderRatingStars(item.ratings)} {/* Display rating stars */}
          <View style={styles.bookTimeContainer}>

            <Text style={[styles.bookTime, { color: activeColors.tint }]}>
              {item.time}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <FlatList
        numColumns={2}
        data={books} // Use the books data from the ApiContext
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id.toString()} // Assuming "id" is a number, convert it to a string for keyExtractor
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />

<Modal isVisible={isModalVisible} onBackdropPress={handleModalClose}>
        <View style={styles.modalContent}>
          <BookModal selectedBook={selectedBook} onCloseModal={handleModalClose} />
          <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
            <AntDesign name="close" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flatListContent: {
    alignItems: 'center',
  },
  bookContainer: {
    alignItems: 'center',
    margin: 8,
    width: '42%',
  },
  selectedBookContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  bookCover: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
    marginBottom: 8,
    borderRadius: 4,
  },
  bookDetails: {
    alignItems: 'center',
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bookTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bookTime: {
    fontSize: 14,
    textAlign: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  // Add a style for the last two rows
  lastTwoRows: {
    marginBottom: 16, // Add some margin between the last two rows
  },
});

export default BookList;
