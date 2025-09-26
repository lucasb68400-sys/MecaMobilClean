// components/Dashboard/UserHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants/Theme';

const UserHeader = ({ user, onNotificationPress, onSettingsPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.greeting}>Bonjour,</Text>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userRole}>{user.role}</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onNotificationPress}
        >
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
          <Text style={styles.actionIcon}>??</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onSettingsPress}
        >
          <Text style={styles.actionIcon}>??</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SIZES.md,
    paddingTop: SIZES.xxl,
    paddingBottom: SIZES.lg,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: SIZES.font.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  userName: {
    fontSize: SIZES.font.heading,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  userRole: {
    fontSize: SIZES.font.body,
    color: COLORS.primary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: SIZES.borderRadius.medium,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  actionIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.error,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: COLORS.textPrimary,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default UserHeader;
