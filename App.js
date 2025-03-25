import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing an icon set

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
        <Stack.Screen name="Danh sách Nhân viên" component={employeeListScreen}/>
        <Stack.Screen name="Thông tin Chi tiết Nhân viên" component={employeeDetails}/>
        <Stack.Screen name="Thêm Nhân viên" component={addEmployee}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  
  );
}

const Item = ({ id, employee_name, navigation, profile_image, index }) => {
  return(
    <TouchableOpacity onPress={() => navigation.navigate('Thông tin Chi tiết Nhân viên', { id: id })}>
    <View style={styles.item}>
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{index}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subject}>{employee_name}</Text>
      </View>
    </View>
  </TouchableOpacity>
  
  );
};

// Login Screen
function loginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const authUsername = 'admin';
  const authPassword = 'admin';

  // fetch api
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployee = async () => {
      try {
        const response = await fetch('http://blackntt.net:88/api/v1/employees');
        if (!response.ok) {
          throw new Error('Đã có lỗi');
        }
        const data = await response.json();
          if (data.response == false){
              setEmployees([]);
              throw new Error(data.message);
          } else {
              setEmployees(data);
          }
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
      fetchEmployee();
  }, []); // empty array means this effect will run only once


  const handleLogin = () => {
    for (let i = 0; i < employees.length; i++) {
      if(username === employees[i].id){
        navigation.navigate('Danh sách Nhân viên', {username: username});
        return;
      }
      else{
        setIsError(true);
      }
    }
  }
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Confirm and Continue</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}

// Employee List Screen
function employeeListScreen({navigation}) {
  // fetch api
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployee = async () => {
      try {
        const response = await fetch('http://blackntt.net:88/api/v1/employees');
        if (!response.ok) {
          throw new Error('Đã có lỗi');
        }
        const data = await response.json();
          if (data.response == false){
              setEmployees([]);
              throw new Error(data.message);
          } else {
              setEmployees(data);
          }
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
      fetchEmployee();
  }, []); // empty array means this effect will run only once
  
  return (
    <SafeAreaView style={styles.detailContainer}>
      <Text style={styles.title}>Danh sách các Nhân viên</Text>
      <StatusBar style="auto" />
      <Text>
        {loading ? 'Loading...' : ''}
      </Text>
      <FlatList
        data={employees}
        renderItem={({item, index}) => <Item id={item.id} index={index + 1}
        employee_name={item.employee_name} navigation={navigation} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.centerBottomDockedGroup}>
        <TouchableOpacity onPress={() => navigation.navigate('Thêm Nhân viên')}>
          <Icon name="add" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={fetchEmployee}>
          <Icon name="refresh" size={50} color="black"></Icon>
        </TouchableOpacity>
      </View>
      
      
    </SafeAreaView>
    
  );
}

