<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image, ActivityIndicator, Linking } from 'react-native';
import { ButtonPrimary, ButtonSecondary, FooterBar, Card } from '../ui/components';
import { theme } from '../ui/theme';
import { fetchNews, type NewsItem } from '../services/news';

const MainScreen: React.FC<any> = ({ navigation }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState<boolean>(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setNewsLoading(true);
      setNewsError(null);
      try {
        const items = await fetchNews({
          qInTitle: 'cancer',
          pageSize: 8,
          language: 'en',
          q: 'treatment OR screening OR research OR nutrition',
          domains: [
            'cancer.gov',
            'who.int',
            'medicalnewstoday.com',
            'healthline.com',
            'nih.gov',
            'nature.com',
          ],
        });
        if (!mounted) return;
        setNews(items || []);
      } catch (e: any) {
        if (!mounted) return;
        setNewsError(e?.message ?? 'Failed to load news');
      } finally {
        if (mounted) setNewsLoading(false);
      }
    };
    run();
    return () => { mounted = false; };
  }, []);

  const openUrl = (url?: string) => {
    if (!url) return;
    Linking.openURL(url).catch(() => {});
  };

  const newsScrollRef = useRef<ScrollView | null>(null);
  const CARD_W = 220;
  const GAP = 12;
  useEffect(() => {
    if (!news || news.length <= 3) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % news.length;
      const x = i * (CARD_W + GAP);
      newsScrollRef.current?.scrollTo({ x, animated: true });
    }, 3000);
    return () => clearInterval(id);
  }, [news]);
=======
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
>>>>>>> 36254efb4b5de0f95950421a6b05dd3e27e2aa08

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
<<<<<<< HEAD
        </View>
      </ImageBackground>

      <Card style={{ marginTop: theme.spacing(2) }}>
        <Text style={{ fontWeight: '800', marginBottom: theme.spacing(1) }}>Personalized wellness</Text>
        <Text style={{ color: theme.colors.subtext, marginBottom: theme.spacing(1) }}>Open the wellness planner to answer a few questions and see your plan.</Text>
        <ButtonPrimary title="Open wellness planner" onPress={() => navigation.navigate('Wellness')} />
      </Card>

      <Card style={{ marginTop: theme.spacing(2) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontWeight: '800' }}>Health News</Text>
          <Text style={{ color: theme.colors.subtext, fontSize: 12 }}>Live</Text>
        </View>
        {newsLoading ? (
          <View style={{ paddingVertical: 12 }}>
            <ActivityIndicator />
          </View>
        ) : newsError ? (
          <Text style={{ color: '#dc2626' }}>{newsError}</Text>
        ) : (
          <ScrollView ref={newsScrollRef} horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {news.map((n, idx) => (
                <TouchableOpacity key={idx} onPress={() => openUrl(n.url)} activeOpacity={0.9} style={styles.newsCard}>
                  <Image source={{ uri: n.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop' }} style={styles.newsImg} />
                  <View style={{ padding: 8 }}>
                    <Text numberOfLines={2} style={styles.newsTitle}>{n.title}</Text>
                    <Text numberOfLines={1} style={styles.newsMeta}>{n.source || 'Source'}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </Card>

=======
        )}
      </ScrollView>
      
>>>>>>> 36254efb4b5de0f95950421a6b05dd3e27e2aa08
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
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: theme.colors.bg, padding: theme.spacing(2) },
  hero: { flex: 1, justifyContent: 'flex-end' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.35)', padding: theme.spacing(2), borderRadius: theme.radius.lg },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing(1) },
  logo: { width: 32, height: 32, borderRadius: 16, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: theme.colors.primaryText, fontWeight: '800' },
  brand: { marginLeft: 8, color: '#fff', fontWeight: '700' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800', marginTop: theme.spacing(1) },
  subtitle: { color: '#E5E7EB', marginTop: 6 },
  ctaRow: { flexDirection: 'row', marginTop: theme.spacing(2), marginBottom: theme.spacing(1) },
  input: { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.sm, padding: 10, color: theme.colors.text },
  newsCard: { width: 220, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.card, borderRadius: theme.radius.md },
  newsImg: { width: '100%', height: 110, borderTopLeftRadius: theme.radius.md, borderTopRightRadius: theme.radius.md },
  newsTitle: { color: theme.colors.text, fontWeight: '700' },
  newsMeta: { color: theme.colors.subtext, marginTop: 4, fontSize: 12 },
=======
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
>>>>>>> 36254efb4b5de0f95950421a6b05dd3e27e2aa08
});

export default MainScreen;
