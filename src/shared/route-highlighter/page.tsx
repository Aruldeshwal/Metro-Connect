import React, { useEffect, useMemo, useState } from "react";
import { MetroStation } from "@/types/metrostation";
import MyPolylineComponent from "../polyline/page";
import { findShortestRoute } from "@/app/api/stationRouteSearch/route";
import StationListModal from "../station-list-modal/page";
type AdjacencyList = Map<string, Set<string>>;

interface MetroRouteHighlighterProps {
    startStation: MetroStation | null; 
    endStation: MetroStation | null;   
    isLoading: boolean;
    graph: AdjacencyList | null; 
    stations: MetroStation[];
}

const MetroRouteHighlighter: React.FC<MetroRouteHighlighterProps> = ({
    startStation,
    endStation,
    isLoading,
    graph,
    stations
}) => {

    const [showStationListModal, setShowStationListModal] = useState(false);
    const [routeStationsForModal, setRouteStationsForModal] = useState<MetroStation[]>([]);


    const shortestPathIds = useMemo(() => {

        if (!startStation || !endStation || !graph) {
            console.log("Not all data is available to calculate the path.");
            return null;
        }
        return findShortestRoute(startStation.id, endStation.id, graph);
    }, [startStation, endStation, graph, isLoading]);

    const polylinePath = useMemo(() => {
        if (!shortestPathIds) return null;

        const stationsMap = new Map(stations.map(station => [station.id, station]));

        return shortestPathIds.map((stationId: string) => {
        const station = stationsMap.get(stationId);
        if (station) {
            // Inspect the values right here!
            console.log(`Station ID: ${station.id}, Latitude: ${station.latitude}, Type: ${typeof station.latitude}`);
            console.log(`Station ID: ${station.id}, Longitude: ${station.longitude}, Type: ${typeof station.longitude}`);

            // Add a check to ensure they are numbers, and convert if necessary (e.g., from strings)
            const lat = typeof station.latitude === 'string' ? parseFloat(station.latitude) : station.latitude;
            const lng = typeof station.longitude === 'string' ? parseFloat(station.longitude) : station.longitude;

            // Crucially, check if they are finite numbers before returning
            if (typeof lat === 'number' && isFinite(lat) && typeof lng === 'number' && isFinite(lng)) {
                return { lat: lat, lng: lng };
            } else {
                console.error(`Invalid coordinates for station ID ${station.id}: lat=${lat}, lng=${lng}`);
                return null; // Return null if coordinates are invalid
            }
        }
        return null;
        }).filter(Boolean) as google.maps.LatLngLiteral[]; // Filter out any nulls
    }, [shortestPathIds, stations]);

     useEffect(() => {
        if (polylinePath && polylinePath.length > 0) {
            // If a valid polyline path exists, prepare the stations for the modal
            const stationsMap = new Map(stations.map(station => [station.id, station]));
            const routeStations: MetroStation[] = (shortestPathIds || []) // Ensure shortestPathIds is not null
                .map(id => stationsMap.get(id))
                .filter((s): s is MetroStation => s !== undefined);

            setRouteStationsForModal(routeStations);
            setShowStationListModal(true); // Show the modal
        } else {
            setShowStationListModal(false); // Hide the modal if no path
            setRouteStationsForModal([]); // Clear stations
        }
    }, [polylinePath, shortestPathIds, stations]);

    if (isLoading) {
        return <div>Still loading</div>
    }

    return (
        <div>
            {polylinePath && polylinePath.length > 0 && (
                <MyPolylineComponent
                    path={polylinePath}
                    strokeColor="#10B981"
                    strokeWeight={10}
                />
            )}
            <StationListModal
                isOpen={showStationListModal} // Controlled by our new state
                onClose={() => setShowStationListModal(false)}
                stations={routeStationsForModal} // Pass the prepared stations
            />
        </div>
    );
};

export default MetroRouteHighlighter;
