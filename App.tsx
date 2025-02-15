import React from 'react';
import MainStack from './src/main-stack/MainStack';
import Toast from 'react-native-toast-message';
import {FavoritesProvider} from './src/context/FavoriteContext';

const App = () => {
  return (
    <FavoritesProvider>
      <>
        <MainStack />
        <Toast />
      </>
    </FavoritesProvider>
  );
};

export default App;
