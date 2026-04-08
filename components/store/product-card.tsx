"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: any;
  comparePrice: any;
  images: string;
}

interface ProductCardProps {
  product: Product;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_KEY = "ecommerce_cart";

function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(CART_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function addToCart(item: Omit<CartItem, "quantity">) {
  const items = getCart();
  const existing = items.find(i => i.productId === item.productId);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...item, quantity: 1 });
  }
  
  saveCart(items);
  
  window.dispatchEvent(new Event("cart-updated"));
}

export function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const imageUrl = product.images || "/placeholder-product.jpg";

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((Number(product.comparePrice) - Number(product.price)) / Number(product.comparePrice)) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      image: imageUrl,
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {hasDiscount && (
          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${Number(product.comparePrice).toFixed(2)}
            </span>
          )}
        </div>
        <Button
          className="mt-3 w-full"
          size="sm"
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
