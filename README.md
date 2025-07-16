# 🧠 Pathfinding Visualizer Web Application

A modern, interactive web application that helps users visualize and understand how different pathfinding algorithms work on a grid. Built as an educational tool for students, developers, and algorithm enthusiasts.

<img width="933" height="580" alt="Screenshot 2025-07-16 at 8 09 13 PM" src="https://github.com/user-attachments/assets/eae520ad-e4f1-4f99-8ff3-aed6fd22ae8b" />

## ✨ Features

### 🎮 Interactive Grid
- **50x25 responsive grid** optimized for various screen sizes
- **Click and drag** to draw walls
- **Easy start/end point placement** with dedicated modes
- **Real-time grid manipulation** during algorithm setup

### 🔍 Algorithm Support
<img width="634" height="207" alt="Screenshot 2025-07-16 at 8 14 39 PM" src="https://github.com/user-attachments/assets/426c6b8e-92e7-4ad1-9a0e-1e60255e5b70" />


- **BFS (Breadth-First Search)** - Guarantees shortest path in unweighted graphs
- **DFS (Depth-First Search)** - Explores depth-first, good for maze solving
- **Dijkstra's Algorithm** - Optimal for weighted graphs with non-negative weights  
- **A\* (A-star) Search** - Heuristic-based, efficient pathfinding

### 🎬 Smooth Animations
- **Customizable animation speed** (1-100% speed control)
- **Distinct visual states** for visited nodes, current exploration, and final path
- **Smooth transitions** and hover effects for enhanced UX
- **Responsive animations** that work across different devices

### 🛠️ Advanced Controls
- **Algorithm selection dropdown** with detailed information
- **Drawing mode toggle** (Walls, Start Point, End Point)
- **Clear Grid** and **Clear Path** functionality
- **Maze generation** using randomized Prim's algorithm
- **Real-time algorithm information** panel

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Lucide React** for icons

### Backend
- **Java 17+**
- **Spring Boot 3.x**
- **Spring Web** for REST API
- **Maven** for dependency management

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** and **pnpm**
- **Java 17+** and **Maven**
- **Git**

### Frontend Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/TanishSen/Pathfinding-Visualizer.git
   cd Pathfinding-Visualizer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   pnpm dev
   \`\`\`

4. **Open your browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Backend Setup

1. **Navigate to backend directory**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Build the project**
   \`\`\`bash
   mvn clean package
   \`\`\`

3. **Run the Spring Boot application**
   \`\`\`bash
   java -jar target/pathfinding-visualizer-backend-1.0.0.jar
   \`\`\`

4. **API will be available at**
   \`\`\`
   http://localhost:8080
   \`\`\`

## 🧠 Meet the Algorithms

### 🔷 Weighted Algorithms
- **Dijkstra's Algorithm** – Guarantees the shortest path by exploring all nodes optimally
- **A* Search** – Uses heuristics (Manhattan distance) to find the shortest path more efficiently

### 🔶 Unweighted Algorithms
- **Breadth-First Search (BFS)** – Explores nodes layer by layer; guarantees the shortest path
- **Depth-First Search (DFS)** – Explores deeply before backtracking; does **not** guarantee the shortest path

## 🧩 Key Features

- 🧱 **Interactive Grid**: Click to place walls, start & end points  
- 🚀 **Algorithm Selection**: Choose and visualize 4+ algorithms  
- 🌀 **Real-Time Animation**: Smooth traversal and path animations  
- 📦 **Spring Boot Backend**: Java-powered algorithms exposed via REST APIs  
- ⚡ **Performance Optimized**: Java implementation for fast computation  
- 📏 **Scalable**: Supports dynamic grid sizes

## 🏗 How It Works

1. User sets up the grid and chooses an algorithm
2. Next.js frontend sends the grid configuration to the Java backend
3. Spring Boot processes the algorithm and returns the shortest path
4. The frontend animates the visited nodes and final path

## 🛠 Project Structure

\`\`\`
pathfinding-visualizer/
├── app/                    # Next.js app directory
├── components/            # React components
├── contexts/             # React contexts
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── backend/             # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/pathfinding/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── model/
│   │       └── dto/
│   └── pom.xml
└── package.json
\`\`\`

## 🎯 API Endpoints

- **GET** \`/\` - Welcome message and endpoint information
- **GET** \`/api/\` - API information with supported algorithms
- **GET** \`/api/health\` - Health check endpoint
- **POST** \`/api/pathfind\` - Execute pathfinding algorithm

## 🌟 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Clément Mihailescu's pathfinding visualizer
- Built with modern web technologies for educational purposes
- Special thanks to the open-source community

---

**Built with ❤️ for education and learning**
