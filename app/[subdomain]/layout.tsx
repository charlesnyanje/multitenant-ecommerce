import { getCurrentTenant } from "@/lib/tenant";
import { db } from "@/lib/db";
import { Navbar } from "@/components/store/navbar";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = await getCurrentTenant();

  const fullTenant = tenant
    ? tenant
    : await db.tenant.findUnique({
        where: { subdomain: "demo" },
      });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar tenant={fullTenant} />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {fullTenant?.name || "Store"}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
