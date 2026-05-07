import type { DailyScore } from "./types/types";
import type { StreakData, StreakType } from "./types/types";
import { getToday, parseDateKey } from "@/shared/lib/date";

/**
 * Helper function to get days between two dates
 */
const getDaysBetween = (date: string, offset: number): string => {
  const dateObj = parseDateKey(date);
  dateObj.setDate(dateObj.getDate() + offset);
  const result = dateObj.toISOString().split('T')[0];
  return result || date;
};

/**
 * Streak Calculator
 * 
 * Calculates and tracks streaks for different activity types.
 * A streak is maintained by completing the daily goal (score >= 80).
 */

/**
 * Calculate streak for a specific type
 */
export const calculateStreak = (
  dailyScores: DailyScore[],
  type: StreakType = 'overall'
): StreakData => {
  if (dailyScores.length === 0) {
    return {
      current: 0,
      longest: 0,
      lastCompletedDate: null,
      type,
    };
  }

  // Sort by date descending
  const sortedScores = [...dailyScores].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const today = getToday();
  let currentStreak = 0;
  let longestStreak = 0;
  let lastCompletedDate: string | null = null;

  // Check if today/yesterday completed to start counting current streak
  const todayScore = sortedScores.find(s => s.date === today);
  const yesterdayScore = sortedScores.find(s => s.date === getDaysBetween(today, -1));

  if (todayScore?.completed) {
    currentStreak = 1;
    lastCompletedDate = today;
  } else if (yesterdayScore?.completed) {
    currentStreak = 1;
    lastCompletedDate = yesterdayScore.date;
  } else {
    // Streak broken
    lastCompletedDate = sortedScores[0]?.date || null;
  }

  // Calculate current streak by counting consecutive completed days
  let checkDate = lastCompletedDate;
  while (checkDate) {
    const score = sortedScores.find(s => s.date === checkDate);
    if (score && score.completed) {
      currentStreak++;
      checkDate = getDaysBetween(checkDate, -1);
    } else {
      break;
    }
  }

  // Calculate longest streak
  let tempStreak = 0;
  let tempLongest = 0;

  for (let i = 0; i < sortedScores.length; i++) {
    const score = sortedScores[i];
    if (score && score.completed) {
      tempStreak++;
      tempLongest = Math.max(tempLongest, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  longestStreak = Math.max(longestStreak, tempLongest);

  return {
    current: currentStreak,
    longest: longestStreak,
    lastCompletedDate,
    type,
  };
};

/**
 * Calculate all streaks for different types
 */
export const calculateAllStreaks = (dailyScores: DailyScore[]): Record<StreakType, StreakData> => {
  const overall = calculateStreak(dailyScores, 'overall');
  
  // For feature-specific streaks, we'd need to check breakdown completion
  // For now, we'll use the same logic but could be enhanced later
  const tasks = calculateStreak(dailyScores, 'tasks');
  const meals = calculateStreak(dailyScores, 'meals');
  const budget = calculateStreak(dailyScores, 'budget');
  const shopping = calculateStreak(dailyScores, 'shopping');

  return {
    overall,
    tasks,
    meals,
    budget,
    shopping,
  };
};

/**
 * Check if streak is in danger (no completion today/yesterday)
 */
export const isStreakInDanger = (streak: StreakData): boolean => {
  if (streak.current === 0) return false;
  if (!streak.lastCompletedDate) return false;
  
  const today = getToday();
  const lastDate = new Date(streak.lastCompletedDate);
  const todayDate = new Date(today);
  const daysSince = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // If last completed was 2+ days ago, streak is in danger
  return daysSince >= 2;
};

/**
 * Get streak motivation message
 */
export const getStreakMotivation = (streakData: StreakData): string => {
  if (streakData.current === 0) {
    return "Start your streak today!";
  }
  
  if (streakData.current === 1) {
    return "You're on a roll! Keep going!";
  }
  
  if (streakData.current < 7) {
    return `${streakData.current} day streak! Keep it up.`;
  }
  
  if (streakData.current < 30) {
    return `${streakData.current} day streak! Amazing consistency!`;
  }
  
  if (streakData.current < 100) {
    return `${streakData.current} day streak! You're unstoppable!`;
  }
  
  return `${streakData.current} day streak! Legendary! 🏆`;
};
