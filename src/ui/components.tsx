import React, { useRef } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, GestureResponderEvent, ViewStyle, Animated } from 'react-native';
import { theme } from './theme';

export const ButtonPrimary: React.FC<{ title: string; onPress?: (e: GestureResponderEvent) => void; style?: ViewStyle; disabled?: boolean }>
  = ({ title, onPress, style, disabled }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, friction: 5 }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        disabled={disabled}
        style={[styles.btn, { backgroundColor: disabled ? '#9ca3af' : theme.colors.primary }, style]}
        activeOpacity={0.9}
      >
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const ButtonSecondary: React.FC<{ title: string; onPress?: (e: GestureResponderEvent) => void; style?: ViewStyle; disabled?: boolean }>
  = ({ title, onPress, style, disabled }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, friction: 5 }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        disabled={disabled}
        style={[styles.btn, { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border }, style]}
        activeOpacity={0.9}
      >
        <Text style={[styles.btnText, { color: theme.colors.text }]}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const Tag: React.FC<{ text: string }>= ({ text }) => (
  <View style={styles.tag}><Text style={styles.tagText}>{text}</Text></View>
);

export const MetaText: React.FC<{ children: React.ReactNode }>= ({ children }) => (
  <Text style={styles.meta}>{children}</Text>
);

export const Card: React.FC<{ children: React.ReactNode; style?: ViewStyle }>= ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

export const FooterBar: React.FC<{
  active?: 'home' | 'qa' | 'profile';
  onHome: () => void;
  onQA: () => void;
  onProfile: () => void;
}> = ({ active, onHome, onQA, onProfile }) => (
  <View style={styles.footerBar}>
    <TouchableOpacity onPress={onHome} style={styles.footerBtn}>
      <Text style={[styles.footerIcon, active==='home' && styles.footerIconActive]}>🏠</Text>
      <Text style={[styles.footerLbl, active==='home' && styles.footerLblActive]}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onQA} style={styles.footerBtn}>
      <Text style={[styles.footerIcon, active==='qa' && styles.footerIconActive]}>❓</Text>
      <Text style={[styles.footerLbl, active==='qa' && styles.footerLblActive]}>Q&A</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onProfile} style={styles.footerBtn}>
      <Text style={[styles.footerIcon, active==='profile' && styles.footerIconActive]}>👤</Text>
      <Text style={[styles.footerLbl, active==='profile' && styles.footerLblActive]}>Profile</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: theme.radius.sm,
  },
  btnText: {
    color: theme.colors.primaryText,
    fontWeight: '700',
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },
  tagText: {
    ...theme.typography.tag as any,
  },
  meta: {
    ...theme.typography.meta as any,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing(2),
  },
  footerBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 8,
    justifyContent: 'space-around',
  },
  footerBtn: { alignItems: 'center' },
  footerIcon: { fontSize: 18, color: theme.colors.subtext },
  footerIconActive: { color: theme.colors.primary },
  footerLbl: { fontSize: 12, color: theme.colors.subtext },
  footerLblActive: { color: theme.colors.primary, fontWeight: '700' },
});
