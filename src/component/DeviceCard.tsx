import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../resource/colors';
import CustomToggle from './CustomToggle';

interface Props {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  isOn?: boolean;
  onToggle?: (val: boolean) => void;
  onPress?: () => void;
  style?: object;
  large?: boolean;
}

const DeviceCard: React.FC<Props> = ({ title, subtitle, icon, isOn, onToggle, onPress, style, large }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, large && styles.largeContainer, style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.topSection}>
        {icon}
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {onToggle !== undefined && isOn !== undefined && (
          <View style={styles.switchWrapper}>
            <CustomToggle isOn={isOn} onToggle={onToggle} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.glassOverlay,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: 36, // Heavy rounding for liquid feel
    padding: 24,
    justifyContent: 'space-between',
    minHeight: 160,
    flex: 1,
    margin: 6,
  },
  largeContainer: {
    minHeight: 180,
  },
  topSection: {
    alignItems: 'flex-start',
  },
  bottomSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  textContainer: {
    width: '100%',
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: colors.textDim,
    fontSize: 14,
  },
  switchWrapper: {
    alignSelf: 'flex-end',
  }
});

export default DeviceCard;
