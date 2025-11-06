 import React, { useState } from 'react';
 import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
 import { useAuth } from '../context/AuthContext';
 import { isConfigured } from '../firebase/app';

const LoginScreen: React.FC = () => {
  const { signInEmail, signUpEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<'signin' | 'signup' | 'google' | null>(null);
  const [error, setError] = useState<string>('');

  console.log('[UI] isConfigured =', isConfigured);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cancer Awareness Q&A</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <View style={styles.row}>
        <Button
          title={loading === 'signin' ? 'Signing in…' : 'Sign In'}
          disabled={!!loading}
          onPress={async () => {
            setError('');
            const emailTrimmed = email.trim();
            const validEmail = /.+@.+\..+/.test(emailTrimmed);
            if (!validEmail) {
              setError('Please enter a valid email address.');
              return;
            }
            if (!password) {
              setError('Please enter your password.');
              return;
            }
            setLoading('signin');
            try {
              console.log('[UI] Sign In pressed');
              alert('Sign In pressed');
              await signInEmail(emailTrimmed, password);
            } catch (e: any) {
              setError(e?.message || 'Failed to sign in');
            } finally {
              setLoading(null);
            }
          }}
        />
        <View style={{ width: 12 }} />
        <Button
          title={loading === 'signup' ? 'Signing up…' : 'Sign Up'}
          disabled={!!loading}
          onPress={async () => {
            setError('');
            const emailTrimmed = email.trim();
            const validEmail = /.+@.+\..+/.test(emailTrimmed);
            if (!validEmail) {
              setError('Please enter a valid email address.');
              return;
            }
            if (!password) {
              setError('Please enter a password.');
              return;
            }
            if (password.length < 6) {
              setError('Password must be at least 6 characters.');
              return;
            }
            setLoading('signup');
            try {
              console.log('[UI] Sign Up pressed');
              alert('Sign Up pressed');
              await signUpEmail(emailTrimmed, password);
            } catch (e: any) {
              setError(e?.message || 'Failed to sign up');
            } finally {
              setLoading(null);
            }
          }}
        />
      </View>
      <View style={{ height: 12 }} />
      <Button
        title={loading === 'google' ? 'Opening Google…' : 'Continue with Google'}
        disabled={!!loading}
        onPress={async () => {
          setError('');
          setLoading('google');
          try {
            console.log('[UI] Google pressed');
            alert('Google pressed');
            await signInWithGoogle();
          } catch (e: any) {
            setError(e?.message || 'Google sign-in failed');
          } finally {
            setLoading(null);
          }
        }}
      />
      {!!loading && (
        <View style={{ marginTop: 12, alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.disclaimer}>
        This app is for awareness only and does not replace professional medical advice.
      </Text>
      <Text style={styles.configHint}>Firebase configured: {String(isConfigured)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'center' },
  disclaimer: { marginTop: 16, color: '#666', textAlign: 'center' },
  error: { marginTop: 12, color: '#d00', textAlign: 'center' },
  configHint: { marginTop: 8, color: '#999', textAlign: 'center' },
});

export default LoginScreen;
