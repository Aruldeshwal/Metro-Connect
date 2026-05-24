'use client';

import React, { useMemo, useState } from "react";
import Map, { Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MetroStation } from "@/types/metrostation";

import StationListModal from "./StationListModal";

type AdjacencyList = globalThis.Map<string, Set<string>>;

interface MetroRouteHighlighterProps {
  startStation: MetroStation | null;
  endStation: MetroStation | null;
  isLoading: boolean;
  graph: AdjacencyList | null;
  stations: MetroStation[];
  shortestPathIds: string[];
}

const MetroRouteHighlighter: React.FC<MetroRouteHighlighterProps> = ({
  startStation,
  isLoading,
  stations,
  shortestPathIds,
}) => {
  const [hiddenRouteKey, setHiddenRouteKey] = useState<string | null>(null);

  // 🧭 Convert your route data into GeoJSON for Mapbox
  const polylineGeoJSON = useMemo(() => {
    if (!shortestPathIds?.length) return null;

    const stationsMap = new globalThis.Map<string, MetroStation>(
      stations.map((station) => [station.id, station] as [string, MetroStation])
    );

    const coordinates = shortestPathIds
      .map((stationId) => {
        const station = stationsMap.get(stationId);
        if (!station) return null;

        const lat =
          typeof station.latitude === "string"
            ? parseFloat(station.latitude)
            : station.latitude;
        const lng =
          typeof station.longitude === "string"
            ? parseFloat(station.longitude)
            : station.longitude;

        if (isFinite(lat) && isFinite(lng)) return [lng, lat]; // Mapbox uses [lng, lat]
        console.error(`Invalid coordinates for station ID ${station.id}`);
        return null;
      })
      .filter(Boolean) as [number, number][];

    if (!coordinates.length) return null;

    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
      properties: {},
    } as GeoJSON.Feature<GeoJSON.LineString>;
  }, [shortestPathIds, stations]);

  // 🎯 Show station modal
  const routeStationsForModal = useMemo(() => {
    const stationsMap = new globalThis.Map<string, MetroStation>(
      stations.map((station) => [station.id, station] as [string, MetroStation])
    );

    return shortestPathIds
      .map((id) => stationsMap.get(id))
      .filter((station): station is MetroStation => !!station);
  }, [shortestPathIds, stations]);

  const routeKey = shortestPathIds.join("|");
  const shouldShowStationListModal = Boolean(polylineGeoJSON && routeKey && hiddenRouteKey !== routeKey);

  if (isLoading) return <div>Still loading...</div>;

  // 🗺️ Initial center position (either start or fallback)
  const initialView = {
    longitude: startStation?.longitude
      ? Number(startStation.longitude)
      : 77.209,
    latitude: startStation?.latitude ? Number(startStation.latitude) : 28.6139,
    zoom: 11,
  };

  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={initialView}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {polylineGeoJSON && (
          <Source id="route" type="geojson" data={polylineGeoJSON}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#3710b9",
                "line-width": 6,
                "line-opacity": 0.9,
              }}
            />
          </Source>
        )}
      </Map>

      <StationListModal
        isOpen={shouldShowStationListModal}
        onClose={() => setHiddenRouteKey(routeKey)}
        stations={routeStationsForModal}
      />
    </div>
  );
};

export default MetroRouteHighlighter;
