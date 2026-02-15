import { MetroStation } from "@/types/metrostation";
import { useEffect, useRef } from "react"; 
import { toast } from "sonner";
import { MetroLine } from "@/types/metroline";

interface UseFetchStationAndLineProps {
  setStations: (stations: MetroStation[]) => void; 
  setLines: (lines: MetroLine[]) => void; 
}


const useFetchStationAndLine = ({ setStations, setLines }: UseFetchStationAndLineProps) => {
  const stationsMap = useRef<Map<string, MetroStation>>(new Map());

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch('/api/metro/stations');
        if (!res.ok) {
          const errorData = await res.json(); 
          throw new Error(errorData.message || 'Failed to fetch stations');
        }
        const data: MetroStation[] = await res.json(); 
        setStations(data);
        
        if (stationsMap.current) {
          stationsMap.current = new Map(
            data.map((station: MetroStation) => [station.id, station])
          );
        } else {
            console.warn("stationsMap.current is null. Map not updated.");
        }
        
        toast.success('Stations Loaded', {
          description: `Successfully loaded ${data.length} metro stations.`,
        });
      } catch (error) {
        console.error("Error fetching stations:", error); 
        toast.error('Failed to fetch stations.', {
          description: (error instanceof Error) ? error.message : String(error),
        });
      }
    };

    const fetchLines = async () => {
      try {
        const res = await fetch('/api/metro/lines');
        if (!res.ok) {
          const errorData = await res.json(); 
          throw new Error(errorData.message || 'Failed to fetch lines');
        }
        const data: MetroLine[] = await res.json(); 
        setLines(data);
        toast.success('Lines Loaded', { 
            description: `Successfully loaded ${data.length} metro lines.`,
        });
      } catch (error) {
        console.error("Error fetching lines:", error); 
        toast.error('Failed to fetch lines.', {
          description: (error instanceof Error) ? error.message : String(error), 
        });
      }
    };

    fetchStations();
    fetchLines();
  }, [setLines, setStations]); 
};

export default useFetchStationAndLine;