import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, Vibration, View } from 'react-native';
import ScanIcon from '../assets/scanIcon.svg';
import { useState } from 'react';
import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function scanCode() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    Vibration.vibrate(100);
    router.push(`/join?code=${data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={'back'}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <Ionicons
          style={{ marginHorizontal: 15, marginVertical: 40 }}
          name='close-outline'
          size={32}
          color='white'
          onPress={() => navigation.goBack()}
        />
        <ThemedView style={styles.textContainer}>
          <ThemedView style={styles.iconContainer}>
            <ScanIcon />
          </ThemedView>
          <ThemedView style={styles.textBottomContainer}>
            <ThemedText style={styles.scanMessage} type='defaultLarge'>
              Scan the QR code to join the game
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 30,
    marginBottom: 60,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  scanMessage: {
    textAlign: 'center',
    color: 'white',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
});
