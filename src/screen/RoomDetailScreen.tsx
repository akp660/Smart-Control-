import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Settings, Thermometer, Droplets, Wind, Tv, Lightbulb, Music, Power, Plus, Lock, Fan, Monitor, Coffee, Sun, BookOpen } from 'lucide-react-native';
import { colors } from '../resource/colors';
import { DeviceCard, ScenarioCard } from '../component';

const RoomDetailScreen = ({ navigation, route }: any) => {
  const { roomName = 'Bedroom', isLightMode = false } = route.params || {};
  
  // States for Scenarios (isLightMode: true)
  const [isMasterLightOn, setIsMasterLightOn] = useState(true);
  const [activeScenario, setActiveScenario] = useState('Movie night');

  // States for Room Devices (isLightMode: false)
  const [deviceStates, setDeviceStates] = useState({
    lights: true,
    ac: true,
    fan: false,
    tv: false,
    oven: false,
    coffee: false,
    music: false,
  });

  const toggleDevice = (key: keyof typeof deviceStates) => {
    setDeviceStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getScenarioColor = () => {
    if (!isMasterLightOn) return 'transparent';
    switch (activeScenario) {
      case 'Movie night': return 'rgba(255, 244, 229, 0.25)'; // Warm white
      case 'Morning': return 'rgba(255, 255, 255, 0.25)';     // Pure white
      case 'Reading': return 'rgba(255, 255, 180, 0.25)';     // Soft yellow
      default: return 'rgba(252, 211, 77, 0.12)';
    }
  };

  const ambientColor = isLightMode ? getScenarioColor() : (deviceStates.lights ? 'rgba(252, 211, 77, 0.08)' : 'transparent');

  const getRoomDevices = () => {
    switch(roomName) {
      case 'Kitchen':
        return {
          main: { title: 'Oven', sub: 'Smart Cooking', icon: <Power color="#F87171" size={28} />, state: deviceStates.oven, setter: () => toggleDevice('oven') },
          left: [
            { title: 'Add device', icon: <Plus color={colors.textDim} size={28} />, style: styles.addCard },
            { title: 'Coffee Maker', sub: '1 unit', icon: <Coffee color="#60A5FA" size={28} />, state: deviceStates.coffee, setter: () => toggleDevice('coffee') }
          ]
        };
      case 'Bedroom':
        return {
          main: { title: 'Conditioning', sub: 'Bedroom', icon: <Wind color="#60A5FA" size={28} />, state: deviceStates.ac, setter: () => toggleDevice('ac') },
          left: [
            { title: 'Add device', icon: <Plus color={colors.textDim} size={28} />, style: styles.addCard },
            { title: 'Music', sub: 'Audio system', icon: <Music color="#A78BFA" size={28} />, state: deviceStates.music, setter: () => toggleDevice('music') }
          ]
        };
      default: // Living Room
        return {
          main: { title: 'Conditioning', sub: 'Living Room', icon: <Wind color="#60A5FA" size={28} />, state: deviceStates.ac, setter: () => toggleDevice('ac'), onPress: undefined },
          left: [
            { title: 'TV Unit', sub: 'Smart TV', icon: <Tv color="#60A5FA" size={28} />, state: deviceStates.tv, setter: () => toggleDevice('tv'), onPress: () => navigation.navigate('TvControl') },
            { title: 'Fan', sub: 'High Speed', icon: <Fan color="#34D399" size={28} />, state: deviceStates.fan, setter: () => toggleDevice('fan') }
          ]
        };
    }
  };

  const roomData = getRoomDevices();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.ambientGlow, { backgroundColor: ambientColor }]} />
      
      <View style={styles.container}>
        {/* Header (Shared) */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <ChevronLeft color={colors.textDim} size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>{isLightMode ? 'Light(Main)' : roomName}</Text>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate(isLightMode ? 'LightSettings' : 'DeviceControl')}>
            <Settings color={colors.textDim} size={24} />
          </TouchableOpacity>
        </View>

        {isLightMode ? (
          /* LIGHT MODE: SCENARIOS (From Home Screen) */
          <>
            <View style={{ position: 'absolute', top: 40, right: -70, zIndex: 0, opacity: isMasterLightOn ? 1 : 0.25, alignItems: 'center', justifyContent: 'center' }}>
              {isMasterLightOn && (
                <View style={{ position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: ambientColor, opacity: 0.6, zIndex: -1 }} />
              )}
              <Image source={require('../resource/images/Light.png')} style={{ width: 400, height: 400, resizeMode: 'contain' }} />
            </View>

            <View style={styles.sensorRowColumn}>
              <View style={styles.sensorTag}>
                <Thermometer color={colors.textDim} size={14} /><Text style={styles.sensorText}>22°C</Text>
              </View>
              <View style={styles.sensorTag}>
                <Droplets color={colors.textDim} size={14} /><Text style={styles.sensorText}>45%</Text>
              </View>
              <View style={styles.sensorTag}>
                <Wind color={colors.textDim} size={14} /><Text style={styles.sensorText}>83%</Text>
              </View>
            </View>

            <View style={{ flex: 1 }} />

            <Text style={styles.sectionTitle}>Scenarios</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scenariosContainer}>
              <ScenarioCard title="Movie night" subtitle="Lights + TV" icon={<Tv color={activeScenario === 'Movie night' ? colors.text : colors.textDim} size={24} />} isActive={activeScenario === 'Movie night'} onPress={() => setActiveScenario('Movie night')} />
              <ScenarioCard title="Morning" subtitle="Lights + Audio" icon={<Sun color={activeScenario === 'Morning' ? colors.text : colors.textDim} size={24} />} isActive={activeScenario === 'Morning'} onPress={() => setActiveScenario('Morning')} />
              <ScenarioCard title="Reading" subtitle="Lights" icon={<BookOpen color={activeScenario === 'Reading' ? colors.text : colors.textDim} size={24} />} isActive={activeScenario === 'Reading'} onPress={() => setActiveScenario('Reading')} />
            </ScrollView>

            <TouchableOpacity style={[styles.actionButton, isMasterLightOn && { backgroundColor: 'rgba(252, 211, 77, 0.15)', borderColor: '#FCD34D' }]} onPress={() => setIsMasterLightOn(!isMasterLightOn)}>
              <View style={[styles.actionIconWrapper, isMasterLightOn && { backgroundColor: '#FCD34D' }]}><Lightbulb color={colors.black} size={20} /></View>
              <Text style={[styles.actionText, isMasterLightOn && { color: '#FCD34D' }]}>{isMasterLightOn ? 'Turn off bedroom lighting   › › ›' : 'Turn on bedroom lighting   › › ›'}</Text>
            </TouchableOpacity>
          </>
        ) : (
          /* ROOM MODE: DEVICE GRID (From Dashboard) */
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.sensorRow}>
              <View style={styles.sensorTag}>
                <Thermometer color={colors.textDim} size={14} /><Text style={styles.sensorText}>22°C</Text>
              </View>
              <View style={styles.sensorTag}>
                <Droplets color={colors.textDim} size={14} /><Text style={styles.sensorText}>45%</Text>
              </View>
            </View>

            <DeviceCard title={roomData.main.title} subtitle={roomData.main.sub} icon={roomData.main.icon} isOn={roomData.main.state} onToggle={roomData.main.setter} style={styles.acCard} onPress={(roomData.main as any).onPress} />

            <View style={styles.grid}>
              <View style={styles.columnLeft}>
                {roomData.left.map((dev: any, idx) => (
                  <DeviceCard key={idx} title={dev.title} subtitle={dev.sub} icon={dev.icon} isOn={dev.state} onToggle={dev.setter} style={dev.style} onPress={dev.onPress} />
                ))}
              </View>
              <View style={styles.columnRight}>
                <DeviceCard title="Lighting" subtitle="Main lights" icon={<View style={{ width: '100%', position: 'relative', height: 120 }}><Lightbulb color={deviceStates.lights ? "#FCD34D" : colors.textDim} size={28} style={{ position: 'relative', zIndex: 2 }} /><View style={{ position: 'absolute', top: -25, right: -70, alignItems: 'center', justifyContent: 'center', zIndex: 1 }}><Image source={require('../resource/images/Light.png')} style={{ width: 220, height: 220, resizeMode: 'contain', opacity: deviceStates.lights ? 1 : 0.25 }} /></View></View>} isOn={deviceStates.lights} onToggle={() => toggleDevice('lights')} large style={deviceStates.lights ? { backgroundColor: 'rgba(252, 211, 77, 0.12)', borderColor: 'rgba(252, 211, 77, 0.3)' } : undefined} onPress={() => navigation.navigate('LightControl')} />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  ambientGlow: { ...StyleSheet.absoluteFillObject, backgroundColor: '#14213d', opacity: 0.5 },
  container: { flex: 1, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, marginTop: 0 },
  title: { color: colors.text, fontSize: 20, fontWeight: '600' },
  iconButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.glassOverlay, borderWidth: 1, borderColor: colors.glassBorder, justifyContent: 'center', alignItems: 'center' },
  
  sensorRowColumn: { gap: 12, alignItems: 'flex-start' },
  sensorRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  sensorTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.glassOverlay, borderWidth: 1, borderColor: colors.glassBorder, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, marginBottom: 12 },
  sensorText: { color: colors.textDim, fontSize: 13, marginLeft: 8 },
  
  sectionTitle: { color: colors.text, fontSize: 22, fontWeight: '600', marginBottom: 20 },
  scenariosContainer: { maxHeight: 150, marginBottom: 24, marginHorizontal: -24, paddingHorizontal: 24 },
  
  actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.glassOverlayLight, borderWidth: 1, borderColor: colors.glassBorder, borderRadius: 36, padding: 8, marginTop: 10 },
  actionIconWrapper: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.text, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  actionText: { color: colors.text, fontSize: 16, fontWeight: '500' },
  
  scrollContent: { paddingBottom: 100 },
  acCard: { marginBottom: 16, minHeight: 140 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  columnLeft: { flex: 1, marginRight: 6 },
  columnRight: { flex: 1, marginLeft: 6 },
  addCard: { minHeight: 120, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'dashed', marginBottom: 16 }
});

export default RoomDetailScreen;
