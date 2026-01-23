import { Platform } from 'react-native';

const tintColorLight = '#0047AB';
const tintColorDark = '#60A5FA';

export const ShipraColors = {
  primary: '#0047AB',
  secondary: '#1A365D',
  accent: '#FFA500',
  success: '#10B981',
  destructive: '#EF4444',
  muted: '#94A3B8',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#1F2937',
  white: '#FFFFFF',
};

export const Colors = {
  light: {
    text: '#1F2937',
    background: '#F9FAFB',
    tint: tintColorLight,
    icon: '#64748B',
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorLight,
    ...ShipraColors,
  },
  dark: {
    text: '#F9FAFB',
    background: '#0F172A',
    tint: tintColorDark,
    icon: '#94A3B8',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorDark,
    ...ShipraColors,
    primary: '#60A5FA',
    background: '#0F172A',
    card: '#1E293B',
    text: '#F9FAFB',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
