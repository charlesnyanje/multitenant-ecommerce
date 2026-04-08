import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const demoTenant = await db.tenant.upsert({
    where: { subdomain: "demo" },
    update: {},
    create: {
      name: "Luxe Essentials",
      slug: "luxe-essentials",
      subdomain: "demo",
      description: "Premium products for the modern lifestyle",
    },
  });

  console.log("Created tenant:", demoTenant.name);

  const electronicsCategory = await db.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
      tenantId: demoTenant.id,
    },
  });

  const clothingCategory = await db.category.upsert({
    where: { slug: "clothing" },
    update: {},
    create: {
      name: "Clothing",
      slug: "clothing",
      tenantId: demoTenant.id,
    },
  });

  const accessoriesCategory = await db.category.upsert({
    where: { slug: "accessories" },
    update: {},
    create: {
      name: "Accessories",
      slug: "accessories",
      tenantId: demoTenant.id,
    },
  });

  console.log("Created categories");

  const products = [
    {
      name: "Premium Wireless Headphones",
      slug: "wireless-headphones",
      description: "Premium noise-cancelling headphones with exceptional sound quality and all-day comfort.",
      price: 349.99,
      comparePrice: 449.99,
      images: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      inventory: 50,
      isActive: true,
      isFeatured: true,
      categoryId: electronicsCategory.id,
    },
    {
      name: "Minimalist Smart Watch",
      slug: "smart-watch",
      description: "Elegant smartwatch with health tracking, notifications, and customizable faces.",
      price: 299.99,
      comparePrice: null,
      images: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      inventory: 30,
      isActive: true,
      isFeatured: true,
      categoryId: electronicsCategory.id,
    },
    {
      name: "Classic Wireless Earbuds",
      slug: "wireless-earbuds",
      description: "Crystal clear audio with active noise cancellation and 24-hour battery life.",
      price: 199.99,
      comparePrice: 249.99,
      images: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      inventory: 75,
      isActive: true,
      isFeatured: true,
      categoryId: electronicsCategory.id,
    },
    {
      name: "Portable Bluetooth Speaker",
      slug: "bluetooth-speaker",
      description: "Powerful 360° sound with deep bass, waterproof design, and 12-hour playtime.",
      price: 129.99,
      comparePrice: 179.99,
      images: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      inventory: 45,
      isActive: true,
      isFeatured: false,
      categoryId: electronicsCategory.id,
    },
    {
      name: "Premium Cotton T-Shirt",
      slug: "cotton-tshirt",
      description: "Ultra-soft 100% organic cotton t-shirt with a modern fit.",
      price: 45.00,
      comparePrice: null,
      images: "https://images.unsplash.com/photo-1521572163474-6864f9cf17b0?w=800&q=80",
      inventory: 200,
      isActive: true,
      isFeatured: true,
      categoryId: clothingCategory.id,
    },
    {
      name: "Slim Fit Denim Jeans",
      slug: "denim-jeans",
      description: "Premium stretch denim with a modern slim fit and classic wash.",
      price: 89.99,
      comparePrice: 119.99,
      images: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      inventory: 80,
      isActive: true,
      isFeatured: false,
      categoryId: clothingCategory.id,
    },
    {
      name: "Wool Blend Blazer",
      slug: "wool-blazer",
      description: "Sophisticated wool blend blazer perfect for business or casual occasions.",
      price: 199.99,
      comparePrice: null,
      images: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      inventory: 35,
      isActive: true,
      isFeatured: true,
      categoryId: clothingCategory.id,
    },
    {
      name: "Casual Hoodie",
      slug: "casual-hoodie",
      description: "Soft fleece-lined hoodie with kangaroo pocket and adjustable hood.",
      price: 65.00,
      comparePrice: 85.00,
      images: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      inventory: 120,
      isActive: true,
      isFeatured: false,
      categoryId: clothingCategory.id,
    },
    {
      name: "Leather Crossbody Bag",
      slug: "leather-bag",
      description: "Handcrafted genuine leather bag with adjustable strap and multiple compartments.",
      price: 159.99,
      comparePrice: 219.99,
      images: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      inventory: 40,
      isActive: true,
      isFeatured: true,
      categoryId: accessoriesCategory.id,
    },
    {
      name: "Aviator Sunglasses",
      slug: "aviator-sunglasses",
      description: "Classic aviator style with UV400 protection and lightweight titanium frame.",
      price: 149.99,
      comparePrice: null,
      images: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
      inventory: 60,
      isActive: true,
      isFeatured: false,
      categoryId: accessoriesCategory.id,
    },
    {
      name: "Automatic Watch",
      slug: "automatic-watch",
      description: "Precision automatic movement with sapphire crystal and genuine leather strap.",
      price: 299.99,
      comparePrice: 399.99,
      images: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
      inventory: 25,
      isActive: true,
      isFeatured: true,
      categoryId: accessoriesCategory.id,
    },
    {
      name: "Leather Wallet",
      slug: "leather-wallet",
      description: "Slim bifold wallet in premium Italian leather with RFID blocking.",
      price: 79.99,
      comparePrice: null,
      images: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      inventory: 90,
      isActive: true,
      isFeatured: false,
      categoryId: accessoriesCategory.id,
    },
  ];

  for (const product of products) {
    await db.product.upsert({
      where: { tenantId_slug: { tenantId: demoTenant.id, slug: product.slug } },
      update: {},
      create: { ...product, tenantId: demoTenant.id },
    });
  }

  console.log("Created products");

  const hashedPassword = await bcrypt.hash("password123", 10);

  await db.user.upsert({
    where: { email: "admin@demo.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@demo.com",
      password: hashedPassword,
      role: "ADMIN",
      tenantId: demoTenant.id,
    },
  });

  console.log("Created admin user: admin@demo.com");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
