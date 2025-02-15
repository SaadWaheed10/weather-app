import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext<any>(null);

export const FavoritesProvider = ({children}: {children: React.ReactNode}) => {
  const [favorites, setFavorites] = useState<{[key: string]: any}>({});
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem('favorites', JSON.stringify(favorites)).catch(
        error => console.error('Error saving favorites:', error),
      );
    }
  }, [favorites, isLoading]);

  // Toggle favorite
  const toggleFavorite = (cityData: any) => {
    setFavorites(prevState => {
      const updatedFavorites = {...prevState};

      if (updatedFavorites[cityData.city]) {
        delete updatedFavorites[cityData.city];
      } else {
        updatedFavorites[cityData.city] = cityData;
      }

      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{favorites, toggleFavorite, isLoading}}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
