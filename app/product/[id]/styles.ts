import { css } from "@emotion/react";
import { BREAKPOINTS } from "@/app/config/constants";

export const productPageStyles = {
  screenContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
  contentContainer: css`
    width: 90%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    gap: 50px;
    align-items: flex-start;
    margin-bottom: 5vh;
    padding: 20px;
    @media (max-width: ${BREAKPOINTS.tablet}px) {
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }
  `,
  imageContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 600px;
    height: 600px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;

    @media (max-width: ${BREAKPOINTS.tablet}px) {
      width: 100%;
      max-width: 500px;
      height: 500px;
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      width: 100%;
      height: 400px;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain !important;
    }
  `,
  imageLoadingContainer: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 1;
  `,
  productImage: css`
    object-fit: contain;
    transition: opacity 0.2s ease-in-out;
  `,
  productInfoContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    min-width: 300px;
    max-width: 500px;

    @media (max-width: ${BREAKPOINTS.tablet}px) {
      width: 100%;
      max-width: 100%;
    }
  `,
  breadcrumb: css`
    width: 100%;
  `,
  breadcrumbList: css`
    width: 100%;
    display: flex;
    align-items: center;
  `,
  breadcrumbItem: css`
    cursor: pointer;
    flex-shrink: 0;
  `,
  breadcrumbTitle: css`
    cursor: pointer;
    min-width: 0;
    flex: 1;
  `,
  breadcrumbPage: css`
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  `,
  breadcrumbSeparator: css`
    flex-shrink: 0;
  `,
  title: css`
    font-size: 32px;
    font-weight: bold;
    line-height: 1.2;
    margin-top: 20px;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      font-size: 24px;
    }
  `,
  rating: css`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
  `,
  starsContainer: css`
    display: flex;
    gap: 5px;
    align-items: center;
  `,
  ratingText: css`
    color: #666;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  description: css`
    font-size: 16px;
    font-weight: normal;
    margin-top: 20px;
    line-height: 1.5;
    color: #666;
  `,
  price: css`
    font-size: 28px;
    font-weight: bold;
    margin-top: 20px;
    color: #000;
  `,
  addToCartContainer: css`
    display: flex;
    margin-top: 20px;
    width: 100%;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      margin-top: 16px;
      flex-direction: row;
    }
  `,
  quantityContainer: css`
    display: flex;
    justify-content: space-between;
    width: 130px;
    align-items: center;
    border: 1px solid black;
    padding: 10px 15px;
    user-select: none;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      width: 110px;
      padding: 8px 12px;
      font-size: 14px;
    }
  `,
  quantityButton: css`
    cursor: pointer;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 0.7;
    }
  `,
  addToCartButton: css`
    background-color: #000;
    color: white;
    padding: 12px 24px;
    cursor: pointer;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease;
    font-weight: 500;

    &:hover {
      background-color: #333;
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      padding: 8px 16px;
      font-size: 14px;
    }
  `,
  recommendedSection: css`
    width: 100%;
    padding: 2rem 4rem;
    padding-bottom: 3rem;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      padding: 1rem;
      padding-bottom: 2rem;
    }

    [data-carousel-prev-button],
    [data-carousel-next-button] {
      @media (max-width: ${BREAKPOINTS.mobile}px) {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 35px;
        height: 35px;
        background-color: white;
        border: 1px solid #e2e8f0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }

    [data-carousel-prev-button] {
      @media (max-width: ${BREAKPOINTS.mobile}px) {
        left: -5px;
      }
    }

    [data-carousel-next-button] {
      @media (max-width: ${BREAKPOINTS.mobile}px) {
        right: -5px;
      }
    }
  `,
  recommendedTitle: css`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a1a;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
  `,
  recommendedProductCardContainer: css`
    cursor: pointer;
    margin-bottom: 20px;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      margin-bottom: 10px;
      padding: 0 5px;
    }
  `,
  recommendedProductCard: css`
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    margin: 0.5rem;
    margin-bottom: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      padding: 0.75rem;
      margin: 0.25rem;
      margin-bottom: 0.5rem;
    }
  `,
  recommendedImageContainer: css`
    position: relative;
    width: 100%;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
    overflow: hidden;
    border-bottom: 1px solid #e2e8f0;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      height: 120px;
      padding: 0.25rem 0;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      width: auto !important;
      height: auto !important;
      object-fit: contain;
    }
  `,
  recommendedImage: css`
    object-fit: contain;
  `,
  recommendedProductInfo: css`
    padding: 0.75rem 0.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 80px;

    h3 {
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #1a1a1a;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.2;
    }

    p {
      font-size: 1rem;
      font-weight: 600;
      color: #2c5282;
      margin-top: auto;
    }
  `,
  carouselContainer: css`
    width: 100%;
    max-width: 1200px;
    position: relative;
    padding: 0 20px;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      padding: 0 15px;
    }
  `,
};
