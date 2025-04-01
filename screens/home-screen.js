import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { styles } from '../styles/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Item } from '../components/item';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing an icon set


const data = [{
    id: 1,
    title: 'Title',
    details: 'Details',
    isDone: false,
},
{
    id: 2,
    title: 'Title2',
    details: 'Details2',
    isDone: false,
},
]

export function HomeScreen({navigation}){
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        loadToDoList();
    }, []);

    const loadToDoList = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('todoList');
            const data = jsonValue != null ? JSON.parse(jsonValue) : [];
            setTodoList(data);
        } catch (error) {
            console.error('Failed to load to-do list', error);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>To-Do List</Text>
            <FlatList
                data={todoList}
                renderItem={({item, index}) => (
                    <Item
                    id={item.id}
                    title={item.title}
                    details={item.details}
                    isDone={item.isDone}
                    navigation={navigation}
                    index={index + 1}
                    />
                )}
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