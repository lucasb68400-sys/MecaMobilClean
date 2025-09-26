// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { signUpSchema } from './validation.js';
import AppNavigator from './navigation/AppNavigator'; // Assurez-vous que le chemin est correct
import { COLORS, SIZES } from './constants/Theme';

const AuthScreen = ({ onAuthenticated }) => {
  const [authMode, setAuthMode] = useState('welcome'); // 'welcome', 'signup', 'login'
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleBackToWelcome = () => {
    setAuthMode('welcome');
    setUserType(null);
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setAuthMode('signup');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLoginInputChange = (field, value) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignUp = async () => {
    try {
      // --- VALIDATION ROBUSTE ---
      await signUpSchema.validate(formData, { abortEarly: false });

      // Vérifier si l'utilisateur existe déjà
      const existingUsersJSON = await AsyncStorage.getItem('allUsers');
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
      const userExists = existingUsers.some(user => user.email.toLowerCase() === formData.email.toLowerCase());

      if (userExists) {
        Alert.alert('Erreur', 'Un compte avec cet email existe déjà.');
        return;
      }

      // Le reste du code ne s'exécute que si la validation réussit
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password, // ATTENTION: Ne jamais stocker de mot de passe en clair dans une vraie app !
        userType: userType,
        registeredAt: new Date().toISOString(),
      };

      // On récupère les utilisateurs existants et on ajoute le nouveau
      const updatedUsers = [...existingUsers, userData];

      await AsyncStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('isAuthenticated', 'true');

      Alert.alert('Inscription réussie !',
        `Bienvenue ${formData.name} !`,
        [{ text: 'Continuer', onPress: () => onAuthenticated(userData) }]
      );
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Affiche la première erreur de validation trouvée
        Alert.alert('Erreur de validation', error.errors[0]);
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription.');
      }
    }
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      Alert.alert('Erreur', 'Veuillez entrer votre email et votre mot de passe.');
      return;
    }

    try {
      const allUsersJSON = await AsyncStorage.getItem('allUsers');
      const allUsers = allUsersJSON ? JSON.parse(allUsersJSON) : [];
      
      const foundUser = allUsers.find(user => user.email.toLowerCase() === loginData.email.toLowerCase());

      if (foundUser && foundUser.password === loginData.password) {
        // ATTENTION: La comparaison de mot de passe en clair est très peu sécurisée.
        // Dans une vraie application, il faudrait comparer des hashs.
        // ex: const passwordMatch = await bcrypt.compare(loginData.password, foundUser.hashedPassword);

        await AsyncStorage.setItem('userData', JSON.stringify(foundUser));
        await AsyncStorage.setItem('isAuthenticated', 'true');
        Alert.alert('Connexion réussie !', `Bienvenue ${foundUser.name} !`);
        onAuthenticated(foundUser);
      } else {
        Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion.');
      console.error('Erreur de connexion:', error);
    }
  };

  // Nettoyer les champs de formulaire lors du changement de mode
  useEffect(() => {
    setFormData({ name: '', email: '', phone: '', password: '', passwordConfirmation: '' });
    setLoginData({ email: '', password: '' });
  }, [authMode]);


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
          <FontAwesome name="wrench" size={48} color={COLORS.warning} style={styles.userTypeIcon} />
          <Text style={styles.userTypeText}>Mécanicien</Text>
          <Text style={styles.userTypeDescription}>
            Je propose mes services de réparation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.userTypeButton, styles.clientButton]}
          onPress={() => handleUserTypeSelect('client')}
        >
          <FontAwesome name="car" size={48} color={COLORS.primary} style={styles.userTypeIcon} />
          <Text style={styles.userTypeText}>Client</Text>
          <Text style={styles.userTypeDescription}>
            J'ai besoin de faire réparer mon véhicule
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.switchAuthModeButton} onPress={() => setAuthMode('login')}>
          <Text style={styles.switchAuthModeText}>
            Déjà un compte ? <Text style={{fontWeight: 'bold', color: COLORS.primary}}>Se connecter</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  const renderSignupForm = () => (
    <View style={styles.formContainer}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBackToWelcome}
      >
        <FontAwesome name="arrow-left" size={16} color={COLORS.primary} />
        <Text style={styles.backButtonText}> Retour</Text>
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

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Mot de passe *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          placeholder="8+ caractères"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirmer le mot de passe *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.passwordConfirmation}
          onChangeText={(value) => handleInputChange('passwordConfirmation', value)}
          placeholder="Retapez votre mot de passe"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
        <Text style={styles.submitButtonText}>Créer mon compte</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.switchAuthModeButton} onPress={() => setAuthMode('login')}>
        <Text style={styles.switchAuthModeText}>
          Déjà un compte ? <Text style={{fontWeight: 'bold', color: COLORS.primary}}>Se connecter</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBackToWelcome}
      >
        <FontAwesome name="arrow-left" size={16} color={COLORS.primary} />
        <Text style={styles.backButtonText}> Retour</Text>
      </TouchableOpacity>

      <View style={styles.formHeader}>
        <FontAwesome name="sign-in" size={40} color={COLORS.primary} />
        <Text style={styles.formTitle}>Connexion</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={loginData.email}
          onChangeText={(value) => handleLoginInputChange('email', value)}
          placeholder="votre.email@example.com"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Mot de passe</Text>
        <TextInput
          style={styles.textInput}
          value={loginData.password}
          onChangeText={(value) => handleLoginInputChange('password', value)}
          placeholder="Votre mot de passe"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry
        />
      </View>



      <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
        <Text style={styles.submitButtonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.switchAuthModeButton} onPress={() => setAuthMode('welcome')}>
        <Text style={styles.switchAuthModeText}>
          Pas encore de compte ? <Text style={{fontWeight: 'bold', color: COLORS.primary}}>S'inscrire</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.authContainer}>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      {authMode === 'signup' && renderSignupForm()}
      {authMode === 'login' && renderLoginForm()}
      {authMode === 'welcome' && renderWelcomeScreen()}
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isAuthenticated');
      await AsyncStorage.removeItem('userData');
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" backgroundColor={COLORS.background} />
        <Text style={styles.loadingText}>MécamobilClean</Text>
        <FontAwesome name="cogs" size={32} color={COLORS.textPrimary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />;
  }

  return <AppNavigator currentUser={currentUser} onLogout={handleLogout} />;
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: SIZES.font.body,
    color: COLORS.primary,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: SIZES.xxl,
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
  switchAuthModeButton: {
    marginTop: SIZES.xl,
    padding: SIZES.sm,
  },
  switchAuthModeText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.font.body,
    textAlign: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.xl,
  },
  successTitle: {
    fontSize: SIZES.font.heading,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  successMessage: {
    fontSize: SIZES.font.subtitle,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.xxl,
    lineHeight: 26,
  },
});

export default App;