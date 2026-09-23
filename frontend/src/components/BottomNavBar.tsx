import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

interface BottomNavBarProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = 'Competitions',
  onTabPress,
}) => {
  const tabs = [
    { name: 'Home', icon: '🏠' },
    { name: 'Explore', icon: '🔍' },
    { name: 'Add', icon: '➕', isCenter: true },
    { name: 'Competitions', icon: '🏆' },
    { name: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.navBar}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;

        if (tab.isCenter) {
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.centerTabContainer}
              onPress={() => onTabPress && onTabPress(tab.name)}
              activeOpacity={0.8}
            >
              <View style={styles.centerTabButton}>
                <Text style={styles.centerIcon}>{tab.icon}</Text>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => onTabPress && onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, isActive && styles.activeTabIcon]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 18,
    color: theme.colors.textMuted,
    marginBottom: 2,
  },
  activeTabIcon: {
    color: theme.colors.primary,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textMuted,
  },
  activeTabLabel: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  centerTabContainer: {
    top: -12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTabButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: theme.colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  centerIcon: {
    fontSize: 20,
    color: theme.colors.textInverted,
  },
});
