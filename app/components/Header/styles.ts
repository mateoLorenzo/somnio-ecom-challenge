import { BREAKPOINTS } from "@/app/config/constants";
import { css, keyframes } from "@emotion/react";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const headerStyles = {
  container: css`
    height: 10vh;
    background-color: #b9bedb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    width: 100%;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      padding: 0 10px;
    }
  `,
  logo: css`
    width: auto;
    height: auto;
    cursor: pointer;
  `,
  searchContainer: css`
    width: 40%;
    position: relative;
    max-width: 500px;
    display: flex;
    align-items: center;
  `,
  searchInput: css`
    height: 40px;
    border-radius: 100px;
    border: 1px solid #ccc;
    padding: 0 20px;
    background-color: #fff;
    width: 100%;
    outline: none;
    color: #808080;
    font-size: 16px;
    font-weight: 400;
    font-size: 14px;
    &::placeholder {
      color: #808080;
      opacity: 0.7;
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      font-size: 14px;
      margin-right: 10px;
    }
  `,
  searchIcon: css`
    position: absolute;
    right: 20px;
    color: #808080;
  `,
  cartContainer: css`
    display: flex;
    align-items: flex-end;
    position: relative;
  `,
  cartCount: css`
    margin-right: 10px;
    color: #000;
    width: 30px;
    height: 30px;
    background-color: lightgray;
    border: 1px solid gray;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 12px;
    position: absolute;
    bottom: -10px;
    left: -25px;
    cursor: default;
  `,
  cartCountAnimate: css`
    margin-right: 10px;
    color: #000;
    width: 30px;
    height: 30px;
    background-color: lightgray;
    border: 1px solid gray;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 12px;
    position: absolute;
    bottom: -10px;
    left: -25px;
    cursor: default;
    animation: ${pulse} 0.3s ease-in-out;
  `,
  cartIcon: css`
    cursor: pointer;
    transition: all 0.2s ease;
  `,
};
