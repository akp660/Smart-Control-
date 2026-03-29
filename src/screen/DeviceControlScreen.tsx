import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreVertical, ChevronDown } from 'lucide-react-native';
import { colors } from '../resource/colors';

const DeviceControlScreen = ({ navigation }: any) => {
  const [brightness, setBrightness] = useState(70);
  const [isLightOn, setIsLightOn] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.ambientGlow, isLightOn && { backgroundColor: 'rgba(252, 211, 77, 0.12)' }]} />
      <View style={styles.container}>
        
        {/* Physical light asset positioned in background */}
        <View style={{
          position: 'absolute',
          top: -30,
          right: -60,
          zIndex: 0,
          opacity: isLightOn ? 1 : 0.25
        }}>
          <Image 
            source={require('../resource/images/Light.png')} 
            style={{ width: 250, height: 250, resizeMode: 'contain' }} 
          />
        </View>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <ChevronLeft color={colors.textDim} size={24} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Lighting</Text>
            <View style={styles.subtitleRow}>
               <Text style={styles.subtitle}>Main lights</Text>
               <ChevronDown color={colors.textDim} size={14} style={{marginLeft: 4, marginTop: 2}} />
            </View>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <MoreVertical color={colors.textDim} size={24} />
          </TouchableOpacity>
        </View>

        {/* Color Wheel Glass Mockup */}
        <View style={styles.wheelContainer}>
           <View style={styles.wheelOuter}>
              <View style={styles.wheelInner}>
                 <Text style={styles.wheelText}>Select</Text>
                 <Text style={styles.wheelText}>color</Text>
              </View>
           </View>
        </View>

        {/* Brightness Slider Mockup */}
        <View style={styles.sliderSection}>
           <View style={styles.sliderHeader}>
             <Text style={styles.sliderLabel}>Brightness</Text>
             <Text style={styles.sliderValue}>{brightness}%</Text>
           </View>
           <View style={styles.sliderTrack}>
             <View style={[styles.sliderFill, { width: `${brightness}%` }]} />
             <View style={[styles.sliderThumb, { left: `${brightness}%` }]} />
           </View>
        </View>

        {/* Schedule */}
        <View style={styles.scheduleSection}>
           <Text style={styles.scheduleTitle}>Schedule</Text>
           <View style={styles.scheduleRow}>
              <View style={styles.scheduleCard}>
                 <Text style={styles.scheduleLabel}>ON</Text>
                 <View style={styles.timeRow}>
                    <Text style={styles.scheduleTime}>6:00 PM</Text>
                    <ChevronDown color={colors.textDim} size={14} />
                 </View>
              </View>
              <View style={styles.scheduleCard}>
                 <Text style={styles.scheduleLabel}>OFF</Text>
                 <View style={styles.timeRow}>
                    <Text style={styles.scheduleTime}>11:00 PM</Text>
                    <ChevronDown color={colors.textDim} size={14} />
                 </View>
              </View>
              <TouchableOpacity 
                 style={[styles.offToggle, isLightOn && { backgroundColor: 'rgba(252, 211, 77, 0.2)', borderColor: '#FCD34D' }]}
                 onPress={() => setIsLightOn(!isLightOn)}
              >
                 <Text style={[styles.offToggleText, isLightOn && { color: '#FCD34D' }]}>{isLightOn ? 'ON' : 'OFF'}</Text>
              </TouchableOpacity>
           </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  ambientGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2b1b3d', // Purple ambient glow for device control
    opacity: 0.5,
  },
  container: { flex: 1, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, marginTop: 0 },
  titleContainer: { alignItems: 'center' },
  title: { color: colors.text, fontSize: 20, fontWeight: '600' },
  subtitleRow: { flexDirection: 'row', alignItems: 'center' },
  subtitle: { color: colors.textDim, fontSize: 13, marginTop: 2 },
  iconButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.glassOverlay, borderWidth: 1, borderColor: colors.glassBorder, justifyContent: 'center', alignItems: 'center' },

  wheelContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  wheelOuter: { width: 260, height: 260, borderRadius: 130, borderWidth: 25, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center', 
    borderTopColor: '#ff0055', borderRightColor: '#ffff00', borderBottomColor: '#00ff00', borderLeftColor: '#0055ff'
  },
  wheelInner: { width: 140, height: 140, borderRadius: 70, backgroundColor: colors.glassOverlayLight, borderWidth: 1, borderColor: colors.glassBorder, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: {width: 0, height: 5} },
  wheelText: { color: colors.textDim, fontSize: 14, fontWeight: '500' },

  sliderSection: { marginBottom: 40 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  sliderLabel: { color: colors.textDim, fontSize: 16 },
  sliderValue: { color: colors.text, fontSize: 18, fontWeight: '500' },
  sliderTrack: { height: 8, backgroundColor: colors.glassOverlayLight, borderRadius: 4, justifyContent: 'center' },
  sliderFill: { height: 8, backgroundColor: '#eedd88', borderRadius: 4 },
  sliderThumb: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.background, borderWidth: 4, borderColor: '#eedd88', position: 'absolute', top: -10, marginLeft: -14 },

  scheduleSection: { marginBottom: 30 },
  scheduleTitle: { color: colors.text, fontSize: 18, fontWeight: '600', marginBottom: 16 },
  scheduleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  scheduleCard: { flex: 1, backgroundColor: colors.glassOverlay, paddingVertical: 16, paddingHorizontal: 16, borderRadius: 24, borderWidth: 1, borderColor: colors.glassBorder, alignItems: 'center' },
  scheduleLabel: { color: colors.textDim, fontSize: 12, marginBottom: 8 },
  timeRow: { flexDirection: 'row', alignItems: 'center' },
  scheduleTime: { color: colors.text, fontSize: 16, fontWeight: '500', marginRight: 4 },
  offToggle: { width: 65, height: 80, backgroundColor: colors.glassOverlayLight, borderWidth: 1, borderColor: colors.glassBorder, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  offToggleText: { color: colors.textDim, fontSize: 14, fontWeight: '500' }
});

export default DeviceControlScreen;
