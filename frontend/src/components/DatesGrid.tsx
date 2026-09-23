import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import { CompetitionDates } from '../types';

interface DatesGridProps {
  dates: CompetitionDates;
}

export const DatesGrid: React.FC<DatesGridProps> = ({ dates }) => {
  const formatDate = (dateInput: string | Date) => {
    if (!dateInput) return 'TBA';
    const d = new Date(dateInput);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const dateItems = [
    { label: 'Register Before', value: formatDate(dates.registerBefore), icon: '📅', color: theme.colors.danger },
    { label: 'Submission Starts', value: formatDate(dates.submissionStarts), icon: '🚀', color: theme.colors.primary },
    { label: 'Submission Ends', value: formatDate(dates.submissionEnds), icon: '⏳', color: theme.colors.warning },
    { label: 'Result Date', value: formatDate(dates.resultDate), icon: '🎉', color: theme.colors.success },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Important Dates</Text>
      <View style={styles.grid}>
        {dateItems.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={[styles.cardValue, { color: item.color }]}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    width: '48%', // 2 items per row
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  cardValue: {
    fontSize: theme.typography.fontSize.xs + 1,
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: 4,
  },
});
