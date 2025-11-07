import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import FeedScreen from '../screens/FeedScreen';
import QuestionScreen from '../screens/QuestionScreen';
import ComposeScreen from '../screens/ComposeScreen';
import ProfileScreen from '../screens/ProfileScreen';
// Resources merged into Profile
import ReportScreen from '../screens/ReportScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import ChatScreen from '../screens/ChatScreen';
import FileUploadScreen from '../screens/FileUploadScreen';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Feed: undefined;
  Chat: undefined;
  FileUpload: undefined;
  Question: { id: string } | undefined;
  Compose: { mode: 'question' | 'answer'; questionId?: string } | undefined;
  Profile: { userId?: string } | undefined;
  Report: { targetType: 'question' | 'answer' | 'comment'; targetId: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
// Simple stack: Main (primary), Feed (secondary), others pushed

interface Props {
  isAuthenticated: boolean;
}

const AppNavigator: React.FC<Props> = ({ isAuthenticated }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Feed" component={FeedScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="FileUpload" component={FileUploadScreen} />
            <Stack.Screen name="Question" component={QuestionScreen} />
            <Stack.Screen name="Compose" component={ComposeScreen} />
            <Stack.Screen name="Report" component={ReportScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
