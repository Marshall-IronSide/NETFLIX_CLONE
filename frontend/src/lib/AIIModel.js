const rawBackendUrl = import.meta.env.VITE_BACKEND_URL?.trim();
const BACKEND_URL = rawBackendUrl && rawBackendUrl.startsWith("http")
  ? rawBackendUrl
  : "http://localhost:5000";

export async function getAIRecommendation(prompt) {
  if (!prompt || !prompt.trim()) {
    console.error("AI proxy error: prompt is empty");
    return null;
  }

  try {
    const url = new URL("/api/ai/recommend", BACKEND_URL).toString();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const textResponse = await response.text();
    if (!response.ok) {
      // Try to parse JSON error, otherwise log raw text
      try {
        const jsonErr = JSON.parse(textResponse);
        console.error("AI proxy error", response.status, jsonErr);
      } catch (e) {
        console.error("AI proxy error", response.status, textResponse);
      }
      return null;
    }

    // When OK, the backend returns JSON `{ text: "..." }` as text body
    try {
      const data = JSON.parse(textResponse);
      console.log("AI proxy success: text length", (data.text || "").length);
      return data.text || null;
    } catch (e) {
      // If backend returned raw text instead of JSON, return it directly
      console.warn("AI proxy: response not JSON, returning raw text");
      return textResponse || null;
    }
  } catch (error) {
    console.error("Error calling AI proxy:", error);
    return null;
  }
}
