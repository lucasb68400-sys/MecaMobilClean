// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigator from './navigation/AppNavigator';
import { COLORS, SIZES } from './constants/Theme';

const AuthScreen = ({ onAuthenticated }) => {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignUp = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        userType: userType,
        registeredAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('isAuthenticated', 'true');

      Alert.alert(
        'Inscription réussie !',
        `Bienvenue ${formData.name} !`,
        [{ text: 'Continuer', onPress: () => onAuthenticated(userData) }]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue');
    }
  };

  const renderWelcomeScreen = () => (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>MécamobilClean</Text>
      <Text style={styles.welcomeSubtitle}>
        La plateforme qui connecte mécaniciens et clients
      </Text>
      
      <View style={styles.userTypeContainer}>
        <Text style={styles.questionText}>Je suis :</Text>
        
        <TouchableOpacity
          style={[styles.userTypeButton, styles.mechanicButton]}
          onPress={() => handleUserTypeSelect('mechanic')}
        >
          <Text style={styles.userTypeIcon}>??</Text>
          <Text style={styles.userTypeText}>Mécanicien</Text>
          <Text style={styles.userTypeDescription}>
            Je propose mes services de réparation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.userTypeButton, styles.clientButton]}
          onPress={() => handleUserTypeSelect('client')}
        >
          <Text style={styles.userTypeIcon}>??</Text>
          <Text style={styles.userTypeText}>Client</Text>
          <Text style={styles.userTypeDescription}>
            J'ai besoin de faire réparer mon véhicule
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRegistrationForm = () => (
    <View style={styles.formContainer}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setUserType(null)}
      >
        <Text style={styles.backButtonText}>? Retour</Text>
      </TouchableOpacity>

      <Text style={styles.formTitle}>
        Inscription {userType === 'client' ? 'Client' : 'Mécanicien'}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nom complet *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
          placeholder="Entrez votre nom"
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="votre.email@example.com"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Téléphone *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          placeholder="06 XX XX XX XX"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
        <Text style={styles.submitButtonText}>Créer mon compte</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.authContainer}>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      {userType === null ? renderWelcomeScreen() : renderRegistrationForm()}
    </View>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      const authStatus = await AsyncStorage.getItem('isAuthenticated');
      const userData = await AsyncStorage.getItem('userData');
      
      if (authStatus === 'true' && userData) {
        const parsedUserData = JSON.parse(userData);
        setCurrentUser(parsedUserData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Erreur authentification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthenticated = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" backgroundColor={COLORS.background} />
        <Text style={styles.loadingText}>MécamobilClean</Text>
        <Text style={styles.loadingIcon}>??</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />;
  }

  return <AppNavigator currentUser={currentUser} />;
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: SIZES.font.heading,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SIZES.lg,
  },
  loadingIcon: {
    fontSize: 32,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
  },
  welcomeTitle: {
    fontSize: SIZES.font.display,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SIZES.sm,
  },
  welcomeSubtitle: {
    fontSize: SIZES.font.subtitle,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.xxl,
    lineHeight: 24,
  },
  userTypeContainer: {
    width: '100%',
    alignItems: 'center',
  },
  questionText: {
    fontSize: SIZES.font.title,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: SIZES.lg,
  },
  userTypeButton: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.medium,
    padding: SIZES.lg,
    alignItems: 'center',
    marginBottom: SIZES.md,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  mechanicButton: {
    borderColor: COLORS.warning,
  },
  clientButton: {
    borderColor: COLORS.primary,
  },
  userTypeIcon: {
    fontSize: 48,
    marginBottom: SIZES.sm,
  },
  userTypeText: {
    fontSize: SIZES.font.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  userTypeDescription: {
    fontSize: SIZES.font.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: SIZES.md,
    paddingTop: SIZES.xxl,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: SIZES.lg,
  },
  backButtonText: {
    fontSize: SIZES.font.body,
    color: COLORS.primary,
  },
  formTitle: {
    fontSize: SIZES.font.heading,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xxl,
  },
  inputContainer: {
    marginBottom: SIZES.lg,
  },
  inputLabel: {
    fontSize: SIZES.font.body,
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.medium,
    padding: SIZES.md,
    fontSize: SIZES.font.body,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius.medium,
    padding: SIZES.md,
    alignItems: 'center',
    marginTop: SIZES.lg,
  },
  submitButtonText: {
    fontSize: SIZES.font.subtitle,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

export default App;
