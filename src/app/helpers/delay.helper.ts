/**
 * Delays the execution of code for a specified amount of time.
 * @param timeout - The time to delay in milliseconds. Defaults to 1000ms if not provided.
 * @returns A promise that resolves after the specified timeout.
 */
export const delay = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout || 1000));
};
