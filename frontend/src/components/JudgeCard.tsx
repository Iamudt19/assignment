import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { theme } from '../theme/theme';
import { Judge } from '../types';

interface JudgeCardProps {
  judge: Judge;
}

export const JudgeCard: React.FC<JudgeCardProps> = ({ judge }) => {
  const handlePlayVideo = () => {
    Alert.alert(
      'Judge Intro Video',
      `Playing video preview for ${judge.name}`,
      [{ text: 'Close', style: 'cancel' }]
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionHeader}>Judge & Mentor</Text>

      <View style={styles.contentRow}>
        <Image
          source={{ uri: judge.avatarUrl }}
          style={styles.avatar}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{judge.name}</Text>
          <Text style={styles.title}>{judge.title}</Text>
          <Text style={styles.experience}>{judge.experience}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.videoButton}
        onPress={handlePlayVideo}
        activeOpacity={0.8}
      >
        <Text style={styles.playIcon}>▶</Text>
        <Text style={styles.videoButtonText}>Watch Judge Intro Video</Text>
      </TouchableOpacity>
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
  },
  sectionHeader: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: theme.spacing.md,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.surfaceSecondary,
    borderWidth: 2,
    borderColor: theme.colors.primaryLight,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  title: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary,
    marginTop: 2,
  },
  experience: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primarySurface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm + 2,
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
  },
  playIcon: {
    fontSize: 12,
    color: theme.colors.primary,
  },
  videoButtonText: {
    fontSize: theme.typography.fontSize.xs + 1,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary,
  },
});
