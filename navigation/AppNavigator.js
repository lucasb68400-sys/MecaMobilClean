// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

import ClientHomeScreen from '../screens/ClientHomeScreen';
import MechanicHomeScreen from '../screens/MechanicHomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateRequestScreen from '../screens/CreateRequestScreen';
import { COLORS } from '../constants/Theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator pour le parcours Client
const ClientHomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.surface },
      headerTintColor: COLORS.textPrimary,
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="ClientHome" component={ClientHomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CreateRequest" component={CreateRequestScreen} options={{ title: 'Nouvelle Demande' }} />
  </Stack.Navigator>
);

const AppNavigator = ({ currentUser, onLogout }) => {
  const isClient = currentUser.userType === 'client';

  // Définir les écrans spécifiques à chaque rôle
  const HomeTab = {
    name: isClient ? 'ClientHomeStack' : 'MechanicHome',
    component: isClient ? ClientHomeStack : MechanicHomeScreen,
    options: {
      tabBarLabel: isClient ? 'Accueil' : 'Tableau de bord',
      tabBarIcon: ({ color, size }) => (
        <FontAwesome name={isClient ? 'home' : 'dashboard'} color={color} size={size} />
      ),
    },
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: isClient ? COLORS.primary : COLORS.warning,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarStyle: { backgroundColor: COLORS.surface },
        }}
      >
        <Tab.Screen
          name={HomeTab.name}
          component={HomeTab.component}
          initialParams={{ currentUser }}
          options={HomeTab.options}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{ currentUser, onLogout }}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;