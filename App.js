import 'react-native-gesture-handler';
import { StyleSheet, Dimensions } from 'react-native';
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderBar from './presentation/HeaderBar/Header';
import CategoriesScreen from './screens/Categories';

const Stack = createStackNavigator();

export default function App() {
  return (
  
    <NavigationContainer style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options = {{ title: "smth", header: props => <HeaderBar /> }}
            />
            <Stack.Screen 
            name="Login" 
            component={LoginScreen} />
            <Stack.Screen 
            name="Categories" 
            component={CategoriesScreen} />

          </Stack.Navigator>
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height
  },
});
