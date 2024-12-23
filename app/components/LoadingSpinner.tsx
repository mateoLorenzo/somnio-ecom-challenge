/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const spinnerStyles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  `,
  spinner: css`
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #000;
    border-radius: 50%;
    animation: spin 0.5s linear infinite;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};

export const LoadingSpinner = () => (
  <div css={spinnerStyles.container}>
    <div css={spinnerStyles.spinner} />
  </div>
);
