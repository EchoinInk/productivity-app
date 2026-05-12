import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '../../domains/tasks';
import { Pressable } from '../../primitives/Pressable';

interface TaskCardProps {
  task: Task;
  lowEnergy: boolean;
}

export function TaskCard({ task, lowEnergy }: TaskCardProps) {
  const handlePress = () => {
    // TODO: Complete task
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.card, lowEnergy && styles.compressed]}>
        <Text>{task.text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderRadius: 8,
  },
  compressed: {
    padding: 8,
  },
});
