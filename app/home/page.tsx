/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { IoAddOutline, IoSearchOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { APP_CONFIG } from "../config/constants";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { Header } from "../components/Header";
import { homeStyles } from "./styles";
import { MdOutlineSearchOff } from "react-icons/md";

const NoResultsMessage = ({
  searchTerm,
  onClear,
}: {
  searchTerm: string;
  onClear: () => void;
}) => (
  <div css={homeStyles.noResultsContainer}>
    <MdOutlineSearchOff css={homeStyles.noResultsIcon} />
    <h2 css={homeStyles.noResultsTitle}>Oops! No matches found</h2>
    <p css={homeStyles.noResultsText}>
      We looked everywhere but couldn&apos;t find &quot;{searchTerm}&quot;.
      Maybe try another search? 🔍
    </p>
    <button css={homeStyles.clearSearchButton} onClick={onClear}>
      <IoSearchOutline size={20} />
      Clear search
    </button>
  </div>
);

export default function HomePage() {
  const {
    products,
    setProducts,
    isLoading,
    setIsLoading,
    displayedProducts,
    setDisplayedProducts,
  } = useStore();

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length > 0) return;
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDisplayedProducts(displayedProducts + APP_CONFIG.PRODUCTS.PER_PAGE);
    setIsLoadingMore(false);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  if (isLoading) {
    return (
      <div
        css={css`
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <LoadingSpinner />
      </div>
    );
  }

  const visibleProducts = products
    .slice(0, displayedProducts)
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const hasMoreProducts = displayedProducts < products.length && !searchTerm;
  const shouldShowNoResults =
    !isLoading && searchTerm && visibleProducts.length === 0;

  return (
    <div css={homeStyles.screenContainer}>
      <Header
        showSearch={true}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <div css={homeStyles.contentContainer}>
        {shouldShowNoResults ? (
          <NoResultsMessage
            searchTerm={searchTerm}
            onClear={handleClearSearch}
          />
        ) : (
          <>
            <div css={homeStyles.productsContainer}>
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMoreProducts && (
              <Button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                css={homeStyles.loadMoreButton}
              >
                {isLoadingMore ? (
                  <Loader2
                    size={20}
                    css={homeStyles.loadMoreButtonIcon}
                    className="animate-spin"
                  />
                ) : (
                  <IoAddOutline size={20} css={homeStyles.loadMoreButtonIcon} />
                )}
                Load More
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
