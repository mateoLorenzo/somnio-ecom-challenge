"use client";
import React from "react";
/** @jsxImportSource @emotion/react */

import { FaShoppingCart, FaShoppingBasket } from "react-icons/fa";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { cartStyles } from "./styles";
import { useRouter } from "next/navigation";
import { IoAddOutline } from "react-icons/io5";
import { HiMinusSmall } from "react-icons/hi2";
import { Header } from "../components/Header";

const EmptyCartMessage = ({
  onStartShopping,
}: {
  onStartShopping: () => void;
}) => (
  <div css={cartStyles.emptyCartContainer}>
    <FaShoppingBasket css={cartStyles.emptyCartIcon} />
    <h2 css={cartStyles.emptyCartTitle}>Your cart is empty</h2>
    <p css={cartStyles.emptyCartText}>
      Looks like you haven&apos;t added anything to your cart yet. Let&apos;s
      find something special for you! 🛍️
    </p>
    <button css={cartStyles.startShoppingButton} onClick={onStartShopping}>
      <FaShoppingCart size={20} />
      Start Shopping
    </button>
  </div>
);

const Page = () => {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, decrementQuantity } = useStore();

  const handleIncrement = (productId: number) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    if (cartItem) {
      addToCart(cartItem.product);
    }
  };

  const handleDecrement = (productId: number) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeFromCart(productId);
      } else {
        decrementQuantity(productId);
      }
    }
  };

  return (
    <div css={cartStyles.screenContainer}>
      <Header showSearch={false} />
      <div css={cartStyles.contentContainer}>
        <div css={cartStyles.container}>
          {cart.length > 0 ? (
            <>
              <h1 css={cartStyles.title}>Your Cart</h1>
              <div css={cartStyles.cartItemsContainer}>
                {cart.map((item) => (
                  <div css={cartStyles.cartItem} key={item.id}>
                    <div
                      css={cartStyles.quantityContainer}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        css={cartStyles.quantityButton}
                        onClick={() => handleDecrement(item.product.id)}
                      >
                        <HiMinusSmall />
                      </div>
                      <p>{item.quantity}</p>
                      <div
                        css={cartStyles.quantityButton}
                        onClick={() => handleIncrement(item.product.id)}
                      >
                        <IoAddOutline />
                      </div>
                    </div>
                    <p css={cartStyles.cartItemTitle}>{item.product.title}</p>
                    <p>USD {(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div css={cartStyles.buttonContainer}>
                <Button
                  css={cartStyles.button}
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  KEEP BUYING
                </Button>
              </div>
            </>
          ) : (
            <EmptyCartMessage onStartShopping={() => router.push("/")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
