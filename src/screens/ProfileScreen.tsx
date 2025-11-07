<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FooterBar, ButtonSecondary, ButtonPrimary, Card } from '../ui/components';
import { useAuth } from '../context/AuthContext';
import { theme } from '../ui/theme';
import { loadProfile, saveProfile, uploadAvatarAsync } from '../services/profile';

const AVATARS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527980969970-0c9da7b3b6c1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop',
];

const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const { signOut } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await loadProfile();
      if (p) {
        setDisplayName(p.displayName || 'Member');
        setPhotoURL(p.photoURL);
      }
    })();
  }, []);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== 'granted') {
      return Alert.alert('Permission required', 'Please allow photo library access to upload an avatar.');
    }
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!res.canceled && res.assets?.[0]?.uri) {
      try {
        setSaving(true);
        const url = await uploadAvatarAsync(res.assets[0].uri);
        setPhotoURL(url);
      } catch (e: any) {
        Alert.alert('Upload failed', e?.message ?? 'Could not upload image');
      } finally {
        setSaving(false);
      }
    }
  };

  const onSave = async () => {
    try {
      setSaving(true);
      await saveProfile({ displayName: displayName.trim() || 'Member', photoURL });
      Alert.alert('Saved', 'Your profile has been updated.');
    } catch (e: any) {
      Alert.alert('Save failed', e?.message ?? 'Unknown error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>

      <Card style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={pickImage} activeOpacity={0.9}>
          <Image source={{ uri: photoURL || AVATARS[0] }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={{ color: theme.colors.subtext, marginTop: 6 }}>Tap image to upload</Text>
        <View style={{ height: theme.spacing(1) }} />
        <TextInput
          placeholder="Display name"
          placeholderTextColor={theme.colors.subtext}
          value={displayName}
          onChangeText={setDisplayName}
          style={styles.input}
        />
        <View style={{ height: theme.spacing(1) }} />
        <ButtonPrimary title={saving ? 'Saving…' : 'Save profile'} onPress={onSave} disabled={saving} />
      </Card>

      <Text style={styles.section}>Choose an avatar</Text>
      <View style={styles.avatarGrid}>
        {AVATARS.map((u, i) => (
          <TouchableOpacity key={i} onPress={() => setPhotoURL(u)}>
            <Image source={{ uri: u }} style={[styles.avatarSmall, photoURL === u && styles.avatarSmallActive]} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Resources</Text>
      <View style={styles.card}>
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.who.int/health-topics/cancer')}>WHO: Cancer</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.cancerresearchuk.org/')}>Cancer Research UK</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.nccn.org/patients')}>NCCN Guidelines for Patients</Text>
      </View>

      {saving && (
        <View style={{ paddingVertical: 8 }}>
          <ActivityIndicator />
        </View>
      )}

      <View style={{ flex: 1 }} />
      <ButtonSecondary title="Sign out" onPress={signOut} />
      <View style={{ height: theme.spacing(1) }} />
=======
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
      
>>>>>>> 36254efb4b5de0f95950421a6b05dd3e27e2aa08
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
<<<<<<< HEAD
  container: { flex: 1, padding: theme.spacing(2), backgroundColor: theme.colors.bg },
  title: { fontSize: 20, fontWeight: '700', marginBottom: theme.spacing(1), color: theme.colors.text },
  section: { marginTop: theme.spacing(2), marginBottom: theme.spacing(1), fontWeight: '700', color: theme.colors.text },
  card: { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, padding: theme.spacing(2) },
  link: { color: theme.colors.primary, marginBottom: 8 },
  input: { width: '100%', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.sm, padding: 10, color: theme.colors.text, backgroundColor: theme.colors.card },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: theme.colors.border },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  avatarSmall: { width: 56, height: 56, borderRadius: 28, marginRight: 8, marginBottom: 8, borderWidth: 2, borderColor: 'transparent' },
  avatarSmallActive: { borderColor: theme.colors.primary },
=======
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
>>>>>>> 36254efb4b5de0f95950421a6b05dd3e27e2aa08
});

export default ProfileScreen;
