// ---------------------------------------------------------------------------
// /api/reviews  —  Serverless Function da Vercel
//
// A Vercel roda o projeto como site estático (vite build + dist/), então o
// server.ts do desenvolvimento local NÃO sobe para produção. Este arquivo é a
// versão de produção do mesmo endpoint: a Vercel detecta a pasta api/
// automaticamente e publica cada arquivo dela como uma função.
//
// Configuração necessária no painel da Vercel (Settings → Environment
// Variables):
//   GOOGLE_PLACES_API_KEY  → obrigatória, a chave da Places API (New)
//   GOOGLE_PLACE_ID        → opcional, já tem o da ODL como padrão
//
// O Google devolve no máximo 5 avaliações. A nota e o total vêm completos.
//
// Cache: a resposta é guardada pela CDN da Vercel por 6 horas (s-maxage) e
// pode ser servida "velha" por mais 24 h enquanto revalida em segundo plano
// (stale-while-revalidate). Ou seja, uma visita não gera uma chamada à API do
// Google — a cota é consumida no máximo 4 vezes por dia.
// ---------------------------------------------------------------------------

const PLACE_ID_PADRAO = "ChIJO5SMIDfJeZMR5Th-kDBhMeM"; // O Doutor Limpeza, Rondonópolis-MT

type Avaliacao = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time_description: string;
  publish_time?: string;
};

const vazio = (motivo: string) => ({
  reviews: [] as Avaliacao[],
  rating: null,
  total_ratings: null,
  fonte: "indisponivel" as const,
  motivo,
  atualizado_em: new Date().toISOString(),
});

export default async function handler(req: any, res: any) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || PLACE_ID_PADRAO;

  if (!apiKey) {
    // sem chave: devolve 200 com lista vazia para o site cair nos depoimentos
    // de reserva em vez de mostrar erro ao visitante
    res.setHeader("Cache-Control", "public, s-maxage=60");
    return res.status(200).json(vazio("GOOGLE_PLACES_API_KEY nao configurada"));
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=pt-BR`;
    const resposta = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
    });

    if (!resposta.ok) {
      const corpo = await resposta.text();
      console.error("Places API", resposta.status, corpo.slice(0, 300));
      res.setHeader("Cache-Control", "public, s-maxage=60");
      return res.status(200).json(vazio(`Places API ${resposta.status}`));
    }

    const dados: any = await resposta.json();

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

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=21600, stale-while-revalidate=86400"
    );
    return res.status(200).json({
      reviews,
      rating: typeof dados.rating === "number" ? dados.rating : null,
      total_ratings:
        typeof dados.userRatingCount === "number" ? dados.userRatingCount : null,
      fonte: "google",
      atualizado_em: new Date().toISOString(),
    });
  } catch (erro: any) {
    console.error("Falha ao buscar avaliacoes do Google:", erro);
    res.setHeader("Cache-Control", "public, s-maxage=60");
    return res.status(200).json(vazio("falha de rede"));
  }
}
