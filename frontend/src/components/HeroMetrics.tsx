import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

interface HeroMetricsProps {
  title: string;
  isRegistered?: boolean;
  tags: string[];
  prizePool: number;
  entryFee: number;
  totalSpots: number;
  bookedSpots: number;
}

export const HeroMetrics: React.FC<HeroMetricsProps> = ({
  title,
  isRegistered = false,
  tags,
  prizePool,
  entryFee,
  totalSpots,
  bookedSpots,
}) => {
  const spotsLeft = Math.max(0, totalSpots - bookedSpots);
  const fillPercentage = Math.min(100, (bookedSpots / totalSpots) * 100);

  return (
    <View style={styles.card}>
      {/* Title & Status Badge */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {isRegistered && (
          <View style={styles.registeredBadge}>
            <Text style={styles.registeredBadgeIcon}>✓</Text>
            <Text style={styles.registeredBadgeText}>Registered</Text>
          </View>
        )}
      </View>

      {/* Tags Row */}
      <View style={styles.tagsRow}>
        {tags.map((tag, idx) => (
          <View key={idx} style={styles.tagChip}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Metrics Row: Prize Pool & Entry Fee */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>🏆 Total Prize Pool</Text>
          <Text style={styles.metricValue}>₹{prizePool.toLocaleString()}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>🎟️ Entry Fee</Text>
          <Text style={styles.metricValue}>₹{entryFee}</Text>
        </View>
      </View>

      {/* Dynamic Spot Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressTextRow}>
          <Text style={styles.spotsLeftText}>
            🔥 <Text style={styles.spotsLeftHighlight}>Only {spotsLeft} spots left!</Text>
          </Text>
          <Text style={styles.spotsCountText}>
            {bookedSpots} / {totalSpots} Booked
          </Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${fillPercentage}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
    shadowColor: theme.colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successLight,
    paddingHorizontal: theme.spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  },
  registeredBadgeIcon: {
    fontSize: 12,
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  registeredBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.success,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs + 2,
    marginTop: theme.spacing.sm,
  },
  tagChip: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.sm,
  },
  tagText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary,
  },
  metricsGrid: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primarySurface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: theme.colors.border,
  },
  metricLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  progressSection: {
    marginTop: theme.spacing.lg,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  spotsLeftText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  spotsLeftHighlight: {
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.danger,
  },
  spotsCountText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textSecondary,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
});
