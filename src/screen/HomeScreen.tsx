import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../resource/colors';
import { TabPill, DeviceCard } from '../component';
import { Bell, Wind, Plus, Lock, Lightbulb, User, Sun, Cloud, CloudRain, CloudLightning, CloudSnow } from 'lucide-react-native';

const HomeScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('Bedroom');
  const [lightsOn, setLightsOn] = useState(true);
  const [acOn, setAcOn] = useState(true);
  const [securityOn, setSecurityOn] = useState(false);
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>({ temp: 24, code: 0 });

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }
        );
        const data = await response.json();
        if (data.current_weather) {
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            code: data.current_weather.weathercode
          });
        }
      } catch (error) {
        console.error('Weather fetch failed:', error);
      }
    };

    const getLocationAndWeather = async () => {
      let hasPermission = false;

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Smart Control needs access to your location for weather data.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // iOS handled automatically by library/plist
        hasPermission = true;
      }

      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error('Location error:', error);
            // Fallback to London on error
            fetchWeather(51.5074, -0.1278);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        // Fallback to London if denied
        fetchWeather(51.5074, -0.1278);
      }
    };

    getLocationAndWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun color="#FCD34D" size={16} />;
    if (code >= 1 && code <= 3) return <Cloud color="#60A5FA" size={16} />;
    if (code >= 51 && code <= 67) return <CloudRain color="#60A5FA" size={16} />;
    if (code >= 71 && code <= 77) return <CloudSnow color="#E2E8F0" size={16} />;
    if (code >= 95) return <CloudLightning color="#FCD34D" size={16} />;
    return <Cloud color="#60A5FA" size={16} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.ambientGlow} />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <View style={styles.avatar}>
              <User color={colors.textDim} size={24} />
            </View>
            <View>
              <Text style={styles.greeting}>Hello, Martha!</Text>
              <View style={styles.dateWeatherRow}>
                <Text style={styles.date}>Sunday, March 30</Text>
                {weather && (
                  <View style={styles.weatherInfo}>
                    <View style={styles.weatherDivider} />
                    {getWeatherIcon(weather.code)}
                    <Text style={styles.weatherTemp}>{weather.temp}°C</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.bellButton}>
            <Bell color={colors.text} size={22} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
          {['Home', 'Bedroom', 'Living room'].map(tab => (
            <TabPill
              key={tab}
              title={tab}
              isActive={activeTab === tab}
              onPress={() => setActiveTab(tab)}
            />
          ))}
        </ScrollView>

        {/* Full width AC */}
        <DeviceCard
          title="Conditioning"
          subtitle="4 rooms"
          icon={<Wind color="#60A5FA" size={28} />}
          isOn={acOn}
          onToggle={setAcOn}
          style={styles.acCard}
        />

        <View style={styles.grid}>
          <View style={styles.columnLeft}>
            <DeviceCard
              title="Add device"
              icon={<Plus color={colors.textDim} size={28} />}
              style={styles.addCard}
            />
            <DeviceCard
              title="Security"
              subtitle="3 rooms"
              icon={<Lock color="#F87171" size={28} />}
              isOn={securityOn}
              onToggle={setSecurityOn}
            />
          </View>

          <View style={styles.columnRight}>
            <DeviceCard
              title="Lighting"
              subtitle="5 rooms"
              icon={
                <View style={{ width: '100%', position: 'relative', height: 120 }}>
                  <Lightbulb color={lightsOn ? "#FCD34D" : colors.textDim} size={28} style={{ position: 'relative', zIndex: 2 }} />

                  {/* Absolute wrapper to float the image prominently to the right */}
                  <View style={{
                    position: 'absolute',
                    top: -25,
                    right: -70,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                  }}>
                    <Image
                      source={require('../resource/images/Light.png')}
                      style={{
                        width: 220,
                        height: 220,
                        resizeMode: 'contain',
                        opacity: lightsOn ? 1 : 0.25
                      }}
                    />
                  </View>
                </View>
              }
              isOn={lightsOn}
              onToggle={setLightsOn}
              large
              style={lightsOn ? { backgroundColor: 'rgba(252, 211, 77, 0.12)', borderColor: 'rgba(252, 211, 77, 0.3)' } : undefined}
              onPress={() => navigation.navigate('LightControl')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  ambientGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1D1E2A',
    opacity: 0.5,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 0,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.glassOverlayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  greeting: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '600',
  },
  date: {
    color: colors.textDim,
    fontSize: 14,
  },
  dateWeatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
  },
  weatherDivider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 10,
  },
  weatherTemp: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  bellButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.glassOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  tabContainer: {
    marginBottom: 20,
  },
  acCard: {
    marginBottom: 12,
    minHeight: 130,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnLeft: {
    flex: 1,
    marginRight: 6,
  },
  columnRight: {
    flex: 1,
    marginLeft: 6,
  },
  addCard: {
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    borderStyle: 'dashed',
    marginBottom: 12,
  }
});

export default HomeScreen;
