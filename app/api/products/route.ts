import { NextResponse } from "next/server";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("API URL not configured");
}

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products. ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while fetching products";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
