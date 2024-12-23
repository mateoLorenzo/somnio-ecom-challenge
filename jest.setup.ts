import "@testing-library/jest-dom";
import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}

interface NextImageProps extends ImageProps {
  priority?: boolean;
  quality?: number;
  sizes?: string;
  loading?: "lazy" | "eager";
  blurDataURL?: string;
  placeholder?: "blur" | "empty";
}

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    };
  },
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: function Image(props: NextImageProps) {
    const { src, alt, width, height, style, className } = props;
    return React.createElement("img", {
      src,
      alt: alt || "",
      width,
      height,
      style,
      className,
    });
  },
}));
