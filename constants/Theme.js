// constants/Theme.js
export const COLORS = {
  // Palette sombre principale
  background: '#0B1426',
  surface: '#1A2332',
  card: '#2A3441',
  primary: '#4A8EF7', // Bleu moderne
  primaryDark: '#3B7BE8',
  secondary: '#6C757D',
  success: '#00C851',
  warning: '#FFB84D',
  error: '#FF4444',
  
  // Textes
  textPrimary: '#FFFFFF',
  textSecondary: '#B0BEC5',
  textMuted: '#78909C',
  
  // Bordures et séparateurs
  border: '#37474F',
  divider: '#455A64',
  
  // États
  hover: '#2C3E50',
  pressed: '#34495E',
  disabled: '#546E7A'
};

export const SIZES = {
  // Espacements
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Rayons de bordure
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    xl: 24
  },
  
  // Tailles de police
  font: {
    small: 12,
    body: 14,
    subtitle: 16,
    title: 18,
    heading: 24,
    display: 32
  }
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8
  }
};
