import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, main }) => {
  const { button, buttonStyle, mainButtonStyle, text, textStyle, mainTextStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[button, main ? mainButtonStyle : buttonStyle]}>
      <Text style={[text, main ? mainTextStyle : textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  text: {
    alignSelf: 'center',
    fontSize: 16
  },
  mainTextStyle: {
    fontWeight: '600',
    color: '#fff'
  },
  textStyle: {
    color: '#333'
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    width: 80,
    height: 35,
    borderRadius: 4,
    marginRight: 4
  },
  mainButtonStyle: {
    backgroundColor: '#00a5c0'
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333'
  }
};

export { Button };
