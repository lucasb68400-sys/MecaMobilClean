import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../constants/Theme';

const CreateRequestScreen = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const handleSubmit = () => {
    if (!description || !vehicleType) {
      Alert.alert('Champs requis', 'Veuillez remplir tous les champs.');
      return;
    }
    // Logique de soumission de la demande (à implémenter)
    console.log('Nouvelle demande:', { description, vehicleType });
    Alert.alert('Demande envoyée', 'Votre demande de service a été créée avec succès.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Nouvelle Demande de Service</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type de véhicule</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Peugeot 208, Camion Renault T"
            placeholderTextColor={COLORS.textMuted}
            value={vehicleType}
            onChangeText={setVehicleType}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description du problème</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Décrivez le problème le plus précisément possible..."
            placeholderTextColor={COLORS.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Soumettre la demande</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  contentContainer: { padding: SIZES.md },
  title: { fontSize: SIZES.font.heading, color: COLORS.textPrimary, fontWeight: 'bold', marginBottom: SIZES.xl, textAlign: 'center' },
  inputContainer: { marginBottom: SIZES.lg },
  label: { fontSize: SIZES.font.subtitle, color: COLORS.textPrimary, marginBottom: SIZES.sm },
  input: { backgroundColor: COLORS.surface, borderRadius: SIZES.borderRadius.medium, padding: SIZES.md, fontSize: SIZES.font.body, color: COLORS.textPrimary, borderWidth: 1, borderColor: COLORS.border },
  textArea: { height: 150, textAlignVertical: 'top' },
  submitButton: { backgroundColor: COLORS.primary, padding: SIZES.md, borderRadius: SIZES.borderRadius.medium, alignItems: 'center', marginTop: SIZES.lg },
  submitButtonText: { color: COLORS.textPrimary, fontSize: SIZES.font.subtitle, fontWeight: 'bold' },
});

export default CreateRequestScreen;