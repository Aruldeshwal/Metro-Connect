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
