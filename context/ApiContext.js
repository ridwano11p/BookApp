import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { storeData, getData } from'./../config/asyncStorage'; // Update the path accordingly

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const apiUrl = 'https://localhost:7026/api/Books';
  const [books, setBooks] = useState([]);
  const [libraryBooks, setLibraryBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadLibraryBooks = async () => {
      try {
        const storedLibraryBooks = await getData('libraryBooks');
        if (storedLibraryBooks) {
          setLibraryBooks(storedLibraryBooks);
        }
      } catch (error) {
        console.error('Error loading library books from AsyncStorage:', error);
      }
    };

    loadLibraryBooks();
  }, []);

  const addBookToLibrary = (book) => {
    const updatedLibraryBooks = [...libraryBooks, book];
    setLibraryBooks(updatedLibraryBooks);
    storeData('libraryBooks', updatedLibraryBooks);
  };

  const removeBookFromLibrary = (bookId) => {
    const updatedLibraryBooks = libraryBooks.filter(book => book.id !== bookId);
    setLibraryBooks(updatedLibraryBooks);
    storeData('libraryBooks', updatedLibraryBooks);
  };
  

  return (
    <ApiContext.Provider value={{ books, libraryBooks, addBookToLibrary, removeBookFromLibrary }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiProvider };
