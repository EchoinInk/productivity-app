/**
 * Routine Actions Hook - Abstraction layer for routine actions
 * Follows Lumo's hook patterns for clean separation of concerns
 */

import { useCallback } from 'react';
import { useRoutinesStore } from '../store/routinesStore';
import { getTodayString } from '../utils/dateUtils';
import { calculateStepMomentum, calculateRoutineMomentum } from '../domain/routineScoring';
import { generateRecurringTasks } from '../domain/recurrenceEngine';
import { nanoid } from 'nanoid';
import type {
  RoutineTemplate,
  RoutineInstance,
  RoutineInstanceStep,
  FocusSession,
  RecurringTaskTemplate,
  PlanningRitual,
  RoutineStatus,
  FocusSessionStatus
} from '../types/routines.types';

export interface RoutineActions {
  // Template actions
  createRoutineTemplate: (template: Omit<RoutineTemplate, 'id' | 'createdAt'>) => void;
  updateRoutineTemplate: (id: string, updates: Partial<RoutineTemplate>) => void;
  deleteRoutineTemplate: (id: string) => void;
  
  // Routine instance actions
  startRoutine: (templateId: string, date?: string) => void;
  completeRoutineStep: (instanceId: string, stepId: string, notes?: string) => void;
  skipRoutineStep: (instanceId: string, stepId: string) => void;
  completeRoutine: (instanceId: string) => void;
  skipRoutine: (instanceId: string) => void;
  
  // Focus session actions
  startFocusSession: (session: Omit<FocusSession, 'id' | 'status'>) => void;
  endFocusSession: (sessionId: string, quality: 'low' | 'medium' | 'high') => void;
  cancelFocusSession: (sessionId: string) => void;
  
  // Recurring task actions
  createRecurringTaskTemplate: (template: Omit<RecurringTaskTemplate, 'id' | 'createdAt' | 'lastGenerated'>) => void;
  generateTodayRecurringTasks: () => void;
  completeRecurringTask: (taskId: string) => void;
  
  // Planning ritual actions
  createPlanningRitual: (ritual: Omit<PlanningRitual, 'id'>) => void;
  completePlanningRitual: (ritualId: string, date?: string) => void;
}

/**
 * Hook for routine actions with domain logic integration
 * Provides callbacks that handle business logic and state updates
 */
export const useRoutineActions = (): RoutineActions => {
  const store = useRoutinesStore();

  // Template actions
  const createRoutineTemplate = useCallback((template: Omit<RoutineTemplate, 'id' | 'createdAt'>) => {
    const newTemplate: RoutineTemplate = {
      ...template,
      id: nanoid(),
      createdAt: new Date().toISOString()
    };
    store.addRoutineTemplate(newTemplate);
  }, [store]);

  const updateRoutineTemplate = useCallback((id: string, updates: Partial<RoutineTemplate>) => {
    store.updateRoutineTemplate(id, updates);
  }, [store]);

  const deleteRoutineTemplate = useCallback((id: string) => {
    store.removeRoutineTemplate(id);
  }, [store]);

  // Routine instance actions
  const startRoutine = useCallback((templateId: string, date: string = getTodayString()) => {
    const state = store.state;
    const template = state.routineTemplates[templateId];
    if (!template) return;

    const instanceId = nanoid();
    const steps: RoutineInstanceStep[] = template.steps.map((step) => ({
      id: nanoid(),
      stepId: step.id,
      status: step.defaultCompleted ? 'completed' : 'pending',
      completedAt: step.defaultCompleted ? new Date().toISOString() : undefined,
      momentum: calculateStepMomentum(
        step.defaultCompleted ? 'completed' : 'pending',
        step.isOptional
      )
    }));

    const instance: RoutineInstance = {
      id: instanceId,
      templateId,
      date,
      type: template.type,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      steps,
      momentum: calculateRoutineMomentum({ steps } as RoutineInstance),
      insights: []
    };

    store.addRoutineInstance(instance);
  }, [store]);

  const completeRoutineStep = useCallback((instanceId: string, stepId: string, notes?: string) => {
    const state = store.state;
    const instance = state.todayRoutines[instanceId];
    if (!instance) return;

    const updatedSteps = instance.steps.map((step) =>
      step.stepId === stepId
        ? {
            ...step,
            status: 'completed' as RoutineStatus,
            completedAt: new Date().toISOString(),
            notes,
            momentum: 2 // Completed steps give 2 momentum points
          }
        : step
    );

    const updatedInstance = {
      ...instance,
      steps: updatedSteps,
      momentum: calculateRoutineMomentum({ ...instance, steps: updatedSteps })
    };

    store.updateRoutineInstance(instanceId, updatedInstance);
  }, [store]);

  const skipRoutineStep = useCallback((instanceId: string, stepId: string) => {
    const state = store.state;
    const instance = state.todayRoutines[instanceId];
    if (!instance) return;

    const updatedSteps = instance.steps.map((step) =>
      step.stepId === stepId
        ? {
            ...step,
            status: 'skipped' as RoutineStatus,
            momentum: 0
          }
        : step
    );

    store.updateRoutineInstance(instanceId, {
      ...instance,
      steps: updatedSteps
    });
  }, [store]);

  const completeRoutine = useCallback((instanceId: string) => {
    const state = store.state;
    const instance = state.todayRoutines[instanceId];
    if (!instance) return;

    const completedInstance = {
      ...instance,
      status: 'completed' as RoutineStatus,
      completedAt: new Date().toISOString()
    };

    // Move to history
    store.addToRoutineHistory(instance.date, completedInstance);
    store.removeRoutineInstance(instanceId);
  }, [store]);

  const skipRoutine = useCallback((instanceId: string) => {
    const state = store.state;
    const instance = state.todayRoutines[instanceId];
    if (!instance) return;

    const skippedInstance = {
      ...instance,
      status: 'skipped' as RoutineStatus,
      completedAt: new Date().toISOString()
    };

    // Move to history
    store.addToRoutineHistory(instance.date, skippedInstance);
    store.removeRoutineInstance(instanceId);
  }, [store]);

  // Focus session actions
  const startFocusSession = useCallback((session: Omit<FocusSession, 'id' | 'status'>) => {
    const newSession: FocusSession = {
      ...session,
      id: nanoid(),
      status: 'active',
      actualStart: new Date().toISOString(),
      momentum: 0
    };

    store.addFocusSession(newSession);
  }, [store]);

  const endFocusSession = useCallback((sessionId: string, quality: 'low' | 'medium' | 'high') => {
    const state = store.state;
    const session = state.focusSessions[sessionId];
    if (!session) return;

    const completedSession = {
      ...session,
      status: 'completed' as FocusSessionStatus,
      actualEnd: new Date().toISOString(),
      quality,
      momentum: quality === 'high' ? 8 : quality === 'medium' ? 5 : 3
    };

    // Move to history
    const today = getTodayString();
    store.addToFocusHistory(today, completedSession);
    store.removeFocusSession(sessionId);
  }, [store]);

  const cancelFocusSession = useCallback((sessionId: string) => {
    const state = store.state;
    const session = state.focusSessions[sessionId];
    if (!session) return;

    const cancelledSession = {
      ...session,
      status: 'cancelled' as FocusSessionStatus,
      actualEnd: new Date().toISOString(),
      momentum: 0
    };

    // Move to history
    const today = getTodayString();
    store.addToFocusHistory(today, cancelledSession);
    store.removeFocusSession(sessionId);
  }, [store]);

  // Recurring task actions
  const createRecurringTaskTemplate = useCallback((template: Omit<RecurringTaskTemplate, 'id' | 'createdAt' | 'lastGenerated'>) => {
    const newTemplate: RecurringTaskTemplate = {
      ...template,
      id: nanoid(),
      createdAt: new Date().toISOString(),
      lastGenerated: new Date().toISOString()
    };

    store.addRecurringTaskTemplate(newTemplate);
  }, [store]);

  const generateTodayRecurringTasks = useCallback(() => {
    const state = store.state;
    const templates = Object.values(state.recurringTaskTemplates)
      .filter(template => template.isActive);

    const today = getTodayString();
    const newTasks = generateRecurringTasks(templates, today);

    newTasks.forEach(task => {
      store.addRecurringTaskInstance(task);
    });
  }, [store]);

  const completeRecurringTask = useCallback((taskId: string) => {
    const completedTask = {
      ...store.state.recurringTasks[taskId],
      status: 'completed' as RoutineStatus,
      completedAt: new Date().toISOString()
    };

    store.updateRecurringTaskInstance(taskId, completedTask);
  }, [store]);

  // Planning ritual actions
  const createPlanningRitual = useCallback((ritual: Omit<PlanningRitual, 'id'>) => {
    const newRitual: PlanningRitual = {
      ...ritual,
      id: nanoid()
    };

    store.addPlanningRitual(newRitual);
  }, [store]);

  const completePlanningRitual = useCallback((ritualId: string, date: string = getTodayString()) => {
    store.updatePlanningRitual(ritualId, { lastCompleted: date });
  }, [store]);

  return {
    createRoutineTemplate,
    updateRoutineTemplate,
    deleteRoutineTemplate,
    startRoutine,
    completeRoutineStep,
    skipRoutineStep,
    completeRoutine,
    skipRoutine,
    startFocusSession,
    endFocusSession,
    cancelFocusSession,
    createRecurringTaskTemplate,
    generateTodayRecurringTasks,
    completeRecurringTask,
    createPlanningRitual,
    completePlanningRitual
  };
};
