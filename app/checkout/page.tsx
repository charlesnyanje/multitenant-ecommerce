"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Navbar } from "@/components/store/navbar";
import { Check, Phone, CreditCard, Lock, ArrowLeft, ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
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

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"m-pesa" | "card">("m-pesa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    // Check auth status
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const session = await res.json();
        setIsLoggedIn(!!session?.user);
      } catch {
        setIsLoggedIn(false);
      }
    };
    
    checkAuth();
    setCartItems(getCart());
  }, []);

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const shipping = getTotal() > 100 ? 0 : 9.99;
  const tax = getTotal() * 0.1;
  const total = getTotal() + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleMpesaPayment = async () => {
    if (!shippingInfo.phone) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("cart-updated"));
    setIsProcessing(false);
    setIsComplete(true);
  };

  const handleCardPayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("cart-updated"));
    setIsProcessing(false);
    setIsComplete(true);
  };

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar tenant={{ name: "Luxe Essentials", logo: null }} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar tenant={{ name: "Luxe Essentials", logo: null }} />
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <LogIn className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
            <p className="text-muted-foreground mb-2">
              Please sign in to complete your purchase.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              You'll be redirected to sign in, then return to checkout.
            </p>
            <a href="/auth/signin?returnUrl=/checkout">
              <Button size="lg">
                Sign In to Checkout <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </main>
      </div>
    );
  }

  if (cartItems.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar tenant={{ name: "Luxe Essentials", logo: null }} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <a href="/products">
              <Button>Continue Shopping</Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar tenant={{ name: "Luxe Essentials", logo: null }} />
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase. Your order has been received.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order total: <strong>${total.toFixed(2)}</strong>
            </p>
            {paymentMethod === "m-pesa" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  An M-Pesa payment request has been sent to <strong>{shippingInfo.phone}</strong>
                </p>
                <p className="text-sm text-yellow-600 mt-1">
                  Please complete the payment on your phone.
                </p>
              </div>
            )}
            <a href="/">
              <Button size="lg">
                Continue Shopping <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar tenant={{ name: "Luxe Essentials", logo: null }} />
      
      <section className="py-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
      </section>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                1
              </div>
              <span className="ml-2 mr-4 text-sm font-medium">Shipping</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200"></div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (for M-Pesa)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="254700000000"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Continue to Payment <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </button>
                  </div>

                  <h2 className="text-xl font-semibold">Select Payment Method</h2>
                  
                  <div className="space-y-4">
                    <label className={`block cursor-pointer rounded-lg border-2 p-4 transition-all ${paymentMethod === "m-pesa" ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === "m-pesa"}
                            onChange={() => setPaymentMethod("m-pesa")}
                            className="sr-only"
                          />
                          <Phone className="w-6 h-6 text-green-600" />
                          <div>
                            <h3 className="font-medium">M-Pesa</h3>
                            <p className="text-sm text-muted-foreground">Pay with M-Pesa mobile money</p>
                          </div>
                        </div>
                        {paymentMethod === "m-pesa" && <Check className="w-5 h-5 text-blue-600" />}
                      </div>
                    </label>

                    <label className={`block cursor-pointer rounded-lg border-2 p-4 transition-all ${paymentMethod === "card" ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="sr-only"
                          />
                          <CreditCard className="w-6 h-6 text-purple-600" />
                          <div>
                            <h3 className="font-medium">Card Payment</h3>
                            <p className="text-sm text-muted-foreground">Pay with Visa/Mastercard (Stripe)</p>
                          </div>
                        </div>
                        {paymentMethod === "card" && <Check className="w-5 h-5 text-blue-600" />}
                      </div>
                    </label>
                  </div>

                  {paymentMethod === "m-pesa" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        You will receive an M-Pesa prompt on your phone <strong>{shippingInfo.phone}</strong>
                      </p>
                      <p className="text-sm text-yellow-600 mt-1">
                        Enter your PIN to complete payment
                      </p>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm text-purple-800">
                        Stripe integration coming soon. Use M-Pesa for now.
                      </p>
                    </div>
                  )}

                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={paymentMethod === "m-pesa" ? handleMpesaPayment : handleCardPayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Pay ${total.toFixed(2)}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-lg border p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
