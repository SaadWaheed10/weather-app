import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import colors from '../assets/theme/colors';
import {moderateScale} from '../utils/responsive';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
}) => {
  const handlePress = () => {
    onToggle();
    Toast.show({
      type: isFavorite ? 'info' : 'success',
      text1: isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.star, isFavorite && styles.filledStar]}>
        {isFavorite ? '★' : '☆'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  star: {
    fontSize: moderateScale(22),
    color: colors.textPrimary,
  },
  filledStar: {
    color: colors.deepRed,
  },
});

export default FavoriteButton;
