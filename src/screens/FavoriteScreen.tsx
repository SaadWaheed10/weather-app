import React from 'react';
import {Text, FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useFavorites} from '../context/FavoriteContext';
import WeatherCard from '../components/WeatherCard';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/theme/colors';
import MainHeader from '../components/MainHeader';
import {
  moderateScale,
  scale,
  SCREEN_WIDTH,
  verticalScale,
} from '../utils/responsive';
import {useNavigation} from '@react-navigation/native';

type FavoriteCity = {
  id: number;
  city: string;
  temperature: number;
  weather: string;
  humidity: number;
  windSpeed: number;
};

export default function FavoriteScreen() {
  const {favorites, toggleFavorite} = useFavorites();
  const favoriteCities: FavoriteCity[] = Object.values(favorites);
  const navigation = useNavigation<any>();

  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.container}>
      <MainHeader title="Favorite Cities" />

      <View style={styles.content}>
        {favoriteCities.length === 0 ? (
          <Text style={styles.noResults}>No favorite cities added</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favoriteCities}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}: {item: any}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WeatherDetail', {weather: item})
                }
                activeOpacity={0.7}>
                <WeatherCard
                  city={item.city}
                  temperature={item.temperature}
                  weather={item.weather}
                  humidity={item.humidity}
                  windSpeed={item.windSpeed}
                  isFavorite={favorites[item.city] || false}
                  onToggleFavorite={() => toggleFavorite(item)}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    marginTop: verticalScale(20),
  },
  noResults: {
    fontSize: moderateScale(18),
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: scale(20),
  },
});
