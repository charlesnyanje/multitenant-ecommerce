"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export function CartItems() {
  const { items, updateQuantity, removeItem, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.productId}
          className="flex gap-4 rounded-lg border p-4"
        >
          <div className="h-24 w-24 overflow-hidden rounded-md bg-gray-100">
            <Image
              src={item.image}
              alt={item.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="font-medium">{item.name}</h3>
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
                  className="text-red-500 hover:text-red-600"
                  onClick={() => removeItem(item.productId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CartSummary() {
  const { getTotal } = useCart();
  const total = getTotal();
  const shipping = total > 100 ? 0 : 9.99;
  const tax = total * 0.1;

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${total.toFixed(2)}</span>
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
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${(total + shipping + tax).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Button className="mt-4 w-full" size="lg">
        Checkout
      </Button>
    </div>
  );
}
