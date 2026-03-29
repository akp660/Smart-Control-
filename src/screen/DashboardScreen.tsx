import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sofa, Bed, CookingPot, Car, Plus, Bell, User, Sun, CloudRain, Zap, Wind, Lightbulb, Tv, Fan, Monitor, Coffee, Lock } from 'lucide-react-native';
import { colors } from '../resource/colors';
import { DeviceCard } from '../component';

const DashboardScreen = ({ navigation }: any) => {
  const [selectedRoomId, setSelectedRoomId] = useState(1);
  const [greeting, setGreeting] = useState('Good Morning');

  // Unified state for all devices in all rooms
  const [deviceStates, setDeviceStates] = useState({
    living_ac: true,
    living_tv: false,
    living_fan: true,
    living_lights: true,
    bedroom_ac: false,
    bedroom_lights: true,
    bedroom_fan: false,
    kitchen_oven: false,
    kitchen_lights: true,
    kitchen_coffee: true,
    kitchen_fridge: true,
    garage_lights: false,
    garage_door: false
  });

  const toggleDevice = (key: keyof typeof deviceStates) => {
    setDeviceStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const rooms = [
    { id: 1, name: 'Living Room', count: 4, icon: <Sofa color={selectedRoomId === 1 ? colors.black : "#60A5FA"} size={26} />, color: '#60A5FA' },
    { id: 2, name: 'Bedroom', count: 3, icon: <Bed color={selectedRoomId === 2 ? colors.black : "#F87171"} size={26} />, color: '#F87171' },
    { id: 3, name: 'Kitchen', count: 5, icon: <CookingPot color={selectedRoomId === 3 ? colors.black : "#34D399"} size={26} />, color: '#34D399' },
    { id: 4, name: 'Garage', count: 2, icon: <Car color={selectedRoomId === 4 ? colors.black : "#FCD34D"} size={26} />, color: '#FCD34D' }
  ];

  const getDevicesForRoom = () => {
    switch(selectedRoomId) {
      case 2: // Bedroom
        return [
          { title: 'Conditioning', sub: 'Bedroom', icon: <Wind color="#60A5FA" size={24} />, isOn: deviceStates.bedroom_ac, onToggle: () => toggleDevice('bedroom_ac'), fullWidth: true },
          { title: 'Add device', icon: <Plus color={colors.textDim} size={24} />, sub: '', isAdd: true },
          { title: 'Bed Lights', sub: '2 units', icon: <Lightbulb color="#FCD34D" size={24} />, isOn: deviceStates.bedroom_lights, onToggle: () => toggleDevice('bedroom_lights') }
        ];
      case 3: // Kitchen
        return [
          { title: 'Coffee Maker', sub: '1 unit', icon: <Coffee color="#60A5FA" size={24} />, isOn: deviceStates.kitchen_coffee, onToggle: () => toggleDevice('kitchen_coffee'), fullWidth: true },
          { title: 'Oven', sub: 'Smart Oven', icon: <Zap color="#F87171" size={24} />, isOn: deviceStates.kitchen_oven, onToggle: () => toggleDevice('kitchen_oven') },
          { title: 'Lighting', sub: '3 units', icon: <Lightbulb color="#FCD34D" size={24} />, isOn: deviceStates.kitchen_lights, onToggle: () => toggleDevice('kitchen_lights') }
        ];
      default: // Living Room (1)
        return [
          { title: 'Conditioning', sub: '4 rooms', icon: <Wind color="#60A5FA" size={24} />, isOn: deviceStates.living_ac, onToggle: () => toggleDevice('living_ac'), fullWidth: true },
          { title: 'TV Unit', sub: 'Smart TV', icon: <Tv color="#60A5FA" size={24} />, isOn: deviceStates.living_tv, onToggle: () => toggleDevice('living_tv'), onPress: () => navigation.navigate('TvControl') },
          { title: 'Main Lights', sub: '4 units', icon: <Lightbulb color="#FCD34D" size={24} />, isOn: deviceStates.living_lights, onToggle: () => toggleDevice('living_lights'), onPress: () => navigation.navigate('LightControl') }
        ];
    }
  };

  const currentDevices = getDevicesForRoom();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.ambientGlow} />
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header Hub */}
        <View style={styles.headerHub}>
           <View style={styles.headerLeft}>
              <Text style={styles.greetingText}>{greeting}, Martha!</Text>
              <View style={styles.weatherRow}>
                 <Sun color="#FCD34D" size={18} />
                 <Text style={styles.weatherText}>24°C Sunny</Text>
              </View>
           </View>
           <View style={styles.headerRight}>
              {/* Energy display removed */}
           </View>
        </View>

        {/* Room Selection Slider */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>My Rooms</Text>
           <TouchableOpacity><Plus color={colors.textDim} size={20} /></TouchableOpacity>
        </View>
        
        <ScrollView 
           horizontal 
           showsHorizontalScrollIndicator={false} 
           style={styles.roomSlider}
           contentContainerStyle={styles.roomSliderContent}
        >
          {rooms.map(room => (
            <TouchableOpacity 
              key={room.id}
              activeOpacity={0.9}
              onPress={() => setSelectedRoomId(room.id)}
              style={[
                styles.roomCard, 
                selectedRoomId === room.id ? { backgroundColor: room.color, shadowColor: room.color } : { backgroundColor: colors.glassOverlay }
              ]}
            >
              <View style={[styles.roomIconBox, selectedRoomId === room.id && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                {room.icon}
              </View>
              <View style={styles.roomInfo}>
                 <Text style={[styles.roomName, selectedRoomId === room.id && { color: colors.black }]}>{room.name}</Text>
                 <Text style={[styles.roomCount, selectedRoomId === room.id && { color: 'rgba(0,0,0,0.6)' }]}>{room.count} devices</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Dynamic Device Grid */}
        <Text style={styles.sectionTitle}>Devices Explorer</Text>
        <View style={styles.deviceExplorer}>
           {/* Filtering for full width top card */}
           {currentDevices.filter((d: any) => d.fullWidth).map((dev: any, idx) => (
              <DeviceCard 
                 key={idx}
                 title={dev.title}
                 subtitle={dev.sub}
                 icon={dev.icon}
                 isOn={dev.isOn}
                 onToggle={dev.onToggle}
                 onPress={dev.onPress}
                 style={styles.fullWidthCard}
              />
           ))}

           <View style={styles.masonryGrid}>
              <View style={styles.column}>
                 {currentDevices.filter((d: any) => !d.fullWidth && d.isAdd).map((dev: any, idx) => (
                    <DeviceCard key={idx} title={dev.title} icon={dev.icon} style={styles.addDeviceCard} />
                 ))}
                 {currentDevices.filter((d: any) => !d.fullWidth && !d.isAdd).slice(0, 1).map((dev: any, idx) => (
                    <DeviceCard key={idx} title={dev.title} subtitle={dev.sub} icon={dev.icon} isOn={dev.isOn} onToggle={dev.onToggle} onPress={dev.onPress} />
                 ))}
              </View>
              <View style={styles.column}>
                 {currentDevices.filter((d: any) => !d.fullWidth && !d.isAdd).slice(1).map((dev: any, idx) => (
                    <DeviceCard key={idx} title={dev.title} subtitle={dev.sub} icon={dev.icon} isOn={dev.isOn} onToggle={dev.onToggle} onPress={dev.onPress} large />
                 ))}
              </View>
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  ambientGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1E1B2A',
    opacity: 0.6,
  },
  content: { padding: 24, paddingBottom: 120 },
  
  headerHub: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 35 },
  greetingText: { color: colors.text, fontSize: 28, fontWeight: '700' },
  weatherRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  weatherText: { color: colors.textDim, fontSize: 15, marginLeft: 8 },
  headerRight: { paddingTop: 6 },
  headerLeft: { flex: 1 },
  energyLabel: { color: colors.textDim, fontSize: 12 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: '600' },
  
  roomSlider: { marginHorizontal: -24 },
  roomSliderContent: { paddingHorizontal: 24, paddingBottom: 15 },
  roomCard: { 
     width: 145, 
     height: 175, 
     borderRadius: 36, 
     padding: 20, 
     marginRight: 16,
     justifyContent: 'space-between',
     borderWidth: 1,
     borderColor: colors.glassBorder,
     // Soft glow for active card
     shadowOffset: { width: 0, height: 10 },
     shadowOpacity: 0.3,
     shadowRadius: 15,
  },
  roomIconBox: { 
     width: 48, 
     height: 48, 
     borderRadius: 18, 
     backgroundColor: 'rgba(255,255,255,0.05)', 
     justifyContent: 'center', 
     alignItems: 'center' 
  },
  roomInfo: {},
  roomName: { color: colors.text, fontWeight: '700', fontSize: 16, marginBottom: 4 },
  roomCount: { color: colors.textDim, fontSize: 12 },

  deviceExplorer: { marginTop: 15 },
  fullWidthCard: { marginBottom: 12, minHeight: 120 },
  masonryGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  column: { flex: 1, marginHorizontal: 4 },
  addDeviceCard: { 
     minHeight: 100, 
     backgroundColor: 'rgba(255,255,255,0.02)', 
     borderStyle: 'dashed', 
     borderWidth: 1.5, 
     borderColor: 'rgba(255,255,255,0.2)',
     marginBottom: 12
  }
});

export default DashboardScreen;
