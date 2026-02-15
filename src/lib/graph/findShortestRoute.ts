type AdjacencyList = Map<string, Set<string>>;

export const findShortestRoute = (
    startStationId: string,
    endStationId: string, 
    graph : AdjacencyList
): string[] => {
    
    if (startStationId === endStationId) {
        return [startStationId];
    }
    if (!graph.has(startStationId) || !graph.has(endStationId)) {
        console.warn('One or both stations do not exist in the graph.');
        return [];
    }

    const queue: string[][] = [[startStationId]];
    const visited: Set<string> = new Set([startStationId]);

    while (queue.length > 0) {
        const currentPath = queue.shift();
        if (!currentPath) continue;
        const currentStationId = currentPath[currentPath.length - 1];

        if (currentStationId === endStationId) {
            return currentPath;
        }

        const neighbors = graph.get(currentStationId);
        if (neighbors) {
            for (const neighborId of neighbors) {
                if (!visited.has(neighborId)) {
                    visited.add(neighborId);
                    
                    const newPath = [...currentPath, neighborId];

                    queue.push(newPath);
                }
            }
        }
    }

    return [];
};