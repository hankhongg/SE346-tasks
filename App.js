import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { HomeScreen } from './screens/home-screen';
import { AddToDoScreen } from './screens/add-to-do-screen';
import { DeleteToDoScreen } from './screens/delete-to-do-screen';
import { LoginScreen } from './screens/login-screen';
import { ForgotPasswordScreen } from './screens/forgot-password';
import { useEffect } from 'react';
import { getDatabaseConnection, createToDosTable, createAccountsTable } from './database/dbService';

const Stack = createNativeStackNavigator();



export default function App() {
  useEffect(() => {
    const setup = async () => {
      const db = await getDatabaseConnection();
      await createToDosTable(db);
      await createAccountsTable(db);
      
    };
    setup();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddToDo" component={AddToDoScreen} />
        <Stack.Screen name="DeleteToDo" component={DeleteToDoScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


