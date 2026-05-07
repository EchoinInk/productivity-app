/**
 * Routine Data Hook - Abstraction layer for routine data access
 * Follows Lumo's hook patterns for clean separation of concerns
 */

import { useMemo } from 'react';
import { useRoutinesStore } from '../store/routinesStore';
import { getTodayString } from '../utils/dateUtils';
import { 
  generateCompletionStats
} from '../domain/routineScoring';
import {
  getTasksDueToday,
  getOverdueTasks
} from '../domain/recurrenceEngine';
import type {
  RoutineInstance,
  RoutineProgress,
  RoutineCompletionStats,
  RecurringTaskInstance,
  FocusSession,
  RoutineTemplate
} from '../types/routines.types';

export interface RoutineData {
  // Today's data
  todayRoutines: RoutineInstance[];
  todayProgress: RoutineProgress;
  todayRecurringTasks: RecurringTaskInstance[];
  overdueTasks: RecurringTaskInstance[];
  
  // Templates
  activeTemplates: RoutineTemplate[];
  
  // Focus sessions
  activeFocusSession: FocusSession | undefined;
  todayFocusSessions: FocusSession[];
  
  // Historical data
  allHistory: RoutineInstance[];
  completionStats: RoutineCompletionStats;
  
  // Computed values
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

/**
 * Hook for accessing routine data with computed properties
 * Provides memoized calculations to prevent unnecessary re-renders
 */
export const useRoutineData = (): RoutineData => {
  const state = useRoutinesStore((store) => store.state);

  // Memoized today's routines
  const todayRoutines = useMemo(() => {
    const today = getTodayString();
    return Object.values(state.todayRoutines)
      .filter(routine => routine.date === today);
  }, [state.todayRoutines]);

  // Memoized today's progress
  const todayProgress = useMemo(() => {
    const totalRoutines = todayRoutines.length;
    const completedRoutines = todayRoutines.filter(r => r.status === 'completed').length;
    const inProgressRoutines = todayRoutines.filter(r => r.status === 'in_progress').length;
    const percentage = totalRoutines > 0 ? Math.round((completedRoutines / totalRoutines) * 100) : 0;
    const momentumContribution = todayRoutines.reduce((sum, r) => sum + r.momentum, 0);

    const activeFocusSession = Object.values(state.focusSessions)
      .find(session => session.status === 'active');

    return {
      totalRoutines,
      completedRoutines,
      inProgressRoutines,
      percentage,
      momentumContribution,
      currentFocusSession: activeFocusSession
    };
  }, [todayRoutines, state.focusSessions]);

  // Memoized recurring tasks
  const todayRecurringTasks = useMemo(() => {
    const allTasks = Object.values(state.recurringTasks);
    return getTasksDueToday(allTasks);
  }, [state.recurringTasks]);

  const overdueTasks = useMemo(() => {
    const allTasks = Object.values(state.recurringTasks);
    return getOverdueTasks(allTasks);
  }, [state.recurringTasks]);

  // Memoized active templates
  const activeTemplates = useMemo(() => {
    return Object.values(state.routineTemplates)
      .filter(template => template.isActive);
  }, [state.routineTemplates]);

  // Memoized focus sessions
  const activeFocusSession = useMemo(() => {
    return Object.values(state.focusSessions)
      .find(session => session.status === 'active');
  }, [state.focusSessions]);

  const todayFocusSessions = useMemo(() => {
    const today = getTodayString();
    return Object.values(state.focusSessions)
      .filter(session => {
        const sessionDate = session.actualStart?.split('T')[0] || session.scheduledStart.split('T')[0];
        return sessionDate === today;
      });
  }, [state.focusSessions]);

  // Memoized historical data
  const allHistory = useMemo(() => {
    return Object.values(state.routineHistory).flat();
  }, [state.routineHistory]);

  // Memoized completion stats
  const completionStats = useMemo(() => {
    return generateCompletionStats(allHistory);
  }, [allHistory]);

  return {
    todayRoutines,
    todayProgress,
    todayRecurringTasks,
    overdueTasks,
    activeTemplates,
    activeFocusSession,
    todayFocusSessions,
    allHistory,
    completionStats,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated
  };
};
