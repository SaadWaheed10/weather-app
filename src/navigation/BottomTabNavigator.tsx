/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {Text, StyleSheet} from 'react-native';
import FavoriteScreen from '../screens/FavoriteScreen';
import {moderateScale, scale} from '../utils/responsive';
import colors from '../assets/theme/colors';

const Tab = createBottomTabNavigator();

const HomeIcon = () => <Text style={styles.icon}>🏠</Text>;
const FavIcon = () => <Text style={styles.icon}>⭐</Text>;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: () => (route.name === 'Home' ? <HomeIcon /> : <FavIcon />),
        tabBarLabelStyle: styles.label,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    height: scale(70),
  },
  icon: {
    fontSize: moderateScale(20),
    color: colors.textPrimary,
  },
  label: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;
