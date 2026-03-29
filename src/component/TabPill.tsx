import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../resource/colors';

interface Props {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const TabPill: React.FC<Props> = ({ title, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.pill, isActive && styles.activePill]} 
    onPress={onPress}
  >
    <Text style={[styles.text, isActive && styles.activeText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  activePill: {
    backgroundColor: colors.glassOverlayLight,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  text: {
    color: colors.textDim,
    fontSize: 15,
  },
  activeText: {
    color: colors.text,
    fontWeight: '600',
  }
});

export default TabPill;
