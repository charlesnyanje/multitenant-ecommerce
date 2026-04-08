import { db } from "@/lib/db";
import { getCurrentTenantId } from "@/lib/tenant";
import { ProductCard } from "@/components/store/product-card";

export default async function StoreHomePage() {
  const tenantId = await getCurrentTenantId();

  if (!tenantId) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center">Welcome to Our Store</h1>
        <p className="mt-4 text-center text-muted-foreground">
          Store not found. Please check the URL.
        </p>
      </div>
    );
  }

  const tenant = await db.tenant.findUnique({
    where: { id: tenantId },
  });

  const featuredProducts = await db.product.findMany({
    where: {
      tenantId,
      isActive: true,
      isFeatured: true,
    },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  const allProducts = await db.product.findMany({
    where: {
      tenantId,
      isActive: true,
    },
    take: 12,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {tenant && (
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold">{tenant.name}</h1>
          {tenant.description && (
            <p className="mt-2 text-lg text-muted-foreground">{tenant.description}</p>
          )}
        </section>
      )}

      {featuredProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-6 text-2xl font-bold">All Products</h2>
        {allProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No products available yet.
          </p>
        )}
      </section>
    </div>
  );
}
