"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { products } from "@/lib/data/products";
import type { CartItem } from "@/types/product";

export const DELIVERY_CHARGE = 40;
export const FREE_DELIVERY_THRESHOLD = 399;

interface CartLine {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  image?: string;
  unitPrice: number;
  originalPrice?: number;
  quantity: number;
  weightGrams: number;
  stock: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemsCount: number;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  addItem: (productId: string, variantId: string, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "real-foods-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as CartItem[];
          if (Array.isArray(parsed)) setItems(parsed);
        }
      } catch {
        /* ignore corrupt storage */
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (productId: string, variantId: string, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.variantId === variantId);
        if (existing) {
          return prev.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [...prev, { productId, variantId, quantity }];
      });
    },
    [],
  );

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }, []);

  const setQuantity = useCallback((variantId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.variantId !== variantId)
        : prev.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i,
          ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const lines = useMemo<CartLine[]>(() => {
    const byId = new Map(products.map((p) => [p.id, p]));
    const result: CartLine[] = [];
    for (const item of items) {
      const product = byId.get(item.productId);
      if (!product) continue;
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) continue;
      result.push({
        productId: product.id,
        variantId: variant.id,
        productName: product.name,
        variantName: variant.name,
        image: product.images[0]?.url,
        unitPrice: variant.price,
        originalPrice: variant.originalPrice,
        quantity: item.quantity,
        weightGrams: variant.weightGrams,
        stock: variant.stock,
      });
    }
    return result;
  }, [items]);

  const itemsCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
    [lines],
  );

  const deliveryCharge =
    lines.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;

  const total = subtotal + deliveryCharge;

  const value: CartContextValue = {
    lines,
    itemsCount,
    subtotal,
    deliveryCharge,
    total,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
