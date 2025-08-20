//immediately loads environment variables from your .env files
import 'dotenv/config';

//fs as in filestream
import fs from 'fs';

//used for its ability to concatenate path segments into a single, well-formed path string
import path from 'path';

//this is our parser
import { parse } from 'csv-parse';

//essential for Prisma
import {prisma} from '@/lib/database';


// src/scripts/seed-metro-data.ts (Add this near the top, after imports)

const METRO_LINE_COLORS: { [key: string]: string } = {
  // Red Line
  "R_RD": "#FF0000",
  "R_RD_R": "#FF0000",
  "R_RS": "#FF0000", 
  "R_RS_R": "#FF0000",

  // Yellow Line
  "Y_HQ": "#FFD700",
  "Y_HQ_R": "#FFD700",
  "Y_QV": "#FFD700",
  "Y_QV_R": "#FFD700",
  "Y_HS": "#FFD700",
  "Y_HS_R": "#FFD700",

  // Blue Line
  "B_DN": "#0000FF",
  "B_DN_R": "#0000FF",
  "B_DV": "#0000FF",
  "B_DV_R": "#0000FF",

  // Green Line
  "G_IB": "#008000",
  "G_IB_R": "#008000",
  "G_KB": "#008000",
  "G_KB_R": "#008000",

  // Violet Line
  "V_KB": "#8A2BE2",
  "V_KB_R": "#8A2BE2",
  "V_KR": "#8A2BE2",
  "V_KR_R": "#8A2BE2",

  // Magenta Line
  "M_JB": "#FF00FF",
  "M_JB_R": "#FF00FF",

  // Pink Line
  "P_MS": "#FFC0CB",
  "P_MS_R": "#FFC0CB",

  // Grey Line
  "G_DD": "#808080",
  "G_DD_R": "#808080",

  // Aqua Line
  "A_ND": "#00FFFF",
  "A_ND_R": "#00FFFF",
  "A_NN": "#00FFFF",
  "A_NN_R": "#00FFFF",

  // Orange/Airport Line
  "O_DN": "#FFA500",
  "O_DN_R": "#FFA500",

  // Rapid Metro
  "R_SP": "#800080", // Purple-like
  "R_SP_R": "#800080",
};

const ROUTE_DISPLAY_NAMES: { [key: string]: string } = {
  // Red Line
  "R_RD": "Red Line", // Rithala to Dilshad Garden
  "R_RD_R": "Red Line", // Dilshad Garden to Rithala
  "R_RS": "Red Line", // Rithala to Shaheed Sthal (New Bus Adda)
  "R_RS_R": "Red Line", // Shaheed Sthal (New Bus Adda) to Rithala

  // Yellow Line
  "Y_HQ": "Yellow Line", // Huda City Centre to Qutab Minar
  "Y_HQ_R": "Yellow Line", // Qutab Minar to Huda City Centre
  "Y_QV": "Yellow Line", // Qutab Minar to Vishwavidyalaya
  "Y_QV_R": "Yellow Line", // Vishwavidyalaya to Qutab Minar
  "Y_HS": "Yellow Line", // Huda City Centre to Samaypur Badli
  "Y_HS_R": "Yellow Line", // Samaypur Badli to Huda City Centre

  // Blue Line
  "B_DN": "Blue Line", // Dwarka Sector - 21 to Noida Electronic City
  "B_DN_R": "Blue Line", // Noida Electronic City to Dwarka Sector - 21
  "B_DV": "Blue Line", // Dwarka Sector - 21 to Vaishali
  "B_DV_R": "Blue Line", // Vaishali to Dwarka Sector - 21

  // Green Line
  "G_IB": "Green Line", // Inderlok to Brigadier Hoshiyar Singh
  "G_IB_R": "Green Line", // Brigadier Hoshiyar Singh to Inderlok
  "G_KB": "Green Line", // Kirti Nagar to Brigadier Hoshiyar Singh
  "G_KB_R": "Green Line", // Brigadier Hoshiyar Singh to Kirti Nagar

  // Violet Line
  "V_KB": "Violet Line", // Kashmere Gate to Badarpur Border
  "V_KB_R": "Violet Line", // Badarpur Border to Kashmere Gate
  "V_KR": "Violet Line", // Kashmere Gate to Raja Nahar Singh
  "V_KR_R": "Violet Line", // Raja Nahar Singh to Kashmere Gate

  // Magenta Line
  "M_JB": "Magenta Line", // Janak Puri West to Botanical Garden
  "M_JB_R": "Magenta Line", // Botanical Garden to Janak Puri West

  // Pink Line
  "P_MS": "Pink Line", // Majlis Park to Shiv Vihar
  "P_MS_R": "Pink Line", // Shiv Vihar to Majlis Park

  // Grey Line
  "G_DD": "Grey Line", // Dwarka to Dhansa Bus Stand
  "G_DD_R": "Grey Line", // Dhansa Bus Stand to Dwarka

  // Aqua Line
  "A_ND": "Aqua Line", // Noida Sector 142 to Depot Station
  "A_ND_R": "Aqua Line", // Depot Station to Noida Sector 142
  "A_NN": "Aqua Line", // Noida Sector 51 to Noida Sector 142
  "A_NN_R": "Aqua Line", // Noida Sector 142 to Noida Sector 51

  // Orange/Airport Line
  "O_DN": "Orange Line (Airport)", // Dwarka Sector - 21 to New Delhi
  "O_DN_R": "Orange Line (Airport)", // New Delhi to Dwarka Sector - 21

  // Rapid Metro
  "R_SP": "Rapid Metro", // Sector 55-56 (Rapid Metro) to Phase 3 (Rapid Metro)
  "R_SP_R": "Rapid Metro", // Phase 3 (Rapid Metro) to Sector 55-56 (Rapid Metro)
};

