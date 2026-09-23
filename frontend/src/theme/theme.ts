export const theme = {
  colors: {
    primary: '#007A78',        // Feedants Teal
    primaryDark: '#005957',    // Darker Teal for pressed states
    primaryLight: '#E6F2F2',   // Soft Teal for chips/badges
    primarySurface: '#F2F8F8', // Very light teal background

    background: '#F8FAFC',     // Screen background
    surface: '#FFFFFF',        // Card background
    surfaceSecondary: '#F1F5F9',

    textPrimary: '#0F172A',    // Dark navy/charcoal for headings
    textSecondary: '#475569',  // Slate gray for body
    textMuted: '#94A3B8',      // Light gray for secondary metadata
    textInverted: '#FFFFFF',

    border: '#E2E8F0',
    borderDark: '#CBD5E1',

    // Status colors
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',

    // Badges & Ranks
    gold: '#F59E0B',
    silver: '#64748B',
    bronze: '#B45309',

    shadowColor: '#0F172A',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },

  typography: {
    fontSize: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 18,
      xl: 22,
      xxl: 26,
    },
    fontWeight: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
  },
};
