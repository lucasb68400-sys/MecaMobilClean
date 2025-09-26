// navigation/CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/Theme';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const getTabIcon = (routeName) => {
    const icons = {
      Home: '??',
      Map: '???', 
      Quotes: '??',
      Messages: '??',
      Profile: '??'
    };
    return icons[routeName] || '??';
  };

  const getTabLabel = (routeName) => {
    const labels = {
      Home: 'Accueil',
      Map: 'Carte', 
      Quotes: 'Devis',
      Messages: 'Messages',
      Profile: 'Profil'
    };
    return labels[routeName] || routeName;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tab,
                isFocused && styles.tabActive
              ]}
              activeOpacity={0.7}
            >
              <View style={[
                styles.tabIconContainer,
                isFocused && styles.tabIconContainerActive
              ]}>
                <Text style={[
                  styles.tabIcon,
                  isFocused && styles.tabIconActive
                ]}>
                  {getTabIcon(route.name)}
                </Text>
              </View>
              <Text style={[
                styles.tabLabel,
                isFocused && styles.tabLabelActive
              ]}>
                {getTabLabel(route.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.md,
    paddingBottom: SIZES.lg,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.large,
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.xs,
    ...SHADOWS.heavy,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.borderRadius.medium,
  },
  tabActive: {
    backgroundColor: COLORS.primary + '15',
  },
  tabIconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.borderRadius.small,
    marginBottom: SIZES.xs,
  },
  tabIconContainerActive: {
    backgroundColor: COLORS.primary + '20',
  },
  tabIcon: {
    fontSize: 18,
  },
  tabIconActive: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: SIZES.font.small,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default CustomTabBar;
