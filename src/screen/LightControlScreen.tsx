import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Settings, Sun, Moon, Coffee, Zap, Lightbulb } from 'lucide-react-native';
import { colors } from '../resource/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const LightControlScreen = ({ navigation }: any) => {
  const [brightness, setBrightness] = useState(75);
  const [isLightOn, setIsLightOn] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState('Reading');

  const presets = [
    { id: 'Reading', name: 'Reading', icon: <Coffee color={colors.text} size={20} />, color: '#FFE4B5' },
    { id: 'Night', name: 'Night', icon: <Moon color={colors.text} size={20} />, color: '#7B68EE' },
    { id: 'Relax', name: 'Relax', icon: <Sun color={colors.text} size={20} />, color: '#F08080' },
    { id: 'Vibrant', name: 'Vibrant', icon: <Zap color={colors.text} size={20} />, color: '#00FA9A' }
  ];

  const handleSliderPress = (event: any) => {
    const { locationX } = event.nativeEvent;
    const sliderWidth = SCREEN_WIDTH - 80;
    let nextVal = Math.round((locationX / sliderWidth) * 100);
    nextVal = Math.max(0, Math.min(100, nextVal));
    setBrightness(nextVal);
  };

  const getLightColor = () => {
    if (!isLightOn) return '#333';
    const activePreset = presets.find(p => p.id === selectedPreset);
    return activePreset ? activePreset.color : '#FCD34D';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.ambientGlow, isLightOn && { backgroundColor: getLightColor(), opacity: 0.15 }]} />
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <ChevronLeft color={colors.textDim} size={24} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Lighting</Text>
            <Text style={styles.subtitle}>Living Room</Text>
          </View>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('LightSettings')}>
            <Settings color={colors.textDim} size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Light bulb Illustration */}
          <View style={styles.bulbContainer}>
             <View style={[styles.bulbGlow, { backgroundColor: getLightColor(), shadowColor: getLightColor() }]} />
             <Lightbulb color={getLightColor()} size={140} strokeWidth={1.5} />
             {isLightOn && <View style={[styles.lightBeam, { backgroundColor: getLightColor() }]} />}
          </View>

          {/* Power Toggle */}
          <View style={styles.powerSection}>
             <TouchableOpacity 
                activeOpacity={0.8}
                style={[styles.powerButton, isLightOn && { backgroundColor: getLightColor(), borderColor: getLightColor() }]}
                onPress={() => setIsLightOn(!isLightOn)}
             >
                <Text style={[styles.powerText, isLightOn && { color: colors.black }]}>
                   {isLightOn ? 'SWITCH ON' : 'SWITCH OFF'}
                </Text>
             </TouchableOpacity>
          </View>

          {/* Brightness Slider */}
          <View style={styles.sliderSection}>
             <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>Brightness Intensity</Text>
                <Text style={styles.sliderValue}>{brightness}%</Text>
             </View>
             <TouchableOpacity activeOpacity={1} style={styles.sliderArea} onPress={handleSliderPress}>
                <View style={styles.sliderTrack}>
                   <View style={[styles.sliderFill, { width: `${brightness}%`, backgroundColor: getLightColor() }]} />
                   <View style={[styles.sliderThumb, { left: `${brightness}%`, borderColor: getLightColor() }]} />
                </View>
             </TouchableOpacity>
          </View>

          {/* Presets */}
          <View style={styles.presetsSection}>
             <Text style={styles.sectionTitle}>Preset Scenarios</Text>
             <View style={styles.presetsGrid}>
                {presets.map((preset) => (
                   <TouchableOpacity 
                      key={preset.id}
                      style={[
                         styles.presetCard, 
                         selectedPreset === preset.id && { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: preset.color }
                      ]}
                      onPress={() => {
                        setSelectedPreset(preset.id);
                        if (!isLightOn) setIsLightOn(true);
                      }}
                   >
                      <View style={[styles.presetIconContainer, { backgroundColor: preset.color + '20' }]}>
                         {preset.icon}
                      </View>
                      <Text style={[styles.presetName, selectedPreset === preset.id && { color: preset.color }]}>
                         {preset.name}
                      </Text>
                   </TouchableOpacity>
                ))}
             </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  ambientGlow: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  container: { flex: 1, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  titleContainer: { alignItems: 'center' },
  title: { color: colors.text, fontSize: 20, fontWeight: '600' },
  subtitle: { color: colors.textDim, fontSize: 13, marginTop: 2 },
  iconButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.glassOverlay, borderWidth: 1, borderColor: colors.glassBorder, justifyContent: 'center', alignItems: 'center' },
  
  scrollContent: { paddingBottom: 40, alignItems: 'center' },

  bulbContainer: { height: 260, justifyContent: 'center', alignItems: 'center', marginBottom: 20, width: '100%', position: 'relative' },
  bulbGlow: { position: 'absolute', width: 100, height: 100, borderRadius: 50, opacity: 0.3, shadowOpacity: 0.8, shadowRadius: 40 },
  lightBeam: { position: 'absolute', bottom: 0, width: 2, height: 40, opacity: 0.5 },

  powerSection: { marginBottom: 40 },
  powerButton: { paddingHorizontal: 40, paddingVertical: 18, borderRadius: 36, backgroundColor: colors.glassOverlay, borderWidth: 1, borderColor: colors.glassBorder },
  powerText: { color: colors.text, fontSize: 14, fontWeight: '800', letterSpacing: 1.5 },

  sliderSection: { width: '100%', marginBottom: 40 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  sliderLabel: { color: colors.textDim, fontSize: 15, fontWeight: '500' },
  sliderValue: { color: colors.text, fontSize: 18, fontWeight: '700' },
  sliderArea: { height: 30, justifyContent: 'center' },
  sliderTrack: { height: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 4, position: 'relative' },
  sliderFill: { height: 8, borderRadius: 4 },
  sliderThumb: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.background, borderWidth: 4, position: 'absolute', top: -10, marginLeft: -14 },

  presetsSection: { width: '100%' },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '600', marginBottom: 16 },
  presetsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  presetCard: { width: '48%', backgroundColor: colors.glassOverlay, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: colors.glassBorder, alignItems: 'center', flexGrow: 1 },
  presetIconContainer: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  presetName: { color: colors.textDim, fontSize: 14, fontWeight: '600' }
});

export default LightControlScreen;
