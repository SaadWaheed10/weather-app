import React from 'react';
import MainStack from './src/main-stack/MainStack';
import Toast from 'react-native-toast-message';
import {FavoritesProvider} from './src/context/FavoriteContext';
import {ThemeProvider} from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <MainStack />
        <Toast />
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
