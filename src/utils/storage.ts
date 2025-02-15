import AsyncStorage from '@react-native-async-storage/async-storage';

// Save weather data
export const saveWeatherData = async (data: any) => {
  try {
    await AsyncStorage.setItem('weatherData', JSON.stringify(data));
    console.log('Weather data saved for offline use');
  } catch (error) {
    console.error('Error saving weather data:', error);
  }
};

// Load cached weather data
export const loadWeatherData = async () => {
  try {
    const storedData = await AsyncStorage.getItem('weatherData');
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error loading cached weather data:', error);
    return null;
  }
};
