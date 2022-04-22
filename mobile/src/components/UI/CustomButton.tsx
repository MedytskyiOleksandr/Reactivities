import React from 'react';
import {StyleSheet, Text, Pressable, ActivityIndicator} from 'react-native';

import {Colors} from '../../constants/Colors';

interface Props {
  buttonText: string;
  onPress: () => void;
  isLoading: boolean;
  color: string;
  textColor: string;
}

function CustomButton({
  buttonText,
  onPress,
  isLoading,
  color,
  textColor,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {...styles.button, backgroundColor: color},
        pressed && styles.pressed,
      ]}>
      {isLoading ? (
        <ActivityIndicator
          animating={isLoading}
          size="small"
          color={Colors.accent500}
        />
      ) : (
        <Text style={[styles.text, {color: textColor}]}>{buttonText}</Text>
      )}
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    width: '40%',
    margin: 10,
    padding: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
