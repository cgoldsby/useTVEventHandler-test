/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useTVEventHandler,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [focusedButton, setFocusedButton] = useState<number | null>(null);

  // TV Event Handler - logs all TV remote events
  useTVEventHandler(
    useCallback((evt) => {
      console.log('📺 TV Event:', {
        eventType: evt.eventType,
        eventKeyAction: evt.eventKeyAction,
        tag: evt.tag,
        body: evt.body,
      });

      // Log specific event types with emojis for easy identification
      switch (evt.eventType) {
        case 'focus':
          console.log('🎯 FOCUS event detected');
          break;
        case 'blur':
          console.log('💨 BLUR event detected');
          break;
        case 'select':
          console.log('✅ SELECT event detected');
          break;
        case 'up':
        case 'down':
        case 'left':
        case 'right':
          console.log(`⬆️ DIRECTION event: ${evt.eventType}`);
          break;
        case 'playPause':
          console.log('⏯️  PLAY/PAUSE event detected');
          break;
        case 'menu':
          console.log('📋 MENU event detected');
          break;
        default:
          console.log(`ℹ️  Other event: ${evt.eventType}`);
      }
    }, [])
  );

  const buttons = [
    { id: 1, label: 'Button 1', color: '#FF6B6B' },
    { id: 2, label: 'Button 2', color: '#4ECDC4' },
    { id: 3, label: 'Button 3', color: '#45B7D1' },
    { id: 4, label: 'Button 4', color: '#FFA07A' },
  ];

  const handlePress = (id: number) => {
    console.log(`🔘 Button ${id} pressed`);
  };

  return (
    <View 
      style={styles.container}
      onFocusCapture={(e) => {
        console.log('🎯 CAPTURE: Focus captured at container level', {
          target: e.target,
          currentTarget: e.currentTarget,
        });
      }}
      onBlurCapture={(e) => {
        console.log('💨 CAPTURE: Blur captured at container level', {
          target: e.target,
          currentTarget: e.currentTarget,
        });
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>TV Remote Test (with Capture)</Text>
      </View>

      <View style={styles.gridContainer}>
        {buttons.map((button) => (
          <Pressable
            key={button.id}
            style={({ focused }) => [
              styles.button,
              { backgroundColor: button.color },
              focused && styles.buttonFocused,
            ]}
            onPress={() => handlePress(button.id)}
            onFocus={() => {
              setFocusedButton(button.id);
              console.log(`🎯 Button ${button.id} focused`);
            }}
            onBlur={() => {
              setFocusedButton(null);
              console.log(`💨 Button ${button.id} blurred`);
            }}
            hasTVPreferredFocus={button.id === 1}
          >
            <Text style={styles.buttonText}>{button.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {focusedButton ? `Button ${focusedButton} focused` : 'Navigate with remote'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 20,
  },
  button: {
    width: 240,
    height: 140,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFocused: {
    transform: [{ scale: 1.08 }],
    borderWidth: 3,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#888',
  },
});

export default App;