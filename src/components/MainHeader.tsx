import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import colors from '../assets/theme/colors';
import {
  moderateScale,
  scale,
  SCREEN_WIDTH,
  verticalScale,
} from '../utils/responsive';

const MainHeader = ({
  title,
  showBackButton = true,
}: {
  title: string;
  showBackButton?: boolean;
}) => {
  const navigation = useNavigation();
  const ICONS: any = Icon;

  return (
    <View style={styles.header}>
      {/* Back Button with Ionicon Arrow */}
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ICONS
            name="arrow-back"
            size={moderateScale(24)}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} />
      )}

      {/* Centered Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Placeholder for right-side balance */}
      <View style={styles.backButtonPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
    height: verticalScale(110),
    backgroundColor: colors.primary,
    paddingHorizontal: scale(10),
    paddingTop: moderateScale(50),
  },
  backButton: {
    padding: scale(10),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
  backButtonPlaceholder: {
    width: scale(40),
  },
});

export default MainHeader;
