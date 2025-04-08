import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteToDo, getDatabaseConnection } from '../database/dbService';


export function DeleteToDoScreen({ route, navigation }) {
  const { id, title , details , isDone} = route?.params || {};

  // const handleDelete = async () => {
  //   try {
  //       const storedList = await AsyncStorage.getItem('todoList');
  //       const list = storedList ? JSON.parse(storedList) : [];
  //       const updatedList = list.filter(item => item.id !== id);
  //       await AsyncStorage.setItem('todoList', JSON.stringify(updatedList));
  //       Alert.alert('Success', 'To-Do item deleted successfully!');
  //       navigation.navigate('Home');
  //   }
  //   catch (error) {
  //       console.error('Error deleting to-do list:', error);
  //       Alert.alert('Error', 'Something went wrong while deleting.');
  //   }
  // };
  const handleDelete = async () => {
    try {
      const db = await getDatabaseConnection();
      await deleteToDo(db, id);
      Alert.alert('Success', 'To-Do item deleted successfully!');
      navigation.navigate('Home');
    } catch (e) {
      console.error("❌ Error deleting to-do item", e);
      Alert.alert('Error', 'Something went wrong while deleting.');
    }
  };

  return (
    <SafeAreaView style={styles.detailContainer}>
        <Text style={styles.title}>To-Do Details</Text>
        <StatusBar style="auto" />
        <View style={styles.centerGroup}>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.staticText}>{title}</Text>

            <Text style={styles.label}>Details:</Text>
            <Text style={styles.staticText}>{details}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
            <Text style={styles.label}>Completed:</Text>
            <Checkbox
                value={isDone}
                disabled={true} // make it read-only
                color={isDone ? '#4630EB' : undefined}
                style={{ marginLeft: 10 }}
                
            />
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
