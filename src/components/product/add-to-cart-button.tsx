"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productId: string;
  variantId: string;
  quantity?: number;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function AddToCartButton({
  productId,
  variantId,
  quantity = 1,
  disabled,
  label = "Add to Cart",
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(productId, variantId, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      <ShoppingBag />
      {added ? "Added!" : label}
    </Button>
  );
}