import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const tenant = await db.tenant.findUnique({
    where: { id: session.user.tenantId },
  });

  const productsCount = await db.product.count({
    where: { tenantId: session.user.tenantId },
  });

  const ordersCount = await db.order.count({
    where: { tenantId: session.user.tenantId },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">{tenant?.name || "Dashboard"}</h1>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              View Store
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session.user.email}</span>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productsCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ordersCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <div className="grid gap-4 md:grid-cols-4">
            <Link href="/dashboard/products">
              <Button variant="outline" className="w-full h-20">
                <Package className="mr-2 h-5 w-5" />
                Products
              </Button>
            </Link>
            <Link href="/dashboard/orders">
              <Button variant="outline" className="w-full h-20">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Orders
              </Button>
            </Link>
            <Link href="/dashboard/customers">
              <Button variant="outline" className="w-full h-20">
                <Users className="mr-2 h-5 w-5" />
                Customers
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="outline" className="w-full h-20">
                <DollarSign className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
