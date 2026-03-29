import React from 'react';
import { StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home, LayoutGrid, Settings } from 'lucide-react-native';

import { HomeScreen, RoomDetailScreen, DeviceControlScreen, DashboardScreen, TvControlScreen, TvRemoteScreen, LightControlScreen, LightSettingsScreen } from './src/screen';
import { colors } from './src/resource/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.glassOverlay,
    text: colors.text,
    border: 'transparent',
  },
};

const DummyScreen = () => <React.Fragment />;

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const IconComponent = route.name === 'Home' ? Home : route.name === 'Dashboard' ? LayoutGrid : Settings;

        if (isFocused) {
          return (
             <TouchableOpacity key={route.key} onPress={onPress} activeOpacity={0.8} style={[styles.activeTab, { marginHorizontal: 8 }]}>
                <IconComponent color={colors.black} size={20} />
                <Text style={styles.activeTabText}>{route.name}</Text>
             </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={route.key} onPress={onPress} activeOpacity={0.8} style={[styles.inactiveTab, { marginHorizontal: 8 }]}>
             <IconComponent color={colors.textDim} size={22} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Settings" component={DummyScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Glass overlay
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', // Glass border
    borderRadius: 40,
    padding: 8,
    // Add shadow so it floats distinctively
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.text, // White
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  activeTabText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },
  inactiveTab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="RootTabs" component={TabNavigator} />
          <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
          <Stack.Screen name="DeviceControl" component={DeviceControlScreen} />
          <Stack.Screen name="TvControl" component={TvControlScreen} />
          <Stack.Screen name="TvRemote" component={TvRemoteScreen} />
          <Stack.Screen name="LightControl" component={LightControlScreen} />
          <Stack.Screen name="LightSettings" component={LightSettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
