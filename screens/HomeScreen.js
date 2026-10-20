// screens/HomeScreen.js
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/Theme';
import MainDashboard from '../components/Dashboard/MainDashboard';

const HomeScreen = ({ currentUser }) => {
  const [selectedProfile, setSelectedProfile] = useState(
    currentUser?.userType === 'client' ? 'Client' : 'Mecanicien'
  );

  const user = {
    id: currentUser?.id,
    name: currentUser?.name || 'Utilisateur',
    role: selectedProfile === 'Client' ? 'Client' : 'Mécanicien',
    email: currentUser?.email || '',
    profileType: selectedProfile,
  };

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainDashboard user={user} onProfileChange={handleProfileChange} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default HomeScreen;
