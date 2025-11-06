export const theme = {
  colors: {
    bg: '#F7F6FB',            // soft lavender tint
    card: '#FFFFFF',
    text: '#1F2937',
    subtext: '#6B7280',
    primary: '#8B5CF6',       // violet (calming)
    primaryText: '#FFFFFF',
    border: '#E5E7EB',
    accent: '#22C55E',        // calming green
    danger: '#EF4444',
  },
  spacing: (n: number) => n * 8,
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
  },
  typography: {
    title: { fontSize: 22, fontWeight: '700' as const },
    h2: { fontSize: 18, fontWeight: '700' as const },
    body: { fontSize: 16 },
    meta: { fontSize: 13, color: '#6B7280' },
    tag: { fontSize: 12, color: '#FFFFFF', fontWeight: '600' as const },
  },
};
