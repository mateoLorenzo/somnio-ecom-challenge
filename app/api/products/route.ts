import { NextResponse } from "next/server";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("API URL not configured");
}

export const runtime = "edge";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        headers: { Accept: "application/json" },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products`, {
        cause: response.statusText,
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
