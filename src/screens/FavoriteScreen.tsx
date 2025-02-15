import React from 'react';
import {Text, FlatList, StyleSheet} from 'react-native';
import {useFavorites} from '../context/FavoriteContext';
import WeatherCard from '../components/WeatherCard';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/theme/colors';

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

  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.container}>
      <Text style={styles.heading}>Favorite Cities</Text>

      {favoriteCities.length === 0 ? (
        <Text style={styles.noResults}>No favorite cities added</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favoriteCities}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <WeatherCard
              city={item.city}
              temperature={item.temperature}
              weather={item.weather}
              humidity={item.humidity}
              windSpeed={item.windSpeed}
              isFavorite={true}
              onToggleFavorite={() => toggleFavorite(item)}
            />
          )}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    paddingTop: 70,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  noResults: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 20,
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});
