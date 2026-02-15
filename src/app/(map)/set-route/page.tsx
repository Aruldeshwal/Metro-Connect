"use client";

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

import useFetchStationAndLine from '@/hooks/useFetchStationandLines';
import { MetroStation } from '@/types/metrostation';
import { MetroLine } from '@/types/metroline';
import { useMetroGraph } from '@/hooks/useMetroGraph';
import MetroRouteHighlighter from '@/shared/route-highlighter/page';
import { useUser } from '@clerk/nextjs';
import { findShortestRoute } from '@/lib/graph/findShortestRoute';

const MetroMapContent = () => {
  const { user } = useUser();
  const { graph, isLoading } = useMetroGraph();
  const [stations, setStations] = useState<MetroStation[]>([]);
  const [lines, setLines] = useState<MetroLine[]>([]);
  const [startStation, setStartStation] = useState<MetroStation | null>(null);
  const [endStation, setEndStation] = useState<MetroStation | null>(null);
  const [selectedDay, setSelectedDay] = useState('1');
  const [preferredTime, setPreferredTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isStartPopoverOpen, setIsStartPopoverOpen] = useState(false);
  const [isEndPopoverOpen, setIsEndPopoverOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<'start' | 'end'>('start');

  const router = useRouter();

  useFetchStationAndLine({
    setStations: setStations,
    setLines: setLines,
  });

  const filteredStations =
    searchTerm.length > 0
      ? stations.filter((s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const handleSelectStart = (station: MetroStation) => {
    setStartStation(station);
    setIsStartPopoverOpen(false);
    setSearchTerm('');
  };

  const handleSelectEnd = (station: MetroStation) => {
    setEndStation(station);
    setIsEndPopoverOpen(false);
    setSearchTerm('');
  };

  const shortestPathIds = useMemo(() => {
    if (!startStation || !endStation || !graph) {
      return [];
    }
    return findShortestRoute(startStation.id, endStation.id, graph);
  }, [startStation, endStation, graph]);

  const handleSaveRoute = async () => {
    if (!startStation || !endStation) {
      toast.error('Please select both a start and an end station.', {
        description: 'Incomplete Route',
      });
      return;
    }

    const finalData = {
      start_station_id: startStation.id,
      end_station_id: endStation.id,
      days_of_week: selectedDay,
      preferred_start_time: preferredTime ? preferredTime : null,
      calculated_station_ids_path: shortestPathIds,
    };

    await fetch(`/api/routeSaver/${user?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData),
    });

    toast.success('Route Saved (Demo)', {
      description: `Saving route from ${startStation.name} to ${endStation.name}.`,
    });
    router.push('/dashboard');
  };

  return (
    <>
      <div className="absolute top-4 left-4 z-10 p-4 bg-white rounded-lg shadow-lg max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Set Your Daily Route
        </h2>

        <div className="space-y-4">
          {/* Start Station */}
          <div>
            <Label>Start Station</Label>
            <Popover open={isStartPopoverOpen} onOpenChange={setIsStartPopoverOpen}>
              <PopoverTrigger asChild>
                <Input
                  placeholder="Select a starting station..."
                  value={startStation?.name || ''}
                  readOnly
                  className="mt-1 cursor-pointer"
                  style={{
                    backgroundColor: startStation ? '#e0f7fa' : '#f0f4f8',
                  }}
                  onClick={() => {
                    setSearchMode('start');
                    setIsStartPopoverOpen(true);
                  }}
                />
              </PopoverTrigger>
              {searchMode === 'start' && isStartPopoverOpen && (
                <PopoverContent className="p-0 max-h-48 overflow-y-auto">
                  <Input
                    placeholder="Search for a station..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border-b"
                  />
                  {filteredStations.length > 0 ? (
                    filteredStations.map((station) => (
                      <div
                        key={station.id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectStart(station)}
                      >
                        {station.name}
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-sm text-gray-500">
                      No stations found.
                    </p>
                  )}
                </PopoverContent>
              )}
            </Popover>
          </div>

          {/* End Station */}
          <div>
            <Label>End Station</Label>
            <Popover open={isEndPopoverOpen} onOpenChange={setIsEndPopoverOpen}>
              <PopoverTrigger asChild>
                <Input
                  placeholder="Select an ending station..."
                  value={endStation?.name || ''}
                  readOnly
                  className="mt-1 cursor-pointer"
                  style={{
                    backgroundColor: endStation ? '#ffebee' : '#f0f4f8',
                  }}
                  onClick={() => {
                    setSearchMode('end');
                    setIsEndPopoverOpen(true);
                  }}
                />
              </PopoverTrigger>
              {searchMode === 'end' && isEndPopoverOpen && (
                <PopoverContent className="p-0 max-h-48 overflow-y-auto">
                  <Input
                    placeholder="Search for a station..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border-b"
                  />
                  {filteredStations.length > 0 ? (
                    filteredStations.map((station) => (
                      <div
                        key={station.id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectEnd(station)}
                      >
                        {station.name}
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-sm text-gray-500">
                      No stations found.
                    </p>
                  )}
                </PopoverContent>
              )}
            </Popover>
          </div>

          {/* Day & Time */}
          <div className="flex space-x-2">
            <div className="w-1/2">
              <Label>Day of Week</Label>
              <Select onValueChange={setSelectedDay} value={selectedDay}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Monday</SelectItem>
                  <SelectItem value="2">Tuesday</SelectItem>
                  <SelectItem value="3">Wednesday</SelectItem>
                  <SelectItem value="4">Thursday</SelectItem>
                  <SelectItem value="5">Friday</SelectItem>
                  <SelectItem value="6">Saturday</SelectItem>
                  <SelectItem value="7">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/2">
              <Label>Preferred Time</Label>
              <Input
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={async () => {
            try {
              await handleSaveRoute();
              router.push('/dashboard');
            } catch (error) {
              console.error('Failed to save route:', error);
              toast.error('Could not save your route. Please try again.');
            }
          }}
          className="mt-5 w-full bg-gray-600 hover:bg-gray-700 text-white"
        >
          Confirm Your Metro Stations Route
        </Button>
      </div>

      {/* Route Visualizer */}
      <MetroRouteHighlighter
        startStation={startStation}
        endStation={endStation}
        isLoading={isLoading}
        graph={graph}
        stations={stations}
        shortestPathIds={shortestPathIds}
      />
    </>
  );
};

export default function SetRoutePage() {
  const position = { lat: 28.62, lng: 77.22 };

  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-bold">
          Error: Mapbox token not configured in .env.local.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <Toaster />
      <Map
        longitude={position.lng}
        latitude={position.lat}
        zoom={11}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{ width: '100%', height: '100%' }}
      >
        <MetroMapContent />
      </Map>
    </div>
  );
}
