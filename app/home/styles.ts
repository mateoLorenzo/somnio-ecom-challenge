import { css, keyframes } from "@emotion/react";
import { BREAKPOINTS } from "../config/constants";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const homeStyles = {
  screenContainer: css`
    width: 100%;
  `,
  contentContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
    gap: 15px;
  `,
  productsContainer: css`
    display: flex;
    flex-wrap: wrap;

    gap: 32px;
    justify-content: center;
    width: 100%;

    & > div {
      opacity: 0;
      animation: ${fadeIn} 0.2s ease-in forwards;
    }

    & > div:nth-of-type(1) {
      animation-delay: 0.1s;
    }
    & > div:nth-of-type(2) {
      animation-delay: 0.2s;
    }
    & > div:nth-of-type(3) {
      animation-delay: 0.3s;
    }
    & > div:nth-of-type(4) {
      animation-delay: 0.4s;
    }
    & > div:nth-of-type(5) {
      animation-delay: 0.5s;
    }
    & > div:nth-of-type(6) {
      animation-delay: 0.6s;
    }
    @media (max-width: ${BREAKPOINTS.desktop}px) {
      justify-content: center;
      align-items: center;
      gap: 16px;
      display: flex;
      flex-wrap: wrap;
    }

    @media (max-width: ${BREAKPOINTS.tablet}px) {
      gap: 16px;
      max-width: 400px;
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      gap: 16px;
    }
  `,
  loadMoreButton: css`
    width: 200px;
    height: 40px;
    background-color: #fff;
    color: #000;
    font-weight: 600;
    border: 1px solid #cbd5e1;
    &:hover {
      background-color: #f1f5f9;
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      width: 100%;
      height: 50px;
    }
  `,
  loadMoreButtonIcon: css`
    margin-right: 8px;
  `,
  noResultsContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    text-align: center;
    min-height: 400px;
    width: 100%;
    margin-top: 10vh;
    animation: ${fadeIn} 0.1s ease-in forwards;
  `,
  noResultsIcon: css`
    font-size: 80px;
    color: #cbd5e1;
    margin-bottom: 2rem;
  `,
  noResultsTitle: css`
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a1a1a;
  `,
  noResultsText: css`
    font-size: 1.1rem;
    color: #64748b;
    margin-bottom: 2rem;
    max-width: 500px;
    line-height: 1.5;
  `,
  clearSearchButton: css`
    background-color: #fff;
    color: #000;
    font-weight: 600;
    border: 1px solid #cbd5e1;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: #f1f5f9;
      transform: translateY(-1px);
    }
  `,
};
