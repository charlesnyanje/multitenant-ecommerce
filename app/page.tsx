"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/store/product-card";
import { Navbar } from "@/components/store/navbar";
import { ArrowRight, Zap, Shield, Truck, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    slug: "wireless-headphones",
    description: "Premium noise-cancelling headphones with exceptional sound quality.",
    price: 349.99,
    comparePrice: 449.99,
    images: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
  {
    id: "2",
    name: "Minimalist Smart Watch",
    slug: "smart-watch",
    description: "Elegant smartwatch with health tracking and notifications.",
    price: 299.99,
    comparePrice: null,
    images: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    id: "3",
    name: "Classic Wireless Earbuds",
    slug: "wireless-earbuds",
    description: "Crystal clear audio with active noise cancellation.",
    price: 199.99,
    comparePrice: 249.99,
    images: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
  },
  {
    id: "4",
    name: "Portable Bluetooth Speaker",
    slug: "bluetooth-speaker",
    description: "Powerful 360° sound with deep bass, waterproof design.",
    price: 129.99,
    comparePrice: 179.99,
    images: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
  },
  {
    id: "5",
    name: "Premium Cotton T-Shirt",
    slug: "cotton-tshirt",
    description: "Ultra-soft 100% organic cotton t-shirt with modern fit.",
    price: 45.00,
    comparePrice: null,
    images: "https://images.unsplash.com/photo-1521572163474-6864f9cf17b0?w=800&q=80",
  },
  {
    id: "6",
    name: "Slim Fit Denim Jeans",
    slug: "denim-jeans",
    description: "Premium stretch denim with modern slim fit.",
    price: 89.99,
    comparePrice: 119.99,
    images: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
  },
  {
    id: "7",
    name: "Wool Blend Blazer",
    slug: "wool-blazer",
    description: "Sophisticated wool blend blazer for business or casual.",
    price: 199.99,
    comparePrice: null,
    images: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
  },
  {
    id: "8",
    name: "Casual Hoodie",
    slug: "casual-hoodie",
    description: "Soft fleece-lined hoodie with kangaroo pocket.",
    price: 65.00,
    comparePrice: 85.00,
    images: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
  },
  {
    id: "9",
    name: "Leather Crossbody Bag",
    slug: "leather-bag",
    description: "Handcrafted genuine leather with multiple compartments.",
    price: 159.99,
    comparePrice: 219.99,
    images: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
  },
  {
    id: "10",
    name: "Aviator Sunglasses",
    slug: "aviator-sunglasses",
    description: "Classic aviator style with UV400 protection.",
    price: 149.99,
    comparePrice: null,
    images: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
  },
  {
    id: "11",
    name: "Automatic Watch",
    slug: "automatic-watch",
    description: "Precision automatic movement with sapphire crystal.",
    price: 299.99,
    comparePrice: 399.99,
    images: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
  },
  {
    id: "12",
    name: "Leather Wallet",
    slug: "leather-wallet",
    description: "Slim bifold wallet in premium Italian leather.",
    price: 79.99,
    comparePrice: null,
    images: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
  },
];

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const featuredProducts = products.slice(0, 4);
  const allProducts = products.slice(0, 8);
  const productsWithDiscounts = products.filter(p => p.comparePrice && p.comparePrice > p.price);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleSlides(1);
      else if (window.innerWidth < 1024) setVisibleSlides(2);
      else setVisibleSlides(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productsWithDiscounts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const heroImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    "https://images.unsplash.com/photo-1441984904996-e0c6a0d5c7c1?w=1600&q=80",
  ];

  const [currentHeroImage, setCurrentHeroImage] = useState(heroImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => {
        const currentIndex = heroImages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % heroImages.length;
        return heroImages[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar tenant={{ name: "Luxe Essentials", logo: null }} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src={currentHeroImage} 
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/95 via-[#0f0f0f]/80 to-[#0f0f0f]/60" />
        
        <div className={`relative container mx-auto px-4 py-24 md:py-32 transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/10 rounded-full backdrop-blur-sm">
              New Collection 2025
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Discover Premium Quality
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Elevate your lifestyle with our curated collection of premium products.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Special Offers Slider */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between mb-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div>
              <h2 className="text-3xl font-bold text-[#d4af37]">Hot Deals 🔥</h2>
              <p className="text-muted-foreground mt-1">Limited time offers - Grab them before they're gone!</p>
            </div>
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)` }}
              >
                {[...productsWithDiscounts, ...productsWithDiscounts].map((product, index) => {
                  const discount = Math.round(((Number(product.comparePrice) - Number(product.price)) / Number(product.comparePrice)) * 100);
                  const savings = (Number(product.comparePrice) - Number(product.price)).toFixed(2);
                  return (
                    <div
                      key={`${product.id}-${index}`}
                      className="flex-shrink-0 w-72 px-2"
                    >
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="relative">
                          <img
                            src={product.images}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {discount}% OFF
                          </div>
                          <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            ⚡ LIMITED
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold line-clamp-2 mb-2">{product.name}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl font-bold text-red-600">${Number(product.price).toFixed(2)}</span>
                            <span className="text-sm text-muted-foreground line-through">${Number(product.comparePrice).toFixed(2)}</span>
                          </div>
                          <div className="bg-red-50 rounded-lg p-2 text-center">
                            <p className="text-xs text-red-600 font-medium">Save ${savings} ({discount}% off)!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentSlide(s => Math.min(s + 1, productsWithDiscounts.length - visibleSlides))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16">
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between mb-8 transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground mt-1">Handpicked just for you</p>
            </div>
            <a href="/products" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className={`max-w-xl transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
              <h2 className="text-3xl font-bold mb-4">Summer Sale is Here!</h2>
              <p className="text-gray-300 mb-6">
                Get up to 50% off on selected items. Limited time offer, don't miss out!
              </p>
              <a 
                href="/products" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Shop the Sale
              </a>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" 
              alt="Sale banner"
              className={`w-full md:w-80 h-64 object-cover rounded-xl transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            />
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between mb-8 transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div>
              <h2 className="text-3xl font-bold">All Products</h2>
              <p className="text-muted-foreground mt-1">Browse our complete collection</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Luxe Essentials</h3>
              <p className="text-sm text-muted-foreground">Premium products for the modern lifestyle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/products" className="hover:text-foreground">All Products</a></li>
                <li><a href="/products?category=electronics" className="hover:text-foreground">Electronics</a></li>
                <li><a href="/products?category=clothing" className="hover:text-foreground">Clothing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about" className="hover:text-foreground">About Us</a></li>
                <li><a href="/contact" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">Subscribe for updates and exclusive offers.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Luxe Essentials. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
