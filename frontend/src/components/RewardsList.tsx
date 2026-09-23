import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import { Reward } from '../types';

interface RewardsListProps {
  rewards: Reward[];
}

export const RewardsList: React.FC<RewardsListProps> = ({ rewards }) => {
  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🎖️';
    }
  };

  const getRankSuffix = (rank: number) => {
    if (rank === 1) return '1st Place';
    if (rank === 2) return '2nd Place';
    if (rank === 3) return '3rd Place';
    return `${rank}th Place`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Prize Money Distribution</Text>

      <View style={styles.table}>
        {rewards.map((reward, index) => (
          <View
            key={index}
            style={[
              styles.row,
              index === rewards.length - 1 && styles.lastRow,
              reward.rank === 1 && styles.topRankRow,
            ]}
          >
            <View style={styles.rankCol}>
              <Text style={styles.medalIcon}>{getRankMedal(reward.rank)}</Text>
              <Text style={styles.rankText}>{getRankSuffix(reward.rank)}</Text>
            </View>

            <Text style={styles.prizeText}>₹{reward.prize.toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  table: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  topRankRow: {
    backgroundColor: '#FEFCE8',
  },
  rankCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  medalIcon: {
    fontSize: 16,
  },
  rankText: {
    fontSize: theme.typography.fontSize.xs + 1,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  prizeText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
});
