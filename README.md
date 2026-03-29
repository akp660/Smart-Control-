# SmartControl - Premium Hub for Home Automation

[![React Native](https://img.shields.io/badge/React_Native-v0.84.1-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Lucide Icons](https://img.shields.io/badge/Icons-Lucide-FF69B4)](https://lucide.dev/guide/packages/lucide-react-native)
[![Plateform](https://img.shields.io/badge/Platform-iOS_%7C_Android-blue)](#)

SmartControl is a high-fidelity, modern Smart Home management application built with React Native. It features a stunning **Glassmorphism** design system, real-time geolocation weather tracking, and modular control systems for lighting and entertainment devices.

## ✨ Key Features

### 🕒 Intelligent Dashboard
- **Time-Aware Greetings**: Dynamic greeting header (Morning, Afternoon, Evening) that changes based on your local time.
- **Minimalist Design**: Clean, dark-mode-first aesthetic using a custom glass-overlay design system.
- **Smart Transitions**: Smooth transitions between room-specific devices and global controls.

### 🌤️ Hyper-Local Weather
- **Live GPS Integration**: Uses `@react-native-community/geolocation` to fetch your precise coordinates.
- **Open-Meteo API**: Real-time temperature and condition-accurate weather icons (Sunny, Rainy, Snowy, etc.).
- **Smart Fallback**: Instant-on placeholder values while GPS is acquiring, ensuring zero UI lag.

### 💡 Smart Lighting System
- **Presets Integration**: Quick-toggle scenes like *Relax*, *Vibrant*, *Reading*, and *Night*.
- **Precision Control**: Interactive brightness sliders and color temperature management.
- **Advanced Settings**: Dedicated screen for automated schedules, motion sensors, and security toggles.

### 📺 Entertainment Hub (Apple TV-Style)
- **Unified Remote**: A high-fidelity TV remote inspired by modern minimalist designs.
- **Haptic Interaction**: Visual feedback via a "Blinking LED" indicator when buttons are pressed.
- **Volume & Power**: Dedicated control screen for quick adjustments and status toggles.

## 🛠️ Tech Stack
- **Framework**: React Native (CLI)
- **Navigation**: React Navigation 7
- **Icons**: Lucide React Native
- **Styling**: Vanilla StyleSheet (Custom Glassmorphism Tokens)
- **Geolocation**: `@react-native-community/geolocation`
- **Data Source**: Open-Meteo REST API

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (>= 22.11.0)
- [React Native Development Environment](https://reactnative.dev/docs/environment-setup)
- CocoaPods (for iOS)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/akp660/Smart-Control-.git
   cd SmartControl
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (iOS Only) Install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App
- **Android**:
  ```bash
  npx react-native run-android
  ```
- **iOS**:
  ```bash
  npx react-native run-ios
  ```

## 🔒 Permissions
This app requires the following permissions to function correctly:
- **Location**: Used to fetch your current local weather conditions.
- **Internet**: Required for syncing device states and fetching weather data.

## 🎨 Design System
The app uses a curated `colors.ts` resource with specific tokens:
- `glassOverlay`: Semi-transparent background for that "frosted glass" look.
- `glassBorder`: Subtle borders focused on depth and premium feel.
- `primary`: Vibrant accent colors for interactive states.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by [akp660](https://github.com/akp660)
