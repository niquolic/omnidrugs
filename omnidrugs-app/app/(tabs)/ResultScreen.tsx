import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Speech from 'expo-speech';
import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Result: { photoUri: string };
};

type Props = StackScreenProps<RootStackParamList, 'Result'>;

const { height } = Dimensions.get('window');
const BUTTON_HEIGHT = height / 4;

export default function ResultScreen({ route, navigation }: Props) {
  const medName = "Doliprane";
  const medInfo = "C'est un médicament contre la douleur et la fièvre.";

  useEffect(() => {
    const speak = () => {
      Speech.speak(`${medName}. ${medInfo}`, {
        language: 'fr-FR',
      });
    };
    speak();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text accessibilityRole="header" accessibilityLabel={`Nom du médicament : ${medName}`} style={styles.title}>
          {medName}
        </Text>
        <Text accessibilityLabel={medInfo} style={styles.info}>{medInfo}</Text>
      </View>
      
      <TouchableOpacity
        style={[styles.button, { height: BUTTON_HEIGHT }]}
        onPress={() => navigation.navigate('Home')}
        accessibilityRole="button"
        accessibilityLabel="Restart medicine recognition"
      >
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: 'white',
  },
  info: { 
    fontSize: 20, 
    marginBottom: 40, 
    textAlign: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: '#1E90FF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
