import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { theme } from '../theme/theme';

interface StickyFooterProps {
  isRegistered?: boolean;
  entryFee: number;
  onRegisterPress: () => void;
  onUploadPress: () => void;
  loading?: boolean;
  isFull?: boolean;
}

export const StickyFooter: React.FC<StickyFooterProps> = ({
  isRegistered = false,
  entryFee,
  onRegisterPress,
  onUploadPress,
  loading = false,
  isFull = false,
}) => {
  return (
    <View style={styles.container}>
      {isRegistered ? (
        <View style={styles.registeredContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={onUploadPress}
            activeOpacity={0.8}
          >
            <Text style={styles.uploadButtonIcon}>📤</Text>
            <View style={styles.uploadTextGroup}>
              <Text style={styles.uploadButtonText}>Upload Submission</Text>
              <Text style={styles.registeredSubtext}>✓ You are registered</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.unregisteredContainer}>
          <View style={styles.feeContainer}>
            <Text style={styles.feeLabel}>Entry Fee</Text>
            <Text style={styles.feeAmount}>₹{entryFee}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.ctaButton,
              isFull && styles.disabledButton,
            ]}
            onPress={onRegisterPress}
            disabled={loading || isFull}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.ctaButtonText}>
                {isFull ? 'Competition Full' : `Register & Pay ₹${entryFee}`}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    elevation: 8,
    shadowColor: theme.colors.shadowColor,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  unregisteredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  feeContainer: {
    justifyContent: 'center',
  },
  feeLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  feeAmount: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  ctaButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: theme.colors.textMuted,
  },
  ctaButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textInverted,
  },
  registeredContainer: {
    width: '100%',
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.success,
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  uploadButtonIcon: {
    fontSize: 20,
  },
  uploadTextGroup: {
    alignItems: 'flex-start',
  },
  uploadButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textInverted,
  },
  registeredSubtext: {
    fontSize: theme.typography.fontSize.xs,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: theme.typography.fontWeight.medium,
  },
});
