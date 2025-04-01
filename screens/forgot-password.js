import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { InputBox } from '../styles/input-box';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ForgotPasswordScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [isError, setIsError] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const authUsername = 'admin';

  const handleReset = async () => {
    if (username === authUsername) {
      try {
        await AsyncStorage.setItem('password', newPassword); // Save new password
        setIsError(false);
        Alert.alert(
            'Password Reset',
            `Hi ${username}, your password has been reset to: ${newPassword}`,
            [
            {
                text: 'OK',
                onPress: () => navigation.navigate('Login'), // or 'Home'
            },
            ]
        );
      } catch (error) {
        console.error('Error resetting password:', error);
        Alert.alert('Error', 'Something went wrong while resetting the password.');
      }
    } else {
      setIsError(true);
      Alert.alert('Error', 'Username not found.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <StatusBar style="auto" />

      <View style={styles.centerGroup}>
        <Text style={styles.loginLabel}>Enter your username:</Text>
        <InputBox
          loginState={isError}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />
        <Text style={styles.loginLabel}>Enter new password:</Text>
        <InputBox
          loginState={isError}
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder="New Password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.centerGroup}>
        <TouchableOpacity style={styles.loginButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