//taken from stops.txt in gtfs data
interface GtfsStop {
  stop_id: string;
  stop_name: string;
  //for location access in map
  stop_lat: string; 
  stop_lon: string; 
}

//taken from routes.txt
interface GtfsRoute {
  route_id: string;
  route_short_name: string; //example- R_RD_R for red line
  route_color: string; //this provides a hexadecimal code to represent the line on a coloured map
}

//taken from trips.txt
//we take this to get a relationship between route_id and trip_id
interface GtfsTrip {
  trip_id: string;
  route_id: string;
}

//we take this to get a relationship between stop_id and trip_id
interface GtfsStopTime {
  trip_id: string;
  stop_id: string;
  stop_sequence: string; // it is an integer that precisely defines the order of stops for a given trip
}

async function parseCsvFile<T>(filePath: string): Promise<T[]> {
  
  //empty array that will save each parsed row as an object of type T
  const records: T[] = [];
  
  //creates readable stream from a specified filePath
  const parser = fs.createReadStream(filePath)

  //pipe flows output of one data stream into the input of another 
  .pipe(
    //this is the parsing function
    //it takes directives inside(for example- columns: true)
    parse({
      columns: true, // Treat the first row as column headers (for example- stop_id: "...")
      skip_empty_lines: true, //Skip empty lines to prevent creation of malformed records
    }
  ));

  //asynchronous iterator loop
  for await (const record of parser) {
    //The loop will pause execution (without blocking the thread) until the next record is ready from the parser stream
    //push record of type T inside records 
    records.push(record as T);
  }

  //return the records array 
  return records;
}

