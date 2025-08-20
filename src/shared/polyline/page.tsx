import React, { useEffect, useRef } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

interface MyPolylineProps {
  path: google.maps.LatLngLiteral[];
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
  geodesic?: boolean;
}

const MyPolylineComponent: React.FC<MyPolylineProps> = ({
  path,
  strokeColor = '#FF0000',
  strokeWeight = 2,
  strokeOpacity = 1.0,
  geodesic = true,
}) => {
  const map = useMap();
  const mapsLib = useMapsLibrary('maps');
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    console.log('MyPolylineComponent: useEffect triggered.'); // Initial trigger indication

    // Check for essential prerequisites
    if (!map) {
      console.warn('MyPolylineComponent: Map instance not yet available. Waiting...');
      return;
    }
    if (!mapsLib) {
      console.warn('MyPolylineComponent: Google Maps Library not yet loaded. Waiting...');
      return;
    }
    if (!path || path.length === 0) {
      console.warn('MyPolylineComponent: Path is empty or undefined. No polyline to draw.');
      return;
    }

    console.log('MyPolylineComponent: Map and Maps Library are ready. Path received:', path);

    // Remove existing polyline before adding a new one
    if (polylineRef.current) {
      console.log('MyPolylineComponent: Detaching existing polyline from map.');
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    } else {
      console.log('MyPolylineComponent: No existing polyline to detach.');
    }

    // Create the polyline
    console.log('MyPolylineComponent: Creating new polyline with properties:', {
      path,
      geodesic,
      strokeColor,
      strokeOpacity,
      strokeWeight,
    });
    const polyline = new mapsLib.Polyline({
      path,
      geodesic,
      strokeColor,
      strokeOpacity,
      strokeWeight,
    });

    polyline.setMap(map);
    polylineRef.current = polyline;
    console.log('MyPolylineComponent: New polyline successfully attached to map.', polyline);

    return () => {
      console.log('MyPolylineComponent: Cleanup function activated.');
      if (polylineRef.current) {
        console.log('MyPolylineComponent: Detaching polyline during cleanup.');
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      } else {
        console.log('MyPolylineComponent: No polyline reference to clean up.');
      }
    };
  }, [map, mapsLib, path, strokeColor, strokeWeight, strokeOpacity, geodesic]); 

  return null;
};

export default MyPolylineComponent;