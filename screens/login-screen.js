import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { styles } from '../styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import { InputBox } from '../styles/input-box';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findAccountByUsername, getDatabaseConnection, insertAccount } from '../database/dbService';

export function LoginScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [authPassword, setAuthPassword] = useState('123456');
    const authUsername = 'admin';

    // const handleLogin = async () => {
    //   const storedPassword = await AsyncStorage.getItem('password') || authPassword; // if no password is stored, use default
    //     // check if the username and password match
    //     if (username == authUsername && password == storedPassword) {
    //         setIsError(false);
    //         navigation.navigate('Home');
    //     }
    //     else {
    //         setIsError(true);
    //     }
    // };
    
    const handleLogin = async () => {
      console.log("Login button pressed");
    
      const db = await getDatabaseConnection();
      console.log('📦 DB instance:', db);
      console.log('authUsername:', authUsername);
    
      try {
        const user = await findAccountByUsername(db, username);
    
        let storedPassword;
    
        // If no user found, and it's the admin, create default admin account
        if (!user && username === authUsername) {
          storedPassword = authPassword;
          await insertAccount(db, authUsername, storedPassword);
          console.log('✨ Default admin account inserted');
        } else if (user) {
          storedPassword = user.password;
        }
    
        console.log('🔐 Retrieved password:', storedPassword);
    
        if (username === authUsername && password === storedPassword) {
          setIsError(false);
          navigation.navigate('Home');
        } else {
          setIsError(true);
        }
    
      } catch (e) {
        console.error("❌ Error during login:", e);
        setIsError(true);
      }
    };


    return (
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <StatusBar style="auto" />
      <View style ={styles.centerGroup}>
        <Text style={styles.loginLabel}>Username</Text>
        <InputBox loginState={isError} onChangeText={setUsername} value={username} placeholder="Placeholder"/>
      </View>
      <View style ={styles.centerGroup}>
        <Text style={styles.loginLabel}>Password</Text>
        <InputBox  loginState={isError} onChangeText={setPassword} value={password} secureTextEntry={true} placeholder="******* ****** **** *****"/>
      </View>
      <View style ={styles.centerGroup}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Confirm and Continue</Text>
        </TouchableOpacity>
        <Button onPress={() => navigation.navigate('ForgotPassword')} title='Forgot Password'></Button>
      </View>
    </SafeAreaView>
    );
  }
  
