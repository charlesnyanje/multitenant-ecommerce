import { db } from "@/lib/db";
import { getCurrentTenantId } from "@/lib/tenant";
import { ProductCard } from "@/components/store/product-card";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  images: string;
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const tenantId = await getCurrentTenantId();

  if (!tenantId) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-muted-foreground">Store not found.</p>
      </div>
    );
  }

  const categories = await db.category.findMany({
    where: { tenantId },
  });

  const products = await db.product.findMany({
    where: {
      tenantId,
      isActive: true,
      ...(params.category && { categoryId: params.category }),
      ...(params.search && {
        OR: [
          { name: { contains: params.search } },
          { description: { contains: params.search } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">All Products</h1>

      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <a
            href="/products"
            className={`rounded-full px-4 py-2 text-sm ${
              !params.category
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            All
          </a>
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/products?category=${category.id}`}
              className={`rounded-full px-4 py-2 text-sm ${
                params.category === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {category.name}
            </a>
          ))}
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No products found.</p>
      )}
    </div>
  );
}
