import 'dotenv/config';
import { prisma } from '@/lib/database';
import { findShortestRoute } from '@/lib/graph/findShortestRoute';

const NAMES = [
  "Sophia Carter", "Liam Johnson", "Olivia Smith", "Noah Brown", "Emma Davis",
  "Ava Miller", "Elijah Wilson", "Isabella Moore", "James Taylor", "Mia Anderson",
  "Benjamin Thomas", "Charlotte Jackson", "Lucas White", "Amelia Harris", "Mason Martin",
  "Harper Thompson", "Ethan Garcia", "Evelyn Martinez", "Alexander Robinson", "Abigail Clark",
  "Sebastian Rodriguez", "Ella Lewis", "Jack Lee", "Aria Walker", "Daniel Hall",
  "Scarlett Allen", "William Young", "Grace Hernandez", "Henry King", "Chloe Wright"
];

const OCCUPATIONS = [
  "Software Engineer", "UX Designer", "Product Manager", "Data Scientist", "Digital Marketer",
  "Student", "Freelance Writer", "Architect", "Civil Engineer", "Doctor",
  "Nurse", "Graphic Designer", "Accountant", "Teacher", "Lawyer",
  "Chef", "Photographer", "Financial Analyst", "Marketing Coordinator", "Sales Representative"
];

const INTERESTS_POOL = [
  "Gaming", "Coffee", "Tech", "Reading", "Hiking", "Photography", "Music",
  "Cooking", "Travel", "Fitness", "Art", "Movies", "Cycling", "Yoga",
  "Coding", "Sustainability", "History", "Nature", "Anime", "Dancing"
];

const BIOS = [
  "Passionate about technology and daily metro commutes. Let's chat about coding!",
  "Avid reader and coffee lover. Usually found with a book on the Yellow Line.",
  "UX Designer exploring the city one station at a time.",
  "Data enthusiast. I love analyzing commute patterns. 📊",
  "Student at Delhi University. Always up for a good conversation.",
  "Freelancer traveling for inspiration. Metro rides are my thinking time.",
  "Fitness freak. I hit the gym before the office. 💪",
  "Loves capturing the city through my lens. 📸",
  "Music is my escape during the rush hour.",
  "Always looking for the best street food near metro stations."
];

async function seedDummyUsers() {
  console.log("Starting dummy data seeding...");

  try {
    // 1. Fetch all stations and lines to build the graph
    const stations = await prisma.metroStation.findMany();
    const lines = await prisma.metroLine.findMany();

    if (stations.length === 0 || lines.length === 0) {
      console.error("Error: No metro stations or lines found. Please seed metro data first.");
      return;
    }

    // Build Adjacency List for BFS
    const graph: Map<string, Set<string>> = new Map();
    stations.forEach(s => graph.set(s.id, new Set()));
    lines.forEach(l => {
      for (let i = 0; i < l.station_ids_sequence.length - 1; i++) {
        const curr = l.station_ids_sequence[i];
        const next = l.station_ids_sequence[i + 1];
        graph.get(curr)?.add(next);
        graph.get(next)?.add(curr);
      }
    });

    console.log(`Loaded ${stations.length} stations and ${lines.length} lines.`);

    // 2. Create Dummy Users
    for (let i = 0; i < NAMES.length; i++) {
      const name = NAMES[i];
      const email = `user${i}@example.com`;
      const id = `dummy_user_${i}`;

      const interests = Array.from({ length: 3 + Math.floor(Math.random() * 3) }, 
        () => INTERESTS_POOL[Math.floor(Math.random() * INTERESTS_POOL.length)]
      );

      const user = await prisma.user.upsert({
        where: { id },
        update: {},
        create: {
          id,
          email,
          name,
          bio: BIOS[Math.floor(Math.random() * BIOS.length)],
          occupation: OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)],
          interests: Array.from(new Set(interests)),
          profile_picture_url: `https://placehold.co/100x100/7c3aed/ffffff?text=${name.charAt(0)}`,
        }
      });

      // 3. Create a realistic route for each user
      const startStation = stations[Math.floor(Math.random() * stations.length)];
      let endStation = stations[Math.floor(Math.random() * stations.length)];
      
      // Ensure start and end are different
      while (startStation.id === endStation.id) {
        endStation = stations[Math.floor(Math.random() * stations.length)];
      }

      const path = findShortestRoute(startStation.id, endStation.id, graph);

      if (path.length > 0) {
        await prisma.userDailyRoute.create({
          data: {
            user_id: user.id,
            start_station_id: startStation.id,
            end_station_id: endStation.id,
            calculated_station_ids_path: path,
            days_of_week: [1, 2, 3, 4, 5],
            preferred_start_time: new Date(2025, 0, 1, 8 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 60)),
          }
        });
      }

      process.stdout.write(`\rSeeded user ${i + 1}/${NAMES.length}...`);
    }

    console.log("\nDummy data seeding completed successfully!");

  } catch (error) {
    console.error("Error seeding dummy data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDummyUsers();
