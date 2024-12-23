import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types/api";

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface ButtonState {
  isLoading: boolean;
  isSuccess: boolean;
}

interface StoreState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  buttonStates: { [key: number]: ButtonState };
  setButtonStates: (
    updater:
      | { [key: number]: ButtonState }
      | ((prev: { [key: number]: ButtonState }) => {
          [key: number]: ButtonState;
        })
  ) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  displayedProducts: number;
  setDisplayedProducts: (count: number) => void;

  decrementQuantity: (productId: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
      error: null,
      setError: (error) => set({ error }),

      buttonStates: {},
      setButtonStates: (updater) =>
        set((state) => ({
          buttonStates:
            typeof updater === "function"
              ? updater(state.buttonStates)
              : updater,
        })),

      cart: [],
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            cart: [
              ...state.cart,
              {
                id: product.id,
                product,
                quantity,
              },
            ],
          };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),

      displayedProducts: 3,
      setDisplayedProducts: (count) => set({ displayedProducts: count }),

      decrementQuantity: (productId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },
    }),
    {
      name: "somnio-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
