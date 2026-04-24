/**
 * Tiny single-slot memoizer used by selectors
 * to avoid recomputing derived data when the
 * inputs haven't changed by reference.
 */
export const memoOne = <T extends (...args: any[]) => any>(
  fn: T,
): T => {
  let lastArgs: unknown[] = [];
  let lastResult: ReturnType<T>;
  let initialized = false;

  return ((...args: unknown[]) => {
    if (
      initialized &&
      args.length === lastArgs.length &&
      args.every((arg, i) => arg === lastArgs[i])
    ) {
      return lastResult;
    }

    lastArgs = args;
    lastResult = fn(...args);
    initialized = true;
    return lastResult;
  }) as T;
};
