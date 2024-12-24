import { NextResponse } from "next/server";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("API URL not configured");
}

export const runtime = "edge";

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error("API Response not OK:", {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(
        `API response not ok: ${response.status} ${response.statusText}`
      );
    }

    const text = await response.text();

    if (!text) {
      console.error("Empty response received");
      throw new Error("Empty response from API");
    }

    try {
      const data = JSON.parse(text);

      if (!Array.isArray(data)) {
        console.error("Invalid data format received:", data);
        throw new Error("Invalid response format: expected an array");
      }

      return new NextResponse(text, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    } catch (parseError) {
      console.error(
        "JSON Parse Error:",
        parseError,
        "Response:",
        text.slice(0, 100)
      );
      throw new Error(`Failed to parse JSON response`);
    }
  } catch (error: unknown) {
    console.error("API Route Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timeout - please try again" },
        { status: 408 }
      );
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
