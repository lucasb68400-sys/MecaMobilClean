// components/Dashboard/StatsCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants/Theme';

const StatsCard = ({ icon, title, value, subtitle, color = COLORS.primary }) => {
  return (
    <View style={[styles.card, SHADOWS.light]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Text style={[styles.icon, { color }]}>{icon}</Text>
        </View>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.medium,
    padding: SIZES.md,
    minWidth: 150,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.borderRadius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    fontSize: SIZES.font.heading,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  title: {
    fontSize: SIZES.font.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.font.small,
    color: COLORS.textMuted,
  },
});

export default StatsCard;
