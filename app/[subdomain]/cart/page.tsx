import { CartItems, CartSummary } from "@/components/store/cart";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartItems />
          <div className="mt-4">
            <Link href="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
