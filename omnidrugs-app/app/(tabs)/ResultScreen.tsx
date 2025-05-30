import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Speech from 'expo-speech';
import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Result: { medicineInformations: any };
};

type Props = StackScreenProps<RootStackParamList, 'Result'>;

const { height } = Dimensions.get('window');
const BUTTON_HEIGHT = height / 4;

export default function ResultScreen({ route, navigation }: Props) {
  console.log('ResultScreen route params:', route.params);
  const med = route.params.medicineInformations;

  let medName = "";
  let property = "";
  let form = "";
  let method = "";
  let substances = "";
  let medicineDescription = null;

  if (!med?.informations?.description) {
    medName = med?.informations.denomination || "Unknown";
    property = med?.informations.titulaires?.join(', ') || "Unknown";
    form = med?.informations.forme_pharmaceutique || "Unknown";
    method = med?.informations.voies_administration || "Unknown";
    substances = med?.informations.substances?.map(
      (s: any) => `${s.denominations?.join(', ')} (${s.dosage_substance})`
    ).join(', ') || "Unknown";
  } else {
    medicineDescription = med?.informations.description
  }

  useEffect(() => {
    console.log(medicineDescription)
    const info = medicineDescription ?? `Medicine's name : ${medName}. Property of : ${property}. Form : ${form}. Method of administration : ${method}. Substances : ${substances}.`;
    Speech.speak(`${info}`, { language: 'en-US' });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {medicineDescription && (
          <Text accessibilityRole="header" accessibilityLabel={`${medicineDescription}`} style={styles.info}>
            {medicineDescription || "No description available."}
          </Text>
        )}
        {!med?.informations?.description && (
          <>
            <Text accessibilityRole="header" accessibilityLabel={`Medicine's name : ${medName}`} style={styles.title}>
              {medName}
            </Text>
            <Text accessibilityRole="header" accessibilityLabel={`Property of : ${property}`} style={styles.info}>Property of : {property}</Text>
            <Text accessibilityRole="header" accessibilityLabel={`Form : ${form}`} style={styles.info}>Form : {form}</Text>
            <Text accessibilityRole="header" accessibilityLabel={`Method of administration : ${method}`} style={styles.info}>Method of administration : {method}</Text>
            <Text accessibilityRole="header" accessibilityLabel={`Substances: ${substances}`} style={styles.info}>Substances : {substances}</Text>
          </>
        )}
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
    backgroundColor: 'white',
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
    color: 'black',
  },
  info: { 
    fontSize: 30, 
    marginBottom: 40, 
    textAlign: 'center',
    color: 'black',
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
  }
});
