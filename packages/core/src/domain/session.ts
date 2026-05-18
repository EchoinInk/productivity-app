/**
 * Session domain type
 * Shared across web and mobile apps
 */

export interface Session {
  lastOpened: string | null;
  onboardingComplete: boolean;
}
