"use client";
/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { headerStyles } from "./styles";
import { BREAKPOINTS } from "@/app/config/constants";

interface HeaderProps {
  showSearch?: boolean;
  onSearchChange?: (term: string) => void;
  searchTerm?: string;
  hideFilter?: boolean;
}

export const Header = ({
  showSearch = true,
  onSearchChange,
  searchTerm = "",
}: HeaderProps) => {
  const router = useRouter();
  const { cart } = useStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prevCountRef = useRef(0);
  const isFirstRender = useRef(true);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= BREAKPOINTS.mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevCountRef.current = cartItemsCount;
      return;
    }

    if (cartItemsCount > prevCountRef.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = cartItemsCount;
  }, [cartItemsCount]);

  return (
    <div css={headerStyles.container}>
      <Image
        src="/logo.png"
        alt="Somnio Logo"
        width={166}
        height={60}
        priority
        css={headerStyles.logo}
        onClick={() => router.push("/")}
      />
      {showSearch && (
        <div css={headerStyles.searchContainer}>
          <input
            type="text"
            css={headerStyles.searchInput}
            placeholder={isMobile ? "Buscar" : "Search Products..."}
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
          <IoSearchOutline css={headerStyles.searchIcon} size={20} />
        </div>
      )}
      <div css={headerStyles.cartContainer}>
        {cartItemsCount > 0 && (
          <p
            css={
              isAnimating
                ? headerStyles.cartCountAnimate
                : headerStyles.cartCount
            }
          >
            {cartItemsCount}
          </p>
        )}
        <FaShoppingCart
          onClick={() => router.push("/cart")}
          size={40}
          color="#FFF"
          css={headerStyles.cartIcon}
          data-testid="cart-icon"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgb(255, 255, 255, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#FFF";
          }}
        />
      </div>
    </div>
  );
};
