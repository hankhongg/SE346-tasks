import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const number = 4;
class App extends Component{
  render(){
    return(
      <SafeAreaView style={styles.container}>
        <View>
          <Text>{number > 5 ? "Greater than 5" : "Less or equal to 5" }</Text>
            {[...Array(number)].map((e, i) => 
          <Text key={i}>{i+1}</Text>)}
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
      
    )
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

export default App;
