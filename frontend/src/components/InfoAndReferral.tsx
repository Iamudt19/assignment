import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { theme } from '../theme/theme';

export const InfoAndReferral: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const referralUrl = 'https://feedants.com/c/classical-dance?ref=USER123';

  const handleCopy = () => {
    // In React Native / Expo environment, Clipboard is usually used.
    // We simulate copy and display visual feedback & Alert.
    setCopied(true);
    Alert.alert('Link Copied!', 'Referral URL copied to clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  const infoTiles = [
    { title: '💰 How will you receive prize money?', text: 'Direct bank transfer or UPI within 24 hours of result declaration.' },
    { title: '🔄 Refund Policy', text: 'Full refund provided if competition is cancelled by organizers.' },
    { title: '🔒 Secure Payments', text: 'Powered by Razorpay. 256-bit encryption for all transactions.' },
  ];

  return (
    <View style={styles.container}>
      {/* Notice Banner */}
      <View style={styles.disclaimerBanner}>
        <Text style={styles.disclaimerIcon}>⚠️</Text>
        <Text style={styles.disclaimerText}>
          <Text style={styles.boldText}>Disclaimer:</Text> Only contributions from paid participants will be considered for judging.
        </Text>
      </View>

      {/* Info Tiles */}
      <View style={styles.infoSection}>
        {infoTiles.map((tile, idx) => (
          <View key={idx} style={styles.infoTile}>
            <Text style={styles.infoTileTitle}>{tile.title}</Text>
            <Text style={styles.infoTileText}>{tile.text}</Text>
          </View>
        ))}
      </View>

      {/* Referral Box */}
      <View style={styles.referralCard}>
        <Text style={styles.referralTitle}>📢 Share & Earn Extra Rewards</Text>
        <Text style={styles.referralSubtitle}>
          Invite your friends to register using your unique referral code.
        </Text>

        <View style={styles.copyRow}>
          <Text style={styles.referralUrl} numberOfLines={1}>
            {referralUrl}
          </Text>

          <TouchableOpacity
            style={[styles.copyButton, copied && styles.copiedButton]}
            onPress={handleCopy}
            activeOpacity={0.8}
          >
            <Text style={styles.copyButtonText}>
              {copied ? 'Copied ✓' : 'Copy'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  disclaimerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
    gap: theme.spacing.sm,
  },
  disclaimerIcon: {
    fontSize: 16,
  },
  disclaimerText: {
    flex: 1,
    fontSize: theme.typography.fontSize.xs,
    color: '#92400E',
    lineHeight: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },
  infoSection: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  infoTile: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  infoTileTitle: {
    fontSize: theme.typography.fontSize.xs + 1,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  infoTileText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  referralCard: {
    backgroundColor: theme.colors.primarySurface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    marginTop: theme.spacing.lg,
  },
  referralTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  referralSubtitle: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
    marginBottom: theme.spacing.md,
  },
  copyRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingLeft: theme.spacing.md,
    alignItems: 'center',
    overflow: 'hidden',
  },
  referralUrl: {
    flex: 1,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  copyButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md + 2,
    paddingVertical: theme.spacing.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copiedButton: {
    backgroundColor: theme.colors.success,
  },
  copyButtonText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textInverted,
  },
});
