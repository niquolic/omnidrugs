import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: { photoUri: string };
};

type Props = StackScreenProps<RootStackParamList, 'Camera'>;

export default function CameraScreen({ navigation }: Props) {
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      navigation.navigate('Result', { photoUri: photo.uri });
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) return <Text>Camera access denied</Text>;

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
});
