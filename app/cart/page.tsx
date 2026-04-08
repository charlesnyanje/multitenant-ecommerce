"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/store/navbar";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  window.dispatchEvent(new Event("cart-updated"));
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
    setIsLoaded(true);
  }, []);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    const items = cartItems.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    );
    setCartItems(items);
    saveCart(items);
  };

  const removeItem = (productId: string) => {
    const items = cartItems.filter(item => item.productId !== productId);
    setCartItems(items);
    saveCart(items);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const shipping = getTotal() > 100 ? 0 : 9.99;
  const tax = getTotal() * 0.1;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar tenant={{ name: "Luxe Essentials", logo: null }} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar tenant={{ name: "Luxe Essentials", logo: null }} />
      
      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="text-gray-300 mt-2">{cartItems.length} items in your cart</p>
        </div>
      </section>

      {/* Cart Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {cartItems.length === 0 ? (
            <div className={`text-center py-16 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
              <a href="/products">
                <Button size="lg">
                  Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.productId}
                    className={`flex gap-4 rounded-lg border p-4 transition-all duration-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="h-24 w-24 overflow-hidden rounded-md bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <a href="/products">
                  <Button variant="outline" className="mt-4">
                    Continue Shopping
                  </Button>
                </a>
              </div>

              {/* Order Summary */}
              <div className={`rounded-lg border p-6 h-fit sticky top-24 transition-all duration-500 delay-200 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${(getTotal() + shipping + tax).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="mt-4 w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Luxe Essentials. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
