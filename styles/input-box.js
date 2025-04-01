import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { styles } from './styles';

export const InputBox = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    style,
    keyboardType = 'default',
    loginState = false
  }) => {
    return (
      <View>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={loginState ? styles.wrongInput : styles.input}
        />
      </View>
      
    )
  }
