import { css } from "@emotion/react";
import { BREAKPOINTS } from "../config/constants";

export const cartStyles = {
  screenContainer: css`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `,
  contentContainer: css`
    flex: 1;
    display: flex;
    justify-content: center;
  `,
  container: css`
    width: 70%;
    max-width: 900px;
    margin-top: 100px;
    display: flex;
    flex-direction: column;

    @media (max-width: ${BREAKPOINTS.tablet}px) {
      width: 90%;
      margin-top: 60px;
    }
  `,
  title: css`
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 32px;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      font-size: 24px;
    }
  `,
  cartItemsContainer: css`
    width: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 30px 50px;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      padding: 20px 25px;
    }
  `,
  cartItem: css`
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1.5px solid #c4c4c4;
    user-select: none;

    &:last-child {
      border-bottom: none;
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      padding: 15px 0;
      font-size: 14px;
    }
  `,
  quantityContainer: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border: 1px solid #000;
    padding: 10px;
    width: 130px;
    user-select: none;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      gap: 15px;
      padding: 8px;
      width: 100px;
      font-size: 14px;
    }
  `,
  quantityButton: css`
    cursor: pointer;
  `,
  cartItemTitle: css`
    flex: 1;
    margin-left: 100px;
    margin-right: 50px;

    @media (max-width: ${BREAKPOINTS.desktop}px) {
      margin-left: 30px;
      margin-right: 30px;
    }

    @media (max-width: ${BREAKPOINTS.tablet}px) {
      margin-left: 20px;
      margin-right: 20px;
      font-size: 14px;
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      margin-left: 15px;
      margin-right: 15px;
      font-size: 13px;
    }
  `,
  buttonContainer: css`
    display: flex;
    justify-content: center;
    margin-top: 20px;
  `,
  button: css`
    background-color: #8787c8;
    width: 160px;
    color: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    &:hover {
      background-color: #a0a0d7;
      color: white;
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      width: 140px;
      font-size: 13px;
      padding: 8px 16px;
    }
  `,
  emptyCartContainer: css`
    width: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 60px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      padding: 40px 20px;
    }
  `,
  emptyCartIcon: css`
    font-size: 80px;
    color: #8787c8;
    margin-bottom: 24px;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      font-size: 60px;
      margin-bottom: 20px;
    }
  `,
  emptyCartTitle: css`
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #1a1a1a;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      font-size: 22px;
      margin-bottom: 12px;
    }
  `,
  emptyCartText: css`
    font-size: 16px;
    color: #64748b;
    margin-bottom: 32px;
    max-width: 400px;
    line-height: 1.5;

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      font-size: 14px;
      margin-bottom: 24px;
      max-width: 300px;
      line-height: 1.4;
    }
  `,
  startShoppingButton: css`
    background-color: #8787c8;
    color: white;
    font-weight: 600;
    border: none;
    padding: 12px 32px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #a0a0d7;
      transform: translateY(-1px);
    }

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      padding: 10px 24px;
      font-size: 14px;
      gap: 6px;
    }
  `,
};
