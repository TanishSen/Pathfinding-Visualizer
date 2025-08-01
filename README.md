# 🧠 Pathfinding Visualizer Web Application

A modern, interactive web application that helps users visualize and understand how different pathfinding algorithms work on a grid. Built as an educational tool for students, developers, and algorithm enthusiasts.

![Pathfinding](https://github.com/user-attachments/assets/5819cf8d-d814-43ba-b284-9586ea0b07aa)


## ✨ Features

### 🎮 Interactive Grid
- **50x25 responsive grid** optimized for various screen sizes
- **Click and drag** to draw walls
- **Easy start/end point placement** with dedicated modes
- **Real-time grid manipulation** during algorithm setup

### 🔍 Algorithm Support
![PHOTO-2025-08-02-00-34-28](https://github.com/user-attachments/assets/931acb3a-8622-42ea-8ce8-b4d305bf31df)



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

## Clone the repository
git clone <repository-url>
cd pathfinding-visualizer

## Frontend Setup
bash

### Install dependencies
npm install

### Start development server
npm run dev

The frontend will be available at \`http://localhost:3000\`

## Backend Setup
bash

### Navigate to backend directory
cd backend

### Build the project
mvn clean install

### Run the Spring Boot application
mvn spring-boot:run

The backend API will be available at \`http://localhost:8080\`

## 📡 API Documentation

### POST /api/pathfind

Executes pathfinding algorithm and returns visited nodes and optimal path.

**Request Body:**

json

{


  "grid": [["empty", "wall", "empty"], ...],


  "start": {"row": 0, "col": 0},


  "end": {"row": 10, "col": 10},


  "algorithm": "bfs"


}


**Response:**

json

{

  "visitedNodes": [{"row": 0, "col": 1}, ...],


  "path": [{"row": 0, "col": 0}, ...],


  "success": true
  
}


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

<img width="423" height="269" alt="Screenshot 2025-08-02 at 12 48 46 AM" src="https://github.com/user-attachments/assets/4a200d58-17bb-4e9f-beb6-65117ff31af9" />


### Key Components
- **GridProvider** - Manages global grid state and algorithm execution
- **Grid** - Renders the interactive pathfinding grid
- **Cell** - Individual grid cell with click/hover interactions
- **ControlPanel** - Algorithm selection and visualization controls
- **AlgorithmInfo** - Real-time algorithm information and complexity details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Inspired by Clément Mihailescu's pathfinding visualizer



