import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {scale} from '../utils/responsive';
import colors from '../assets/theme/colors';

interface TemperatureToggleProps {
  isFahrenheit: boolean;
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({
  isFahrenheit,
  onToggle,
}) => {
  return (
    <View>
      <Switch
        value={isFahrenheit}
        onValueChange={onToggle}
        trackColor={{false: colors.softTeal, true: colors.deepRed}}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    top: scale(0),
    left: scale(0),
  },
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
});

export default TemperatureToggle;
