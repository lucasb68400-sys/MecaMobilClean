// screens/MapScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../constants/Theme';

const MapScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Carte</Text>
      <Text style={styles.subtitle}>Cette section sera développée prochainement</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
  },
  title: {
    fontSize: SIZES.font.heading,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
  },
  subtitle: {
    fontSize: SIZES.font.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default MapScreen;
