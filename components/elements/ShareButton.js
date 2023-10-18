import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Share } from 'react-native';

const ShareButton = () => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this awesome book!',
        url: 'https://www.example.com/book',
      });
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
  };

  return (
    <TouchableOpacity onPress={handleShare} style={styles.button}>
      <Text style={styles.buttonText}>Share</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'purple',
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

export default ShareButton;
