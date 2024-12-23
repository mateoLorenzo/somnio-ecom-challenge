"use client";
/** @jsxImportSource @emotion/react */
import { Product } from "@/types/api";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { IoAddOutline, IoCheckmark } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productCardStyles } from "./styles";
import { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { css } from "@emotion/react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { buttonStates, setButtonStates, addToCart } = useStore();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setButtonStates((prev) => ({
      ...prev,
      [product.id]: { isLoading: true, isSuccess: false },
    }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    addToCart(product);
    setButtonStates((prev) => ({
      ...prev,
      [product.id]: { isLoading: false, isSuccess: true },
    }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setButtonStates((prev) => ({
      ...prev,
      [product.id]: { isLoading: false, isSuccess: false },
    }));
  };

  const handleCardClick = (e: React.MouseEvent, productId: number) => {
    const buttonState = buttonStates[productId];
    if (buttonState?.isLoading || buttonState?.isSuccess) {
      e.preventDefault();
      return;
    }
    router.push(`/product/${productId}`);
  };

  const getButtonContent = (productId: number) => {
    const state = buttonStates[productId];
    if (!state) return <IoAddOutline size={20} />;
    if (state.isLoading)
      return <Loader2 color="#000" className="animate-spin" />;
    if (state.isSuccess) return <IoCheckmark size={20} color="#000" />;
    return <IoAddOutline size={20} />;
  };

  return (
    <div
      key={product.id}
      css={productCardStyles.container}
      onClick={(e) => handleCardClick(e, product.id)}
    >
      <Button
        variant="outline"
        size="icon"
        css={productCardStyles.plusIcon}
        onClick={(e) => handleAddToCart(e, product)}
        disabled={
          buttonStates[product.id]?.isLoading ||
          buttonStates[product.id]?.isSuccess
        }
      >
        {getButtonContent(product.id)}
      </Button>
      <div css={productCardStyles.imageContainer}>
        {isImageLoading && (
          <div css={productCardStyles.imageLoadingContainer}>
            <LoadingSpinner />
          </div>
        )}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="300px"
          priority={false}
          css={css`
            ${productCardStyles.image};
            opacity: ${isImageLoading ? 0 : 1};
            transition: opacity 0.2s ease-in-out;
          `}
          onLoadingComplete={() => setIsImageLoading(false)}
        />
        <div css={productCardStyles.priceContainer(product)}>
          <p>USD {product.price.toFixed(2)}</p>
        </div>
      </div>
      <div css={productCardStyles.contentContainer}>
        <h2 css={productCardStyles.title}>{product.title}</h2>
        <p css={productCardStyles.description}>{product.description}</p>
      </div>
    </div>
  );
};
