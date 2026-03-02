import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("nexus.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT,
    role TEXT,
    content TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT 0
  );
  
  CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    points INTEGER,
    level INTEGER,
    badge TEXT
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/posts", (req, res) => {
    try {
      const posts = db.prepare("SELECT * FROM posts ORDER BY timestamp DESC").all();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.post("/api/posts", (req, res) => {
    try {
      const { author, role, content, verified } = req.body;
      const stmt = db.prepare("INSERT INTO posts (author, role, content, verified) VALUES (?, ?, ?, ?)");
      const info = stmt.run(author, role, content, verified ? 1 : 0);
      res.json({ id: info.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.get("/api/leaderboard", (req, res) => {
    try {
      const leaderboard = db.prepare("SELECT * FROM leaderboard ORDER BY points DESC").all();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);

    // Fallback to index.html for SPA
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        if (e instanceof Error) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
