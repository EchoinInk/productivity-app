import React from 'react';
import { View } from 'react-native';
import { useTaskStore } from '../../state/task-store';
import { useUiStore } from '../../state/ui-store';
import { TaskCard } from './TaskCard';
import { Screen } from '../../primitives/Screen';

export function TodayScreen() {
  const tasks = useTaskStore((state) => state.tasks);
  const lowEnergy = useUiStore((state) => state.lowEnergy);

  return (
    <Screen>
      <View>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} lowEnergy={lowEnergy} />
        ))}
      </View>
    </Screen>
  );
}
