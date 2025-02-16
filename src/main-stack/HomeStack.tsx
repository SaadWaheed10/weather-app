import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WeatherDetailScreen from '../screens/WeatherDetailScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="WeatherDetail" component={WeatherDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
