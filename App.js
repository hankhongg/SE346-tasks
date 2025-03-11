import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {useState} from 'react';

const InputBox = ({
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

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(false);

  const authUsername = 'admin';
  const authPassword = 'admin';

  const handleLogin = () => {
    if(username === authUsername && password === authPassword)
      setIsLogin(true);
    else setError(true);
  }
  return (
    !isLogin ? <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <StatusBar style="auto" />
    <View style ={styles.centerGroup}>
      <Text style={styles.label}>Username</Text>
      <InputBox loginState={error} onChangeText={setUsername} value={username} placeholder="Placeholder"/>
    </View>
    <View style ={styles.centerGroup}>
      <Text style={styles.label}>Password</Text>
      <InputBox  loginState={error} onChangeText={setPassword} value={password} secureTextEntry={true} placeholder="******* ****** **** *****"/>
    </View>
    <View style ={styles.centerGroup}>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Confirm and Continue</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView> : 
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome {username}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title:{
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  input: {
    borderWidth:2, borderColor:'black', borderRadius:10, padding:5,
  },
  label: {
    marginBottom: 5,
    fontSize: 12,
    marginTop: 10,
  },
  centerGroup:{
    alignSelf: 'center',
    width: "90%",
  },
  buttonText:{
    color: 'white', fontWeight: 'bold'
  },
  button:{
    alignSelf: 'center', alignItems: 'center', marginTop: 20, width: '100%',  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, backgroundColor: 'black'
  },
  wrongInput:{
    borderWidth:2, borderColor:'red', borderRadius:10, padding:5,
  }
});
