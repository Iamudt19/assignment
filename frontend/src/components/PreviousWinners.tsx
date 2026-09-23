import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { theme } from '../theme/theme';
import { PreviousWinner } from '../types';

interface PreviousWinnersProps {
  winners: PreviousWinner[];
}

export const PreviousWinners: React.FC<PreviousWinnersProps> = ({ winners }) => {
  if (!winners || winners.length === 0) return null;

  const handlePlayWinnerVideo = (winner: PreviousWinner) => {
    Alert.alert(
      'Winning Performance',
      `Watching ${winner.name}'s Rank #${winner.rank} winning entry`,
      [{ text: 'Close', style: 'cancel' }]
    );
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return { bg: '#FEF3C7', text: '#D97706', label: '1st Rank' };
      case 2:
        return { bg: '#F1F5F9', text: '#475569', label: '2nd Rank' };
      case 3:
        return { bg: '#FFEDD5', text: '#C2410C', label: '3rd Rank' };
      default:
        return { bg: theme.colors.primaryLight, text: theme.colors.primary, label: `${rank}th Rank` };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Previous Season Winners</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {winners.map((item, index) => {
          const badgeStyle = getRankBadgeColor(item.rank);

          return (
            <TouchableOpacity
              key={index}
              style={styles.winnerCard}
              onPress={() => handlePlayWinnerVideo(item)}
              activeOpacity={0.85}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.photoUrl }} style={styles.thumbnail} />
                <View style={styles.playOverlay}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
                <View style={[styles.rankBadge, { backgroundColor: badgeStyle.bg }]}>
                  <Text style={[styles.rankText, { color: badgeStyle.text }]}>
                    {badgeStyle.label}
                  </Text>
                </View>
              </View>

              <Text style={styles.winnerName} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  winnerCard: {
    width: 140,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xs,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  rankBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
  },
  rankText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  winnerName: {
    fontSize: theme.typography.fontSize.xs + 1,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
});
