import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, Animated } from 'react-native';
import { FooterBar, ButtonSecondary, ButtonPrimary, Card } from '../ui/components';
import { useAuth } from '../context/AuthContext';
import { theme } from '../ui/theme';
import { isSmartwatch, scaleFontSize } from '../ui/responsive';

const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const { signOut } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Profile Header */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <Text style={styles.title}>{isSmartwatch ? 'Profile' : 'Your Profile'}</Text>
            <Text style={styles.subtitle}>Manage your account</Text>
          </View>

          {/* Stats Card */}
          {!isSmartwatch && (
            <Card elevated style={styles.statsCard}>
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Questions</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>48</Text>
                  <Text style={styles.statLabel}>Answers</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>156</Text>
                  <Text style={styles.statLabel}>Upvotes</Text>
                </View>
              </View>
            </Card>
          )}

          {/* Resources Section */}
          <Text style={styles.section}>📚 Resources</Text>
          <Card elevated style={styles.resourceCard}>
            <Text 
              style={styles.link} 
              onPress={() => Linking.openURL('https://www.who.int/health-topics/cancer')}
            >
              🌐 WHO: Cancer Information
            </Text>
            <View style={styles.linkDivider} />
            <Text 
              style={styles.link} 
              onPress={() => Linking.openURL('https://www.cancerresearchuk.org/')}
            >
              🔬 Cancer Research UK
            </Text>
            <View style={styles.linkDivider} />
            <Text 
              style={styles.link} 
              onPress={() => Linking.openURL('https://www.nccn.org/patients')}
            >
              📖 NCCN Patient Guidelines
            </Text>
          </Card>

          {/* Quick Actions */}
          {!isSmartwatch && (
            <>
              <Text style={styles.section}>🤖 AI Assistant</Text>
              <Card elevated>
                <ButtonPrimary 
                  title="💬 Chat with AI Assistant" 
                  onPress={() => navigation.navigate('Chat')} 
                  style={styles.actionBtn}
                />
              </Card>
              
              <Text style={styles.section}>⚙️ Settings</Text>
              <Card elevated>
                <ButtonSecondary 
                  title="Edit Profile" 
                  onPress={() => {}} 
                  style={styles.actionBtn}
                />
                <View style={{ height: theme.spacing(1) }} />
                <ButtonSecondary 
                  title="Notifications" 
                  onPress={() => {}} 
                  style={styles.actionBtn}
                />
              </Card>
            </>
          )}

          <View style={{ height: theme.spacing(2) }} />
          <ButtonSecondary 
            title="🚪 Sign Out" 
            onPress={signOut} 
            size={isSmartwatch ? 'sm' : 'md'}
          />
          <View style={{ height: theme.spacing(8) }} />
        </Animated.View>
      </ScrollView>
      
      <FooterBar
        active="profile"
        onHome={() => navigation.navigate('Main')}
        onQA={() => navigation.navigate('Feed')}
        onChat={() => navigation.navigate('Chat')}
        onProfile={() => {}}
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
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: scaleFontSize(isSmartwatch ? 60 : 100),
    height: scaleFontSize(isSmartwatch ? 60 : 100),
    borderRadius: scaleFontSize(isSmartwatch ? 30 : 50),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    ...theme.shadows.lg,
  },
  avatarText: {
    fontSize: scaleFontSize(isSmartwatch ? 32 : 48),
  },
  title: { 
    fontSize: scaleFontSize(isSmartwatch ? 18 : 28), 
    fontWeight: '800', 
    marginBottom: theme.spacing(0.5), 
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: scaleFontSize(isSmartwatch ? 11 : 14),
    color: theme.colors.subtext,
  },
  
  // Stats Card
  statsCard: {
    marginBottom: theme.spacing(2),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border,
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
  },
  
  // Sections
  section: { 
    marginTop: theme.spacing(2), 
    marginBottom: theme.spacing(1), 
    fontWeight: '700', 
    color: theme.colors.text,
    fontSize: scaleFontSize(isSmartwatch ? 14 : 16),
  },
  
  // Resource Card
  resourceCard: {
    marginBottom: theme.spacing(2),
  },
  link: { 
    color: theme.colors.primary, 
    fontSize: scaleFontSize(isSmartwatch ? 12 : 16),
    fontWeight: '600',
    paddingVertical: theme.spacing(1),
  },
  linkDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  
  // Actions
  actionBtn: {
    width: '100%',
  },
});

export default ProfileScreen;
