import NetInfo from '@react-native-community/netinfo';
import weatherData from '../data/weatherData';
import {saveWeatherData, loadWeatherData} from './storage';

// Function to fetch weather data
export const fetchWeatherData = async () => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    console.log('Offline mode: Loading cached weather data');
    return (await loadWeatherData()) || weatherData;
  }

  try {
    console.log('Online: Using static weatherData');
    await saveWeatherData(weatherData);
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return (await loadWeatherData()) || weatherData;
  }
};
