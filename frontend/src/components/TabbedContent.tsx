import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import { CompetitionTabs } from '../types';

interface TabbedContentProps {
  tabs: CompetitionTabs;
}

type TabType = 'about' | 'judgingParameters' | 'rules';

export const TabbedContent: React.FC<TabbedContentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [expanded, setExpanded] = useState<boolean>(false);

  const getTabContent = () => {
    switch (activeTab) {
      case 'about':
        return tabs.about;
      case 'judgingParameters':
        return tabs.judgingParameters;
      case 'rules':
        return tabs.rules;
      default:
        return '';
    }
  };

  const contentText = getTabContent();
  const shouldShowToggle = contentText.length > 180;
  const displayText = expanded || !shouldShowToggle
    ? contentText
    : contentText.slice(0, 180) + '...';

  return (
    <View style={styles.card}>
      {/* Tabs Bar */}
      <View style={styles.tabsHeader}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'about' && styles.activeTabButton]}
          onPress={() => {
            setActiveTab('about');
            setExpanded(false);
          }}
        >
          <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
            About
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'judgingParameters' && styles.activeTabButton]}
          onPress={() => {
            setActiveTab('judgingParameters');
            setExpanded(false);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'judgingParameters' && styles.activeTabText,
            ]}
          >
            Judging Criteria
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'rules' && styles.activeTabButton]}
          onPress={() => {
            setActiveTab('rules');
            setExpanded(false);
          }}
        >
          <Text style={[styles.tabText, activeTab === 'rules' && styles.activeTabText]}>
            Rules & Eligibility
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Body */}
      <View style={styles.contentBody}>
        <Text style={styles.bodyText}>{displayText}</Text>

        {shouldShowToggle && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setExpanded(!expanded)}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleText}>
              {expanded ? 'View Less ▲' : 'View More ▼'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  tabsHeader: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceSecondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  contentBody: {
    padding: theme.spacing.lg,
  },
  bodyText: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: 22,
    color: theme.colors.textSecondary,
  },
  toggleButton: {
    marginTop: theme.spacing.md,
    alignSelf: 'flex-start',
  },
  toggleText: {
    fontSize: theme.typography.fontSize.xs + 1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
});
