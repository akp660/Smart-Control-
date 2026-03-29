import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { colors } from '../resource/colors';

interface Props {
  isOn: boolean;
  onToggle: (val: boolean) => void;
}

const CustomToggle: React.FC<Props> = ({ isOn, onToggle }) => {
  const animValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isOn ? 1 : 0,
      duration: 250,
      useNativeDriver: false, // color interpolation cannot use native driver
    }).start();
  }, [isOn]);

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 32] // track is 64, thumb is 28. (64 - 28 - 4 = 32)
  });

  const trackBackgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0.08)', colors.accent] // Glass to solid white
  });

  const thumbBackgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.text, colors.black] // White to black
  });

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onToggle(!isOn)}>
      <Animated.View style={[styles.track, { backgroundColor: trackBackgroundColor }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }], backgroundColor: thumbBackgroundColor }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 64,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)', // Stronger glass border to make it pop
    justifyContent: 'center',
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  }
});

export default CustomToggle;
