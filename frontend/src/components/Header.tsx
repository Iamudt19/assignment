import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
        activeOpacity={0.7}
      >
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Competition Details</Text>

      <View style={styles.pillContainer}>
        <TouchableOpacity
          style={[styles.pill, language === 'ENG' && styles.activePill]}
          onPress={() => onLanguageChange('ENG')}
          activeOpacity={0.8}
        >
          <Text style={[styles.pillText, language === 'ENG' && styles.activePillText]}>
            ENG
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pill, language === 'हिंदी' && styles.activePill]}
          onPress={() => onLanguageChange('हिंदी')}
          activeOpacity={0.8}
        >
          <Text style={[styles.pillText, language === 'हिंदी' && styles.activePillText]}>
            हिंदी
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  pillContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: theme.borderRadius.full,
    padding: 2,
  },
  pill: {
    paddingHorizontal: theme.spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  activePill: {
    backgroundColor: theme.colors.primary,
  },
  pillText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textSecondary,
  },
  activePillText: {
    color: theme.colors.textInverted,
  },
});
