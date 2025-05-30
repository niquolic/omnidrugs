import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Speech from 'expo-speech';
import type { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: { medicineInformations: any };
};

type Props = StackScreenProps<RootStackParamList, 'Camera'>;

export default function CameraScreen({ navigation }: Props) {
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      setProcessing(true);
      Speech.speak('Processing...', { language: 'en-US' });

      const photo = await cameraRef.current.takePictureAsync({ base64: false });

      const formData = new FormData();
      formData.append('photo', {
        uri: photo.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch('http://10.0.0.79:3000/recognize', {
        method: 'POST',
        body: formData,
      });

      const medicineInformations = await response.json();

      console.log('Medicine Information:', medicineInformations);

      setProcessing(false);
      navigation.navigate('Result', { medicineInformations });
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) return <Text>Camera access denied</Text>;

  return (
    <View style={styles.container}>
      ...{!processing && (
          <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
          accessibilityRole="button"
          accessibilityLabel="Cancel recognition"
        >
          <View style={styles.backIconContainer}>
            <Ionicons name="arrow-back" size={40} color="black" />
          </View>
        </TouchableOpacity>
      )}
      {processing ? (
        <View style={styles.processingContainer}>
          <Text style={styles.processingText}>Processing...</Text>
        </View>
      ) : (
        <>
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              ref={cameraRef}
              facing="back"
            />
          </View>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
            accessibilityRole="button"
            accessibilityLabel="Take a picture of the medicine"
          >
            <Text style={styles.buttonText}>📸 Take a picture</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backIconContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 2,
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    flex: 1,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  processingText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
