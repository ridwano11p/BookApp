import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PlayButton = ({ onCloseModal }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Audio');
    onCloseModal();
  };

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={handlePress}
    >
      <Text style={styles.text}>Listen to this book</Text>
      <Icon name="music" size={30} color="#900" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C5B4E3',
    opacity: 0.7,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
  },
});

export default PlayButton;
