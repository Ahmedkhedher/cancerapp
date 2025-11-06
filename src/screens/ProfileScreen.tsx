import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { FooterBar, ButtonSecondary } from '../ui/components';
import { useAuth } from '../context/AuthContext';
import { theme } from '../ui/theme';

const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.section}>Resources</Text>
      <View style={styles.card}>
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.who.int/health-topics/cancer')}>WHO: Cancer</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.cancerresearchuk.org/')}>Cancer Research UK</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.nccn.org/patients')}>NCCN Guidelines for Patients</Text>
      </View>
      <View style={{ flex: 1 }} />
      <ButtonSecondary title="Sign out" onPress={signOut} />
      <View style={{ height: theme.spacing(1) }} />
      <FooterBar
        active="profile"
        onHome={() => navigation.navigate('Main')}
        onQA={() => navigation.navigate('Feed')}
        onProfile={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing(2), backgroundColor: theme.colors.bg },
  title: { fontSize: 20, fontWeight: '700', marginBottom: theme.spacing(1), color: theme.colors.text },
  section: { marginTop: theme.spacing(2), marginBottom: theme.spacing(1), fontWeight: '700', color: theme.colors.text },
  card: { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, padding: theme.spacing(2) },
  link: { color: theme.colors.primary, marginBottom: 8 },
});

export default ProfileScreen;
