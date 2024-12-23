import { css } from "@emotion/react";
import { Product } from "@/types/api";
import { BREAKPOINTS } from "@/app/config/constants";

const getPriceColor = (price: number) => {
  if (price <= 50) return "#87c2c9";
  if (price <= 99.99) return "#c3c787";
  return "#8f84cb";
};

export const productCardStyles = {
  container: css`
    position: relative;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 500px;
    border: 1px solid #cbd5e1;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.35s ease;

    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: ${BREAKPOINTS.desktop}px) {
      height: 500px;
      width: 400px;
      min-width: 400px;
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      width: 100%;
      height: 500px;
      min-width: 100%;
    }
  `,
  imageContainer: css`
    position: relative;
    width: 100%;
    height: 300px;
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
    border-bottom: 1px solid #cbd5e1;
  `,
  plusIcon: css`
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 0;
    cursor: pointer;
    z-index: 100;
    &:disabled {
      opacity: 1;
      background-color: #fff;
      border-color: #000;
      color: #000;
    }
  `,
  image: css`
    object-fit: contain;
  `,
  priceContainer: (product: Product) => css`
    position: absolute;
    bottom: 20px;
    right: 0px;
    padding: 8px 12px;
    font-weight: 600;
    color: rgb(0, 0, 0, 0.8);
    font-size: 1.2rem;
    border-radius: 0;
    z-index: 100;
    background-color: ${getPriceColor(product.price)};
  `,
  contentContainer: css`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 8px;
    height: calc(200px - 32px);
  `,
  title: css`
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
    line-height: 1.4;
  `,
  description: css`
    font-size: 0.875rem;
    color: #666;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
    line-height: 1.4;
  `,
};
