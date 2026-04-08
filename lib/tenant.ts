import { db } from "./db";
import { headers } from "next/headers";

export async function getCurrentTenant() {
  const headersList = await headers();
  
  const subdomain = headersList.get("x-tenant-subdomain");
  
  if (!subdomain) {
    const host = headersList.get("host") || "";
    const parsedSubdomain = getSubdomain(host);
    if (!parsedSubdomain) return null;
    
    const tenant = await db.tenant.findUnique({
      where: { subdomain: parsedSubdomain },
    });
    return tenant;
  }

  const tenant = await db.tenant.findUnique({
    where: { subdomain },
  });

  return tenant;
}

export async function getCurrentTenantId() {
  const tenant = await getCurrentTenant();
  return tenant?.id || null;
}

export function getSubdomain(host: string): string | null {
  const localhostDomains = ["localhost:3000", "localhost:3001", "127.0.0.1:3000"];
  
  if (localhostDomains.includes(host)) {
    return "demo";
  }

  const parts = host.split(".");
  
  if (parts.length >= 3) {
    return parts[0];
  }
  
  return null;
}

export function getTenantUrl(subdomain: string) {
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost:3000";
  return `${subdomain}.${baseDomain}`;
}