// Employee Details Screen
function employeeDetails({route, navigation}) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeAge, setEmployeeAge] = useState('');
  const [employeeSalary, setEmployeeSalary] = useState('');

  const { id } = route.params;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch('http://blackntt.net:88/api/v1/employees');
        if (!response.ok) {
          throw new Error('Đã có lỗi');
        }
        const data = await response.json();
        if (data.response === false) {
          setEmployees([]);
          throw new Error(data.message);
        } else {
          setEmployees(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []); 

  const chosenEmployee = employees.find(item => item.id === id);

  useEffect(() => {
    if (chosenEmployee) {
      setEmployeeName(chosenEmployee.employee_name || '');
      setEmployeeAge(chosenEmployee.employee_age?.toString() || '');
      setEmployeeSalary(chosenEmployee.employee_salary?.toString() || '');
    }
  }, [chosenEmployee]); 

  if (loading) {
    return <Text style={styles.centerGroup}>Loading...</Text>;
  }

  if (!chosenEmployee) {
    return <Text style={styles.centerGroup}>Không tìm thấy nhân viên.</Text>;
  }

  const updateEmployee = async (id, updatedData) => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      };

      const response = await fetch(`http://blackntt.net:88/api/v1/update/${id}`, requestOptions);

      if (!response.ok) {
        throw new Error('Đã có lỗi khi update nhân viên');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleUpdate = async () => {
    const updatedData = {
      employee_name: employeeName,
      employee_age: employeeAge,
      employee_salary: employeeSalary
    };
    const result = await updateEmployee(id, updatedData);
    if (result) {
      Alert.alert("Thành công", "Cập nhật thông tin nhân viên thành công!");
      navigation.navigate('Danh sách Nhân viên');
    } else {
      Alert.alert("Lỗi", "Cập nhật thất bại, vui lòng thử lại!");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };

      const response = await fetch(`http://blackntt.net:88/api/v1/delete/${id}`, requestOptions);

      if (!response.ok) {
        throw new Error('Đã có lỗi khi xóa nhân viên');
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : {}; 
      return data;
    } catch (error) {
      console.error('Lỗi:', error);
    }
  }

  const handleDelete = async () => {
    if (!id) {
      Alert.alert("Lỗi", "Không tìm thấy ID nhân viên!");
      return;
    }
    const result = await deleteEmployee(id);
    if (result) {
      Alert.alert("Thành công", "Xóa nhân viên thành công!");
      navigation.navigate('Danh sách Nhân viên');
    } else {
      Alert.alert("Lỗi", "Xóa thất bại, vui lòng thử lại");
    }
  }

  return (
    <SafeAreaView style={styles.detailContainer}>
      <Text style={styles.title}>Chi tiết Nhân viên</Text>
      <StatusBar style="auto" />
      <View style={styles.centerGroup}>
        <Image
          source={{ uri: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/00bddb041d6debb43f16b46332b77cab35b38da3_full.jpg" }}
          style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center" }}
        />
        <Text style={styles.label}>Tên nhân viên:</Text>
        <InputBox onChangeText={setEmployeeName} value={employeeName} />
        <Text style={styles.label}>Tuổi nhân viên:</Text>
        <InputBox onChangeText={setEmployeeAge} value={employeeAge} />
        <Text style={styles.label}>Lương nhân viên:</Text>
        <InputBox onChangeText={setEmployeeSalary} value={employeeSalary} />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Add Employee Screen
function addEmployee({navigation}) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeAge, setEmployeeAge] = useState('');
  const [employeeSalary, setEmployeeSalary] = useState('');


  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch('http://blackntt.net:88/api/v1/employees');
        if (!response.ok) {
          throw new Error('Đã có lỗi');
        }
        const data = await response.json();
        if (data.response === false) {
          setEmployees([]);
          throw new Error(data.message);
        } else {
          setEmployees(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []); 

  const addEmployee = async (addedData) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addedData)
      };

      const response = await fetch(`http://blackntt.net:88/api/v1/create`, requestOptions);

      if (!response.ok) {
        throw new Error('Đã có lỗi khi thêm nhân viên');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleAdd = async () => {
    const addedData = {
      employee_name: employeeName,
      employee_age: employeeAge,
      employee_salary: employeeSalary
    }
    const result = await addEmployee(addedData);
    if (result) {
      Alert.alert("Thành công", "Thêm nhân viên thành công!");
      navigation.navigate('Danh sách Nhân viên');
    } else {
      Alert.alert("Lỗi", "Thêm thất bại, vui lòng thử lại!");
    }
  }

  if (loading) {
    return <Text style={styles.centerGroup}>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.detailContainer}>
      <Text style={styles.title}>Thêm Nhân viên</Text>
      <StatusBar style="auto" />
      <View style={styles.centerGroup}>
        <Image
          source={{ uri: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/00bddb041d6debb43f16b46332b77cab35b38da3_full.jpg" }}
          style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center" }}
        />
        <Text style={styles.label}>Tên nhân viên:</Text>
        <InputBox onChangeText={setEmployeeName} value={employeeName} />
        <Text style={styles.label}>Tuổi nhân viên:</Text>
        <InputBox onChangeText={setEmployeeAge} value={employeeAge} />
        <Text style={styles.label}>Lương nhân viên:</Text>
        <InputBox onChangeText={setEmployeeSalary} value={employeeSalary} />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Thêm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


// Styles
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
    backgroundColor: 'black',
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
  centerBottomDockedGroup: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  deleteButton: {
    alignSelf: 'center', alignItems: 'center', marginTop: 10, width: '100%',  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, backgroundColor: 'red'
  }
});
