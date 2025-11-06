import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { ButtonPrimary, ButtonSecondary, FooterBar } from '../ui/components';
import { theme } from '../ui/theme';

const MainScreen: React.FC<any> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1600&auto=format&fit=crop' }}
        style={styles.hero}
        imageStyle={{ borderRadius: theme.radius.lg }}
      >
        <View style={styles.overlay}>
          <View style={styles.brandRow}>
            <View style={styles.logo}><Text style={styles.logoText}>LW</Text></View>
            <Text style={styles.brand}>LifeWeaver</Text>
          </View>
          <Text style={styles.title}>Your cancer awareness companion</Text>
          <Text style={styles.subtitle}>Learn, ask, and support each other with trusted information.</Text>
          <View style={styles.ctaRow}>
            <ButtonPrimary title="Explore Q&A" onPress={() => navigation.navigate('Feed')} />
            <View style={{ width: theme.spacing(1) }} />
            <ButtonSecondary title="Ask a Question" onPress={() => navigation.navigate('Compose', { mode: 'question' })} />
          </View>
        </View>
      </ImageBackground>
      <FooterBar
        active="home"
        onHome={() => {}}
        onQA={() => navigation.navigate('Feed')}
        onProfile={() => navigation.navigate('Profile', {})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default MainScreen;
