/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/** @jsxImportSource @emotion/react */
import React, { use, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { getProducts } from "@/app/services/products";
import { Product } from "@/types/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { productPageStyles } from "./styles";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { HiMinusSmall } from "react-icons/hi2";
import { IoAddOutline } from "react-icons/io5";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { Header } from "@/app/components/Header";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [recommendedImagesLoading, setRecommendedImagesLoading] = useState<{
    [key: number]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, products, setProducts } = useStore();
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);

  const product = products.find((p) => p.id === Number(id));

  const getRandomProducts = (
    allProducts: Product[],
    currentProduct: Product
  ) => {
    const otherProducts = allProducts.filter((p) => p.id !== currentProduct.id);
    const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 12);
  };

  const fetchProductsIfNeeded = async () => {
    if (!products || products.length === 0) {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  const updateRecommendedProducts = () => {
    if (!product || !products.length) return;
    setIsLoadingRecommendations(true);
    try {
      const randomProducts = getRandomProducts(products, product);
      setRecommendedProducts(randomProducts);
      const initialLoadingState = randomProducts.reduce((acc, product) => {
        acc[product.id] = true;
        return acc;
      }, {} as { [key: number]: boolean });
      setRecommendedImagesLoading(initialLoadingState);
    } catch (error) {
      console.error("Error setting recommended products:", error);
      setRecommendedProducts([]);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await fetchProductsIfNeeded();
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (product && products.length) {
      updateRecommendedProducts();
    }
  }, [product, products]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity);
    router.push("/cart");
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <IoMdStar key={`full-${i}`} color="#FFB915" size={20} />
        ))}
        {hasHalfStar && <IoMdStarHalf color="#FFB915" size={20} />}
        {[...Array(emptyStars)].map((_, i) => (
          <IoMdStarOutline key={`empty-${i}`} color="#FFB915" size={20} />
        ))}
      </>
    );
  };

  if (isLoading || !product) return <LoadingSpinner />;

  return (
    <div css={productPageStyles.screenContainer}>
      <Header showSearch={false} />
      <div css={productPageStyles.contentContainer}>
        <div css={productPageStyles.imageContainer}>
          {isImageLoading && (
            <div css={productPageStyles.imageLoadingContainer}>
              <LoadingSpinner />
            </div>
          )}
          <Image
            src={product.image}
            alt={product.title}
            style={{ opacity: isImageLoading ? 0 : 1 }}
            css={productPageStyles.productImage}
            width={600}
            height={600}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            quality={85}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
              '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#f0f0f0"/></svg>'
            ).toString("base64")}`}
            onLoadingComplete={() => setIsImageLoading(false)}
          />
        </div>
        <div css={productPageStyles.productInfoContainer}>
          <Breadcrumb css={productPageStyles.breadcrumb}>
            <BreadcrumbList css={productPageStyles.breadcrumbList}>
              <BreadcrumbItem css={productPageStyles.breadcrumbItem}>
                <BreadcrumbLink onClick={() => router.push("/")}>
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem css={productPageStyles.breadcrumbTitle}>
                <BreadcrumbPage css={productPageStyles.breadcrumbPage}>
                  {product.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div css={productPageStyles.title}>{product.title}</div>
          <div css={productPageStyles.rating}>
            <div css={productPageStyles.starsContainer}>
              {renderStars(product.rating.rate)}
            </div>
            <p css={productPageStyles.ratingText}>
              {product.rating.rate.toFixed(1)} ({product.rating.count})
            </p>
          </div>
          <div css={productPageStyles.description}>{product.description}</div>
          <div css={productPageStyles.price}>USD ${product.price}</div>
          <div css={productPageStyles.addToCartContainer}>
            <div css={productPageStyles.quantityContainer}>
              <HiMinusSmall
                size={20}
                onClick={handleDecrement}
                css={productPageStyles.quantityButton}
              />
              <div>{quantity}</div>
              <IoAddOutline
                size={20}
                onClick={handleIncrement}
                css={productPageStyles.quantityButton}
              />
            </div>
            <div
              css={productPageStyles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to Cart
            </div>
          </div>
        </div>
      </div>
      {recommendedProducts.length > 0 && (
        <div css={productPageStyles.recommendedSection}>
          <h2 css={productPageStyles.recommendedTitle}>You May Also Like</h2>
          {isLoadingRecommendations ? (
            <LoadingSpinner />
          ) : (
            <Carousel
              css={productPageStyles.carouselContainer}
              opts={{
                loop: true,
                align: "start",
              }}
            >
              <CarouselContent className="-ml-1">
                {recommendedProducts.map((recommendedProduct) => (
                  <CarouselItem
                    key={recommendedProduct.id}
                    className="pl-1 basis-1/2 sm:basis-1/3 lg:basis-1/4"
                    onClick={() =>
                      router.push(`/product/${recommendedProduct.id}`)
                    }
                    css={productPageStyles.recommendedProductCardContainer}
                  >
                    <div css={productPageStyles.recommendedProductCard}>
                      <div css={productPageStyles.recommendedImageContainer}>
                        {recommendedImagesLoading[recommendedProduct.id] && (
                          <div css={productPageStyles.imageLoadingContainer}>
                            <LoadingSpinner />
                          </div>
                        )}
                        <Image
                          src={recommendedProduct.image}
                          alt={recommendedProduct.title}
                          width={200}
                          height={200}
                          css={css`
                            ${productPageStyles.recommendedImage};
                            opacity: ${recommendedImagesLoading[
                              recommendedProduct.id
                            ]
                              ? 0
                              : 1};
                            transition: opacity 0.2s ease-in-out;
                          `}
                          onLoadingComplete={() => {
                            setRecommendedImagesLoading((prev) => ({
                              ...prev,
                              [recommendedProduct.id]: false,
                            }));
                          }}
                        />
                      </div>
                      <div css={productPageStyles.recommendedProductInfo}>
                        <h3>{recommendedProduct.title}</h3>
                        <p>USD ${recommendedProduct.price}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
