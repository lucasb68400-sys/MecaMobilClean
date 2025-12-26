import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { COLORS, SIZES } from '../constants/Theme';
import { useScreenFadeIn } from '../useScreenFadeIn';

const MechanicHomeScreen = ({ route }) => {
  const { currentUser } = route.params;
  const animatedStyle = useScreenFadeIn();

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>Tableau de Bord Mécanicien</Text>
      <Text style={styles.text}>Bonjour, {currentUser.name} !</Text>
      <Text style={styles.info}>Ici, vous pourrez voir les nouvelles demandes, gérer votre planning, etc.</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.md,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: SIZES.font.heading,
    color: COLORS.warning,
    fontWeight: 'bold',
    marginBottom: SIZES.lg,
  },
  text: {
    fontSize: SIZES.font.subtitle,
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
  },
  info: {
    fontSize: SIZES.font.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default MechanicHomeScreen;