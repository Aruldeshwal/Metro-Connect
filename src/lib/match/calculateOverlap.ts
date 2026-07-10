/**
 * Calculates the overlapping stations between two metro routes.
 * 
 * @param route1 Array of station IDs for the first user's route.
 * @param route2 Array of station IDs for the second user's route.
 * @returns An array of station IDs that exist in both routes.
 */
export const calculateOverlap = (route1: string[], route2: string[]): string[] => {
  const set1 = new Set(route1);
  return route2.filter(stationId => set1.has(stationId));
};
