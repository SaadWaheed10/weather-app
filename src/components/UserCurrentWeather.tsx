import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/theme/colors';
import {moderateScale, verticalScale} from '../utils/responsive';

const UserCurrentWeather = ({userWeather}: {userWeather: any}) => {
  const [visible, setVisible] = useState(true);
  const animationOpacity = new Animated.Value(visible ? 1 : 0);
  const MI: any = MaterialIcons;

  if (
    !userWeather ||
    !userWeather.main ||
    !userWeather.weather ||
    !userWeather.wind ||
    !userWeather.sys
  ) {
    return null;
  }

  const {
    name = 'Unknown Location',
    main: {temp = 0, feels_like = 0, humidity = 0, pressure = 0} = {},
    weather = [{}],
    wind: {speed = 0} = {},
    sys: {country = ''} = {},
  } = userWeather;

  const weatherCondition = weather?.[0]?.description || 'No Data';
  const weatherIcon = weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    : null;

  const toggleVisibility = () => {
    setVisible(!visible);
    Animated.timing(animationOpacity, {
      toValue: visible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Touchable "Your Location" Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.header}
        onPress={toggleVisibility}>
        <Text style={styles.title}>Your Location</Text>
        <MI
          name={visible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={moderateScale(20)}
          color={colors.textPrimary}
        />
      </TouchableOpacity>

      {/* Animated Weather Card */}
      <Animated.View
        style={[
          styles.card,
          // eslint-disable-next-line react-native/no-inline-styles
          {opacity: animationOpacity, height: visible ? 'auto' : 0},
        ]}>
        <Text style={styles.city}>
          {name}, {country}
        </Text>

        {weatherIcon && (
          <Image source={{uri: weatherIcon}} style={styles.icon} />
        )}

        <Text style={styles.temperature}>{temp.toFixed(1)}°C</Text>
        <Text style={styles.description}>{weatherCondition}</Text>

        <View style={styles.expandableContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>
              Feels Like: {feels_like.toFixed(1)}°C
            </Text>
            <Text style={styles.info}>Humidity: {humidity}%</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Pressure: {pressure} hPa</Text>
            <Text style={styles.info}>Wind Speed: {speed} km/h</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: verticalScale(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginLeft: moderateScale(5),
  },
  card: {
    backgroundColor: colors.cloudy,
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    overflow: 'hidden',
  },
  city: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.black,
  },
  temperature: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: colors.primary,
  },
  description: {
    fontSize: moderateScale(16),
    color: colors.textSecondary,
    marginVertical: verticalScale(5),
    textTransform: 'capitalize',
  },
  icon: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
  expandableContainer: {
    width: '100%',
    marginTop: verticalScale(10),
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: verticalScale(5),
  },
  info: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
  },
});

export default UserCurrentWeather;
