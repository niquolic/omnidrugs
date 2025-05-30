import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: { medicineInformations: any };
};

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const { height } = Dimensions.get('window');
const BUTTON_HEIGHT = height / 4;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>OmniDrugs</Text>
        <Text style={styles.subtitle}>Medicine recognition</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { height: BUTTON_HEIGHT }]}
        onPress={() => navigation.navigate('Camera')}
        accessibilityRole="button"
        accessibilityLabel="Start medicine recognition"
      >
        <Text style={styles.buttonText}>Start medicine recognition</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'white'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'black',
    fontSize: 24,
    opacity: 0.8,
  },
  button: {
    backgroundColor: '#1E90FF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
