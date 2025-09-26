// components/Dashboard/MainDashboard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants/Theme';
import StatsCard from './StatsCard';
import UserHeader from './UserHeader';

const MainDashboard = ({ user, onProfileChange }) => {
  const [selectedProfile, setSelectedProfile] = useState('Mecanicien');
  
  const profileData = {
    Client: {
      stats: [
        { icon: '🔧', title: 'Reparations en cours', value: '2', color: COLORS.warning },
        { icon: '💰', title: 'Budget mensuel', value: '450', color: COLORS.success },
        { icon: '⭐', title: 'Note moyenne donnee', value: '4.8', color: COLORS.primary }
      ],
      notifications: [
        { title: 'Reparation terminee', description: 'BMW X3 - Revision complete', time: '2h' },
        { title: 'Nouveau devis disponible', description: 'Changement plaquettes - 180', time: '5h' }
      ]
    },
    Mecanicien: {
      stats: [
        { icon: '📋', title: 'Missions en attente', value: '5', color: COLORS.warning },
        { icon: '💵', title: 'Revenus ce mois', value: '2 350', color: COLORS.success },
        { icon: '⏱️', title: 'Temps moyen/mission', value: '2.5 h', color: COLORS.primary }
      ],
      notifications: [
        { title: 'Nouvelle mission disponible', description: 'Vidange - BMW X3 - 15km', time: '5 minutes' },
        { title: 'Paiement recu', description: 'Mission #1234 - 180', time: '1h' }
      ]
    },
    Entreprise: {
      stats: [
        { icon: '🚛', title: 'Vehicules en flotte', value: '24', color: COLORS.secondary },
        { icon: '🛠️', title: 'Maintenances ce mois', value: '12', color: COLORS.warning },
        { icon: '💲', title: 'Cout moyen/vehicule', value: '320', color: COLORS.success }
      ],
      notifications: [
        { title: 'Maintenance programmee', description: '3 vehicules - Revision generale', time: '2j' },
        { title: 'Rapport mensuel disponible', description: 'Consultez vos statistiques', time: '1 semaine' }
      ]
    }
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    if (onProfileChange) {
      onProfileChange(profile);
    }
  };

  const handleNewService = () => {
    Alert.alert(
      'Nouveau service',
      selectedProfile === 'Mecanicien' ? 
        'Voulez-vous creer une nouvelle offre de service ?' :
        selectedProfile === 'Client' ?
          'Voulez-vous demander une intervention ?' :
          'Voulez-vous planifier une maintenance de flotte ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Continuer', onPress: () => console.log('Navigation vers formulaire') }
      ]
    );
  };

  const currentData = profileData[selectedProfile];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <UserHeader 
        user={user}
        onNotificationPress={() => console.log('Notifications')}
        onSettingsPress={() => console.log('Parametres')}
      />

      <View style={styles.profileSelector}>
        {Object.keys(profileData).map((profile) => (
          <TouchableOpacity
            key={profile}
            style={[
              styles.profileButton,
              selectedProfile === profile && styles.profileButtonActive
            ]}
            onPress={() => handleProfileSelect(profile)}
          >
            <Text style={[
              styles.profileButtonText,
              selectedProfile === profile && styles.profileButtonTextActive
            ]}>
              {profile}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsContainer}
        style={styles.statsScroll}
      >
        {currentData.stats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.newServiceButton} onPress={handleNewService}>
        <Text style={styles.newServiceIcon}>+</Text>
        <Text style={styles.newServiceText}>Nouveau service</Text>
      </TouchableOpacity>

      <View style={styles.notificationsSection}>
        <Text style={styles.sectionTitle}>Notifications recentes</Text>
        {currentData.notifications.map((notification, index) => (
          <View key={index} style={styles.notificationCard}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>{notification.description}</Text>
            </View>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  profileSelector: { flexDirection: 'row', marginHorizontal: SIZES.md, marginBottom: SIZES.lg, backgroundColor: COLORS.surface, borderRadius: SIZES.borderRadius.medium, padding: SIZES.xs },
  profileButton: { flex: 1, paddingVertical: SIZES.sm, paddingHorizontal: SIZES.md, borderRadius: SIZES.borderRadius.small, alignItems: 'center' },
  profileButtonActive: { backgroundColor: COLORS.primary },
  profileButtonText: { fontSize: SIZES.font.body, color: COLORS.textSecondary, fontWeight: '500' },
  profileButtonTextActive: { color: COLORS.textPrimary, fontWeight: '600' },
  statsScroll: { marginBottom: SIZES.lg },
  statsContainer: { paddingHorizontal: SIZES.md, gap: SIZES.sm },
  newServiceButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, marginHorizontal: SIZES.md, marginBottom: SIZES.lg, paddingVertical: SIZES.md, borderRadius: SIZES.borderRadius.medium, ...SHADOWS.medium },
  newServiceIcon: { fontSize: 24, color: COLORS.textPrimary, marginRight: SIZES.sm, fontWeight: 'bold' },
  newServiceText: { fontSize: SIZES.font.subtitle, color: COLORS.textPrimary, fontWeight: '600' },
  notificationsSection: { paddingHorizontal: SIZES.md, paddingBottom: SIZES.xxl },
  sectionTitle: { fontSize: SIZES.font.title, color: COLORS.textPrimary, fontWeight: 'bold', marginBottom: SIZES.md },
  notificationCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.borderRadius.medium, padding: SIZES.md, marginBottom: SIZES.sm, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderLeftWidth: 4, borderLeftColor: COLORS.primary },
  notificationContent: { flex: 1 },
  notificationTitle: { fontSize: SIZES.font.body, color: COLORS.textPrimary, fontWeight: '600', marginBottom: SIZES.xs },
  notificationDescription: { fontSize: SIZES.font.small, color: COLORS.textSecondary },
  notificationTime: { fontSize: SIZES.font.small, color: COLORS.textMuted },
});

export default MainDashboard;