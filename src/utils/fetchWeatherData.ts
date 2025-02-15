import NetInfo from '@react-native-community/netinfo';
import weatherData from '../data/weatherData';
import {saveWeatherData, loadWeatherData} from './storage';

export const fetchWeatherData = async () => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    console.log('Offline mode: Loading cached weather data');
    return (await loadWeatherData()) || weatherData;
  }

  try {
    console.log('Online: Using static weatherData');
    const cachedData = await loadWeatherData();

    if (!cachedData) {
      await saveWeatherData(weatherData);
    }

    return cachedData || weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return (await loadWeatherData()) || weatherData;
  }
};
