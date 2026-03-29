import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Power, VolumeX, Play, Pause, Plus, Minus, Monitor } from 'lucide-react-native';
import { colors } from '../resource/colors';

const TvRemoteScreen = ({ navigation }: any) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Reusable press handler for LED feedback
  const handlePress = useCallback((action?: () => void) => {
    setIsBlinking(true);
    // Blink for 150ms
    setTimeout(() => setIsBlinking(false), 150);
    if (action) action();
  }, []);

  // Custom Button scaled up for minimalism and ease of use
  const RemoteButton = ({ children, onPress, style }: any) => (
    <TouchableOpacity 
      activeOpacity={0.6} 
      style={[styles.roundButton, style]} 
      onPress={() => handlePress(onPress)}
    >
      {children}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.ambientGlow} />
      <View style={styles.container}>
        
        {/* Header - Consistent with user preference */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <ChevronLeft color={colors.textDim} size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>TV Remote</Text>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: 'rgba(239, 68, 68, 0.12)', borderColor: 'rgba(239, 68, 68, 0.2)' }]}
            onPress={() => handlePress()}
          >
            <Power color="#EF4444" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.remoteBodyContainer}>
           <View style={styles.abstractRemote}>
              
              {/* LED Indicator - Refined Pill Shape */}
              <View style={[styles.ledIndicator, isBlinking && styles.ledActive]} />

              {/* D-Pad Touchpad Area - Scaled Up (220px) */}
              <View style={styles.dpadOuter}>
                 <View style={styles.navDotTop} />
                 <View style={styles.navDotBottom} />
                 <View style={styles.navDotLeft} />
                 <View style={styles.navDotRight} />
                 <TouchableOpacity 
                    activeOpacity={0.7} 
                    style={styles.dpadInner}
                    onPress={() => handlePress()}
                 >
                    <View style={styles.innerCircle} />
                 </TouchableOpacity>
              </View>

              {/* Functional Grid - Scaled Buttons (72px) */}
              <View style={styles.gridContainer}>
                 <View style={styles.leftColumn}>
                    <RemoteButton onPress={() => {}}>
                       <ChevronLeft color={colors.text} size={30} strokeWidth={2.5} />
                    </RemoteButton>
                    <RemoteButton onPress={() => {}}>
                       <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                          <Play color={colors.text} size={18} fill={colors.text} />
                          <Pause color={colors.text} size={18} fill={colors.text} />
                       </View>
                    </RemoteButton>
                    <RemoteButton onPress={() => {}}>
                       <VolumeX color={colors.text} size={28} strokeWidth={2} />
                    </RemoteButton>
                 </View>

                 <View style={styles.rightColumn}>
                    <RemoteButton onPress={() => {}}>
                       <Monitor color={colors.text} size={28} strokeWidth={2} />
                    </RemoteButton>
                    
                    {/* Volume Rocker Capsule - Scaled Width (72px) */}
                    <View style={styles.volumeRocker}>
                       <TouchableOpacity 
                          activeOpacity={0.6} 
                          style={styles.rockerTop} 
                          onPress={() => handlePress()}
                       >
                          <Plus color={colors.text} size={30} strokeWidth={2.5} />
                       </TouchableOpacity>
                       <TouchableOpacity 
                          activeOpacity={0.6} 
                          style={styles.rockerBottom} 
                          onPress={() => handlePress()}
                       >
                          <Minus color={colors.text} size={30} strokeWidth={2.5} />
                       </TouchableOpacity>
                    </View>
                 </View>
              </View>

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
    backgroundColor: '#1E1B2A',
    opacity: 0.8,
  },
  container: { flex: 1, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { color: colors.text, fontSize: 18, fontWeight: '600' },
  iconButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.glassOverlay, borderWidth: 1, borderColor: colors.glassBorder, justifyContent: 'center', alignItems: 'center' },
  
  remoteBodyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  abstractRemote: { 
     width: 280, 
     alignItems: 'center',
     padding: 10,
     paddingBottom: 40
  },

  ledIndicator: { 
     width: 16, 
     height: 4, 
     backgroundColor: '#000', 
     borderRadius: 2, 
     marginBottom: 50,
     borderWidth: 1,
     borderColor: 'rgba(255,255,255,0.05)'
  },
  ledActive: { 
     backgroundColor: '#90EE90', // LightGreen
     shadowColor: '#90EE90',
     shadowOpacity: 0.9,
     shadowRadius: 8,
     elevation: 5,
     borderColor: '#90EE90'
  },

  dpadOuter: { 
     width: 220, 
     height: 220, 
     borderRadius: 110, 
     backgroundColor: '#111', 
     justifyContent: 'center', 
     alignItems: 'center',
     marginBottom: 50,
     position: 'relative',
     shadowColor: '#000',
     shadowOpacity: 0.6,
     shadowRadius: 20,
     shadowOffset: { width: 0, height: 12 }
  },
  navDotTop: { position: 'absolute', top: 18, width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)' },
  navDotBottom: { position: 'absolute', bottom: 18, width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)' },
  navDotLeft: { position: 'absolute', left: 18, width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)' },
  navDotRight: { position: 'absolute', right: 18, width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)' },
  
  dpadInner: { 
     width: 140, 
     height: 140, 
     borderRadius: 70, 
     backgroundColor: '#1A1A1A', 
     borderWidth: 1,
     borderColor: '#222',
     justifyContent: 'center', 
     alignItems: 'center' 
  },
  innerCircle: { width: 130, height: 130, borderRadius: 65, backgroundColor: '#111' },

  gridContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 },
  leftColumn: { gap: 30, alignItems: 'center' },
  rightColumn: { gap: 30, alignItems: 'center' },

  roundButton: { 
     width: 72, 
     height: 72, 
     borderRadius: 36, 
     backgroundColor: '#111', 
     justifyContent: 'center', 
     alignItems: 'center',
     shadowColor: '#000',
     shadowOpacity: 0.5,
     shadowRadius: 10,
     shadowOffset: { width: 0, height: 5 }
  },

  volumeRocker: { 
     width: 72, 
     height: 172, 
     backgroundColor: '#111', 
     borderRadius: 36, 
     justifyContent: 'space-between', 
     alignItems: 'center',
     paddingVertical: 15,
     shadowColor: '#000',
     shadowOpacity: 0.5,
     shadowRadius: 10,
     shadowOffset: { width: 0, height: 5 }
  },
  rockerTop: { paddingHorizontal: 20, paddingVertical: 12 },
  rockerBottom: { paddingHorizontal: 20, paddingVertical: 12 }
});

export default TvRemoteScreen;
