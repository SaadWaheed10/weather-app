import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import weatherData from '../data/weatherData';
import SearchBar from '../components/SearchBar';
import {useFavorites} from '../context/FavoriteContext';
import WeatherCard from './WeatherCard'; // Import WeatherCard
import {useNavigation} from '@react-navigation/native';
import colors from '../assets/theme/colors';
import {moderateScale, verticalScale} from '../utils/responsive';

const WeatherList = () => {
  const [search, setSearch] = useState('');
  const {favorites, toggleFavorite} = useFavorites();
  const navigation = useNavigation<any>();

  const filteredData = weatherData.filter(item =>
    item.city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar search={search} setSearch={setSearch} />

      {filteredData.length === 0 ? (
        <Text style={styles.noResults}>No cities found</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  noResults: {
    fontSize: moderateScale(18),
    color: colors.textSecondary,
    marginTop: verticalScale(20),
  },
});

export default WeatherList;
