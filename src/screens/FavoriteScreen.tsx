import React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
import {useFavorites} from '../context/FavoriteContext';

// Define the type for a favorite city
type FavoriteCity = {
  id: number;
  city: string;
  temperature: number;
  weather: string;
  humidity: number;
  windSpeed: number;
};

export default function FavoriteScreen() {
  const {favorites, toggleFavorite, isLoading} = useFavorites();
  const favoriteCities: FavoriteCity[] = Object.values(favorites);
  const navigation = useNavigation<{
    navigate: (screen: string, params?: any) => void;
  }>();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

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
            keyExtractor={(item: FavoriteCity) => item.id.toString()}
            renderItem={({item}: {item: FavoriteCity}) => (
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
                  isFavorite={Boolean(favorites[item.city])}
                  onToggleFavorite={() => toggleFavorite(item)}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: moderateScale(16),
    color: colors.textSecondary,
    marginTop: verticalScale(10),
  },
});
