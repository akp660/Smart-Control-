import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Clock, Thermometer, ShieldCheck, Timer } from 'lucide-react-native';
import { colors } from '../resource/colors';

const LightSettingsScreen = ({ navigation }: any) => {
  const [temperature, setTemperature] = useState(40);
  const [isScheduleEnabled, setIsScheduleEnabled] = useState(true);
  const [isMotionEnabled, setIsMotionEnabled] = useState(false);
  const [isSafeMode, setIsSafeMode] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <ChevronLeft color={colors.textDim} size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Light Settings</Text>
          <View style={{ width: 50 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.sectionTitle}>Automation & Schedule</Text>
          <View style={styles.settingsGroup}>
             <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                   <View style={[styles.iconBox, { backgroundColor: '#60A5FA20' }]}>
                      <Clock color="#60A5FA" size={20} />
                   </View>
                   <View>
                      <Text style={styles.settingLabel}>Daily Schedule</Text>
                      <Text style={styles.settingDesc}>6:00 PM - 11:00 PM</Text>
                   </View>
                </View>
                <Switch 
                   value={isScheduleEnabled} 
                   onValueChange={setIsScheduleEnabled}
                   trackColor={{ false: '#333', true: '#60A5FA' }}
                   thumbColor="#fff"
                />
             </View>

             <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                   <View style={[styles.iconBox, { backgroundColor: '#F472B620' }]}>
                      <Timer color="#F472B6" size={20} />
                   </View>
                   <View>
                      <Text style={styles.settingLabel}>Motion Trigger</Text>
                      <Text style={styles.settingDesc}>Turn on when motion detected</Text>
                   </View>
                </View>
                <Switch 
                   value={isMotionEnabled} 
                   onValueChange={setIsMotionEnabled}
                   trackColor={{ false: '#333', true: '#F472B6' }}
                   thumbColor="#fff"
                />
             </View>
          </View>

          <Text style={styles.sectionTitle}>Advanced Customization</Text>
          <View style={styles.settingsGroup}>
             <View style={styles.sliderGroup}>
                <View style={styles.sliderHeader}>
                   <View style={styles.labelRow}>
                      <Thermometer color={colors.textDim} size={18} />
                      <Text style={styles.settingLabel}>Color Temperature</Text>
                   </View>
                   <Text style={[styles.tempValue, { color: temperature > 50 ? '#FFD700' : '#87CEEB' }]}>
                      {temperature}% {temperature > 50 ? 'Warm' : 'Cool'}
                   </Text>
                </View>
                <View style={styles.tempTrack}>
                   <View style={[styles.tempGradient, { left: 0, right: 0 }]} />
                   <View style={[styles.sliderThumb, { left: `${temperature}%` }]} />
                </View>
                <View style={styles.tempLabels}>
                   <Text style={styles.tempLabel}>Cool</Text>
                   <TouchableOpacity 
                      style={styles.touchArea} 
                      onPress={(e) => {
                        const { locationX } = e.nativeEvent;
                        setTemperature(Math.round((locationX / 300) * 100));
                      }} 
                   />
                   <Text style={styles.tempLabel}>Warm</Text>
                </View>
             </View>

             <View style={[styles.settingRow, { marginTop: 20 }]}>
                <View style={styles.settingInfo}>
                   <View style={[styles.iconBox, { backgroundColor: '#34D39920' }]}>
                      <ShieldCheck color="#34D399" size={20} />
                   </View>
                   <View>
                      <Text style={styles.settingLabel}>Presence Simulation</Text>
                      <Text style={styles.settingDesc}>Randomize lights when away</Text>
                   </View>
                </View>
                <Switch 
                   value={isSafeMode} 
                   onValueChange={setIsSafeMode}
                   trackColor={{ false: '#333', true: '#34D399' }}
                   thumbColor="#fff"
                />
             </View>
          </View>

          <TouchableOpacity style={styles.resetButton}>
             <Text style={styles.resetText}>Reset to Default Settings</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  title: { color: colors.text, fontSize: 20, fontWeight: '600' },
  iconButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.glassOverlay, borderWidth: 1, borderColor: colors.glassBorder, justifyContent: 'center', alignItems: 'center' },
  
  scrollContent: { paddingBottom: 40 },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 16, marginTop: 10, opacity: 0.8 },

  settingsGroup: { backgroundColor: colors.glassOverlay, borderRadius: 28, padding: 20, borderWidth: 1, borderColor: colors.glassBorder, marginBottom: 30 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  settingInfo: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  settingLabel: { color: colors.text, fontSize: 16, fontWeight: '600' },
  settingDesc: { color: colors.textDim, fontSize: 13, marginTop: 2 },

  sliderGroup: { paddingVertical: 10 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tempValue: { fontSize: 14, fontWeight: '700' },
  tempTrack: { height: 10, borderRadius: 5, backgroundColor: '#333', position: 'relative', overflow: 'hidden' },
  tempGradient: { position: 'absolute', height: '100%', backgroundColor: 'transparent', 
    // Simplified gradient mockup
    borderLeftWidth: 150, borderRightWidth: 150, borderLeftColor: '#87CEEB', borderRightColor: '#FFD700' 
  },
  sliderThumb: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#fff', position: 'absolute', top: -9, marginLeft: -14, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 5 },
  tempLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  tempLabel: { color: colors.textDim, fontSize: 12, fontWeight: '500' },
  touchArea: { position: 'absolute', width: '100%', height: 40, top: -30 },

  resetButton: { width: '100%', paddingVertical: 18, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)', alignItems: 'center', marginTop: 10 },
  resetText: { color: '#EF4444', fontSize: 15, fontWeight: '600' }
});

export default LightSettingsScreen;
