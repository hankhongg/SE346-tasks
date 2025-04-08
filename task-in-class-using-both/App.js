import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Component } from 'react';

const number = 2;
function functionApp() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{number > 3 ? "Greater than 3" : "Less or equal to 3" }</Text>
        {
          [...Array(number)].map((_, index) => <Text key={index}>{index+1}</Text>)
        }
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

class classApp extends Component{
  render(){
    return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{number > 1 ? "Greater than 1" : "Less or equal to 1" }</Text>
        {
          [...Array(number)].map((_, index) => <Text key={index}>{index+1}</Text>)
        }
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//export default functionApp;
export default classApp; 
