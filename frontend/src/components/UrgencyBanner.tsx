import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import { useCountdown } from '../hooks/useCountdown';

interface UrgencyBannerProps {
  targetDate?: string | Date;
}

export const UrgencyBanner: React.FC<UrgencyBannerProps> = ({ targetDate }) => {
  const { formattedString, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <View style={[styles.banner, styles.expiredBanner]}>
        <Text style={styles.expiredText}>⏰ Registration has closed for this competition.</Text>
      </View>
    );
  }

  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>
        ⏰ Registration closes in{' '}
        <Text style={styles.timerText}>{formattedString}</Text> • Hurry up!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FEF2F2',
    paddingVertical: theme.spacing.md - 2,
    paddingHorizontal: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expiredBanner: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderColor: theme.colors.border,
  },
  bannerText: {
    fontSize: theme.typography.fontSize.xs + 1,
    color: theme.colors.danger,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  timerText: {
    fontWeight: theme.typography.fontWeight.bold,
    fontVariant: ['tabular-nums'],
  },
  expiredText: {
    fontSize: theme.typography.fontSize.xs + 1,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
