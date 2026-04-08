"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/store/product-card";
import { Navbar } from "@/components/store/navbar";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: any;
  comparePrice: any;
  images: string;
}

const mockProducts: Product[] = [
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

const categories = [
  { id: "all", name: "All" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "accessories", name: "Accessories" },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = mockProducts;
    
    if (selectedCategory !== "all") {
      // Simulate category filtering
      filtered = filtered.slice(0, 4);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar tenant={{ name: "Luxe Essentials", logo: null }} />
      
      {/* Hero */}
      <section className="relative py-16 bg-[#1a1a1a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" 
            alt="Products hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 to-[#1a1a1a]/70" />
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our curated collection of premium products
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-[#d4af37] text-[#0f0f0f]"
                      : "bg-[#262626] text-gray-300 hover:bg-[#333333]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground mb-6">{filteredProducts.length} products found</p>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-500 ease-out transform ${
                  isLoaded 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Luxe Essentials. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
