import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  getQuestionById,
  getAnswersFor,
  toggleFollow,
  upvoteQuestionOnce,
  upvoteAnswerOnce,
  Question as QType,
  Answer as AType,
} from '../data/store';
import { ButtonPrimary, ButtonSecondary, Card, Tag, MetaText } from '../ui/components';
import { theme } from '../ui/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Question'>;

const QuestionScreen: React.FC<Props> = ({ route, navigation }) => {
  const id = route.params?.id ?? 'unknown';
  const [q, setQ] = useState<QType | null>(null);
  const [answers, setAnswers] = useState<AType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const qd = await getQuestionById(id);
      setQ(qd);
      const ads = await getAnswersFor(id);
      setAnswers(ads);
    })();
  }, [id]);

  if (!q) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Question not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backBadge}><Text style={styles.backBadgeText}>←</Text></TouchableOpacity>
        <Text style={styles.brandWord}>LifeWeaver</Text>
        <View style={{ width: 28 }} />
      </View>
      <Card>
        <Tag text={q.topic} />
        <Text style={styles.title}>{q.title}</Text>
        <MetaText>By {q.author.name} • {q.answersCount} Answers • {q.upvotes} Upvotes</MetaText>
        <View style={{ height: theme.spacing(1) }} />
        <View style={styles.actionsRow}>
          <ButtonSecondary title={`Upvote (${q.upvotes})`} onPress={async () => {
          try {
            const res = await upvoteQuestionOnce(q.id);
            if (res?.changed) {
              setQ((prev) => (prev ? { ...prev, upvotes: prev.upvotes + 1 } : prev));
            }
          } catch (e: any) {
            Alert.alert('Upvote failed', e?.message || 'Please check Firestore rules for votes collection.');
          } finally {
            const qd = await getQuestionById(id);
            setQ(qd);
          }
          }} />
          <View style={{ width: theme.spacing(1) }} />
          <ButtonSecondary title={q.following ? 'Following' : 'Follow'} onPress={async () => { toggleFollow(q.id); const qd = await getQuestionById(id); setQ(qd); }} />
          <View style={{ width: theme.spacing(1) }} />
          <ButtonPrimary title="Answer" onPress={() => navigation.navigate('Compose', { mode: 'answer', questionId: q.id })} />
        </View>
      </Card>
      <View style={{ height: theme.spacing(2) }} />
      <Text style={styles.section}>Answers</Text>
      <FlatList
        data={answers}
        keyExtractor={(a) => a.id}
        renderItem={({ item }) => (
          <Card style={styles.answerCard}>
            <Text style={styles.answerAuthor}>{item.author.name}</Text>
            <Text style={styles.answerBody}>{item.body}</Text>
            <View style={{ height: theme.spacing(1) }} />
            <ButtonSecondary title={`Upvote (${item.upvotes})`} onPress={async () => {
              try {
                const res = await upvoteAnswerOnce(item.id);
                if (res?.changed) {
                  setAnswers((prev) => prev.map((a) => (a.id === item.id ? { ...a, upvotes: a.upvotes + 1 } : a)));
                }
              } catch (e: any) {
                Alert.alert('Upvote failed', e?.message || 'Please check Firestore rules for votes collection.');
              } finally {
                const ads = await getAnswersFor(id);
                setAnswers(ads);
              }
            }} />
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No answers yet. Be the first to answer.</Text>}
      />
      <View style={{ height: 12 }} />
      <ButtonSecondary title="Report" onPress={() => navigation.navigate('Report', { targetType: 'question', targetId: id })} />
    </View>
  );
};

const scriptFont = Platform.select({ web: '"Dancing Script", cursive', default: 'System' });

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing(2), backgroundColor: theme.colors.bg },
  topHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing(1) },
  backBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.card, alignItems: 'center', justifyContent: 'center' },
  backBadgeText: { color: theme.colors.text, fontWeight: '800' },
  brandWord: { color: theme.colors.text, fontSize: 28, fontWeight: '700', letterSpacing: 0.5, fontFamily: scriptFont as any },
  title: { ...theme.typography.h2 as any, marginBottom: 6 },
  actionsRow: { flexDirection: 'row', marginTop: theme.spacing(1) },
  section: { marginTop: theme.spacing(1), marginBottom: theme.spacing(1), ...(theme.typography.h2 as any) },
  answerCard: { marginBottom: theme.spacing(1) },
  answerAuthor: { fontWeight: '600', marginBottom: 6, color: theme.colors.text },
  answerBody: { color: theme.colors.text },
  empty: { color: theme.colors.subtext },
});

export default QuestionScreen;
