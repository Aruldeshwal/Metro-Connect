/**
 * Calculates a match score between two routes based on station overlap.
 * 
 * @param overlappingCount The number of shared stations.
 * @param route1Length Total stations in the first route.
 * @param route2Length Total stations in the second route.
 * @returns A score between 0 and 100.
 */
export const calculateMatchScore = (
  overlappingCount: number,
  route1Length: number,
  route2Length: number
): number => {
  if (route1Length === 0 || route2Length === 0) return 0;
  
  // Use Dice coefficient for similarity: (2 * |A ∩ B|) / (|A| + |B|)
  const score = (2 * overlappingCount) / (route1Length + route2Length);
  
  return parseFloat((score * 100).toFixed(2));
};
