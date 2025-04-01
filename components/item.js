import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';

export const Item = ({ id, title, details, isDone, navigation, index }) => {
    const [isCheck, setIsCheck] = useState(isDone);
    console.log('index', index);
    return(
      <TouchableOpacity onPress={() => navigation.navigate('DeleteToDo', { id: id, title: title, details: details, isDone: isCheck })}>
      <View style={styles.item}>

        <View style={styles.indexContainer}>
          <Text style={styles.indexText}>{index}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.subject}>{title}
          </Text>
        </View>
        <Checkbox
            value={isCheck}
            onValueChange={setIsCheck}
            color={isCheck ? '#4630EB' : undefined}
        />
      </View>
    </TouchableOpacity>
    
    );
  };
  