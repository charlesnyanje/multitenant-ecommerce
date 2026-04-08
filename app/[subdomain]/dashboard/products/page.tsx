import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function DashboardProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const products = await db.product.findMany({
    where: { tenantId: session.user.tenantId },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await db.category.findMany({
    where: { tenantId: session.user.tenantId },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/dashboard/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left font-medium">Product</th>
                    <th className="pb-3 text-left font-medium">Category</th>
                    <th className="pb-3 text-left font-medium">Price</th>
                    <th className="pb-3 text-left font-medium">Inventory</th>
                    <th className="pb-3 text-left font-medium">Status</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3">{product.name}</td>
                      <td className="py-3">{product.category?.name || "-"}</td>
                      <td className="py-3">${Number(product.price).toFixed(2)}</td>
                      <td className="py-3">{product.inventory}</td>
                      <td className="py-3">
                        {product.isActive ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-gray-500">Inactive</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/products/${product.id}/edit`}>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No products yet. Add your first product to get started.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
