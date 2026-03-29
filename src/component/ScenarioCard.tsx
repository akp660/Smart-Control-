import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../resource/colors';

interface Props {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onPress?: () => void;
}

const ScenarioCard: React.FC<Props> = ({ title, subtitle, icon, isActive, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card, isActive && styles.activeCard]} onPress={onPress}>
      <View style={styles.top}>
        {icon}
        {isActive && <View style={styles.activeDot} />}
      </View>
      <View style={styles.bottom}>
        <Text style={[styles.title, isActive && styles.activeText]}>{title}</Text>
        <Text style={[styles.subtitle, isActive && styles.activeSubtitle]}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { height: 130, borderRadius: 32, backgroundColor: colors.glassOverlay, borderColor: colors.glassBorder, borderWidth: 1, padding: 18, justifyContent: 'space-between', marginRight: 12, width: 110 },
  activeCard: { backgroundColor: colors.glassOverlayLight, borderColor: 'rgba(255,255,255,0.25)' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bottom: {},
  title: { color: colors.textDim, fontSize: 13, fontWeight: '600', marginBottom: 2 },
  subtitle: { color: colors.textDim, fontSize: 11 },
  activeText: { color: colors.text },
  activeSubtitle: { color: colors.textDim },
  activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.text, marginTop: 4 }
});

export default ScenarioCard;
