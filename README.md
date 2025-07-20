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
- **Node.js** 18+ and npm
- **Java** 17+ and Maven
- **Git**

### Frontend Setup

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd pathfinding-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

The frontend will be available at \`http://localhost:3000\`

### Backend Setup

\`\`\`bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
\`\`\`

The backend API will be available at \`http://localhost:8080\`

## 📡 API Documentation

### POST /api/pathfind

Executes pathfinding algorithm and returns visited nodes and optimal path.

**Request Body:**
\`\`\`json
{
  "grid": [["empty", "wall", "empty"], ...],
  "start": {"row": 0, "col": 0},
  "end": {"row": 10, "col": 10},
  "algorithm": "bfs"
}
\`\`\`

**Response:**
\`\`\`json
{
  "visitedNodes": [{"row": 0, "col": 1}, ...],
  "path": [{"row": 0, "col": 0}, ...],
  "success": true
}
\`\`\`

## 🧮 Algorithm Explanations

### Breadth-First Search (BFS)
- **Time Complexity:** O(V + E)
- **Space Complexity:** O(V)
- **Guarantees shortest path** in unweighted graphs
- Explores nodes level by level using a queue

### Depth-First Search (DFS)  
- **Time Complexity:** O(V + E)
- **Space Complexity:** O(V)
- **Does not guarantee shortest path**
- Explores as far as possible along each branch using a stack

### Dijkstra's Algorithm
- **Time Complexity:** O((V + E) log V)
- **Space Complexity:** O(V)
- **Guarantees shortest path** in weighted graphs with non-negative weights
- Uses a priority queue to always explore the closest unvisited node

### A\* Search
- **Time Complexity:** O(b^d) where b is branching factor, d is depth
- **Space Complexity:** O(b^d)
- **Guarantees shortest path** with admissible heuristic
- Combines Dijkstra's approach with heuristic guidance toward the goal

## 🎨 UI/UX Features

### Visual Legend
- 🟢 **Green** - Start point
- 🔴 **Red** - End point  
- ⬛ **Black** - Walls/obstacles
- 🔵 **Blue** - Visited nodes during search
- 🟡 **Yellow** - Final optimal path

### Responsive Design
- **Mobile-friendly** grid that adapts to screen size
- **Touch-friendly** controls for mobile devices
- **Keyboard navigation** support
- **Accessible** color scheme and contrast ratios

## 🔧 Development

### Project Structure
\`\`\`
pathfinding-visualizer/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── grid.tsx           # Main grid component
│   ├── cell.tsx           # Individual cell component
│   └── control-panel.tsx  # Algorithm controls
├── contexts/              # React contexts
│   └── grid-context.tsx   # Grid state management
├── lib/                   # Utility functions
└── backend/               # Java Spring Boot API
    ├── src/main/java/
    └── pom.xml
\`\`\`

### Key Components
- **GridProvider** - Manages global grid state and algorithm execution
- **Grid** - Renders the interactive pathfinding grid
- **Cell** - Individual grid cell with click/hover interactions
- **ControlPanel** - Algorithm selection and visualization controls
- **AlgorithmInfo** - Real-time algorithm information and complexity details

## 🚀 Deployment

### Frontend (Vercel)
\`\`\`bash
# Deploy to Vercel
npm run build
vercel --prod
\`\`\`

### Backend (Railway/Render)
\`\`\`bash
# Build JAR file
mvn clean package

# Deploy JAR to your preferred platform
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

<<<<<<< Updated upstream
- Inspired by Clément Mihailescu's pathfinding visualizer
- Built with modern web technologies for educational purposes
- Special thanks to the open-source community
=======
- **Pathfinding algorithms** - Classic computer science algorithms
- **shadcn/ui** - Beautiful and accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Spring Boot** - Java application framework

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Join our community discussions

---

**Built with ❤️ for education and learning**
\`\`\`
\`\`\`

Now let me create the Java Spring Boot backend code:
>>>>>>> Stashed changes
