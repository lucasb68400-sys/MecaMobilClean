import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { COLORS, SIZES } from '../constants/Theme';
import { useScreenFadeIn } from '../useScreenFadeIn';

const ProfileScreen = ({ route }) => {
  // Récupère les informations et la fonction de déconnexion passées par le navigateur
  const { currentUser, onLogout } = route.params;
  const animatedStyle = useScreenFadeIn();

  const isClient = currentUser.userType === 'client';
  const avatarColor = isClient ? COLORS.primary : COLORS.warning;
  const userInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : '?';

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>Mon Profil</Text>

      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{userInitial}</Text>
        </View>
        <Text style={styles.name}>{currentUser.name}</Text>
        <Text style={styles.userType}>{isClient ? 'Client' : 'Mécanicien'}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <FontAwesome name="envelope-o" size={20} color={COLORS.textSecondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>{currentUser.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="phone" size={20} color={COLORS.textSecondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>{currentUser.phone}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
        <FontAwesome name="sign-out" size={20} color={COLORS.textPrimary} style={{ marginLeft: 10 }} />
      </TouchableOpacity>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: SIZES.md,
    backgroundColor: COLORS.background,
    paddingTop: SIZES.xl,
  },
  title: {
    fontSize: SIZES.font.heading,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SIZES.xl,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    marginBottom: SIZES.xxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  avatarText: {
    fontSize: SIZES.font.heading,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  name: {
    fontSize: SIZES.font.title,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  userType: {
    fontSize: SIZES.font.subtitle,
    color: COLORS.textMuted,
    marginTop: SIZES.sm,
    fontStyle: 'italic',
  },
  infoSection: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.large,
    padding: SIZES.lg,
    marginBottom: 'auto', // Pousse le bouton de déconnexion en bas
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoIcon: {
    width: 30, // Pour aligner le texte
    textAlign: 'center',
    marginRight: SIZES.md,
  },
  infoText: {
    fontSize: SIZES.font.body,
    color: COLORS.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.warning,
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.lg,
    width: '100%',
  },
  logoutButtonText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.font.subtitle,
    fontWeight: '600',
  },
});

export default ProfileScreen;