// import React, {useState} from 'react';
// import {View, Text, FlatList, StyleSheet} from 'react-native';
// import weatherData from '../data/weatherData';
// import colors from '../assets/theme/colors';
// import {
//   SCREEN_WIDTH,
//   scale,
//   verticalScale,
//   moderateScale,
// } from '../utils/responsive';
// import SearchBar from '../components/SearchBar';
// import TemperatureToggle from './TemperatueToggle';
// import FavoriteButton from './FavoriteButton';
// import {useFavorites} from '../context/FavoriteContext';

// const getWeatherColor = (weather: string) => {
//   switch (weather) {
//     case 'Sunny':
//       return colors.sunny;
//     case 'Cloudy':
//       return colors.cloudy;
//     case 'Rainy':
//       return colors.rainy;
//     case 'Stormy':
//       return colors.stormy;
//     case 'Snowy':
//       return colors.snowy;
//     default:
//       return colors.background;
//   }
// };

// const WeatherList = () => {
//   const [search, setSearch] = useState('');
//   const [tempUnits, setTempUnits] = useState<{[key: string]: boolean}>({});
//   const {favorites, toggleFavorite} = useFavorites();

//   const filteredData = weatherData.filter(item =>
//     item.city.toLowerCase().includes(search.toLowerCase()),
//   );

//   const toggleTemperature = (city: string) => {
//     setTempUnits(prevState => ({
//       ...prevState,
//       [city]: !prevState[city],
//     }));
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Bar Component */}
//       <SearchBar search={search} setSearch={setSearch} />

//       {filteredData.length === 0 ? (
//         <Text style={styles.noResults}>No cities found</Text>
//       ) : (
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           data={filteredData}
//           keyExtractor={item => item.id.toString()}
//           contentContainerStyle={styles.listContainer}
//           renderItem={({item}) => {
//             const isFahrenheit = tempUnits[item.city] || false;
//             const isFavorite = favorites[item.city] || false;
//             const temperature = isFahrenheit
//               ? (item.temperature * 9) / 5 + 32
//               : item.temperature;
//             const tempUnit = isFahrenheit ? '°F' : '°C';

//             return (
//               <View
//                 style={[
//                   styles.card,
//                   {
//                     backgroundColor: getWeatherColor(item.weather),
//                     height: verticalScale(160),
//                   },
//                 ]}>
//                 {/* Top Row: Toggle (Left) & Favorite Star (Right) */}
//                 <View style={styles.topRow}>
//                   {/* Toggle Switch (Left Side) */}
//                   <TemperatureToggle
//                     isFahrenheit={isFahrenheit}
//                     onToggle={() => toggleTemperature(item.city)}
//                   />

//                   {/* Favorite Button (Right Side) */}
//                   <FavoriteButton
//                     isFavorite={isFavorite}
//                     onToggle={() => toggleFavorite(item)}
//                   />
//                 </View>

//                 {/* City Name */}
//                 <Text style={styles.city}>{item.city}</Text>

//                 {/* Temperature and Weather */}
//                 <Text style={styles.temp}>
//                   {temperature.toFixed(1)} {tempUnit} - {item.weather}
//                 </Text>
//                 <Text style={styles.details}>
//                   Humidity: {item.humidity}% | Wind: {item.windSpeed} km/h
//                 </Text>
//               </View>
//             );
//           }}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: SCREEN_WIDTH,
//     alignItems: 'center',
//     paddingVertical: verticalScale(10),
//   },
//   noResults: {
//     fontSize: moderateScale(18),
//     color: colors.textSecondary,
//     marginTop: verticalScale(20),
//   },
//   listContainer: {
//     alignItems: 'center',
//     paddingBottom: verticalScale(20),
//   },
//   card: {
//     width: SCREEN_WIDTH * 0.9,
//     padding: scale(15),
//     marginVertical: verticalScale(8),
//     borderRadius: scale(10),
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: colors.textSecondary,
//     shadowOffset: {width: 2, height: 2},
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//     position: 'relative',
//   },
//   topRow: {
//     position: 'absolute',
//     top: scale(10),
//     left: scale(10),
//     right: scale(10),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   star: {
//     fontSize: moderateScale(22),
//     color: colors.textPrimary,
//   },
//   filledStar: {
//     color: colors.fav,
//   },
//   city: {
//     fontSize: moderateScale(20),
//     fontWeight: 'bold',
//     color: colors.textPrimary,
//     marginBottom: moderateScale(8),
//   },
//   temp: {
//     fontSize: moderateScale(18),
//     color: colors.textPrimary,
//     marginBottom: moderateScale(5),
//   },
//   details: {
//     fontSize: moderateScale(14),
//     color: colors.textSecondary,
//   },
// });

// export default WeatherList;

import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import weatherData from '../data/weatherData';
import SearchBar from '../components/SearchBar';
import {useFavorites} from '../context/FavoriteContext';
import WeatherCard from './WeatherCard'; // Import WeatherCard

const WeatherList = () => {
  const [search, setSearch] = useState('');
  const {favorites, toggleFavorite} = useFavorites();

  const filteredData = weatherData.filter(item =>
    item.city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Search Bar Component */}
      <SearchBar search={search} setSearch={setSearch} />

      {filteredData.length === 0 ? (
        <Text style={styles.noResults}>No cities found</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <WeatherCard
              city={item.city}
              temperature={item.temperature}
              weather={item.weather}
              humidity={item.humidity}
              windSpeed={item.windSpeed}
              isFavorite={favorites[item.city] || false}
              onToggleFavorite={() => toggleFavorite(item)}
            />
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
    paddingVertical: 10,
  },
  noResults: {
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default WeatherList;
