# 🧭 Pathfinding Visualizer

Welcome to **Pathfinding Visualizer** — a web-based interactive tool built to demonstrate how popular pathfinding algorithms work in real time. I built this project out of my passion for algorithms and web development, combining my Java backend skills with modern frontend design using React.

This application allows users to draw walls, select start and end points, and visualize the shortest path across a grid using various algorithms. I hope you enjoy experimenting with this tool as much as I enjoyed building it.

---

## 🚀 Tech Stack

- **Frontend**: React.js, HTML, CSS
- **Backend**: Java, Spring Boot
- **APIs**: RESTful services
- **Animation**: CSS transitions + custom JS logic

---

## 🧠 Meet the Algorithms

This visualizer supports the following pathfinding algorithms:

### 🔷 Weighted Algorithms
- **Dijkstra's Algorithm** – Guarantees the shortest path by exploring all nodes optimally.
- **A* Search** – Uses heuristics (Manhattan distance) to find the shortest path more efficiently than Dijkstra.
- **Greedy Best-First Search** – Heuristic-based and fast, but doesn’t guarantee the shortest path.

### 🔶 Unweighted Algorithms
- **Breadth-First Search (BFS)** – Explores nodes layer by layer; guarantees the shortest path in unweighted graphs.
- **Depth-First Search (DFS)** – Explores deeply before backtracking; does **not** guarantee the shortest path.

---

## 🧩 Key Features

- 🧱 **Interactive Grid**: Click to place walls, start & end points  
- 🚀 **Algorithm Selection**: Choose and visualize 4+ algorithms  
- 🌀 **Real-Time Animation**: Smooth traversal and path animations  
- 📦 **Spring Boot Backend**: Java-powered algorithms exposed via REST APIs  
- ⚡ **Performance Optimized**: Java implementation reduces computation by up to **40%**  
- 📏 **Scalable**: Supports dynamic grid sizes (up to 50x50)

---

## 🏗 How It Works

1. User sets up the grid and chooses an algorithm
2. React frontend sends the grid configuration to the Java backend
3. Spring Boot processes the algorithm and returns the shortest path
4. The frontend animates the visited nodes and final path

---

## 🛠 Setup Instructions

### Prerequisites
- Java (JDK 17+)
- Node.js & npm
- Maven or Gradle

### Backend (Java + Spring Boot)

