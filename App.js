import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {useState} from 'react';
import classData from './class-data';
import {FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

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

const Stack = createNativeStackNavigator();

export default function App() {
  return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Màn hình Đăng nhập" component={loginScreen}/>
      <Stack.Screen name="Danh sách Lớp" component={classListScreen}/>
      <Stack.Screen name="Thông tin Chi tiết Lớp" component={classDetailScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const Item = ({ id, subjectName,index, time, navigation }) => {

  return(
    <TouchableOpacity onPress={() => navigation.navigate('Thông tin Chi tiết Lớp', { id: id })}>
    <View style={styles.item}>
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{index}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subject}>{subjectName}</Text>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={16} color="#555" />
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
  
  );
};


function loginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const authUsername = 'admin';
  const authPassword = 'admin';

  const handleLogin = () => {
    if(username === authUsername && password === authPassword){
      setIsLogin(true);
      navigation.navigate('Danh sách Lớp', {username: username});
    }
  }
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <StatusBar style="auto" />
    <View style ={styles.centerGroup}>
      <Text style={styles.loginLabel}>Username</Text>
      <InputBox loginState={isLogin} onChangeText={setUsername} value={username} placeholder="Placeholder"/>
    </View>
    <View style ={styles.centerGroup}>
      <Text style={styles.loginLabel}>Password</Text>
      <InputBox  loginState={isLogin} onChangeText={setPassword} value={password} secureTextEntry={true} placeholder="******* ****** **** *****"/>
    </View>
    <View style ={styles.centerGroup}>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Confirm and Continue</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}
function classListScreen({navigation}) {
  return (
    <SafeAreaView style={styles.detailContainer}>
      <Text style={styles.title}>Danh sách các Lớp</Text>
      <StatusBar style="auto" />
      <FlatList
        data={classData}
        renderItem={({item, index}) => <Item id={item.id} index={index + 1}
        subjectName={item.subjectName} time={item.time} navigation={navigation}/>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

function classDetailScreen({route}) {
  const {id} = route.params;
  const item = classData.find(item => item.id === id);
  return (
    <SafeAreaView style={styles.detailContainer}>
      <Text style={styles.title}>Chi tiết Lớp</Text>
      <StatusBar style="auto" />
      <View style={styles.centerGroup}>
        <Text style={styles.label}>Lớp: {item.subjectName}</Text>
        <Text style={styles.label}>Thời gian: {item.time}</Text>
        <Text style={styles.label}>Mã môn học: {item.classId}</Text>
        <Text style={styles.label}>Giảng viên: {item.lecturer}</Text>
        <Text style={styles.label}>Phòng học: {item.classRoom}</Text>
      </View>
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
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
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
    fontSize: 20,
    marginTop: 10,
  },
  loginLabel: {
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
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, 
  },
  indexContainer: {
    backgroundColor: '#4CAF50',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  indexText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
});
