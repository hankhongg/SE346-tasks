import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, TouchableOpacity, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="screen1" component={Screen1}/>
        <Stack.Screen name="screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
function Screen1({navigation}) {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Screen 1</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('screen2',{name: 1})}><Text>To screen 2</Text></TouchableOpacity>
    </SafeAreaView>
  );
}
function Screen2({navigation}) {
//route.params.name
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Screen 2</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('screen1')}><Text>To screen 1</Text></TouchableOpacity>
    </SafeAreaView>
  );
}