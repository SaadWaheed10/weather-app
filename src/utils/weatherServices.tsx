/* eslint-disable @typescript-eslint/no-unused-vars */
import {PermissionsAndroid, Platform, Alert, Linking} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'de036e3982a065f5a71aff0aa0db0253';

export interface WeatherData {
  name: string;
  main?: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather?: {
    description: string;
    icon: string;
  }[];
  wind?: {
    speed: number;
  };
  sys?: {
    country: string;
  };
}

// Function to fetch weather by city name
export const fetchWeatherByCity = async (
  city: string,
): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    Alert.alert('Error', 'Could not fetch city weather data.');
    return null;
  }
};

// Function to request location permission
const requestLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }
  } catch (error) {
    return false;
  }
};

// Function to check if Location Services are enabled
const checkLocationServices = () => {
  Geolocation.getCurrentPosition(
    () => {},
    error => {
      if (error.code === 2) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services in settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
      }
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

// Function to get weather by user’s current location
export const fetchWeatherByLocation = async (): Promise<WeatherData | null> => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Enable location to get weather data.');
      return null;
    }

    checkLocationServices();

    return new Promise(resolve => {
      Geolocation.getCurrentPosition(
        async position => {
          if (!position || !position.coords) {
            Alert.alert('Error', 'Could not get location data.');
            resolve(null);
            return;
          }

          const {latitude, longitude} = position.coords;

          if (!latitude || !longitude) {
            Alert.alert('Error', 'Invalid location data.');
            resolve(null);
            return;
          }

          try {
            const response = await fetch(
              `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
            );

            if (!response.ok) {
              Alert.alert('Error', 'Could not fetch weather data.');
              resolve(null);
              return;
            }

            const data: WeatherData = await response.json();

            // Validate required fields before resolving
            if (!data.main || !data.weather || !data.wind || !data.sys) {
              Alert.alert('Error', 'Incomplete weather data received.');
              resolve(null);
              return;
            }

            resolve(data);
          } catch (fetchError) {
            Alert.alert('Error', 'Could not fetch weather data.');
            resolve(null);
          }
        },
        locationError => {
          Alert.alert('Error', 'Could not fetch location.');
          resolve(null); // Return null instead of rejecting
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  } catch (error) {
    Alert.alert('Error', 'Unexpected error fetching weather data.');
    return null;
  }
};
