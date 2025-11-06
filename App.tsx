 import React from 'react';
 import { StatusBar } from 'expo-status-bar';
 import { ActivityIndicator, View } from 'react-native';
 import AppNavigator from './src/navigation/AppNavigator';
 import { AuthProvider, useAuth } from './src/context/AuthContext';

function Root() {
  const { user, initializing } = useAuth();
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator isAuthenticated={!!user} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
