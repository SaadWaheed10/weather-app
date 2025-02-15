import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext<any>(null);

export const FavoritesProvider = ({children}: {children: React.ReactNode}) => {
  const [favorites, setFavorites] = useState<{[key: string]: any}>({});

  // Load favorites from AsyncStorage on app start
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  // Toggle favorite and save to AsyncStorage
  const toggleFavorite = async (cityData: any) => {
    setFavorites(prevState => {
      const updatedFavorites = {...prevState};

      if (updatedFavorites[cityData.city]) {
        delete updatedFavorites[cityData.city];
      } else {
        updatedFavorites[cityData.city] = cityData;
      }

      // Save updated favorites to AsyncStorage
      AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites)).catch(
        error => console.error('Error saving favorites:', error),
      );

      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{favorites, toggleFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
