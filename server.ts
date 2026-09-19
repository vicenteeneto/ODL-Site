import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

// ---------------------------------------------------------------------------
// Avaliações do Google
//
// Usa a Places API (New). A chave vai em GOOGLE_PLACES_API_KEY no .env.local.
// O Google devolve no máximo 5 avaliações por consulta — a nota e o total de
// avaliações vêm completos e sempre atualizados.
//
// O resultado fica em cache por 6 horas para não consumir cota à toa: cada
// visita ao site NÃO gera uma chamada à API.
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 horas
const PLACE_ID_PADRAO = "ChIJO5SMIDfJeZMR5Th-kDBhMeM"; // O Doutor Limpeza, Rondonópolis-MT

type Avaliacao = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time_description: string;
  publish_time?: string;
};

type Payload = {
  reviews: Avaliacao[];
  rating: number | null;
  total_ratings: number | null;
  fonte: "google" | "indisponivel";
  atualizado_em: string;
};

let cache: { dados: Payload; expiraEm: number } | null = null;

async function buscarAvaliacoes(): Promise<Payload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || PLACE_ID_PADRAO;

  if (!apiKey) {
    return {
      reviews: [],
      rating: null,
      total_ratings: null,
      fonte: "indisponivel",
      atualizado_em: new Date().toISOString(),
    };
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=pt-BR`;
  const resposta = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    },
  });

  if (!resposta.ok) {
    const corpo = await resposta.text();
    throw new Error(`Places API ${resposta.status}: ${corpo.slice(0, 300)}`);
  }

  const dados = (await resposta.json()) as any;

  const reviews: Avaliacao[] = (dados.reviews || [])
    .map((r: any) => ({
      author_name: r.authorAttribution?.displayName || "Cliente",
      profile_photo_url: r.authorAttribution?.photoUri,
      rating: r.rating,
      text: (r.originalText?.text || r.text?.text || "").trim(),
      relative_time_description: r.relativePublishTimeDescription || "",
      publish_time: r.publishTime,
    }))
    .filter((r: Avaliacao) => r.text.length > 0)
    // mais recentes primeiro
    .sort((a: Avaliacao, b: Avaliacao) =>
      (b.publish_time || "").localeCompare(a.publish_time || "")
    );

  return {
    reviews,
    rating: dados.rating ?? null,
    total_ratings: dados.userRatingCount ?? null,
    fonte: "google",
    atualizado_em: new Date().toISOString(),
  };
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.get("/api/reviews", async (req, res) => {
    const agora = Date.now();
    const forcar = req.query.refresh === "1";

    if (cache && cache.expiraEm > agora && !forcar) {
      res.set("Cache-Control", "public, max-age=1800");
      return res.json(cache.dados);
    }

    try {
      const dados = await buscarAvaliacoes();
      // só guarda em cache o que veio de fato do Google
      if (dados.fonte === "google") {
        cache = { dados, expiraEm: agora + CACHE_TTL_MS };
      }
      res.set("Cache-Control", "public, max-age=1800");
      return res.json(dados);
    } catch (erro) {
      console.error("Falha ao buscar avaliações do Google:", erro);
      // se houver cache antigo, serve ele em vez de deixar a seção vazia
      if (cache) {
        res.set("Cache-Control", "public, max-age=300");
        return res.json(cache.dados);
      }
      return res.status(200).json({
        reviews: [],
        rating: null,
        total_ratings: null,
        fonte: "indisponivel",
        atualizado_em: new Date().toISOString(),
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist", { maxAge: "7d" }));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    if (!process.env.GOOGLE_PLACES_API_KEY) {
      console.warn(
        "[avisos] GOOGLE_PLACES_API_KEY não configurada — a seção de avaliações vai usar os depoimentos de reserva."
      );
    }
  });
}

startServer();
