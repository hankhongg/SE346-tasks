import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { Item } from '../components/item';
import { useEffect, useState } from 'react';
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing an icon set
import { getAllToDos } from '../database/dbService';
import { getDatabaseConnection } from '../database/dbService';

export function HomeScreen({navigation}){
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        loadToDoList();
    }, []);

    // const loadToDoList = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('todoList');
    //         const data = jsonValue != null ? JSON.parse(jsonValue) : [];
    //         setTodoList(data);
    //     } catch (error) {
    //         console.error('Failed to load to-do list', error);
    //     }
    // };
    const loadToDoList = async () => {
        try {
          const db = await getDatabaseConnection();
      
          const data = await getAllToDos(db); 
      
          setTodoList(data);
        } catch (error) {
          console.error('failed to load to-do list', error);
          setTodoList([]); // fallback
        }
      };


    return(
        <View style={styles.container}>
            <Text style={styles.title}>To-Do List</Text>
            <FlatList
                data={todoList}
                renderItem={({item, index}) => {
                    return (
                    <Item
                    id={item.id}
                    title={item.title}
                    details={item.details}
                    isDone={item.isDone}
                    navigation={navigation}
                    index={index + 1}
                    />
                )}}
                keyExtractor={item => item.id.toString()}
            />

            <View style={styles.centerBottomDockedGroup}>
                <TouchableOpacity onPress={() => navigation.navigate('AddToDo')}>
                    <Icon name="add" size={50} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={loadToDoList}>
                    <Icon name="refresh" size={50} color="black"></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}