async function seedMetroData() {

  //path.join() ensures correct usage of the appropriate path separator for the OS(for example- windows: "\", linux: "/")
  //process.cwd() returns the current working directory of the Node.js process
  //data, gtfs gets concatenated to "data/gtfs" to get the path
  const gtfsDirPath = path.join(process.cwd(), 'data', 'gtfs'); // Adjust path as necessary

  try {
    console.log("Parsing GTFS data...");

    // 1. Parse stops.txt

    // stopsRaw gets the parsed data of stops.txt of the format GtfsStop
    const stopsRaw = await parseCsvFile<GtfsStop>(path.join(gtfsDirPath, 'stops.txt'));

    //creates a map with a string key and different types of values
    const stationsMap = new Map<string, { name: string, latitude: string, longitude: string, line_ids: Set<string> }>();
    
    //initiates a loop that iterates over each individual stop object
    stopsRaw.forEach(stop => {
      //sets up stop id as the key to different values
      stationsMap.set(stop.stop_id, {
        name: stop.stop_name,
        latitude: stop.stop_lat,
        longitude: stop.stop_lon,
        line_ids: new Set<string>() // Use a Set to store unique line_ids initially
      });
    });
    console.log(`Parsed ${stopsRaw.length} stops.`);

    // 2. Parse routes.txt
    const routesRaw = await parseCsvFile<GtfsRoute>(path.join(gtfsDirPath, 'routes.txt'));
    const linesMap = new Map<string, { name: string, color_hex: string | null, station_ids_sequence: Map<number, string> }>();
    routesRaw.forEach(route => {
      linesMap.set(route.route_id, {
        name: ROUTE_DISPLAY_NAMES[route.route_short_name] || route.route_short_name, // Use map, fallback to code
        // Prioritize explicit map, then GTFS (which is null), then a fallback default
        color_hex: METRO_LINE_COLORS[route.route_short_name] || "#808080", // Use map, fallback to grey
        //routes.txt does not provide data on what station the following line has
        //therefore, we don't populate it right now
        station_ids_sequence: new Map<number, string>()
      });
    });
    console.log(`Parsed ${routesRaw.length} routes.`);

    // 3. Parse trips.txt (to map trip_id to route_id)
    const tripsRaw = await parseCsvFile<GtfsTrip>(path.join(gtfsDirPath, 'trips.txt'));
    const tripToRouteMap = new Map<string, string>();
    tripsRaw.forEach(trip => {
      //we link trip id (from trips.txt) to route id (from routes.txt)
      //and then we link trip id to stop id (from stop_times.txt) in order to obtain a connection between route id and stop id
      //it links the route (line) to the stop (station)
      tripToRouteMap.set(trip.trip_id, trip.route_id);
    });
    console.log(`Parsed ${tripsRaw.length} trips.`);

    // 4. Parse stop_times.txt (the algorithmic core)
    // this file contains essential data such as stop id and trip id which was used to connect between stop id and route id
    // it also contains stop sequence which was used to determine the order of stations in a given line
    const stopTimesRaw = await parseCsvFile<GtfsStopTime>(path.join(gtfsDirPath, 'stop_times.txt'));
    stopTimesRaw.forEach(stopTime => {

      //get route id which connects to the trip id for the corresponding field
      const routeId = tripToRouteMap.get(stopTime.trip_id);

      if (routeId) {
        
        //since routeId was set as the key, the value of the following key will be stored inside lineData
        const lineData = linesMap.get(routeId);
        if (lineData) {
          // Add stop to line's sequence
          // Adds the stops' index (sequence) as the key and stops' id as the value
          lineData.station_ids_sequence.set(parseInt(stopTime.stop_sequence), stopTime.stop_id);

          // Add routeId to station's line_ids (if station exists)
          const stationData = stationsMap.get(stopTime.stop_id);
          if (stationData) {
            //adds route id to line ids to keep track of interchange
            stationData.line_ids.add(routeId);
          }
        }
      }
    });
    console.log(`Parsed ${stopTimesRaw.length} stop times.`);

    // --- Prepare data for Prisma insertion ---

    // Finalize MetroStation data
    // converts the stationsMap into the precise array format required for database insertion
    const metroStationsData = Array.from(

      // returns an iterator that yields key-value pairs [key, value] for each element in the stationsMap
      // each entry will be [stop_id, { name, latitude, longitude, line_ids (Set) }]
      stationsMap.entries()
    ).map(([id, data]) => ({
      id: id,
      name: data.name,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      line_ids: Array.from(data.line_ids), // Convert Set to Array
    }));

    // Finalize MetroLine data
    const metroLinesData = Array.from(linesMap.entries()).map(([id, data]) => {
      // Sort the sequence by stop_sequence number
      const sortedSequence = Array.from(data.station_ids_sequence.entries())
                                  .sort((a, b) => a[0] - b[0]) // Sort by sequence number
                                  .map(entry => entry[1]); // Get just the stop_id

      return {
        id: id,
        name: data.name,
        color_hex: data.color_hex,
        station_ids_sequence: sortedSequence,
      };
    });

    // --- Insert data into NeonDB using Prisma ---

    console.log("Inserting Metro Stations into database...");
    await prisma.metroStation.createMany({
      data: metroStationsData,
      skipDuplicates: true, // Useful if running script multiple times
    });
    console.log("Metro Stations seeded successfully.");

    console.log("Inserting Metro Lines into database...");
    await prisma.metroLine.createMany({
      data: metroLinesData,
      skipDuplicates: true, // Useful if running script multiple times
    });
    console.log("Metro Lines seeded successfully.");

  } catch (error) {
    console.error("An error occurred during GTFS data seeding:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}

seedMetroData();