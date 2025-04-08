import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

const InputBox = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  style,
  keyboardType = 'numeric',
}) => {
  return (
    <View style={styles.input}>
      <TextInput
        style={style}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
    
  )
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      weight: '0',
      height: '0',
      bmi: 0,
    }
    // to use this.compute instead of () => {this.compute()}
    this.compute = this.compute.bind(this);
  }


  compute(){
    let weight = parseFloat(this.state.weight);
    let height = parseFloat(this.state.height);
    let bmiTemp = weight / Math.pow(height/100, 2);
    this.setState({bmi: bmiTemp.toFixed(2)});
    
  }
  
  render(){
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style ={styles.centerGroup}>
        <Text style={styles.label}>Weight (KG)</Text>
        <InputBox onChangeText={(weight) => this.setState({weight})} value={this.state.weight}  placeholder="Please enter weight in kg"/>
        <Text style={styles.label}>Height (CM)</Text>
        <InputBox onChangeText={(height) => this.setState({height})} value={this.state.height}  placeholder="Please enter height in cm"/>
        
        <Text style={{margin: 10, alignSelf: 'center'}}>BMI: {this.state.bmi}</Text>
        <TouchableOpacity style={styles.button} onPress={this.compute}>
          <Text style={styles.buttonText}>Compute</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
  }
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
    alignSelf: 'center', alignItems: 'center', width: '100%',  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, backgroundColor: 'black'
  }
});


export default App;