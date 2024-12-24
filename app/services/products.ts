import { Product } from "@/types/api";
import { APP_CONFIG } from "../config/constants";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(APP_CONFIG.API.BASE_URL!, {
      next: { revalidate: APP_CONFIG.PRODUCTS.REVALIDATE_TIME },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(message);
  }
}
