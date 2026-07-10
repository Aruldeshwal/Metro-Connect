
# 🚇 MetroConnect (Line-A-Link)

**Social Networking for the Daily Commute.**

MetroConnect is a cutting-edge social matching platform designed for metro commuters. It bridges the gap between daily transit and social connection by matching users who share overlapping commute paths, enabling them to discover companions, network, or simply share their journey.

---

## ✨ Key Features

- **📍 Intelligent Route Matching**: Proprietary matching algorithm that calculates overlaps between user daily commute paths, considering shared stations and travel times.
- **🗺️ Graph-Based Navigation**: High-performance BFS (Breadth-First Search) algorithm to compute optimized paths through complex metro networks.
- **🤖 AI-Enhanced Conversations**: 
    - **Contextual Icebreakers**: Generative AI (Gemini/Groq) creates personalized conversation starters based on match commonalities and user profiles.
    - **Smart Replies**: AI-powered response suggestions to keep conversations flowing naturally.
- **💬 Real-time Interactions**: Instant messaging powered by Socket.io, providing a seamless chat experience.
- **🌐 Immersive Visualizations**: 
    - **Route highlighter**: Interactive metro graph visualization that highlights the route on real map.
    - **Geospatial Mapping**: High-fidelity route overlays using Mapbox GL and Google Maps API.
- **👤 Rich User Profiles**: Deep profile customization including interests, bio, occupation, and social links to foster meaningful connections.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15.1+](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **State Management**: React Hooks & Context API
- **UI Components**: Radix UI, Lucide React, Sonner (Toasts)

### Backend & Database
- **Runtime**: [Node.js](https://nodejs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Real-time**: [Socket.io](https://socket.io/)

### AI & Data
- **AI Models**: Google Gemini (via `@google/generative-ai`), Groq SDK
- **Data Source**: GTFS-compliant metro data (Stations & Lines)
- **Algorithms**: BFS for shortest path, Overlap calculation for matching

---

## 🏗️ Architecture

### Directory Structure
```text
src/
├── app/              # Next.js App Router (Pages, API Routes, Layouts)
├── components/       # UI Components (shared, blocks, landing, ui)
├── hooks/            # Custom React Hooks (real-time chat, metro graph, etc.)
├── lib/              # Core Logic (AI providers, graph algorithms, match logic)
├── server/           # Server-side logic (Prisma queries, server actions)
├── types/            # TypeScript Type Definitions
└── scripts/          # Database seeding and maintenance scripts
```

### Core Modules
1.  **Routing Engine (`src/lib/graph`)**: Uses an adjacency list representation of the metro network to find the most efficient paths between any two stations.
2.  **Matching System (`src/lib/match`)**: Evaluates user routes for overlap, generating a "Match Score" based on shared segments and frequency.
3.  **AI Orchestrator (`src/lib/ai`)**: A multi-provider fallback system that manages prompts for icebreakers and smart replies, ensuring high availability and context relevance.
4.  **Real-time Layer (`src/hooks/useRealtimeChat.ts`)**: Manages WebSocket connections for instant messaging and presence.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Clerk Account (for Auth)
- Google Gemini / Groq API Keys

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/metro-connect.git
   cd metro-connect
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
   CLERK_SECRET_KEY="..."
   GEMINI_API_KEY="..."
   GROQ_API_KEY="..."
   ```

4. **Database Initialization**:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed # If a seed script is available
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## 📊 Data Model

- **`User`**: Core user entity with social and profile attributes.
- **`MetroStation` / `MetroLine`**: Static data representing the metro infrastructure.
- **`UserDailyRoute`**: Personalized routes defined by users.
- **`Match`**: Represents a connection between two users based on route overlap.
- **`Conversation` / `Message`**: The communication layer for matched users.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
=======
# 🚇 Metro Connect

Metro Connect is a full-stack web application designed to help commuters find and connect with other people traveling along the same metro routes. It enables users to set daily routes, discover relevant commuters, and coordinate through an intuitive interface.

The goal of the project is to make daily commuting smarter, more social, and more efficient.

---

## ✨ Features

- 🔐 Secure Authentication (Clerk)
- 👤 User Profile Creation & Management
- 🗺 Route Setup (Start & End Stations)
- 🧠 Shortest Route Calculation (BFS-based graph traversal)
- 📅 Daily Route Scheduling
- 💬 Commuter Matching Foundation
- 📊 Dashboard with Active Link Status
- 🎨 Modern UI with Tailwind + Motion Animations

---

## 🏗 Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **shadcn/ui**

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL (or compatible database)**

### Authentication
- **Clerk**

---

## 📁 Project Structure

```
src/
│
├── app/
│   ├── api/                    # API route handlers
│   │   ├── users/
│   │   └── stationRouteSearch/
│   │
│   ├── dashboard/              # User dashboard
│   ├── main/                   # Landing sections
│   ├── (links)/                # Static informational pages
│   └── layout.tsx
│
├── components/                 # Reusable UI components
├── lib/                        # Utility logic (Prisma, graph, etc.)
├── hooks/                      # Custom hooks
└── styles/
```

---

## 🧠 Route Calculation Logic

Metro Connect uses a **Breadth-First Search (BFS)** algorithm to calculate the shortest metro path between two stations.

```ts
type AdjacencyList = Map<string, Set<string>>;
```

- Time Complexity: `O(V + E)`
- Space Complexity: `O(V)`

This ensures optimal shortest path discovery in an unweighted graph.

---

## 🔐 Authentication Flow

- Users sign in using Clerk.
- User ID is validated inside protected API routes.
- Server-side route handlers verify:
  ```ts
  const user = await currentUser();
  ```
- Only authenticated users can update profiles or create routes.

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# Database
DATABASE_URL=your_database_url

# (Optional) Other service keys
```

Never commit `.env` files.

---

## 🗄 Database (Prisma)

Initialize Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

Example model structure:

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String?  @unique
  ...
}
```

---

## 🚀 Running Locally

1. Clone the repository:

```bash
git clone https://github.com/Aruldeshwal/Metro-Connect.git
cd Metro-Connect
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables.

4. Run development server:

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 🏗 Build for Production

```bash
npm run build
npm start
```

---

## ☁ Deployment

Recommended deployment platform:

- **Vercel**

Steps:
1. Push repository to GitHub.
2. Import into Vercel.
3. Add environment variables in dashboard.
4. Deploy.

---

## 🧩 Architecture Notes

- Uses App Router.
- Server Components by default.
- Client Components explicitly marked with `"use client"`.
- API routes follow Next.js 15 async params convention:
  ```ts
  { params }: { params: Promise<{ userId: string }> }
  ```

---

## 🔒 Security Considerations

- Clerk validates authenticated users.
- Protected API routes verify user ID ownership.
- Prisma guards against injection.
- No sensitive data exposed to client.

---

## 📌 Future Improvements

- Real-time matching
- WebSocket chat
- Notification system
- Route optimization enhancements
- Admin analytics panel
- Role-based access control

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Arul Deshwal**  
GitHub: https://github.com/Aruldeshwal

---

## 🎯 Project Vision

Metro Connect aims to transform daily commuting from an isolated routine into a connected experience. By combining graph algorithms, authentication, and intuitive UI design, it demonstrates how full-stack engineering can solve real-world inefficiencies.

---