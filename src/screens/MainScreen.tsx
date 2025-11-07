import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, ScrollView } from 'react-native';
import { ButtonPrimary, ButtonSecondary, FooterBar } from '../ui/components';
import { theme } from '../ui/theme';
import { isSmartwatch, scaleFontSize } from '../ui/responsive';

const MainScreen: React.FC<any> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1600&auto=format&fit=crop' }}
          style={styles.hero}
          imageStyle={{ borderRadius: theme.radius.lg }}
        >
          <View style={styles.overlay}>
            <Animated.View style={{ 
              opacity: fadeAnim, 
              transform: [{ translateY: slideAnim }] 
            }}>
              <View style={styles.brandRow}>
                <View style={styles.logo}><Text style={styles.logoText}>LW</Text></View>
                <Text style={styles.brand}>LifeWeaver</Text>
              </View>
              <Text style={styles.title}>Your cancer{'\n'}awareness companion</Text>
              <Text style={styles.subtitle}>
                {isSmartwatch 
                  ? 'Learn, ask & support' 
                  : 'Learn, ask, and support each other with trusted information.'}
              </Text>
              <View style={styles.ctaRow}>
                <ButtonPrimary 
                  title={isSmartwatch ? "Q&A" : "Explore Q&A"} 
                  onPress={() => navigation.navigate('Feed')}
                  size={isSmartwatch ? 'sm' : 'md'}
                  style={styles.ctaBtn}
                />
                {!isSmartwatch && (
                  <>
                    <View style={{ width: theme.spacing(1) }} />
                    <ButtonSecondary 
                      title="💬 AI Chat" 
                      onPress={() => navigation.navigate('Chat')}
                      style={styles.ctaBtn}
                    />
                  </>
                )}
              </View>
            </Animated.View>
          </View>
        </ImageBackground>
        
        {/* Quick Stats Section */}
        {!isSmartwatch && (
          <View style={styles.statsSection}>
            <View style={[styles.statCard, theme.shadows.sm]}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
            <View style={[styles.statCard, theme.shadows.sm]}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Answers</Text>
            </View>
            <View style={[styles.statCard, theme.shadows.sm]}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View>
        )}
      </ScrollView>
      
      <FooterBar
        active="home"
        onHome={() => {}}
        onQA={() => navigation.navigate('Feed')}
        onChat={() => navigation.navigate('Chat')}
        onProfile={() => navigation.navigate('Profile', {})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.bg,
  },
  scrollContent: {
    padding: theme.spacing(isSmartwatch ? 1 : 2),
    flexGrow: 1,
  },
  hero: { 
    minHeight: isSmartwatch ? 180 : 380,
    justifyContent: 'flex-end',
  },
  overlay: { 
    backgroundColor: theme.colors.overlay, 
    padding: theme.spacing(isSmartwatch ? 1.5 : 3), 
    borderRadius: theme.radius.lg,
  },
  brandRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: theme.spacing(1),
  },
  logo: { 
    width: scaleFontSize(isSmartwatch ? 24 : 40), 
    height: scaleFontSize(isSmartwatch ? 24 : 40), 
    borderRadius: scaleFontSize(isSmartwatch ? 12 : 20), 
    backgroundColor: theme.colors.primary, 
    alignItems: 'center', 
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  logoText: { 
    color: theme.colors.primaryText, 
    fontWeight: '800',
    fontSize: scaleFontSize(isSmartwatch ? 12 : 18),
  },
  brand: { 
    marginLeft: theme.spacing(1), 
    color: '#fff', 
    fontWeight: '800',
    fontSize: scaleFontSize(isSmartwatch ? 14 : 20),
    letterSpacing: 0.5,
  },
  title: { 
    color: '#fff', 
    fontSize: scaleFontSize(isSmartwatch ? 16 : 32), 
    fontWeight: '800', 
    marginTop: theme.spacing(1),
    lineHeight: scaleFontSize(isSmartwatch ? 20 : 40),
  },
  subtitle: { 
    color: '#E5E7EB', 
    marginTop: theme.spacing(isSmartwatch ? 0.5 : 1),
    fontSize: scaleFontSize(isSmartwatch ? 11 : 16),
    lineHeight: scaleFontSize(isSmartwatch ? 14 : 22),
  },
  ctaRow: { 
    flexDirection: 'row', 
    marginTop: theme.spacing(2), 
    marginBottom: theme.spacing(0.5),
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  ctaBtn: {
    flex: isSmartwatch ? 1 : 0,
  },
  
  // Stats section
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    gap: theme.spacing(1.5),
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statNumber: {
    fontSize: scaleFontSize(24),
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: theme.spacing(0.5),
  },
  statLabel: {
    fontSize: scaleFontSize(12),
    color: theme.colors.subtext,
    fontWeight: '600',
  },
});

export default MainScreen;
