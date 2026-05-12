import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { RootNavigation } from '../navigation/root-navigation';
import { loadTasksFromStorage } from '../state/task-store';
import { loadSession } from '../state/session-store';

export default function App() {
  useEffect(() => {
    loadTasksFromStorage();
    loadSession();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootNavigation />
    </SafeAreaView>
  );
}
