import React, {createContext, useState, useContext, ReactNode} from 'react';
import {DefaultTheme, DarkTheme, Theme} from '@react-navigation/native';
import colors from '../assets/theme/colors';

const ThemeContext = createContext<
  {isDarkMode: boolean; toggleTheme: () => void; theme: Theme} | undefined
>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const theme = isDarkMode
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.black,
          text: colors.textPrimary,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.black,
          text: colors.textPrimary,
        },
      };

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme, theme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
