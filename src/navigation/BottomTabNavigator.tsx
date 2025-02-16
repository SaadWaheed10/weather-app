/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import {Text, StyleSheet, Animated} from 'react-native';
import {moderateScale, scale} from '../utils/responsive';
import colors from '../assets/theme/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const FA5: any = FontAwesome5;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = focused ? colors.softTeal : colors.textPrimary;
          let scaleValue = focused ? 1.2 : 1;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorite') {
            iconName = 'star';
          }

          return (
            <Animated.View style={{transform: [{scale: scaleValue}]}}>
              <FA5
                name={iconName}
                size={moderateScale(24)}
                color={color}
                solid
              />
            </Animated.View>
          );
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={[
              styles.label,
              {color: focused ? colors.softTeal : colors.textPrimary},
            ]}>
            {route.name}
          </Text>
        ),
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    height: scale(80),
    borderTopWidth: 0,
  },
  label: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    marginBottom: scale(5),
  },
});

export default BottomTabNavigator;
