import { Product } from "@/types/api";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("/api/products");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch products");
    }

    if (!Array.isArray(data)) {
      throw new Error("Invalid response format from API");
    }

    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(message);
  }
};
