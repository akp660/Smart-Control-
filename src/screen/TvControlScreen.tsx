import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Settings, Tv, Thermometer, Droplets, Volume2, Power } from 'lucide-react-native';
import { colors } from '../resource/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TvControlScreen = ({ navigation }: any) => {
  const [volume, setVolume] = useState(45);
  const [isTvOn, setIsTvOn] = useState(true);
  
  // Animation values
  const screenScale = useRef(new Animated.Value(1)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(1)).current;
  const scanlineY = useRef(new Animated.Value(0)).current;

  // TV Toggle with Cool Effect
  const toggleTv = () => {
    const nextState = !isTvOn;
    
    if (nextState) {
      // Turn ON Effect
      setIsTvOn(true);
      Animated.parallel([
        Animated.timing(screenScale, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(screenOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(glowOpacity, { toValue: 1, duration: 600, useNativeDriver: true })
      ]).start();
      
      startScanline();
    } else {
      // Turn OFF Effect - Like an old CRT monitor
      Animated.sequence([
        Animated.parallel([
           Animated.timing(screenScale, { toValue: 1.05, duration: 100, useNativeDriver: true }),
           Animated.timing(glowOpacity, { toValue: 0.3, duration: 100, useNativeDriver: true })
        ]),
        Animated.parallel([
           Animated.timing(screenScale, { toValue: 0.001, duration: 300, useNativeDriver: true }),
           Animated.timing(screenOpacity, { toValue: 0, duration: 250, useNativeDriver: true })
        ])
      ]).start(() => setIsTvOn(false));
    }
  };

  const startScanline = () => {
     scanlineY.setValue(0);
     Animated.loop(
        Animated.timing(scanlineY, {
           toValue: 1,
           duration: 1800,
           useNativeDriver: true
        })
     ).start();
  };

  useEffect(() => {
     if (isTvOn) startScanline();
  }, []);

  // Custom Slider Interaction
  const sliderWidth = SCREEN_WIDTH - 88; // 24 padding each side + some extra
  const handleSliderPress = (event: any) => {
     const { locationX } = event.nativeEvent;
     let nextVol = Math.round((locationX / sliderWidth) * 100);
     nextVol = Math.max(0, Math.min(100, nextVol));
     setVolume(nextVol);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.ambientGlow, isTvOn && { backgroundColor: 'rgba(96, 165, 250, 0.12)' }]} />
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <ChevronLeft color={colors.textDim} size={24} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>TV Unit</Text>
            <Text style={styles.subtitle}>Living Room</Text>
          </View>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('TvRemote')}>
            <Settings color={colors.textDim} size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60, alignItems: 'center' }}>
           {/* Room Stats */}
           <View style={styles.statsRow}>
              <View style={styles.statTag}>
                 <Thermometer color="#60A5FA" size={16} />
                 <Text style={styles.statValue}>22°C</Text>
              </View>
              <View style={styles.statTag}>
                 <Droplets color="#60A5FA" size={16} />
                 <Text style={styles.statValue}>45%</Text>
              </View>
           </View>

           {/* TV Illustration Frame */}
           <View style={styles.tvIllustrationContainer}>
              <Animated.View style={[
                 styles.tvFrame, 
                 !isTvOn && styles.tvFrameOff,
                 { opacity: glowOpacity, transform: [{ scale: screenScale }] }
              ]}>
                 {isTvOn ? (
                    <Animated.View style={[styles.tvScreenContent, { opacity: screenOpacity }]}>
                       {/* Animated Scanline Effect */}
                       <Animated.View style={[
                          styles.scanline, 
                          { transform: [{ translateY: scanlineY.interpolate({ inputRange: [0, 1], outputRange: [0, 150] }) }] }
                       ]} />
                       <Tv color="rgba(255,255,255,0.1)" size={90} style={{ position: 'absolute' }} />
                       <Text style={styles.nowPlaying}>SMART HUB ACTIVE</Text>
                    </Animated.View>
                 ) : (
                    <View style={styles.tvScreenOff} />
                 )}
              </Animated.View>
           </View>

           {/* Redesigned Circular Power Button */}
           <View style={styles.powerSection}>
              <TouchableOpacity 
                 activeOpacity={0.7}
                 style={[styles.powerCircle, isTvOn && styles.powerCircleOn]}
                 onPress={toggleTv}
              >
                 <Power color={isTvOn ? colors.black : colors.text} size={32} strokeWidth={2.5} />
              </TouchableOpacity>
              <Text style={styles.powerLabel}>{isTvOn ? 'POWER ON' : 'POWER OFF'}</Text>
           </View>

           {/* Interactive Volume Slider */}
           <View style={styles.sliderSection}>
              <View style={styles.sliderHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                   <Volume2 color={colors.textDim} size={20} style={{ marginRight: 10 }} />
                   <Text style={styles.sliderLabel}>Volume</Text>
                </View>
                <Text style={styles.sliderValue}>{volume}%</Text>
              </View>
              
              <TouchableOpacity 
                 activeOpacity={1} 
                 style={styles.sliderTouchableArea} 
                 onPress={handleSliderPress}
              >
                 <View style={styles.sliderTrack}>
                   <View style={[styles.sliderFill, { width: `${volume}%` }]} />
                   <View style={[styles.sliderThumb, { left: `${volume}%` }]} />
                 </View>
              </TouchableOpacity>
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
    backgroundColor: '#1A1A2E',
    opacity: 0.6,
  },
  container: { flex: 1, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, width: '100%' },
  titleContainer: { alignItems: 'center' },
  title: { color: colors.text, fontSize: 20, fontWeight: '600' },
  subtitle: { color: colors.textDim, fontSize: 13, marginTop: 2 },
  iconButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.glassOverlay, borderWidth: 1, borderColor: colors.glassBorder, justifyContent: 'center', alignItems: 'center' },

  statsRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 30 },
  statTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.glassOverlay, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: colors.glassBorder },
  statValue: { color: colors.text, fontSize: 14, fontWeight: '600', marginLeft: 8 },

  tvIllustrationContainer: { height: 220, justifyContent: 'center', alignItems: 'center', marginBottom: 35, width: '100%' },
  tvFrame: { 
     width: '100%', 
     height: 180, 
     backgroundColor: '#000', 
     borderRadius: 32, 
     borderWidth: 4, 
     borderColor: '#333', 
     overflow: 'hidden', 
     justifyContent: 'center', 
     alignItems: 'center', 
     shadowColor: '#60A5FA', 
     shadowOpacity: 0.45, 
     shadowRadius: 30, 
     shadowOffset: { width: 0, height: 10 } 
  },
  tvFrameOff: { borderColor: '#111', shadowOpacity: 0 },
  tvScreenContent: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#050505' },
  tvScreenOff: { flex: 1, width: '100%', backgroundColor: '#000' },
  scanline: { 
     position: 'absolute', 
     top: 0, 
     left: 0, 
     right: 0, 
     height: 35, 
     backgroundColor: 'rgba(96, 165, 250, 0.04)', 
     zIndex: 1 
  },
  nowPlaying: { color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 75, fontWeight: '700', letterSpacing: 1 },

  powerSection: { alignItems: 'center', marginBottom: 50 },
  powerCircle: { 
     width: 88, 
     height: 88, 
     borderRadius: 44, 
     backgroundColor: '#111', 
     borderWidth: 1.5, 
     borderColor: 'rgba(255,255,255,0.1)', 
     justifyContent: 'center', 
     alignItems: 'center',
     shadowColor: '#000',
     shadowOpacity: 0.5,
     shadowRadius: 12,
     shadowOffset: { width: 0, height: 6 }
  },
  powerCircleOn: { 
     backgroundColor: colors.text, 
     borderColor: '#fff',
     shadowColor: '#fff',
     shadowOpacity: 0.15
  },
  powerLabel: { color: colors.textDim, fontSize: 11, fontWeight: '800', marginTop: 15, letterSpacing: 2, opacity: 0.5 },

  sliderSection: { width: '100%', paddingHorizontal: 5 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  sliderLabel: { color: colors.textDim, fontSize: 16, fontWeight: '500' },
  sliderValue: { color: colors.text, fontSize: 20, fontWeight: '700' },
  sliderTouchableArea: { height: 40, justifyContent: 'center' },
  sliderTrack: { height: 11, backgroundColor: colors.glassOverlayLight, borderRadius: 6, justifyContent: 'center' },
  sliderFill: { height: 11, backgroundColor: '#60A5FA', borderRadius: 6 },
  sliderThumb: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.background, borderWidth: 5, borderColor: '#60A5FA', position: 'absolute', top: -11.5, marginLeft: -17, shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 6 }
});

export default TvControlScreen;
