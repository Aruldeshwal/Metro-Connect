import { MetroLine } from '@/types/metroline';
import { MetroStation } from '@/types/metrostation';
import { useEffect, useState } from 'react';
import useFetchStationAndLine from '../useFetchStationandLines';

interface MetroSystemData {
    stations: MetroStation[];
    lines: MetroLine[];
}


type AdjacencyList = Map<string, Set<string>>;

const buildMetroGraph = (data: MetroSystemData): AdjacencyList => {
    const graph: AdjacencyList = new Map();

    data.stations.forEach(station => {
        graph.set(station.id, new Set());
    });

    data.lines.forEach(line => {
        const stationSequence = line.station_ids_sequence;
        for (let i = 0; i < stationSequence.length - 1; i++) {
            const currentStationId = stationSequence[i];
            const nextStationId = stationSequence[i + 1];

            graph.get(currentStationId)?.add(nextStationId);
            graph.get(nextStationId)?.add(currentStationId);
        }
    });

    return graph;
};

export const useMetroGraph = () => {
    const [graph, setGraph] = useState<AdjacencyList | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [stations, setStations] = useState<MetroStation[]>([]);
    const [lines, setLines] = useState<MetroLine[]>([]);
        useFetchStationAndLine({
        setStations: setStations,                
        setLines: setLines
    })  
    useEffect(() => {
        console.log('useMetroGraph: Hook activated. Fetching and building graph...');
        const fetchAndBuildGraph = async () => {
            try {
                
                const builtGraph = buildMetroGraph({stations, lines});
                console.log('useMetroGraph: Graph successfully built.');
                setGraph(builtGraph);
            } catch (error) {
                console.error('useMetroGraph: Failed to build graph.', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndBuildGraph();
    }, [stations, lines]); 

    return { graph, isLoading };
};
