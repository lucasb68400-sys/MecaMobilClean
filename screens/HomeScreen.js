// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/Theme';
import MainDashboard from '../components/Dashboard/MainDashboard';

const HomeScreen = () => {
  const [currentUser] = useState({
    id: 1,
    name: 'Thomas Martin',
    role: 'M\u00e9canicien ind\u00e9pendant',
    email: 'thomas.martin@email.com',
    profileType: 'M\u00e9canicien',
  });

  const handleProfileChange = (newProfile) => {
    console.log(`Changement de profil vers: ${newProfile}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainDashboard 
        user={currentUser}
        onProfileChange={handleProfileChange}
      />
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
