import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import { InputBox } from '../styles/input-box';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { getAllToDos, insertToDo, getDatabaseConnection } from '../database/dbService';


export function AddToDoScreen({navigation}) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [isFinished, setIsFinished] = useState(false);


  // const handleUpdate = async () => {
  //   try {
  //     const storedList = await AsyncStorage.getItem('todoList');
  //     const list = storedList ? JSON.parse(storedList) : [];
  
  //     const newItem = {
  //       id: Date.now(), 
  //       title,
  //       details,
  //       isDone,
  //     };
  
  //     const updatedList = [...list, newItem];
  //     await AsyncStorage.setItem('todoList', JSON.stringify(updatedList));
  
  //     Alert.alert('Success', 'To-Do item saved successfully!');
  //     navigation.navigate('Home');
  //   } catch (error) {
  //     console.error('Error updating to-do list:', error);
  //     Alert.alert('Error', 'Something went wrong while saving.');
  //   }
  // };

  const handleUpdate = async () => {
    if (!title.trim() || !details.trim()) {
      Alert.alert('Error', 'Please enter both title and details.');
      return;
    }

    try {
      const db = await getDatabaseConnection();

      const newToDo = {
        title: title.trim(),
        details: details.trim(),
        isDone: isFinished,
      };

      await insertToDo(db, newToDo);

      Alert.alert('Success', 'To-Do item added successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to add To-Do.');
    }
  }
  
  

  return (
    <SafeAreaView style={styles.detailContainer}>
      <Text style={styles.title}>To-Do Details</Text>
      <StatusBar style="auto" />
      <View style={styles.centerGroup}>
        <Text style={styles.label}>Title:</Text>
        <InputBox onChangeText={setTitle} value={title} />

        <Text style={styles.label}>Details:</Text>
        <InputBox onChangeText={setDetails} value={details} />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text style={styles.label}>Completed:</Text>
          <Checkbox
            value={isFinished}
            onValueChange={setIsFinished}
            color={isFinished ? '#4630EB' : undefined}
            style={{ marginLeft: 10 }}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
