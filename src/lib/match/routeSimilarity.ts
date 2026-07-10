import { calculateOverlap } from "./calculateOverlap";
import { calculateMatchScore } from "./calculateMatchScore";

/**
 * High-level utility to calculate similarity between two routes.
 */
export const getRouteSimilarity = (route1: string[], route2: string[]) => {
  const overlap = calculateOverlap(route1, route2);
  const score = calculateMatchScore(overlap.length, route1.length, route2.length);
  
  return {
    overlappingStations: overlap,
    overlappingCount: overlap.length,
    matchScore: score,
  };
};
