import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ApiContext } from '../../context/ApiContext';

export default function AddToLibraryButton({
  selectedBook,
  onCloseModal
}) {
  const navigation = useNavigation();
  const { libraryBooks, addBookToLibrary, removeBookFromLibrary } = useContext(ApiContext); // Use the ApiContext to access the libraryBooks and the functions

  const isBookInLibrary = libraryBooks.includes(selectedBook); // Check if the selected book is in the library

  const handleAddToLibraryPress = () => {
    if (isBookInLibrary) {
      removeBookFromLibrary(selectedBook.id); // Call the removeBookFromLibrary function with the selectedBook id
    } else {
      addBookToLibrary(selectedBook); // Call the addBookToLibrary function with the selectedBook
      navigation.navigate('Library'); // Navigate to 'Library' screen
    }
    onCloseModal(); // Call the onCloseModal function to close the modal
  };

  return (
    <View>
      <TouchableOpacity
        style= { {  backgroundColor: isBookInLibrary ? 'red' : 'green',  paddingVertical: 10,  paddingHorizontal: 30,  borderRadius: 5,  }} // Change the button color depending on isBookInLibrary
        onPress= {handleAddToLibraryPress}
      >
        <Text style= { {  color: isBookInLibrary ? 'white' : 'black',  fontSize: 16,  fontWeight: 'bold',  }}> {isBookInLibrary ? 'Remove Book From Library' : 'Add To Library'} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sendbooktolibrary: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
