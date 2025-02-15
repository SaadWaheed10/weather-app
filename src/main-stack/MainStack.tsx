import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/theme/colors';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
