import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { COLORS, SIZES } from '../constants/Theme';
import { useScreenFadeIn } from '../useScreenFadeIn';
import { FontAwesome } from '@expo/vector-icons';

const ClientHomeScreen = ({ route, navigation }) => {
  const { currentUser } = route.params;
  const animatedStyle = useScreenFadeIn();

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>Espace Client</Text>
      <Text style={styles.text}>Bienvenue, {currentUser.name} !</Text>
      <Text style={styles.info}>Ici, vous pourrez voir vos demandes de réparation, trouver des mécaniciens, etc.</Text>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => navigation.navigate('CreateRequest')}
      >
        <FontAwesome name="plus-circle" size={20} color={COLORS.textPrimary} />
        <Text style={styles.actionButtonText}>Créer une demande de service</Text>
      </TouchableOpacity>
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
    color: COLORS.primary,
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
  actionButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.borderRadius.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.xxl,
  },
  actionButtonText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.font.subtitle,
    fontWeight: 'bold',
    marginLeft: SIZES.sm,
  },
});

export default ClientHomeScreen;