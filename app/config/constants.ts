export const APP_CONFIG = {
  PRODUCTS: {
    PER_PAGE: 3,
    REVALIDATE_TIME: 3600,
  },
  CART: {
    ANIMATION_DURATION: 300,
  },
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
} as const;

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1200,
} as const;
