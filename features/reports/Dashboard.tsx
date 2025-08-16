import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Report = {
  id: string;
  title: string;
  status: 'draft' | 'completed';
};

const STORAGE_KEY = 'reports';

export default function Dashboard() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          setReports(JSON.parse(json));
        }
      } catch (e) {
        console.warn('Failed to load reports', e);
      }
    };
    load();
  }, []);

  const persist = async (next: Report[]) => {
    setReports(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn('Failed to save reports', e);
    }
  };

  const createReport = async () => {
    const newReport: Report = {
      id: Date.now().toString(),
      title: `Report ${reports.length + 1}`,
      status: 'draft',
    };
    await persist([...reports, newReport]);
  };

  const setStatus = async (id: string, status: Report['status']) => {
    const next = reports.map((r) => (r.id === id ? { ...r, status } : r));
    await persist(next);
  };

  const drafts = reports.filter((r) => r.status === 'draft');
  const completed = reports.filter((r) => r.status === 'completed');

  const resumeReport = (id: string) => console.log('resume', id);
  const previewReport = (id: string) => console.log('preview', id);
  const exportReport = (id: string) => console.log('export', id);
  const syncReport = (id: string) => console.log('sync', id);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Create Report" onPress={createReport} testID="create-report" />
      <Text accessibilityRole="header">Draft Reports</Text>
      <FlatList
        testID="draft-list"
        data={drafts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text>{item.title}</Text>
            <Button title="Resume" onPress={() => resumeReport(item.id)} />
            <Button
              title="Complete"
              onPress={() => setStatus(item.id, 'completed')}
              testID={`complete-${item.id}`}
            />
          </View>
        )}
      />
      <Text accessibilityRole="header">Completed Reports</Text>
      <FlatList
        testID="completed-list"
        data={completed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text>{item.title}</Text>
            <Button title="Preview" onPress={() => previewReport(item.id)} />
            <Button title="Export" onPress={() => exportReport(item.id)} />
            <Button title="Sync" onPress={() => syncReport(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
