import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackScreenProps } from '@react-navigation/stack';
import HomeScreen from '../app/(tabs)/HomeScreen';
import CameraScreen from '../app/(tabs)/CameraScreen';
import ResultScreen from '../app/(tabs)/ResultScreen';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: { photoUri: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
}