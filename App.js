import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';


const formatTime = (time) => {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let formattedTime = [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0")
  ].join(":");
  return formattedTime;
};


class StopWatch extends Component {
  constructor(props){
    super(props);
    this.state = {
      timeElapsed: 0,
      isRunning: false,
      laps: [],
      startTime: null
    }
    this.handleStartPress = this.handleStartPress.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
    this.interval = null;
    this.startStopButton = this.startStopButton.bind(this);
    this.lapButton = this.lapButton.bind(this);
    this.laps = this.laps.bind(this)
  }
  laps(){
    return this.state.laps.map((time, index) => {
      return (
        <View key={index} style={styles.centerGroup}>
          <Text style={styles.time}>Lap {index}: {formatTime(time)}</Text>
        </View>
      )
    })
  }
  startStopButton(){
    let label= this.state.isRunning ? "Stop" : "Start";
    return (
      <TouchableOpacity style={styles.button} onPress={this.handleStartPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    )
  }
  lapButton(){
    return (
      <TouchableOpacity style={styles.button} onPress={this.handleLapPress}>
        <Text style={styles.buttonText}>Lap</Text>
      </TouchableOpacity>
    )
  }
  handleLapPress(){
    let lap = this.state.timeElapsed;
    this.setState({
      laps: this.state.laps.concat([lap]),
    });
  }
  handleStartPress(){
    if(this.state.isRunning){
      clearInterval(this.interval);
      this.setState({
        isRunning: false,
      });
      return;
    }
    let startTime = Date.now() - this.state.timeElapsed;
    this.setState({isRunning:true});
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: Date.now() - startTime,
     
      });
    }, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Stop Watch</Text>
      <StatusBar style="auto" />
      <View style={styles.centerGroup}>
        <Text style={styles.time}>{formatTime(this.state.timeElapsed)}</Text>
      </View>
      <View style={styles.buttonGroup}>
        {this.lapButton()}
        {this.startStopButton()}
      </View>
      <ScrollView style={styles.scrollView}>

        {this.laps()}
      </ScrollView>
      
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    width: 70,  
    height: 70, 
    borderRadius: 35,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  input: {
    borderWidth:2, borderColor:'black', borderRadius:10, padding:5,
  },
  title: {
    marginTop: 50,
    marginBottom: 5,
    fontSize: 30,
    marginTop: 10,
  },
  time: {
    marginBottom: 5,
    fontSize: 20,
    marginTop: 10,
  },
  centerGroup:{
    alignSelf: 'center',
  },
  scrollView: {
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

});

export default StopWatch;