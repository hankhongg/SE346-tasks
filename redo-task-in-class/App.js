import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const number = 6;
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{number > 5 ? "Greater than 5" : "Less or equal to 5" }</Text>
        {[...Array(number)].map((e, i) => 
          <Text key={i}>{i+1}</Text>)}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
