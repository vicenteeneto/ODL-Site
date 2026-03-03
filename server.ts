import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API route to proxy Google Places Reviews
  app.get("/api/reviews", async (req, res) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID || "ChIJO5SMIDfJeZMR5Th-kDBhMeM";

    if (!apiKey) {
      return res.status(500).json({ error: "GOOGLE_PLACES_API_KEY not configured" });
    }

    try {
      // Google Places Details API returns up to 5 reviews
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}&language=pt-BR`;
      const response = await fetch(url);
      const data = (await response.json()) as any;

      if (data.status !== "OK") {
        return res.status(400).json({ error: data.error_message || "Failed to fetch reviews" });
      }

      res.json({
        reviews: data.result.reviews || [],
        rating: data.result.rating,
        total_ratings: data.result.user_ratings_total
      });
    } catch (error) {
      console.error("Error fetching Google Reviews:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
